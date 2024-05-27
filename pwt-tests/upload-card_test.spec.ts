import { test, expect } from '@playwright/test';

test('Загрузка данных карточек с сервера', async ({ page }) => {

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes('/offers') && resp.status() === 200
    ),
    page.goto('http://localhost:5173')
  ]);

  await page.waitForSelector('.header__nav-link');// ...

  const cardTitles = await page.locator('.place-card__name').allInnerTexts();
  const drawnNumberOfCards = parseInt((await page.locator('.places__found').textContent())?.split(' ')[0] ?? '0');

  expect(20).toEqual(drawnNumberOfCards);
});
