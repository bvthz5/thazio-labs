import sharp from 'sharp';
import fs from 'fs/promises';

async function processImage() {
  try {
    const inputPath = 'public/images/thazio_t_logo.png';
    const tempPath = 'public/images/thazio_t_logo_temp.png';
    
    const image = sharp(inputPath).ensureAlpha();
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const maxVal = Math.max(r, g, b);
      
      // If the pixel is very dark, make it transparent
      if (maxVal < 25) {
        data[i + 3] = 0; // Alpha = 0 (transparent)
      } else if (maxVal < 80) {
        // Smoothly feather transition from transparent to opaque
        const alpha = Math.round(((maxVal - 25) / (80 - 25)) * 255);
        data[i + 3] = alpha;
      } else {
        data[i + 3] = 255; // Keep bright parts fully opaque
      }
    }
    
    // Write to a temporary file
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).png().toFile(tempPath);
    
    // Rename temp file to inputPath (overwriting it)
    await fs.rename(tempPath, inputPath);
    
    console.log('✓ Successfully processed T-Logo: Background is now 100% transparent.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();

