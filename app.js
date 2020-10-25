// Selected DOM elements
const scrollButton = document.querySelector("#scroll-button");
const navButton = document.querySelector("#nav-button");
const aboutSection = document.querySelector("#about");
const navMenu = document.querySelector("#nav-menu");

// Scroll to about section
const scrollToAbout = () => {
    // Scroll to the about section
    aboutSection.scrollIntoView(true);
}

const toggleNav = (e) => {
    navMenu.classList.toggle("nav-active");
    navButton.classList.toggle("active-bar")
    // if (navMenu.classList.contains("nav-active")) {
    //     navButton.classList.add("active-bar");
    // } else {
    //     navButton.classList.remove("active-bar");
    // }
}

// const closeNav = () => {
//     navMenu.classList.remove("nav-active");
// }

// Event listeners
scrollButton.addEventListener("click", scrollToAbout);
navButton.addEventListener("click", toggleNav);