import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class MapModal extends BaseComponent {
  public readonly CLOSE_BUTTON_LABEL = 'Close' as const;

  private readonly closeButton: Locator;
  private readonly mapLayout: Locator;
  private readonly mapSider: Locator;
  private readonly citySelectFirst: Locator;
  private readonly citySelectSecond: Locator;

  constructor(page: Page) {
    super(page, page.locator('.ant-modal.map-modal'));
    this.closeButton = page.getByRole('button', { name: this.CLOSE_BUTTON_LABEL, exact: true });
    this.mapLayout = this.root.locator('.map-layout');
    this.mapSider = this.root.locator('.mapSider');
    this.citySelectFirst = this.root.locator('.selectCity').first();
    this.citySelectSecond = this.root.locator('.selectCity').nth(1);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  getModalLocator(): Locator {
    return this.root;
  }
}
