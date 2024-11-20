const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDirectory = path.join(process.cwd(), 'public', 'icons');

async function ensureDirectoryExists(directory) {
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

async function generateIcons() {
  // Stelle sicher, dass das Icons-Verzeichnis existiert
  await ensureDirectoryExists(iconDirectory);

  // Basis-Icon (kann angepasst werden)
  const baseIcon = path.join(process.cwd(), 'public', 'logo.png');

  // Generiere Icons in verschiedenen Größen
  for (const size of sizes) {
    await sharp(baseIcon)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 30, g: 58, b: 138, alpha: 1 } // #1e3a8a (dein theme-color)
      })
      .toFile(path.join(iconDirectory, `icon-${size}x${size}.png`));
    
    console.log(`✓ Generated ${size}x${size} icon`);
  }

  // Generiere apple-touch-icon
  await sharp(baseIcon)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 30, g: 58, b: 138, alpha: 1 }
    })
    .toFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'));
  
  console.log('✓ Generated apple-touch-icon.png');

  // Generiere favicon.ico
  await sharp(baseIcon)
    .resize(32, 32)
    .toFile(path.join(process.cwd(), 'public', 'favicon.ico'));
  
  console.log('✓ Generated favicon.ico');

  console.log('\nAll PWA assets generated successfully! 🎉');
}

generateIcons().catch(console.error);
