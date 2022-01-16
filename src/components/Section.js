// Класс размещения карточек на странице
export default class Section {
  constructor({ renderItems }, selector) {
    this._renderer = renderItems;
    this._container = document.querySelector(selector);
  }

  // Перебор карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Добавление карточки в разметку
  setItem(element) {
    this._container.prepend(element);
  }
}
