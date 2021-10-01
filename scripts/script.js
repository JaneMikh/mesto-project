//Переменные
//Попар для редактрования профиля
const popup = document.querySelectorAll('.popup'); //Добавили переменную, универсальную для ВСЕХ трех попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const buttonClosePopupEditForm = popupEditProfile.querySelector('.popup__button-close_type_profile');
const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupEditProfile.querySelector('.form__input_type_name');
const jobInput = popupEditProfile.querySelector('.form__input_type_description');
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
const popupImageConteiner = document.querySelector('.popup_type_image');
const popupImageItem = popupImageConteiner.querySelector('.popup__image');
const popuImageName = popupImageConteiner.querySelector('.popup__image-name');
const buttonClosePopupImage = popupImageConteiner.querySelector('.popup__button-close_type_image');
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
}
// Функция для закрытия всех трех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Cоздание новой карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Создаем клон template
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  //Добавление/снятие отметки "Нравится"
  function handleLikeIcon() {
    buttonLikeCard.classList.toggle('card__button-like_active');
  }
  buttonLikeCard.addEventListener('click', handleLikeIcon);
  //Удаление карточки
  function handleDelIcon() {
    buttonDeleteCard.closest('.card').remove();
  }
  buttonDeleteCard.addEventListener('click', handleDelIcon);
  //Открытие попапа с фото
  function handlePreviewPicture() {
    openPopup(popupImageConteiner);
    popupImageItem.src = link;
    popuImageName.alt = name;
    popuImageName.textContent = name;
  }
  cardImage.addEventListener('click', handlePreviewPicture);
  return cardElement;
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
  cardAboutInput.textContent = cardAboutInput.value;
  cardNameInput.textContent = cardNameInput.value;
  closePopup(popupAddCard);
  addCard(cardNameInput.value, cardAboutInput.value);
  evt.preventDefault(); // Отключение события по умолчанию
  evt.target.reset(); // Очистка полей формы
};
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);
// Открытие попапа для редактирования профиля пользователя
buttonEditForm.addEventListener('click', () => {
  openPopup(popupEditProfile);
});
// Закрытие попапа для редактирования профиля пользователя
buttonClosePopupEditForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
//Обработчик отправки формы профиля пользователя
popupProfileForm.addEventListener('submit', evt => {
  userProfileName.textContent = nameInput.value;
  userProfileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
  evt.preventDefault();
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
  closePopup(popupImageConteiner);
});
