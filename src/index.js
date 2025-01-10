import { openModal, closeModal } from './components/modal.js';
import { createCard } from './components/card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('#profile-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileForm = document.querySelector('#profile-form');
const nameInput = profileForm.querySelector('#name-input');
const jobInput = profileForm.querySelector('#job-input');
const addCardForm = document.querySelector('#add-card-form');
const cardContainer = document.querySelector('.cards__container');

// Открытие и закрытие попапов
profileEditButton.addEventListener('click', () => openModal(profileModal));
profileModal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal')) {
    closeModal(profileModal);
  }
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = addCardForm.querySelector('#card-name-input').value;
  const link = addCardForm.querySelector('#card-link-input').value;

  const card = createCard(name, link);
  cardContainer.prepend(card);
  closeModal(addCardModal);
});

addCardModal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal')) {
    closeModal(addCardModal);
  }
});

// Обработчик для редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
});