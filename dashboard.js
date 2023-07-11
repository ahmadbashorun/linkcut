//base api
const base_api = 'https://tame-gold-chipmunk-boot.cyclic.app' 

//eventlistener that runs one the page loads to add the user initials and user name to the nav bar and also redirect the user to the login page if not logged in
document.addEventListener('DOMContentLoaded', async function () { 
  await updateProfile();
  await getLinks();
});

//Open and close Create link modal
const newLinkButton = document.getElementById('new-link-button');
const createLinkModal = document.getElementById('create-link-modal');
const closeNewLinkIcon = document.getElementById('createLinkCancel');
const destinationURLInput = document.getElementById('destinationURL')
const backHalfInput = document.getElementById('backHalf')

function openNewLinkModal(){
    createLinkModal.classList.remove('hidden')
    destinationURLInput.focus()
}
newLinkButton.addEventListener('click', openNewLinkModal)

function closeNewLinkModal(){
    if(!createLinkModal.classList.contains('hidden')){
        createLinkModal.classList.add('hidden')
        // closeNewLinkIcon.style.display = 'none'
    }
}
closeNewLinkIcon.addEventListener('click', closeNewLinkModal)





//creating a new link

//Create New Link Form Validation
const createLinkForm = document.getElementById('createLinkForm');

createLinkForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Validate destination URL
  let destinationURL = destinationURLInput.value.trim();
  // if (destinationURL.startsWith("www")){
  //   destinationURL = `https//${destinationURL}`
  // }
  console.log(destinationURL)
  if (destinationURL === '') {
    // Show error message
    showError(destinationURLInput, 'Destination URL is required');
    setTimeout(function () { 
      const errorElement = destinationURLInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  }
 
  
  // Validate back half
  const backHalf = backHalfInput.value.trim();
  if (backHalf !== '' && !isValidBackHalf(backHalf)) {
    // Show error message
    showError(backHalfInput, 'Invalid back half');
    setTimeout(function () { 
      const errorElement = backHalfInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  }
console.log(typeof destinationURL, typeof backHalf)
  const urlData = {
    url: destinationURL,
    slug: backHalf,
  }
  
  //call api to create link
  const data = await createLink(urlData)

  if (data.error) { 
    // Show error message
    if (data.error = 'Duplicate key value entered') {
      data.error = 'Back half or Url already exists'
    }
    showError(destinationURLInput, data.error);
    setTimeout(function () { 
      const errorElement = destinationURLInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  } else {
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = `Link created: ${data.newUrl.urlCode}`;
    setTimeout(function () { 
      successMessage.textContent = '';
    }, 2000)
    
    setTimeout(function () {
      closeNewLinkModal()
      //reload the page to show the new link
      location.reload()
    },4000)
  }
});

//function to create a new link
const createLink = async function(urlData) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/urls`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(urlData),
  });
  const data = await response.json();
 
  return data;
}


function isValidURL(url) {
  // Use a regular expression to validate URL format
  const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return urlRegex.test(url);
}

function isValidBackHalf(backHalf) {
  // Use a regular expression to validate back half format
  const backHalfRegex = /^[a-zA-Z0-9-]+$/;
  return backHalfRegex.test(backHalf);
}

function showError(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
}

function clearError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
}



//Open and close link details modal
const viewDetailsButton = document.getElementById('viewDetailsButton')
const linkDetailsModal = document.getElementById('linkDetailsModal')
const closeLinkDetailsIcon = document.getElementById('closeLinkDetails')

async function openLinkDetails(urlId){
  linkDetailsModal.classList.remove('hidden')
  const datas = await getUrlDetails(urlId)
  const viewUrlCode = document.getElementById('viewUrlCode')
  const viewUrls = document.getElementById('viewUrls')
  const viewDateCreated = document.getElementById('viewDateCreated')
  const viewClicks = document.getElementById('viewClicks')
  const qrCode = document.getElementById('qrCode')
  const data = datas.data[0];
  
  if (datas.success === true) { 
    const getDate = formatDate(data.urlId.created_at)
    viewUrlCode.textContent = data.urlId.urlCode
    viewUrls.textContent = data.urlId.url
    viewDateCreated.textContent = getDate
    viewClicks.textContent = data.clicks
    qrCode.src = data.urlId.qrCode

    //fill the sources, location and devices table
    const sourcesTable = document.getElementById('sourcesTable')
    const locationsTable = document.getElementById('locationsTable')
    const devicesTable = document.getElementById('devicesTable')
    const sources = sortArray(data.sources)
    const locations = sortArray(data.locations)
    const devices = sortArray(data.devices)
    sourcesTable.innerHTML = ''
    locationsTable.innerHTML = ''
    devicesTable.innerHTML = ''

    printTable(sourcesTable, sources, 'Sources')
    printTable(locationsTable, locations, 'Locations')
    printTable(devicesTable, devices, 'Devices')
  }

  //delete url from the view details page
  const deleteLinkBtn = document.getElementById('deleteUrlCode');
  deleteLinkBtn.addEventListener('click', async function (e) { 
    e.preventDefault();
    //close the modal
    linkDetailsModal.classList.add('hidden')
    
    openDeleteLinkModal(urlId)
  })

  //edit url from the view details page
  const editLinkBtn = document.getElementById('editViewUrl');
  editLinkBtn.addEventListener('click', async function (e) { 
    e.preventDefault();
    //close the modal
    linkDetailsModal.classList.add('hidden')
    
    openEditLink(urlId)
  });


  //download qr code
  const downloadQrCode = document.getElementById('downloadQrCode')
  downloadQrCode.addEventListener('click', function (e) { 
    e.preventDefault();
    downloadQRCode(data.urlId.slug)
  })

}

//function to download qr code
function downloadQRCode(urlCode) { 
  const qrCode = document.getElementById('qrCode')
  const link = document.createElement('a');
  link.href = qrCode.src;
  link.download = `${urlCode}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//function to print the sources, location and devices table
function printTable(table, arrays, source) {
  if (arrays.length === 0) {
    table.innerHTML = `<h3 class="text-left font-['space_grotesk'] md:text-2xl text-lg font-bold text-[#1A1A19]">${source}</h3>
    <p href="" class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19]">none</p>`
  }

  table.innerHTML = `<h3 class="text-left font-['space_grotesk'] md:text-2xl text-lg font-bold text-[#1A1A19]">${source}</h3>`
  const div = document.createElement('div')
  div.classList.add('w-full', 'h-auto', 'flex', 'flex-col', 'gap-[0.5rem]')
  div.innerHTML = ``
  for (const array in arrays) { 
    if (arrays.hasOwnProperty(array)) {
      const element = arrays[array];
      div.innerHTML += ` <div class="w-full h-auto flex flex-row justify-between gap-[0.5rem]">
      <p href="" class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19]">${array}</p>
      <p class="text-left font-['space_grotesk'] text-base font-bold text-[#1A1A19]">${element}</p>
      </div>`
    }
  }
  table.appendChild(div)
}

//function to check the array of sources, location and devices and for each arrays, sort each of them showing the occurrences in each and the number of times it ocured
function sortArray(array) { 
  const sortedArray = array.sort()
  const occurrences = {}
  sortedArray.forEach(function (element) { 
    if (occurrences[element]) { 
      occurrences[element]++
    }
    else {
      occurrences[element] = 1
    }
  })
  return occurrences
}

//function to get url details
const getUrlDetails = async function (urlId) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/clicks/${urlId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

function closeLinkDetail(){
    if(!linkDetailsModal.classList.contains('hidden')){
        linkDetailsModal.classList.add('hidden')
        // closeNewLinkIcon.style.display = 'none'
    }
}
closeLinkDetailsIcon.addEventListener('click', closeLinkDetail)


//Open and Close Edit Modal Screen
//using event delegation to listen for click events on the linksContainer
const linksContainer = document.getElementById('linksContainer')
linksContainer.addEventListener('click', function (event) { 
  if (event.target.classList.contains('editLinkButton')) {
    const urlId = event.target.getAttribute('data-url-id');
    openEditLink(urlId)
  }
  if (event.target.classList.contains('deleteButton')) {
    const urlId = event.target.getAttribute('data-url-id');
    openDeleteLinkModal(urlId)
  }
  if (event.target.classList.contains('viewDetailsButton')) {
    const urlId = event.target.getAttribute('data-url-id');
    openLinkDetails(urlId)
  }
  if (event.target.classList.contains('copyButton')) {
    copY(event)
  }   
})


const editLinkButton = document.getElementById('editLinkButton')
const editLinkModal = document.getElementById('editLinkModal')
const closeEditLinkIcon = document.getElementById('closeEditLinkModal')

async function openEditLink(urlId) {
  editLinkModal.classList.remove('hidden')
  const editDestinationURL = document.getElementById('editDestinationURL')
  const editBackHalf = document.getElementById('editBackHalf')
  const saveEditBtn = document.getElementById('saveEditBtn')

  //get the link details from the api
  const data = await getLinkDetails(urlId)
  editDestinationURL.value = data.url.url;
  editBackHalf.value = data.url.slug;

  saveEditBtn.addEventListener('click', async function (event) { 
    event.preventDefault()
    const urlData = {
      url: editDestinationURL.value.trim(),
      slug: editBackHalf.value.trim(),
    }
    const data = await editLink(urlId, urlData)
    if (data.success === true) {
      // Show success message
      const successMessage = document.getElementById('successMessageEdit');
      successMessage.classList.remove('hidden')
      successMessage.textContent = 'Changes saved successfully'
      setTimeout(function () {
        successMessage.textContent = '';
        successMessage.classList.add('hidden')
        closeEditLink()
      }, 3000)
      
      setTimeout(function () {
       
      },4000)
    }else{
      const logError = document.getElementById('logErrorEdit')
      logError.classList.remove('hidden')
      logError.textContent = data.error
      setTimeout(function () { 
        logError.textContent = ''
        logError.classList.add('hidden')
      }, 2000)
    }
  })
}

//function to get link details
const getLinkDetails = async function (urlId) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/urls/${urlId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}


//function to edit link
const editLink = async function (urlId, urlData) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/urls/${urlId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(urlData),
  });
  const data = await response.json();
  return data;
}

function closeEditLink(){
    if(!editLinkModal.classList.contains('hidden')){
        editLinkModal.classList.add('hidden')
    }
}
closeEditLinkIcon.addEventListener('click', closeEditLink)


//Open and close userprofile drop down
const dropdownMenu = document.getElementById('dropdownMenu');
const toggleIcon = document.getElementById('toggleIcon');

function toggleDropdown() {
    dropdownMenu.classList.toggle('hidden');
    toggleIcon.classList.toggle('fa-caret-down');
    toggleIcon.classList.toggle('fa-caret-up');
}

toggleIcon.addEventListener('click', toggleDropdown)


///Open and close change password modal
const changePwdBtn = document.getElementById('changePwdButton')
const changePasswordModal = document.getElementById('changePwdModal')
const closeChangePwdIcon = document.getElementById('closeChangePwd')

function openChangePwdModal(){
  changePasswordModal.classList.remove('hidden')
}
changePwdBtn.addEventListener('click', openChangePwdModal)

function closeChangePwdModal(){
  if(!changePasswordModal.classList.contains('hidden')){
    changePasswordModal.classList.add('hidden')
  }
}
closeChangePwdIcon.addEventListener('click', closeChangePwdModal)


//handle changing of password
const changePasswordBtn = document.getElementById('changePassword')

changePasswordBtn.addEventListener('click', async function (e) {
  e.preventDefault();
  const userPwd = document.getElementById('userpassword').value;
  const newPwd = document.getElementById('userNewPassword').value;
  const confirmPwd = document.getElementById('confirmNewPassword').value;

  //validate the form
  if (userPwd === '' || newPwd === '' || confirmPwd === '') { 
    const logError = document.getElementById('logErrorCpwd');
    logError.classList.remove('hidden');
    logError.textContent = 'Please fill in all fields';
    setTimeout(function () { 
      logError.textContent = ''
      logError.classList.add('hidden');
    }, 2000)
    return;
  }

  //call endpoint
  const data = await changePassword(userPwd, newPwd, confirmPwd)
  if (data.success === false) { 
    const logError = document.getElementById('logErrorCpwd');
    logError.classList.remove('hidden');
    logError.textContent = data.error;
    setTimeout(function () { 
      logError.textContent = ''
      logError.classList.add('hidden');
    }, 2000)
    return;
  } else {
    const logSuccess = document.getElementById('logSuccess');
    logSuccess.classList.remove('hidden');
    logSuccess.textContent = 'Password changed successfully';
    setTimeout(function () { 
      logSuccess.textContent = ''
      logSuccess.classList.add('hidden');
      closeChangePwdModal()
      location.reload()
    }, 2000)
  }
}) 

const changePassword = async function (userPwd, newPwd, confirmPwd) { 
  const urlData = {
    currentPassword: userPwd,
    newPassword: newPwd,
    confirmPassword: confirmPwd
  }
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/auth/updatepassword`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(urlData),
  })
  const data = await response.json();
  return data
}

//Open and close delete link modal
const deleteLinkModal = document.getElementById('deleteLinkModal');
const closeDeleteLinkIcon = document.getElementById('closeDeleteLinkModal');
const cancelDeleteLinkBtn = document.getElementById('cancelDeleteLinkBtn');

function openDeleteLinkModal(urlId) {
  deleteLinkModal.classList.remove('hidden');

  const confirmDeleteLinkBtn = document.getElementById('confirmDeleteLinkBtn');
  
  // Handle the delete link operation when the confirm button is clicked
  confirmDeleteLinkBtn.addEventListener('click', async function() {
    //call the delete link api
    const data = await deleteLink(urlId)
    if (data.success === true) { 
      //hide the modal
      closeDeleteLinkModal();
      //reload the page to show the new link
      location.reload()
    }
  });
}




//api call to delete a link
const deleteLink = async function (id) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/urls/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json();
  return data;
}

function closeDeleteLinkModal() {
  if(!deleteLinkModal.classList.contains('hidden')){
    deleteLinkModal.classList.add('hidden')
  }
}

// Open the delete link modal when a delete button is clicked
// deleteButton.addEventListener('click', openDeleteLinkModal);

// Close the delete link modal when the close icon is clicked
closeDeleteLinkIcon.addEventListener('click', closeDeleteLinkModal);

// Close the delete link modal when the cancel button is clicked
cancelDeleteLinkBtn.addEventListener('click', closeDeleteLinkModal);



const updateProfile = async function () { 
  //get the current loggedin user from my api
  //get token from local storage
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const user = resp.data;
    if(user){
      const userInitials = document.getElementById('userInitials')
      const userName = document.getElementById('userName')
      //get the first letter of the user name
      const firstLetter = user.lastName.charAt(0).toUpperCase()
      //convert the first letter of te firstName and lastName to uppercase  
      const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
      const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
      const fullName = `${lastName} ${firstName}`
      userInitials.textContent = firstLetter
      userName.textContent = fullName
    } else {
      window.location.href = 'login.html'
    }
}


// const linksContainer = document.getElementById('linksContainer');

//function to get all the urls created by the user and display them on the dashboard
const getLinks = async function () { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/user/clicks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const data = resp.data;
  if (resp.success === true) {
    if (data.total > 0) {
      const links = data.userClicks;
      linksContainer.innerHTML = '';
      createLinks(links);
      //add pagination if the links are more than 9
      if (data.total > 9) {
        //remove the pagination on the page if there are no links
        const paginationContainer = document.getElementById('paginationContainer')
        paginationContainer.classList.remove('hidden')
      }
    } else {
      linksContainer.innerHTML = `
      <div class="no-links">
        <p class="font-['space_grotesk']">You have not created any links yet.</p>
      </div>
    `;
    
    }
  } else {
    window.location.href = 'login.html';
  }
}











//eventlistener that runs when the user clicks on the logout button
const logoutButton = document.getElementById('logoutButton')
  logoutButton.addEventListener('click', async function () {
    //logout the user
    //delete token from local storage
    localStorage.removeItem('token')
    window.location.href = 'login.html'
  });



//function to get all links on a page
const getAllLinks = async function (pageNumber) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/user/clicks?page=${pageNumber}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const data = resp.data;
  const lastPage = Math.ceil(data.total / 9)
  if (resp.success === true) {
    return {data, lastPage}
  }
}


//add eventlistener to the pagination buttons
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')


//an eventlistener that changes the page number when the user clicks on the next button or prev button and check if the page is the last page or the first page
let pageNumber = 1
if (pageNumber === 1) {
  prevButton.disabled = true
  prevButton.style.cursor = 'not-allowed'
} 



nextButton.addEventListener('click', async function () { 
  pageNumber++
  const {data, lastPage} = await getAllLinks(pageNumber)
  linksContainer.innerHTML = ''
  const links = data.userClicks;
  createLinks(links);

  if (pageNumber === lastPage) {
    // //remove prevButton cursor style
    prevButton.style.cursor = 'pointer'
    prevButton.disabled = false
    nextButton.disabled = true
    nextButton.style.cursor = 'not-allowed'
  } else {
    prevButton.disabled = false
    prevButton.style.cursor = 'pointer'
    nextButton.disabled = false
    nextButton.style.cursor = 'pointer'
  }
  
})


prevButton.addEventListener('click', async function () { 
  pageNumber--
  const {data, lastPage} = await getAllLinks(pageNumber)
  linksContainer.innerHTML = ''
  const links = data.userClicks;
  createLinks(links);
  
  if (pageNumber === 1) {
    prevButton.disabled = true
    prevButton.style.cursor = 'not-allowed'
  }

  if (pageNumber < lastPage) {
    nextButton.disabled = false
    nextButton.style.cursor = 'pointer'
  } else {
    nextButton.disabled = true
    nextButton.style.cursor = 'not-allowed'
  }
})

//function to convert created at date to a readable format with format month day, year
function formatDate(date) { 
  const newDate = new Date(date)
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.getDate()
  const year = newDate.getFullYear()
  const formattedDate = `${month} ${day}, ${year}`
  return formattedDate
}

async function createLinks(links) {
  linksContainer.innerHTML = '';
  links.forEach((link) => {
    const linkElement = document.createElement('div');
    linkElement.classList.add('md:w-[30%]', 'w-full', 'h-auto', 'p-[1.25rem]', 'flex', 'flex-col', 'md:gap-[0.75rem]', 'gap-[0.75rem]', 'bg-[#FFF]', 'link-card');
    linkElement.innerHTML = `
    <div class="w-full h-auto flex md:flex-row justify-between gap-[0.5rem] items-center">
      <div class="w-[70%] h-auto flex flex-row gap-[0.75rem] items-center">
          <a href='${link.urlId.urlCode}' target="_blank" class="text-center font-['space_grotesk'] md:text-lg text-base font-bold text-[#1A1A19] truncate">${link.urlId.urlCode}</a>
          <a class="cursor-pointer"> <i data-url="${link.urlId.urlCode}" class="copyButton fa-regular fa-copy" style="color: #1a1a19;"></i></a>
        <div id="copyMessage" class="hidden w-full text-center font-['space_grotesk'] md:text-sm text-base  mt-2">Copied</div>
      </div>

      <div class="w-fit h-auto flex flex-row gap-[0.8rem]">
          <a <i id="editLinkButton" data-url-id="${link.urlId._id}" class=" editLinkButton fa-solid fa-pen cursor-pointer" style="color: #b5b6af;"></i></a>
          <a <i data-url-id="${link.urlId._id}" id="deleteButton" class="fa-solid fa-trash cursor-pointer deleteButton" style="color: #b5b6af;"></i></a>
      </div>

    </div>

    <div class="w-full h-auto flex flex-col gap-[0.5rem]">
        <a href="${link.urlId.url}" target="_blank" class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19] underline truncate">${link.urlId.url}</a>
        <p class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19]">Created on ${formatDate(link.urlId.created_at)}</p>

        <div class="w-full h-auto flex md:flex-row justify-between gap-[0.5rem] items-center">
            <p>${link.clicks} clicks</p>
            <a <p data-url-id="${link.urlId._id}" id="viewDetailsButton" class="viewDetailsButton text-right font-['space_grotesk'] text-base font-bold text-[#525445] underline cursor-pointer">View details</p></a>
        </div>
    </div>
  `;
    linksContainer.appendChild(linkElement);
  });
} 


const copY = async function (e) {
  const url = e.target.dataset.url
    const copyMessage = e.target.parentElement.parentElement.querySelector('#copyMessage')
    copyMessage.classList.remove('hidden')
    copyMessage.classList.add('block')
    setTimeout(() => {
      copyMessage.classList.remove('block')
      copyMessage.classList.add('hidden')
    }, 2000);
    await navigator.clipboard.writeText(url)
}


//copy urlCode to clipboard
const copyUrlCode = document.querySelector('#copyUrlCode')
copyUrlCode.addEventListener('click', async function (e) { 
  const urlCode = document.getElementById('viewUrlCode').textContent
  const copyMessage = document.querySelector('#copYMessage')
  copyMessage.classList.remove('hidden')
  copyMessage.classList.add('block')
  setTimeout(() => {
    copyMessage.classList.remove('block')
    copyMessage.classList.add('hidden')
  }, 2000);
  await navigator.clipboard.writeText(urlCode)
})

//copy qrCode to clipboard
const copyQrCode = document.querySelector('#copyQrCode')
copyQrCode.addEventListener('click', async function (e) { 
  const qrCode = document.getElementById('qrCode').src
  const copyMessage = document.querySelector('#copyMessageQR')
  copyMessage.classList.remove('hidden')
  copyMessage.classList.add('block')
  setTimeout(() => {
    copyMessage.classList.remove('block')
    copyMessage.classList.add('hidden')
  }, 2000);
  await navigator.clipboard.writeText(qrCode)
})