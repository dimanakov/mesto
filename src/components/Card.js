export default class Card {
  constructor(
    {
      data,
      userId,
      handleCardClick,
      handleRemoveCardClick,
      handleLikeClick,
      handleRemoveLikeClick
    },
    cardTemplate) {

    this._data = data;
    this._likes = data.likes;
    this._userId = userId;
    this._template = cardTemplate;
    this._card = this._template.content.querySelector('.elements__item').cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._like = this._card.querySelector('.elements__like-button');
    this._likeCount = this._card.querySelector('.elements__like-count');
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
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
    this._like.addEventListener('click', () => {
      if (this._like.classList.toggle('elements__like-button_active')) {
        this._handleLikeClick(this._data)
      }
      else {
        this._handleRemoveLikeClick(this._data)
      }
    });
  }

  _isLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id
    })) {
      this._like.classList.add('elements__like-button_active')
    } else {
      this._like.classList.remove('elements__like-button_active')
    }
  }

  like(count) {
    this._likeCount.textContent = count;
  }

  _setEventRemoveCard = () => {
    this._remove = this._card.querySelector('.elements__remove-item');
    this._remove.addEventListener('click', () => {
      this._handleRemoveCardClick(this._card);
    });
  }

  createCard() {
    this._setEventScaleImage();
    this._card.querySelector('.elements__heading').textContent = this._data.name;
    this._setEventLike();
    this._isLiked();
    this.like(this._data.likes.length);
    this._setEventRemoveCard();
    return this._card
  }
}
