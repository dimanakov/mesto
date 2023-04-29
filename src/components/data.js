import minVodi from '../images/elements__min-vodi.jpg';

export const cards = [
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
    name: 'Минеральные воды',
    link: minVodi
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1575297274481-1273a176f028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  }
];

export const configValidatorForm = {
  form: '.form',
  formInput: '.form__input',
  formInputTypeError: 'form__input_type_error',
  formInputErrorActive: 'form__input-error_active',
  formSubmit: '.form__submit',
  formSubmitInactive: 'form__submit_inactive',
};

export const configProfile = {
  popup: '.popup_profile',
  name: '.profile__name',
  profession: '.profile__profession',
};

export const configForm = {
  profileForm: 'profile-form',
  profileFormName: '.form__input_el_name',
  profileFormProfession: '.form__input_el_profession',
  cardForm: 'card-form',
  cardFormHeading: '.form__input_el_heading',
  cardFormLink: '.form__input_el_image',
}