//Переменные
const popup = document.querySelectorAll('.popup'); //Добавили переменную, универсальную для ВСЕХ трех попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const buttonClosePopupEditForm = popupEditProfile.querySelector('.popup__button-close');
const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupEditProfile.querySelector('.form__input_type_name');
const jobInput = popupEditProfile.querySelector('.form__input_type_description');

// Универсальная функция для открытия всех трех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция для закрытия всех трех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик для открытия попапа для редактирования профиля
buttonEditForm.addEventListener('click', function() {
  openPopup(popupEditProfile);
});

//Обработчик для закрытия попапа для редактирования профиля
buttonClosePopupEditForm.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

//Редактирование профиля


function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
  document.querySelector('.user-profile__name').textContent = nameInput.value;
  document.querySelector('.user-profile__profession').textContent = jobInput.value;
  popupElement.classList.remove('popup_opened'); //тут
}
formElement.addEventListener('submit', formSubmitHandler);

 /*

// Массив, состоящий из карточек, задаваемых по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;
const cardList = document.querySelector('.cards');

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  let cardLink = cardElement.querySelector('.card__name');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLink.textContent = item.name;
  cardList.append(cardElement);

  // Добавление Like
  const cardLike = cardElement.querySelector('.card__button-like');
  function addLikeButton() {
    cardLike.classList.toggle('card__button-like_active');
  }
  cardLike.addEventListener('click', addLikeButton);

  //Удаление карточки
  const cardDeleteButton = cardElement.querySelector('.card__button-delete');
  cardDeleteButton.addEventListener('click', function() {
    const cardItem = cardDeleteButton.closest('.card');
    cardItem.remove();
  });

  //Открытие попапа с картинкой
  const popupImageConteiner = document.querySelector('.popup_type_image');
  const popupImageItem = popupImageConteiner.querySelector('.popup__image');
  const popupImageName = popupImageConteiner.querySelector('.popup__image-name');
  function openPopupImage() {
    popupImageConteiner.classList.add('popup_opened');
    popupImageItem.src = item.link;
    popupImageName.textContent = item.name;
  }
  cardImage.addEventListener('click', openPopupImage);

  //Закрытие попапа с картинкой
  const popupImageCloseButton = popupImageConteiner.querySelector('.popup__button-close');
  function closePopupImage() {
    popupImageConteiner.classList.remove('popup_opened');
  }
  popupImageCloseButton.addEventListener('click', closePopupImage);
});

// Попап для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardButton = document.querySelector('.user-profile__button-add');
const formAddCard = popupAddCard.querySelector('.form_type_add-card');
const cardName = formAddCard.querySelector('.form__input_type_card-name');
const cardAbout = formAddCard.querySelector('.form__input_type_link');

// Открытие попапа для добавления карточек
cardButton.addEventListener('click', function() {
  popupAddCard.classList.add('popup_opened');
});

// Закрытие попапа для карточек без добавления карточек
const cardCloseButton = popupAddCard.querySelector('.popup__button-close');
cardCloseButton.addEventListener('click', function() {
  popupAddCard.classList.remove('popup_opened');
});

// Добавление данных и Сохранение изменений
function addPlaceCard (evt) {
  evt.preventDefault();
  popupAddCard.classList.remove('popup_opened');
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  let cardLink = cardElement.querySelector('.card__name');
  cardImage.src = cardAbout.value;
  cardLink.textContent = cardName.value;

  // Добавление лайка
  const cardLike = cardElement.querySelector('.card__button-like');
  function addLikeButton() {
    cardLike.classList.toggle('card__button-like_active');
  }
  cardLike.addEventListener('click', addLikeButton);

  //Удаление карточки
  const cardDeleteButton = cardElement.querySelector('.card__button-delete');
  cardDeleteButton.addEventListener('click', function() {
    const cardItem = cardDeleteButton.closest('.card');
    cardItem.remove();
  });

  // Открытие попапа с фото
  const popupImageConteiner = document.querySelector('.popup_type_image');
  const popupImageItem = popupImageConteiner.querySelector('.popup__image');
  const popuImageName = popupImageConteiner.querySelector('.popup__image-name');
  function openPopupImage() {
    popupImageConteiner.classList.add('popup_opened');
    popupImageItem.src = cardAbout.value;
    popuImageName.textContent = cardName.value;
  }
  cardImage.addEventListener('click', openPopupImage);

  // Закрытие попапа с фото
  const popupImageCloseButton = popupImageConteiner.querySelector('.popup__button-close');
  function closePopupImage() {
    popupImageConteiner.classList.remove('popup_opened');
  }
  popupImageCloseButton.addEventListener('click', closePopupImage);
  cardList.prepend(cardElement);
}
formAddCard.addEventListener('submit', addPlaceCard);
*/
