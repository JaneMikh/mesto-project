//Переменные
//Попар для редактрования профиля
const popup = document.querySelectorAll('.popup'); //Добавили переменную, универсальную для ВСЕХ трех попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const buttonClosePopupEditForm = popupEditProfile.querySelector('.popup__button-close');
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

// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;
// Блок, в который будут добавлены новые карточки
const cardList = document.querySelector('.cards');

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
  const cardLike = cardElement.querySelector('.card__button-like');
  const buttonDeleteCard = cardElement.querySelector('.card__button-delete');
  cardImage.src = cardAboutInput.value; //Содержимое поля ввода передается в виде ссылки (атрибута) элемента image
  cardImage.alt = cardNameInput.value;
  cardLink.textContent = cardNameInput.value;

  // Открытие попапа для добавления карточек
  buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
  });
  return cardElement;
}

//Добавление карточки в разметку
function addCard(cardElement) {
  cardList.prepend(createCard(cardElement));
}
//addCard();

//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  cardAboutInput.textContent = cardAboutInput.value;
  cardNameInput.textContent = cardNameInput.value;
  addCard(); //не работает
  closePopup(popupAddCard);
};
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);


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

initialCards.forEach(function (item) {
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLink.textContent = item.name;
  createCard();
});

  /*const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  let cardLink = cardElement.querySelector('.card__name');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLink.textContent = item.name;
  cardList.append(cardElement);
/*
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
