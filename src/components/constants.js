//---(Попап с изображением)---
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImageItem = popupImageContainer.querySelector('.popup__image');
const popuImageName = popupImageContainer.querySelector('.popup__image-name');

export const viewImageConfig = {
  popupSelector: '.popup_type_image',
  imageItem: popupImageItem,
  imageName: popuImageName,
}

export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_type_error',
  inactiveButtonClass: 'form__button-submit_inactive',
}

export const userProfileConfig = {
  nameSelector: '.user-profile__name',
  professionSelector: '.user-profile__profession',
  avatarSelector: '.user-profile__photo',
}

//Попар для редактрования профиля
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupProfileForm.querySelector('#name');
const jobInput = popupProfileForm.querySelector('#aboutyourself');

//Данные пользователя в разметке
const userProfileName = document.querySelector('.user-profile__name');
const userProfileProfession = document.querySelector('.user-profile__profession');

//Аватар
const buttonUserAvatar = document.querySelector('.user-profile__photo-mask');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupEditAvatar.querySelector('.form_type_avatar');

// Попап для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.user-profile__button-add');
const popupFormAddCard = popupAddCard.querySelector('.form_type_add-card');

// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;

export const cardSectionSelector = '.cards';

export {
  popupAddCard,
  buttonAddCard,
  popupFormAddCard,
  cardTemplate,
  popupImageItem,
  popuImageName,
  buttonEditForm,
  popupProfileForm,
  nameInput,
  jobInput,
  userProfileName,
  userProfileProfession,
  buttonUserAvatar,
  popupEditAvatar,
  avatarForm,
};
