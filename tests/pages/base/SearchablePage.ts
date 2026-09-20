import { type Page } from '@playwright/test';
import { ClubSearch } from '../../components/search/ClubSearch';
import { BaseAppPage } from './BaseAppPage';

export abstract class SearchablePage extends BaseAppPage {
  protected readonly clubSearch: ClubSearch;

  constructor(page: Page) {
    super(page);
    this.clubSearch = new ClubSearch(page);
  }

  async searchClub(query: string): Promise<void> {
    await this.clubSearch.searchClub(query);
  }

  async waitForSearchReady(): Promise<void> {
    await this.clubSearch.waitForSearchReady();
  }
}
