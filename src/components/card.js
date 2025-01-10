export function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener('click', () =>
    likeButton.classList.toggle('card__like-button_active')
  );

  cardImage.addEventListener('click', () => handleCardClick(link, name));

  return cardElement;
}

export function handleCardClick(link, name) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const imageModal = document.querySelector('#image-modal');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imageModal);
}
