import { state, loadRecipe } from './model';
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe') as HTMLDivElement;

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const API_KEY: string = import.meta.env.VITE_FORKIFY_API_KEY;

const renderSpinner = (parentElement: HTMLElement): void => {
  const spinnerMarkup = /* html */ `
    <div class="spinner">
      <svg>
        <use href="src/img/icons.svg#icon-loader"></use>
      </svg>
    </div>
  `;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
};

const showRecipe = async (recipeId: string) => {
  try {
    recipeView.renderSpinner();

    await loadRecipe(recipeId);

    if (!state.recipe) {
      throw new Error(`Recipe id ${recipeContainer} not found.`);
    }

    recipeView.render(state.recipe);
  } catch (error: any) {
    alert(error);
  }
};

const hashChangeHandler = (e: Event) => {
  if (!e.currentTarget) return;
  const id = (e.currentTarget as Window).location.hash.slice(1);
  if (!id) return;
  showRecipe(id);
};

['load', 'hashchange'].forEach(eventType => {
  if (eventType === 'load') {
    window.removeEventListener(eventType, hashChangeHandler);
  }
  window.addEventListener(eventType, hashChangeHandler);
});

window.removeEventListener('close', hashChangeHandler);
