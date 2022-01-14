export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); //Чтобы не потерять контекст для колбэка
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _closePopupByOvelay(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.closePopup();
    }
  }

  setEventListeners() { //накладывается один раз на каждый переданный попап и на {X}
    this._popup.addEventListener('mousedown', (event) => {
      this._closePopupByOvelay(event);
    });
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
      this.closePopup();
    });
  }

}


//ДО  РЕФАКТОРИНГА из modal.js

/*import {popupList} from './constants.js';

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
*/
