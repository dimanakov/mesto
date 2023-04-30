import Popup from './Popup.js';
// img class="scale-image__image"
// document.querySelector('.scale-image__figcaption')
export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup);
    //this._image = data;
    this._image = this._popup.querySelector('.scale-image__image');
    this._figcaption = this._popup.querySelector('.scale-image__figcaption');
    //console.log(this._popup);
  }

  open (image) { // перезаписывает родительский метод open
    this._image.src = image.src;
    this._image.title = image.alt;
    this._figcaption.textContent = image.alt;
    super.open();
  }
}
  // const scaleImage = (image) => {
  //   openedImage.src = image.src;
  //   openedImage.alt = image.alt;
  //   figcaption.textContent = image.alt;
  // };

  ////////////////////////////////////////////////////////////////////////////////////

  // const handleCardClick = (image) => {
  //   scaleImage(image);
  //   imageOpenPopup.setEventListeners();
  //   imageOpenPopup.open();
  //   //openPopup(imageOpenPopup);
  // }

// this._popup.classList.add('popup_opened');

//   const handleCardClick = (image) => {
//     scaleImage(image.alt, image.src);
//     imageOpenPopup.setEventListeners();
//     imageOpenPopup.open();

// }