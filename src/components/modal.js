export function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalByEsc);
}

export function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.modal_opened');
    if (openModal) closeModal(openModal);
  }
}
