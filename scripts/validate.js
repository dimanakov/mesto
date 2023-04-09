const showInputError = (formElement, inputElement, errorMessage, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.formInputTypeError);
  formError.textContent = errorMessage;
  formError.classList.add(config.formInputErrorActive);
};

const hideInputError = (formElement, inputElement, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.formInputTypeError);
  formError.classList.remove(config.formInputErrorActive);
  formError.textContent = '';
};

//move
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};


//move
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция прервётся
    return !inputElement.validity.valid;
  })
};

const submitButtonActivate = (buttonElement, config) => {
  buttonElement.classList.remove(config.formSubmitInactive);
  buttonElement.disabled = false;
};

const submitButtonInactivate = (buttonElement, config) => {
  buttonElement.classList.add(config.formSubmitInactive);
  buttonElement.disabled = true;
};

//move
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    submitButtonInactivate(buttonElement, config);
  } else {
    submitButtonActivate(buttonElement, config);
  }
};

// move
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.formInput));
  const buttonElement = formElement.querySelector(config.formSubmit);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
};

// move
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  })
};


