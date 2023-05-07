import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { configValidatorForm, configProfile, configPopup } from '../utils/data.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import { api } from '../components/Api.js';

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
// userId
let userId; // переменная для хранения id пользователя

////////////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo( // создаём класс пользователя
  configProfile.avatar,
  configProfile.name,
  configProfile.profession,
);

////////////////////////////////////////////////////////////////////////////////////

const userAvatarFormPopup = new PopupWithForm(  // создаём экземпляр попапа для аватара профиля
  {
    popup: configPopup.avatarPopup,
    handleClickSubmit: (link, submitButton) => {
      (async () => {
        submitButton.textContent = 'Сохранение...'
        await api.setUserAvatar(link);
        await upUserInfoApi();
        userAvatarFormPopup.close();
        setTimeout((() => {submitButton.textContent = 'Сохранить'}), 1000);
      })();
    }
  });

////////////////////////////////////////////////////////////////////////////////////

const confirmRemoveCardPopup = new PopupWithConfirmation(  // создаём экземпляр попапа для удаления карточки
  {
    popup: configPopup.removeCardPopup,
  });

////////////////////////////////////////////////////////////////////////////////////

const userProfileFormPopup = new PopupWithForm(  // создаём экземпляр попапа для профиля пользователя
  {
    popup: configPopup.profilePopup,
    handleClickSubmit: (data, submitButton) => {
      (async () => {
        submitButton.textContent = 'Сохранение...'
        await api.setUserInfo(data);
        await upUserInfoApi();
        userProfileFormPopup.close();
        setTimeout((() => { submitButton.textContent = 'Сохранить' }), 1000);
      })();
    }
  });

////////////////////////////////////////////////////////////////////////////////////

const fillProfileInputs = (info) => { // функиця переноса данных со страницы в форму
  profileFormName.value = info.name;
  profileFormProfession.value = info.about;
};

////////////////////////////////////////////////////////////////////////////////////

const newCardFormPopup = new PopupWithForm({ // создаём экземпляр попапа создания новой карточки
  popup: configPopup.cardPopup,
  handleClickSubmit: (item, submitButton) => {
    (async () => {
      submitButton.textContent = 'Сохранение...'
      await api.addCard(item);
      getCards();
      newCardFormPopup.close();
      setTimeout((() => { submitButton.textContent = 'Создать' }), 1000);
    })();
  },
});

////////////////////////////////////////////////////////////////////////////////////

const imagePopup = new PopupWithImage(configPopup.imagePopup); // создаём экземпляр попапа для увеличенных изображений

////////////////////////////////////////////////////////////////////////////////////

async function getCards() {
  const cardsList = await api.getInitialCards();
  const defaultCardList = new Section({ // создаем массив карточек из списка по умолчанию
    items: cardsList,
    renderer: (item) => {
      const card = createNewCard(item);
      defaultCardList.addItem(card);
    }
  }, gallery);
  defaultCardList.renderItems();
};

async function upUserInfoApi() {
  const userData = await api.getUserInfo();
  userId = userData._id;
  userInfo.setUserAvatar(userData);
  userInfo.setUserInfo(userData);
};

const createNewCard = (data) => { // функция создания карточки
  const newCard = new Card({
    data, userId,
    handleCardClick: (image) => {
      imagePopup.open(image);
    },
    handleRemoveCardClick: () => {
      confirmRemoveCardPopup.open();
      confirmRemoveCardPopup.setSubmitAction(() => {
        (async () => {
          await api.removeCard(data);
          getCards();
          confirmRemoveCardPopup.close();
        })();
      });
    },
    handleLikeClick: (card) => {
      (async () => {
        const res = await api.addLike(card);
        newCard.like(res.likes.length);
      })();
    },
    handleRemoveLikeClick: (card) => {
      (async () => {
        const res = await api.removeLike(card);
        newCard.like(res.likes.length);
      })();
    }
  },
    cardTemplate);
  return newCard.createCard();
};

upUserInfoApi();
getCards();

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

// навешиваем слушатель клика на пкнопку "добавить карточку"
addCardButton.addEventListener('click', () => {
  cardValidateForm.removeError();
  cardValidateForm.submitButtonInactivate();
  newCardFormPopup.open();
});

// навешиваем слушатель на кнопку редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  avatarValidateForm.removeError();
  avatarValidateForm.submitButtonInactivate();
  userAvatarFormPopup.open();
});

userProfileFormPopup.setEventListeners(); // навешиваем слушатели закрытия попапа
imagePopup.setEventListeners(); // навешиваем слушатели закрытия попапа
newCardFormPopup.setEventListeners(); // навешиваем слушатели закрытия попапа
userAvatarFormPopup.setEventListeners(); // навешиваем слушатели закрытия попапа
confirmRemoveCardPopup.setEventListeners(); // навешиваем слушатели закрытия попапа

avatarValidateForm.enableValidation();
cardValidateForm.enableValidation();
profileValidateForm.enableValidation();