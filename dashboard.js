//base api
const base_api = 'https://linkcut-aomz.onrender.com' 

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
  const destinationURL = destinationURLInput.value.trim();
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
  console.log(data)

  if (data.error) { 
    // Show error message
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
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
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

function openLinkDetails(){
    linkDetailsModal.classList.remove('hidden')
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
    openEditLink()
  }
  if(event.target.classList.contains('deleteLinkButton')){
    openDeleteLink()
  }
  if(event.target.classList.contains('viewDetailsButton')){
    openLinkDetails()
  }
})

const editLinkButton = document.getElementById('editLinkButton')
const editLinkModal = document.getElementById('editLinkModal')
const closeEditLinkIcon = document.getElementById('closeEditLinkModal')

function openEditLink() {
    editLinkModal.classList.remove('hidden')
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

