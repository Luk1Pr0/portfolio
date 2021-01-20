// Selected DOM elements
const scrollButton = document.querySelector("#scroll-button");
const navButton = document.querySelector("#nav-button");
const aboutSection = document.querySelector("#about");
const projectSection = document.querySelector("#projects");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll("nav ul li");
const pageLinks = document.querySelectorAll("nav ul li a");
const contactFormContainer = document.querySelector("#form-container");
const contactForm = document.querySelector("#contact-form");
const formInputs = document.querySelectorAll('input');
const submitFormBtn = document.querySelector("#send-button");
const alertContainer = document.querySelector('#alert-container');
const alertContainerText = document.querySelector('#alert-text');
const projectText = document.querySelectorAll(".project-text-container");
const projectImage = document.querySelectorAll(".project-image-container");
const header = document.querySelector("header");
const headerText = document.querySelector(".header-text");
const headerButton = document.querySelector(".button-container");
const darkOverlay = document.querySelector('.switch-overlay');

// Slide in project text on scroll
const displayProjectText = () => {
    projectText.forEach((text) => {
        // Position of project text from top
        let rectTop = text.getBoundingClientRect().top;
        // Position of scroll divided
        let viewHeight = window.innerHeight / 1.5;
        if (rectTop <= viewHeight) {
            text.classList.add("display-project-text");
        } else {
            text.classList.remove("display-project-text");
        }
    })
}

// Slide in project image on scroll
const displayProjectImage = () => {
    projectImage.forEach((image) => {
        // Position of project text from top
        let imgTop = image.getBoundingClientRect().top;
        // Position of scroll divided
        let viewHeight = window.innerHeight / 1.5;
        if (imgTop <= viewHeight) {
            image.classList.add("display-project-image");
        } else {
            image.classList.remove("display-project-image");
        }
    })
}

// Run the display project function when project section in view
const inView = () => {
    let windowHeight = window.innerHeight;
    let height = projectSection.getBoundingClientRect().top - windowHeight;
    let bottom = projectSection.getBoundingClientRect().bottom - windowHeight;
    if (height < 0 && bottom > 0) {
        displayProjectText();
        displayProjectImage();
    }
}

// Scroll to about section
const scrollToAbout = () => {
    const sectionPos = aboutSection.getBoundingClientRect().top;
    // Scroll smooth when the find out more button is clicked
    window.scroll({
        top: sectionPos,
        behavior: 'smooth'
    });
}

const toggleNav = () => {
    navMenu.classList.toggle("nav-active");
    // Toggle burger menu
    navButton.classList.toggle("active-bar");
}

const closeNav = () => {
    navMenu.classList.remove("nav-active");
    navButton.classList.remove("active-bar");
}

// Display dark overlay and hide it after user clicks on link
const displayOverlay = () => {
    // For each link add an event listener
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            darkOverlay.classList.remove('hidden');
            setTimeout(() => scrollToPage(e), 800);
            setTimeout(hideOverlay, 800);
        });
    });
}

// Add the hidden class back
const hideOverlay = () => {
    darkOverlay.classList.add('hidden');
}

// Scroll to the page section
const scrollToPage = (e) => {
    // Get the href name of the selected a tag
    const pageLocation = e.srcElement.attributes.href.value;
    // Scroll to the selected positon
    location.href = pageLocation;
}

const displayNav = () => {
    // Dynamic top position of the about section
    const sectionPos = aboutSection.getBoundingClientRect().top - 50;
    // Get position of about section and put it in a variable
    let showNavPos = aboutSection.getBoundingClientRect().y;
    if (showNavPos <= 80) {
        navMenu.classList.add("nav-show");
    } else {
        navMenu.classList.remove("nav-show");
    }
    // If screen width is less than or equal to 1000 then run below code
    if (window.innerWidth <= 1000) {
        // If scroll pos reaches or exceeds the position of the about section then remove the hidden class
        if (sectionPos <= 0) {
            navButton.classList.remove('hidden-button');
        } else {
            navButton.classList.add('hidden-button');
        }
    }
}

// For each link, loop through and add the closeNav functionality
const iterateLinks = () => {
    navLinks.forEach(link => {
        link.addEventListener("click", closeNav);
    })
}

// Show header after certain time
const showHeader = () => {
    setTimeout(() => {
        header.classList.add("display-opacity");
    }, 500);
    setTimeout(() => {
        headerText.classList.add("display-opacity");
    }, 1500);
    setTimeout(() => {
        headerButton.classList.add("display-opacity");
    }, 2500);
}

// Alert user if the form has been submitted succesfully or if it has failed
const alertUser = (hasSubmitted) => {
    // Hide the form container
    contactFormContainer.setAttribute('hidden', 'true');
    if (hasSubmitted === 'success') {
        alertContainerText.textContent = 'Your message has been sent. I will be in touch soon';
        alertContainerText.style.border = '2px solid rgba(0, 220, 0)';
        alertContainerText.style.padding = '10px 15px';
        alertContainerText.style.color = 'rgba(0, 220, 0)';
        setTimeout(hideAlert, 3000);
    } else {
        alertContainerText.textContent = 'Could not send your message. Please try again';
        alertContainerText.style.border = '2px solid crimson';
        alertContainerText.style.padding = '10px 15px';
        alertContainerText.style.color = 'crimson';
        setTimeout(hideAlert, 3000);
    }
    // Display the alert container
    alertContainer.removeAttribute('hidden');
}

// Hide the user alert and display the contact form again
const hideAlert = () => {
    alertContainer.setAttribute('hidden', 'true');
    alertContainerText.text = '';
    contactFormContainer.removeAttribute('hidden');
}

// Event listeners
scrollButton.addEventListener("click", scrollToAbout);
navButton.addEventListener("click", toggleNav);
window.addEventListener("scroll", displayNav);
window.addEventListener("scroll", inView);

// Invoke function on load
iterateLinks();
showHeader();
displayOverlay();

// Contact form submission script
window.addEventListener("DOMContentLoaded", function () {

    // Success and Error functions for after the form is submitted
    function success() {
        contactForm.reset();
        alertUser('success');
    }

    function error() {
        alertUser('failed')
    }

    // Handle the form submission event
    contactForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        let data = new FormData(contactForm);
        ajax(contactForm.method, contactForm.action, data, success, error);
    });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}