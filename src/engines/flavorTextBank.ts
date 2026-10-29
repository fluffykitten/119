import type { ChemicalZodiacArchetype } from '../types/element';

/**
 * Curated IGCSE and AS-Level Chemistry laboratory observations and humor.
 * Adheres strictly to the antislop Hard Gate: ZERO em dashes ('—') anywhere in strings.
 */

export const CURRICULUM_OBSERVATIONS: string[] = [
  "Observed turning phenolphthalein an intense magenta exactly 0.05 seconds before the teacher could verify the meniscus reading.",
  "Shifts dynamic equilibrium toward visible panic whenever the laboratory temperature rises by more than 1.5 degrees Celsius.",
  "Forms a crystalline giant ionic lattice with high sublimation enthalpy and stubborn resistance to Monday morning revision.",
  "Exhibits anomalously high electron affinity for contraband snacks smuggled past the fume cupboard perimeter.",
  "Discovered via relativistic ion collision; reaction quotient Q immediately exceeded Kc without showing working out.",
  "Readily donates a lone pair of electrons to any nearby classmate currently bewildered by redox half-equations.",
  "Generates a roaring non-luminous blue flame that instantly triggers the school building evacuation protocol.",
  "Calculated to contain 6.022 x 10²³ complaints per mole of challenging Paper 2 structured questions.",
  "Synthesized briefly within the superheavy Island of Stability, decaying only when unexpected pop quizzes are announced.",
  "Undergoes vigorous hydration in open beakers, producing rapid bubbling and enthusiastic teacher intervention.",
  "Demonstrates anomalous boiling point elevation attributed entirely to an excessive network of intermolecular hydrogen bonds.",
  "Tested negative in standard Tollens' reagent test, but formed an instantaneous silver mirror on the student's safety goggles.",
  "Readily displaces aqueous bromide ions, textbook definitions, and late homework into the nearest waste container.",
  "Spectral analysis revealed a sharp emission line at 589 nm that completely baffled the department spectrometer.",
  "Exhibits inert noble-gas behavior during cleanup duties, but reacts with explosive enthalpy during free study periods.",
  "Enthalpy cycle calculations confirmed Hess's law cannot account for the sheer energy expended avoiding stoichiometry.",
  "Possesses an unusually low activation energy barrier for starting heated classroom debates about electronegativity trends.",
  "Shows strong catalytic activity in converting neutral silence into lively laboratory chaos during practical assessments.",
  "Demonstrates high volatility under standard laboratory temperature and pressure, vanishing promptly when the bell rings.",
  "Forms instantaneous coordination complexes with transition metal salts and stray pieces of filter paper.",
  "Exhibits relativistic contraction of valence s-orbitals, causing unexpected resistance to submitting lab reports on time.",
  "Catalyzed an instantaneous esterification reaction that caused the entire prep room to smell intensely of synthetic pear drops.",
  "Spectroscopic emission in the ultraviolet range consistently overloads the school photometer whenever music is played in the lab.",
  "Reacts violently with concentrated sulfuric acid to liberate mysterious plumes of dense white smoke and nervous teacher laughter.",
  "Demonstrates a half-life of 3.4 milliseconds in the classroom, but exhibits near-infinite stability once lunch period begins.",
  "Spontaneously forms coordinate covalent dative bonds with any unclaimed scientific calculator left on the lab bench.",
  "Titration endpoint required precisely three extra drops of sodium hydroxide, prompting an immediate argument over parallax error.",
  "Exhibits strong diamagnetism, actively repelling all attempts to explain the Born-Haber cycle before first break.",
  "Forms an insoluble gelatinous precipitate that stubbornly defies gravity, filtration, and standard washing procedures.",
  "Calculated Gibbs free energy change delta G remained negative, proving spontaneous chaos is thermodynamically favored.",
  "Rapidly quenches Bunsen burner flames with an audible pop, officially classified by lab staff as an acoustic anomaly.",
  "Possesses high lattice enthalpy and an unyielding refusal to dissolve in aqueous revision schedules.",
  "Detected emitting faint Cherenkov radiation whenever attempting to calculate empirical formulas without a periodic table.",
  "Undergoes rapid electrophilic addition across carbon-carbon double bonds, yielding volatile products and stained lab coats.",
  "Observed absorbing infrared radiation at 1715 cm⁻¹, characteristic of an intensely active carbonyl group and restless energy.",
  "Demonstrates significant shielding by inner 5g subshells, rendering external disciplinary reminders completely ineffective.",
  "Standard electrode potential measured at +2.87 volts, indicating an overwhelming tendency to oxidize peaceful study sessions.",
  "Precipitates immediately upon addition of acidified silver nitrate, forming a curdy white solid that resists aqueous ammonia.",
  "Nuclear spin resonance spectroscopy detected four distinct magnetic environments, none of which were listening to the lecture.",
  "Forms a dark violet vapor during sublimation that leaves permanent reminders on the laboratory ceiling tiles.",
  "Observed shifting dynamic equilibrium toward maximum entropy the moment the laboratory supervisor stepped out of the room.",
  "Thermal decomposition yielded toxic fumes of sulfur dioxide, necessitating three opened windows and vigorous textbook waving.",
  "Exhibits anomalous paramagnetic properties that cause paperclips and locker keys to drift mysteriously toward the specimen.",
  "Rate of reaction determined to be zero-order with respect to teacher warnings, proceeding at a stubbornly constant velocity.",
  "Failed to decolorize bromine water in the dark, but underwent rapid photochlorination under bright corridor fluorescent lighting.",
  "Mass spectrometry revealed a sharp molecular ion peak at M+2, hinting at an unexpected isotopic twin in another homeroom.",
  "Demonstrates an unusually high specific heat capacity, absorbing immense educational pressure without changing temperature.",
  "Undergoes spontaneous disproportionation into two equally energetic states whenever paired work is assigned.",
  "Emits intense monochromatic green light under flame testing, temporarily blinding two adjacent lab partners.",
  "Exhibits zero viscosity when sliding along polished laboratory benches, defying classical Newtonian fluid mechanics.",
  "Activation energy barrier measured as negligible when organizing clandestine snacks behind the fume extraction baffle.",
  "Shows rapid ligand exchange kinetics, swapping test tubes and chemical reagents faster than the eye can follow.",
  "Theoretical modeling suggests 8s electron velocities exceed 80 percent the speed of light, explaining why they are never in their seat.",
  "Hydrolyzes rapidly in atmospheric water vapor, releasing pungent hydrogen chloride fumes and audible student gasps.",
  "Possesses a coordination number of 6, constantly surrounded by an octahedral cluster of laughing classmates.",
  "Refused to yield expected combustion products, producing instead a shower of sparkling orange incandescent embers.",
  "Absorbed across visible wavelengths from 400 to 700 nm, appearing completely opaque to standard disciplinary scrutiny.",
  "Demonstrates profound reluctance to undergo oxidation, remaining in a reduced state of horizontal desk relaxation.",
  "Observed causing digital multimeter readings to fluctuate wildly during resistance measurements across the specimen.",
  "Generated sufficient exothermic heat during simple neutralization to shatter an unannealed borosilicate boiling tube.",
  "Undergoes Markovnikov addition with unerring consistency, always joining the side with the greatest concentration of friends.",
  "Superheavy nucleus displays quad-polar deformation, emitting characteristic gamma bursts during difficult homework tasks.",
  "Forms an amphoteric hydroxide that dissolves readily in both acidic humor and basic teenage banter.",
  "Spectral lines reveal prominent hyperfine splitting, indicating complex internal nuclear structure and unpredictable mood swings.",
  "Exhibits extreme delocalization of pi-electrons, spreading gossip across three adjacent laboratory benches in milliseconds.",
  "Achieved critical mass within the particle collider chamber, requiring immediate emergency cooldown via chilled chocolate milk.",
  "Combines with diatomic oxygen at room temperature to form a non-stoichiometric oxide of dazzling luminescence.",
  "Boiling tube contents turned completely black before suddenly clarifying into a sparkling sapphire blue solution.",
  "Detected via secondary ion mass spectrometry leaving microscopic traces of graphite and eraser dust on every exam paper.",
  "Exhibits pronounced relativistic mass expansion, making the specimen exceptionally difficult to budge from the comfortable chair.",
  "Forms high-affinity van der Waals complexes with laboratory stools, remaining seated long after the dismissal chime.",
  "Reacts with Benedict's reagent to produce a brick-red precipitate of copper(I) oxide and immense personal satisfaction.",
  "Observed creating micro-eddies of ionized plasma around the edge of their safety spectacles during intense concentration.",
  "Displays anomalous electronegativity trends that completely contradict Pauling scale predictions in modern textbooks.",
  "Nuclear cross-section measurement indicated a 99.9 percent probability of successfully synthesizing laboratory memories."
];

export const PREDICTED_BEHAVIORS: Record<string, string[]> = {
  s: [
    "Predicted superheavy alkali metal. Reacts violently with atmospheric moisture to liberate hydrogen gas and substantial thermal energy.",
    "Extremely low first ionisation energy due to significant relativistic shielding of the outer 8s subshell electrons.",
    "Forms strongly alkaline hydroxide precipitates and exhibits intense flame coloration in emission spectroscopy."
  ],
  g: [
    "First theoretical 5g-block superactinide element. Exhibits exotic high-order orbital hybridization and multi-center bonding.",
    "Predicted to display complex variable oxidation states spanning +2 to +8 owing to closely spaced relativistic energy levels.",
    "Demonstrates anomalous electronic shielding where 5g wavefunctions penetrate deeply toward the superheavy nucleus."
  ],
  f: [
    "Late superactinide series element. Characterized by relativistic contraction of core s and p orbitals alongside d-orbital expansion.",
    "Undergoes spontaneous alpha cascade decay toward stable lead and bismuth isotopes with measurable recoiling energy.",
    "Forms dense covalent-character organometallic complexes with cyclopentadienyl and halide coordination ligands."
  ],
  d: [
    "Transition series superheavy metal. Predicted to possess refractory melting characteristics and catalytic d-orbital vacancy interactions.",
    "Forms richly colored coordination complexes with variable coordination numbers ranging from 6 to 8 in aqueous media.",
    "Exhibits paramagnetism arising from unpaired d-shell valence electrons subject to intense spin-orbit coupling."
  ],
  p: [
    "Post-transition superheavy element dominated by the inert-pair relativistic stabilization of the 8s and 8p subshells.",
    "Shows amphoteric chemical behavior, dissolving readily in both concentrated hydrochloric acid and sodium hydroxide solutions.",
    "Forms volatile covalent halides with trigonal bipyramidal and octahedral molecular geometries."
  ]
};

/**
 * Deterministically picks a witty IGCSE/AS-level observation based on an integer hash.
 */
export function getCurriculumFlavorText(seedNumber: number, studentName: string): string {
  const index = Math.abs(seedNumber) % CURRICULUM_OBSERVATIONS.length;
  const quote = CURRICULUM_OBSERVATIONS[index];
  // Format cleanly with student surname or first name if appropriate
  return quote.replace(/\bthe student\b/gi, studentName);
}

export const CHEMICAL_ZODIAC_ARCHETYPES: Record<number, ChemicalZodiacArchetype> = {
  1: {
    month: 1,
    monthName: 'January',
    title: 'The Giant Covalent Anchor',
    shortTitle: 'Covalent Anchor',
    description: 'Possesses immense thermodynamic lattice stability and refuses to melt under academic pressure. While others decompose during exam week, this specimen maintains tetrahedral composure, though changing their mind requires breaking four covalent sigma bonds simultaneously.'
  },
  2: {
    month: 2,
    monthName: 'February',
    title: 'The Noble Gas Luminary',
    shortTitle: 'Noble Luminary',
    description: 'Completely self-sufficient with an octet of closed valence shells, exhibiting near-zero reactivity toward hallway rumors and classroom drama. However, when connected to a high-voltage external excitation, they emit a dazzling, one-of-a-kind spectral glow that commands the entire room.'
  },
  3: {
    month: 3,
    monthName: 'March',
    title: 'The Superfluid Dreamer',
    shortTitle: 'Superfluid Dreamer',
    description: 'Exhibits zero internal viscosity and effortlessly bypasses rigid institutional barriers by creeping upward along beaker rims. Guided by quantum intuition rather than classical trajectory, they transition between creative states without losing kinetic momentum or showing their working out.'
  },
  4: {
    month: 4,
    monthName: 'April',
    title: 'The Spontaneous Catalyst',
    shortTitle: 'Spontaneous Catalyst',
    description: 'Dramatically lowers the activation energy required to turn a quiet study session into spirited laboratory chaos. They initiate spontaneous exothermic social reactions in seconds and emerge at the end completely unconsumed, watching the resulting chaos with total innocence.'
  },
  5: {
    month: 5,
    monthName: 'May',
    title: 'The Alkaline Earth Anchor',
    shortTitle: 'Alkaline Anchor',
    description: 'Grounded, dependable, and possessing a solid plus-two oxidation state in all collaborative endeavors. Forms exceptionally stable, insoluble bonds with friends, acting as the structural pillar that keeps volatile group projects from violently evaporating into gas.'
  },
  6: {
    month: 6,
    monthName: 'June',
    title: 'The Dynamic Equilibrator',
    shortTitle: 'Dynamic Equilibrator',
    description: 'A master of Le Chatelier principle who effortlessly shifts their dynamic equilibrium in response to sudden changes in classroom pressure or temperature. Capable of arguing both forward and reverse reaction pathways simultaneously, leaving spectators uncertain which state they actually occupy.'
  },
  7: {
    month: 7,
    monthName: 'July',
    title: 'The Hydrogen Bonding Nurturer',
    shortTitle: 'Hydrogen Nurturer',
    description: 'Naturally weaves an extensive network of intermolecular hydrogen bonds across the student body, offering remarkably high specific heat capacity against stressful shocks. Keeps the entire friendship group cohesive under surface tension, though intensely protective of their lone electron pairs.'
  },
  8: {
    month: 8,
    monthName: 'August',
    title: 'The Exothermic Firebrand',
    shortTitle: 'Exothermic Firebrand',
    description: 'Constantly emits bright luminescence and positive reaction enthalpy, radiating magnetic energy that pulls surrounding orbitals into their sphere of influence. Highly resistant to quenching, they burn with a roaring blue flame whenever given an opportunity to present on their favorite topic.'
  },
  9: {
    month: 9,
    monthName: 'September',
    title: 'The Precision Spectroscopist',
    shortTitle: 'Precision Spectroscopist',
    description: 'Operates with monochromator-grade precision, capable of detecting a 0.001 mL titration error from across the laboratory. Driven by rigorous analytical stoichiometry, they will happily spend forty-five minutes calibrating a single experimental graph to guarantee perfect peer review.'
  },
  10: {
    month: 10,
    monthName: 'October',
    title: 'The Resonance Stabilizer',
    shortTitle: 'Resonance Stabilizer',
    description: 'Possesses a conjugated pi-electron system that continuously delocalizes group conflict, achieving profound thermodynamic tranquility through symmetrical harmony. Deeply attuned to balance and aesthetics, they cannot tolerate unevenly spaced graph axes or unfair grading rubrics.'
  },
  11: {
    month: 11,
    monthName: 'November',
    title: 'The Deep-Core Actinide',
    shortTitle: 'Deep-Core Actinide',
    description: 'Conceals dense 5f and 6d orbitals of hidden talent beneath an enigmatic, unperturbed exterior. Mild-mannered under standard ambient conditions, but capable of generating critical-mass breakthrough insights the moment a genuine challenge enters their detection perimeter.'
  },
  12: {
    month: 12,
    monthName: 'December',
    title: 'The Relativistic Superheavy',
    shortTitle: 'Relativistic Superheavy',
    description: 'Operates at near-luminal velocities where core electrons undergo relativistic mass increase, completely warping conventional rules and expectations. Perpetually thinking two chapters ahead of the syllabus, they dwell happily in the theoretical Island of Stability where ordinary limits no longer apply.'
  }
};

/**
 * Returns the Chemical Zodiac Archetype for a given calendar birth month (1-12).
 */
export function getZodiacArchetype(month: number): ChemicalZodiacArchetype {
  const normalized = Math.min(12, Math.max(1, Math.floor(month)));
  return CHEMICAL_ZODIAC_ARCHETYPES[normalized] || CHEMICAL_ZODIAC_ARCHETYPES[4];
}

/**
 * Retrieves curriculum-grounded predicted chemical reaction behavior.
 */
export function getChemicalBehavior(block: 's' | 'p' | 'd' | 'f' | 'g', seedNumber: number): string {
  const pool = PREDICTED_BEHAVIORS[block] || PREDICTED_BEHAVIORS.s;
  const index = Math.abs(seedNumber) % pool.length;
  return pool[index];
}
