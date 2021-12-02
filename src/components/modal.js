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
  userProfileProfession
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

//Данные пользователя на главной странице
const userProfileName = document.querySelector('.user-profile__name');
const userProfileProfession = document.querySelector('.user-profile__profession');
