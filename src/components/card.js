//Назначение: содержит информацию по работе с карточками и попапами с изображением

//import { NoEmitOnErrorsPlugin } from 'webpack';
import {initialCardsReverse} from './constants.js';
import {openPopup} from './utils.js';

export {
  buttonAddCard,
  cardNameInput,
  cardAboutInput,
  buttonClosePopupAddCard,
  buttonClosePopupImage,
  popupFormAddCard,
  popupAddCard,
  popupImageContainer,
  addCard,
  createCard};

//Переменные
// Попап для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.user-profile__button-add');
const popupFormAddCard = popupAddCard.querySelector('.form_type_add-card');
const cardNameInput = popupFormAddCard.querySelector('.form__input_type_card-name');
const cardAboutInput = popupFormAddCard.querySelector('.form__input_type_link');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__button-close_type_card');

// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;

// Блок, в который будут добавлены новые карточки
const cardList = document.querySelector('.cards');

// Попап с фото
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImageItem = popupImageContainer.querySelector('.popup__image');
const popuImageName = popupImageContainer.querySelector('.popup__image-name');
const buttonClosePopupImage = popupImageContainer.querySelector('.popup__button-close_type_image');

//Cоздание новой карточки
function createCard(name, link, cardId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardElement.id = cardId;

  buttonLikeCard.addEventListener('click', handleLikeIcon);
  buttonDeleteCard.addEventListener('click', handleDeleteIcon);
  cardImage.addEventListener('click', () => handlePreviewPicture(name, link));

  return cardElement;
}

//Добавление/снятие отметки "Нравится"
function handleLikeIcon(evt) {
  evt.target.classList.toggle('card__button-like_active');
}

//Удаление карточки
function handleDeleteIcon(evt) {
  evt.target.closest('.card').remove();
}

//Открытие попапа с фото
function handlePreviewPicture(name, link) {
  openPopup(popupImageContainer);
  popupImageItem.src = link;
  popupImageItem.alt = name;
  popuImageName.textContent = name;
}

//Добавление карточки в разметку
function addCard(userText, userLink, cardId) {
  cardList.prepend(createCard(userText, userLink, cardId));
}

/*// Добавление карточек в разметку по умолчанию из массива
initialCardsReverse.forEach(function (item) {
  addCard(item.name, item.link);
});
*/

