import './index.css';

import { formSelectors, viewImageConfig, userProfileConfig } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';

import {
  cardSectionSelector,
  buttonAddCard,
  popupFormAddCard,
  buttonEditForm,
  popupProfileForm,
  nameInput,
  jobInput,
  userProfileName,
  userProfileProfession,
  buttonUserAvatar,
  avatarForm,
} from '../utils/constants.js';


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

let userId; //id пользователя

const profileInfoEdit = new UserInfo(userProfileConfig);

//---(Попап для редактирования профиля)---
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    const item = {
      name: data.nameProfile,
      about: data.aboutYourself,
    }
    profilePopup.renderLoading(true);
    api.setUserInfo(item)
      .then((data) => {
        profileInfoEdit.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
        profilePopup.closePopup();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});
profilePopup.setEventListeners();

//---(Попап для редактирования аватара профиля)---
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    const item = {
      avatar: data.avatarInput,
    }
    avatarPopup.renderLoading(true);
    api.setUserAvatar(item)
      .then((data) => {
        profileInfoEdit.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        })
        avatarPopup.closePopup();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});
avatarPopup.setEventListeners();

//---(Попап для добавления карточки)---
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    const item = {
      name: data.cardNameInput,
      link: data.cardLinkInput,
    }
    cardPopup.renderLoading(true);
    api.addUserCard(item)
      .then((cardData) => {
        cardList.setItem(setCard(cardData));
        cardPopup.closePopup();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        cardPopup.renderLoading(false);
      });
  },
});
cardPopup.setEventListeners();

//---(Попап для изображения)---
const popupWithImage = new PopupWithImage(viewImageConfig);
popupWithImage.setEventListeners();

//-------------------------
// Создание карточки
//-------------------------

const setCard = (data) => {
  const card = new Card({
    cardData: {...data, userId},
    cardSelector: '.card-element',
    addLikeClick: (data) => {
      return api.setUserLike(data);
    },
    removeLikeClick: (data) => {
      return api.deleteUserLike(data);
    },
    handleCardClick: (data) => {
      popupWithImage.openPopup(data);
    },
    handleDeleteIcon: () => {
      api.deleteUserCard(card.id())
        .then(() => {
          card.handleDeleteIcon();
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
    return card.createCard(data);
};

//Сгенерировать новую карточку (добавить в разметку)
const cardList = new Section(
  {
    renderItems: (data) => {
      cardList.setItem(setCard(data));
    }
  },
  cardSectionSelector,
);

//Загрузить всю информацию по карточкам и данным пользователя
api.getUserCardsInfo()
  .then(([userData, cardsData]) => {
    userId = userData._id; //id пользователя
    profileInfoEdit.setUserInfo(userData);
    cardsData.reverse();
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
})

//-------------------------
// Слушатели
//-------------------------

//---(Слушатель кнопки открытия попапа для редактирования профиля пользователя)---
buttonEditForm.addEventListener('click', () => {
  profileValidatorForm.removeAllErrors();
  const profileData = profileInfoEdit.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.about;
  profileValidatorForm.enableSubmitButton();
  profilePopup.openPopup();
});


// Открытие попапа для добавления карточек
buttonAddCard.addEventListener('click', () => {
  cardValidatorForm.removeAllErrors();
  cardValidatorForm.disableSubmitButton();
  cardPopup.openPopup();
});

//Открытие попапа изменения аватара
buttonUserAvatar.addEventListener('click', () => {
  avatarValidatorForm.removeAllErrors();
  avatarValidatorForm.disableSubmitButton();
  avatarPopup.openPopup();
});
