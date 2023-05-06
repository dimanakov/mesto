export default class UserInfo {
  constructor(profileAvatarSelector, profileNameSelector, profileProfessionSelector) {
    this._avatar = document.querySelector(profileAvatarSelector);
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileProfessionSelector);
  }

setUserAvatar (link) {
  this._avatar.src = link.avatar;
}

  getUserInfo () { // возвращает объект с данными пользователя. Используется при открытии попапа профиля
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.about = this._about.textContent;
    return userInfo
  }

  setUserInfo (data) { // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}