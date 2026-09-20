import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class ClubCard extends BaseComponent {
  public readonly DETAILS_LINK_LABEL = 'Детальніше' as const;

  private readonly clubName: Locator;
  private readonly clubTags: Locator;
  private readonly description: Locator;
  private readonly rating: Locator;
  private readonly detailsLink: Locator;

  constructor(page: Page, cardRoot: Locator) {
    super(page, cardRoot);
    this.clubName = this.root.locator('.title > .name');
    this.clubTags = this.root.locator('.club-tags');
    this.description = this.root.locator('.description');
    this.rating = this.root.locator('.ant-rate');
    this.detailsLink = this.root.getByRole('link', {
      name: this.DETAILS_LINK_LABEL,
      exact: true,
    });
  }

  async openDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  async getClubName(): Promise<string> {
    return (await this.clubName.innerText()).trim();
  }

  getNameLocator(): Locator {
    return this.clubName;
  }

  getDetailsLink(): Locator {
    return this.detailsLink;
  }
}
