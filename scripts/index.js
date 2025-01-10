// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Селекторы
const cardTemplate = document.querySelector('#card-template').content; // Шаблон карточки
const cardList = document.querySelector('.places__list'); // Контейнер для карточек

function createCard(cardData, onDelete) {
  // Клонируем шаблон
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Устанавливаем значения
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик для удаления
  deleteButton.addEventListener('click', () => onDelete(cardElement));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

// Добавление всех карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
});