//Назначение: Валидация данных в форме
import {config} from '../components/constants.js'
export {enableValidation, removeAllErrors, enableSubmitButton, disableSubmitButton};

//Функция для проверки валидации полей ввода, возвращающая false, если поле невалидно
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция для поиска ошибки
const getErrorElement = (inputElement, formElement) => formElement.querySelector(`#${inputElement.id}-error`);

//Функция, которая удаляет класс с ошибкой
const hideInputError = (inputElement, formElement) => {
  const errorElement = getErrorElement(inputElement, formElement);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

//Функция, которая добавляет класс с ошибкой
const showInputError = (inputElement, formElement) => {
  const errorElement = getErrorElement(inputElement, formElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//Функция для изменения состояния кнопки submit
const toggleButtonState = (submitButton, inputList) => {
  if(hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add('form__button-submit_inactive');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('form__button-submit_inactive');
  }
};

//Функция для проверки валидации полей ввода
const checkInputValidity = (inputElement, formElement) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formElement);
  } else {
    showInputError(inputElement, formElement);
  }
};

//Слушатели для форм
const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.buttonSelector);

  toggleButtonState(submitButton, inputList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(submitButton, inputList);
    });
  });
};

//Функция для проверки валидации, включающая поиск всех форм и добавление слушателей
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};


 //Функция перебирает все инпуты и снимает сних спан и стилизацию инпутов
 const removeAllErrors = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
      hideInputError(inputElement, formElement);
    });
  });
};

//Функция, которая при открытии попапа делает кнопку отправки формы неактивной
const disableSubmitButton = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const submitButton = formElement.querySelector(config.buttonSelector);
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  });
};

 //Функция, исправляющая баг, когда при открытии попапа форма валидна, а кнопка неактивна
 const enableSubmitButton = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const submitButton = formElement.querySelector(config.buttonSelector);
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  });
};

