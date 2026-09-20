import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class Pagination extends BaseComponent {
  private readonly container: Locator;
  private readonly previousPageButton: Locator;
  private readonly nextPageButton: Locator;

  constructor(page: Page, root?: Locator) {
    super(page, root ?? page.locator('.ant-pagination'));
    this.container = this.root;
    this.previousPageButton = page.getByRole('listitem', { name: 'Previous Page' });
    this.nextPageButton = page.locator('.ant-pagination-next');
  }

  async goToNextPage(): Promise<void> {
    await this.nextPageButton.click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.previousPageButton.click();
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.container.getByRole('listitem', { name: String(pageNumber), exact: true }).click();
  }

  getNextPageButton(): Locator {
    return this.nextPageButton;
  }

  getPreviousPageButton(): Locator {
    return this.previousPageButton;
  }
}
