import { test, expect } from '@playwright/test';


test('A/B testing link', async ({ page }) => {
  await page.goto('https://dotesthere.com/');

  // Click the get A/B testing link
  await page.getByRole('link', { name: 'A/B Testing' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'A/B Testing' })).toBeVisible();

});

test('A/B button', async ({page}) => {
    await page.goto('https://dotesthere.com/');

    // Click the get A/B testing link
    await page.getByRole('link', { name: 'A/B Testing' }).click();
    // find button switch version and click
    await page.getByRole('button', {name: 'Switch Version'}).click()

    const versionHeading = page.getByRole('heading', { name: /Version B/ });
    await expect(versionHeading).toBeVisible();



});
