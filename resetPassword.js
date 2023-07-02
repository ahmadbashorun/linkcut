///// Reset Password /////
document.addEventListener("DOMContentLoaded", function() {
    const resetForm = document.getElementById("resetPasswordForm");
    const successMessage = document.getElementById("successMessage");

    resetForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Perform form validation and submission logic here
        // ...

        // If form submission is successful, show success message and redirect to otp.html
        successMessage.classList.remove("hidden");
        setTimeout(() => {
            window.location.href = "otp.html";
        }, 3000); // Redirect after 3 seconds (adjust the delay as needed)
    });
});





/////// OTP ////////
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element
    let otpForm = document.getElementById("otp-form");
  
    // Get the error message element
    let errorMessage = document.getElementById("error-message");
  
    // Add submit event listener to the form
    otpForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get the OTP input values
      let otpInputs = document.querySelectorAll(".otp-input");
      let otp = "";
      for (let i = 0; i < otpInputs.length; i++) {
        otp += otpInputs[i].value;
      }
  
      // TODO: Replace the condition with your actual OTP verification logic
      if (otp === "123456") {
        // Clear the error message
        errorMessage.textContent = "";
  
        // TODO: Handle the successful OTP verification
        console.log("OTP verified successfully");
  
        // Reset the form
        form.reset();
      } else {
        // Display the error message
        errorMessage.textContent = "Invalid OTP. Please try again.";
      }
    });
});

