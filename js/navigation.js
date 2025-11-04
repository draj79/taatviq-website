const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
// Selects ALL the main <li> elements that contain a dropdown
const dropdownParents = document.querySelectorAll('.nav-links > li'); 

// 1. Mobile Menu Toggle Logic
hamburger.addEventListener('click', () => {
    // Toggle a class on the nav-links container to show/hide the whole menu
    navLinks.classList.toggle('nav-open');
    
    // Optional: Add a class to the hamburger for animated transitions (e.g., changing bars to an 'X')
    hamburger.classList.toggle('is-active');
});

// 2. Sub-Menu Dropdown Toggle Logic
dropdownParents.forEach(parentLi => {
    // Find the primary link within this <li> (e.g., the 'Home' link)
    const primaryLink = parentLi.querySelector('a:first-child');
    
    // Find the dropdown container associated with this <li>
    const dropdown = parentLi.querySelector('.dropdown');

    if (primaryLink && dropdown) {
        primaryLink.addEventListener('click', (e) => {
            // Prevent the link from navigating if it's meant to toggle the sub-menu on mobile
            // Use 'e.preventDefault()' only if the link URL is 'javascript:void(0)' or '#' on mobile.
            // Since your link is 'javascript:void(0)', we can safely prevent default here.
            e.preventDefault(); 
            
            // Toggle the 'dropdown-open' class on the parent <li>
            parentLi.classList.toggle('dropdown-open');
        });
    }
});


// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');
// let menuOpen = false;

// hamburger.addEventListener('click', () => {
//     if (menuOpen == false) {
//         navLinks.style.display = "block";
//         menuOpen = true;
//     }
//     else if (menuOpen == true) {
//         navLinks.style.display = "none";
//         menuOpen = false;
//     }
// });
