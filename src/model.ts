import { ajaxGET } from './utils';
import { SEARCH_RESULTS_PER_PAGE } from './config';

interface Ingredient {
  description: string;
  quantity: number | null;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
}

export interface SearchResults {
  recipes: Partial<Recipe>[];
  totalRecipes: number;
  currentPage: number;
  totalPages: number;
}

interface State {
  query: string;
  results: SearchResults | undefined;
  recipe: Recipe | undefined;
}

export const state: State = {
  query: '',
  results: undefined,
  recipe: undefined,
};

export const loadRecipe = async (recipeId: string) => {
  try {
    const data = await ajaxGET(recipeId);

    if (!data || !data.recipe) {
      state.recipe = undefined;
      return;
    }

    const recipe: Recipe = data.recipe;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async (query: string) => {
  try {
    if (!query.match(/^[A-Za-z]+$/)) throw new Error('Invalid request query');
    state.query = query;

    const data = await ajaxGET(`?search=${query}`);
    if (!data || !data.recipes || data.recipes.length === 0) {
      state.results = undefined;
      return;
    }

    // state.results = data.recipes;
    state.results = {
      recipes: data.recipes,
      totalRecipes: data.recipes.length,
      currentPage: 1,
      totalPages: Math.ceil(data.recipes.length / SEARCH_RESULTS_PER_PAGE),
    };

    console.log(state.results);
  } catch (error) {
    throw error;
  }
};

export const getResultsByPage = (page: number) => {
  if (!state.results) return [];

  const { recipes, totalRecipes } = state.results;

  if (totalRecipes <= SEARCH_RESULTS_PER_PAGE) return recipes;

  const startIndex = (page - 1) * SEARCH_RESULTS_PER_PAGE;
  const endIndex = page * SEARCH_RESULTS_PER_PAGE - 1;
  return endIndex + 1 >= totalRecipes
    ? recipes.slice(startIndex)
    : recipes.slice(startIndex, endIndex + 1);
};

export const updateServings = (newServings: number) => {
  if (!state.recipe) return;

  // Update Ingredients
  state.recipe.ingredients.forEach(ingredient => {
    if (ingredient.quantity && state.recipe) {
      ingredient.quantity =
        (ingredient.quantity / state.recipe.servings) * newServings;
    }
  });

  // Update servings
  state.recipe.servings = newServings;
};
