export default class Card {
  constructor({cardData, cardSelector, addLikeClick, removeLikeClick, handleCardClick, handleDeleteIcon}) {
    this._data = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = cardData.userId;
    this._cardSelector = cardSelector;
    this._addLikeClick = addLikeClick;
    this._removeLikeClick = removeLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIcon = handleDeleteIcon;
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
    this._likesCounter = this._element.querySelector('.card__like-counter');
    this._buttonLikeCard = this._element.querySelector('.card__button-like');
    this._buttonDeleteCard = this._element.querySelector('.card__button-delete');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__name');
    this._setEventListeners();
    this._renderLikes();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._element.id = this._cardId;

    if (this._userId === this._ownerId) {
      this._buttonDeleteCard.style.display = 'block';
    } else {
      this._buttonDeleteCard.style.display = 'none';
    }
    return this._element;
  }

  //Получить информацию о лайках
  _renderLikes() {
    this._likesCounter.textContent = this._likes.length;
    // Условие будет true если в массиве лайков найдется лайк с id пользователя
    this._data.likes.forEach((item) => {
      if (item._id === this._userId) {
        this._buttonLikeCard.classList.add('card__button-like_active');
      } else {
        this._buttonLikeCard.classList.remove('card__button-like_active');
      }
    });
  }

  //Удалить карточку
  handleDeleteIcon() {
    this._element.remove();
  }

  //Получить id карточки
  id() {
    return this._cardId;
  }

  //Добавить слушатели
  _setEventListeners() {
    //Слушатель для изменения состояния лайка
    this._buttonLikeCard.addEventListener('click', () => this._toggleLikes());
    //Слушатель для удаления карточек по клику на корзину
    this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteIcon());
    //Cлушатель для открытия попапа с фото
    this._cardImage.addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link,
    })
  );
}

  //Функция для добавления/удаления лайков
  _toggleLikes() {
    if (this._buttonLikeCard.classList.contains('card__button-like_active')) {
      this._removeLikeClick(this._cardId)
      .then ((res) => {
        this._buttonLikeCard.classList.remove('card__button-like_active');
        this._likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this._addLikeClick(this._cardId)
      .then ((res) => {
        this._buttonLikeCard.classList.add('card__button-like_active');
        this._likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}
