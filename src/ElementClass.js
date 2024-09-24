class ElementClass {
  constructor(element) {
    this.element = document.createElement(element);
  }

  addClassList(classList) {
    this.element.classList += classList;
    return this;
  }

  appendChildren(children) {
    this.element.append(...children);
    return this;
  }

  addTextContent(textContent) {
    this.element.textContent = textContent;
    return this;
  }

  addId(id) {
    this.element.id = id;
    return this;
  }

  getElement = () => {
    return this.element;
  };

  addProperty({ key, value }) {
    this.element.setAttribute(key, value);
    return this;
  }

  addStyle({ key, value }) {
    this.element.style[key] = value;
    return this;
  }

  static createElementObject = (element) => {
    return new ElementClass(element);
  };
}

export default ElementClass;
