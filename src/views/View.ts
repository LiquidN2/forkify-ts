import iconsSvg from '../img/icons.svg';

export default abstract class View {
  protected abstract data: any;

  protected abstract errorMessage: string;

  protected abstract message: string;

  protected abstract parentElement:
    | HTMLDivElement
    | HTMLUListElement
    | HTMLFormElement
    | undefined;

  constructor() {}

  protected clearHTMLContent(): void {
    if (!this.parentElement) return;
    this.parentElement.innerHTML = '';
  }

  protected abstract generateMarkup(data?: any): string;

  static get iconsSVG() {
    return iconsSvg;
  }

  render(data: any): void {
    if (!this.parentElement) return;
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }

    this.data = data;
    this.clearHTMLContent();
    const markup = this.generateMarkup();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMessage: string = this.errorMessage): void {
    if (!this.parentElement) return;
    this.clearHTMLContent();
    const errorMarkup = /*html*/ `
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderMessage(message: string = this.message): void {
    if (!this.parentElement) return;
    this.clearHTMLContent();
    const messageMarkup = /*html*/ `
      <div class="message">
        <div>
          <svg>
            <use href="${View.iconsSVG}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', messageMarkup);
  }

  renderSpinner(): void {
    if (!this.parentElement) return;
    this.clearHTMLContent();
    const spinnerMarkup = /* html */ `
      <div class="spinner">
        <svg>
          <use href="${View.iconsSVG}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  update(data: any): void {
    if (!this.parentElement) return;
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }

    this.data = data;
    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    const currentElements = this.parentElement.querySelectorAll('*');

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      // Update TEXT
      if (
        !newElement.isEqualNode(currentElement) &&
        (newElement.firstChild as ChildNode).nodeValue?.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      // Update ATTRIBUTES
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attr => {
          currentElement.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}
