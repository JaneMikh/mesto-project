export default class FormValidator {

  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._buttonSelector = config.buttonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._buttonSelector);
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hideInputError (inputElement) {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _showInputError (inputElement) {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _toggleButtonState (submitButton, inputList) {
    if(this._hasInvalidInput(inputList)) {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners () {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._toggleButtonState(this._submitButton, this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitButton, this._inputList);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  removeAllErrors () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}
