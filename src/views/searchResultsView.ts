import { type Recipe } from '../model';

import PreviewRecipe from './previewRecipeView';

class SearchResultsView extends PreviewRecipe {
  protected data: Partial<Recipe>[] | undefined = undefined;

  protected errorMessage: string = 'Unable to find recipe. Please try again';

  protected message: string = 'No search results yet.';

  protected parentElement = document.querySelector(
    '.search-results ul.results'
  ) as HTMLDivElement;

  constructor() {
    super();
    this.renderMessage();
  }
}

export default new SearchResultsView();
