import { type Locator, type Page } from '@playwright/test';
import { ClubCard } from '../components/clubs/ClubCard';
import { SearchablePage } from './base/SearchablePage';

export class ClubDetailPage extends SearchablePage {
  public readonly WRITE_MANAGER_LABEL = 'Написати менеджеру' as const;
  public readonly ENROLL_LABEL = 'Записатись на гурток' as const;
  public readonly DOWNLOAD_LABEL = 'Завантажити' as const;

  private readonly clubName: Locator;
  private readonly tags: Locator;
  private readonly rating: Locator;
  private readonly writeManagerButton: Locator;
  private readonly enrollButton: Locator;
  private readonly downloadButton: Locator;
  private readonly addressBlock: Locator;
  private readonly similarClubsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.clubName = page.locator('.club-name');
    this.tags = page.locator('.tags .ant-tag');
    this.rating = page.locator('.page-rating .ant-rate');
    this.writeManagerButton = page.getByRole('button', {
      name: this.WRITE_MANAGER_LABEL,
      exact: true,
    });
    this.enrollButton = page.getByRole('button', {
      name: this.ENROLL_LABEL,
      exact: true,
    });
    this.downloadButton = page.getByRole('button', {
      name: this.DOWNLOAD_LABEL,
      exact: true,
    });
    this.addressBlock = page.locator('.address');
    this.similarClubsSection = page.locator('.similar-clubs');
  }

  async gotoClubDetailPage(clubId: number | string): Promise<void> {
    await this.open(`club/${clubId}`);
  }

  async getClubNameText(): Promise<string> {
    return (await this.clubName.innerText()).trim();
  }

  getSimilarClubByName(clubName: string): ClubCard {
    const cardRoot = this.similarClubsSection.locator('.card').filter({ hasText: clubName });
    return new ClubCard(this.page, cardRoot);
  }

  getClubNameLocator(): Locator {
    return this.clubName;
  }

  getEnrollButton(): Locator {
    return this.enrollButton;
  }

  getAddressBlock(): Locator {
    return this.addressBlock;
  }
}
