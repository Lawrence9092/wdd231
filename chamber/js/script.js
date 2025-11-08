// Responsive menu toggle
const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
