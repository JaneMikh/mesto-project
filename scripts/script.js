//Переменные

//Попар для редактрования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const buttonClosePopupEditForm = popupEditProfile.querySelector('.popup__button-close_type_profile');

const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupProfileForm.querySelector('#name');
const jobInput = popupProfileForm.querySelector('#aboutyourself');

//Данные пользователя на главной странице
const userProfileName = document.querySelector('.user-profile__name');
const userProfileProfession = document.querySelector('.user-profile__profession');

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

// Открытие попапа с фото
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImageItem = popupImageContainer.querySelector('.popup__image');
const popuImageName = popupImageContainer.querySelector('.popup__image-name');
const buttonClosePopupImage = popupImageContainer.querySelector('.popup__button-close_type_image');

//Массив, состоящий из карточек, задаваемых по умолчанию
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

// Перевернутый массив
const initialCardsReverse = initialCards.reverse();


// Функция для открытия всех трех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  enableValidation(config);
}

// Функция для закрытия всех трех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Cоздание новой карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

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
function addCard(userText, userLink) {
  cardList.prepend(createCard(userText, userLink));
}

// Добавление карточек в разметку по умолчанию из массива
initialCardsReverse.forEach(function (item) {
  addCard(item.name, item.link);
});

//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault(); // Отключение события по умолчанию
  addCard(cardNameInput.value, cardAboutInput.value);
  evt.target.reset(); // Очистка полей формы
  closePopup(popupAddCard);
};
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

// Открытие попапа для редактирования профиля пользователя
buttonEditForm.addEventListener('click', () => {
  nameInput.value = userProfileName.textContent;
  jobInput.value = userProfileProfession.textContent;
  openPopup(popupEditProfile);

});

// Закрытие попапа для редактирования профиля пользователя
buttonClosePopupEditForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
 // resetSpans();
});

//Обработчик отправки формы профиля пользователя
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  userProfileName.textContent = nameInput.value;
  userProfileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
});

// Открытие попапа для добавления карточек
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//Закрытие попапа для добавления карточек
buttonClosePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

// Закрытие попапа с фото
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImageContainer);
});


enableValidation(config);

