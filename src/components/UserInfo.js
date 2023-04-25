export default class UserInfo {
  constructor({nameSelector, professionSelector}){
    this._name = nameSelector;
    this._profession = professionSelector;
  }

  getUserInfo(){ // возвращает объект с данными пользователя. Используется при открытии попапа профиля
    const userInfo = {};
    userInfo.name = this._name.textContent; // перенести данные со страницы в форму
    userInfo.profession = this._profession.textContent; // same
    return userInfo
  }

  setUserInfo(){ // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = this._name.value;
    this._profession.textContent = this._profession.value;
  }
}