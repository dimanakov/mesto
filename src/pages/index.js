import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { cards, configValidatorForm, configProfile, configForm } from '../components/data.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';

// popup и формы на странице
const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_elements');
const imagePopupTemplate = document.querySelector('.popup_scale-image');
// const profileForm = document.forms['profile-form'];
// const cardForm = document.forms['card-form'];
const gallery = document.querySelector('.elements__gallery');
const cardValidateForm = new FormValidator(configValidatorForm, configForm.cardForm);
const profileValidateForm = new FormValidator(configValidatorForm, configForm.profileForm);
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



// const configProfile = {
//   popup: '.popup_profile',
//   name: '.profile__name',
//   profession: '.profile__profession',
// };

// const configForm = {
//   profileForm: 'profile-form',
//   profileFormName: '.form__input_el_name',
//   profileFormProfession: '.form__input_el_profession',
//   cardForm: 'card-form',
//   cardFormHeading: '.form__input_el_heading',
//   cardFormLink: '.form__input_el_image',
// }

// const configValidatorForm = {
//   form: '.form',
//   formInput: '.form__input',
//   formInputTypeError: 'form__input_type_error',
//   formInputErrorActive: 'form__input-error_active',
//   formSubmit: '.form__submit',
//   formSubmitInactive: 'form__submit_inactive',
// };


////////////////////////////////////////////////////////////////////////////////////

// открыть popup и навесить слушатель
// const openPopup = (popupElement) => {
//   popupElement.classList.add('popup_opened');
//   setEscapeListener(popupElement);
// }

//const testPopup = new Popup(configProfile.popup);

////////////////////////////////////////////////////////////////////////////////////

const user = new UserInfo(
  configProfile.name,
  configProfile.profession,
);

//console.log(configProfile.popup);

//   popup Profile

const userProfileFormPopup = new PopupWithForm(
  {
    popup: configProfile.popup,
    handleClickSubmit: (data) => {
      user.setUserInfo(data);
      userProfileFormPopup.close();
    }
  });

// открыть popup - редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  profileValidateForm.removeError();
  profileValidateForm.submitButtonActivate();

  const info = user.getUserInfo();
  fillProfileInputs(info);

  userProfileFormPopup.open()

  // user.getUserInfo();
  // userProfilePopup.open();
  // all <input> have property .value to read entered text
});

const fillProfileInputs = (info) => {
  //console.log(info.name);
  profileFormName.value = info.name; // перенести данные со страницы в форму
  profileFormProfession.value = info.profession; // same
}

// UserInfo

userProfileFormPopup.setEventListeners();
//const newCardPopup = new PopupWithForm(cardPopup);
// const imagePopup = new PopupWithImage(imagePopupTemplate);
// // открыть popup - добавить карточку
// addCardButton.addEventListener('click', () => {
//   cardValidateForm.removeError();
//   newCardPopup.setEventListeners()
//   newCardPopup.open();
// });



// сохранить изменения Профиля
// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = profileFormName.value;
//   profileProfession.textContent = profileFormProfession.value;
//   userProfilePopup.close();
//   //closePopup(profilePopup);
// };


////////////////////////////////////////////////////////////////////////////////////

// submit - подтвердить новую карточку
// const handleCardFormSubmit = (evt) => {
//   evt.preventDefault();

//   addNewCard();
//   cardValidateForm.submitButtonInactivate();
//   cardForm.reset();
//   newCardPopup.close()
//   // closePopup(cardPopup);
// };
////////////////////////////////////////////////////////////////////////////////////

// перенос данных фотографии в попап
// const scaleImage = (image) => {
//   openedImage.src = image.src;
//   openedImage.alt = image.alt;
//   figcaption.textContent = image.alt;
// };

////////////////////////////////////////////////////////////////////////////////////

// const handleCardClick = (image) => {
//   const zoomImageModal = new PopupWithImage(image);
//   imagePopup.setEventListeners();
//   zoomImageModal.open();
// scaleImage(image);
// imagePopup.open();
//openPopup(imagePopup);


////////////////////////////////////////////////////////////////////////////////////
const createNewCard = (data) => {
  const newCard = new Card({
    data,
    handleCardClick: (image) => { imagePopup.open(image) }
  },
    cardTemplate);
  return newCard.createCard();
}


const defaultCard = new Section({
  data: cards,
  renderer: (item) => {
    const card = createNewCard(item);
    defaultCard.addItem(card);
  }
}, gallery);
// добавить карточку в начало галереи
defaultCard.renderItems();



//Section


// const insertCardPrepend = (card) => {
//   const createdCard = new Card(card, cardTemplate, handleCardClick).createCard();
//   gallery.prepend(createdCard);
// };

////////////////////////////////////////////////////////////////////////////////////

// создать объект карточки перед добавлением в галерею
// без данной функции не работает добавление новой карточки
// предлагаю отставить упразднение, иначе проект сломается

// const addNewCard = () => {
//   const newCard = {};
//   newCard.name = cardFormHeading.value;
//   newCard.link = cardFormLink.value;
//   insertCardPrepend(newCard);
// };

// cards.forEach(insertCardPrepend);



////////////////////////////////////////////////////////////////////////////////////

// закрыть popup 
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', escapeFromPopup);
// };

// popupList.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   })
// })

// -- через нажатие клавиши Escape
// const escapeFromPopup = (evt) => {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// };

// const setEscapeListener = () => {
//   document.addEventListener('keydown', escapeFromPopup)
// };

////////////////////////////////////////////////////////////////////////////////////

// fillProfileInputs();
cardValidateForm.enableValidation();
profileValidateForm.enableValidation();
// profileForm.addEventListener('submit', handleProfileFormSubmit);
// cardForm.addEventListener('submit', handleCardFormSubmit);