import { test, expect } from '@playwright/test';

test('Работоспособность Авторизации valid/invalid', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'Malok@mail.ru');
  await page.fill('input[name="password"]', 'invalid');

  await page.click('button[type="submit"]');

  await page.waitForTimeout(2000);

  expect(page.url()).toBe('http://localhost:5173/login');
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'Malok@mail.ru');
  await page.fill('input[name="password"]', 'validpass1');


  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  expect(page.url()).toBe('http://localhost:5173/');
});
