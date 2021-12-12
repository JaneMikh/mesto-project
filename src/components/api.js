export {
  getUserInfo,
  setUserInfo,
  getCardsInfo,
  addUserCard,
  deleteUserCard,
  setUserLike,
  deleteUserLike,
  getUserCardsInfo,
  setUserAvatar
}

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-4', //идентификатор группы plus-cohort-4
  headers: {
    Authorization: '53f5a902-2507-4ae9-b8bd-13e370d56b23', //токен
    'Content-Type': 'application/json'
  }
}

//получить информацию о пользователе c сервера
const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
  })
.then(parseResponse)
}

//проверка работы сервера
const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Отправить запрос на изменение аватара на сервер
const setUserAvatar = (userAvatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
  .then(parseResponse)
}

//Отправить запрос на изменение имени и описания на сервер
const setUserInfo = (userName, userAbout) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then(parseResponse)
}

//Получить информацию по всем карточкам
const getCardsInfo = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
})
.then(parseResponse)
}

//Выполнение одновременной загрузки информации о пользователе и карточках
const getUserCardsInfo = () => {
  return Promise.all([getUserInfo(), getCardsInfo()]);
}

//Добавить новую карточку
const addUserCard = (cardName, cardLink) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(parseResponse)
}

//Запрос на удаление карточки
const deleteUserCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
  .then(parseResponse)
  .catch((err) => {
    console.log(err);
  })
}

//Запрос на добавление лайка
const setUserLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  })
  .then(parseResponse)
}

//Запрос на удаление лайка
const deleteUserLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
  .then(parseResponse)
}
