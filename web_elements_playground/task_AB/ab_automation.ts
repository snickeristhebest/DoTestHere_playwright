import readline from 'readline';
import { chromium } from 'playwright';

// Utility to prompt user for input
function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

async function run() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://dotesthere.com/');
  await page.getByRole('link', { name: 'A/B Testing' }).click();

  const switchBtn = page.getByRole('button', { name: 'Switch Version' });
  const versionHeading = page.getByRole('heading', { level: 4 });

  while (true) {
    const input = await ask("Press 1 to switch version, or q to quit: ");

    if (input.trim().toLowerCase() === "1") {
      await switchBtn.click();
      const text = await versionHeading.textContent();
      console.log("\nVersion text:", text?.trim(), "\n");
    }

    else if (input.trim().toLowerCase() === "q") {
      console.log("Exiting automation...");
      await browser.close();
      process.exit(0);
    }

    else {
      console.log("Unknown command. Try 1 or q.\n");
    }
  }
}

run();
