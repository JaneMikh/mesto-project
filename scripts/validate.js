const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const getErrorElement = (inputElement, formElement) => formElement.querySelector(`#${inputElement.id}-error`);

const hideInputError = (inputElement, formElement) => {
  const errorElement = getErrorElement(inputElement, formElement);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

const showInputError = (inputElement, formElement) => {
  const errorElement = getErrorElement(inputElement, formElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;

};

const toggleButtonState = (submitButton, inputList) => {
  if(hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
  };
};

const checkInputValidity = (inputElement, formElement) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formElement);
  } else {
    showInputError(inputElement, formElement);
  }
};

const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', evt => {
    //отменить перезaгрузку страницы после отправки формы
    evt.preventDefault();
  });
  // найти все поля ввода
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  //найти кнопку submit
  const submitButton = formElement.querySelector(config.buttonSelector);

  //установка кнопки сразу в правильное положение
  toggleButtonState(submitButton, inputList);

  //добавить слушатели для полей ввода
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      //функция проверки валидности полей ввода
      checkInputValidity(inputElement, formElement);
      //toggle button state
      toggleButtonState(submitButton, inputList);
    });
  });
};

const enableValidation = () => {
  //найти все формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //создать слушатели для каждой формы
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
};
