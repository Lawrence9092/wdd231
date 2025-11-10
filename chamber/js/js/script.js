// ==========================
// Responsive Menu Toggle
// ==========================
const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// ==========================
// Footer Auto Updates
// ==========================
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ==========================
// Grid/List View Toggle
// ==========================
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const directory = document.getElementById('memberDirectory');

gridBtn.addEventListener('click', () => {
  directory.classList.add('grid-view');
  directory.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list-view');
  directory.classList.remove('grid-view');
});
