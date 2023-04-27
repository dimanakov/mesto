import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor({src, title}){
    super()
    this._src = src;
    this._title = title;
  }

  open(){ // перезаписывает родительский метод open

  }

  const handleCardClick = (image) => {
    scaleImage(image.alt, image.src);
    imageOpenPopup.setEventListeners();
    imageOpenPopup.open();

}