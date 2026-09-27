import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { LoginModal } from "./pages/LoginModal";
import { RegistrationModal } from "./pages/RegistrationModal";

test.describe("Guest auth & registration (POM)", () => {
  test("Profile dropdown shows Login and Register", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.openUserProfile();
    await expect(
      page.getByRole("menuitem", { name: "Увійти", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Зареєструватися", exact: true }),
    ).toBeVisible();
  });

  test("Register menu item opens registration modal", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.openRegisterModal();

    const registerModal = new RegistrationModal(page);
    await expect(registerModal.getModalTitle()).toBeVisible();
    await expect(registerModal.getVisitorRoleSelect()).toBeVisible();
    await expect(registerModal.getManagerRoleSelect()).toBeVisible();
    await expect(registerModal.getSurnameInput()).toBeVisible();
    await expect(registerModal.getNameInput()).toBeVisible();
    await expect(registerModal.getPhoneInput()).toBeVisible();
    await expect(registerModal.getEmailInput()).toBeVisible();
    await expect(registerModal.getPasswordInput()).toBeVisible();
    await expect(registerModal.getConfirmPasswordInput()).toBeVisible();
    //  await expect(registerModal.getRegisterWithGoogleButton()).toBeVisible();
    //  await expect(registerModal.getRegisterWithFacebookButton()).toBeVisible();
    await expect(registerModal.getRegisterButton()).toBeDisabled();
    //await expect(registerModal.getManagerRoleSelect()).toBeDisabled();
    //await expect(registerModal.getVisitorRoleSelect()).toBeEnabled();
  });

  test("Add club button opens login modal for guest", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.gotoHomePage();
    await homePage.clickAddClubButton();

    await expect(loginModal.getModalTitle()).toBeVisible();
    await expect(loginModal.getEmailInput()).toBeVisible();
    await expect(loginModal.getPasswordInput()).toBeVisible();
    await expect(loginModal.getLoginButton()).toBeVisible();
    await expect(loginModal.getForgotPasswordButton()).toBeVisible();
    await expect(loginModal.getGoogleLoginButton()).toBeVisible();
    await expect(loginModal.getFacebookLoginButton()).toBeVisible();
  });
  test("Login modal shows validation errors on empty submit", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.gotoHomePage();
    await homePage.openLoginModal();
    await loginModal.clickLoginButton();
    await expect(loginModal.getErrorMessage()).toHaveText([
      "Please enter Емейл",
      "Please enter Пароль",
    ]);
  });

  test("Home page has Add club button and navigates to clubs via menu", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();

    await expect(homePage.getAddClubButton()).toBeVisible();
    await homePage.gotoClubsPage();
    await expect(page.getByRole("heading", { level: 2 })).toContainText(
      "Гуртки в місті",
    );
  });
});
