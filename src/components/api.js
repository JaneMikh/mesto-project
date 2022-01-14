export default class Api {
  constructor(options) {  //сюда передать конфиг
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //проверка работы сервера
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получить информацию о пользователе c сервера
  //Работает console.log(api.getUserInfo());
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  .then(this._parseResponse)
  }

  //Отправить запрос на изменение аватара на сервер
  //Работает console.log(api.setUserAvatar('https://krasivosti.pro/uploads/posts/2021-04/1617819813_10-p-koshka-oboi-malenkaya-koshechka-12.jpg'));
  setUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        userAvatar,
      })
    })
    .then(this._parseResponse)
  }

  //Отправить запрос на изменение имени и описания на сервер
  //Работает console.log(api.setUserInfo('Eva', 'Teacher'));
  setUserInfo(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
    .then(this._parseResponse)
  }

  //Получить информацию по всем карточкам
  //Работает console.log(api.getCardsInfo());
  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._parseResponse)
  }

  //Добавить новую карточку
  //Работает console.log(api.addUserCard('Котя','https://krasivosti.pro/uploads/posts/2021-04/1617819813_10-p-koshka-oboi-malenkaya-koshechka-12.jpg'));
  addUserCard (cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._parseResponse)
  }

  //Запрос на удаление карточки
  //Работает console.log(api.deleteUserCard('61d75085842a2d0012423d26'));
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
  //Работает console.log(api.setUserLike('61d81243842a2d0012439c98'));
  setUserLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._parseResponse)
  }

  //Запрос на удаление лайка
  //Работает console.log(api.deleteUserLike('61d81243842a2d0012439c98'));
  deleteUserLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._parseResponse)
  }

  //Выполнение одновременной загрузки информации о пользователе и карточках
  //Работает console.log(api.getUserCardsInfo());
  getUserCardsInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()]);
  }

}
