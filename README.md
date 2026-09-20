# Домашнє завдання: Page Object — basics

> Сайт: Docker `http://localhost/` (або azure `.../dev/` — див. `playwright.config.ts`)
> Тема: базовий Page Object (успадкування)

---

## Що вже є в проєкті (готовий приклад)

**Фундамент (ієрархія успадкування):**

- `tests/pages/base/` — `BaseComponent` → `BaseAppPage` → `SearchablePage` → `PaginatedListPage`
- `tests/components/layout/` — `Header`, `TopMenu`, `Footer`
- `tests/components/dropdowns/CityDropdown.ts`
- `tests/config/app.config.ts`

**Клуби (еталон POM):**

- `ClubsPage`, `ClubDetailPage`
- тести `clubs.spec.ts`, `club-detail.spec.ts` — уже на POM

У тестах сторінки створюють так:

```ts
const clubsPage = new ClubsPage(page);
```

---

## Важливо про реєстрацію / авторизацію

Окремих сторінок `/login` і `/register` **немає** (це SPA-404).  
Реальний auth — **модалки** на головній:

1. У хедері `.user-profile` → «Увійти» / «Зареєструватися»
2. «Увійти» відкриває `.modal-login` (заголовок «Вхід», email/пароль, Google/Facebook)
3. «Зареєструватися» відкриває `.modal-registration` (роль Відвідувач/Керівник, поля форми)
4. Кнопка «Додати гурток» для guest також відкриває `.modal-login`

Не орієнтуйтесь на URL `login` / `register` — форми живуть у модалках.

---

## Що треба зробити

### 1. Методи профілю

У `Header` (або в `HomePage` / `BaseAppPage` через успадкування) додати:

- відкриття меню (`.user-profile`)
- клік «Увійти» / «Зареєструватися»

Окремий Component Object **не обовʼязковий**.

### 2. Додати page objects

- `tests/pages/HomePage.ts` — головна, «Додати гурток», навігація, відкриття auth-меню
- `tests/pages/LoginModal.ts` (або методи на `HomePage`) — модалка `.modal-login`
- `tests/pages/RegistrationModal.ts` (або методи на `HomePage`) — модалка `.modal-registration`

Орієнтуйтесь на стиль `ClubsPage` (клас + `extends` + `new ... (page)` у тесті).

### 3. Переписати тести auth під POM

Файл `tests/home-auth.spec.ts` зараз на **сирих локаторах**.  
Перепишіть під POM сценарії:

1. У меню профілю видно «Увійти» і «Зареєструватися»
2. «Увійти» → модалка входу (заголовок, email/пароль, соц. кнопки)
3. «Зареєструватися» → модалка реєстрації (ролі, поля; кнопка submit disabled)
4. «Додати гурток» (guest) → модалка входу
5. Порожній submit логіну → помилки валідації
6. Головна: «Додати гурток» видно + перехід у «Гуртки»

```ts
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginModal } from './pages/LoginModal';
import { RegistrationModal } from './pages/RegistrationModal';

test('...', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginModal = new LoginModal(page);
  // ...
});
```

---

## Definition of Done

- [ ] Методи профілю відкривають меню і пункти «Увійти» / «Зареєструватися»
- [ ] Є `HomePage` і page objects для login / registration модалок
- [ ] `home-auth.spec.ts` переписаний під POM (модалки, не 404-роути)
- [ ] Немає «сирих» локаторів у тестах
- [ ] Сторінки створюються через `new ...Page(page)`, без кастомних фікстур
- [ ] `npx tsc --noEmit` без помилок
- [ ] `npx playwright test` — тести зелені

---

## Підказки

- Ланцюг: `BaseComponent → BaseAppPage → SearchablePage → PaginatedListPage`
- `HomePage` логічно наслідує `SearchablePage`
- Модалки зручно наслідувати від `BaseComponent` з `root = page.locator('.modal-login')` / `.modal-registration`
- Dropdown Ant Design у порталі: `menuitem` шукайте на `page`, не всередині `header`
- Приклад успадкування: `ClubsPage` + `clubs.spec.ts`
