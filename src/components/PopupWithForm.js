import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popup, handleClickSubmit}) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._handleClickSubmit = handleClickSubmit;
  }

  _getInputValues () { // собирает данные всех полей формы
    this._inputList = this._popup.querySelectorAll('.form__input');
    const formValues = {};
    this._inputList.forEach((data) => {
      const name = data.name;
      const value = data.value;
      formValues[name] = value;
      })
    return formValues
}

  setEventListeners() { // перезаписывает родит метод, добавляет обработчик submit'a формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      console.log(inputValues);
      this._handleClickSubmit(inputValues);
  });

   super.setEventListeners();
    // document.addEventListener('keydown', this._handleEscClose);
    // this._popup.addEventListener('click', (evt) => {
    //   if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
    //     this.close();
    //   }
    // })
  }

  close() { // перезаписывает родит метод, при закрытии попапа форма должна сбрасываться
    this._form.reset();
    super.close();
    // this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keydown', super._handleEscClose);
  }
}