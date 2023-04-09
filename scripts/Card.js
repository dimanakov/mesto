export default class Card {
  constructor(data, cardTemplate, openScaleImage) {
    this._data = data;
    this._template = cardTemplate;
    this._card = this._template.content.querySelector('.elements__item').cloneNode(true);
    this._openScaleImage = openScaleImage;
  }

  _setImage(card, emptyTemplate) {
    this._image = emptyTemplate.querySelector('.elements__image');
    this._image.src = card.link;
    this._image.alt = card.name;
    return this._image
  }

  _setEventScaleImage(card, image) {
    image.addEventListener('click', () => {
      this._openScaleImage(card);
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
  }

  createCard() {
    this._generateCard(this._data);
    return this._card
  }
}
