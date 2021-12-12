//Импорт файла css для сборки (webpack)
import './pages/index.css';

import {
  setUserInfo,
  getCardsInfo,
  addUserCard,
  getUserCardsInfo,
  setUserAvatar
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
  buttonSubmitCard,
  addCard
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
  userProfileProfession,
  userAvatar,
  popupEditAvatar,
  avatarForm,
  avatarInput,
  avatarPhoto,
  buttonCloseAvatarForm,
  buttonSubmitProfile,
  buttonSubmitAvatar
} from './components/modal.js';

let userId; //id пользователя

getUserCardsInfo()
.then(([userData, cardsData]) => {
  userId = userData._id;
  userProfileName.textContent = userData.name;
  userProfileProfession.textContent = userData.about;
  avatarPhoto.src = userData.avatar;
  cardsData.reverse().forEach(function(el) {
    let item;
    el.likes.forEach(function(like) {
      if (like._id === userId) {
        return item = true;
      }
      return item;
    })
    addCard(el.name, el.link, el._id, el.likes.length, el.owner._id, userId, item);
  });
})
.catch((err) => {
  console.log(err);
})

//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  buttonSubmitCard.textContent = 'Сохранение...';
   addUserCard(cardNameInput.value, cardAboutInput.value)
  .then((data) => {
    addCard(data.name, data.link, data._id, data.likes.length, data.owner._id, userId);
    closePopup(popupAddCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSubmitCard.textContent = 'Создать';
  });
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
  buttonSubmitProfile.textContent = 'Сохранение...';
  userProfileName.textContent = nameInput.value;
  userProfileProfession.textContent = jobInput.value;
  setUserInfo(nameInput.value, jobInput.value);
  buttonSubmitProfile.textContent = 'Сохранить';
  closePopup(popupEditProfile);
});

// Открытие попапа для добавления карточек
buttonAddCard.addEventListener('click', () => {
  popupFormAddCard.reset(); // Очистка полей формы
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

//Открытие попапа изменения аватара
userAvatar.addEventListener('click', () => {
  avatarForm.reset(); // Очистка полей формы
  removeAllErrors();
  disableSubmitButton();
  openPopup(popupEditAvatar);
});

//Слушатель отправки формы для изменения аватара пользователя
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  buttonSubmitAvatar.textContent = "Сохранение...";
  setUserAvatar(avatarInput.value);
  avatarPhoto.src = avatarInput.value;
  console.log(buttonSubmitAvatar.textContent);
  closePopup(popupEditAvatar);
});

//Закрытие попапа для редактирования аватара
buttonCloseAvatarForm.addEventListener('click', () => {
  closePopup(popupEditAvatar);
});

enableValidation(config);


/*getUserInfo()
.then((data) => {
  userId = data._id;
  userProfileName.textContent = data.name;
  userProfileProfession.textContent = data.about;
})
.catch((err) => {
  console.log(err);
})

getCardsInfo()
.then((data) => {
  console.log(data);
  data.reverse().forEach(function(item) {
   /* item.likes.forEach(function(like) {
      let isLiked;
      if (like._id === userId) {
        isLiked);
      }
    })

    addCard(item.name, item.link, item._id, item.likes.length, item.owner._id, userId);
  })
})
.catch((err) => {
  console.log(err);
})*/
