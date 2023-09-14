import View from './View';

class SearchView extends View {
  protected data = undefined;

  protected errorMessage: string = '';

  protected message: string = '';

  protected parentElement = document.querySelector(
    'form.search'
  ) as HTMLFormElement;

  addHandlerSearch(search: (query: string) => Promise<void>) {
    this.parentElement.addEventListener('submit', e => {
      e.preventDefault();

      const inputElement = (e.target as HTMLElement).querySelector(
        'input.search__field'
      ) as HTMLInputElement;
      if (!inputElement) return;

      const searchQuery = inputElement.value.trim();
      search(searchQuery);
    });
  }

  protected generateMarkup(): string {
    return '';
  }
}

export default new SearchView();
