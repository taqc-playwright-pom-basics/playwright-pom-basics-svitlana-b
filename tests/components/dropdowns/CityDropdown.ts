import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class CityDropdown extends BaseComponent {
  private readonly trigger: Locator;

  constructor(page: Page) {
    super(page, page.locator('header'));
    this.trigger = this.root.locator('.city');
  }

  async open(): Promise<void> {
    await this.trigger.click();
  }

  async selectCity(cityName: string): Promise<void> {
    await this.open();
    await this.page.getByRole('menuitem', { name: cityName, exact: true }).click();
  }

  async getCurrentCityText(): Promise<string> {
    return (await this.trigger.innerText()).trim();
  }
}
