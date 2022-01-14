import './index.css';
import {renderLoading} from '../components/utils.js'
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
// import {setUserInfo, addUserCard, getUserCardsInfo, setUserAvatar} from '../components/api.js';
// import {enableValidation, removeAllErrors, enableSubmitButton, disableSubmitButton} from '../components/validate.js';
import { formSelectors } from '../components/constants.js';
// import {config} from '../components/constants.js';
//import {openPopup, closePopup, closePopupByOvelay, closePopupByCloseButton} from '../components/modal.js';
//import {addCard} from '../components/card.js';
import Card from '../components/card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';


import {
  popupAddCard,
  buttonAddCard,
  popupFormAddCard,
  cardNameInput,
  cardAboutInput,
  buttonSubmitCard,
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
  buttonSubmitAvatar
} from '../components/constants.js';

let userId; //id пользователя

// //---(Олин конфиг)---
// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-4', //идентификатор группы plus-cohort-4
//   headers: {
//     Authorization: '001ad720-6ef4-4b0d-b9d3-4ac6fa30aca0', //токен
//     'Content-Type': 'application/json'
//   }
// });

//---(Женин конфиг)---
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-4', //идентификатор группы plus-cohort-4
  headers: {
    Authorization: '53f5a902-2507-4ae9-b8bd-13e370d56b23', //токен
    'Content-Type': 'application/json'
  }
});

//---(Запускаем валидацию форм)---
const cardValidatorForm = new FormValidator(formSelectors, popupFormAddCard);
const avatarValidatorForm = new FormValidator(formSelectors, avatarForm);
const profileValidatorForm = new FormValidator(formSelectors, popupProfileForm);
cardValidatorForm.enableValidation();
avatarValidatorForm.enableValidation();
profileValidatorForm.enableValidation();

//Создать карточку
const setCard = (data) => {
  const card = new Card({
      cardData:{...data, userId} ,
      cardSelector: '.card-element',
      addLikeClick: (data) => {
        return api.setUserLike(data);
      },
      removeLikeClick: (data) => {
        return api.deleteUserLike(data);
      },
    });
    return card.createCard(data);
  };

//Сгенерировать новую карточку (добавить в разметку)
const cardList = new Section ({
  renderItems: (data) => {
    cardList.addItem(setCard(data));
  },
  selector: '.cards',
});

//Загрузить всю информацию по карточкам
api.getUserCardsInfo()
.then(([userData, cardsData]) => {
  userId = userData._id; //id пользователя
  userProfileName.textContent = userData.name;
  userProfileProfession.textContent = userData.about;
  avatarPhoto.src = userData.avatar;
  cardsData.reverse();
  cardList.renderItems(cardsData);
})
.catch((err) => {
  console.log(err);
})

closePopupByOvelay();
closePopupByCloseButton();

//Обработчик отправки формы для создания новой карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(buttonSubmitCard, true);
  api.addUserCard(cardNameInput.value, cardAboutInput.value)
  .then((data) => {
    cardList.addItem(setCard(data));
    closePopup(popupAddCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(buttonSubmitCard, false);
  });
};
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);




// closePopupByOvelay();
// closePopupByCloseButton();

// getUserCardsInfo()
// .then(([userData, cardsData]) => {
//   userId = userData._id;
//   userProfileName.textContent = userData.name;
//   userProfileProfession.textContent = userData.about;
//   avatarPhoto.src = userData.avatar;
//   cardsData.reverse().forEach(function(el) {
//     let item;
//     el.likes.forEach(function(like) {
//       if (like._id === userId) {
//         return item = true;
//       }
//       return item;
//     })
//     addCard(el.name, el.link, el._id, el.likes.length, el.owner._id, userId, item);
//   });
// })
// .catch((err) => {
//   console.log(err);
// })

// //Обработчик отправки формы для создания новой карточки
// function handleCardFormSubmit (evt) {
//   evt.preventDefault();
//   renderLoading(buttonSubmitCard, true);
//   addUserCard(cardNameInput.value, cardAboutInput.value)
//   .then((data) => {
//     addCard(data.name, data.link, data._id, data.likes.length, data.owner._id, userId);
//     closePopup(popupAddCard);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(buttonSubmitCard, false);
//   });
// };
// popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

// //Обработчик отправки формы профиля пользователя
// popupProfileForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   renderLoading(buttonSubmitProfile, true);
//   setUserInfo(nameInput.value, jobInput.value)
//   .then((data) => {
//     userProfileName.textContent = data.name;
//     userProfileProfession.textContent = data.about;
//     closePopup(popupEditProfile);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(buttonSubmitProfile, false);
//   });
// });

// //Слушатель отправки формы для изменения аватара пользователя
// avatarForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   renderLoading(buttonSubmitAvatar, true);
//   setUserAvatar(avatarInput.value)
//   .then((data) => {
//     avatarPhoto.src = data.avatar;
//     closePopup(popupEditAvatar);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(buttonSubmitAvatar, false);
//   });
// });

// // Открытие попапа для редактирования профиля пользователя
// buttonEditForm.addEventListener('click', () => {
//   removeAllErrors(popupProfileForm);
//   nameInput.value = userProfileName.textContent;
//   jobInput.value = userProfileProfession.textContent;
//   enableSubmitButton(popupProfileForm);
//   openPopup(popupEditProfile);
// });

// // Открытие попапа для добавления карточек
// buttonAddCard.addEventListener('click', () => {
//   popupFormAddCard.reset();
//   removeAllErrors(popupFormAddCard);
//   disableSubmitButton(popupFormAddCard);
//   openPopup(popupAddCard);
// });

// //Открытие попапа изменения аватара
// buttonUserAvatar.addEventListener('click', () => {
//   avatarForm.reset();
//   removeAllErrors(avatarForm);
//   disableSubmitButton(avatarForm);
//   openPopup(popupEditAvatar);
// });

// enableValidation(config);
