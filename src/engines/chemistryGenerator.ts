import type { StudentElement, ShaderMode, DecayData, QuantumConfig, NFPAData, SynthesisTelemetry, CardRarity } from '../types/element';
import { getCurriculumFlavorText, getChemicalBehavior, getZodiacArchetype } from './flavorTextBank';

/**
 * Deterministically rolls card rarity using authentic TCG booster drop rates (70/20/10).
 */
export function rollCardRarity(positiveSeed: number, atomicNumber: number): CardRarity {
  if (atomicNumber === 126) return 'legendary'; // Magic Island of Stability
  if (atomicNumber === 120) return 'rare';      // Alkaline Earth Closed Shell

  const roll = positiveSeed % 100;
  if (roll < 10) return 'legendary'; // 10% Legendary Holographic
  if (roll < 30) return 'rare';      // 20% Rare Gilded Gold
  return 'common';                   // 70% Common Matte
}

/**
 * Fast deterministic string hash function (djb2 variant).
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

const IUPAC_DIGIT_ROOTS = ['nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'];

/**
 * Computes official IUPAC systematic element name from atomic number.
 * e.g. 119 -> Ununennium, 120 -> Unbinilium, 121 -> Unbiunium.
 */
export function getIupacSystematicName(z: number): string {
  const digits = z.toString().split('').map(d => parseInt(d, 10));
  let root = '';
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const namePart = IUPAC_DIGIT_ROOTS[digit];
    if (i === digits.length - 1) {
      // Last syllable handling: if ending with 'i' and adding 'ium', avoid double 'i'
      if (namePart.endsWith('i')) {
        root += namePart + 'um';
      } else {
        root += namePart + 'ium';
      }
    } else {
      root += namePart;
    }
  }
  return root.charAt(0).toUpperCase() + root.slice(1);
}

/**
 * Derives a personalized student element name from the student's name.
 * e.g. "Salman" -> "Salmanium", "Alex" -> "Alexium", "Grace" -> "Gracium".
 */
export function deriveStudentElementName(fullName: string): string {
  const clean = fullName.trim().replace(/[^a-zA-Z]/g, '');
  if (!clean) return 'Studentium';

  // Extract base (remove trailing vowels if word is long enough)
  let base = clean;
  if (base.length > 3) {
    if (/[aeiou]$/i.test(base)) {
      base = base.slice(0, -1);
    }
  }
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase() + 'ium';
}

/**
 * Derives a crisp 2-letter chemical symbol from student's name.
 * e.g. "Salman" -> "Sl", "Marie" -> "Mr", "Chen" -> "Ch".
 */
export function deriveElementSymbol(fullName: string, z: number): string {
  const letters = fullName.trim().replace(/[^a-zA-Z]/g, '');
  if (letters.length >= 2) {
    const first = letters[0].toUpperCase();
    // Try to pick a distinctive consonant or second letter
    let second = letters[1].toLowerCase();
    for (let i = 1; i < letters.length; i++) {
      const char = letters[i].toLowerCase();
      if (!'aeiou'.includes(char)) {
        second = char;
        break;
      }
    }
    return first + second;
  }
  // Fallback to IUPAC 3-letter abbreviation
  const digits = z.toString().split('').map(d => parseInt(d, 10));
  return digits.map((d, i) => i === 0 ? IUPAC_DIGIT_ROOTS[d][0].toUpperCase() : IUPAC_DIGIT_ROOTS[d][0]).join('');
}

/**
 * Computes predicted Dirac-Fock quantum relativistic electron configuration for Period 8.
 */
export function getElectronConfiguration(z: number): { config: QuantumConfig; block: 's' | 'p' | 'd' | 'f' | 'g'; group: string } {
  if (z === 119) {
    return {
      config: { nobleGasCore: '[Og]', valenceOrbitals: '8s¹', fullString: '[Og] 8s¹' },
      block: 's',
      group: 'Group 1 (Alkali Metal)'
    };
  }
  if (z === 120) {
    return {
      config: { nobleGasCore: '[Og]', valenceOrbitals: '8s²', fullString: '[Og] 8s²' },
      block: 's',
      group: 'Group 2 (Alkaline Earth Metal)'
    };
  }
  if (z >= 121 && z <= 138) {
    const gElectrons = z - 120;
    return {
      config: { nobleGasCore: '[Og]', valenceOrbitals: `8s² 5g${toSuperscript(gElectrons)}`, fullString: `[Og] 8s² 5g${toSuperscript(gElectrons)}` },
      block: 'g',
      group: 'Period 8 Superactinide (5g-Series)'
    };
  }
  // z >= 139
  const fElectrons = z - 138;
  return {
    config: { nobleGasCore: '[Og]', valenceOrbitals: `8s² 5g¹⁸ 6f${toSuperscript(fElectrons)}`, fullString: `[Og] 8s² 5g¹⁸ 6f${toSuperscript(fElectrons)}` },
    block: 'f',
    group: 'Period 8 Superactinide (6f-Series)'
  };
}

function toSuperscript(num: number): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return num.toString().split('').map(c => map[c] || c).join('');
}

/**
 * Deterministically generates complete chemical dossier data for a student.
 */
export function generateStudentElement(
  studentName: string,
  rawPhotoDataUrl: string,
  shaderMode: ShaderMode,
  filteredPhotoDataUrl: string,
  optionalSeed?: number,
  birthMonth?: number
): StudentElement {
  const nameTrimmed = studentName.trim() || 'Curie';
  const baseHash = Math.abs(hashString(nameTrimmed));
  const quantumEntropy = Math.floor(Math.random() * 0x7fffffff);
  const seed = optionalSeed !== undefined ? optionalSeed : (baseHash ^ quantumEntropy);
  const positiveSeed = Math.abs(seed);

  // Atomic Number Z: 119 to 150
  const atomicNumber = 119 + (positiveSeed % 32);
  const effectiveMonth = birthMonth !== undefined && birthMonth >= 1 && birthMonth <= 12
    ? Math.floor(birthMonth)
    : ((positiveSeed >>> 4) % 12) + 1;
  const zodiacSeed = Math.abs((positiveSeed ^ (atomicNumber * 1640531527)) + (optionalSeed === undefined ? Math.floor(Math.random() * 1000) : 0));
  const zodiacArchetype = getZodiacArchetype(effectiveMonth, zodiacSeed);
  const iupacName = getIupacSystematicName(atomicNumber);
  const elementName = deriveStudentElementName(nameTrimmed);
  const symbol = deriveElementSymbol(nameTrimmed, atomicNumber);

  // Atomic Mass Ar (approximately 2.54 * Z + isotope delta)
  const isotopeDelta = (positiveSeed % 7) - 3;
  const atomicMass = Math.round(2.54 * atomicNumber) + isotopeDelta;

  const { config, block, group } = getElectronConfiguration(atomicNumber);

  // Half-life calculations
  const halfLifeOptions = [
    '2.4 milliseconds',
    '450 microseconds',
    '180 microseconds',
    '14 nanoseconds',
    '1.2 milliseconds',
    '0.85 seconds (Island of Stability)',
    '3.8 milliseconds',
    '92 microseconds'
  ];
  const halfLife = halfLifeOptions[positiveSeed % halfLifeOptions.length];

  // Decay data: Alpha cascade decay
  const daughterZ = atomicNumber - 2;
  const daughterMass = atomicMass - 4;
  const daughterName = getIupacSystematicName(daughterZ);
  const decay: DecayData = {
    primaryMode: 'Alpha Decay (α)',
    daughterIsotope: `²${toSuperscript(daughterMass)}${daughterName.slice(0, 3)} (Z=${daughterZ})`,
    energyMeV: Math.round((10.2 + (positiveSeed % 25) * 0.1) * 10) / 10
  };

  // Physical stats
  const electronegativity = Math.round((0.85 + (positiveSeed % 40) * 0.015) * 100) / 100;
  const firstIonisationEnergy = 420 + (positiveSeed % 180);

  // Predicted relativistic melting & boiling points
  const meltingPointCelsius = 40 + (positiveSeed % 180);
  const boilingPointCelsius = meltingPointCelsius + 300 + ((positiveSeed >> 3) % 400);
  const meltingPointKelvin = Math.round((meltingPointCelsius + 273.15) * 10) / 10;
  const boilingPointKelvin = Math.round((boilingPointCelsius + 273.15) * 10) / 10;

  // Oxidation states
  const oxidationStates = block === 's'
    ? (atomicNumber === 119 ? ['+1'] : ['+2'])
    : ['+2', '+3', '+4'];

  // NFPA 704 Diamond
  const nfpa: NFPAData = {
    health: 4, // Superheavy radiation hazard
    flammability: (positiveSeed % 3) + 1,
    instability: 4, // Rapid nuclear decay
    special: '☢' // Radioactive
  };

  // Accelerator Telemetry
  const targets = ['²⁴⁹Cf (Californium)', '²⁴⁸Cm (Curium)', '²⁴⁴Pu (Plutonium)', '²³⁸U (Uranium)'];
  const projectiles = ['⁵⁸Fe (Iron-58)', '⁵⁴Cr (Chromium-54)', '⁴⁸Ca (Calcium-48)', '⁶⁴Ni (Nickel-64)'];

  const synthesisTelemetry: SynthesisTelemetry = {
    beamEnergyMeV: 310 + (positiveSeed % 45),
    targetNuclide: targets[positiveSeed % targets.length],
    projectileNuclide: projectiles[(positiveSeed >> 2) % projectiles.length],
    magneticFluxTesla: Math.round((4.4 + (positiveSeed % 15) * 0.1) * 10) / 10,
    crossSectionPicobarns: Math.round((0.15 + (positiveSeed % 70) * 0.01) * 100) / 100,
    detectorConfidence: 99.8
  };

  // Mix seed with atomic number and mass so different elements and isotope rerolls yield fresh observations
  const flavorSeed = Math.abs((positiveSeed ^ (atomicNumber * 2654435761)) + (atomicMass * 31));
  const behaviorSeed = Math.abs((positiveSeed ^ (atomicNumber * 2246822519)) + (atomicMass * 17));
  const flavorNote = getCurriculumFlavorText(flavorSeed, nameTrimmed);
  const chemicalBehavior = getChemicalBehavior(block, behaviorSeed);
  const rarity = rollCardRarity(positiveSeed, atomicNumber);

  return {
    id: `elem-${atomicNumber}-${positiveSeed.toString(36)}-${Date.now().toString(36)}`,
    studentName: nameTrimmed,
    atomicNumber,
    elementName,
    iupacName,
    symbol,
    atomicMass,
    period: 8,
    group,
    block,
    halfLife,
    decay,
    electronConfiguration: config,
    oxidationStates,
    electronegativity,
    firstIonisationEnergy,
    meltingPointCelsius,
    boilingPointCelsius,
    meltingPointKelvin,
    boilingPointKelvin,
    hasRerolled: false,
    birthMonth: effectiveMonth,
    zodiacArchetype,
    nfpa,
    chemicalBehavior,
    flavorNote,
    rarity,
    rawPhotoDataUrl,
    shaderMode,
    filteredPhotoDataUrl,
    createdAt: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    synthesisTelemetry
  };
}
