import { SearchablePage } from './base/SearchablePage';
import { type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../config/app.config';

export class HomePage extends SearchablePage {
private readonly addClubButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addClubButton = page.getByRole('button', { name: 'Додати гурток', exact: true });
  }

  async gotoHomePage(): Promise<void> {
    await this.open(ROUTES.home);
  }

  async clickAddClubButton(): Promise<void> {
    await this.addClubButton.click();
  }
  getAddClubButton(): Locator {
    return this.addClubButton;
  }

  async gotoClubsPage(): Promise<void> {
    await this.navigateViaTopMenu('Гуртки');
}

async openUserProfile(): Promise<void> {
    await this.header.clickUserProfile();
}

async openLoginModal(): Promise<void> {
    await this.header.clickSelectLoginProfile();
}

async openRegisterModal(): Promise<void> {
    await this.header.clickSelectRegisterProfile();
}

}