/**
 * process-logo.mjs
 * 
 * Automatically removes the checkerboard background from logo.png
 * and generates:
 *   - logo_transparent.png  (cropped, full-res)
 *   - favicon-32x32.png     (32×32 favicon)
 *   - favicon-16x16.png     (16×16 favicon)
 *   - apple-touch-icon.png  (180×180 for iOS)
 *   - favicon.ico           (multi-size ICO)
 * 
 * Runs as a predev/prebuild hook — if logo.png changes, 
 * everything is regenerated on the next run.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC = path.resolve(__dirname, '..', 'public');
const IMAGES = path.resolve(PUBLIC, 'images');
const INPUT = path.resolve(IMAGES, 'logo.png');
const OUTPUT = path.resolve(IMAGES, 'logo_transparent.png');

function shouldRegenerate() {
  if (!fs.existsSync(OUTPUT)) return true;
  const srcStat = fs.statSync(INPUT);
  const outStat = fs.statSync(OUTPUT);
  return srcStat.mtimeMs > outStat.mtimeMs;
}

async function processLogo() {
  if (!fs.existsSync(INPUT)) {
    console.log('[process-logo] ⚠ No logo.png found at', INPUT);
    console.log('[process-logo] Skipping logo processing.');
    return;
  }

  if (!shouldRegenerate()) {
    console.log('[process-logo] ✓ All logo assets are up-to-date.');
    return;
  }

  console.log('[process-logo] Processing logo.png ...');

  const image = sharp(INPUT).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const pixels = Buffer.from(data);

  // ── Pass 1: Remove checkerboard & extract alpha ──
  for (let i = 0; i < width * height; i++) {
    const offset = i * channels;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];

    const rgbMax = Math.max(r, g, b);
    const rgbMin = Math.min(r, g, b);
    const saturation = rgbMax - rgbMin;

    const isUnsaturated = saturation < 30;

    if (isUnsaturated) {
      pixels[offset] = 0;
      pixels[offset + 1] = 0;
      pixels[offset + 2] = 0;
      pixels[offset + 3] = 0;
    } else {
      const alphaFromLuma = Math.min(Math.round(rgbMax * 1.5), 255);
      const safeAlpha = Math.max(alphaFromLuma, 1) / 255;
      pixels[offset] = Math.min(Math.round(r / safeAlpha), 255);
      pixels[offset + 1] = Math.min(Math.round(g / safeAlpha), 255);
      pixels[offset + 2] = Math.min(Math.round(b / safeAlpha), 255);
      pixels[offset + 3] = alphaFromLuma;
    }
  }

  // ── Pass 2: Find bounding box & crop ──
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * channels;
      if (pixels[offset + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // Save full-res transparent logo
  const croppedBuffer = await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .toBuffer();

  await sharp(croppedBuffer).toFile(OUTPUT);
  console.log(`[process-logo]   ✓ logo_transparent.png (${cropW}×${cropH})`);

  // ── Pass 3: Generate favicons from cropped transparent logo ──
  // favicon-32x32
  await sharp(croppedBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(PUBLIC, 'favicon-32x32.png'));
  console.log('[process-logo]   ✓ favicon-32x32.png');

  // favicon-16x16
  await sharp(croppedBuffer)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(PUBLIC, 'favicon-16x16.png'));
  console.log('[process-logo]   ✓ favicon-16x16.png');

  // apple-touch-icon (180x180)
  await sharp(croppedBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(PUBLIC, 'apple-touch-icon.png'));
  console.log('[process-logo]   ✓ apple-touch-icon.png');

  // favicon.ico (use 32x32 PNG as ICO — browsers accept PNG favicons)
  await sharp(croppedBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(PUBLIC, 'favicon.ico'));
  console.log('[process-logo]   ✓ favicon.ico');

  // ── Next.js App Router file-based metadata ──
  // icon.png in src/app/ → Next.js auto-detects as favicon
  const APP_DIR = path.resolve(__dirname, '..', 'src', 'app');
  
  await sharp(croppedBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(APP_DIR, 'icon.png'));
  console.log('[process-logo]   ✓ src/app/icon.png');

  await sharp(croppedBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve(APP_DIR, 'apple-icon.png'));
  console.log('[process-logo]   ✓ src/app/apple-icon.png');

  console.log('[process-logo] ✓ All logo assets generated.');
}

processLogo().catch((err) => {
  console.error('[process-logo] ✗ Error:', err.message);
  process.exit(1);
});
