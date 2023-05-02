import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { cards, configValidatorForm, configProfile, configPopup } from '../utils/data.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const gallery = document.querySelector('.elements__gallery');
const avatarValidateForm = new FormValidator(configValidatorForm, configPopup.avatarForm);
const cardValidateForm = new FormValidator(configValidatorForm, configPopup.cardForm);
const profileValidateForm = new FormValidator(configValidatorForm, configPopup.profileForm);
// поля form
const profileFormName = document.querySelector('.form__input_el_name');
const profileFormProfession = document.querySelector('.form__input_el_profession');
// кнопки
const buttonEditAvatar = document.querySelector('.profile__avatar-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// card
const cardTemplate = document.querySelector('.card-template');
let cardToRemove = null; // переменная для хранения карточки к удалению
////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo( // создаём класс пользователя для 
  configProfile.avatar,
  configProfile.name,
  configProfile.profession,
);

const userAvatarFormPopup = new PopupWithForm(  // создаём экземпляр попапа для аватара профиля
  {
    popup: configPopup.avatarPopup,
    handleClickSubmit: (link) => {
      userInfo.setUserAvatar(link);



      userAvatarFormPopup.close();
    }
  });

userAvatarFormPopup.setEventListeners();
// навешиваем слушатель на кнопку редактирования аватара

buttonEditAvatar.addEventListener('click', () => {
  avatarValidateForm.removeError();
  avatarValidateForm.submitButtonInactivate();
  userAvatarFormPopup.open();
})

////////////////////////////////////////////////////////////////////////////////////

const confirmRemoveCardPopup = new PopupWithForm(  // создаём экземпляр попапа для аватара профиля
  {
    popup: configPopup.removeCardPopup,
    handleClickSubmit: () => {
      cardToRemove.remove();
      



      confirmRemoveCardPopup.close();
    }
  });

confirmRemoveCardPopup.setEventListeners();

////////////////////////////////////////////////////////////////////////////////////

// навешиваем слушатель на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  profileValidateForm.removeError();
  profileValidateForm.submitButtonActivate();
  const info = userInfo.getUserInfo();
  fillProfileInputs(info);
  userProfileFormPopup.open()
  // all <input> have property .value to read entered text
});

const userProfileFormPopup = new PopupWithForm(  // создаём экземпляр попапа для профиля
  {
    popup: configPopup.profilePopup,
    handleClickSubmit: (data) => {
      userInfo.setUserInfo(data);





      userProfileFormPopup.close();
    }
  });

userProfileFormPopup.setEventListeners(); // навешиваем слушатели закрытия попапа

const fillProfileInputs = (info) => { // перенесим данные со страницы в форму
  profileFormName.value = info.name;
  profileFormProfession.value = info.profession;
}

const newCardFormPopup = new PopupWithForm({
  popup: configPopup.cardPopup,
  handleClickSubmit: (item) => {





    const card = createNewCard(item);
    defaultCardList.addItem(card);
    newCardFormPopup.close();
  },
});

// навешиваем слушатель клика на пкнопку "добавить карточку"
addCardButton.addEventListener('click', () => {
  cardValidateForm.removeError();
  cardValidateForm.submitButtonInactivate();
  newCardFormPopup.open();
});

newCardFormPopup.setEventListeners(); // навешиваем слушатели закрытия попапа

////////////////////////////////////////////////////////////////////////////////////

const imagePopup = new PopupWithImage(configPopup.imagePopup); // создаём экземпляр попапа для изображений
  imagePopup.setEventListeners();

////////////////////////////////////////////////////////////////////////////////////

const createNewCard = (data) => { // функция создания карточки
  const newCard = new Card({
    data,
    handleCardClick: (image) => {
      imagePopup.open(image);
    },
    handleRemoveCardClick: (card) => {
      confirmRemoveCardPopup.open();
      cardToRemove = card;
     // confirmRemoveCardPopup.handleRemoveSubmit(card);

      //card.remove();
    }
  },
    cardTemplate);
  return newCard.createCard();
}

const defaultCardList = new Section({ // создаем массив карточек из списка по умолчанию
  items: cards,
  renderer: (item) => {
    const card = createNewCard(item);
    defaultCardList.addItem(card);
  }
}, gallery);

defaultCardList.renderItems(); // отрисовка карточек из массива defaultCardList

////////////////////////////////////////////////////////////////////////////////////
avatarValidateForm.enableValidation();
cardValidateForm.enableValidation();
profileValidateForm.enableValidation();
