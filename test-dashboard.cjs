const { chromium } = require('playwright');

async function testDashboard() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const results = {
    timestamps: new Date().toISOString(),
    viewports: {},
    errors: [],
    functionalTests: {}
  };

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });
    
    const page = await context.newPage();
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        results.errors.push({
          viewport: viewport.name,
          message: msg.text(),
          url: page.url()
        });
      }
    });
    
    page.on('pageerror', error => {
      results.errors.push({
        viewport: viewport.name,
        message: error.message,
        stack: error.stack,
        url: page.url()
      });
    });

    try {
      console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);
      
      // Navigate to dashboard
      await page.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for dashboard to load
      await page.waitForSelector('[role="main"]', { timeout: 10000 });
      
      // Test 1: Dashboard loads
      const dashboardLoaded = await page.evaluate(() => {
        return document.querySelector('[role="main"]') !== null;
      });
      results.functionalTests[`${viewport.name}_dashboardLoads`] = dashboardLoaded;

      // Test 2: Sidebar is visible
      const sidebarVisible = await page.evaluate(() => {
        const sidebar = document.querySelector('aside') || document.querySelector('[role="navigation"]');
        return sidebar !== null && sidebar.offsetWidth > 0;
      });
      results.functionalTests[`${viewport.name}_sidebarVisible`] = sidebarVisible;

      // Test 3: KPI cards render
      const kpiCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('.grid > div, [class*="grid"] > div');
        return cards.length > 0;
      });
      results.functionalTests[`${viewport.name}_kpiCardsRender`] = kpiCards;

      // Test 4: Charts render (Recharts)
      const chartsRender = await page.evaluate(() => {
        const svgs = document.querySelectorAll('svg[class*="recharts"], svg[role="img"]');
        return svgs.length > 0;
      });
      results.functionalTests[`${viewport.name}_chartsRender`] = chartsRender;

      // Test 5: City selector works
      const citySelector = await page.evaluate(() => {
        const selects = document.querySelectorAll('select, [role="combobox"], button[aria-haspopup="listbox"]');
        return selects.length > 0;
      });
      results.functionalTests[`${viewport.name}_citySelector`] = citySelector;

      // Test 6: Search/notification interactions
      const searchElements = await page.evaluate(() => {
        const search = document.querySelector('input[type="search"], input[placeholder*="search" i], [role="search"]');
        const notifications = document.querySelector('button[aria-label*="notification" i], button[aria-label*="bell" i]');
        return { search: !!search, notifications: !!notifications };
      });
      results.functionalTests[`${viewport.name}_search`] = searchElements.search;
      results.functionalTests[`${viewport.name}_notifications`] = searchElements.notifications;

      // Test 7: Table sorting/pagination (if on a page with tables)
      await page.goto('http://localhost:5173/dashboard/analytics', { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);
      
      const tableFunctionality = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const sortableHeaders = document.querySelectorAll('th[aria-sort], th[role="columnheader"][tabindex]');
        const pagination = document.querySelector('[role="navigation"][aria-label*="pagination" i], nav[aria-label*="pagination" i]');
        return { 
          hasTables: tables.length > 0,
          hasSortableHeaders: sortableHeaders.length > 0,
          hasPagination: !!pagination
        };
      });
      results.functionalTests[`${viewport.name}_tables`] = tableFunctionality.hasTables;
      results.functionalTests[`${viewport.name}_tableSorting`] = tableFunctionality.hasSortableHeaders;
      results.functionalTests[`${viewport.name}_tablePagination`] = tableFunctionality.hasPagination;

      // Test 8: Mobile navigation (for mobile viewport)
      if (viewport.name === 'mobile') {
        const mobileNav = await page.evaluate(() => {
          const hamburger = document.querySelector('button[aria-label*="menu" i], button[aria-expanded]');
          const overlay = document.querySelector('.fixed[class*="z-"]');
          return { hamburger: !!hamburger, overlay: !!overlay };
        });
        results.functionalTests[`${viewport.name}_mobileNavHamburger`] = mobileNav.hamburger;
        results.functionalTests[`${viewport.name}_mobileNavOverlay`] = mobileNav.overlay;
      }

      // Take screenshot
      await page.screenshot({ 
        path: `screenshots/${viewport.name}-${viewport.width}x${viewport.height}.png`,
        fullPage: true 
      });

      results.viewports[viewport.name] = {
        width: viewport.width,
        height: viewport.height,
        screenshot: `${viewport.name}-${viewport.width}x${viewport.height}.png`
      };

      console.log(`  ✓ ${viewport.name} tests completed`);
      
    } catch (error) {
      results.errors.push({
        viewport: viewport.name,
        message: error.message,
        url: page.url()
      });
      console.error(`  ✗ ${viewport.name} failed:`, error.message);
    }

    await context.close();
  }

  await browser.close();
  
  return results;
}

// Create screenshots directory
const fs = require('fs');
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

testDashboard()
  .then(results => {
    console.log('\n=== TEST RESULTS ===');
    console.log(JSON.stringify(results, null, 2));
    
    fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
    
    // Summary
    const passed = Object.values(results.functionalTests).filter(v => v === true).length;
    const total = Object.keys(results.functionalTests).length;
    console.log(`\nFunctional Tests: ${passed}/${total} passed`);
    console.log(`Errors: ${results.errors.length}`);
    
    if (results.errors.length > 0) {
      console.log('\nErrors:');
      results.errors.forEach(e => console.log(`  - [${e.viewport}] ${e.message}`));
    }
    
    process.exit(results.errors.length > 0 ? 1 : 0);
  })
  .catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
  });
