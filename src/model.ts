import { client } from './client';

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

interface State {
  recipe: Recipe | undefined;
}

export const state: State = {
  recipe: undefined,
};

export const loadRecipe = async (recipeId: string) => {
  try {
    const response = await client.get(`/recipes/${recipeId}`);
    const recipe: Recipe = response.data.data.recipe;
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
