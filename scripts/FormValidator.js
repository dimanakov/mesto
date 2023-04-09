export default class FormValidator {
  constructor(configItems, formElement) {
    this._config = configItems;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.formInput));
    this._buttonElement = this._form.querySelector(this._config.formSubmit);
  }

  _showInputError(formElement, inputElement, errorMessage, config) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.formInputTypeError);
    formError.textContent = errorMessage;
    formError.classList.add(config.formInputErrorActive);
  };

  _hideInputError(formElement, inputElement, config) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.formInputTypeError);
    formError.classList.remove(config.formInputErrorActive);
    formError.textContent = '';
  };

  _isValid(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  };

  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция прервётся
      return !inputElement.validity.valid;
    })
  };

  _submitButtonActivate(buttonElement, config) {
    buttonElement.classList.remove(config.formSubmitInactive);
    buttonElement.disabled = false;
  };

  _submitButtonInactivate(buttonElement, config) {
    buttonElement.classList.add(config.formSubmitInactive);
    buttonElement.disabled = true;
  };

  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButtonInactivate(buttonElement, config);
    } else {
      this._submitButtonActivate(buttonElement, config);
    }
  };

  _setEventListeners(formElement, config) {
    this._toggleButtonState(this._inputList, this._buttonElement, config);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, config);
        this._toggleButtonState(this._inputList, this._buttonElement, config);
      })
    })
  };

  renderForm() {
    this._submitButtonInactivate(this._buttonElement, this._config);
  };

  enableValidation() {
    this._setEventListeners(this._form, this._config);
  };
}