import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class ClubSearch extends BaseComponent {
  public readonly PLACEHOLDER = 'Який гурток шукаєте?' as const;

  private readonly searchInput: Locator;
  private readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder(this.PLACEHOLDER);
    this.loadingIndicator = page.locator('.ant-select-loading');
  }

  async waitForSearchReady(): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.loadingIndicator.waitFor({ state: 'hidden' }).catch(() => undefined);
  }

  async searchClub(query: string): Promise<void> {
    await this.waitForSearchReady();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async getPlaceholderText(): Promise<string | null> {
    return this.searchInput.getAttribute('placeholder');
  }
}
