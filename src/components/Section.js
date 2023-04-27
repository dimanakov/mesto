export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data; // массив данных, к-ые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция создания и отрисовки данных на странице
    this._container = container; // селектор контейнера для создаваемых элементов
    //this._container = document.querySelector(containerSelector);
  }

  _clear = () => {
    this._container.innerHTML = '';
  }

  renderItems = () => { // публичный метод, отвечает за отрисовку всех элементов
    this._clear();
    this._renderedItems.forEach(this._renderer);
    };

  addItem = (element) => { // публичный медод, к-ый принимает DOM элемент и добавляет его в контейнер
    this._container.prepend(element);
  }
}

// const card = isGrid
//   ? new DefaultCard(item, '.default-card')
//   : new HorizontalCard(item, '.horizontal-card');

// const cardElement = card.generateCard();

// this.setItem(cardElement);

// const insertCardPrepend = (card) => {
//   const createdCard = new Card(card, cardTemplate, openScaleImage).createCard();
//   gallery.prepend(createdCard);
// };

////////////////////////////////////////////////////////////////////////////////////

// создать объект карточки перед добавлением в галерею
// без данной функции не работает добавление новой карточки
// предлагаю отставить упразднение, иначе проект сломается

// const addNewCard = () => {
//   const newCard = {};
//   newCard.name = cardFormHeading.value;
//   newCard.link = cardFormLink.value;
//   insertCardPrepend(newCard);
// };

// cards.forEach(insertCardPrepend);