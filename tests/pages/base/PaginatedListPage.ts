import { type Page } from '@playwright/test';
import { Pagination } from '../../components/lists/Pagination';
import { SearchablePage } from './SearchablePage';

export abstract class PaginatedListPage extends SearchablePage {
  protected readonly pagination: Pagination;

  constructor(page: Page) {
    super(page);
    this.pagination = new Pagination(page);
  }

  async goToNextPage(): Promise<void> {
    await this.pagination.goToNextPage();
  }

  async goToPreviousPage(): Promise<void> {
    await this.pagination.goToPreviousPage();
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.pagination.goToPage(pageNumber);
  }
}
