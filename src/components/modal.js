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
};

export {openPopup, closePopup};
