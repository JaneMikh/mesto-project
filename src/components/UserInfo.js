export default class UserInfo {
  constructor(userProfileConfig) {
    this._userName =  document.querySelector(userProfileConfig.nameSelector);
    this._userAbout = document.querySelector(userProfileConfig.professionSelector);
    this._avatar = document.querySelector(userProfileConfig.avatarSelector);
  }
  //Получить данные с сервера
  getUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._avatar.src = data.avatar;

    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._avatar.src,
    }
  }
  //Принимает данные, отправляет на сервер и добавляет на страницу
  setUserInfo({avatar, name, profession}) {
    this._avatar.src = avatar;
    this._userName.textContent = name;
    this._userAbout.textContent = profession;
  }
}
