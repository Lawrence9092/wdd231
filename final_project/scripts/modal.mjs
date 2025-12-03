// modal.mjs — accessible modal initializer (exposes window.appModal.openModal)
export function initModal(){
  const modal = document.getElementById('oppModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const titleEl = modal.querySelector('#modalTitle');
  const bodyEl = modal.querySelector('#modalBody');

  function openModal(title = '', body = ''){
    titleEl.textContent = title;
    bodyEl.textContent = body;
    modal.setAttribute('aria-hidden','false');
    // store focus
    modal._prevFocus = document.activeElement;
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (modal._prevFocus) modal._prevFocus.focus();
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });

  window.appModal = { openModal, closeModal };
}
