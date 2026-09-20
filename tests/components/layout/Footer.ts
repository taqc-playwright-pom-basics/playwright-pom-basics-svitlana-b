import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class Footer extends BaseComponent {
  public readonly DONATE_BUTTON_LABEL = 'Допомогти проєкту' as const;

  private readonly donateButton: Locator;
  private readonly socialBlock: Locator;
  private readonly partnersBlock: Locator;

  constructor(page: Page) {
    super(page, page.locator('footer.ant-layout-footer'));
    this.donateButton = page.getByRole('button', {
      name: this.DONATE_BUTTON_LABEL,
      exact: true,
    });
    this.socialBlock = this.root.locator('.footer-social');
    this.partnersBlock = this.root.locator('.footer-partners');
  }

  async openDonate(): Promise<void> {
    await this.donateButton.click();
  }
}
