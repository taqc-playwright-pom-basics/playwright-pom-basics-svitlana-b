import { type Page } from '@playwright/test';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import type { TopMenuItem } from '../../components/layout/TopMenu';
import { ROUTES } from '../../config/app.config';
import { BaseComponent } from './BaseComponent';

export abstract class BaseAppPage extends BaseComponent {
  protected readonly header: Header;
  protected readonly footer: Footer;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async open(path: string = ROUTES.home): Promise<void> {
    const url = path ? `./${path}` : './';
    await this.page.goto(url);
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.page.locator('header.ant-layout-header').waitFor({ state: 'visible' });
    await this.page.locator('footer.ant-layout-footer').waitFor({ state: 'visible' });
  }

  async navigateViaTopMenu(item: TopMenuItem): Promise<void> {
    await this.header.navigateViaTopMenu(item);
  }

  async selectCity(cityName: string): Promise<void> {
    await this.header.selectCity(cityName);
  }

  async clickLogo(): Promise<void> {
    await this.header.clickLogo();
  }
}
