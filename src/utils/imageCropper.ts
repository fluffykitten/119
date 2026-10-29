/**
 * Bakes user zoom and pan adjustments into a framed 4:5 portrait canvas.
 */
export async function bakeFramedPortrait(
  dataUrl: string,
  zoom: number,
  panX: number,
  panY: number,
  targetWidth: number = 600,
  targetHeight: number = 750
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // Fill neutral dark slate background in case of edge gap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Save context for transform
      ctx.save();

      // Move origin to center of target canvas
      ctx.translate(targetWidth / 2 + panX, targetHeight / 2 + panY);
      ctx.scale(zoom, zoom);

      // Determine cover scale to naturally fit 4:5 canvas before zoom
      const scaleCover = Math.max(targetWidth / img.width, targetHeight / img.height);
      const drawWidth = img.width * scaleCover;
      const drawHeight = img.height * scaleCover;

      // Draw centered
      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      resolve(canvas.toDataURL('image/jpeg', 0.94));
    };

    img.onerror = () => reject(new Error('Failed to load image for framing'));
    img.src = dataUrl;
  });
}
