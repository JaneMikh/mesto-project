import {openPopup} from './modal.js';
import {deleteUserCard, setUserLike, deleteUserLike} from './api.js';
import {
  cardTemplate,
  cardList,
  popupImageContainer,
  popupImageItem,
  popuImageName
} from './constants.js';

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

//Добавление карточки в разметку
function addCard(userText, userLink, cardId, likes, ownerId, userId, likesCheck) {
  cardList.prepend(createCard(userText, userLink, cardId, likes, ownerId, userId, likesCheck));
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

export {addCard};
