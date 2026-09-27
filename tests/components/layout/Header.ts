import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { CityDropdown } from '../dropdowns/CityDropdown';
import { TopMenu, type TopMenuItem } from './TopMenu';

/**
 * TODO (студент): додати локатори/методи для guest-профілю в хедері
 * (`.user-profile` → «Увійти» / «Зареєструватися» → модалки auth).
 * Не треба окремого Component Object і кастомних фікстур — методи прямо тут
 * або в HomePage / BaseAppPage через успадкування.
 */

export class Header extends BaseComponent {
  private readonly logoLink: Locator;
  private readonly topMenu: TopMenu;
  private readonly cityDropdown: CityDropdown;
  private readonly userProfile: Locator;
  

  constructor(page: Page) {
    super(page, page.locator('header.ant-layout-header'));
    this.logoLink = page.locator('header .left-side-menu a').first();
    this.userProfile = page.locator(".user-profile")
    
    this.topMenu = new TopMenu(page);
    this.cityDropdown = new CityDropdown(page);
  }

  async clickUserProfile(): Promise<void> {
    await this.userProfile.click();
  }

  async clickSelectRegisterProfile(): Promise<void> {
    await this.clickUserProfile();
    await this.page.getByRole('menuitem', { name: 'Зареєструватися', exact: true }).click();
  }

  async clickSelectLoginProfile(): Promise<void> {
    await this.clickUserProfile();
    await this.page.getByRole('menuitem', { name: 'Увійти', exact: true }).click();
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async navigateViaTopMenu(item: TopMenuItem): Promise<void> {
    await this.topMenu.navigateTo(item);
  }

  async selectCity(cityName: string): Promise<void> {
    await this.cityDropdown.selectCity(cityName);
  }

  getCityDropdown(): CityDropdown {
    return this.cityDropdown;
  }

}
