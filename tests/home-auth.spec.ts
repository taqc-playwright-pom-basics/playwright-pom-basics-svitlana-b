import { test, expect } from '@playwright/test';

/**
 * Сирі тести guest-авторизації / реєстрації (без POM).
 * Завдання: переписати під базовий POM (успадкування + `new ...Page(page)`).
 *
 * Реальна модель на http://localhost:
 * - меню `.user-profile` → «Увійти» / «Зареєструватися»
 * - відкриваються модалки `.modal-login` / `.modal-registration` (не окремі URL)
 * - «Додати гурток» для guest також відкриває модалку входу
 */
test.describe('Guest auth & registration (raw locators — rewrite to POM)', () => {
  test('Profile dropdown shows Login and Register', async ({ page }) => {
    await page.goto('./');

    await page.locator('header .user-profile').click();

    await expect(page.getByRole('menuitem', { name: 'Увійти', exact: true })).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Зареєструватися', exact: true }),
    ).toBeVisible();
  });

  test('Login menu item opens login modal', async ({ page }) => {
    await page.goto('./');

    await page.locator('header .user-profile').click();
    await page.getByRole('menuitem', { name: 'Увійти', exact: true }).click();

    const loginModal = page.locator('.modal-login');
    await expect(loginModal).toBeVisible();
    await expect(loginModal.getByRole('heading', { name: 'Вхід', exact: true })).toBeVisible();
    await expect(loginModal.getByText('Раді вас бачити знову на платформі')).toBeVisible();
    await expect(loginModal.getByRole('link', { name: 'Увійти через Google' })).toBeVisible();
    await expect(loginModal.getByRole('link', { name: 'Увійти через Facebook' })).toBeVisible();
    await expect(loginModal.locator('#basic_email')).toBeVisible();
    await expect(loginModal.locator('#basic_password')).toBeVisible();
    await expect(loginModal.getByRole('button', { name: 'Увійти', exact: true })).toBeVisible();
    await expect(loginModal.getByRole('link', { name: 'Забули пароль?' })).toBeVisible();
  });

  test('Register menu item opens registration modal', async ({ page }) => {
    await page.goto('./');

    await page.locator('header .user-profile').click();
    await page.getByRole('menuitem', { name: 'Зареєструватися', exact: true }).click();

    const registerModal = page.locator('.modal-registration');
    await expect(registerModal).toBeVisible();
    await expect(
      registerModal.getByRole('heading', { name: 'Реєстрація', exact: true }),
    ).toBeVisible();
    await expect(
      registerModal.getByText('Приєднуйтесь до ініціативи «Навчай українською»'),
    ).toBeVisible();
    await expect(registerModal.getByText('Відвідувач', { exact: true })).toBeVisible();
    await expect(registerModal.getByText('Керівник', { exact: true })).toBeVisible();
    await expect(registerModal.locator('#lastName')).toBeVisible();
    await expect(registerModal.locator('#firstName')).toBeVisible();
    await expect(registerModal.locator('#phone')).toBeVisible();
    await expect(registerModal.locator('#email')).toBeVisible();
    await expect(registerModal.locator('#password')).toBeVisible();
    await expect(registerModal.locator('#confirm')).toBeVisible();
    await expect(
      registerModal.getByRole('button', { name: 'Зареєструватися', exact: true }),
    ).toBeDisabled();
  });

  test('Add club button opens login modal for guest', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: 'Додати гурток', exact: true }).click();

    const loginModal = page.locator('.modal-login');
    await expect(loginModal).toBeVisible();
    await expect(loginModal.getByRole('heading', { name: 'Вхід', exact: true })).toBeVisible();
  });

  test('Login modal shows validation errors on empty submit', async ({ page }) => {
    await page.goto('./');

    await page.locator('header .user-profile').click();
    await page.getByRole('menuitem', { name: 'Увійти', exact: true }).click();

    const loginModal = page.locator('.modal-login');
    await loginModal.getByRole('button', { name: 'Увійти', exact: true }).click();

    // Ant Design інколи тримає explain-error у DOM без "visible" для Playwright —
    // достатньо перевірити текст помилок у формі.
    await expect(loginModal.locator('.ant-form-item-explain-error')).toHaveText([
      'Please enter Емейл',
      'Please enter Пароль',
    ]);
  });

  test('Home page has Add club button and navigates to clubs via menu', async ({ page }) => {
    await page.goto('./');

    await expect(page.getByRole('button', { name: 'Додати гурток', exact: true })).toBeVisible();

    await page.getByRole('link', { name: 'Гуртки', exact: true }).click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Гуртки в місті');
  });
});
