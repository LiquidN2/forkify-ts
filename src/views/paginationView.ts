import View from './View';

class PaginationView extends View {
  protected data: { currentPage: number; totalPages: number } = {
    currentPage: 0,
    totalPages: 0,
  }; // current page

  protected errorMessage: string = '';

  protected message: string = '';

  protected parentElement = document.querySelector(
    '.pagination'
  ) as HTMLDivElement;

  addHandlerNavigate(handler: (type: 'prev' | 'next') => void) {
    this.parentElement.addEventListener('click', e => {
      if (!e.target) return;
      if ((e.target as HTMLElement).closest('.pagination__btn--prev')) {
        handler('prev');
        return;
      }
      if ((e.target as HTMLElement).closest('.pagination__btn--next')) {
        handler('next');
        return;
      }
    });
  }

  protected generateMarkup(): string {
    if (this.data.totalPages <= 1) return '';

    if (this.data.currentPage <= 1) {
      return /*html*/ `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${this.data.currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${PaginationView.iconsSVG}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    if (this.data.currentPage === this.data.totalPages) {
      return /*html*/ `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${PaginationView.iconsSVG}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.data.currentPage - 1}</span>
        </button>
      `;
    }

    return /*html*/ `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${PaginationView.iconsSVG}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.data.currentPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this.data.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${PaginationView.iconsSVG}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
