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
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1575297274481-1273a176f028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  }
];

////////////////////////////////////////////////////////////////////////////////////

// popup и формы на странице
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
const popupScaleImage = document.querySelector('.popup_scale-image');
const formProfile = document.querySelector('.form_profile');
const formElements = document.querySelector('.form_elements');
const elementsGallery = document.querySelector('.elements__gallery');
// данные профиля на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// поля form
const formName = document.querySelector('.form__item_el_name');
const formProfession = document.querySelector('.form__item_el_profession');
const formHeading = document.querySelector('.form__item_el_heading');
const formImage = document.querySelector('.form__item_el_image');
// кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// image
const openedImage = document.querySelector('.scale-image__image');
const figcaption = document.querySelector('.scale-image__figcaption');

////////////////////////////////////////////////////////////////////////////////////

// открыть popup
function openPopup(evt) {
  evt.classList.add('popup_opened');
}

////////////////////////////////////////////////////////////////////////////////////

// popup добавить карточку
profileAddButton.addEventListener('click', function () {
  formElements.reset();
  openPopup(popupElements);
});

////////////////////////////////////////////////////////////////////////////////////

// popup редактировать профиль
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  formName.value = profileName.textContent; // перенести данные со страницы в форму
  formProfession.value = profileProfession.textContent; // same
  // all <input> have property .value to read entered text
});

////////////////////////////////////////////////////////////////////////////////////

// перенос данных фотографии в попап
function scaleImage(name, link) {
  openedImage.setAttribute('src', link);
  openedImage.setAttribute('alt', name);
  figcaption.textContent = name;
};

////////////////////////////////////////////////////////////////////////////////////

// создание карточки из template
function insertCard(card) {
  const cardTemplate = document.querySelector('.card-template').content.cloneNode(true);
  const cardImage = cardTemplate.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardImage.addEventListener('click', function () {
    scaleImage(card.name, card.link);
    openPopup(popupScaleImage);
  });
  const cardHeading = cardTemplate.querySelector('.elements__heading');
  cardHeading.textContent = card.name;
  cardTemplate.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  cardTemplate.querySelector('.elements__remove-item').addEventListener('click', function (evt) {
    const cardParent = evt.target.closest('.elements__item');
    cardParent.remove();
  });
  elementsGallery.prepend(cardTemplate);
};
//append add node to the end of list
//prepend add node to the beginning of list
//before add node before the list
//after add node after the list
//replaceWith replace node

////////////////////////////////////////////////////////////////////////////////////

// вставить карточку в галерею из сохранённого списка
cards.forEach(function (card) {
  insertCard(card);
});

////////////////////////////////////////////////////////////////////////////////////

// добавить карточку в список и вставить на страницу
function addNewCard(heading, link) {
  const newCard = {};
  newCard.name = heading;
  newCard.link = link;
  cards.push(newCard);
  insertCard(newCard);
};

////////////////////////////////////////////////////////////////////////////////////

// создать новую карточку через popup
function handleElementSubmit(evt) {
  evt.preventDefault();
  addNewCard(formHeading.value, formImage.value);
  closePopup(popupElements);
};

////////////////////////////////////////////////////////////////////////////////////

// закрыть popup
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

popupScaleImage.addEventListener('click', function (evt) {
  if (evt.target.closest('.popup__close-button')) {
    closePopup(popupScaleImage);
  }
});

////////////////////////////////////////////////////////////////////////////////////

// сохранить данные из формы Профиль на странице
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopup(popupProfile);
};

////////////////////////////////////////////////////////////////////////////////////

formProfile.addEventListener('submit', handleFormSubmit);
formElements.addEventListener('submit', handleElementSubmit);
