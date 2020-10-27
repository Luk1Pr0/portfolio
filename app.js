// Selected DOM elements
const scrollButton = document.querySelector("#scroll-button");
const navButton = document.querySelector("#nav-button");
const aboutSection = document.querySelector("#about");
const projectSection = document.querySelector("#projects");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll("nav ul li");
const contactFormContainer = document.querySelector("#form-container");
const contactForm = document.querySelector("#contact-form");
const submitFormBtn = document.querySelector("#send-button");
const projectText = document.querySelectorAll(".project-text-container");


// Slide in project text on scroll
const displayProject = () => {
    projectText.forEach((text, i) => {
        let rectTop = projectSection.getBoundingClientRect().top;
        let windowHeight = window.innerHeight / 2;
        if (rectTop <= windowHeight) {
          text.classList.add("display-project-text");
        } else {
          text.classList.remove("display-project-text");
        }
  })
}

// Scroll to about section
const scrollToAbout = () => {
    // Scroll to the about section
    aboutSection.scrollIntoView(true);
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

const displayNav = () => {
  // Get position of about section and put it in a variable
  let showNavPos = aboutSection.getBoundingClientRect().y;
    if (showNavPos <= 80) {
        navMenu.classList.add("nav-show");
    } else {
        navMenu.classList.remove("nav-show");
    }
}


// For each link, loop through and add the closeNav functionality
const iterateLinks = () => {
  navLinks.forEach(link => {
      link.addEventListener("click", closeNav);
  })
}

// Event listeners
scrollButton.addEventListener("click", scrollToAbout);
navButton.addEventListener("click", toggleNav);
window.addEventListener("scroll", displayNav);
window.addEventListener("scroll", displayProject);

// Invoke function
iterateLinks();



// Contact form submission script
window.addEventListener("DOMContentLoaded", function() {

    // Success and Error functions for after the form is submitted
    function success() {
        contactForm.reset();
        alert("Thank you for submitting the form :)");
    }

    function error() {
        console.log("Error");
        alert("Sorry, something went wrong")
    }

    // handle the form submission event
    contactForm.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(contactForm);
      ajax(contactForm.method, contactForm.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }