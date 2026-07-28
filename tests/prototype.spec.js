// End-to-end checks for the Session Indicator prototype.
// These load the real page in a browser and confirm the core pieces render.
const { test, expect } = require('@playwright/test');

test('page has the right title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Session Indicator/);
});

test('the intro pitch renders', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByText(/menu bar component that restores awareness/i)
  ).toBeVisible();
});

test('the five session states are explained', async ({ page }) => {
  await page.goto('/');
  // The "five states" section describes each state in plain text.
  await expect(page.getByText(/five states/i).first()).toBeVisible();
  await expect(page.getByText(/no active agent/i).first()).toBeVisible(); // Idle
  await expect(page.getByText(/needs attention/i).first()).toBeVisible();  // Error
});
