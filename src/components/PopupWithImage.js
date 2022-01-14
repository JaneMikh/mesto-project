export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageItem, imageName }) {
    super(popupSelector);
    this._imageItem = imageItem;
    this._imageName = imageName;
  }
  openPopup({link, name}) {
    super.openPopup();
    this._imageItem.src = link;
    this._imageItem.alt = name;
    this._imageName.textContent = name;
  }
  // В методе open класса PopupWithImage нужно вставлять в попап картинку и текст в поля
}
