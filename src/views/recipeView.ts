import { type Recipe } from '../model';
import Fraction from 'fraction.js';

class RecipeView {
  private parentElement = document.querySelector('.recipe') as HTMLDivElement;

  private data: Recipe | undefined = undefined;

  private clearHTMLContent(): void {
    this.parentElement.innerHTML = '';
  }

  private generateMarkup(): string {
    if (!this.data) return '';

    const {
      title,
      publisher,
      image_url,
      cooking_time,
      servings,
      ingredients,
      source_url,
    } = this.data;

    const markup = /*html*/ `
      <figure class="recipe__fig">
        <img src="${image_url}" alt="${title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>

        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredients
            .map(ingredient => {
              return /* html */ `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              ${
                ingredient.quantity
                  ? /*html*/ `<div class="recipe__quantity">${new Fraction(
                      ingredient.quantity
                    ).toFraction(true)}</div>`
                  : ''
              }
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
            `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    return markup;
  }

  renderSpinner(): void {
    const spinnerMarkup = /* html */ `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;

    this.clearHTMLContent();
    this.parentElement.innerHTML = spinnerMarkup;
  }

  render(data: Recipe): void {
    this.data = data;
    this.clearHTMLContent();
    const markup = this.generateMarkup();
    this.parentElement.innerHTML = markup;
  }
}

export default new RecipeView();
