const { chromium } = require('playwright');

async function debugDashboard() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  // Capture all console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('[role="main"]', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  // Check the actual DOM
  const domInfo = await page.evaluate(() => {
    const main = document.querySelector('[role="main"]');
    return main ? main.innerHTML.substring(0, 5000) : 'No main';
  });
  
  console.log('--- MAIN CONTENT ---');
  console.log(domInfo);
  
  // Check if KPI section exists
  const kpiSection = await page.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="observation-summary-heading"]');
    return section ? section.innerHTML : 'Not found';
  });
  
  console.log('--- KPI SECTION ---');
  console.log(kpiSection);
  
  await browser.close();
}

debugDashboard().catch(console.error);
