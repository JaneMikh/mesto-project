import Popup from './Popup.js';
import { formSelectors } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));
    this._buttonSubmit = this._popup.querySelector(formSelectors.buttonSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues; //объект с данными
  }

  renderLoading(loadingStatus, buttonText='Сохранить') {
    if (loadingStatus) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = buttonText;
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
