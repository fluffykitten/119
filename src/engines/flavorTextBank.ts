import type { ChemicalZodiacArchetype } from '../types/element';

/**
 * Curated IGCSE, AS-Level, and Relativistic Superheavy Chemistry laboratory observations.
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
  "Nuclear cross-section measurement indicated a 99.9 percent probability of successfully synthesizing laboratory memories.",
  "Burette tap mysteriously seized at 24.95 mL, causing a sudden cascade of alkaline overflow into the conical flask.",
  "Produced a vivid lilac potassium flame test that persisted long after the nichrome wire loop was returned to the rack.",
  "Exhibited reverse osmosis across the semi-permeable classroom doorway whenever cleanup rosters were announced.",
  "Instantaneously polymerized styrene monomers on the hotplate into an indestructible paperweight shaped like a beaker.",
  "Detected resonating at 400 MHz inside the proton NMR chamber while humming a remarkably accurate rendition of the periodic table song.",
  "Formed a supersaturated solution of sodium ethanoate that crystallized into a warm tower upon a single tap of a glass rod.",
  "Demonstrated a steric hindrance factor so pronounced that no homework assignment could approach the central atom.",
  "Reduced acidified potassium manganate(VII) from deep purple to colorless in record time without heating.",
  "Changed universal indicator paper through all seven rainbow hues simultaneously before settling on an unlisted neon turquoise.",
  "Sublimed directly from solid concentration into gaseous daydreaming without passing through an intermediate liquid phase.",
  "Liberated brisk effervescence of carbon dioxide that extinguished three glowing splints and one birthday candle.",
  "Triggered the laboratory Geiger-Muller counter from four meters away solely through intense pre-exam nervous energy.",
  "Formed a stable zwitterion at physiological pH, remaining simultaneously positive and negative about practical assessments.",
  "Catalyzed the decomposition of hydrogen peroxide into a towering foam column that nearly reached the acoustic ceiling tiles.",
  "Reflux condenser water jacket was connected backward, resulting in a spectacular fountain display across Bench 4.",
  "Measured pH registered at -0.4 on the digital probe, prompting immediate recalibration of the entire department buffer stock.",
  "Synthesized a racemic mixture of optical isomers that rotated plane-polarized light in two contradictory directions at once.",
  "Absorbed moisture from the air so aggressively that this deliquescent specimen dissolved its own paper name tag.",
  "Formed an azeotropic mixture with distilled water that refused to separate despite three hours of fractional distillation.",
  "Displayed a sharp infrared O-H stretch at 3300 cm⁻¹ that broadened dramatically whenever free snacks were mentioned.",
  "Precipitated bright yellow lead(II) iodide crystals that drifted downward like golden snow inside the test tube.",
  "Overcame the Coulomb barrier through sheer stubbornness, fusing two reluctant study groups into a single superheavy team.",
  "Left an unmistakable aroma of oxidized ethanal in the prep room, convincing the technician someone had burnt caramel.",
  "Demonstrated quantum tunneling through the solid wooden laboratory door zero point two seconds after the lunch bell.",
  "Shifted the chromate-dichromate equilibrium from yellow to bright orange merely by glaring at the test tube rack.",
  "Exhibited an anomalous Faraday constant during electrolysis, plating twice the theoretical mass of copper onto the cathode.",
  "Reacted with aqueous iron(III) ions to form a deep blood-red thiocyanate complex worthy of a theatrical stage prop.",
  "Maintained a metastable supercooled liquid state down to minus twelve degrees until disturbed by a falling pencil.",
  "Showed zero retention time on the gas-liquid chromatograph, eluting through the column before the carrier gas even arrived.",
  "Formed a protective passivating oxide layer that rendered the specimen completely impervious to tough viva questions.",
  "Emitted a distinct crimson strontium flare during emission testing that illuminated the back row of the lecture theater.",
  "Underwent Friedel-Crafts alkylation with such enthusiasm that three extra methyl groups attached to the aromatic ring.",
  "Demonstrated extreme hydrophobic repulsion whenever asked to wash out greasy volumetric glassware at the sink.",
  "Calculated bond angle deviated from 109.5 degrees to 104.5 degrees due to the immense repulsion of two lone pairs.",
  "Produced a pungent whiff of ammonia upon warming with sodium hydroxide, turning damp red litmus paper instantly blue.",
  "Achieved a Boltzmann distribution with an unusually thick high-energy tail during Friday afternoon double chemistry.",
  "Formed a Prussian blue coordination precipitate that permanently dyed the cuff of a pristine white laboratory coat.",
  "Exhibited negative thermal expansion, contracting tightly into a defensive ball whenever cold drafts entered the room.",
  "Decomposed thermally into calcium oxide and carbon dioxide while emitting a brilliant white limelight incandescence.",
  "Displayed anomalous Zeeman splitting of spectral lines whenever placed within three meters of the physics department magnets.",
  "Neutralized a spilled droplet of dilute acid with excessive quantities of powdered sodium hydrogencarbonate and dramatic flair.",
  "Operated as a sacrificial anode during group presentations, absorbing all challenging questions to protect teammates.",
  "Crystallized in a body-centered cubic packing arrangement with a packing efficiency that baffled the crystallography software.",
  "Demonstrated a sharp melting point range of 0.2 degrees Celsius, confirming 99.98 percent analytical purity.",
  "Saponified spilled vegetable oil on the benchtop into artisanal soap foam during an unplanned alkaline excursion.",
  "Reduced Fehling's solution from deep azure blue to a lustrous copper mirror via mild aldehydic persuasion.",
  "Showed remarkable photoluminescence under 365 nm blacklight, glowing like a Cherenkov reactor core in the darkroom.",
  "Captured slow thermal neutrons with a cross-section exceeding 2,000 barns, halting the chain reaction of classroom rumors.",
  "Formed a deep royal blue tetraamminecopper(II) complex upon excess ammonia addition, drawing applause from Bench 2.",
  "Exhibited spontaneous chemiluminescence in the dark, glowing bright cyan like a freshly mixed luminol preparation.",
  "Passed through the Buchner funnel under vacuum filtration so rapidly that the filter paper lifted off the porcelain plate.",
  "Demonstrated a partition coefficient strongly favoring the organic layer over the aqueous phase during solvent extraction.",
  "Discharged static electricity onto the analytical balance pan, causing the milligram readout to dance like a tachometer.",
  "Formed a classic silver-gray metallic bead on the charcoal block during blowpipe reduction analysis.",
  "Absorbed exactly one quantum of 488 nm laser light before relaxing via vibrational cascade and a contented sigh.",
  "Maintained Le Chatelier composure when external pressure doubled, smoothly shifting toward the side with fewer gas moles.",
  "Coagulated colloidal gold nanoparticles from ruby red to midnight blue through a sudden spike in ionic strength.",
  "Sustained a stable magnetic levitation above a liquid nitrogen cooled yttrium barium copper oxide superconductor disk.",
  "Converted mechanical mortar-and-pestle grinding energy directly into triboluminescent sparks of blue-violet light.",
  "Reached the equivalence point at pH 8.7, proving that weak acid strong base titrations always finish slightly basic.",
  "Initiated a vibrant Belousov-Zhabotinsky oscillating reaction that pulsed between amber and blue every twelve seconds.",
  "Displayed a prominent radical cation peak at m/z 142 before fragmenting into a textbook tropylium ion.",
  "Formed a silica gel chromatography column so evenly packed that the dye bands separated with laser-sharp precision.",
  "Released a cloud of purple iodine vapor upon gentle warming, subliming straight to glittering needle-like crystals on the watch glass.",
  "Maintained constant pH despite the addition of five milliliters of strong acid, acting as the ultimate classroom buffer.",
  "Exhibited spin-orbit coupling strong enough to rearrange the energy ordering of the outer 7p and 8s subshells.",
  "Produced a squeaky pop test so resonant that the neighbouring biology class dropped their microscope slides.",
  "Dissolved endothermically in water, dropping the beaker temperature low enough to freeze it to the wooden benchtop.",
  "Demonstrated a turnover frequency of 4,500 substrate molecules per second when motivated by extra credit.",
  "Formed a bright canary-yellow precipitate of silver phosphate that dissolved effortlessly in dilute nitric acid.",
  "Showed a classic doublet of quartets in the proton NMR spectrum, revealing three adjacent non-equivalent protons.",
  "Reflected 98 percent of incident thermal infrared radiation, keeping its cool while the Bunsen burners roared.",
  "Underwent vulcanization cross-linking, gaining remarkable elasticity and bouncing back from tough marking schemes.",
  "Evolved nascent hydrogen bubbles along the zinc granule surface with rhythmic, metronomic regularity.",
  "Exhibited Auger electron emission during X-ray photoelectron spectroscopy, confirming deep inner-shell stabilization.",
  "Deflected alpha particles at angles exceeding 150 degrees, replicating Rutherford's gold foil astonishment in miniature.",
  "Stabilized a transient carbocation intermediate via hyperconjugation from three neighbouring alkyl groups.",
  "Turned acidified potassium dichromate(VI) from orange to forest green on contact, confirming primary alcohol oxidation.",
  "Formed a dense white ring of ammonium chloride halfway down the glass diffusion tube in violation of Graham's law.",
  "Operated at the triple point of phase equilibrium, simultaneously boiling and freezing inside the vacuum desiccator.",
  "Generated a crisp 2,4-dinitrophenylhydrazone orange precipitate that melted at the exact literature reference temperature.",
  "Exhibited a Compton scattering wavelength shift of 0.024 angstroms after deflecting high-energy classroom inquiries.",
  "Demonstrated a dipole moment of 3.85 Debye, aligning instantaneously with any applied electrostatic field.",
  "Formed a stable clathrate hydrate cage that trapped stray noble gas atoms inside an icy crystalline framework.",
  "Reduced aqueous silver ions to fractal metallic dendrites that grew across the microscope slide in real time.",
  "Absorbed two photons simultaneously in the near-infrared, fluorescing bright emerald green at the focal point.",
  "Maintained a spotless volumetric pipette calibration, delivering 25.00 mL with a standard deviation of zero.",
  "Exhibited Jahn-Teller distortion in its octahedral complex, elongating two axial bonds to relieve orbital degeneracy.",
  "Released a sweet fruity aroma of ethyl butanoate that convinced the entire corridor someone was making pineapple smoothies.",
  "Demonstrated a glass transition temperature well below room conditions, remaining flexible under intense academic stress.",
  "Produced a brilliant apple-green barium flame coloration that outshone the overhead fluorescent strip lights.",
  "Underwent a concerted Diels-Alder cycloaddition in a single step without leaving any detectable intermediate behind.",
  "Registered a magnetic susceptibility of +4.9 Bohr magnetons, confirming four unpaired electrons in high-spin configuration.",
  "Formed an iridescent bismuth-style hopper crystal with stair-stepped geometric terraces and rainbow oxide interference.",
  "Quenched singlet oxygen radicals at the diffusion-controlled limit, protecting nearby reagents from photo-oxidation.",
  "Shifted the cobalt(II) chloride equilibrium from pink hexaaqua ions to deep blue tetrachloro complexes upon heating.",
  "Exhibited a Mossbauer recoilless gamma resonance absorption peak sharper than a freshly calibrated diamond scribe.",
  "Initiated a self-sustaining thermite-grade aluminothermic reduction that welded two ceramic crucibles together.",
  "Formed a micellar colloidal suspension that scattered a clean Tyndall light beam across the darkened prep room.",
  "Demonstrated zero electrical resistance below 92 Kelvin, expelling all magnetic flux lines via the Meissner effect.",
  "Decolorized alkaline potassium manganate(VII) to a brown manganese(IV) oxide precipitate within three seconds.",
  "Showed an isotope dilution ratio that proved the sample originated inside the Dubna heavy-ion cyclotron.",
  "Maintained tetrahedral geometry around the quaternary ammonium center despite bulky substituent crowding.",
  "Evolved brown fumes of nitrogen dioxide upon heating the nitrate salt, leaving a pale yellow oxide residue.",
  "Achieved complete baseline resolution between structural isomers on the high-performance liquid chromatograph.",
  "Exhibited anomalous Hall effect voltage polarity, indicating hole-dominated charge transport across the valence band.",
  "Formed a stable sandwich metallocene complex with two parallel cyclopentadienyl rings locked in staggered conformation.",
  "Triggered a sudden cloud chamber condensation trail of thick alpha tracks radiating from the central sample holder.",
  "Demonstrated a half-cell potential so negative that it spontaneously reduced water even at pH 14.",
  "Crystallized from hot ethanol in glistening needle-like prisms after slow overnight cooling in the fume hood.",
  "Absorbed neutron flux without undergoing fission, transmuting quietly into the next higher element on the periodic table.",
  "Produced a characteristic brick-red calcium flame flash before settling into a steady golden emission.",
  "Underwent rapid tautomerism between keto and enol forms, refusing to commit to a single structural drawing.",
  "Formed a deep indigo starch-iodine clathrate complex at the exact microsecond the thiosulfate ran out.",
  "Exhibited a high-frequency Raman Stokes shift corresponding to a symmetric breathing mode of the heavy nucleus.",
  "Resisted aqua regia dissolution for forty minutes, rivaling iridium and osmium in noble metallic stubbornness.",
  "Generated a clean Faraday dark space inside the low-pressure gas discharge tube at 0.5 Torr.",
  "Demonstrated anomalous Grignard reagent reactivity, attacking atmospheric carbon dioxide before the stopper was fitted.",
  "Formed a silky white barium sulfate precipitate upon addition of acidified barium chloride, confirming sulfate presence.",
  "Exhibited a prominent Cotton effect in circular dichroism spectroscopy, proving homochiral optical purity.",
  "Maintained laminar flow through the capillary viscometer with a Reynolds number well below the turbulence threshold.",
  "Released violet flashes of ionized argon plasma when approached by a Tesla coil leak detector.",
  "Underwent an intramolecular Cannizzaro disproportionation, simultaneously oxidizing and reducing itself without external help.",
  "Displayed a sharp Bragg diffraction peak at two-theta equals 28.4 degrees under copper K-alpha X-ray illumination.",
  "Formed a brightly fluorescent fluorescein dye trail that mapped the exact convection currents inside the 2-liter beaker.",
  "Exhibited relativistic spin-polarized electron tunneling across a two-nanometer aluminum oxide barrier.",
  "Neutralized excess thionyl chloride with calm stoic precision while the fume hood scrubber worked overtime.",
  "Produced a scarlet red precipitate of mercury(II) iodide that vanished upon excess potassium iodide addition.",
  "Demonstrated a cryo-pumping effect that lowered the vacuum manifold pressure into the ultra-high 10⁻⁹ Torr regime.",
  "Formed a Buckyball endohedral complex by trapping a single lanthanide ion inside a sixty-carbon fullerene sphere.",
  "Shifted UV-visible absorption maximum by 45 nm toward the red end via bathochromic solvent polarity effects.",
  "Exhibited a clean first-order radioactive decay curve on semilog graph paper with zero outlier points.",
  "Converted ortho-hydrogen to para-hydrogen over a paramagnetic ferric oxide catalyst at cryogenic temperatures.",
  "Formed a lilac-colored hexaaquatitanium(III) solution via zinc-amalgam reduction under an inert nitrogen blanket.",
  "Demonstrated a Born-Oppenheimer breakdown where nuclear and electronic motions coupled into a single vibronic dance.",
  "Precipitated golden spangles of lead(II) chloride that redissolved completely when the solution was brought to a boil.",
  "Exhibited giant magnetoresistance across alternating ferromagnetic and non-magnetic atomic layers.",
  "Released a crisp peppermint aroma of methyl salicylate during ester hydrolysis practice on Bench 6.",
  "Maintained an unbroken siphon flow between two reservoirs, defying air bubbles and hydrostatic skepticism.",
  "Formed a pyrophoric iron sulfide crust that glowed dull cherry red when exposed to laboratory air.",
  "Displayed a clean AB quartet splitting pattern in the 1H NMR spectrum with a coupling constant of 12 Hertz.",
  "Underwent a pinacol-pinacolone rearrangement that migrated a methyl group faster than the teaching assistant could blink.",
  "Exhibited a Debye temperature of 1,850 Kelvin, indicating diamond-like phonon stiffness in the crystal lattice.",
  "Turned moist starch-iodide paper dark blue-black from across the bench via trace oxidizing vapor diffusion.",
  "Formed a stable five-coordinate trigonal bipyramidal complex that underwent rapid Berry pseudorotation at room temperature.",
  "Demonstrated a Work Function of just 1.9 electronvolts, emitting photoelectrons under ordinary green LED illumination.",
  "Co-precipitated trace lanthanide impurities into a neat fluoride carrier pellet for inductively coupled plasma analysis.",
  "Exhibited a negative Joule-Thomson coefficient, warming slightly upon adiabatic expansion through the porous plug.",
  "Formed a deep emerald-green complex with ethylenediaminetetraacetic acid in a strict 1:1 stoichiometric ratio.",
  "Sustained a standing acoustic wave inside the Kundt's resonance tube that arranged cork dust into twelve neat nodes.",
  "Reduced titanium(IV) chloride vapor with molten magnesium to yield pure metallic sponge and a textbook enthalpy release.",
  "Displayed an anomalous isotope shift in atomic emission lines due to the finite volume of its deformed superheavy nucleus.",
  "Formed a stable blue solution of solvated electrons when dissolved in anhydrous liquid ammonia at minus 40 degrees.",
  "Underwent clean beta-minus decay while conserving lepton number, momentum, and classroom composure.",
  "Exhibited a Soret thermal diffusion gradient that concentrated heavy isotopes at the cold wall of the column.",
  "Produced a distinct garlic-like odor of arsine-free organophosphines that cleared the front row in four seconds.",
  "Demonstrated an activation entropy that was strongly negative, proving a highly ordered transition state geometry.",
  "Formed a crystalline picrate derivative with sharp needle morphology suitable for single-crystal X-ray diffraction.",
  "Exhibited fractional quantum Hall plateaus under high magnetic flux, quantizing transverse resistance to h over e-squared.",
  "Decolorized acidified potassium permanganate and bromine water alike, confirming multiple degrees of unsaturation.",
  "Maintained a steady effusion rate through the Knudsen cell orifice, allowing direct vapor pressure determination.",
  "Formed a vibrant turquoise copper(II) carbonate basic precipitate that patinated the inside of the evaporating dish.",
  "Demonstrated a relativistic Dirac-Fock orbital energy splitting of 4.2 electronvolts between the 8p1/2 and 8p3/2 subshells.",
  "Catalyzed a cross-coupling Suzuki reaction in aqueous media with 99.4 percent isolated yield before the bell rang.",
  "Exhibited a clean zero-phonon line in low-temperature fluorescence spectroscopy, confirming defect-free lattice incorporation.",
  "Formed a classic purple Ruhemann's dye complex upon warming with ninhydrin spray on the TLC plate.",
  "Sustained a stable Taylor cone electrospray plume at 3.2 kilovolts, feeding doubly charged ions into the mass analyzer.",
  "Demonstrated a critical micelle concentration of 8.2 millimolar, dropping surface tension by forty dynes per centimeter.",
  "Underwent clean electrocyclic ring closure under thermal control in strict accordance with Woodward-Hoffmann symmetry rules.",
  "Exhibited a super-allowed Fermi beta transition with a log-ft value of 3.49, confirming isospin symmetry.",
  "Formed a glassy borax bead that turned cobalt blue in the oxidizing flame and remained clear in the reducing zone.",
  "Demonstrated a Casimir attractive force between two uncharged conductive plates separated by sub-micron tolerances.",
  "Released a sharp burst of K-alpha characteristic X-rays when bombarded by the scanning electron microscope beam.",
  "Maintained a persistent superfluid film flow of 30 centimeters per second up the polished inner wall of the Dewar.",
  "Synthesized a flawless single-walled carbon nanotube forest via chemical vapor deposition during the afternoon lab session."
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
 * Picks a witty IGCSE/AS-level/superheavy observation based on an integer seed.
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
