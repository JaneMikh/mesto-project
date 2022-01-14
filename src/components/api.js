export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверка работы сервера
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получить информацию о пользователе c сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  .then(this._parseResponse)
  }

  //Отправить запрос на изменение аватара на сервер
  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
    .then(this._parseResponse)
  }

  //Отправить запрос на изменение имени и описания на сервер
  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(this._parseResponse)
  }

  //Получить информацию по всем карточкам
  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._parseResponse)
  }

  //Добавить новую карточку
  addUserCard ({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
    .then(this._parseResponse)
  }

  //Запрос на удаление карточки
  deleteUserCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then(this._parseResponse)
  }

  //Запрос на добавление лайка
  setUserLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._parseResponse)
  }

  //Запрос на удаление лайка
  deleteUserLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._parseResponse)
  }

  //Выполнение одновременной загрузки информации о пользователе и о карточках
  getUserCardsInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()]);
  }
}
