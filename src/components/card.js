//Назначение: содержит информацию по работе с карточками и попапами с изображением

//import { NoEmitOnErrorsPlugin } from 'webpack';
import {openPopup} from './utils.js';
import {deleteUserCard, setUserLike, deleteUserLike} from './api.js';
export {
  buttonAddCard,
  cardNameInput,
  cardAboutInput,
  buttonClosePopupAddCard,
  buttonClosePopupImage,
  popupFormAddCard,
  popupAddCard,
  popupImageContainer,
  buttonSubmitCard,
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
const buttonSubmitCard = document.querySelector('.form__button-submit_type_card');
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
function createCard(name, link, cardId, likes, ownerId, userId, likesCheck) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardElement.id = cardId;
  likesCounter.textContent = likes;

  if (!(userId === ownerId)) {
    buttonDeleteCard.style.display = 'none';
  } else {
    buttonDeleteCard.style.display = 'block';
  }

 if (likesCheck) {
  buttonLikeCard.classList.add('card__button-like_active');
 }

//Слушатель для удадения карточек по клику на корзину
  buttonDeleteCard.addEventListener('click', () => {
    handleDeleteIcon(cardElement);
  });


//Слушатель для добавления/удаления лайков
  buttonLikeCard.addEventListener('click', () => {
    if (buttonLikeCard.classList.contains('card__button-like_active')) {
      deleteUserLike(cardId)
        .then ((data) => {
          buttonLikeCard.classList.remove('card__button-like_active');
          likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      setUserLike(cardId)
        .then ((data) => {
          buttonLikeCard.classList.add('card__button-like_active');
          likesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });

  cardImage.addEventListener('click', () => handlePreviewPicture(name, link));

  return cardElement;
}


//Удаление карточки
function handleDeleteIcon(itemElement) {
  //запрос на удаление карточки
  deleteUserCard(itemElement.id)
  itemElement.remove();
}


//Открытие попапа с фото
function handlePreviewPicture(name, link) {
  openPopup(popupImageContainer);
  popupImageItem.src = link;
  popupImageItem.alt = name;
  popuImageName.textContent = name;
}

//Добавление карточки в разметку
function addCard(userText, userLink, cardId, likes, ownerId, userId, item) {
  cardList.prepend(createCard(userText, userLink, cardId, likes, ownerId, userId, item));
}

/*// Добавление карточек в разметку по умолчанию из массива
initialCardsReverse.forEach(function (item) {
  addCard(item.name, item.link);
});

*/

