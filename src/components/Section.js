export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data; // массив данных, к-ые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция создания и отрисовки данных на странице
    this._container = container; // селектор контейнера для создаваемых элементов
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() { // публичный метод, отвечает за отрисовку всех элементов
    this._clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem = (element) => { // публичный медод, к-ый принимает DOM элемент и добавляет его в контейнер
    this._container.prepend(element);
  }
}