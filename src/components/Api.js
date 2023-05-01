class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });