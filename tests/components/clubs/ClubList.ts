import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { ClubCard } from './ClubCard';

export class ClubList extends BaseComponent {
  private readonly clubCards: Locator;

  constructor(page: Page) {
    super(page, page.locator('.content-clubs-list'));
    this.clubCards = this.root.locator('.card');
  }

  async waitForLoaded(): Promise<void> {
    await this.clubCards.first().waitFor({ state: 'visible' });
  }

  getCardByName(clubName: string): ClubCard {
    const cardRoot = this.root.locator('.card').filter({ hasText: clubName });
    return new ClubCard(this.page, cardRoot);
  }

  getFirstCard(): ClubCard {
    return new ClubCard(this.page, this.clubCards.first());
  }

  getClubByText(clubName: string): Locator {
    return this.root.getByText(clubName, { exact: true });
  }

  getCardsLocator(): Locator {
    return this.clubCards;
  }
}
