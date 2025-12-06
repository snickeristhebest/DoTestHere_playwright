import { test, expect } from '@playwright/test';

test('Add/Remove link', async ({ page }) => {
  await page.goto('https://dotesthere.com/');

  // Click the get A/B testing link
  await page.getByRole('link', { name: 'Add/Remove Elements'}).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Add/Remove Elements' })).toBeVisible();

});

test('Add Element', async ({page}) => {
    await page.goto('https://dotesthere.com/');

    // Click the get A/B testing link
    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
    // find button switch version and click
    await page.getByRole('button', {name: 'Add Element'}).click();

    const createdElement = page.getByRole('button', {name: 'Delete'});
    await expect(createdElement).toBeVisible();



});

test('Delete Element', async ({page}) => {
    await page.goto('https://dotesthere.com/');

    // Click the get A/B testing link
    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
    // find button switch version and click
    await page.getByRole('button', {name: 'Add Element'}).click();

    const deleteElement = page.getByRole('button', { name: 'Delete' });
    await deleteElement.click();
    await expect(deleteElement).not.toBeVisible();
    



});
