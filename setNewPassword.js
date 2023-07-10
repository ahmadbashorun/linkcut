////// Set new Password ////////

// Add form submit event listener
const setNewform = document.getElementById('setNewPwdform');
setNewform.addEventListener('submit', submitForm);
  

// Function to validate and submit the form
function submitForm(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    const newPassword = document.getElementById('userNewPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
  
    // Reset error message
    const pwdErrorMessage = document.getElementById('setNewPwdError');
    pwdErrorMessage.textContent = '';
    pwdErrorMessage.classList.add('hidden');
  
    // Validate input values
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        pwdErrorMessage.textContent = 'Passwords must be at least 6 characters long';
        pwdErrorMessage.classList.remove('hidden');
        return;
    } else {
        setNewPassword();
    }
  
    
  
   
}
  

//api call to 'https://linkcut-aomz.onrender.com' to set new password
async function setNewPassword() { 
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const pwdErrorMessage = document.getElementById('setNewPwdError');
    const newPassword = document.getElementById('userNewPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    const response = await fetch(`https://tame-gold-chipmunk-boot.cyclic.app/auth/resetpassword/?email=${encodeURIComponent(email)}`, {
        method: 'PUT',
        body: JSON.stringify({password: newPassword, confirmPassword: confirmNewPassword }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.success === true) {
        window.location.href = `login.html`;
    } else {
        if (data.error === 'Please verify otp') {
            window.location.href = `resetPassword.html`;
        } else {
            pwdErrorMessage.classList.remove("hidden");
            pwdErrorMessage.textContent = data.error;
            setTimeout(() => {
                pwdErrorMessage.classList.add("hidden");
            }, 2000);
        } 
    }
}