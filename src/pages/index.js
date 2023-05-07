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

const fillProfileInputs = (info) => { // функиця переноса данных со страницы в форму
  profileFormName.value = info.name;
  profileFormProfession.value = info.about;
};

////////////////////////////////////////////////////////////////////////////////////

const userAvatarFormPopup = new PopupWithForm(  // создаём экземпляр попапа для аватара профиля
  {
    popup: configPopup.avatarPopup,
    handleClickSubmit: (link) => {
      (async () => {
        try {
          const avatar = await api.setUserAvatar(link);
          userInfo.setUserAvatar(avatar);
          userAvatarFormPopup.close();
        }
        catch (err) {
          console.error(`Ошибка: ${err}`);
        }
        finally {
          userAvatarFormPopup.renameSubmitButton('Сохранить');
        }
      })();
    }
  });

////////////////////////////////////////////////////////////////////////////////////

const userProfileFormPopup = new PopupWithForm(  // создаём экземпляр попапа для профиля пользователя
  {
    popup: configPopup.profilePopup,
    handleClickSubmit: (data) => {
      (async () => {
        try {
          const info = await api.setUserInfo(data);
          userInfo.setUserInfo(info);
          userProfileFormPopup.close();
        }
        catch (err) {
          console.error(`Ошибка: ${err}`);
        }
        finally {
          userProfileFormPopup.renameSubmitButton('Сохранить');
        }
      })();
    }
  });

////////////////////////////////////////////////////////////////////////////////////

const newCardFormPopup = new PopupWithForm({ // создаём экземпляр попапа создания новой карточки
  popup: configPopup.cardPopup,
  handleClickSubmit: (item) => {
    (async () => {
      try {
        const data = await api.addCard(item);
        const card = createNewCard(data);
        cardContainer.addItem(card);
        newCardFormPopup.close();
      }
      catch (err) {
        console.error(`Ошибка: ${err}`);
      }
      finally {
        newCardFormPopup.renameSubmitButton('Создать');
      }
    })();
  },
});

////////////////////////////////////////////////////////////////////////////////////

const imagePopup = new PopupWithImage(configPopup.imagePopup); // создаём экземпляр попапа для увеличенных изображений

////////////////////////////////////////////////////////////////////////////////////

const confirmRemoveCardPopup = new PopupWithConfirmation(  // создаём экземпляр попапа для удаления карточки
  {
    popup: configPopup.removeCardPopup,
  });
////////////////////////////////////////////////////////////////////////////////////

const cardContainer = new Section({ // создаем контейнер для карточек
  renderer: (item) => {
    const card = createNewCard(item);
    cardContainer.addItem(card);
  }
}, gallery);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    cardContainer.renderItems(initialCards);
    userInfo.setUserAvatar(userData);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
    console.error(err);
  });

const createNewCard = (data) => { // функция создания карточки
  const newCard = new Card({
    data, userId,
    handleCardClick: (image) => {
      imagePopup.open(image);
    },
    handleRemoveCardClick: () => {
      confirmRemoveCardPopup.open();
      confirmRemoveCardPopup.handleClickSubmit(() => {
        (async () => {
          try {
            await api.removeCard(data);
            newCard.removeCard();
            confirmRemoveCardPopup.close();
          }
          catch (err) {
            console.error(`Ошибка: ${err}`);
          }
        })();
      });
    },
    handleLikeClick: (card) => {
      (async () => {
        try {
          const res = await api.addLike(card);
          newCard.setLike();
          newCard.like(res.likes.length);
        }
        catch (err) {
          console.error(`Ошибка: ${err}`);
        }
      })();
    },
    handleRemoveLikeClick: (card) => {
      (async () => {
        try {
          const res = await api.removeLike(card);
          newCard.removeLike();
          newCard.like(res.likes.length);
        }
        catch (err) {
          console.error(`Ошибка: ${err}`);
        }
      })();
    }
  },
    cardTemplate);
  return newCard.createCard();
};

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