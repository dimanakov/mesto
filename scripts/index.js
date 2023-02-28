const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// popup и форма на странице
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
const popupZoom = document.querySelector('.popup_zoom');
const formProfile = document.querySelector('.form_profile');
const formElements = document.querySelector('.form_elements');
// имя и профессия на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// поля form
const formName = document.querySelector('.form__item_el_name');
const formProfession = document.querySelector('.form__item_el_profession');
const formHeading = document.querySelector('.form__item_el_heading');
const formImage = document.querySelector('.form__item_el_image');
// кнопки
// const closeButton = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// function открыть popup_elements
function openPopupElements() { popupElements.classList.add('popup_opened') };
// открыть popup добавления карточки
profileAddButton.addEventListener('click', function () { openPopupElements() });

// function открыть popup_profile
function openPopupProfile() { popupProfile.classList.add('popup_opened') };
// открыть popup при нажатии кнопки edit
profileEditButton.addEventListener('click', function () {
  openPopupProfile();
  formName.value = profileName.textContent; // перенести данные со страницы в форму
  formProfession.value = profileProfession.textContent; // same
  // all <input> have property .value to read entered text
});

////////////////////////////////////////////////////////////////////////////////////

// вставить карточку в галерею из сохранённого списка
cards.forEach(function (card) {
  const elementsGallery = document.querySelector('.elements__gallery');
  const copyCard = document.querySelector('.card-template').content.cloneNode(true);
  const cardImage = copyCard.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  const cardHeading = copyCard.querySelector('.elements__heading');
  cardHeading.textContent = card.name;
  copyCard.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  copyCard.querySelector('.elements__remove-item').addEventListener('click', function (evt) {
    const parentCard = evt.target.closest('.elements__item');
    // const lookingHeadingCard = parentCard.querySelector('.elements__heading').textContent;
    // removeCardFromList(lookingHeadingCard);
    // console.log(lookingHeadingCard);
    parentCard.remove();
  });
  elementsGallery.prepend(copyCard);
});
//append add node to the end of list
//prepend add node to the beginning of list
//before add node before the list
//after add node after the list
//replaceWith replace node

////////////////////////////////////////////////////////////////////////////////////

// function removeCardFromList(lookingHeadingCard) {
//   const lookingCard = cards.findIndex(item => item.name == lookingHeadingCard);
//   delete cards[lookingCard];
//   console.log(cards);
// }

////////////////////////////////////////////////////////////////////////////////////

// добавить карточку в список
const cteateNewCard = function (link, heading) {
  const newCard = {};
  { name: cardNameInput.value, link: cardLinkInput.value }
  cards.unshift(newCard);
};
// вариант из Пачки
const placeName = popupInputPlace.value;
const link = popupInputLink.value;
const newCard = {
  placeName: placeName,
  link: link,
};
createCard(newCard);
blockCards.prepend(newCard);

// function добавить карточку через popup
function handleElementSubmit(evt) {
  evt.preventDefault();
  formHeading.value; // add value to cards.name
  formImage.value; // add value to cards.link
  formElements.reset();
  closePopup(popupElements);
};


////////////////////////////////////////////////////////////////////////////////////


function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

popupProfile.addEventListener('click', function (evt) {
  if (evt.target.closest('.popup__close-button')) {
    closePopup(popupProfile);
  }
});

popupElements.addEventListener('click', function (evt) {
  if (evt.target.closest('.popup__close-button')) {
    closePopup(popupElements);
  }
});

// popupZoom.addEventListener('click', function (evt) {
//   if (evt.target.closest('.popup__close-button')) {
//     closePopup(popupZoom);
//   }
// });
////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////

function handleClickImageButton(evt) {
  const popupImage = document.querySelector('.popup_zoom-image');
  const image = popupImage.querySelector('.popup__zoom-image');
  openPopup(popupImage);
  image.src = evt.src;

  const caption = popupImage.querySelector('.popup__caption');
  caption.textContent = evt.value;

  closeButton = popupImage.querySelector('.popup__close-button');
  closeButton.addEventListener('click', function () {
    closePopup(popupImage);
  })
}

////////////////////////////////////////////////////////////////////////////////////
// const closePopup = (evt) => {
//   function closePopup(popup) {
//     popup.classList.remove('popup_opened')
//   };

//   if (evt.target.closest('.popup__close-button')) {
//     closePopup(evt);
//   }
// };

// popupProfile.addEventListener('click', closePopup(popupProfile));
// popupElements.addEventListener('click', closePopup(popupElements));

////////////////////////////////////////////////////////////////////////////////////

// popup.forEach(function (addEvt) {
//   addEvt.addEventListener('click', function () {
//     popup.classList.remove('popup_opened')
//   })
// });


// popup.addEventListener('click', function (evt){
//   if (evt.target.closest('.popup__close-button')) {
//     console.log(evt.target.closest('.popup__close-button'));
//     closePopup();
//   }
// })

// closeButton.forEach((closeEvt) => {
//   console.log('closeEvt Work');
//   closeEvt.addEventListener('click', closePopup);
// });


// function закрыть popup const closePopupButton = 
// closeButton.forEach((closeButton) => {
//   closeButton.addEventListener('click', (event) => {
//     const popup = closeButton.closest('.popup_opened');
//     popup.classList.remove('popup_opened');
//   });
// });

// сохранить данные из формы на странице
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopup(popupProfile);
};

formProfile.addEventListener('submit', handleFormSubmit);
formElements.addEventListener('submit', handleElementSubmit);
