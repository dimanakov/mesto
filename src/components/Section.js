export default class Section {
  constructor({items, renderer}, template) {
    this._items = items; // массив данных, к-ые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция создания и отрисовки данных на странице
    this._template = template; // селектор контейнера для создаваемых элементов
  }

  renderer(){ // публичный метод, отвечает за отрисовку всех элементов

  }

  addItem(){ // публичный медод, к-ый принимает DOM элемент и добавляет его в контейнер

  }
}