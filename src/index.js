import { addCard } from './components/card'
import { closeModal, openModal } from './components/modal'
import './pages/index.css'

// переменные для формы редактирования профиля
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const formEditProfile = document.querySelector('form[name="edit-profile"]')
const nameInput = formEditProfile.querySelector('.popup__input_type_name')
const jobInput = formEditProfile.querySelector('.popup__input_type_description')

editButton.addEventListener('click', openModalEditProfile)
formEditProfile.addEventListener('submit', handleFormEditSubmit)

function openModalEditProfile() {
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
    clearValidation(formEditProfile, validationConfig)
    openModal(editPopup)
}

function handleFormEditSubmit(evt) {
    evt.preventDefault()
    const button = evt.target.querySelector('.popup__button')
    renderLoading(true, button)

    const updateProfileData = {
        name: nameInput.value,
        about: jobInput.value,
    }
    // Обновляем локально без использования сервера
    renderUserData(updateProfileData)
    closeModal(editPopup)
    renderLoading(false, button)
}

const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')

const formNewPlace = document.querySelector('form[name="new-place"]')
const namePlaceInput = formNewPlace.querySelector('.popup__input_type_card-name')
const linkInput = formNewPlace.querySelector('.popup__input_type_url')

// слушатель кнопки открытия попапа для добавления новой карточки
addButton.addEventListener('click', evt => {
    evt.stopPropagation()
    clearValidation(formNewPlace, validationConfig)
    openModal(addCardPopup)
})

formNewPlace.addEventListener('submit', evt => {
    evt.stopPropagation()
    handleNewCardSubmit(evt)
    document.querySelector('.popup__button').disabled = true
    clearValidation(formNewPlace, validationConfig)
})

// функция добавления новой карточки в начало страницы
function handleNewCardSubmit(evt) {
    evt.preventDefault()
    const button = evt.target.querySelector('.popup__button')
    renderLoading(true, button)

    const namePlaceValue = namePlaceInput.value
    const linkValue = linkInput.value

    const newCardData = {
        name: namePlaceValue,
        link: linkValue,
    }
    // Добавляем карточку локально, без использования сервера
    const newCardElement = addCard(newCardData)
    cardList.prepend(newCardElement)
    closeModal(addCardPopup)
    formNewPlace.reset()
    renderLoading(false, button)
}

// <----------------------------------------------------------->

// переменные для открытия попапа с картинкой
const modalTypeImg = document.querySelector('.popup_type_image')
const modalImg = modalTypeImg.querySelector('.popup__image')
const modalCaption = modalTypeImg.querySelector('.popup__caption')

// функция открытия модального окна изображения карточки
function openImgModal(img) {
    modalImg.src = img.src
    modalImg.alt = img.alt
    modalCaption.textContent = img.alt
    openModal(modalTypeImg)
}

// <---------------------------------------------------------->

const deleteCardPopup = document.querySelector('.popup_type_delete-card')
let cardDelete
let cardElementDelete
const deleteCardButton = document.querySelector('.popup__button_delete-card')

// функция открытия попапа для удаления карточки
function openModalDeleteCard(card, cardElement) {
    cardDelete = card
    cardElementDelete = cardElement
    openModal(deleteCardPopup)
}

// функция обработчик удаления карточки
function handleDeleteCard(evt, card, cardElement) {
    evt.preventDefault()
    // Удаляем карточку локально
    cardElement.remove()
    closeModal(deleteCardPopup)
}

// удаление карточки по кнопке согласия "да"
deleteCardButton.addEventListener('click', evt => {
    evt.stopPropagation()
    handleDeleteCard(evt, cardDelete, cardElementDelete)
})

// функция для постановки и снятия лайка
function handleLike(button, cardId, countLikes) {
    const likeMethod = button.classList.contains('card__like-button_is-active')
        ? removeLike
        : addLike
    likeMethod(cardId)
        .then(cardData => {
            countLikes(cardData.likes)
            button.classList.toggle('card__like-button_is-active')
        })
        .catch(err => console.log(err))
}

// <--------------------------------------------------->

// ЗАКРЫТИЕ ПОПАПОВ ПО КРЕСТИКУ
// все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close')

closeButtons.forEach(button => {
    button.addEventListener('click', evt => {
        const popup = evt.target.closest('.popup')
        closeModal(popup)
    })
})
