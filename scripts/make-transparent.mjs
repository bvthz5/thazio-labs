import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function processImage() {
  try {
    const inputPath = path.resolve('public/images/central_ai_brain.png');
    console.log('Loading image from:', inputPath);

    const image = sharp(inputPath);
    const { width, height } = await image.metadata();

    if (!width || !height) {
      throw new Error('Could not read image metadata');
    }

    console.log(`Dimensions: ${width}x${height}`);

    // Get raw pixel buffer
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    const channels = info.channels;
    const outBuffer = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const r = data[i * channels];
      const g = data[i * channels + 1];
      const b = data[i * channels + 2];
      
      const brightness = Math.max(r, g, b);
      
      outBuffer[i * 4] = r;
      outBuffer[i * 4 + 1] = g;
      outBuffer[i * 4 + 2] = b;
      
      // key out near-black pixels with a smooth alpha transition for glowing edges
      if (brightness < 12) {
        outBuffer[i * 4 + 3] = 0;
      } else if (brightness < 45) {
        outBuffer[i * 4 + 3] = Math.round(((brightness - 12) / 33) * 255);
      } else {
        outBuffer[i * 4 + 3] = 255;
      }
    }

    // Save back as transparent PNG
    await sharp(outBuffer, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
    .png()
    .toFile(inputPath + '.tmp');

    // Overwrite original
    fs.renameSync(inputPath + '.tmp', inputPath);
    console.log('Successfully made brain background transparent!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
