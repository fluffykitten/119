export interface DemoStudent {
  name: string;
  historicalTitle: string;
  photoDataUrl: string;
}

// Minimalist vector SVG portraits encoded as data URLs for Curie, Rutherford, and Mendeleev
function createSvgAvatarDataUrl(initials: string, bgGradientStart: string, bgGradientEnd: string, silhouetteD: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${bgGradientStart}" />
        <stop offset="100%" stop-color="${bgGradientEnd}" />
      </linearGradient>
    </defs>
    <rect width="200" height="240" fill="url(#grad)" />
    <!-- Scientific measurement grid ticks in avatar -->
    <path d="M10 20h10M10 40h6M10 60h6M10 80h10M10 100h6M10 120h10" stroke="#94a3b8" stroke-width="1" />
    <path d="M190 20h-10M190 40h-6M190 60h-6M190 80h-10M190 100h-6M190 120h-10" stroke="#94a3b8" stroke-width="1" />
    <!-- Character silhouette -->
    <path d="${silhouetteD}" fill="#1e293b" opacity="0.85" />
    <!-- Scientific initials badge -->
    <circle cx="165" cy="210" r="18" fill="#0f172a" />
    <text x="165" y="215" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" fill="#f8fafc" text-anchor="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 1. Marie Curie silhouette
const CURIE_SILHOUETTE = "M100 55 C82 55 70 70 70 90 C70 105 78 116 88 122 C62 134 45 165 40 210 L160 210 C155 165 138 134 112 122 C122 116 130 105 130 90 C130 70 118 55 100 55 Z M100 45 C115 45 125 50 128 62 C120 58 108 55 100 55 C92 55 80 58 72 62 C75 50 85 45 100 45 Z";

// 2. Ernest Rutherford silhouette
const RUTHERFORD_SILHOUETTE = "M100 50 C80 50 68 66 68 88 C68 104 77 116 88 122 C60 134 42 165 38 210 L162 210 C158 165 140 134 112 122 C123 116 132 104 132 88 C132 66 120 50 100 50 Z M88 102 C92 104 100 105 108 102 C115 104 120 108 120 110 C110 113 90 113 80 110 C80 108 84 104 88 102 Z";

// 3. Dmitri Mendeleev silhouette (flowing beard)
const MENDELEEV_SILHOUETTE = "M100 45 C75 45 65 65 65 88 C65 120 70 155 100 175 C130 155 135 120 135 88 C135 65 125 45 100 45 Z M60 120 C50 145 42 180 38 210 L162 210 C158 180 150 145 140 120 C125 155 115 180 100 180 C85 180 75 155 60 120 Z";

export const DEMO_STUDENTS: DemoStudent[] = [
  {
    name: 'Marie Curie',
    historicalTitle: 'Pioneer of Radioactivity',
    photoDataUrl: createSvgAvatarDataUrl('MC', '#cbd5e1', '#94a3b8', CURIE_SILHOUETTE),
  },
  {
    name: 'Ernest Rutherford',
    historicalTitle: 'Architect of the Nucleus',
    photoDataUrl: createSvgAvatarDataUrl('ER', '#e2e8f0', '#cbd5e1', RUTHERFORD_SILHOUETTE),
  },
  {
    name: 'Dmitri Mendeleev',
    historicalTitle: 'Father of the Periodic Table',
    photoDataUrl: createSvgAvatarDataUrl('DM', '#f1f5f9', '#94a3b8', MENDELEEV_SILHOUETTE),
  },
];
