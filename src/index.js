//Импорт файла css для сборки (webpack)
import './pages/index.css';


import {
  getUserInfo,
  setUserInfo,
  getCardsInfo,
  addServCard
} from './components/api.js';
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
  createCard
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

getUserInfo()
.then((data) => {
  userProfileName.textContent = data.name;
  userProfileProfession.textContent = data.about;
})
.catch((err) => {
  console.log(err);
})

getCardsInfo()
.then((data) => {
  data.reverse().forEach(function(item) {
    addCard(item.name, item.link, item._id);
  })
})
.catch((err) => {
  console.log(err);
})


//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
   // Отключение события по умолчанию
  addServCard(cardNameInput.value, cardAboutInput.value)
  .then((data) => {
    addCard(data.name, data.link);
  })
  .catch((err) => {
    console.log(err);
  })
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
  setUserInfo(nameInput.value, jobInput.value)
});


// Открытие попапа для добавления карточек
buttonAddCard.addEventListener('click', () => {
  //reset(); // Очистка полей формы
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
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

enableValidation(config);






/*

//запрос на отображение количества лайков
function addLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
  .then(parseResponse)
  .then((result) => {
    console.log(result);
  });
}

//запросна удаление карточек

function deleteLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(parseResponse)
  .then((result) => {
    console.log(result);
  });
}
*/
