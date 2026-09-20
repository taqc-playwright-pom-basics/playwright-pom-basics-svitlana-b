import { type Locator, type Page } from '@playwright/test';
import { ClubList } from '../components/clubs/ClubList';
import { MapModal } from '../components/clubs/MapModal';
import { ROUTES } from '../config/app.config';
import { PaginatedListPage } from './base/PaginatedListPage';

export class ClubsPage extends PaginatedListPage {
  public readonly SHOW_MAP_BUTTON_LABEL = 'Показати на мапі' as const;
  public readonly ENCOURAGE_CLUBS_BUTTON_LABEL = 'Заохотити гуртки' as const;
  public static readonly PAGE_TITLE_PREFIX = 'Гуртки в місті' as const;

  private readonly pageTitle: Locator;
  private readonly showMapButton: Locator;
  private readonly encourageClubsButton: Locator;
  private readonly clubList: ClubList;
  private readonly mapModal: MapModal;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { level: 2 });
    this.showMapButton = page.getByRole('button', {
      name: this.SHOW_MAP_BUTTON_LABEL,
      exact: true,
    });
    this.encourageClubsButton = page.getByRole('button', {
      name: this.ENCOURAGE_CLUBS_BUTTON_LABEL,
      exact: true,
    });
    this.clubList = new ClubList(page);
    this.mapModal = new MapModal(page);
  }

  static clubsTitleForCity(city: string): string {
    return `${ClubsPage.PAGE_TITLE_PREFIX} ${city}`;
  }

  async gotoClubsPage(): Promise<void> {
    await this.open(ROUTES.clubs);
  }

  async openMap(): Promise<void> {
    await this.showMapButton.click();
    await this.mapModal.waitForOpen();
  }

  async closeMap(): Promise<void> {
    await this.mapModal.close();
  }

  async waitForClubsLoaded(): Promise<void> {
    await this.clubList.waitForLoaded();
  }

  async getPageTitleText(): Promise<string> {
    return (await this.pageTitle.innerText()).trim();
  }

  getClubList(): ClubList {
    return this.clubList;
  }

  getMapModal(): MapModal {
    return this.mapModal;
  }

  getPageTitleLocator(): Locator {
    return this.pageTitle;
  }
}
