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
    const inputFields = document.getElementsByClassName('form-inputs');
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
   
   // api call to signup
    signup();
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


//function  to call the api to signup
function signup() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userEmail = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const data = {
        firstName,
        lastName,
        email: userEmail,
        password
    }
    fetch('https://tame-gold-chipmunk-boot.cyclic.app/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            if (data.success === true) {
                window.location.href = 'login.html';
            } else {
                if (data.error === 'Duplicate key value entered') {
                    const emailError = document.getElementById('userEmail').nextElementSibling;
                    emailError.textContent = 'Email already exists.';
                    emailError.classList.add('error');
                     //remove after 2 seconds
                    setTimeout(async () => {
                        emailError.textContent = '';
                    },2000)
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

