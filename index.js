// Get the button element using its ID
let myButton = document.getElementById("btp");

if (myButton) {
    window.addEventListener('scroll', scrollFunction);

    /* When user clicks on the button, scroll to the top smoothly */
    myButton.addEventListener('click', topFunction);

    // Function to show or hide the button based on scroll position
    function scrollFunction() {
        // Check if the user has scrolled more than 10 pixels from the top
        // document.body.scrollTop is for Safari, document.documentElement.scrollTop is for Chrome, Firefox, IE and Opera
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            myButton.style.display = "block"; // Show the button
        } else {
            myButton.style.display = "none"; // Hide the button
        }
    }

    // Function to smoothly scroll the page to the top
    function topFunction() {
        // Get the element to scroll to (e.g., the body or a specific top element)
        // Ensure you have an element with id="top" at the very beginning of your body, or just scroll the body
        const topElement = document.getElementById('top') || document.body;
        topElement.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the top
    }

    // Call scrollFunction once on page load to set initial button visibility
    scrollFunction();
} else {
    console.warn("Back to Top button with ID 'btp' not found in the DOM.");
}

// --- Reveal on Scroll Animation Logic ---
// Select all elements that should reveal on scroll
const revealItems = document.querySelectorAll('.reveal-item'); // Corrected selector

// Function to check if an element is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && // Element top is within or above viewport bottom
        rect.bottom >= 0 // Element bottom is within or below viewport top
        // Added 'rect.left' and 'rect.right' checks for full visibility if needed, but often not necessary for vertical scroll
        // rect.left >= 0 &&
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll events and add/remove visibility class
function handleScroll() {
    revealItems.forEach(item => {
        if (isElementInViewport(item)) {
            item.classList.add('reveal-item--is-visible'); // Corrected class name
        } else {
            // Optional: if you want them to disappear again when scrolled out of view
            item.classList.remove('reveal-item--is-visible');
        }
    });
}

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);

// Call handleScroll once on page load to check initial visibility of elements
handleScroll();

// --- Mobile Menu Logic ---
const menuIcon = document.querySelector('.site-header__menu-icon');
const menuContent = document.querySelector('.site-header__menu-content');
const siteHeader = document.querySelector('.site-header');

if (menuIcon && menuContent && siteHeader) {
    // Add event listeners for both 'click' and 'touchstart' for better mobile compatibility
    menuIcon.addEventListener('click', function() {
        menuContent.classList.toggle('site-header__menu-content--is-visible');
        siteHeader.classList.toggle('site-header--is-expanded');
        menuIcon.classList.toggle('site-header__menu-icon--close-x');
    });
} else {
    console.warn("Mobile menu elements not found. Ensure .site-header__menu-icon, .site-header__menu-content, and .site-header exist.");
}

// --- Contact Modal Logic ---
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.querySelector('.modal__close'); // Assuming you add a close button with this class
const modal = document.querySelector('.modal');

if (openModalButtons.length > 0 && modal) {
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            modal.classList.add('modal--is-visible');
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            modal.classList.remove('modal--is-visible');
        });
    } else {
        console.warn("Modal close button with class 'modal__close' not found.");
    }

    // Close modal when clicking outside of it
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('modal--is-visible');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.classList.contains('modal--is-visible')) {
            modal.classList.remove('modal--is-visible');
        }
    });

} else {
    console.warn("Modal elements not found. Ensure .open-modal buttons and .modal exist.");
}
/*
// --- Dark Mode Logic ---
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Check for saved user preference on page load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Switch between 'light' and 'dark'
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        // Apply the theme to the HTML element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save the preference so it persists on refresh
        localStorage.setItem('theme', theme);
    });
}
*/