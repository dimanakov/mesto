let popup = document.querySelector('.popup');
let profileForm = document.querySelector('.profile-form');
// имя и профессия на странице
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
// имя и профессия в profile-form
let formName = document.querySelector('.profile-form__item_el_name')
let formProfession = document.querySelector('.profile-form__item_el_profession');

// кнопки
let profileEditButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

// открыть popup при нажатии кнопки edit
profileEditButton.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
  // перенести данные со страницы в форму
  formName.value = profileName.textContent; // all <input> have property .value
  formProfession.value = profileProfession.textContent}); // to read entered text

// закрыть popup без сохранения
function closeButtonEvent(){
  popup.classList.toggle('popup_opened')
  }
closeButton.addEventListener('click', closeButtonEvent);

// сохранить данные из формы на странице
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  closeButtonEvent();
  }
profileForm.addEventListener('submit', handleFormSubmit);
