const recipeContainer = document.querySelector('.recipe');

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const API_KEY: string = import.meta.env.VITE_FORKIFY_API_KEY;

const showRecipe = async () => {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=${API_KEY}`
    );
    const data = await res.json();

    console.log(res, data);
  } catch (error: any) {
    alert(error);
  }
};

// shoRecipe();
