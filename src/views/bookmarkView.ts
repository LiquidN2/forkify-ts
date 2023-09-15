import { type Recipe } from '../model';

import PreviewRecipe from './previewRecipeView';

class BookmarkView extends PreviewRecipe {
  protected data: Partial<Recipe>[] | undefined = undefined;

  protected errorMessage: string = 'Oops. Something went wrong!';

  protected message: string =
    'No bookmark yet. Find a nice recipe and save it!';

  protected parentElement = document.querySelector(
    '.bookmarks ul.bookmarks__list'
  ) as HTMLDivElement;

  constructor() {
    super();
    this.renderMessage();
  }
}

export default new BookmarkView();
