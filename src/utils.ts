import { API_URL, SEARCH_RESULTS_PER_PAGE } from './config';
import { type Recipe } from './model';

export async function ajaxGET(url: string) {
  try {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();
    return data.data;
  } catch (error: any) {
    throw error;
  }
}

export const getRecipeIdFromURL = (e?: Event): string | undefined => {
  if (!e) return window.location.hash.slice(1);

  return e.currentTarget
    ? (e.currentTarget as Window).location.hash.slice(1)
    : undefined;
};

export const getRecipesOnPage = (
  recipes: Partial<Recipe>[],
  page: number = 1
) => {
  const totalRecipes = recipes.length;
  if (totalRecipes <= SEARCH_RESULTS_PER_PAGE) {
    return recipes;
  }

  const startIndex = (page - 1) * SEARCH_RESULTS_PER_PAGE;
  const endIndex = page * SEARCH_RESULTS_PER_PAGE - 1;
  if (endIndex + 1 >= totalRecipes) {
    return recipes.slice(startIndex);
  }

  return recipes.slice(startIndex, endIndex + 1);
};
