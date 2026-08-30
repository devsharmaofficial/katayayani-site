const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/katayayani-enterprises-logo.png');
const outputDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../src/app');

async function generateFavicons() {
  const inputBuffer = fs.readFileSync(logoPath);

  // Generate 32x32 PNG favicon for public folder
  await sharp(inputBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(outputDir, 'favicon-32.png'));

  // Generate 64x64 PNG favicon
  await sharp(inputBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(outputDir, 'favicon-64.png'));

  // Generate 512x512 for app/icon.png (Next.js uses this as favicon)
  await sharp(inputBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(appDir, 'icon.png'));

  // Generate 180x180 for apple-icon
  await sharp(inputBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));

  console.log('✅ Generated icon.png (512x512) for Next.js favicon');
  console.log('✅ Generated apple-icon.png (180x180) for Apple devices');
  console.log('✅ Generated favicon-32.png and favicon-64.png for public folder');
}

generateFavicons().catch(console.error);
