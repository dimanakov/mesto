import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleClickSubmit) {
    this.handleClickSubmit = handleClickSubmit;
  }

  _getInputValues() { // собирает данные всех полей формы

  }

  setEventListeners() { // перезаписывает родит метод, добавляет обработчик submit'a формы

  }

  close() { // перезаписывает родит метод, при закрытии попапа форма должна сбрасываться

  }

}