import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export type TopMenuItem = 'Гуртки' | 'Челендж' | 'Новини' | 'Про нас' | 'Послуги українською';

const MENU_HREF: Record<TopMenuItem, string> = {
  Гуртки: '/clubs',
  Челендж: '/challenge',
  Новини: '/news',
  'Про нас': '/about',
  'Послуги українською': '/service',
};

export class TopMenu extends BaseComponent {
  private readonly navMenu: Locator;

  constructor(page: Page) {
    super(page, page.locator('header .center-side ul.ant-menu.nav-menu'));
    this.navMenu = this.root;
  }

  async navigateTo(item: TopMenuItem): Promise<void> {
    await this.page.getByRole('link', { name: item, exact: true }).click();
  }

  getMenuLink(item: TopMenuItem): Locator {
    return this.page.locator(`header a[href="${MENU_HREF[item]}"]`);
  }
}
