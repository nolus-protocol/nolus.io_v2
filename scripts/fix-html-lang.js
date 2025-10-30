/**
 * Post-build script to fix HTML lang attributes in SSR-generated pages
 * This ensures each locale's HTML files have the correct lang attribute
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

// Locale mapping (updated to ISO 639-1 standard codes)
const locales = ['ru', 'zh', 'es', 'fr', 'el', 'tr', 'id', 'ja', 'ko'];

// Function to fix lang attribute in HTML file
function fixLangAttribute(filePath, locale) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace lang="en" with the correct locale
    content = content.replace(/<html lang="en">/, `<html lang="${locale}">`);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed ${filePath} -> lang="${locale}"`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Process each locale directory
locales.forEach(locale => {
  const localeDir = path.join(distDir, locale);
  
  if (fs.existsSync(localeDir)) {
    // Fix all HTML files in the locale directory
    const files = fs.readdirSync(localeDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const filePath = path.join(localeDir, file);
        fixLangAttribute(filePath, locale);
      }
    });
  }
});

console.log('\n✅ HTML lang attributes fixed for all locales');
