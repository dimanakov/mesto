export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer; // функция создания и отрисовки данных на странице
    this._container = container; // селектор контейнера для создаваемых элементов
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(renderedItems) { // публичный метод, отвечает за отрисовку всех элементов
    this._clear();
    renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  };

  addItem = (element) => { // публичный медод, к-ый принимает DOM элемент и добавляет его в контейнер
    this._container.prepend(element);
  }
}