import { toPng } from 'html-to-image';
import type { StudentElement } from '../types/element';

/**
 * Downloads a DOM node as a crisp high-resolution PNG image at high DPI.
 * Enforces strict zero-margin styling on the clone to prevent offscreen shift.
 */
export async function downloadCardAsPng(
  node: HTMLElement,
  element: StudentElement,
  formFactor: 'card' | 'dossier'
): Promise<void> {
  try {
    const width = node.offsetWidth;
    const height = node.offsetHeight;

    const dataUrl = await toPng(node, {
      pixelRatio: 2.5, // Crisp 300 DPI print quality without memory bloat
      backgroundColor: '#f8fafc',
      width: width,
      height: height,
      style: {
        margin: '0',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '0',
        marginBottom: '0',
        transform: 'none',
        position: 'static',
        left: '0',
        top: '0',
      },
      cacheBust: true,
      skipFonts: true, // Prevents CORS SecurityError on external Google font stylesheets
    });

    const link = document.createElement('a');
    const typeLabel = formFactor === 'card' ? 'Card' : 'Dossier';
    const sanitizedStudent = element.studentName.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `IUPAC_${typeLabel}_Z${element.atomicNumber}_${element.symbol}_${sanitizedStudent}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export element card to PNG:', error);
    throw error;
  }
}

/**
 * Initiates the browser print dialog with customized document title for clean print output.
 */
export function triggerPrintDialog(title: string = 'Element 119+ IUPAC Dossier'): void {
  const originalTitle = document.title;
  document.title = title;
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}
