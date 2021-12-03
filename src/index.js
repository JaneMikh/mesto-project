
//Импорт файла css для сборки (webpack)
import './pages/index.css';

import {enableValidation, removeAllErrors, enableSubmitButton, disableSubmitButton} from './components/validate.js';
import {config} from './components/constants.js';
import {openPopup, closePopup} from './components/utils.js';
import {buttonAddCard,
  cardNameInput,
  cardAboutInput,
  buttonClosePopupAddCard,
  buttonClosePopupImage,
  popupFormAddCard,
  popupAddCard,
  popupImageContainer,
  addCard,
} from './components/card.js';

import {
  popupList,
  popupEditProfile,
  buttonEditForm,
  buttonClosePopupEditForm,
  popupProfileForm,
  nameInput,
  jobInput,
  userProfileName,
  userProfileProfession
} from './components/modal.js';

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
  removeAllErrors();
  nameInput.value = userProfileName.textContent;
  jobInput.value = userProfileProfession.textContent;
  enableSubmitButton();
  openPopup(popupEditProfile);
});

// Закрытие попапа для редактирования профиля пользователя
buttonClosePopupEditForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//Обработчик отправки формы профиля пользователя
popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userProfileName.textContent = nameInput.value;
  userProfileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
});

// Открытие попапа для добавления карточек
buttonAddCard.addEventListener('click', () => {
  removeAllErrors();
  disableSubmitButton();
  openPopup(popupAddCard);
});

//Закрытие попапа для добавления карточек
buttonClosePopupAddCard.addEventListener('click', () => {
  popupFormAddCard.reset();
  closePopup(popupAddCard);
});


// Закрытие попапа с фото
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImageContainer);
});

//Закрытие попапа нажатием на оверлей
popupList.forEach(popupElement => {
  document.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

enableValidation(config);
