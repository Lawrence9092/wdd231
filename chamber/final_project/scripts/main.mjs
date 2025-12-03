import { initModal } from './modal.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearSpan = document.getElementById('footerYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // nav toggle (hamburger) - accessible
  document.querySelectorAll('#navToggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('#primaryNav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.style.display = expanded ? '' : 'block';
    });
  });

  // restore display on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
      document.querySelectorAll('#primaryNav').forEach(nav => nav.style.display = '');
      document.querySelectorAll('#navToggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
    }
  });

  // localStorage theme example (persisted)
  const saved = localStorage.getItem('siteTheme');
  if (saved === 'dark') document.body.classList.add('dark-mode');

  // init modal utility (focus trap etc)
  initModal();
});
