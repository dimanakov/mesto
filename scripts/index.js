let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

// имя и профессия на странице
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

// имя и профессия в <input> popup
let profileNameForm = document.querySelector('.profileNameForm')
let profileProfessionForm = document.querySelector('.profileProfessionForm');

// открыть popup по нажатию на кнопку edit
profileEditButton.addEventListener('click', function () {
  popup.classList.toggle('popup_hidden');
  // перенести данные со страницы в форму
  profileNameForm.value = profileName.textContent;
  profileProfessionForm.value = profileProfession.textContent});

// закрыть popup без сохранения
function closeButtonEvent(){popup.classList.toggle('popup_hidden')}
closeButton.addEventListener('click', closeButtonEvent);

// кнопка сохранить изменения в профиле
let buttonSubmit = document.querySelector('.popup__submit-button');

// сохранить данные из формы на странице
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameForm.value;
  profileProfession.textContent = profileProfessionForm.value;
  closeButtonEvent();}

// сохранить popup редактирование профиля
buttonSubmit.addEventListener('click', handleFormSubmit);
