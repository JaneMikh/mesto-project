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

// Универсальная функция для открытия всех трех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция для закрытия всех трех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Слушатель для открытия попапа редактирования профиля
buttonEditForm.addEventListener('click', () => {
  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
  openPopup(popupEditProfile);
});

//Слушатель для закрытия попапа редактирования профиля
buttonClosePopupEditForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//Обработчик отправки формы профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Предотвращение перезагрузки страницы после отправки формы
  userProfileName.textContent = nameInput.value;
  userProfileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

//Cоздание новой карточки
function createCard() {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Создаем клон template
  const cardImage = cardElement.querySelector('.card__image');
  const cardLink = cardElement.querySelector('.card__name');
  const buttonLikeCard = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  cardImage.src = cardAboutInput.value; //Содержимое поля ввода передается в виде ссылки (атрибута) элемента image
  cardImage.alt = cardNameInput.value;
  cardLink.textContent = cardNameInput.value;

  //Добавление/снятие отметки "Нравится"
  function handleLikeIcon() {
    buttonLikeCard.classList.toggle('card__button-like_active');
  }
    buttonLikeCard.addEventListener('click', handleLikeIcon);

  //Удаление карточки
  function deleteCard() {
    buttonDeleteCard.closest('.card').remove();
  }
  buttonDeleteCard.addEventListener('click', deleteCard);

  //Открытие попапа с фото
  function handlePreviewPicture(cardImage, cardLink) {
    popupImageConteiner.classList.add('popup_opened');
    popupImageItem.src = cardImage.value; //не работает
    popuImageName.textContent = cardLink.value; //не работает
  }
  cardImage.addEventListener('click', handlePreviewPicture); //не работает


  return cardElement;
}

//Добавление карточки в разметку
function addCard(cardElement) {
  cardList.prepend(createCard(cardElement));
}

//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  cardAboutInput.textContent = cardAboutInput.value;
  cardNameInput.textContent = cardNameInput.value;
  closePopup(popupAddCard);
  addCard();
};
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

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

initialCards.forEach(function (item) {
  cardAboutInput.value = item.link;
  cardNameInput.value = item.name;
  addCard();
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
