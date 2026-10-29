import type { ChemicalZodiacArchetype } from '../types/element';

/**
 * Curated IGCSE, AS-Level, and Superheavy Classroom Chemistry laboratory observations.
 * Every observation pairs authentic chemical principles with relatable high-school lab humor.
 * Adheres strictly to the antislop Hard Gate: ZERO em dashes anywhere in strings.
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
  "Demonstrates anomalous boiling point elevation attributed entirely to an excessive network of excuses for missing homework.",
  "Tested negative in standard Tollens' reagent test, but formed an instantaneous silver mirror on the student's safety goggles.",
  "Readily displaces aqueous bromide ions, textbook definitions, and late homework into the nearest waste container.",
  "Spectral analysis revealed a sharp emission line at 589 nm that completely baffled the teacher's freshly calibrated spectrometer.",
  "Exhibits inert noble-gas behavior during cleanup duties, but reacts with explosive enthalpy during free study periods.",
  "Enthalpy cycle calculations confirmed Hess's law cannot account for the sheer energy expended avoiding stoichiometry.",
  "Possesses an unusually low activation energy barrier for starting heated classroom debates about electronegativity trends.",
  "Shows strong catalytic activity in converting neutral silence into lively laboratory chaos during practical assessments.",
  "Demonstrates high volatility under standard laboratory temperature and pressure, vanishing promptly when the bell rings.",
  "Forms instantaneous coordination complexes with transition metal salts and stray pieces of filter paper.",
  "Exhibits relativistic contraction of valence s-orbitals, causing unexpected resistance to submitting lab reports on time.",
  "Catalyzed an instantaneous esterification reaction that caused the entire prep room to smell intensely of synthetic pear drops.",
  "Spectroscopic emission in the ultraviolet range consistently overloads the photometer whenever music is played in the lab.",
  "Reacts violently with concentrated sulfuric acid to liberate mysterious plumes of dense white smoke and nervous teacher laughter.",
  "Demonstrates a half-life of 3.4 milliseconds during classroom cleanup, but exhibits near-infinite stability once lunch begins.",
  "Spontaneously forms coordinate covalent dative bonds with any unclaimed scientific calculator left on the lab bench.",
  "Titration endpoint required precisely three extra drops of sodium hydroxide, prompting an immediate forty-minute argument over parallax error.",
  "Exhibits strong diamagnetism, actively repelling all attempts to explain the Born-Haber cycle before first break.",
  "Forms an insoluble gelatinous precipitate in the sink that stubbornly defies gravity, filtration, and standard cleaning brushes.",
  "Calculated Gibbs free energy change delta G remained negative, proving spontaneous laboratory chaos is thermodynamically favored.",
  "Rapidly quenches Bunsen burner flames with an audible pop, officially classified by lab technicians as an acoustic disciplinary event.",
  "Possesses high lattice enthalpy and an unyielding refusal to dissolve into scheduled afternoon revision groups.",
  "Detected emitting faint Cherenkov radiation whenever attempting to calculate empirical formulas without a periodic table.",
  "Undergoes rapid electrophilic addition across double bonds, yielding volatile sticky products and permanently stained lab coats.",
  "Observed absorbing infrared radiation at 1715 cm⁻¹, characteristic of an intensely active carbonyl group and restless Friday energy.",
  "Demonstrates significant shielding by inner 5g subshells, rendering external teacher reminders completely ineffective.",
  "Standard electrode potential measured at +2.87 volts, indicating an overwhelming tendency to oxidize peaceful study sessions.",
  "Precipitates immediately upon addition of acidified silver nitrate, forming a curdy white solid that refuses to leave the test tube.",
  "Nuclear magnetic resonance detected four distinct chemical environments, none of which were paying attention to the board.",
  "Forms a dark violet vapor during iodine sublimation that leaves permanent commemorative spots on the laboratory ceiling tiles.",
  "Observed shifting dynamic equilibrium toward maximum entropy the exact microsecond the lab supervisor stepped into the hallway.",
  "Thermal decomposition yielded pungent sulfur dioxide fumes, necessitating three opened windows and frantic textbook waving.",
  "Exhibits anomalous paramagnetic properties that cause paperclips, locker keys, and stolen pens to drift toward the student.",
  "Rate of reaction determined to be strictly zero-order with respect to teacher warnings, proceeding at a stubbornly constant velocity.",
  "Failed to decolorize bromine water in the dark, but underwent rapid photochlorination under bright corridor gossip.",
  "Mass spectrometry revealed a sharp molecular ion peak at M+2, hinting at an identical twin causing mischief in another homeroom.",
  "Demonstrates an unusually high specific heat capacity, absorbing immense educational pressure without altering facial expression.",
  "Undergoes spontaneous disproportionation into two equally loud argumentative states whenever paired lab work is assigned.",
  "Emits intense monochromatic green flame coloration during copper wire testing, temporarily blinding two adjacent lab partners.",
  "Exhibits zero viscosity when sliding along polished lab benches, defying classical friction and departmental safety rules.",
  "Activation energy barrier measured as negligible when organizing clandestine snacks behind the fume hood baffle.",
  "Shows rapid ligand exchange kinetics, swapping clean test tubes for dirty ones faster than the eye can follow.",
  "Theoretical modeling suggests valence electron velocities exceed 80 percent the speed of light, explaining why they are never in their seat.",
  "Hydrolyzes rapidly in atmospheric moisture, releasing pungent sighs and audible student groans during molar gas volume calculations.",
  "Possesses a coordination number of 6, constantly surrounded by an octahedral cluster of giggling classmates.",
  "Refused to yield expected combustion products, producing instead a shower of sparkling orange incandescent embers across Bench 3.",
  "Absorbed visible light across 400 to 700 nm, appearing completely opaque to standard teacher inquiries regarding unsubmitted work.",
  "Demonstrates profound reluctance to undergo oxidation, remaining in a stable reduced state of horizontal desk hibernation.",
  "Observed causing digital multimeter displays to fluctuate wildly during resistance checks across the student's pencil case.",
  "Generated sufficient exothermic heat during simple neutralization to crack an unannealed boiling tube and startle the prep room.",
  "Undergoes Markovnikov addition with unerring consistency, always joining whichever group has the highest concentration of friends.",
  "Superheavy nucleus displays quad-polar deformation, emitting characteristic gamma bursts of frustration during organic mechanism tests.",
  "Forms an amphoteric hydroxide that dissolves readily in both acidic sarcasm and basic teenage banter.",
  "Spectral lines reveal prominent hyperfine splitting, indicating complex internal emotional structure and unpredictable mood swings.",
  "Exhibits extreme delocalization of pi-electrons, spreading hallway rumors across three adjacent laboratory benches in milliseconds.",
  "Achieved critical mass inside the particle collision chamber, requiring immediate emergency stabilization via chilled iced tea.",
  "Combines with atmospheric oxygen at room temperature to produce a non-stoichiometric burst of dramatic classroom storytelling.",
  "Boiling tube contents turned completely black before suddenly clarifying into a sapphire blue solution, astonishing the student.",
  "Detected via secondary ion mass spectrometry leaving microscopic traces of graphite, eraser crumbs, and potato crisps on every exam paper.",
  "Exhibits pronounced relativistic mass expansion, making the student exceptionally difficult to budge from the comfortable swivel stool.",
  "Forms high-affinity van der Waals complexes with laboratory stools, remaining seated long after the final dismissal chime.",
  "Reacts with Benedict's reagent to produce a brick-red precipitate of copper(I) oxide and immense personal smugness.",
  "Observed creating micro-eddies of ionized plasma around the edge of their safety spectacles during intense pre-exam cramming.",
  "Displays anomalous electronegativity trends that completely contradict Pauling scale predictions in all three prescribed textbooks.",
  "Nuclear cross-section measurement indicated a 99.9 percent probability of creating unforgettable laboratory disasters.",
  "Burette tap mysteriously seized at 24.95 mL, causing an alkaline tidal wave that ruined four pages of neatly ruled calculations.",
  "Produced a squeaky pop test with hydrogen so resonant that the neighboring biology class dropped their scalpels in terror.",
  "Exhibited reverse osmosis across the classroom doorway, filtering themselves out of the room the moment cleanup was mentioned.",
  "Polymerized melted sugar from a smuggled candy on the hotplate into an indestructible amber resin shaped like a 100 mL beaker.",
  "Detected humming the periodic table song at 400 MHz inside the NMR room while waiting for the teacher to check their yield.",
  "Created a supersaturated sodium ethanoate solution that crystallized into a warm thermal stalagmite when touched with a dirty spatula.",
  "Demonstrated steric hindrance so severe that neither the teacher nor the textbook could get within arm's reach of their desk.",
  "Reduced purple potassium manganate(VII) to colorless so abruptly that the lab partner accused them of using tap water.",
  "Universal indicator paper cycled through all seven rainbow hues before settling on an unregistered neon turquoise of pure defiance.",
  "Sublimed directly from intense exam concentration into daydreaming without passing through an intermediate focus phase.",
  "Liberated brisk carbon dioxide effervescence that extinguished three wooden splints and blew the teacher's demonstration notes away.",
  "Triggered the wall-mounted Geiger counter from four benches away solely through accumulated nervous energy before Paper 3.",
  "Formed a stable zwitterion at physiological pH, maintaining simultaneously positive intentions and negative academic outcomes.",
  "Catalyzed the elephant toothpaste decomposition into a towering foam monolith that permanently rebranded the acoustic ceiling.",
  "Connected the Liebig condenser hoses in reverse, transforming a standard reflux experiment into an indoor water fountain.",
  "Digital pH probe read minus zero point four, prompting an immediate departmental investigation into the student's wash bottle.",
  "Synthesized a racemic mixture of excuses that rotated the teacher's patience by equal and opposite angles.",
  "Absorbed atmospheric moisture so aggressively that the deliquescent student managed to dissolve their own printed revision timetable.",
  "Formed an azeotropic partnership with their desk mate that could not be separated by any degree of teacher seat reallocation.",
  "Displayed a prominent infrared O-H stretch at 3300 cm⁻¹ that broadened dramatically whenever someone unwrapped chocolate nearby.",
  "Precipitated golden spangles of lead(II) iodide that swirled like a snow globe while the student completely ignored the theory.",
  "Overcame the electrostatic Coulomb barrier through pure stubbornness, fusing two opposing study groups into one chaotic coalition.",
  "Left an unmistakable aroma of scorched pear drops in the prep room, convincing the technician that an illicit bakery was operating.",
  "Quantum tunneled straight through the solid oak laboratory fire exit zero point two seconds before the final period ended.",
  "Shifted the yellow chromate equilibrium to deep orange dichromate merely by staring at the test tube with unconcealed disdain.",
  "Exhibited an anomalous Faraday constant during copper plating, electroplating twice the theoretical mass plus one paperclip.",
  "Mixed iron(III) and thiocyanate to create a blood-red solution so theatrical that two lab partners staged a dramatic fake injury.",
  "Maintained a supercooled liquid state down to minus twelve degrees, remaining perfectly chilled until a pop quiz was mentioned.",
  "Gas-liquid chromatograph showed zero retention time for the student, who had already eluted down the corridor toward the cafeteria.",
  "Developed a passivating oxide coating of total indifference that deflected every single difficult question from the inspector.",
  "Strontium flame test emitted a brilliant crimson flare that illuminated the sleepy students dozing in the back row.",
  "Attempted Friedel-Crafts alkylation and accidentally alkylated their own notebook, ruler, and left cuff with aromatic resin.",
  "Demonstrated extreme hydrophobic repulsion whenever requested to approach the sink and scrub out greasy conical flasks.",
  "Argued vehemently that their water molecule had a 180-degree bond angle because bending it required too much drawing effort.",
  "Warmed unknown salt with sodium hydroxide, liberating sufficient ammonia gas to clear three lab benches and cure nasal congestion.",
  "Occupied the extreme high-energy tail of the Maxwell-Boltzmann distribution during Friday afternoon double-period chemistry.",
  "Accidentally synthesized Prussian blue on a white lab coat, creating an avant-garde tie-dye pattern that survived three hot washes.",
  "Demonstrated negative thermal expansion, contracting into an unreachable defensive bundle whenever called on to read out results.",
  "Thermal decomposition of limestone produced brilliant limelight that temporarily outshone the school's interactive whiteboard.",
  "Showed anomalous Zeeman splitting in external magnetic fields, splitting into two contrary opinions whenever given a multiple-choice question.",
  "Neutralized a single drop of acid with half a canister of sodium bicarbonate, creating an erupting volcano on Bench 5.",
  "Volunteered as sacrificial anode during the group presentation, taking all the difficult theoretical questions to protect their partner.",
  "Packed their locker in a body-centered cubic arrangement with zero empty space and a catastrophic tendency to avalanche.",
  "Boasted a melting point range of zero point one degrees, which the teacher immediately disqualified as copied straight from Wikipedia.",
  "Saponified spilled salad dressing on the lab bench into artisanal foaming hand soap during an unscheduled alkaline spill.",
  "Reduced blue Fehling's solution to an exquisite copper mirror on the flask, which they immediately tried to use to fix their hair.",
  "Fluoresced bright lime green under 365 nm blacklight, revealing exactly which student had handled the marker pen demonstration.",
  "Captured slow thermal questions with an enormous cross-section, absorbing the teacher's momentum and halting the lesson completely.",
  "Produced royal blue tetraamminecopper(II) ions with such enthusiasm that the flask looked like a tropical ocean souvenir.",
  "Spontaneously chemiluminesced like luminol in the darkened demonstration room, drawing gasps of theatrical appreciation.",
  "Operated the Buchner vacuum filtration flask so aggressively that the circular filter paper disappeared down the drain with a loud slurping noise.",
  "Demonstrated a partition coefficient that heavily favored the sunny quadrangle over the damp titration laboratory.",
  "Discharged static electricity from their wool sweater onto the analytical balance pan, sending the digital milligram readout into orbit.",
  "Blew through the reduction blowpipe with such lung power that the charcoal block skittered across the floor like a hockey puck.",
  "Absorbed a photon of green laser light and immediately re-emitted it as an enthusiastic complaint about the lack of practical marks.",
  "Applied Le Chatelier principle to classroom seating: whenever teacher pressure increased, they shifted to the row with the fewest bodies.",
  "Coagulated gold nanoparticles from ruby red to muddy violet by dropping half a salty potato crisp into the beaker.",
  "Claimed their notebook was levitating via superconductor Meissner effect when it was clearly resting on an empty glue stick.",
  "Ground sulfur and iron in the mortar with such energetic triboluminescence that the lab technician rushed in with a fire blanket.",
  "Overshot the neutralization endpoint by five milliliters, then calmly argued that pH 12 was merely a bold aesthetic interpretation.",
  "Oscillated like a Belousov-Zhabotinsky chemical clock between intense productivity and total horizontal daydreaming every nine minutes.",
  "Mass spectrum showed a prominent molecular ion peak, while their homework showed no signs of intellectual fragmentation.",
  "Separated paper chromatography dyes into four neat bands, then accidentally dipped the entire chromatogram into their orange juice.",
  "Sublimed iodine crystals into shimmering purple gas, decorating their partner's safety specs with glittering dark needles.",
  "Resisted external pH changes better than an ethanoic acid buffer, maintaining a perfectly cheerful mood despite failing the mock exam.",
  "Spin-orbit coupled their attention span so effectively that reading half-equations caused their head to rotate toward the window.",
  "Endothermic dissolution dropped the beaker temperature so low it froze solid to the puddle on the benchtop, trapping their pen.",
  "Demonstrated an enzymatic turnover rate of ten potato crisps per minute while pretending to calibrate the spectrophotometer.",
  "Precipitated canary-yellow silver phosphate and spent ten minutes admiring the color instead of recording the mass.",
  "Proton NMR revealed a clean triplet and quartet, proving the student had successfully synthesized pure ethyl ethanoate and zero regrets.",
  "Coated the test tube with a thin reflective metallic layer, then checked their reflection to fix their fringe before the bell.",
  "Underwent polymer cross-linking with their lab partner, sharing one textbook and two halves of an eraser across three terms.",
  "Bubbled hydrogen through soapy water and ignited the foam with a meter ruler, producing a fireball that delighted the entire cohort.",
  "Emitted characteristic Auger electrons of indignation when asked why their calculated percentage yield exceeded 140 percent.",
  "Claimed their missing lab report was deflected by Rutherford gold foil scattering at an angle exceeding 90 degrees.",
  "Stabilized a volatile study group through hyperconjugation, spreading the exam stress across five adjacent classmates.",
  "Oxidized ethanol to ethanoic acid and smelled the vinegar from four meters away, instantly blaming the cafeteria staff.",
  "Formed a white ammonium chloride smoke ring halfway down the diffusion tube, then used it to frame their partner's face.",
  "Operated at the thermodynamic triple point: simultaneously stressing, laughing, and eating unauthorized snacks.",
  "Synthesized a 2,4-DNPH orange derivative that dyed their fingertips fluorescent orange for the rest of parent-teacher evening.",
  "Demonstrated a dipole moment so strong it aligned the entire row of desks in mutual opposition to the pop quiz.",
  "Trapped stray pieces of eraser inside an icy clathrate cage made of melted paraffin wax on the side of the Bunsen burner.",
  "Grew branching silver crystal dendrites across a microscope slide while narrating the process like an Olympic sports commentator.",
  "Two-photon absorption in the near-infrared caused the student to suddenly perceive the beauty of organic chemistry at 4:00 PM.",
  "Dispensed 25.00 mL with a volumetric pipette by mouth suction, triggering an instant lecture on departmental health and safety.",
  "Suffered Jahn-Teller geometric distortion when forced to sit on a broken stool with two elongated legs.",
  "Esterified butyric acid into ethyl butyrate, narrowly avoiding smelling like rancid butter by an act of chemical mercy.",
  "Possesses a glass transition temperature below ambient room conditions, becoming remarkably floppy during Monday morning theory.",
  "Barium flame test produced a neon apple-green flare that illuminated the student's clandestine game of tic-tac-toe.",
  "Carried out a concerted Diels-Alder cycloaddition in one smooth motion, simultaneously closing their binder and dodging cleanup.",
  "Registered a magnetic susceptibility of four unpaired electrons, radiating restlessness that agitated the compass on Bench 1.",
  "Crystallized bismuth into stepped rainbow hopper crystals, which they immediately tried to auction to the art department.",
  "Quenched free radical arguments at the diffusion-controlled limit by offering their own packet of gummy bears.",
  "Heated pink cobalt chloride paper until it turned sky blue, then used it to forecast that the weather was too nice for chemistry.",
  "Refused to undergo Mossbauer recoil, absorbing the teacher's stern critique with absolute diamond-like equilibrium.",
  "Ignited an accidental micro-thermite spark in a crucible that welded the wire gauze to the tripod for the next two decades.",
  "Shined a laser through a colloidal starch suspension to demonstrate the Tyndall effect, drawing applause from Bench 4.",
  "Attained zero electrical resistance when walking toward the tuck shop, gliding past teachers like a levitating magnet.",
  "Decolorized alkaline potassium manganate into muddy brown sludge, then claimed it was an intentional investigation into manganese(IV).",
  "Isotope dilution analysis proved that their homework had been photocopied from a student in Period 2.",
  "Crowded the tetrahedral carbon center with bulky alkyl excuses until no teacher feedback could make backside attack.",
  "Thermal decomposition of lead(II) nitrate produced brown nitrogen dioxide fumes that set off the fume cupboard alarm.",
  "Achieved complete baseline resolution between good intentions and actual practical execution on the chromatography strip.",
  "Displayed anomalous Hall voltage across their ears whenever complex thermodynamic derivations were written on the board.",
  "Sandwiched between two chatty lab partners like ferrocene, maintaining structural integrity through sheer patience.",
  "Produced sudden condensation trails in the cloud chamber that looked suspiciously like a smiley face.",
  "Measured a standard half-cell potential so negative that even dilute tap water seemed dangerously energetic in comparison.",
  "Crystallized pure acetylsalicylic acid from hot water in shiny needles, then asked if they could take it for their headache.",
  "Absorbed heavy-ion collision theory without fissioning, transmuting peacefully into an expert at looking deeply engaged.",
  "Calcium flame test sparked brick-red before settling into a golden glow that warmed the student's freezing fingers.",
  "Tautomerized between the eager student form and the exhausted teenager form depending on the presence of coffee.",
  "Added starch to iodine and gasped in genuine theatrical wonder when the solution turned midnight blue.",
  "Raman spectroscopy revealed a symmetrical breathing mode: the student sighing deeply at the prospect of Paper 4.",
  "Resisted royal aqua regia dissolution, demonstrating more noble inertia than a solid brick of iridium.",
  "Created a dark space behind the tall demonstration trolley where they could covertly check sports scores.",
  "Attacked atmospheric carbon dioxide with Grignard reagents before the rubber septum was even pierced.",
  "Precipitated barium sulfate into a heavy white blanket that stubbornly settled at the bottom of the test tube.",
  "Demonstrated circular dichroism by spinning around on their laboratory stool until the technician confiscated it.",
  "Maintained perfectly laminar flow toward the door three seconds before the lunch bell rang.",
  "Ionized argon in the discharge tube to purple brilliance, then claimed they had created a miniature lightsaber.",
  "Underwent Cannizzaro disproportionation: half of their brain wrote the essay while the other half thought about weekend plans.",
  "X-ray diffraction of their pencil case revealed a powder pattern containing three pens, zero rulers, and a vintage sweet wrapper.",
  "Leaked a fluorescent green fluorescein trail across the sink that looked like an alien crime scene under UV light.",
  "Relativistically contracted their response time when the teacher asked who wanted to volunteer for cleanup duty.",
  "Neutralized thionyl chloride with such calm focus that the technician offered them an honorary laboratory coat.",
  "Precipitated scarlet mercury(II) iodide, then dissolved it into clear solution with excess KI like an amateur magician.",
  "Cooled the cryo-trap with liquid nitrogen, then spent ten minutes watching frozen water droplets skitter across the floor.",
  "Fullerene cage analysis proved the student had trapped three unresolved questions inside an impenetrable sphere of confidence.",
  "Shifted spectral absorption 50 nm toward the red end, blushing furiously when their exam score was read aloud.",
  "Plotted a radioactive decay curve with such clean exponential perfection that the teacher suspected an automated ruler.",
  "Converted ortho-excuses into para-excuses under intense interrogation by the head of department.",
  "Synthesized lavender titanium(III) ions and protected the flask with an inert nitrogen balloon that floated to the ceiling.",
  "Vibronically coupled with their lab partner, synchronizing their laughing fits with the oscillation of the fume hood fan.",
  "Lead(II) chloride crystals recrystallized into golden glitter upon cooling, causing half the classroom to take smartphone photos.",
  "Displayed giant magnetoresistance, repelling all attempts to separate them from their favorite corner bench.",
  "Hydrolyzed oil of wintergreen until the entire science building smelled like an athletic locker room.",
  "Siphoned distilled water between two beakers with such hydraulic precision that the physics teacher stopped to applaud.",
  "Pyrophoric iron sparks showered onto the ceramic tile, producing dramatic squeals of delight from Bench 6.",
  "NMR splitting pattern displayed an AB quartet, symbolizing the eternal debate between student and marking scheme.",
  "Rearranged like pinacol to pinacolone, migrating their attention span toward lunch before the teacher finished the sentence.",
  "Possesses a Debye temperature high enough to conduct heat directly away from awkward practical blunders.",
  "Turned starch-iodide paper black through trace chlorine vapor from an adjacent student's over-bleached experiment.",
  "Underwent Berry pseudorotation, smoothly swapping five excuses in a continuous circle without dropping a beat.",
  "Emitted photoelectrons under ordinary fluorescent room light, demonstrating an extraordinarily low work function for laughter.",
  "Precipitated trace lanthanide fluorides with such care that the technician awarded them the clean bench trophy.",
  "Demonstrated negative Joule-Thomson cooling, expanding with cheerful relief the moment the final exam paper was collected.",
  "Chelated with EDTA in a strict 1:1 molar ratio, forming an unbreakable friendship bond across three lab stations.",
  "Arranged lycopodium powder on a Kundt's acoustic tube, creating standing wave patterns that looked like miniature sand dunes.",
  "Reduced titanium tetrachloride into a silvery sponge, producing a plume of white smoke that delighted the front row.",
  "Exhibited an anomalous isotope shift in their handwriting, which became progressively more illegible toward question six."
];

export const PREDICTED_BEHAVIORS: Record<string, string[]> = {
  "s": [
    "Predicted superheavy alkali metal. Reacts violently with atmospheric moisture to liberate hydrogen gas and substantial thermal energy.",
    "Extremely low first ionisation energy due to significant relativistic shielding of the outer 8s subshell electrons.",
    "Forms strongly alkaline hydroxide precipitates and exhibits intense flame coloration in emission spectroscopy.",
    "Relativistic contraction of the 8s orbital increases electron binding energy, giving the metallic phase an unexpectedly noble silver-gold sheen.",
    "Predicted to form stable peroxide and superoxide lattices when combusted in excess dry oxygen at standard pressure.",
    "Demonstrates anomalously high electrical conductivity in the liquid state just above its depressed relativistic melting point.",
    "Dissolves readily in liquid ammonia to yield deep paramagnetic blue solutions containing solvated relativistic electrons.",
    "Coordinates with macrocyclic crown ethers and cryptands in non-aqueous media to form unusually stable supramolecular complexes."
  ],
  "g": [
    "First theoretical 5g-block superactinide element. Exhibits exotic high-order orbital hybridization and multi-center bonding.",
    "Predicted to display complex variable oxidation states spanning +2 to +8 owing to closely spaced relativistic energy levels.",
    "Demonstrates anomalous electronic shielding where 5g wavefunctions penetrate deeply toward the superheavy nucleus.",
    "Exhibits eighteen-fold subshell degeneracy in the 5g manifold, enabling unprecedented nine-coordinate and twelve-coordinate molecular geometries.",
    "Strong spin-orbit splitting divides the 5g orbital into distinct j = 7/2 and j = 9/2 subbands with unique magnetic moments.",
    "Forms refractory intermetallic Laves phases with late transition metals, resisting thermal deformation above 2,000 Kelvin.",
    "Predicted to catalyze multi-electron redox transformations via concerted 5g-6f orbital overlap in acidic media.",
    "Displays ultra-narrow f-to-g intraconfigurational optical absorption bands across the near-infrared and visible spectrum."
  ],
  "f": [
    "Late superactinide series element. Characterized by relativistic contraction of core s and p orbitals alongside d-orbital expansion.",
    "Undergoes spontaneous alpha cascade decay toward stable lead and bismuth isotopes with measurable recoiling energy.",
    "Forms dense covalent-character organometallic complexes with cyclopentadienyl and halide coordination ligands.",
    "Pronounced superactinide contraction compresses ionic radii across the series, stabilizing high coordination numbers in aqueous solution.",
    "Forms volatile hexafluoride and octafluoride species capable of gas-phase separation in thermochromatographic columns.",
    "Exhibits intense radioluminescence in solid-state crystalline matrices due to continuous alpha-particle self-excitation.",
    "Stabilizes unusual +5 and +6 dioxo actinyl-type linear cations with strong axial metal-oxygen multiple bonding.",
    "Demonstrates strong magnetic anisotropy at cryogenic temperatures arising from unquenched orbital angular momentum in the 6f shell."
  ],
  "d": [
    "Transition series superheavy metal. Predicted to possess refractory melting characteristics and catalytic d-orbital vacancy interactions.",
    "Forms richly colored coordination complexes with variable coordination numbers ranging from 6 to 8 in aqueous media.",
    "Exhibits paramagnetism arising from unpaired d-shell valence electrons subject to intense spin-orbit coupling.",
    "Relativistic destabilization of the 7d orbitals promotes high oxidation states and strong covalent pi-backbonding with carbonyl ligands.",
    "Predicted to exceed osmium and iridium in crystal density due to compressed metallic radii and heavy nuclear mass.",
    "Forms noble-character metallic surfaces resistant to atmospheric tarnishing and dilute mineral acid attack.",
    "Undergoes relativistic d-orbital splitting in octahedral ligand fields that strongly favors low-spin diamagnetic configurations.",
    "Synthesizes cluster compounds featuring direct metal-to-metal quadruple bonds stabilized by relativistic 7d-8s hybridization."
  ],
  "p": [
    "Post-transition superheavy element dominated by the inert-pair relativistic stabilization of the 8s and 8p subshells.",
    "Shows amphoteric chemical behavior, dissolving readily in both concentrated hydrochloric acid and sodium hydroxide solutions.",
    "Forms volatile covalent halides with trigonal bipyramidal and octahedral molecular geometries.",
    "Large spin-orbit splitting between the 8p1/2 and 8p3/2 orbitals creates a closed-shell pseudo-noble character in the lower oxidation state.",
    "Predicted to exhibit semiconductor-to-metal phase transitions under moderate hydrostatic pressure in diamond anvil cells.",
    "Forms polychalcogenide Zintl anions and intermetallic cluster phases with pronounced relativistic bond-length contraction.",
    "Demonstrates high polarizability and strong dispersion interactions, elevating its boiling point relative to lighter homologues.",
    "Undergoes rapid reductive elimination from hypervalent organometallic intermediates to yield stable monovalent salts."
  ]
};

/**
 * Picks a witty IGCSE/AS-level/superheavy classroom observation based on an integer seed.
 */
export function getCurriculumFlavorText(seedNumber: number, studentName: string): string {
  const index = Math.abs(seedNumber) % CURRICULUM_OBSERVATIONS.length;
  const quote = CURRICULUM_OBSERVATIONS[index];
  // Format cleanly with student surname or first name if appropriate
  return quote.replace(/\bthe student\b/gi, studentName);
}

/**
 * Expanded bank of 60 Dossier Spectroscopic Incident Logs (5 distinct archetypes per calendar month).
 */
export const CHEMICAL_ZODIAC_VARIANTS: Record<number, ChemicalZodiacArchetype[]> = {
  "1": [
    {
      "month": 1,
      "monthName": "January",
      "title": "The Giant Covalent Anchor",
      "shortTitle": "Covalent Anchor",
      "description": "Possesses immense thermodynamic lattice stability and refuses to melt under academic pressure. While others decompose during exam week, this specimen maintains tetrahedral composure, though changing their mind requires breaking four covalent sigma bonds simultaneously."
    },
    {
      "month": 1,
      "monthName": "January",
      "title": "The Cryogenic Superconductor",
      "shortTitle": "Cryo Superconductor",
      "description": "Operates with zero internal resistance when temperatures drop and deadlines loom, channeling intellectual current without losing a single joule to friction. Expels chaotic classroom distractions automatically via the Meissner effect to maintain levitated focus."
    },
    {
      "month": 1,
      "monthName": "January",
      "title": "The Diamond Anvil Strategist",
      "shortTitle": "Diamond Strategist",
      "description": "Thrives under gigapascals of academic compression that would crush ordinary allotropes, converting raw study pressure into brilliant refractive clarity. Displays a Mohs hardness of 10.0 whenever defending their experimental methodology during peer review."
    },
    {
      "month": 1,
      "monthName": "January",
      "title": "The Zero-Point Oscillator",
      "shortTitle": "Zero-Point Oscillator",
      "description": "Retains unstoppable quantum harmonic momentum even at absolute zero Kelvin, proving that quiet composure conceals relentless underlying energy. Never truly stops calculating, vibrating at a precise fundamental frequency that keeps the entire lab bench on schedule."
    },
    {
      "month": 1,
      "monthName": "January",
      "title": "The Carborane Cage Sentinel",
      "shortTitle": "Carborane Sentinel",
      "description": "Constructed around a three-dimensional icosahedral aromatic framework of extraordinary kinetic persistence. Impervious to harsh reagents and tricky multiple-choice distractors alike, they anchor every laboratory partnership with unshakeable structural integrity."
    }
  ],
  "2": [
    {
      "month": 2,
      "monthName": "February",
      "title": "The Noble Gas Luminary",
      "shortTitle": "Noble Luminary",
      "description": "Completely self-sufficient with an octet of closed valence shells, exhibiting near-zero reactivity toward hallway rumors and classroom drama. However, when connected to a high-voltage external excitation, they emit a dazzling, one-of-a-kind spectral glow that commands the entire room."
    },
    {
      "month": 2,
      "monthName": "February",
      "title": "The Excimer Laser Resonator",
      "shortTitle": "Excimer Resonator",
      "description": "Remains monoatomic and serene in the ground state, yet forms brilliant bound excited dimers the instant a creative challenge is triggered. Emits coherent, diffraction-limited ultraviolet insight capable of etching precision patterns into the toughest syllabus topics."
    },
    {
      "month": 2,
      "monthName": "February",
      "title": "The Clathrate Cage Architect",
      "shortTitle": "Clathrate Architect",
      "description": "Masters the art of non-covalent hospitality, trapping brilliant ideas inside crystalline polyhedral frameworks without ever sacrificing personal independence. Appears aloof on the periodic table, yet quietly holds the most fascinating structures in the laboratory together."
    },
    {
      "month": 2,
      "monthName": "February",
      "title": "The Xenon Fluorine Pioneer",
      "shortTitle": "Xenon Pioneer",
      "description": "Proves that textbook rules about inertness were meant to be rewritten under the right photonic conditions. Selective about which projects deserve their valence electrons, they form rare crystalline compounds of legendary stability when genuinely inspired."
    },
    {
      "month": 2,
      "monthName": "February",
      "title": "The Penning Ionization Spark",
      "shortTitle": "Penning Spark",
      "description": "Carries long-lived metastable excitation energy across the room, effortlessly transferring inspiration to any classmate on contact. Needs zero external fanfare to illuminate a dark discharge tube with unmistakable violet-blue brilliance."
    }
  ],
  "3": [
    {
      "month": 3,
      "monthName": "March",
      "title": "The Superfluid Dreamer",
      "shortTitle": "Superfluid Dreamer",
      "description": "Exhibits zero internal viscosity and effortlessly bypasses rigid institutional barriers by creeping upward along beaker rims. Guided by quantum intuition rather than classical trajectory, they transition between creative states without losing kinetic momentum or showing their working out."
    },
    {
      "month": 3,
      "monthName": "March",
      "title": "The Quantum Tunneling Nomad",
      "shortTitle": "Quantum Nomad",
      "description": "Possesses a de Broglie wavelength broad enough to pass straight through potential energy barriers that leave classical students stumped. Arrives at the correct stoichiometric answer via non-linear intuition before anyone else has finished reading the question."
    },
    {
      "month": 3,
      "monthName": "March",
      "title": "The Bose-Einstein Condensate",
      "shortTitle": "BEC Virtuoso",
      "description": "Harmonizes disparate ideas into a single macroscopic quantum wavefunction where every thought oscillates in phase. Achieves remarkable creative coherence during late-afternoon lab sessions, turning scattered observations into unified scientific elegance."
    },
    {
      "month": 3,
      "monthName": "March",
      "title": "The Triple-Point Voyager",
      "shortTitle": "Triple-Point Voyager",
      "description": "Exists comfortably at the exact thermodynamic intersection of solid rigor, liquid adaptability, and gaseous imagination. Effortlessly shifts phase to match the needs of the experiment while keeping internal chemical potential in perfect balance."
    },
    {
      "month": 3,
      "monthName": "March",
      "title": "The Capillary Wave Navigator",
      "shortTitle": "Capillary Navigator",
      "description": "Rides surface tension gradients via the Marangoni effect, propelling group experiments forward with subtle, unseen ingenuity. Flows smoothly through micro-channels of complex data without ever generating turbulent eddy currents."
    }
  ],
  "4": [
    {
      "month": 4,
      "monthName": "April",
      "title": "The Spontaneous Catalyst",
      "shortTitle": "Spontaneous Catalyst",
      "description": "Dramatically lowers the activation energy required to turn a quiet study session into spirited laboratory chaos. They initiate spontaneous exothermic social reactions in seconds and emerge at the end completely unconsumed, watching the resulting chaos with total innocence."
    },
    {
      "month": 4,
      "monthName": "April",
      "title": "The Radical Chain Initiator",
      "shortTitle": "Radical Initiator",
      "description": "Undergoes rapid homolytic cleavage under a single flash of inspiration, propagating high-speed chain reactions of enthusiasm across every bench. One spark of their curiosity is sufficient to polymerize an entire classroom into action."
    },
    {
      "month": 4,
      "monthName": "April",
      "title": "The Enzymatic Turnover Prodigy",
      "shortTitle": "Turnover Prodigy",
      "description": "Operates at the diffusion-controlled kinetic limit with lock-and-key active site specificity for solving practical puzzles. Processes ten laboratory tasks per minute while maintaining allosteric sensitivity to the mood of the room."
    },
    {
      "month": 4,
      "monthName": "April",
      "title": "The Autocatalytic Cascade",
      "shortTitle": "Autocatalytic Surge",
      "description": "Generates its own momentum as the experiment progresses; the more results they produce, the faster the reaction accelerates. Transforms sluggish Monday morning practicals into sigmoidal bursts of high-yield discovery."
    },
    {
      "month": 4,
      "monthName": "April",
      "title": "The Phase-Transfer Spark",
      "shortTitle": "Phase-Transfer Spark",
      "description": "Shuttles effortlessly between incompatible social and academic layers like a quaternary ammonium salt across an organic-aqueous boundary. Brings together ideas that would otherwise never mix to achieve 99 percent reaction completion."
    }
  ],
  "5": [
    {
      "month": 5,
      "monthName": "May",
      "title": "The Alkaline Earth Anchor",
      "shortTitle": "Alkaline Anchor",
      "description": "Grounded, dependable, and possessing a solid plus-two oxidation state in all collaborative endeavors. Forms exceptionally stable, insoluble bonds with friends, acting as the structural pillar that keeps volatile group projects from violently evaporating into gas."
    },
    {
      "month": 5,
      "monthName": "May",
      "title": "The Chelating Ligand Guardian",
      "shortTitle": "Chelate Guardian",
      "description": "Wraps around complex multi-step problems with hexadentate coordination grip, Driven by the powerful entropic chelate effect, once they commit to mastering a topic or supporting a teammate, no competing distraction can displace them."
    },
    {
      "month": 5,
      "monthName": "May",
      "title": "The Perovskite Lattice Builder",
      "shortTitle": "Perovskite Builder",
      "description": "Assembles corner-sharing octahedral frameworks with geometric precision and remarkable photovoltaic energy conversion. Turns ordinary classroom sunlight into structured, dependable charge transport for the entire lab group."
    },
    {
      "month": 5,
      "monthName": "May",
      "title": "The Porphyrin Ring Core",
      "shortTitle": "Porphyrin Core",
      "description": "Sits calmly at the center of a conjugated macrocyclic ring like magnesium in chlorophyll, harvesting ambient energy to drive vital synthesis. Steadfast, essential, and quietly powering the productive chemistry of everyone around them."
    },
    {
      "month": 5,
      "monthName": "May",
      "title": "The Spinel Mineral Bastion",
      "shortTitle": "Spinel Bastion",
      "description": "Crystallizes in a close-packed cubic oxide lattice that shrugs off thermal shock and harsh chemical weathering. When lab procedures go sideways, this specimen remains the unshakeable reference standard on Bench 1."
    }
  ],
  "6": [
    {
      "month": 6,
      "monthName": "June",
      "title": "The Dynamic Equilibrator",
      "shortTitle": "Dynamic Equilibrator",
      "description": "A master of Le Chatelier principle who effortlessly shifts their dynamic equilibrium in response to sudden changes in classroom pressure or temperature. Capable of arguing both forward and reverse reaction pathways simultaneously, leaving spectators uncertain which state they actually occupy."
    },
    {
      "month": 6,
      "monthName": "June",
      "title": "The Zwitterionic Mediator",
      "shortTitle": "Zwitterion Mediator",
      "description": "Carries balanced positive and negative charges within the same molecular framework, remaining electrically neutral at their isoelectric point. Bridges opposing viewpoints in group debates with effortless amphoteric grace."
    },
    {
      "month": 6,
      "monthName": "June",
      "title": "The Tautomeric Shape-Shifter",
      "shortTitle": "Tautomer Shifter",
      "description": "Interconverts rapidly between keto composure and enol creativity via intramolecular proton transfer. Never pinned down to a single static Lewis structure, they adapt instantaneously to whichever isomer the marking scheme favors."
    },
    {
      "month": 6,
      "monthName": "June",
      "title": "The Fluxional Berry Rotor",
      "shortTitle": "Fluxional Rotor",
      "description": "Exchanges axial and equatorial perspectives seamlessly through low-barrier pseudorotation, making every angle of a problem appear equivalent on the NMR timescale. Agile, versatile, and impossible to catch off balance."
    },
    {
      "month": 6,
      "monthName": "June",
      "title": "The Henderson-Hasselbalch Buffer",
      "shortTitle": "Precision Buffer",
      "description": "Absorbs sudden spikes of acidic critique or basic confusion without shifting pH by more than a hundredth of a unit. Maintains optimal laboratory harmony even when titration endpoints are approaching fast."
    }
  ],
  "7": [
    {
      "month": 7,
      "monthName": "July",
      "title": "The Hydrogen Bonding Nurturer",
      "shortTitle": "Hydrogen Nurturer",
      "description": "Naturally weaves an extensive network of intermolecular hydrogen bonds across the student body, offering remarkably high specific heat capacity against stressful shocks. Keeps the entire friendship group cohesive under surface tension, though intensely protective of their lone electron pairs."
    },
    {
      "month": 7,
      "monthName": "July",
      "title": "The Supramolecular Host",
      "shortTitle": "Supramolecular Host",
      "description": "Designs welcoming molecular cavities via molecular recognition, ensuring every classmate finds their exact complementary binding site. Stabilizes fragile intermediates within a protective solvation shell of genuine encouragement."
    },
    {
      "month": 7,
      "monthName": "July",
      "title": "The Micellar Surfactant Bridge",
      "shortTitle": "Micellar Bridge",
      "description": "Possesses both hydrophilic warmth and lipophilic resilience, lowering interfacial tension across the entire classroom. Brings together incompatible personalities into a stable, shimmering emulsion of teamwork."
    },
    {
      "month": 7,
      "monthName": "July",
      "title": "The Crown Ether Complexer",
      "shortTitle": "Crown Complexer",
      "description": "Pre-organizes oxygen donor atoms with macrocyclic elegance to selectively uplift and solvate those around them. radiates warm thermodynamic stability that turns chaotic ion pairs into cooperative, high-symmetry complexes."
    },
    {
      "month": 7,
      "monthName": "July",
      "title": "The Cryoprotectant Hydrate Shield",
      "shortTitle": "Hydrate Shield",
      "description": "Forms soothing hydration spheres that prevent sharp ice-crystal stress from damaging delicate laboratory morale. High enthalpy of vaporization ensures they never boil over when practical assessments heat up."
    }
  ],
  "8": [
    {
      "month": 8,
      "monthName": "August",
      "title": "The Exothermic Firebrand",
      "shortTitle": "Exothermic Firebrand",
      "description": "Constantly emits bright luminescence and positive reaction enthalpy, radiating magnetic energy that pulls surrounding orbitals into their sphere of influence. Highly resistant to quenching, they burn with a roaring blue flame whenever given an opportunity to present on their favorite topic."
    },
    {
      "month": 8,
      "monthName": "August",
      "title": "The Thermite Ignition Dynamo",
      "shortTitle": "Thermite Dynamo",
      "description": "Once ignited by a compelling goal, proceeds with unstoppable negative delta H to reduce any obstacle into molten success. Generates enough self-sustaining luminosity to light up the entire science wing without external oxygen."
    },
    {
      "month": 8,
      "monthName": "August",
      "title": "The Sonoluminescent Cavitation Star",
      "shortTitle": "Cavitation Star",
      "description": "Focuses acoustic classroom energy into pinpoint bursts of star-hot plasma emission, turning ordinary sound waves into flashes of ultraviolet brilliance. Dazzling, energetic, and operating at effective temperatures of five thousand Kelvin."
    },
    {
      "month": 8,
      "monthName": "August",
      "title": "The Pyrophoric Spark Sovereign",
      "shortTitle": "Pyrophoric Sovereign",
      "description": "Needs zero external match or Bunsen burner to burst into spontaneous creative incandescence upon contact with fresh air. Leads every practical experiment from the front with fearless kinetic drive."
    },
    {
      "month": 8,
      "monthName": "August",
      "title": "The Chemiluminescent Beacon",
      "shortTitle": "Luminol Beacon",
      "description": "Channels reaction energy directly into excited electronic states rather than wasted heat, emitting a vivid cyan glow that guides lab partners through the murkiest analytical procedures."
    }
  ],
  "9": [
    {
      "month": 9,
      "monthName": "September",
      "title": "The Precision Spectroscopist",
      "shortTitle": "Precision Spectroscopist",
      "description": "Operates with monochromator-grade precision, capable of detecting a 0.001 mL titration error from across the laboratory. Driven by rigorous analytical stoichiometry, they will happily spend forty-five minutes calibrating a single experimental graph to guarantee perfect peer review."
    },
    {
      "month": 9,
      "monthName": "September",
      "title": "The Interferometric Calibrator",
      "shortTitle": "Interferometer Ace",
      "description": "Resolves overlapping spectral doublets down to the sub-nanometer regime using Fourier-transform clarity. Notices subtle patterns in experimental data that everyone else dismissed as background baseline noise."
    },
    {
      "month": 9,
      "monthName": "September",
      "title": "The Gravimetric Standard Arbiter",
      "shortTitle": "Gravimetric Arbiter",
      "description": "Weighs every hypothesis to four decimal places on the analytical balance inside a draft-shielded enclosure. Rejects approximation in favor of primary-standard accuracy and spotless stoichiometric working out."
    },
    {
      "month": 9,
      "monthName": "September",
      "title": "The Mass-to-Charge Sentinel",
      "shortTitle": "Mass-Spec Sentinel",
      "description": "Separates truth from impurity using quadrupole electromagnetic fields, identifying the exact molecular ion peak of any complex question within milliseconds. Zero tolerance for uncalibrated glassware or sloppy significant figures."
    },
    {
      "month": 9,
      "monthName": "September",
      "title": "The Single-Crystal Diffractometer",
      "shortTitle": "Bragg Diffractometer",
      "description": "Maps the exact three-dimensional electron density of every syllabus concept through constructive Bragg reflection. Where others see a cloudy precipitate, they calculate unit cell dimensions and space group symmetry."
    }
  ],
  "10": [
    {
      "month": 10,
      "monthName": "October",
      "title": "The Resonance Stabilizer",
      "shortTitle": "Resonance Stabilizer",
      "description": "Possesses a conjugated pi-electron system that continuously delocalizes group conflict, achieving profound thermodynamic tranquility through symmetrical harmony. Deeply attuned to balance and aesthetics, they cannot tolerate unevenly spaced graph axes or unfair grading rubrics."
    },
    {
      "month": 10,
      "monthName": "October",
      "title": "The Aromatic Pi-Cloud Harmonizer",
      "shortTitle": "Pi-Cloud Harmonizer",
      "description": "Satisfies Huckel 4n+2 electron rule with planar cyclic poise, generating a diamagnetic ring current that shields teammates from external stress. Brings extra resonance stabilization energy to every collaborative lab report."
    },
    {
      "month": 10,
      "monthName": "October",
      "title": "The Chiral Enantiomer Purist",
      "shortTitle": "Enantiomer Purist",
      "description": "Achieves 100 percent enantiomeric excess through asymmetric induction, rotating plane-polarized classroom debates toward elegant resolution. Appreciates mirror-image symmetry and refined molecular architecture."
    },
    {
      "month": 10,
      "monthName": "October",
      "title": "The Conjugated Chromophore Muse",
      "shortTitle": "Chromophore Muse",
      "description": "Tunes HOMO-LUMO energy gaps with artistic mastery to reflect the exact wavelength of harmony needed in the room. Blends scientific rigor with visual design so that every notebook diagram looks like a museum print."
    },
    {
      "month": 10,
      "monthName": "October",
      "title": "The Fullerene Geodesic Weaver",
      "shortTitle": "Fullerene Weaver",
      "description": "Interlocks pentagons and hexagons with icosahedral symmetry, distributing strain evenly across sixty vertices so no single bond bears excessive load. A natural diplomat who keeps the whole lab group structurally balanced."
    }
  ],
  "11": [
    {
      "month": 11,
      "monthName": "November",
      "title": "The Deep-Core Actinide",
      "shortTitle": "Deep-Core Actinide",
      "description": "Conceals dense 5f and 6d orbitals of hidden talent beneath an enigmatic, unperturbed exterior. Mild-mannered under standard ambient conditions, but capable of generating critical-mass breakthrough insights the moment a genuine challenge enters their detection perimeter."
    },
    {
      "month": 11,
      "monthName": "November",
      "title": "The Spin-Orbit Coupling Mystic",
      "shortTitle": "Spin-Orbit Mystic",
      "description": "Aligns intrinsic electron spin with orbital angular momentum to unlock forbidden spectroscopic transitions that amaze the department. Quietly perceptive, reading between the lines of complex reaction mechanisms at a glance."
    },
    {
      "month": 11,
      "monthName": "November",
      "title": "The Auger Cascade Investigator",
      "shortTitle": "Auger Investigator",
      "description": "Probes beneath superficial valence appearances to examine deep K-shell and L-shell truths. When an inner-core question is posed, they release a focused cascade of analytical insight with pinpoint kinetic energy."
    },
    {
      "month": 11,
      "monthName": "November",
      "title": "The Paramagnetic High-Spin Oracle",
      "shortTitle": "High-Spin Oracle",
      "description": "Maximizes unpaired electron multiplicity in accordance with Hund maximum rule, generating an unmistakable magnetic pull toward unsolved mysteries. Thrives on deep, investigative problem-solving inside the quietest corner of the lab."
    },
    {
      "month": 11,
      "monthName": "November",
      "title": "The Mossbauer Recoilless Sage",
      "shortTitle": "Mossbauer Sage",
      "description": "Anchored so firmly into the crystal lattice of knowledge that they emit and absorb high-energy insights with zero thermal recoil. Detects hyperfine nuclear interactions that escape ordinary observation."
    }
  ],
  "12": [
    {
      "month": 12,
      "monthName": "December",
      "title": "The Relativistic Superheavy",
      "shortTitle": "Relativistic Superheavy",
      "description": "Operates at near-luminal velocities where core electrons undergo relativistic mass increase, completely warping conventional rules and expectations. Perpetually thinking two chapters ahead of the syllabus, they dwell happily in the theoretical Island of Stability where ordinary limits no longer apply."
    },
    {
      "month": 12,
      "monthName": "December",
      "title": "The Island of Stability Pioneer",
      "shortTitle": "Stability Pioneer",
      "description": "Combines magic proton and neutron shell closures to achieve extraordinary half-life resilience in unexplored territory. Charts Period 8 frontiers with visionary confidence while lighter elements decay into routine."
    },
    {
      "month": 12,
      "monthName": "December",
      "title": "The Cherenkov Blue Horizon",
      "shortTitle": "Cherenkov Horizon",
      "description": "Moves through dielectric media faster than the local phase velocity of light, trailing a sonic boom of brilliant azure photonic radiation. Turns every end-of-term synthesis project into a landmark particle physics event."
    },
    {
      "month": 12,
      "monthName": "December",
      "title": "The Synchrotron Beamline Navigator",
      "shortTitle": "Synchrotron Navigator",
      "description": "Steers relativistic ion bunches around dipole storage rings using superconducting quadrupole magnets. Channels immense kinetic energy into sub-femtosecond flashes of discovery that redefine the classroom periodic wall."
    },
    {
      "month": 12,
      "monthName": "December",
      "title": "The Dirac-Fock Quantum Vanguard",
      "shortTitle": "Dirac-Fock Vanguard",
      "description": "Solves four-component relativistic wave equations where classical Schrodinger approximations fall short, comfortable in the 5g and 8p subshells where quantum electrodynamics meets fearless curiosity."
    }
  ]
};

/**
 * Primary monthly archetype lookup preserved for backward compatibility.
 */
export const CHEMICAL_ZODIAC_ARCHETYPES: Record<number, ChemicalZodiacArchetype> = {
  1: CHEMICAL_ZODIAC_VARIANTS[1][0],
  2: CHEMICAL_ZODIAC_VARIANTS[2][0],
  3: CHEMICAL_ZODIAC_VARIANTS[3][0],
  4: CHEMICAL_ZODIAC_VARIANTS[4][0],
  5: CHEMICAL_ZODIAC_VARIANTS[5][0],
  6: CHEMICAL_ZODIAC_VARIANTS[6][0],
  7: CHEMICAL_ZODIAC_VARIANTS[7][0],
  8: CHEMICAL_ZODIAC_VARIANTS[8][0],
  9: CHEMICAL_ZODIAC_VARIANTS[9][0],
  10: CHEMICAL_ZODIAC_VARIANTS[10][0],
  11: CHEMICAL_ZODIAC_VARIANTS[11][0],
  12: CHEMICAL_ZODIAC_VARIANTS[12][0],
};

/**
 * Returns a Chemical Zodiac Archetype for a given calendar birth month (1-12) and variant seed.
 */
export function getZodiacArchetype(month: number, seedNumber: number = 0): ChemicalZodiacArchetype {
  const normalized = Math.min(12, Math.max(1, Math.floor(month)));
  const variants = CHEMICAL_ZODIAC_VARIANTS[normalized] || CHEMICAL_ZODIAC_VARIANTS[4];
  const variantIndex = Math.abs(seedNumber) % variants.length;
  return variants[variantIndex] || variants[0];
}

/**
 * Retrieves curriculum-grounded predicted chemical reaction behavior.
 */
export function getChemicalBehavior(block: 's' | 'p' | 'd' | 'f' | 'g', seedNumber: number): string {
  const pool = PREDICTED_BEHAVIORS[block] || PREDICTED_BEHAVIORS.s;
  const index = Math.abs(seedNumber) % pool.length;
  return pool[index];
}
