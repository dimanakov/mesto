import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleClickSubmit }) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._handleClickSubmit = handleClickSubmit;
    this._submitButton = this._popup.querySelector('.form__submit');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
  }

  _getInputValues = () => { // собирает данные всех полей формы
    const formValues = {};
    this._inputList.forEach((data) => {
      formValues[data.name] = data.value;
    })
    return formValues
  }

  renameSubmitButton(action) { // эта функция используется только для попапов с формами
    this._submitButton.textContent = action;
  }

  setEventListeners() { // перезаписывает родит метод, добавляет обработчик submit'a формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
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