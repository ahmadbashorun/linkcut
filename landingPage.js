
//Open and close Mobile Nav menu
const navMenuDropdown = document.getElementById('navMenuDropdown')
const navMenuButton = document.getElementById('navMenuButton')
const closeNavmenu = document.getElementById('closeNavMenu')

function openNavMenu(){
    navMenuDropdown.classList.remove('hidden')
}

navMenuButton.addEventListener('click', openNavMenu)

function closeNavModal(){
    if(!navMenuDropdown.classList.contains('hidden')){
        navMenuDropdown.classList.add('hidden')
    }
}

closeNavmenu.addEventListener('click', closeNavModal)

const base_api = 'https://linkcut-aomz.onrender.com'

//an event listener to listen for when the page loads
window.addEventListener('load', async () => { 
    //call the homepage api
    await getHomepage();
})

const getHomepage = async () => { 
    const response = await fetch(`${base_api}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
}


//creating a new link

//Create New Link Form Validation
const createLinkForm = document.getElementById('createLinkForm');
const destinationURLInput = document.getElementById('destinationURL')
const backHalfInput = document.getElementById('backHalf')

createLinkForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission
  
    //get all the links for the user
    const data = await getLinks();
    console.log(data)
    if (data.data.userClicks.length < 1) {
        // Validate destination URL
        const destinationURL = destinationURLInput.value.trim();
        if (destinationURL === '') {
            // Show error message
            showError(destinationURLInput, 'Destination URL is required');
            setTimeout(function () {
                const errorElement = destinationURLInput.nextElementSibling;
                errorElement.textContent = '';
            }, 2000)
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
            }, 2000)
            return;
        }
        const urlData = {
            url: destinationURL,
            slug: backHalf,
        }
  
        //call api to create link
        const data = await createLink(urlData)

        if (data.error) {
            // Show error message
            showError(destinationURLInput, data.error);
            setTimeout(function () {
                const errorElement = destinationURLInput.nextElementSibling;
                errorElement.textContent = '';
            }, 2000)
            return;
        } else {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = `Link created: ${data.newUrl.urlCode}`;
            setTimeout(function () {
                successMessage.textContent = '';
            }, 2000)
            
            //clear the form
            destinationURLInput.value = '';
            backHalfInput.value = '';

            //display the new link
            const newLink = document.getElementById('newLink');
            newLink.classList.remove('hidden');
            const viewUrlCode = document.getElementById('viewUrlCode');
            viewUrlCode.textContent = data.newUrl.urlCode;

            //copy the link to clipboard
            const copyButton = document.getElementById('copyUrlCode');
            copyButton.addEventListener('click', function () { 
                const urlCode = data.newUrl.urlCode;
                navigator.clipboard.writeText(urlCode);
                
                //display the copied message
                const copYMessage = document.getElementById('copYMessage');
                copYMessage.classList.remove('hidden');
                setTimeout(function () { 
                    copYMessage.classList.add('hidden');
                }, 2000)
            });
        }
        
    } else if(data.data.userClicks.length >= 1) {
        window.location.href = 'login.html';
    }
});

//function to create a new link
const createLink = async function(urlData) { 
  const response = await fetch(`${base_api}/urls`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(urlData),
  });
  const data = await response.json();
 
  return data;
}


function showError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = errorMessage;
  }
  
function clearError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
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
  
//function to get all links for a user
const getLinks = async function () { 
    const response = await fetch(`${base_api}/user/clicks`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}