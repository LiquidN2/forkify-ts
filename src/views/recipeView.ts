import Fraction from 'fraction.js';
import { type Recipe } from '../model';
import { getRecipeIdFromURL } from '../utils';
import View from './View';

class RecipeView extends View {
  protected data: Recipe | undefined = undefined;

  protected errorMessage: string = 'Unable to find recipe. Please try again';

  protected message: string =
    'Start by searching for a recipe or an ingredient. Have fun!';

  protected parentElement = document.querySelector('.recipe') as HTMLDivElement;

  addHandlerBookmark(handler: (recipe: Recipe | undefined) => any): void {
    this.parentElement.addEventListener('click', e => {
      const btnBookmark = (e.target as HTMLElement).closest(
        '.btn--bookmark'
      ) as HTMLElement;
      if (!btnBookmark) return;

      const { isBookmarked } = handler(this.data);

      const useElement = btnBookmark.querySelector('use');
      if (!useElement) return;
      useElement.setAttribute(
        'href',
        `${RecipeView.iconsSVG}#icon-bookmark${isBookmarked ? '-fill' : ''}`
      );
    });
  }

  addHandlerFetchRecipe(handler: (recipeId: string) => Promise<void>): void {
    ['load', 'hashchange'].forEach(eventType => {
      window.addEventListener(eventType, e => {
        const recipeId = getRecipeIdFromURL(e) || '';
        handler(recipeId);
      });
    });
  }

  addHandlerUpdateServings(handler: (type: 'increase' | 'decrease') => void) {
    this.parentElement.addEventListener('click', e => {
      const btnIncrease = (e.target as HTMLElement).closest(
        '.btn--increase-servings'
      ) as HTMLButtonElement;

      const btnDecrease = (e.target as HTMLElement).closest(
        '.btn--decrease-servings'
      ) as HTMLButtonElement;

      if (btnIncrease) {
        handler('increase');
        return;
      }

      if (btnDecrease) {
        handler('decrease');
        return;
      }
    });
  }

  protected generateMarkup(): string {
    if (!this.data) return '';

    const {
      id,
      title,
      publisher,
      image_url,
      cooking_time,
      servings,
      ingredients,
      source_url,
      isBookmarked,
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
            <use href="${RecipeView.iconsSVG}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${RecipeView.iconsSVG}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--decrease-servings">
              <svg>
                <use href="${RecipeView.iconsSVG}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${RecipeView.iconsSVG}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${RecipeView.iconsSVG}#icon-user"></use>
          </svg>
        </div>

        <button class="btn--round btn--bookmark" data-id="${id}">
          <svg class="">
            <use href="${RecipeView.iconsSVG}#icon-bookmark${
      isBookmarked ? '-fill' : ''
    }"></use>
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
                    <use href="${RecipeView.iconsSVG}#icon-check"></use>
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
            <use href="${RecipeView.iconsSVG}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    return markup;
  }
}

export default new RecipeView();
