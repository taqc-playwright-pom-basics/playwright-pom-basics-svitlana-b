import { test, expect } from '@playwright/test';
import { ClubDetailPage } from './pages/ClubDetailPage';
import { ClubsPage } from './pages/ClubsPage';

test.describe('Club detail (POM)', () => {
  test('Opens club details from catalog card', async ({ page }) => {
    const clubsPage = new ClubsPage(page);
    const clubDetailPage = new ClubDetailPage(page);

    await clubsPage.gotoClubsPage();
    await clubsPage.waitForClubsLoaded();

    const americanGymnastics = clubsPage.getClubList().getCardByName('American Gymnastics');
    await americanGymnastics.openDetails();

    await expect(clubDetailPage.getClubNameLocator()).toHaveText('American Gymnastics Club');
    await expect(clubDetailPage.getEnrollButton()).toBeDisabled();
  });
});
