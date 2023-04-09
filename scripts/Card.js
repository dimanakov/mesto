export default class Card {
  constructor(data, cardTemplate, openScaleImage) {
    this._data = data;
    this._template = cardTemplate;
    this._card = this._template.content.querySelector('.elements__item').cloneNode(true);
    this._openScaleImage = openScaleImage;
    // this._openedImage = document.querySelector('.scale-image__image');
    // this._figcaption = document.querySelector('.scale-image__figcaption');
    // this._imagePopup = document.querySelector('.popup_scale-image');
  }

  _setImage(card, emptyTemplate) {
    this._image = emptyTemplate.querySelector('.elements__image');
    this._image.src = card.link;
    this._image.alt = card.name;
    return this._image
  }

  // _renderImage(popup){
  //   this._image = popup.querySelector('.elements__image');
  //   console.log(this._image);
  //   this._image.src = '';
  //   this._image.alt = '';
  // }

  // _closePopup() {
  //   console.log('privet');
  //   // popup.classList.remove('popup_opened');
  //   // this._renderImage();
  //   // document.removeEventListener('keydown', this._escapeFromPopup);
  // }

  // _escapeFromPopup(evt) {
  //   if (evt.key === 'Escape') {
  //     this._popup = document.querySelector('.popup_opened');
  //     this._closePopup(this._popup);
  //   }
  // }

  // _setEscapeListener() {
  //   document.addEventListener('keydown', this._escapeFromPopup())
  // }

  // _scaleImagePopup(popup) {
  //   popup.classList.add('popup_opened');
  //   this._setEscapeListener();
  // }

  // _scaleImage(name, link) {
  //   this._openedImage.alt = name;
  //   this._openedImage.src = link;
  //   this._figcaption.textContent = name;
  // }

  _setEventScaleImage(card, image) {
    image.addEventListener('click', () => {
      this._openScaleImage(card);
      // this._scaleImagePopup(this._imagePopup);
    });
  }

  _setEventLike(element) {
    element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active');
    });
  }

  _setEventRemoveCard(element) {
    element.querySelector('.elements__remove-item').addEventListener('click', (evt) => {
      evt.target.closest('.elements__item').remove();
    });
  }

  _generateCard(card) {
    this._cardImage = this._setImage(card, this._card);
    this._setEventScaleImage(card, this._cardImage);
    this._card.querySelector('.elements__heading').textContent = card.name;
    this._setEventLike(this._card);
    this._setEventRemoveCard(this._card);
    //console.log(this._card.content);
    // this._cardImage = this._emptyCard.querySelector('.elements__image');
    // this._cardImage.src = card.link;
    // this._cardImage.alt = card.name;

    //console.log(cardImage);

    // this._cardImage.addEventListener('click', () => {
    //   this._scaleImage(card.name, card.link);
    //   openPopup(scaleImagePopup);
    // });

    // this._emptyCard.querySelector('.elements__like-button').addEventListener('click', (evt) => {
    //   evt.target.classList.toggle('elements__like-button_active');
    // });
    // this._emptyCard.querySelector('.elements__remove-item').addEventListener('click', (evt) => {
    //   evt.target.closest('.elements__item').remove();
    // });

  }

  createCard() {
    this._generateCard(this._data);
    //console.log(this._createdCard);
    return this._card
  }
}
