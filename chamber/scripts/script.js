// ==========================
// Responsive Menu Toggle
// ==========================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// ==========================
// Footer Auto Updates
// ==========================
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

// ==========================
// Grid/List View Toggle (Directory Page Only)
// ==========================
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const directory = document.getElementById("memberDirectory");

if (gridBtn && listBtn && directory) {
  gridBtn.addEventListener("click", () => {
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
  });
}
