import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup);
    this._image = this._popup.querySelector('.scale-image__image');
    this._figcaption = this._popup.querySelector('.scale-image__figcaption');
  }

  open (image) { // перезаписывает родительский метод open
    this._image.src = image.src;
    this._image.title = image.alt;
    this._figcaption.textContent = image.alt;
    super.open();
  }
}