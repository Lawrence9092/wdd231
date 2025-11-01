// Store the selected elements that we are going to use.
const navbutton = document.querySelector("ham-btn");

// Toggle the show class on and off
navbutton.addEventListListerner("click", () => {
    navbutton.classList.toggle("show");
});