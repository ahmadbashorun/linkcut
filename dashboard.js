
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



//Create New Link Form Validation
const createLinkForm = document.getElementById('createLinkForm');

createLinkForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Validate destination URL
  const destinationURL = destinationURLInput.value.trim();
  if (destinationURL === '') {
    // Show error message
    showError(destinationURLInput, 'Destination URL is required');
    return;
  } else if (!isValidURL(destinationURL)) {
    // Show error message
    showError(destinationURLInput, 'Please enter a valid URL');
    // destinationURLInput.setCustomValidity('Please enter a valid URL');
    // destinationURLInput.reportValidity();
    return;
  }
  
  // Validate back half
  const backHalf = backHalfInput.value.trim();
  if (backHalf !== '' && !isValidBackHalf(backHalf)) {
    // Show error message
    showError(backHalfInput, 'Invalid back half');
    return;
  }
  
  // Form is valid, proceed with submission
  // You can add your code here to handle the form submission
  //User should be directed to link details modal
  
  // Reset form and clear error messages
  createLinkForm.reset();
  clearError(destinationURLInput);
  clearError(backHalfInput);
});

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
viewDetailsButton.addEventListener('click', openLinkDetails)

function closeLinkDetail(){
    if(!linkDetailsModal.classList.contains('hidden')){
        linkDetailsModal.classList.add('hidden')
        // closeNewLinkIcon.style.display = 'none'
    }
}
closeLinkDetailsIcon.addEventListener('click', closeLinkDetail)


//Open and Close Edit Modal Screen
const editLinkButton = document.getElementById('editLinkButton')
const editLinkModal = document.getElementById('editLinkModal')
const closeEditLinkIcon = document.getElementById('closeEditLinkModal')

function openEditLink(){
    editLinkModal.classList.remove('hidden')
}
editLinkButton.addEventListener('click', openEditLink)

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



////Open and close delete link modal
const deleteButton = document.getElementById('deleteButton')
const deleteLinkModal = document.getElementById('deleteLinkModal');
const closeDeleteLinkIcon = document.getElementById('closeDeleteLinkModal');
const confirmDeleteLinkBtn = document.getElementById('confirmDeleteLinkBtn');
const cancelDeleteLinkBtn = document.getElementById('cancelDeleteLinkBtn');

function openDeleteLinkModal() {
    deleteLinkModal.classList.remove('hidden');
}

function closeDeleteLinkModal() {
  if(!deleteLinkModal.classList.contains('hidden')){
    deleteLinkModal.classList.add('hidden')
  }
}

// Open the delete link modal when a delete button is clicked
deleteButton.addEventListener('click', openDeleteLinkModal);

// Close the delete link modal when the close icon is clicked
closeDeleteLinkIcon.addEventListener('click', closeDeleteLinkModal);

// Close the delete link modal when the cancel button is clicked
cancelDeleteLinkBtn.addEventListener('click', closeDeleteLinkModal);

// Handle the delete link operation when the confirm button is clicked
confirmDeleteLinkBtn.addEventListener('click', function() {
    // Add your code here to handle the delete link operation
    // This is just an example, you need to implement your own logic
    console.log('Link deleted!');
    closeDeleteLinkModal();
});


////Open and close edit and delete link from modal



///Pagination
//Use query selector all to get all link cards and store them in an array
//Get the container by id
//get pagi

const linkCardContainer = document.getElementById('linkCardCtn')

const linksArray = []
const listOfLinks = document.getElementsByClassName('link-card')
linksArray.push(listOfLinks)

let currentPage = 1
let cardNumber = 9


function displayLinks(links, container, linksPerPage, page){
  page--

  let start = linksPerPage * page
  let end = start + linksPerPage
  let paginatedItems = links.slice(start, end)


  // for (let i = 0; i<paginatedItems.length; i++){
  //   let 
  // }

return paginatedItems

}

displayLinks(linksArray, linkCardContainer, cardNumber, currentPage)
console.log(displayLinks)




