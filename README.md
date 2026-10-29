# Element 119+ (IUPAC Student Synthesis Dossier)

> High-energy classroom periodic element synthesis platform and trading card studio. Transform students into official superheavy elements with scientific shaders, trading card rarities, and shared periodic walls.
>
> **designed by fluffykitten**

---

## Overview

**Element 119+** is an interactive science web application designed to turn chemistry education into an engaging collectible experience. Students enter their name, upload or capture their photo, and initiate particle collision synthesis to create their unique superheavy element: from Element 119 (Ununennium) through Element 168.

Each synthesis calculates realistic chemical metrics, assigns an authentic IUPAC name, rolls a Trading Card Game (TCG) rarity pack, generates a spectroscopic personality profile, and displays the card in both collector card and comprehensive scientific dossier formats.

---

## Key Features

### 1. High-Energy Particle Collider Sequence
* **Visual Collision Simulation:** Multi-phase particle beam acceleration with countdown audio synthesis, camera flashes, and photo disintegration effects.
* **Deterministic Chemistry Engine:** Calculates atomic mass, group, period, block, electron configuration, oxidation states, and melting/boiling points.
* **Isotope Reroll:** Allows a single reroll per synthesis to explore alternate nuclear isotopes while preserving candidate identity.

### 2. TCG Trading Card Rarity System
* **Common:** Tactical slate-dark carbon-fiber chassis with clean technical readouts.
* **Rare:** Gilded golden card body with warm amber borders, metallic specular shine, and gold particle burst.
* **Legendary:** Dynamic rainbow holographic foil overlay with chromatic dispersion, animated light sheen, and iridescent confetti.

### 3. Dual Form Factors
* **Trading Card:** Pocket-sized collectible card with rarity seals, elemental symbols, boiling/melting points, electron configurations, and hazard diamonds.
* **Comprehensive Dossier:** Full IUPAC laboratory report featuring radioactive decay pathways, nuclear synthesis equations, and field incident logs.

### 4. Scientific Shader Laboratory
* **Thermal Infrared:** False-color heat distribution imaging.
* **UV Fluorescence:** High-contrast ultraviolet glow.
* **Electron Microscopy:** Focused high-detail monochromatic scanning electron style.
* **Darkfield Scattering:** Oblique illumination scattering.
* **Negative Inversion:** Radiographic photographic negative style.
* **Integrated Photo Framing:** Interactive zoom and pan controls to position student photos accurately within the elemental frame.

### 5. Laboratory Spectroscopic Incident Observations
* Science-themed character archetypes keyed by birth month.
* Features scientific zodiac observations such as *Cryogenic Superconductor*, *Noble Gas Luminescence*, *Catalytic Metamorphic*, and *Pyrotechnic Luminescence*.

### 6. Interactive Barcode & Scannable QR Codes
* Clicking the barcode on any card or dossier opens the **IUPAC Digital Specimen Scanner**.
* Generates an official scannable QR code linking directly to that student's card (`?element=ID&room=CODE`).
* Instant mobile camera scanning opens the specimen directly on phones or tablets.
* Includes one-click direct link clipboard copying.

### 7. Online Classroom Periodic Wall
* **Room-Code Synchronization:** Teachers or classes can create custom room codes (e.g., `CHEM-119`, `PERIOD-3`).
* **Cloudflare KV Integration:** Serverless storage syncs cards across all student devices without requiring accounts or logins.
* **Student Ownership Protection:** Students can only delete cards created on their own device. Classmates' cards display a locked view-only badge.
* **Live Refresh:** Automatic background polling every 12 seconds with a live sync indicator.
* **Local Offline Mode:** Full localStorage fallback when running offline or without a room code.

### 8. Batch A4 Printing & High-Resolution Export
* **High-Res PNG:** One-click download of cards and dossiers rendered at retina pixel density.
* **Single A4 Dossier Print:** Clean print stylesheets tailored for laboratory noticeboards.
* **Batch 9-Card A4 Cutting Grid:** Print entire classrooms as collectible cut-out trading card sheets.

---

## Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide React
* **Canvas & Audio:** HTML5 2D Canvas Shader Pipeline, Web Audio API Synthesizer
* **Export & Rendering:** html-to-image, canvas-confetti, qrcode
* **Backend:** Cloudflare Pages Functions, Cloudflare Workers KV
* **Linter:** Oxlint

---

## Getting Started

### Prerequisites
* Node.js 18+ or later
* npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/fluffykitten/119.git
cd 119

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
# Type check and build bundle
npm run build

# Run Oxlint
npm run lint
```

---

## Cloudflare Pages & KV Setup (Optional for Online Wall)

To enable live online classroom synchronization:

1. Create a Cloudflare KV namespace named `WALL_KV`:
   ```bash
   npx wrangler kv:namespace create "WALL_KV"
   ```
2. Link the namespace in your Cloudflare Pages dashboard under:
   **Settings > Functions > KV namespace bindings**:
   * Variable name: `WALL_KV`
   * KV namespace: Select your created `WALL_KV` namespace.
3. Deploy to Cloudflare Pages:
   * Build command: `npm run build`
   * Build output directory: `dist`

---

## Project Structure

```text
├── functions/
│   └── api/
│       ├── analyze-vision.ts    # Cloudflare Pages Function for image analysis
│       └── wall.ts              # Cloudflare Pages KV API for shared classroom rooms
├── src/
│   ├── components/              # UI components (ElementCard, ClassroomWall, Collider, etc.)
│   ├── engines/                 # Chemistry generator, shader engine, pixel analyzer
│   ├── types/                   # TypeScript interfaces (StudentElement, Rarity, Shaders)
│   ├── utils/                   # Audio synthesizer, export canvas, wall API client
│   ├── App.tsx                  # Root application router and workflow state
│   └── main.tsx                 # React entry point
└── tailwind.config.js           # Custom theme colors, animations, and typography
```

---

## License & Attribution

Designed and created by **fluffykitten**.
Released for educational and classroom use.
