import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor({src, title}){
    this._src = src;
    this._title = title;
  }

  open(){ // перезаписывает родительский метод open

  }
}