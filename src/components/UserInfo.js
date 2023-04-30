export default class UserInfo {
  constructor(profileNameSelector, profileProfessionSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._profession = document.querySelector(profileProfessionSelector);
  }

  getUserInfo () { // возвращает объект с данными пользователя. Используется при открытии попапа профиля
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.profession = this._profession.textContent;
    return userInfo
  }

  setUserInfo (data) { // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._profession.textContent = data.profession;
  }
}