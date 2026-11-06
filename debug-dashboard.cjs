const { chromium } = require('playwright');

async function debugDashboard() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('[role="main"]', { timeout: 10000 });
  await page.waitForTimeout(2000);
  
  // Get all grid items
  const gridInfo = await page.evaluate(() => {
    const grids = document.querySelectorAll('[class*="grid"]');
    return Array.from(grids).map(g => ({
      className: g.className,
      children: g.children.length,
      childClasses: Array.from(g.children).map(c => c.className).filter(c => c)
    }));
  });
  
  console.log('Grids:', JSON.stringify(gridInfo, null, 2));
  
  // Check for KPI cards specifically
  const kpiInfo = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const kpiCards = Array.from(elements).filter(el => 
      el.className && (
        el.className.includes('kpi') || 
        el.className.includes('KPI') ||
        el.className.includes('stat') ||
        (el.className.includes('card') && el.className.includes('grid'))
      )
    );
    return kpiCards.map(el => ({
      tag: el.tagName,
      className: el.className,
      text: el.textContent?.substring(0, 100)
    }));
  });
  
  console.log('KPI-like elements:', JSON.stringify(kpiInfo, null, 2));
  
  // Check for charts
  const chartInfo = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    return Array.from(svgs).map(s => ({
      className: s.className?.baseVal || s.getAttribute('class') || '',
      role: s.getAttribute('role'),
      width: s.width?.baseVal?.value || s.getAttribute('width'),
      height: s.height?.baseVal?.value || s.getAttribute('height')
    }));
  });
  
  console.log('SVGs:', JSON.stringify(chartInfo, null, 2));
  
  // Check all elements with data attributes or specific classes
  const allClasses = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const classes = new Set();
    elements.forEach(el => {
      if (el.className) {
        el.className.split(' ').forEach(c => {
          if (c.includes('kpi') || c.includes('KPI') || c.includes('chart') || c.includes('Chart') || c.includes('card') || c.includes('Card')) {
            classes.add(c);
          }
        });
      }
    });
    return Array.from(classes);
  });
  
  console.log('Relevant classes:', allClasses);
  
  await browser.close();
}

debugDashboard().catch(console.error);
