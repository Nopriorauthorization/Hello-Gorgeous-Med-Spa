const { chromium, devices } = require('playwright');
const fs = require('fs');

async function run(url) {
  if (!url) {
    console.error('Usage: node scripts/screenshot.js <URL>');
    process.exit(1);
  }

  // Desktop
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-desktop.png', fullPage: false });
  await browser.close();

  // Mobile (iPhone 12)
  const browser2 = await chromium.launch();
  const context = await browser2.newContext(devices['iPhone 12']);
  const page2 = await context.newPage();
  await page2.goto(url, { waitUntil: 'networkidle' });
  await page2.screenshot({ path: 'screenshot-mobile.png', fullPage: false });
  await browser2.close();

  console.log('Screenshots saved: screenshot-desktop.png, screenshot-mobile.png');
}

run(process.argv[2]).catch(err => { console.error(err); process.exit(1); });
