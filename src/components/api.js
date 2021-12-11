export {
  getUserInfo,
  setUserInfo,
  getCardsInfo,
  addServCard
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
setUserAvatar('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');


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

//Добавить новую карточку
const addServCard = (cardName, cardLink) => {
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
