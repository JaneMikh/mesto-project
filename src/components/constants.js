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
};

export const userProfileConfig = {
  nameSelector: '.user-profile__name',
  professionSelector: '.user-profile__profession',
  avatarSelector: '.user-profile__photo',
}


const popupList = document.querySelectorAll('.popup');
//Попар для редактрования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupProfileForm.querySelector('#name');
const jobInput = popupProfileForm.querySelector('#aboutyourself');
const buttonSubmitProfile = popupProfileForm.querySelector('.form__button-submit_type_profile');
//Данные пользователя в разметке
const userProfileName = document.querySelector('.user-profile__name');
const userProfileProfession = document.querySelector('.user-profile__profession');
//Аватар
const buttonUserAvatar = document.querySelector('.user-profile__photo-mask');
//Попап для изменения аватара пользователя
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupEditAvatar.querySelector('.form_type_avatar');
const avatarInput = popupEditAvatar.querySelector('#avatar');
const avatarPhoto = document.querySelector('.user-profile__photo');
const buttonSubmitAvatar = popupEditAvatar.querySelector('.form__button-submit_type_avatar');
// Попап для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.user-profile__button-add');
const popupFormAddCard = popupAddCard.querySelector('.form_type_add-card');
const cardNameInput = popupFormAddCard.querySelector('.form__input_type_card-name');
const cardAboutInput = popupFormAddCard.querySelector('.form__input_type_link');
const buttonSubmitCard = document.querySelector('.form__button-submit_type_card');
// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;
// Блок, в который будут добавлены новые карточки
const cardList = document.querySelector('.cards');
// Попап с изображением
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImageItem = popupImageContainer.querySelector('.popup__image');
const popuImageName = popupImageContainer.querySelector('.popup__image-name');

export {formSelectors};
export {
  popupAddCard,
  buttonAddCard,
  popupFormAddCard,
  cardNameInput,
  cardAboutInput,
  buttonSubmitCard,
  cardTemplate,
  cardList,
  popupImageItem,
  popuImageName,
  popupList,
  popupEditProfile,
  buttonEditForm,
  popupProfileForm,
  nameInput,
  jobInput,
  userProfileName,
  userProfileProfession,
  buttonUserAvatar,
  popupEditAvatar,
  avatarForm,
  avatarInput,
  avatarPhoto,
  buttonSubmitProfile,
  buttonSubmitAvatar,
  popupImageContainer
};
