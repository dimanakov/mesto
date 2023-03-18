const cards = [
  {
    name: 'Нальчик',
    link: 'https://images.unsplash.com/photo-1635530043255-eb163c579d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Пошехонье',
    link: 'https://images.unsplash.com/photo-1603222450668-0a3b67e57c09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Калуга',
    link: 'https://images.unsplash.com/photo-1505551071487-d4a3fd384857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80'
  },
  {
    name: 'Минеральные воды',
    link: './images/elements__min-vodi.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1575297274481-1273a176f028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  }
];

////////////////////////////////////////////////////////////////////////////////////

// popup и формы на странице
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_elements');
const scaleImagePopup = document.querySelector('.popup_scale-image');
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const elementsGallery = document.querySelector('.elements__gallery');
// данные профиля на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// поля form
const profileFormName = document.querySelector('.form__input_el_name');
const profileFormProfession = document.querySelector('.form__input_el_profession');
const cardFormHeading = document.querySelector('.form__input_el_heading');
const cardFormLink = document.querySelector('.form__input_el_image');
// кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const submitNewCard = cardForm.querySelector('.form__submit');
// image
const openedImage = document.querySelector('.scale-image__image');
const figcaption = document.querySelector('.scale-image__figcaption');

////////////////////////////////////////////////////////////////////////////////////

// конфигурация validate.js

const configList = {
  fieldset: '.form__field',
  formInput: '.form__input',
  formInputTypeError: 'form__input_type_error',
  formInputErrorActive: 'form__input-error_active',
  formSubmit: '.form__submit',
  formSubmitInactive: 'form__submit_inactive',
  openedForm: '.form',
  openedPopup: '.popup_opened',
};

////////////////////////////////////////////////////////////////////////////////////

// открыть popup и навесить слушателей
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  setCloseModal(popupElement);
  setEscapeListener(popupElement);
}

////////////////////////////////////////////////////////////////////////////////////

// popup - добавить карточку
addCardButton.addEventListener('click', function () {
  openPopup(cardPopup);
  enableValidation(configList);
});

////////////////////////////////////////////////////////////////////////////////////

// popup - редактировать профиль
editProfileButton.addEventListener('click', function () {
  profileFormName.value = profileName.textContent; // перенести данные со страницы в форму
  profileFormProfession.value = profileProfession.textContent; // same
  openPopup(profilePopup);
  // all <input> have property .value to read entered text
  enableValidation(configList);
});

////////////////////////////////////////////////////////////////////////////////////

// перенос данных фотографии в попап
const scaleImage = (name, link) => {
  openedImage.setAttribute('src', link);
  openedImage.setAttribute('alt', name);
  figcaption.textContent = name;
};

////////////////////////////////////////////////////////////////////////////////////

// создание карточки из template
const createCard = (card) => {
  const cardTemplate = document.querySelector('.card-template').content.cloneNode(true);
  const cardImage = cardTemplate.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardImage.addEventListener('click', function () {
    scaleImage(card.name, card.link);
    openPopup(scaleImagePopup);
  });
  cardTemplate.querySelector('.elements__heading').textContent = card.name;
  cardTemplate.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  cardTemplate.querySelector('.elements__remove-item').addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();
  });
  return cardTemplate;
};
//append add node to the end of list
//prepend add node to the beginning of list
//before add node before the list
//after add node after the list
//replaceWith replace node

////////////////////////////////////////////////////////////////////////////////////

// добавить карточку в начало галереи
const insertCardPrepend = (card) => {
  const createdCard = createCard(card);
  elementsGallery.prepend(createdCard);
};

////////////////////////////////////////////////////////////////////////////////////

// вставить карточки в галерею из сохранённого списка
cards.forEach(insertCardPrepend);

////////////////////////////////////////////////////////////////////////////////////

// создать новую карточку в галерею
const addNewCard = (heading, link) => {
  const newCard = {};
  newCard.name = heading;
  newCard.link = link;
  insertCardPrepend(newCard);
};

////////////////////////////////////////////////////////////////////////////////////

// submit - подтвердить новую карточку
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  addNewCard(cardFormHeading.value, cardFormLink.value);
  cardForm.reset();
  closePopup(cardPopup);
};

////////////////////////////////////////////////////////////////////////////////////

// закрыть popup 
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// -- через кнопку(крестик)
closeButtons.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup)
  })
});

// -- через нажатие на подложку
const setCloseModal = (popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
};

// -- через нажатие клавиши Escape
const escapeFromPopup = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
    document.removeEventListener('keydown', escapeFromPopup);
  }
};

const setEscapeListener = () => {
  document.addEventListener('keydown', escapeFromPopup)
};

////////////////////////////////////////////////////////////////////////////////////

// сохранить изменения Профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileProfession.textContent = profileFormProfession.value;
  closePopup(profilePopup);
};

////////////////////////////////////////////////////////////////////////////////////

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
