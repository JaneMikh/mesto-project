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

  //Функция для проверки валидации полей ввода, возвращающая false, если поле невалидно
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  //Функция, которая удаляет класс с ошибкой
  _hideInputError (inputElement) {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  //Функция, которая добавляет класс с ошибкой
  _showInputError (inputElement) {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Функция для изменения состояния кнопки submit
  _toggleButtonState (submitButton, inputList) {
    if(this._hasInvalidInput(inputList)) {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  //Функция для проверки валидации полей ввода
  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  //Слушатели для форм
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

  //Функция для проверки валидации
  enableValidation() {
    this._setEventListeners();
  }

  //Функция перебирает все инпуты и снимает с них спан и стилизацию инпутов
  removeAllErrors () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Функция, которая при открытии попапа делает кнопку отправки формы неактивной
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  //Функция, исправляющая баг, когда при открытии попапа форма валидна, а кнопка неактивна
  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

}



// import {config} from '../components/constants.js'

// //Функция для проверки валидации полей ввода, возвращающая false, если поле невалидно
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //Функция для поиска ошибки
// const getErrorElement = (inputElement, formElement) => formElement.querySelector(`#${inputElement.id}-error`);

// //Функция, которая удаляет класс с ошибкой
// const hideInputError = (inputElement, formElement) => {
//   const errorElement = getErrorElement(inputElement, formElement);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.textContent = '';
// };

// //Функция, которая добавляет класс с ошибкой
// const showInputError = (inputElement, formElement) => {
//   const errorElement = getErrorElement(inputElement, formElement);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
// };

// //Функция для изменения состояния кнопки submit
// const toggleButtonState = (submitButton, inputList) => {
//   if(hasInvalidInput(inputList)) {
//     submitButton.disabled = true;
//     submitButton.classList.add(config.inactiveButtonClass);
//   } else {
//     submitButton.disabled = false;
//     submitButton.classList.remove(config.inactiveButtonClass);
//   }
// };

// //Функция для проверки валидации полей ввода
// const checkInputValidity = (inputElement, formElement) => {
//   if (inputElement.validity.valid) {
//     hideInputError(inputElement, formElement);
//   } else {
//     showInputError(inputElement, formElement);
//   }
// };

// //Слушатели для форм
// const setEventListeners = (formElement) => {
//   formElement.addEventListener('submit', evt => {
//     evt.preventDefault();
//   });
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const submitButton = formElement.querySelector(config.buttonSelector);

//   toggleButtonState(submitButton, inputList);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(inputElement, formElement);
//       toggleButtonState(submitButton, inputList);
//     });
//   });
// };

// //Функция для проверки валидации, включающая поиск всех форм и добавление слушателей
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement);
//   });
// };

//  //Функция перебирает все инпуты и снимает сних спан и стилизацию инпутов
//   const removeAllErrors = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   inputList.forEach((inputElement) => {
//     hideInputError(inputElement, formElement);
//   });
// };

// //Функция, которая при открытии попапа делает кнопку отправки формы неактивной
// const disableSubmitButton = (formElement) => {
//   const submitButton = formElement.querySelector(config.buttonSelector);
//   submitButton.classList.add(config.inactiveButtonClass);
//   submitButton.disabled = true;
// };

//  //Функция, исправляющая баг, когда при открытии попапа форма валидна, а кнопка неактивна
//  const enableSubmitButton = (formElement) => {
//   const submitButton = formElement.querySelector(config.buttonSelector);
//   submitButton.classList.remove(config.inactiveButtonClass);
//   submitButton.disabled = false;
// };

// export {enableValidation, removeAllErrors, enableSubmitButton, disableSubmitButton};
