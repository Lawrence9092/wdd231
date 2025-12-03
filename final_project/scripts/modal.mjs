// simple accessible modal: toggles aria-hidden and traps focus minimally
export function initModal(){
  const modal = document.getElementById('oppModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const modalTitle = modal.querySelector('#modalTitle');
  const modalBody = modal.querySelector('#modalBody');

  function openModal(title, body){
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.setAttribute('aria-hidden','false');
    // save previously focused
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
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // expose open/close globally for other modules
  window.appModal = { openModal, closeModal };
}
