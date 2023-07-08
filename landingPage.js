
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




