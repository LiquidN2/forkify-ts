import { type Recipe } from '../model';
import { getRecipeIdFromURL } from '../utils';

import View from './View';

export default abstract class PreviewRecipe extends View {
  protected data: Partial<Recipe>[] | undefined = undefined;

  protected errorMessage: string = 'Oops, something went wrong!';

  protected message: string = '';

  protected parentElement: HTMLDivElement | HTMLUListElement | undefined =
    undefined;

  constructor() {
    super();
    window.addEventListener('hashchange', e => {
      if (!this.parentElement) return;

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

    const recipeId = getRecipeIdFromURL();

    return this.data
      .map(({ id, title, publisher, image_url }) => {
        return /*html */ `
          <li class="preview">
            <a class="preview__link ${
              recipeId === id ? 'preview__link--active' : ''
            }" href="#${id}">
              <figure class="preview__fig">
                <img src="${image_url}" alt="${title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
              </div>
            </a>
          </li>
        `;
      })
      .join('');
  }
}
