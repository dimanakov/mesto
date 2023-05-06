import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popup, handleClickSubmit }) {
    super(popup);
    //this._handleClickSubmit = handleClickSubmit;
  }

setSubmitAction(action){
  this._handleClickSubmit = action;
}

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleClickSubmit();
    });
    super.setEventListeners();
  }
}