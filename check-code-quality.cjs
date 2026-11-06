const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function findFiles(dir, ext = ['.tsx', '.ts']) {
  const files = [];
  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (ext.some(e => entry.name.endsWith(e))) {
        files.push(fullPath);
      }
    }
  }
  walk(dir);
  return files;
}

const files = findFiles(srcDir);

// Check for unused imports
console.log('=== Checking for unused imports ===');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Check for imports that might be unused (simplified check)
    if (line.startsWith('import ') && !line.includes('type ')) {
      // This is a very basic check - just looking for patterns
      const importMatch = line.match(/import\s+\{([^}]+)\}\s+from/);
      if (importMatch) {
        const imports = importMatch[1].split(',').map(i => i.trim().split(/\s+as\s+/)[0].trim());
        for (const imp of imports) {
          if (imp && !imp.startsWith('type ')) {
            // Check if the import is used in the file (simple regex)
            const usageRegex = new RegExp(`\b${imp}\b`, 'g');
            const usageCount = (content.match(usageRegex) || []).length;
            if (usageCount <= 1) { // Only found in import statement
              console.log(`  ${file}:${i+1} - Possibly unused import: ${imp}`);
            }
          }
        }
      }
    }
  }
}

// Check for duplicate components
console.log('\n=== Checking for duplicate component names ===');
const componentNames = {};
for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const exportMatches = content.match(/export\s+(?:function|const|class|interface|type)\s+(\w+)/g);
  if (exportMatches) {
    for (const match of exportMatches) {
      const name = match.replace(/export\s+(?:function|const|class|interface|type)\s+/, '').trim();
      if (!componentNames[name]) {
        componentNames[name] = [];
      }
      componentNames[name].push(file);
    }
  }
}

for (const [name, locations] of Object.entries(componentNames)) {
  if (locations.length > 1) {
    console.log(`  Duplicate: ${name}`);
    locations.forEach(loc => console.log(`    - ${loc}`));
  }
}

// Check for mock data separation
console.log('\n=== Checking mock data separation ===');
const apiFile = path.join(srcDir, 'lib', 'api.ts');
if (fs.existsSync(apiFile)) {
  const content = fs.readFileSync(apiFile, 'utf-8');
  const mockImports = content.match(/import.*mock/gi);
  if (mockImports) {
    console.log('  Mock imports in api.ts:', mockImports);
  }
}

// Check for demo credentials
console.log('\n=== Checking for demo credentials ===');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('password') || lowerContent.includes('credential') || lowerContent.includes('secret')) {
    // Check if marked as development only
    if (!lowerContent.includes('dev') && !lowerContent.includes('mock') && !lowerContent.includes('test') && !lowerContent.includes('development')) {
      console.log(`  ${file} - Contains potential credentials`);
    }
  }
}

console.log('\n=== Code quality check complete ===');
