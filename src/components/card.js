import {openPopup} from './modal.js';
// import {deleteUserCard, setUserLike, deleteUserLike} from './api.js';
import {
  //cardTemplate,
  cardList,
  popupImageContainer,
  popupImageItem,
  popuImageName
} from './constants.js';
//НУЖНО ИЗБАВИТЬСЯ ОТ ВСЕХ ИМПОРТОВ



//РЕФАКТОРИНГ
export default class Card {
  constructor({cardData, cardSelector, addLikeClick, removeLikeClick}) {
    this._data = cardData;
    this._name = cardData.name;
    this._link =cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id; //Некорректно, так как у карточки нет информации к id пользователя
    this._ownerId = cardData.ownerId;
    this._userId = cardData.userId;
    //this._likesCheck = cardData.likesCheck;

    this._cardSelector = cardSelector;
    this._addLikeClick = addLikeClick;
    this._removeLikeClick = removeLikeClick;
  }

  //Получить карточку из разметки
  _getCardElement() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }
  //Сгенерировать разметку формы и поместить туда информацию, которая придет извне
  createCard() {
    this._element = this._getCardElement();
    this._setEventListeners();
    this._renderLikes();

    this._buttonDeleteCard = this._element.querySelector('.card__button-delete');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__name');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._element.id = this._cardId;

    if (!(this._userId === this._ownerId)) {
      this._buttonDeleteCard.style.display = 'none';
    } else {
      this._buttonDeleteCard.style.display = 'block';
    }



    return this._element;
  }

  /*//Проверка наличия/отсутствия лайка
  _isLiked() {
    return Boolean(this._likes.find((item) => item === this._userId));
  }
  */
  //Получить информацию о лайках
  _renderLikes() {
    this._likesCounter = this._element.querySelector('.card__like-counter');
    this._likesCounter.textContent = this._likes.length;
    this._buttonLikeCard = this._element.querySelector('.card__button-like');

    //if(this._isLiked())
    //if (this._likes === this._userId) {

    //* Условие будет true если в массиве лайков найдется лайк с id пользователя
    if (this._likes.some(elem => elem._id === this._userId)) {
      this._buttonLikeCard.classList.add('card__button-like_active');
    } else {
      this._buttonLikeCard.classList.remove('card__button-like_active');
    }
  }

  //Удалить карточку
  _handleDeleteIcon() {
    this._element.remove();
  }

  //Добавить слушатели
  _setEventListeners() {
    this._buttonLikeCard = this._element.querySelector('.card__button-like');
    this._buttonDeleteCard = this._element.querySelector('.card__button-delete');

    //Если лайк уже стоит, то по клику сработает функция удаления лайка
    /*this._buttonLikeCard.addEventListener('click', () => {
     if (this._buttonLikeCard.classList.contains('card__button-like_active')) {
        this._addLikeClick(this);
      } else {
        this._removeLikeClick(this);
      }
    });*/

    //Слушатель для изменения состояния лайка
    this._buttonLikeCard.addEventListener('click', () => this._toggleLikes());

    //Слушатель для удаления карточек по клику на корзину
    this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteIcon());

    //Слушатель для открытия попапа с изображением
    //(дописать)
  }

  //Функция для добавления/удаления лайков
  _toggleLikes() {
    this._buttonLikeCard = this._element.querySelector('.card__button-like');
    this._likesCounter = this._element.querySelector('.card__like-counter');

    if (this._buttonLikeCard.classList.contains('card__button-like_active')) {
      this._removeLikeClick(this._cardId)
      .then ((res) => {
        //this._data = res;
        this._buttonLikeCard.classList.remove('card__button-like_active');
        this._likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this._addLikeClick(this._cardId)
      .then ((res) => {
        //this._data = res;
        this._buttonLikeCard.classList.add('card__button-like_active');
        this._likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

}



 /*
//Cоздание новой карточки
function createCard(name, link, cardId, likes, ownerId, userId, likesCheck) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // в _getCardElement()
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
@@ -32,15 +174,16 @@ function createCard(name, link, cardId, likes, ownerId, userId, likesCheck) {
  buttonLikeCard.classList.add('card__button-like_active');
 }
  //Слушатель для удаления карточек по клику на корзину
  buttonDeleteCard.addEventListener('click', () => {
    handleDeleteIcon(cardElement);
  });
  //Слушатель для добавления/удаления лайков
  //Работает, но нужно сделать слабую связь, чтобы api в card не было. А встречались они в index.js
  buttonLikeCard.addEventListener('click', () => {
    if (buttonLikeCard.classList.contains('card__button-like_active')) {
      api.deleteUserLike(cardId)
      .then ((data) => {
        buttonLikeCard.classList.remove('card__button-like_active');
        likesCounter.textContent = data.likes.length;
@@ -49,7 +192,7 @@ function createCard(name, link, cardId, likes, ownerId, userId, likesCheck) {
        console.log(err);
      })
    } else {
      api.setUserLike(cardId)
      .then ((data) => {
        buttonLikeCard.classList.add('card__button-like_active');
        likesCounter.textContent = data.likes.length;
@@ -64,14 +207,17 @@ function createCard(name, link, cardId, likes, ownerId, userId, likesCheck) {
  return cardElement;
}
//Добавление карточки в разметку
function addCard(userText, userLink, cardId, likes, ownerId, userId, likesCheck) {
  cardList.prepend(card.createCard(userText, userLink, cardId, likes, ownerId, userId, likesCheck));
}
//Удаление карточки
//Работает, но нужно сделать слабую связь, чтобы api в card не было. А встречались они в index.js
function handleDeleteIcon(itemElement) {
  api.deleteUserCard(itemElement.id)
  .then(() => {
    itemElement.remove();
  })
@@ -87,5 +233,6 @@ function handlePreviewPicture(name, link) {
  popupImageItem.alt = name;
  popuImageName.textContent = name;
}
*/
