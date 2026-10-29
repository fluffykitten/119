import type { ShaderMode } from '../types/element';

/**
 * Applies scientific laboratory shaders to an input image using an offscreen HTML5 canvas.
 * Preserves high resolution and returns a clean data URL.
 */
export async function applyScientificShader(
  imageUrl: string,
  mode: ShaderMode
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Maintain portrait aspect ratio at a high crisp resolution
      const targetWidth = 600;
      const targetHeight = Math.round((img.height / img.width) * targetWidth);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve(imageUrl);
        return;
      }

      // Draw original image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imgData.data;
      const len = data.length;

      if (mode === 'cherenkov') {
        // Cherenkov Blue Radiation Shader: Electric cobalt, cyan, and deep underwater luminescent glow
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Luminance with slight contrast curve
          let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          lum = Math.pow(lum, 1.15); // gentle contrast stretch

          if (lum < 0.25) {
            // Deep cobalt water
            const t = lum / 0.25;
            data[i] = Math.round(8 + t * 12);
            data[i + 1] = Math.round(18 + t * 30);
            data[i + 2] = Math.round(40 + t * 50);
          } else if (lum < 0.65) {
            // Radiant electric cyan
            const t = (lum - 0.25) / 0.4;
            data[i] = Math.round(20 + t * 6);
            data[i + 1] = Math.round(48 + t * 140);
            data[i + 2] = Math.round(90 + t * 130);
          } else {
            // Ionising white-hot highlight
            const t = (lum - 0.65) / 0.35;
            data[i] = Math.round(26 + t * 229);
            data[i + 1] = Math.round(188 + t * 67);
            data[i + 2] = Math.round(220 + t * 35);
          }
        }
        ctx.putImageData(imgData, 0, 0);

      } else if (mode === 'sem') {
        // Scanning Electron Micrograph: Grayscale, high-contrast edge enhancement, and subtle beam scanlines
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Greyscale conversion with S-curve contrast boost
          let grey = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Apply Sigmoid S-curve for crisp microscopic contrast
          grey = 1 / (1 + Math.exp(-8 * (grey - 0.5)));
          const val = Math.round(Math.min(255, Math.max(0, grey * 255)));

          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }
        ctx.putImageData(imgData, 0, 0);

        // Overlay subtle SEM raster scanlines
        ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
        for (let y = 0; y < targetHeight; y += 3) {
          ctx.fillRect(0, y, targetWidth, 1);
        }

      } else if (mode === 'synchrotron') {
        // Thermal Synchrotron Heatmap: False-color thermographic ironbow gradient
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (lum < 0.2) {
            // Dark violet to deep purple
            const t = lum / 0.2;
            data[i] = Math.round(20 + t * 60);
            data[i + 1] = Math.round(10 + t * 15);
            data[i + 2] = Math.round(50 + t * 80);
          } else if (lum < 0.5) {
            // Deep magenta to fiery red
            const t = (lum - 0.2) / 0.3;
            data[i] = Math.round(80 + t * 140);
            data[i + 1] = Math.round(25 + t * 20);
            data[i + 2] = Math.round(130 - t * 100);
          } else if (lum < 0.8) {
            // Fiery red to amber/gold
            const t = (lum - 0.5) / 0.3;
            data[i] = Math.round(220 + t * 30);
            data[i + 1] = Math.round(45 + t * 155);
            data[i + 2] = Math.round(30 - t * 20);
          } else {
            // Amber to incandescent white
            const t = (lum - 0.8) / 0.2;
            data[i] = Math.round(250 + t * 5);
            data[i + 1] = Math.round(200 + t * 55);
            data[i + 2] = Math.round(10 + t * 245);
          }
        }
        ctx.putImageData(imgData, 0, 0);

      } else {
        // Archival Silver Halide: Classic high-fidelity monochrome paper print
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Natural monochrome with slight slate tint
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          data[i] = Math.round(lum * 0.94);
          data[i + 1] = Math.round(lum * 0.96);
          data[i + 2] = Math.round(lum * 1.0);
        }
        ctx.putImageData(imgData, 0, 0);

        // Add subtle film grain texture
        const grainData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const gData = grainData.data;
        for (let i = 0; i < len; i += 4) {
          const grain = (Math.random() - 0.5) * 12;
          gData[i] = Math.min(255, Math.max(0, gData[i] + grain));
          gData[i + 1] = Math.min(255, Math.max(0, gData[i + 1] + grain));
          gData[i + 2] = Math.min(255, Math.max(0, gData[i + 2] + grain));
        }
        ctx.putImageData(grainData, 0, 0);
      }

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };

    img.onerror = () => reject(new Error('Failed to load image for shader processing'));
    img.src = imageUrl;
  });
}
