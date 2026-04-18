import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function dismissCookieBanner(page) {
  const bannerButton = page.getByRole('button', { name: /accept all|прийняти все/i }).first();
  if (await bannerButton.isVisible().catch(() => false)) {
    await bannerButton.click();
  }
}

test('home page loads and has heading', async ({ page }) => {
  await page.goto('/?e2e=1');
  await dismissCookieBanner(page);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('language switcher changes content', async ({ page }) => {
  await page.goto('/?e2e=1');
  await dismissCookieBanner(page);

  await page.getByText(/^uk$/i).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Допомагаю');

  await page.getByText(/^en$/i).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I help you');
});

test('contact form validates and shows success with stub', async ({ page }) => {
  await page.goto('/?e2e=1');
  await dismissCookieBanner(page);
  await page.getByText(/^en$/i).first().click();

  const form = page.locator('#contact form');
  await form.scrollIntoViewIfNeeded();

  await form.locator('button[type="submit"]').click();
  await expect(form.getByText(/name must be at least 2 characters/i)).toBeVisible();

  await form.locator('input[name="name"]').fill('Test User');
  await form.locator('input[name="contact"]').fill('test@example.com');
  await form
    .locator('textarea[name="message"]')
    .fill('This is a valid request message for stub testing.');
  await form.locator('input[name="consent"]').check();

  await form.locator('button[type="submit"]').click();
  await expect(form.getByText(/data was not saved yet/i)).toBeVisible();
});

test('has no obvious a11y violations', async ({ page }) => {
  await page.goto('/?e2e=1');
  await dismissCookieBanner(page);
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
