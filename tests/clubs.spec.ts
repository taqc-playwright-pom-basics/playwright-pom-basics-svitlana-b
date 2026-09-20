import { test, expect } from '@playwright/test';
import { ClubsPage } from './pages/ClubsPage';

test.describe('Clubs catalog (POM)', () => {
  test('Has club Dream Team and American Gymnastics in Kyiv', async ({ page }) => {
    const clubsPage = new ClubsPage(page);

    await clubsPage.gotoClubsPage();
    await clubsPage.waitForClubsLoaded();

    const clubList = clubsPage.getClubList();

    await expect(clubList.getClubByText('Школа танців Dream Team')).toBeVisible();

    const firstClub = clubList.getFirstCard();
    await expect(firstClub.getNameLocator()).toHaveText('American Gymnastics Club');
  });

  test('Has club New Cadre in Kharkiv', async ({ page }) => {
    const clubsPage = new ClubsPage(page);

    await clubsPage.gotoClubsPage();
    await clubsPage.selectCity('Харків');
    await clubsPage.waitForClubsLoaded();

    await expect(clubsPage.getPageTitleLocator()).toHaveText(ClubsPage.clubsTitleForCity('Харків'));

    const firstClub = clubsPage.getClubList().getFirstCard();
    await expect(firstClub.getNameLocator()).toHaveText('Новий Кадр');
  });
});
