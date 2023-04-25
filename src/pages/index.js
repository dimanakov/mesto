import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { cards, configForm } from '../components/data.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';

// popup и формы на странице
const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_elements');
const imageOpenPopup = document.querySelector('.popup_scale-image');
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const gallery = document.querySelector('.elements__gallery');
const cardValidateForm = new FormValidator(configForm, cardForm);
const profileValidateForm = new FormValidator(configForm, profileForm);
// данные профиля на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const profileUserInfo = { nameSelector: profileName, professionSelector: profileProfession };
// поля form
const profileFormName = document.querySelector('.form__input_el_name');
const profileFormProfession = document.querySelector('.form__input_el_profession');
const cardFormHeading = document.querySelector('.form__input_el_heading');
const cardFormLink = document.querySelector('.form__input_el_image');
// кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// card
const cardTemplate = document.querySelector('.card-template');
const openedImage = document.querySelector('.scale-image__image');
const figcaption = document.querySelector('.scale-image__figcaption');

const user = new UserInfo(profileUserInfo);

////////////////////////////////////////////////////////////////////////////////////

// открыть popup и навесить слушатель
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  setEscapeListener(popupElement);
}

////////////////////////////////////////////////////////////////////////////////////

const newCardPopup = new Popup(cardPopup);
const userProfilePopup = new Popup(profilePopup);

// открыть popup - добавить карточку
addCardButton.addEventListener('click', () => {
  cardValidateForm.removeError();
  newCardPopup.open();
  newCardPopup.setEventListeners()
});

////////////////////////////////////////////////////////////////////////////////////

const fillProfileInputs = () => {
  profileFormName.value = profileName.textContent; // перенести данные со страницы в форму
  profileFormProfession.value = profileProfession.textContent; // same
}

// открыть popup - редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  profileValidateForm.removeError();
  profileValidateForm.submitButtonActivate();
 fillProfileInputs();
 // user.getUserInfo();
  userProfilePopup.open();
 // openPopup(profilePopup);
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
  openPopup(imageOpenPopup);
}

////////////////////////////////////////////////////////////////////////////////////

// добавить карточку в начало галереи

const insertCardPrepend = (card) => {
 // console.log(cardTemplate.content);
  const createdCard = new Card(card, cardTemplate, openScaleImage).createCard();
  gallery.prepend(createdCard);
};

////////////////////////////////////////////////////////////////////////////////////

// создать объект карточки перед добавлением в галерею
// без данной функции не работает добавление новой карточки
// предлагаю отставить упразднение, иначе проект сломается

const addNewCard = () => {
  const newCard = {};
  newCard.name = cardFormHeading.value;
  newCard.link = cardFormLink.value;
  insertCardPrepend(newCard);
};

////////////////////////////////////////////////////////////////////////////////////

// submit - подтвердить новую карточку
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  addNewCard();
  cardValidateForm.submitButtonInactivate();
  cardForm.reset();
  newCardPopup.close()
 // closePopup(cardPopup);
};

////////////////////////////////////////////////////////////////////////////////////

// закрыть popup 
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeFromPopup);
};

// popupList.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   })
// })

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
  userProfilePopup.close();
  //closePopup(profilePopup);
};

////////////////////////////////////////////////////////////////////////////////////
cards.forEach(insertCardPrepend);
fillProfileInputs();
cardValidateForm.enableValidation();
profileValidateForm.enableValidation();
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);