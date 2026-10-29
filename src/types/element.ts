export type ShaderMode = 'cherenkov' | 'sem' | 'synchrotron' | 'halide';

export type DetailLevel = 'academic' | 'streamlined';

export type FormFactor = 'card' | 'dossier';

export type PrintLayout = 'single-dossier' | 'four-cards';

export type CardRarity = 'common' | 'rare' | 'legendary';

export interface NFPAData {
  health: number; // 0 to 4
  flammability: number; // 0 to 4
  instability: number; // 0 to 4
  special: string; // e.g. '☢' (radioactive), 'W̸' (reacts with water), 'OX'
}

export interface DecayData {
  primaryMode: string; // e.g. 'Alpha Decay (α)', 'Spontaneous Fission'
  daughterIsotope: string; // e.g. '²⁹⁵Ts (Tennessine-295)'
  energyMeV: number; // e.g. 11.8
}

export interface QuantumConfig {
  nobleGasCore: string; // '[Og]'
  valenceOrbitals: string; // '8s¹'
  fullString: string; // '[Og] 8s¹'
}

export interface SynthesisTelemetry {
  beamEnergyMeV: number;
  targetNuclide: string;
  projectileNuclide: string;
  magneticFluxTesla: number;
  crossSectionPicobarns: number;
  detectorConfidence: number; // percentage
}

export interface ChemicalZodiacArchetype {
  month: number; // 1 to 12
  monthName: string; // 'January', 'April', etc.
  title: string; // 'The Spontaneous Catalyst'
  shortTitle: string; // 'Spontaneous Catalyst'
  description: string;
}

export interface StudentElement {
  id: string;
  studentName: string;
  atomicNumber: number; // Z >= 119
  elementName: string; // Student-derived name e.g. "Salmanium"
  iupacName: string; // Systematic IUPAC name e.g. "Ununennium"
  symbol: string; // 2-letter symbol e.g. "Sl"
  atomicMass: number; // Ar in unified atomic mass units (u)
  period: number; // Period 8
  group: string; // "Group 1 (Alkali Metal)", "Superactinide", etc.
  block: 's' | 'p' | 'd' | 'f' | 'g';
  halfLife: string;
  decay: DecayData;
  electronConfiguration: QuantumConfig;
  oxidationStates: string[];
  electronegativity: number; // Pauling scale
  firstIonisationEnergy: number; // kJ / mol
  meltingPointCelsius: number;
  boilingPointCelsius: number;
  meltingPointKelvin: number;
  boilingPointKelvin: number;
  hasRerolled?: boolean;
  birthMonth?: number;
  zodiacArchetype?: ChemicalZodiacArchetype;
  nfpa: NFPAData;
  chemicalBehavior: string; // Curriculum-aligned reaction notes
  flavorNote: string; // Curated laboratory spectroscopic observation
  rarity: CardRarity;
  photoFraming?: {
    zoom: number;
    panX: number;
    panY: number;
  };
  rawPhotoDataUrl: string;
  shaderMode: ShaderMode;
  filteredPhotoDataUrl: string;
  createdAt: string;
  synthesisTelemetry: SynthesisTelemetry;
}

export interface PixelAnalysisResult {
  luminance: number; // 0 to 1
  warmth: number; // -1 (cool) to +1 (warm)
  contrast: number; // 0 to 1
  recommendedShader: ShaderMode;
}
