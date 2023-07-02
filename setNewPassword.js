////// Set new Password ////////
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
    }
  
    if (newPassword !== confirmNewPassword) {
        pwdErrorMessage.textContent = 'Passwords do not match';
        pwdErrorMessage.classList.remove('hidden');
        return;
    }
  
    // If validation passes, redirect to login.html
    window.location.href = 'login.html';
}
  
// Add form submit event listener
const setNewform = document.getElementById('setNewPwdform');
setNewform.addEventListener('submit', submitForm);
  