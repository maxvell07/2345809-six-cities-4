import { test, expect } from '@playwright/test';

test('Работоспособность перехода по карточкам', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.cities__card');

  const firstCardName = await page
    .locator('.place-card__name')
    .first()
    .textContent();
  const firstCardPrice = await page
    .locator('.place-card__price-value')
    .first()
    .textContent();

  await page.locator('.place-card__name').first().click();

  await page.waitForSelector('.offer__inside-list');

  const cardPageName = await page.locator('.offer__name').textContent();
  const cardPagePrice = await page
    .locator('.offer__price-value')
    .textContent();

  expect(cardPageName).toBe(firstCardName);
  expect(cardPagePrice).toBe(firstCardPrice);

  const offerDetails = await page.locator('.offer__inside-item').all();
  expect(offerDetails.length).toBeGreaterThan(0);
});
