export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    //this._handleEscClose = this._handleEscClose.bind(this);
    //this._popup = this._popup.bind(this)
    // this._p = document.querySelector('.popup_elements')
    // console.log(this._p);
  }

  _handleEscClose = (evt) => { // логика закрытия попапа клавишей Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners = () => { // добавляет слушателя иконке закрытия попапа и при клике вокруг формы
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
    document.removeEventListener('keydown', this._handleEscClose);
  }
}