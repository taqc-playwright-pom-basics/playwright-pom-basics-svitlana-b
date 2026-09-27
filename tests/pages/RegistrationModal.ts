import { type Locator, type Page } from "@playwright/test";
import { BaseComponent } from "./base/BaseComponent";

export class RegistrationModal extends BaseComponent {
  private readonly modalTitle: Locator;
  
  private readonly visitorRoleSelect: Locator;
  private readonly managerRoleSelect: Locator;
  private readonly emailInput: Locator;
  private readonly nameInput: Locator;
  private readonly surnameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  private readonly registerWithGoogleButton: Locator;
  private readonly registerWithFacebookButton: Locator;
  //private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, page.locator(".modal-registration"));
    this.modalTitle = this.root.getByText("Реєстрація");
    this.visitorRoleSelect = this.root.getByText("Відвідувач", { exact: true });
    this.managerRoleSelect = this.root.getByText("Керівник", { exact: true });
    this.emailInput = this.root.locator('#email');
    this.nameInput = this.root.locator('#firstName');
    this.phoneInput = this.root.locator('#phone');
    this.surnameInput = this.root.locator('#lastName');
    this.passwordInput = this.root.locator('#password');
    this.confirmPasswordInput = this.root.locator('#confirm');
    this.registerButton = this.root.getByRole('button', { name: 'Зареєструватися', exact: true });
    this.registerWithGoogleButton = this.root.getByRole('button', { name: 'Зареєструватися з Google', exact: true });
    this.registerWithFacebookButton = this.root.getByRole('button', { name: 'Зареєструватися з Facebook', exact: true });
  }
  getModalLocator(): Locator {
    return this.root;
  }
  getModalTitle(): Locator {
    return this.modalTitle;
  }

  getPhoneInput(): Locator {
    return this.phoneInput;
  }
  getVisitorRoleSelect(): Locator {
    return this.visitorRoleSelect;
  }

  getManagerRoleSelect(): Locator {
    return this.managerRoleSelect;
  }
  getEmailInput(): Locator {
    return this.emailInput;
  }
  getNameInput(): Locator {
    return this.nameInput;
  }
  getSurnameInput(): Locator {
    return this.surnameInput;
  }
  getPasswordInput(): Locator {
    return this.passwordInput;
  }
  getConfirmPasswordInput(): Locator {
    return this.confirmPasswordInput;
  }
  getRegisterButton(): Locator {
    return this.registerButton;
  }
  getRegisterWithGoogleButton(): Locator {
    return this.registerWithGoogleButton;
  }
  getRegisterWithFacebookButton(): Locator {
    return this.registerWithFacebookButton;
  }
}
