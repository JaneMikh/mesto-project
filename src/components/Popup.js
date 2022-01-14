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
