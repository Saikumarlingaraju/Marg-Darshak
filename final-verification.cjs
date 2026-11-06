const { chromium } = require('playwright');
const fs = require('fs');

async function finalVerification() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ type: 'console', message: msg.text(), url: page.url() });
    }
  });
  
  page.on('pageerror', error => {
    errors.push({ type: 'pageerror', message: error.message, stack: error.stack, url: page.url() });
  });

  // Test all routes
  const routes = [
    { path: '/', name: 'Dashboard (root redirect)' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashboard/analytics', name: 'Analytics' },
    { path: '/dashboard/infrastructure', name: 'Infrastructure' },
    { path: '/dashboard/alerts', name: 'Alerts' },
    { path: '/dashboard/reports', name: 'Reports' },
    { path: '/dashboard/settings', name: 'Settings' },
    { path: '/login', name: 'Login' }
  ];

  const results = {};

  for (const route of routes) {
    try {
      console.log(`Testing ${route.name} (${route.path})...`);
      await page.goto(`http://localhost:5173${route.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(500);
      
      const hasContent = await page.evaluate(() => {
        return document.body.innerText.length > 0;
      });
      
      results[route.name] = { loaded: hasContent, errors: 0 };
      console.log(`  ✓ ${route.name} loaded`);
    } catch (error) {
      results[route.name] = { loaded: false, errors: 1 };
      console.error(`  ✗ ${route.name} failed:`, error.message);
    }
  }

  await browser.close();
  
  return { results, errors };
}

finalVerification()
  .then(({ results, errors }) => {
    console.log('\n=== ROUTE VERIFICATION ===');
    for (const [name, result] of Object.entries(results)) {
      console.log(`  ${result.loaded ? '✓' : '✗'} ${name}`);
    }
    console.log(`\nBrowser Console Errors: ${errors.length}`);
    if (errors.length > 0) {
      errors.forEach(e => console.log(`  [${e.type}] ${e.message}`));
    }
  })
  .catch(console.error);
