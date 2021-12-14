import {popupList} from './constants.js';

// Функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция для закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

//Закрытие попапа нажатием на клавишу esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const popupisOpened = document.querySelector('.popup_opened');
    closePopup(popupisOpened);
  }
}

//Закрытие попапа нажатием на оверлей
function closePopupByOvelay() {
  popupList.forEach(popupElement => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupElement);
      }
    });
  });
}

//Закрытие всех попапов нажатем на {X}
function closePopupByCloseButton() {
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      }
    });
  });
}

export {openPopup, closePopup, closePopupByOvelay, closePopupByCloseButton};
