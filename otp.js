
/////// OTP ////////
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element
    let otpForm = document.getElementById("otp-form");
  
    // Get the error message element
    let errorMessage = document.getElementById("errorMessage");
  
    // Add submit event listener to the form
    otpForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get the OTP input values
      let otpInputs = document.querySelectorAll(".otp-input");
      let otp = "";
      for (let i = 0; i < otpInputs.length; i++) {
        otp += otpInputs[i].value;
        }
        
        console.log(otp);
        if (otp.length < 6) { 
            errorMessage.textContent = "Please enter a valid OTP";
            errorMessage.classList.remove("hidden");
        } else {
            errorMessage.classList.add("hidden");
            verifyOtp(otp);
        }
  
      
    });
});


//api call to 'https://linkcut-aomz.onrender.com' to verify OTP
async  function verifyOtp(otp){
    const response = await fetch('https://linkcut-aomz.onrender.com/auth/resetpassword', {
        method: 'POST',
        body: JSON.stringify({ otp: otp }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
}