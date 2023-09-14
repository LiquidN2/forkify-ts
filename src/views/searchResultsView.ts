import { type Recipe } from '../model';
import { getRecipeIdFromURL } from '../utils';
import iconsSvg from '../img/icons.svg';

import View from './View';

class SearchResultsView extends View {
  protected data: Partial<Recipe>[] | undefined = undefined;

  protected errorMessage: string = 'Unable to find recipe. Please try again';

  protected message: string =
    'Start by searching for a recipe or an ingredient. Have fun!';

  protected parentElement = document.querySelector(
    '.search-results ul.results'
  ) as HTMLDivElement;

  constructor() {
    super();
    window.addEventListener('hashchange', e => {
      const recipeId = getRecipeIdFromURL(e);

      const linkElems: NodeListOf<HTMLAnchorElement> =
        this.parentElement.querySelectorAll('.preview__link');

      linkElems.forEach(linkElem => {
        if (linkElem.classList.contains('preview__link--active')) {
          linkElem.classList.remove('preview__link--active');
        }

        const [_url, linkRecipeId] = linkElem.href.split('#');

        if (linkRecipeId === recipeId) {
          linkElem.classList.add('preview__link--active');
        }
      });
    });
  }

  protected generateMarkup(): string {
    if (!this.data) return '';

    return this.data
      .map(({ id, title, publisher, image_url }) => {
        return /*html */ `
          <li class="preview">
            <a class="preview__link" href="#${id}">
              <figure class="preview__fig">
                <img src="${image_url}" alt="${title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${iconsSvg}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `;
      })
      .join('');
  }
}

export default new SearchResultsView();
