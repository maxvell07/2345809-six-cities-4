import { test, expect } from '@playwright/test';

test('Работоспособность сортировки по ценам', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cities__card');

  const pricesBeforeSorting = await page
    .locator('place-card__price-value')
    .allTextContents();

  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');
  await page.waitForSelector('.cities__card');

  const pricesAfterSortingUp = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesAfterSortingUp.length - 1; i++) {
    expect(pricesAfterSortingUp[i + 1]).toBeGreaterThanOrEqual(
      pricesAfterSortingUp[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');
  await page.waitForSelector('.cities__card');

  const pricesAfterSortingDown = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesAfterSortingDown.length - 1; i++) {
    expect(pricesAfterSortingDown[i + 1]).toBeLessThanOrEqual(
      pricesAfterSortingDown[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Popular"');

  await page.waitForSelector('.cities__card');

  const pricesAfterSorting = await page
    .locator('place-card__price-value')
    .allTextContents();

  for (let i = 0; i < pricesAfterSorting.length; i++) {
    pricesAfterSorting[i] === pricesBeforeSorting[i];
  }
});
