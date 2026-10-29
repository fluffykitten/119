import type { PixelAnalysisResult, ShaderMode } from '../types/element';

/**
 * Analyzes image pixel data to compute luminance, warmth, and contrast.
 * Recommends an optimal scientific laboratory shader.
 */
export async function analyzeImagePixels(dataUrl: string): Promise<PixelAnalysisResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Create offscreen canvas scaled down for fast analysis
      const canvas = document.createElement('canvas');
      const width = 120;
      const height = Math.round((img.height / img.width) * 120);
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({
          luminance: 0.5,
          warmth: 0,
          contrast: 0.4,
          recommendedShader: 'halide',
        });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const pixelCount = data.length / 4;

      let totalLuminance = 0;
      let totalWarmth = 0;
      const luminances: number[] = new Array(pixelCount);

      for (let i = 0; i < pixelCount; i++) {
        const offset = i * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];

        // Standard photometric luminance
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        luminances[i] = lum;
        totalLuminance += lum;

        // Warmth factor: red dominance over blue
        const warmth = (r - b) / 255;
        totalWarmth += warmth;
      }

      const avgLuminance = totalLuminance / pixelCount;
      const avgWarmth = totalWarmth / pixelCount;

      // Calculate contrast (standard deviation of luminance)
      let varianceSum = 0;
      for (let i = 0; i < pixelCount; i++) {
        varianceSum += Math.pow(luminances[i] - avgLuminance, 2);
      }
      const contrast = Math.sqrt(varianceSum / pixelCount);

      // Determine recommended laboratory shader based on physical metrics
      let recommendedShader: ShaderMode = 'halide';

      if (avgWarmth > 0.12) {
        // Warm tones mapped to infrared synchrotron spectroscopy
        recommendedShader = 'synchrotron';
      } else if (contrast > 0.22) {
        // High frequency detail suits Scanning Electron Microscopy
        recommendedShader = 'sem';
      } else if (avgLuminance < 0.42) {
        // Low luminance / high shadow portraits glow in Cherenkov cyan
        recommendedShader = 'cherenkov';
      } else {
        // Balanced portraits default to Archival Halide print
        recommendedShader = 'halide';
      }

      resolve({
        luminance: Math.round(avgLuminance * 100) / 100,
        warmth: Math.round(avgWarmth * 100) / 100,
        contrast: Math.round(contrast * 100) / 100,
        recommendedShader,
      });
    };

    img.onerror = () => {
      resolve({
        luminance: 0.5,
        warmth: 0,
        contrast: 0.4,
        recommendedShader: 'halide',
      });
    };

    img.src = dataUrl;
  });
}
