//Назначение: работа с окном редактирования профиля
export {
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

//Переменные
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
