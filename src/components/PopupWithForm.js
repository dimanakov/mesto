import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleClickSubmit }) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._handleClickSubmit = handleClickSubmit;
  }

  _getInputValues = () => { // собирает данные всех полей формы
    this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    const formValues = {};
    this._inputList.forEach((data) => {
      formValues[data.name] = data.value;
    })
    return formValues
  }

  setEventListeners() { // перезаписывает родит метод, добавляет обработчик submit'a формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleClickSubmit(inputValues);
    });
    super.setEventListeners();
  }

  close() { // перезаписывает родит метод, при закрытии попапа форма должна сбрасываться
    super.close();
    this._form.reset();
  }
}