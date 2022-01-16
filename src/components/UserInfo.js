export default class UserInfo {
  constructor(userProfileConfig) {
    this._userName =  document.querySelector(userProfileConfig.nameSelector);
    this._userAbout = document.querySelector(userProfileConfig.professionSelector);
    this._avatar = document.querySelector(userProfileConfig.avatarSelector);
  }

  //Получить данные
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._avatar.src,
    }
    return this._userInfo;
  }

  //Принимает данные и добавляет на страницу
  setUserInfo({avatar, name, about}) {
    this._avatar.src = avatar;
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
