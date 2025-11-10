// ==========================
// Responsive Menu Toggle
// ==========================
const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}

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

if (gridBtn && listBtn && directory) {
  gridBtn.addEventListener('click', () => {
    directory.classList.add('grid-view');
    directory.classList.remove('list-view');
  });

  listBtn.addEventListener('click', () => {
    directory.classList.add('list-view');
    directory.classList.remove('grid-view');
  });
}

// ==========================
// Highlight Active Navigation Link
// ==========================
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll(".main-nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
