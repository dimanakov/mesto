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
// test
const test = () => console.log('its work');
// popup и форма на странице
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
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
const closeButton = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const elementsGallery = document.querySelector('.elements__gallery');

// function открыть popup_elements
const openPopupElements = () => { popupElements.classList.add('popup_opened') };
// открыть popup добавления карточки
profileAddButton.addEventListener('click', () => { openPopupElements() });

// function открыть popup_profile
const openPopupProfile = () => { popupProfile.classList.add('popup_opened') };
// открыть popup при нажатии кнопки edit
profileEditButton.addEventListener('click', () => {
  openPopupProfile();
  formName.value = profileName.textContent; // перенести данные со страницы в форму
  formProfession.value = profileProfession.textContent; // same
  // all <input> have property .value to read entered text
});

// вставить карточку в галерею из сохранённого списка
cards.forEach((card) => {
  const newCard = document.querySelector('.card-template').content.cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  const cardHeading = newCard.querySelector('.elements__heading');
  cardHeading.textContent = card.name;
  elementsGallery.prepend(newCard);
  //append add node to the end of list
  //prepend add node to the beginning of list
  //before add node before the list
  //after add node after the list
  //replaceWith replace node
});

// const closeTest = popup.forEach((closeEvent) => {
//   console.log(closeEvent);
//   closeEvent.classList.remove('popup_opened');
// });

// const closePopupButton = closeButton.forEach((addEvent) => {
//   console.log(addEvent);
//   addEvent.addEventListener('click', closeTest);
// });


// function закрыть popup const closePopupButton = 
closeButton.forEach((closeButton) => {
  closeButton.addEventListener('click', (event) => {
    const popup = closeButton.closest('.popup_opened');
    popup.classList.remove('popup_opened');
  });
});

// сохранить данные из формы на странице
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closePopupButton();
};

// function добавить карточку через popup
const handleElementSubmit = (evt) => {
  evt.preventDefault();
  formElements.reset();
  formHeading.value; // add value to cards.name
  formImage.value; // add value to cards.link
};

formProfile.addEventListener('submit', handleFormSubmit);
formElements.addEventListener('submit', handleElementSubmit);
