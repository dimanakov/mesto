// import { configForm } from './data.js';

export default class UserInfo {
  constructor(profileNameSelector, profileProfessionSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._profession = document.querySelector(profileProfessionSelector);
    // this._formName = document.querySelector(configForm.profileFormName);
    // this._formProfession = document.querySelector(configForm.profileFormProfession);
    //console.log(this._name.textContent);
  }

  getUserInfo () { // возвращает объект с данными пользователя. Используется при открытии попапа профиля
    const userInfo = {};
    userInfo.name = this._name.textContent; // перенести данные со страницы в форму
    userInfo.profession = this._profession.textContent; // same
    return userInfo
  }

  setUserInfo (data) { // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._profession.textContent = data.profession;
  }
}