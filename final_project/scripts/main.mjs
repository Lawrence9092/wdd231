// main.mjs — header nav toggle, footer year, minimal theme persistence
import { initModal } from './modal.mjs';

// init DOM when ready
document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearSpan = document.getElementById('footerYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // nav toggles (multiple pages may have button)
  document.querySelectorAll('#navToggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // find nearest primaryNav in the document
      const nav = document.querySelector('#primaryNav');
      if (!nav) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // toggle nav visibility on small screens
      nav.style.display = expanded ? '' : 'block';
    });
  });

  // on resize restore nav display for large screens
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
      document.querySelectorAll('#primaryNav').forEach(n => n.style.display = '');
      document.querySelectorAll('#navToggle').forEach(b => b.setAttribute('aria-expanded','false'));
    }
  });

  // restore theme if stored (example)
  if (localStorage.getItem('siteTheme') === 'dark') document.body.classList.add('dark-mode');

  // init modal utilities (if present)
  if (typeof initModal === 'function') initModal();
});
