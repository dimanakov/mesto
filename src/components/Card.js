export default class Card {
  constructor({data, handleCardClick}, cardTemplate) {
    this._data = data;
    this._template = cardTemplate;
    this._card = this._template.content.querySelector('.elements__item').cloneNode(true);
    this._handleCardClick = handleCardClick;
  }

  _setImage = () => {
    this._image = this._card.querySelector('.elements__image');
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    return this._image
  }

  _setEventScaleImage = () => {
    const image = this._setImage();
    image.addEventListener('click', () => {
      this._handleCardClick(image);
    });
  }

  _setEventLike = () => {
    this._like = this._card.querySelector('.elements__like-button');
    this._like.addEventListener('click', () => {
      this._like.classList.toggle('elements__like-button_active');
    });
  }

  _setEventRemoveCard = () => {
    this._remove = this._card.querySelector('.elements__remove-item');
    this._remove.addEventListener('click', () => {
      this._card.remove(); 
    });
  }

  createCard() {
    this._setEventScaleImage();
    this._card.querySelector('.elements__heading').textContent = this._data.name;
    this._setEventLike();
    this._setEventRemoveCard();
    return this._card
  }
}
