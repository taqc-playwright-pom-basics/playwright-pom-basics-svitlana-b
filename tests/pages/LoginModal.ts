import { BaseComponent } from "./base/BaseComponent";
import { type Locator } from "@playwright/test";
import { type Page } from "@playwright/test";

export class LoginModal extends BaseComponent {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly modalTitle: Locator;
  private readonly text: Locator;
  private readonly googleLoginButton: Locator;
  private readonly facebookLoginButton: Locator;
  private readonly forgotPasswordButton: Locator;
  private readonly errorMessage: Locator;
  //private readonly closeButton: Locator;
  constructor(page: Page) {
    super(page, page.locator(".modal-login"));
    this.emailInput = this.root.locator("#basic_email");
    this.passwordInput = this.root.locator("#basic_password");
    this.loginButton = this.root.getByRole("button", {
      name: "Увійти",
      exact: true,
    });
    this.modalTitle = this.root.getByText('Вхід');
    this.text = this.root.getByText("Раді вас бачити знову на платформі");
    this.googleLoginButton = this.root.getByRole('link', { name: 'Logo' }).first();
    this.facebookLoginButton = this.root.getByRole('link', { name: 'Logo' }).nth(1);
    this.forgotPasswordButton = this.root.getByRole("link", {
      name: "Забули пароль?",
      exact: true,
    });
    this.errorMessage = this.root.locator(".ant-form-item-explain-error");
    //this.closeButton = this.root.getByRole('button', { name: 'Закрити', exact: true });
  }
  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: "visible" });
  }
  async waitForClose(): Promise<void> {
    await this.root.waitFor({ state: "hidden" });
  }
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
  getEmailInput(): Locator {
    return this.emailInput;
  }
  getPasswordInput(): Locator {
    return this.passwordInput;
  }
  getLoginButton(): Locator {
    return this.loginButton;
  }
  getModalTitle(): Locator {
    return this.modalTitle;
  }
  getText(): Locator {
    return this.text;
  }
  getGoogleLoginButton(): Locator {
    return this.googleLoginButton;
  }
  getFacebookLoginButton(): Locator {
    return this.facebookLoginButton;
  }
  getForgotPasswordButton(): Locator {
    return this.forgotPasswordButton;
  }
  getErrorMessage(): Locator {
    return this.errorMessage;
  }
  // getCloseButton(): Locator {
  // return this.closeButton;
  // }
  getModalLocator(): Locator {
    return this.root;
  }
}
