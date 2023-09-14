import {
  state,
  loadRecipe,
  loadSearchResult,
  getResultsByPage,
  updateServings,
} from './model';

import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import searchResultsView from './views/searchResultsView';

const controlSearch = async (query: string) => {
  try {
    searchResultsView.renderSpinner();

    await loadSearchResult(query);
    if (!state.results) {
      throw new Error(`No results matching "${query}"`);
    }

    searchResultsView.render(getResultsByPage(state.results.currentPage));

    paginationView.render({
      currentPage: state.results.currentPage,
      totalPages: state.results.totalPages,
    });
    // paginationView.addEventListener();
  } catch (error: any) {
    console.log(error);
    searchResultsView.renderError(error);
  }
};

const controlPagination = (type: 'next' | 'prev') => {
  if (!state.results || !state.results.currentPage || !state.results.totalPages)
    return;

  // Update current page when clicking 'next'
  if (type === 'next') {
    if (state.results.currentPage >= state.results.totalPages) return;
    state.results.currentPage += 1;
  }

  // Update current page when clicking 'prev'
  if (type === 'prev') {
    if (state.results.currentPage <= 1) return;
    state.results.currentPage -= 1;
  }

  searchResultsView.render(getResultsByPage(state.results.currentPage));

  paginationView.render({
    currentPage: state.results.currentPage,
    totalPages: state.results.totalPages,
  });
};

const controlRecipe = async (recipeId: string) => {
  try {
    // Display initial message
    recipeView.renderMessage();

    if (!recipeId) return;

    // Render spinner
    recipeView.renderSpinner();

    // Fetch recipe and update state
    await loadRecipe(recipeId);
    if (!state.recipe) throw new Error(`Recipe not found. Please try again.`);

    // Render the recipe
    recipeView.render(state.recipe);
  } catch (error: any) {
    recipeView.renderError(error.message);
  }
};

const controlServings = (type: 'increase' | 'decrease') => {
  if (!state.recipe) return;

  if (type === 'increase') {
    updateServings(state.recipe.servings + 1);
  }

  if (type === 'decrease') {
    if (state.recipe.servings <= 1) return;
    updateServings(state.recipe.servings - 1);
  }

  recipeView.update(state.recipe);
};

// *******************************
// INIT
(async function () {
  searchView.addHandlerSearch(controlSearch);
  recipeView.addHandlerFetchRecipe(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  paginationView.addHandlerNavigate(controlPagination);
})();
