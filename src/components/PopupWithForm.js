// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm
// должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super(popupSelector);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));
    this._buttonSubmit = this._popup.querySelector(formSelectors.buttonSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {  //приватный метод _getInputValues, который собирает данные всех полей формы
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues; //объект с данными
  }
  renderLoading(loadingStatus) {  //перенесла из утилс
    if (loadingStatus) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = 'Сохранить';
    }
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
    // toggleSubmitButtonState(form, formSelectors);??  - можно отменить в editProfile
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
