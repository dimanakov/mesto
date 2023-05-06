import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popup }) {
    super(popup);
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