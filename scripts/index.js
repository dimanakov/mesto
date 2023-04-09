import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

// конфигурация validate.js

const configList = {
  form: '.form',
  formInput: '.form__input',
  formInputTypeError: 'form__input_type_error',
  formInputErrorActive: 'form__input-error_active',
  formSubmit: '.form__submit',
  formSubmitInactive: 'form__submit_inactive',
};

// popup и формы на странице
const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_elements');
const scaleImagePopup = document.querySelector('.popup_scale-image');
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const elementsGallery = document.querySelector('.elements__gallery');
const cardFormValidate = new FormValidator(configList, cardForm);
const profileFormValidate = new FormValidator(configList, profileForm);
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
//const closeButtons = document.querySelectorAll('.popup__close-button');
//const submitNewCard = cardForm.querySelector('.form__submit');
// card
const cardTemplate = document.querySelector('.card-template');
const openedImage = document.querySelector('.scale-image__image');
const figcaption = document.querySelector('.scale-image__figcaption');

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////

// открыть popup и навесить слушатель
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  setEscapeListener(popupElement);
}

////////////////////////////////////////////////////////////////////////////////////

// открыть popup - добавить карточку
addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

////////////////////////////////////////////////////////////////////////////////////

const fillProfileInputs = () => {
  profileFormName.value = profileName.textContent; // перенести данные со страницы в форму
  profileFormProfession.value = profileProfession.textContent; // same
}

// открыть popup - редактировать профиль
editProfileButton.addEventListener('click', () => {
  fillProfileInputs();
  openPopup(profilePopup);
  // all <input> have property .value to read entered text
});

////////////////////////////////////////////////////////////////////////////////////

// перенос данных фотографии в попап
const scaleImage = (name, link) => {
  openedImage.src = link;
  openedImage.alt = name;
  figcaption.textContent = name;
};

////////////////////////////////////////////////////////////////////////////////////

const openScaleImage = (card) => {
  scaleImage(card.name, card.link);
  openPopup(scaleImagePopup);
}

////////////////////////////////////////////////////////////////////////////////////

// добавить карточку в начало галереи

const insertCardPrepend = (card) => {
  const createdCard = new Card(card, cardTemplate, openScaleImage).createCard();
  elementsGallery.prepend(createdCard);
};

////////////////////////////////////////////////////////////////////////////////////

// вставить карточки в галерею из сохранённого списка
cards.forEach(insertCardPrepend);

////////////////////////////////////////////////////////////////////////////////////

// создать новую карточку в галерею
const addCard = (heading, link) => {
  const newCard = {};
  newCard.name = heading;
  newCard.link = link;
  insertCardPrepend(newCard);
};

////////////////////////////////////////////////////////////////////////////////////

// submit - подтвердить новую карточку
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  addCard(cardFormHeading.value, cardFormLink.value);
  cardFormValidate.renderForm();
  cardForm.reset();
  closePopup(cardPopup);
};

////////////////////////////////////////////////////////////////////////////////////

// закрыть popup 
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeFromPopup);
};

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

// -- через нажатие клавиши Escape
const escapeFromPopup = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
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

fillProfileInputs();
cardFormValidate.enableValidation();
profileFormValidate.enableValidation();
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
