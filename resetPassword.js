///// Reset Password /////
document.addEventListener("DOMContentLoaded", function() {
    const resetForm = document.getElementById("resetPasswordForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    const email = document.getElementById("userEmail");
  
    resetForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
      
        // Perform form validation and submission logic here
      if (email.value.trim() === '') { 
          errorMessage.textContent = "Please enter your email address.";
          errorMessage.classList.remove("hidden");
      } else {
        console.log('got here')
        errorMessage.classList.add("hidden");
        resetPassword();
      }
      
    

    });
});

// api call to 'https://linkcut-aomz.onrender.com' to reset password
async function resetPassword() { 
    let userEmail = document.getElementById('userEmail').value;
    const errorMessage = document.getElementById('errorMessage');
    const response = await fetch('https://linkcut-aomz.onrender.com/auth/forgotpassword', {
        method: 'POST',
        body: JSON.stringify({ email: userEmail }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
        window.location.href = 'otp.html';
    } else {
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = data.error;
    }
}
