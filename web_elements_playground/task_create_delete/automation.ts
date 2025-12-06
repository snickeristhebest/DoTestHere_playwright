import { chromium } from 'playwright';
import readline from 'readline';

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://dotesthere.com/');

  // Navigate to Add/Remove Elements
  await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

  console.log('Press 1 to add an element, q to quit.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Helper to wait for user input
  const askQuestion = (query: string): Promise<string> =>
    new Promise(resolve => rl.question(query, resolve));

  while (true) {
    const input = (await askQuestion('> ')).trim();

    if (input === 'q') {
      console.log('Exiting...');
      break;
    }

    if (input === '1') {
      // Add element
      await page.getByRole('button', { name: 'Add Element' }).click();
      console.log('Element added.');

      // Optional: delete the last added element
      const deleteButton = page.locator('button', { hasText: 'Delete' }).last();
      await deleteButton.click();
      console.log('Element deleted.');
    } else {
      console.log('Invalid input. Press 1 to add element, q to quit.');
    }
  }

  rl.close();
  await browser.close();
}

main();
