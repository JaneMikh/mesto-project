const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSelector: '.form__button-submit',
  inputErrorClass: 'form__input_type_error',
  inactiveButtonClass: 'form__button-submit_inactive',
};

const popupList = document.querySelectorAll('.popup');
//Попар для редактрования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditForm = document.querySelector('.user-profile__button-edit');
const buttonClosePopupEditForm = popupEditProfile.querySelector('.popup__button-close_type_profile');
const popupProfileForm = document.querySelector('.form_type_profile');
const nameInput = popupProfileForm.querySelector('#name');
const jobInput = popupProfileForm.querySelector('#aboutyourself');
const buttonSubmitProfile = popupProfileForm.querySelector('.form__button-submit_type_profile');

//Данные пользователя на главной странице
const userProfileName = document.querySelector('.user-profile__name');
const userProfileProfession = document.querySelector('.user-profile__profession');
//Аватар
const userAvatar = document.querySelector('.user-profile__photo-mask');
//Попап для изменения аватара пользователя
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = popupEditAvatar.querySelector('.form_type_avatar');
const avatarInput = popupEditAvatar.querySelector('#avatar');
const avatarPhoto = document.querySelector('.user-profile__photo');
const buttonCloseAvatarForm = popupEditAvatar.querySelector('.popup__button-close-avatar');
const buttonSubmitAvatar = popupEditAvatar.querySelector('.form__button-submit_type_avatar');

// Попап для добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.user-profile__button-add');
const popupFormAddCard = popupAddCard.querySelector('.form_type_add-card');
const cardNameInput = popupFormAddCard.querySelector('.form__input_type_card-name');
const cardAboutInput = popupFormAddCard.querySelector('.form__input_type_link');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__button-close_type_card');
const buttonSubmitCard = document.querySelector('.form__button-submit_type_card');
// Новые карточки
const cardTemplate = document.querySelector('.card-element').content;

// Блок, в который будут добавлены новые карточки
const cardList = document.querySelector('.cards');

// Попап с изображением
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImageItem = popupImageContainer.querySelector('.popup__image');
const popuImageName = popupImageContainer.querySelector('.popup__image-name');
const buttonClosePopupImage = popupImageContainer.querySelector('.popup__button-close_type_image');


export {config};
export {
  popupAddCard,
  buttonAddCard,
  popupFormAddCard,
  cardNameInput,
  cardAboutInput,
  buttonClosePopupAddCard,
  buttonSubmitCard,
  cardTemplate,
  cardList,
  popupImageContainer,
  popupImageItem,
  popuImageName,
  buttonClosePopupImage,
  popupList,
  popupEditProfile,
  buttonEditForm,
  buttonClosePopupEditForm,
  popupProfileForm,
  nameInput,
  jobInput,
  userProfileName,
  userProfileProfession,
  userAvatar,
  popupEditAvatar,
  avatarForm,
  avatarInput,
  avatarPhoto,
  buttonCloseAvatarForm,
  buttonSubmitProfile,
  buttonSubmitAvatar
};
