
/////// Log in //////
// Add event listener to the form submit event
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleFormSubmit);


// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from being submitted
    
    //change the textContent of the login to logging in
    const loginButton = document.getElementById('loginButton');
    loginButton.textContent = 'Logging in...';
    
    // Get the input values
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
  
    if (!userEmail == '' && !userPassword == '') {
        login();
    }
}
  
// api call to login user 
async function login() { 
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    const loginError = document.getElementById('loginError');
    const response = await fetch('https://linkcut-aomz.onrender.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: userEmail, password: userPassword }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    //store token in local storage
    localStorage.setItem('token', data.token);
    if (data.success === true) {
        window.location.href = 'dashboard.html';
    } else {
        loginError.classList.remove('hidden');
        loginError.textContent = data.error;
        //change the textContent back to login
        const loginButton = document.getElementById('loginButton');
        loginButton.textContent = 'Log in';
    
        setTimeout(() => {
            loginError.textContent = '';
        },2000)
    }
}





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
 
  
  
  
  
  
  
  


