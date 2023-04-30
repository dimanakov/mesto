export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  _handleEscClose = (evt) => { // логика закрытия попапа клавишей Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() { // добавляет слушателя иконке закрытия попапа и при клике вокруг формы
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}