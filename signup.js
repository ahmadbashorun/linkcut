////// Sign Up ////////

// Get the form element
const signupForm = document.getElementById('signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages and styling
    const errorMessages = document.getElementsByClassName('error-message');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].textContent = '';
    }
    const inputFields = document.getElementsByClassName('form-input');
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].classList.remove('error');
        inputFields[i].style = "1px solid #8F9399"
    }


    // Validate input fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const userEmail = document.getElementById('userEmail');
    const password = document.getElementById('userPassword');

    let hasError = false;

    // Check first name
    if (firstName.value.trim() === '') {
        displayError(firstName, 'Please enter your first name.');
        hasError = true;
    }else if (firstName.value.length < 3){
        displayError(firstName, 'Please enter a valid first name')
    }

    // Check last name
    if (lastName.value.trim() === '') {
        displayError(lastName, 'Please enter your last name.');
        hasError = true;
    }else if (firstName.value.length < 3){
        displayError(firstName, 'Please enter a valid last name')
    }

    // Check email
    if (userEmail.value.trim() === '') {
        displayError(userEmail, 'Please enter your email address.');
        hasError = true;
    } else if (!isValidEmail(userEmail.value)) {
        displayError(userEmail, 'Please enter a valid email address.');
        hasError = true;
    }

    // Check password
    if (password.value === '') {
        displayError(password, 'Please enter a password.');
        hasError = true;
    }else if (password.value.length < 6) {
        displayError(password, 'Password must be at least 6 characters.');
        hasError = true;
    }

    // If there are errors, prevent form submission
    if (hasError) {
    return;
    }

    // Redirect to dashboard on successful signup
    window.location.href = 'dashboard.html';
});

// Function to display error message and add error styling
function displayError(inputField, errorMessage) {
const errorElement = inputField.nextElementSibling;
errorElement.textContent = errorMessage;
inputField.classList.add('error');
inputField.style.border = "1px solid red"
}

// Function to validate email using a simple regex pattern
function isValidEmail(userEmail) {
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
return emailRegex.test(userEmail);
}




/////// Log in //////
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from being submitted
  
    // Get the input values
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
  
    // Perform validation (you can add your own validation logic here)
  
    // Placeholder code to simulate login/signup success
    const success = true;
  
    if (success) {
      // Redirect to the dashboard page
      window.location.href = 'dashboard.html';
    } else {
      // Show the error message
      const loginError = document.getElementById('loginError');
      loginError.classList.remove('hidden');
    }
}
  
// Add event listener to the form submit event
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleFormSubmit);






  



// /////// Dashboard ///////

// //Open and close Create link modal
// const newLinkButton = document.getElementById('new-link-button');
// const createLinkModal = document.getElementById('create-link-modal');
// const closeNewLinkIcon = document.getElementById('createLinkCancel');
// const destinationURL = document.getElementById('destinationURL')

// function openNewLinkModal(){
//     createLinkModal.classList.remove('hidden')
//     destinationURL.focus()
// }
// newLinkButton.addEventListener('click', openNewLinkModal)

// // newLinkButton.addEventListener('click', function() {
// //     createLinkModal.style.display = 'block';
// // });

// // closeIcon.addEventListener('click', function() {
// //     closeNewLinkIcon.style.display = 'none';
// // });
 
  
  
  
  
  
  
  


