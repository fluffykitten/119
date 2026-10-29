import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AlertTriangle } from 'lucide-react';
import type { StudentElement, ShaderMode, FormFactor, DetailLevel, CardRarity } from './types/element';
import { Header } from './components/Header';
import { IntakeChamber } from './components/IntakeChamber';
import { SynthesisLoader } from './components/SynthesisLoader';
import { ElementCard } from './components/ElementCard';
import { ControlPanel } from './components/ControlPanel';
import { ClassroomWall } from './components/ClassroomWall';
import { SpecimenViewBar } from './components/SpecimenViewBar';
import { TabbyCatBadge } from './components/TabbyCatBadge';
import { PhotoFramingModal } from './components/PhotoFramingModal';
import { analyzeImagePixels } from './engines/pixelAnalyzer';
import { applyScientificShader } from './engines/canvasShaders';
import { generateStudentElement, deriveStudentElementName } from './engines/chemistryGenerator';
import { queryGeminiVisionAnalysis } from './engines/geminiVision';
import { downloadCardAsPng, triggerPrintDialog } from './utils/exportCanvas';
import { soundEffects } from './utils/audioSynthesizer';
import { fetchRoomRoster, saveElementToRoom, deleteElementFromRoom } from './utils/wallApi';

const ROSTER_STORAGE_KEY = 'element119_classroom_roster';
const ROOM_STORAGE_KEY = 'element119_current_room';
const MY_CARDS_STORAGE_KEY = 'element119_my_cards';

export function App() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeElement, setActiveElement] = useState<StudentElement | null>(null);
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidatePhoto, setCandidatePhoto] = useState<string>('');
  const [pendingRarity, setPendingRarity] = useState<CardRarity>('common');
  const [formFactor, setFormFactor] = useState<FormFactor>(() => {
    if (typeof window !== 'undefined') {
      const formatParam = new URLSearchParams(window.location.search).get('format');
      if (formatParam === 'dossier' || formatParam === 'card') {
        return formatParam;
      }
    }
    return 'card';
  });
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('academic');
  const [isFramingModalOpen, setIsFramingModalOpen] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(new URLSearchParams(window.location.search).get('element'));
    }
    return false;
  });
  const [isLoadingSpecimen, setIsLoadingSpecimen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(new URLSearchParams(window.location.search).get('element'));
    }
    return false;
  });
  const [specimenNotFound, setSpecimenNotFound] = useState(false);
  const [roster, setRoster] = useState<StudentElement[]>(() => {
    try {
      const saved = localStorage.getItem(ROSTER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read saved classroom roster:', err);
    }
    return [];
  });
  const [audioMuted, setAudioMuted] = useState<boolean>(soundEffects.getMuted());
  const [isProcessingShader, setIsProcessingShader] = useState(false);

  // Online Classroom Room & Card Ownership
  const [currentRoomCode, setCurrentRoomCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) return roomParam.toUpperCase().trim();
      return localStorage.getItem(ROOM_STORAGE_KEY) || '';
    }
    return '';
  });

  const [myCardIds, setMyCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(MY_CARDS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const synthesisPromiseRef = useRef<Promise<StudentElement> | null>(null);

  // Track cards created in this browser
  const addMyCardId = (id: string) => {
    setMyCardIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(MY_CARDS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Save roster to localStorage when updated
  const updateRoster = (newRoster: StudentElement[]) => {
    setRoster(newRoster);
    try {
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(newRoster));
    } catch (err) {
      console.warn('Could not save classroom roster to storage:', err);
    }
  };

  // Join or switch online classroom room
  const handleJoinRoom = async (roomCode: string) => {
    const clean = roomCode.trim().toUpperCase();
    if (!clean) return;
    setCurrentRoomCode(clean);
    try {
      localStorage.setItem(ROOM_STORAGE_KEY, clean);
      const url = new URL(window.location.href);
      url.searchParams.set('room', clean);
      window.history.replaceState({}, '', url.toString());
    } catch {}

    setIsSyncing(true);
    let onlineRoster = await fetchRoomRoster(clean);

    // If this device already has synthesized cards locally, push them to the joined room
    if (roster.length > 0) {
      const myLocalCards = roster.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoster || !onlineRoster.some((o) => o.id === card.id)
      );
      if (myLocalCards.length > 0) {
        for (const card of myLocalCards) {
          await saveElementToRoom(clean, card);
        }
        onlineRoster = await fetchRoomRoster(clean);
      }
    }

    setIsSyncing(false);
    if (onlineRoster) {
      updateRoster(onlineRoster);
    }
  };

  // Leave online room and return to local offline roster
  const handleLeaveRoom = () => {
    setCurrentRoomCode('');
    try {
      localStorage.removeItem(ROOM_STORAGE_KEY);
      const url = new URL(window.location.href);
      url.searchParams.delete('room');
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  // Refresh classroom wall
  const handleRefreshWall = async () => {
    if (!currentRoomCode) return;
    setIsSyncing(true);
    const online = await fetchRoomRoster(currentRoomCode);

    if (online) {
      // If we have local cards not yet on the server, push them
      const missingOnServer = roster.filter(
        (card) => myCardIds.includes(card.id) && !online.some((o) => o.id === card.id)
      );
      if (missingOnServer.length > 0) {
        for (const card of missingOnServer) {
          await saveElementToRoom(currentRoomCode, card);
        }
        const updated = await fetchRoomRoster(currentRoomCode);
        setIsSyncing(false);
        if (updated) {
          updateRoster(updated);
          return;
        }
      }
      setIsSyncing(false);
      updateRoster(online);
    } else {
      setIsSyncing(false);
    }
  };

  // Auto-sync and poll when on the Classroom Wall
  useEffect(() => {
    if (!currentRoomCode) return;

    let isSubscribed = true;
    const sync = async () => {
      setIsSyncing(true);
      const online = await fetchRoomRoster(currentRoomCode);
      if (isSubscribed) {
        setIsSyncing(false);
        if (online) {
          updateRoster(online);
        }
      }
    };

    const timer = setTimeout(() => {
      void sync();
    }, 0);

    let interval: ReturnType<typeof setInterval> | null = null;
    if (currentStep === 4) {
      interval = setInterval(() => {
        void sync();
      }, 12000);
    }

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [currentRoomCode, currentStep]);

  // Deep-link check: ?element=ID auto-opens that card in View-Only Specimen Inspection mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const elementParam = params.get('element');
    const roomParam = params.get('room');
    if (!elementParam) return;

    // 1. Check if card exists in local roster
    const localFound = roster.find((item) => item.id === elementParam);
    if (localFound) {
      const timeoutId = setTimeout(() => {
        setActiveElement(localFound);
        setIsLoadingSpecimen(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    // 2. If not found in local roster, check remote room
    const targetRoom = roomParam || currentRoomCode;
    if (targetRoom) {
      let isSubscribed = true;
      const timeoutId = setTimeout(() => {
        setIsLoadingSpecimen(true);
      }, 0);

      fetchRoomRoster(targetRoom)
        .then((online) => {
          if (!isSubscribed) return;
          setIsLoadingSpecimen(false);
          if (online) {
            const remoteFound = online.find((item) => item.id === elementParam);
            if (remoteFound) {
              setActiveElement(remoteFound);
              return;
            }
          }
          setSpecimenNotFound(true);
        })
        .catch(() => {
          if (!isSubscribed) return;
          setIsLoadingSpecimen(false);
          setSpecimenNotFound(true);
        });

      return () => {
        isSubscribed = false;
        clearTimeout(timeoutId);
      };
    } else {
      const timeoutId = setTimeout(() => {
        setIsLoadingSpecimen(false);
        setSpecimenNotFound(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [roster, currentRoomCode]);

  // Step 1 -> Step 2: Trigger particle accelerator collision sequence
  const handleBeginSynthesis = async (studentName: string, rawPhotoDataUrl: string, birthMonth?: number) => {
    setCandidateName(studentName);
    setCandidatePhoto(rawPhotoDataUrl);
    setCurrentStep(2);

    // Asynchronously compute shaders, chemistry, and optional vision analysis in parallel
    synthesisPromiseRef.current = (async () => {
      // 1. Analyze pixels for optimal shader recommendation
      const pixelMetrics = await analyzeImagePixels(rawPhotoDataUrl);
      let chosenShader: ShaderMode = pixelMetrics.recommendedShader;

      const elementName = deriveStudentElementName(studentName);

      // 2. Query Gemini Vision in parallel with graceful timeout
      const visionPromise = queryGeminiVisionAnalysis(rawPhotoDataUrl, studentName, elementName);

      // 3. Render initial scientific shader on offscreen canvas
      const filteredPhoto = await applyScientificShader(rawPhotoDataUrl, chosenShader);

      // 4. Generate core deterministic chemistry stats & TCG pack rarity roll
      const element = generateStudentElement(
        studentName,
        rawPhotoDataUrl,
        chosenShader,
        filteredPhoto,
        undefined,
        birthMonth
      );
      setPendingRarity(element.rarity);

      // 5. Integrate Vision response if available
      try {
        const visionResult = await visionPromise;
        if (visionResult?.flavorNote) {
          let note = visionResult.flavorNote;
          if (element.elementName) {
            note = note.replace(/\bElement\s+[A-Za-z]+\b/g, `Element ${element.elementName}`);
            note = note.replace(/\bSpecimen\s+[A-Za-z]+\b/g, `Specimen ${element.elementName}`);
          }
          element.flavorNote = note;
          if (visionResult.recommendedShader) {
            element.shaderMode = visionResult.recommendedShader;
            element.filteredPhotoDataUrl = await applyScientificShader(rawPhotoDataUrl, visionResult.recommendedShader);
          }
        }
      } catch {
        // Fallback to deterministic curriculum text
      }

      return element;
    })();
  };

  // Step 2 Collider completion handler
  const handleColliderComplete = async () => {
    if (synthesisPromiseRef.current) {
      try {
        const finishedElement = await synthesisPromiseRef.current;
        setActiveElement(finishedElement);
        setCurrentStep(3);

        // Confetti burst tailored to card rarity!
        try {
          if (finishedElement.rarity === 'legendary') {
            confetti({
              particleCount: 90,
              spread: 85,
              origin: { y: 0.6 },
              colors: ['#ec4899', '#06b6d4', '#fbbf24', '#a855f7', '#ffffff'],
            });
          } else if (finishedElement.rarity === 'rare') {
            confetti({
              particleCount: 65,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff'],
            });
          } else {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.65 },
              colors: ['#0e7490', '#38bdf8', '#0f172a', '#e2e8f0'],
            });
          }
        } catch {
          // Confetti silent fail if disabled
        }
      } catch (err) {
        console.error('Synthesis calculation error:', err);
        setCurrentStep(1);
      }
    } else {
      setCurrentStep(1);
    }
  };

  // Switch scientific shader filter
  const handleSelectShader = async (mode: ShaderMode) => {
    if (!activeElement || isProcessingShader || activeElement.shaderMode === mode) return;
    setIsProcessingShader(true);
    try {
      const newFilteredPhoto = await applyScientificShader(activeElement.rawPhotoDataUrl, mode);
      const updated: StudentElement = {
        ...activeElement,
        shaderMode: mode,
        filteredPhotoDataUrl: newFilteredPhoto,
      };
      setActiveElement(updated);

      // Update in roster if already saved
      if (roster.some((item) => item.id === updated.id)) {
        updateRoster(roster.map((item) => (item.id === updated.id ? updated : item)));
      }
    } catch (err) {
      console.error('Failed to apply shader:', err);
    } finally {
      setIsProcessingShader(false);
    }
  };

  // Apply re-framing from modal
  const handleApplyFraming = async (newFramedPhoto: string, zoom: number, pan: { x: number; y: number }) => {
    if (!activeElement) return;
    setIsProcessingShader(true);
    try {
      const newFilteredPhoto = await applyScientificShader(newFramedPhoto, activeElement.shaderMode);
      const updated: StudentElement = {
        ...activeElement,
        rawPhotoDataUrl: newFramedPhoto,
        filteredPhotoDataUrl: newFilteredPhoto,
        photoFraming: { zoom, panX: pan.x, panY: pan.y },
      };
      setActiveElement(updated);

      if (roster.some((item) => item.id === updated.id)) {
        updateRoster(roster.map((item) => (item.id === updated.id ? updated : item)));
      }
    } catch (err) {
      console.error('Failed to apply framing adjustment:', err);
    } finally {
      setIsProcessingShader(false);
    }
  };

  // Re-roll isotope variant and TCG rarity drop (allowed strictly once per student)
  const handleRerollIsotope = () => {
    if (!activeElement || activeElement.hasRerolled) return;

    const confirmed = window.confirm(
      'Are you sure you want to re-roll this isotope?\n\nYou can only re-roll once per student synthesis.'
    );
    if (!confirmed) return;

    const randomSeed = Math.floor(Math.random() * 999999);
    const newElement = generateStudentElement(
      activeElement.studentName,
      activeElement.rawPhotoDataUrl,
      activeElement.shaderMode,
      activeElement.filteredPhotoDataUrl,
      randomSeed,
      activeElement.birthMonth
    );

    // Retain photo framing adjustments and lock isotope
    newElement.hasRerolled = true;
    if (activeElement.photoFraming) {
      newElement.photoFraming = activeElement.photoFraming;
    }

    setActiveElement(newElement);

    if (roster.some((item) => item.id === activeElement.id)) {
      updateRoster(roster.map((item) => (item.id === activeElement.id ? newElement : item)));
    }
  };

  // Save current student to classroom periodic shelf
  const handleSaveToWall = async () => {
    if (!activeElement) return;
    addMyCardId(activeElement.id);

    const exists = roster.some((item) => item.id === activeElement.id);
    const nextRoster = exists
      ? roster.map((item) => (item.id === activeElement.id ? activeElement : item))
      : [activeElement, ...roster];
    updateRoster(nextRoster);

    // If connected to online room, sync to Cloudflare KV before transitioning
    if (currentRoomCode) {
      setIsSyncing(true);
      await saveElementToRoom(currentRoomCode, activeElement);
      setIsSyncing(false);
    }

    setCurrentStep(4);
  };

  // Download high-resolution PNG
  const handleDownloadPng = async () => {
    if (!cardContainerRef.current || !activeElement) return;
    try {
      await downloadCardAsPng(cardContainerRef.current, activeElement, formFactor);
    } catch (err) {
      console.error('PNG export error:', err);
      alert('Unable to export PNG image. Please try again.');
    }
  };

  // Print A4 single dossier or card
  const handlePrintA4 = () => {
    if (!activeElement) return;
    triggerPrintDialog(`IUPAC Dossier - ${activeElement.elementName} (${activeElement.symbol})`);
  };

  // Audio mute toggle
  const handleToggleAudio = () => {
    const isMuted = soundEffects.toggleMute();
    setAudioMuted(isMuted);
  };

  const isSavedToWall = activeElement
    ? roster.some((item) => item.id === activeElement.id)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Top Application Bar (Hidden in View-Only Specimen Mode) */}
      {!isViewOnly && (
        <Header
          currentStep={currentStep}
          onNavigateStep={(step) => setCurrentStep(step)}
          savedCount={roster.length}
          hasActiveElement={activeElement !== null}
          audioMuted={audioMuted}
          onToggleAudio={handleToggleAudio}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {isViewOnly ? (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {isLoadingSpecimen ? (
              <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-cyan-600 font-mono text-[11px] font-extrabold">
                    IUPAC
                  </div>
                </div>
                <h2 className="text-base font-mono font-bold text-slate-800 tracking-wider uppercase mb-1">
                  Accessing Digital Vault
                </h2>
                <p className="text-xs font-mono text-slate-500">
                  Retrieving specimen signature from classroom archive...
                </p>
              </div>
            ) : specimenNotFound || !activeElement ? (
              <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-mono font-extrabold text-slate-900 tracking-tight mb-2">
                  Specimen Record Not Found
                </h2>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  The requested element ID could not be retrieved from the active classroom vault. The specimen may have been decommissioned or the verification link is incomplete.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('element');
                    url.searchParams.delete('format');
                    window.history.replaceState({}, '', url.toString());
                    setIsViewOnly(false);
                    setSpecimenNotFound(false);
                    setActiveElement(null);
                    setCurrentStep(1);
                  }}
                  className="min-h-[44px] px-5 bg-cyan-700 hover:bg-cyan-800 text-white rounded font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  Enter Synthesis Chamber
                </button>
              </div>
            ) : (
              <>
                {/* Specimen Card Display */}
                <div className="flex justify-center overflow-x-auto py-2">
                  <div ref={cardContainerRef} className="shrink-0 flex justify-center">
                    <ElementCard
                      element={activeElement}
                      formFactor={formFactor}
                      detailLevel={detailLevel}
                      roomCode={currentRoomCode}
                    />
                  </div>
                </div>

                {/* Minimal View-Only Specimen Bar */}
                <SpecimenViewBar
                  formFactor={formFactor}
                  onChangeFormFactor={setFormFactor}
                  onDownloadPng={handleDownloadPng}
                  atomicNumber={activeElement.atomicNumber}
                  symbol={activeElement.symbol}
                />
              </>
            )}
          </div>
        ) : (
          <>
            {/* Step 1: Intake Chamber */}
            {currentStep === 1 && (
              <IntakeChamber onBeginSynthesis={handleBeginSynthesis} />
            )}

            {/* Step 2: Particle Accelerator Collision Sequence */}
            {currentStep === 2 && (
              <SynthesisLoader
                studentName={candidateName}
                photoDataUrl={candidatePhoto}
                rarity={pendingRarity}
                onComplete={handleColliderComplete}
              />
            )}

            {/* Step 3: Dossier & Trading Card Studio */}
            {currentStep === 3 && activeElement && (
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-center overflow-x-auto py-2">
                  <div ref={cardContainerRef} className="shrink-0 flex justify-center">
                    <ElementCard
                      element={activeElement}
                      formFactor={formFactor}
                      detailLevel={detailLevel}
                      roomCode={currentRoomCode}
                    />
                  </div>
                </div>

                <ControlPanel
                  currentShader={activeElement.shaderMode}
                  onSelectShader={handleSelectShader}
                  formFactor={formFactor}
                  onChangeFormFactor={setFormFactor}
                  detailLevel={detailLevel}
                  onChangeDetailLevel={setDetailLevel}
                  rarity={activeElement.rarity}
                  hasRerolled={activeElement.hasRerolled}
                  onRerollIsotope={handleRerollIsotope}
                  onOpenFramingModal={() => setIsFramingModalOpen(true)}
                  onDownloadPng={handleDownloadPng}
                  onPrintA4={handlePrintA4}
                  onSaveToWall={handleSaveToWall}
                  isSavedToWall={isSavedToWall}
                  onNewSynthesis={() => {
                    setActiveElement(null);
                    setCurrentStep(1);
                  }}
                  isProcessingShader={isProcessingShader}
                />

                {/* Photo Framing Adjustment Modal */}
                {isFramingModalOpen && (
                  <PhotoFramingModal
                    originalPhotoDataUrl={activeElement.rawPhotoDataUrl}
                    initialZoom={activeElement.photoFraming?.zoom || 1}
                    initialPan={{
                      x: activeElement.photoFraming?.panX || 0,
                      y: activeElement.photoFraming?.panY || 0,
                    }}
                    onApplyFraming={handleApplyFraming}
                    onClose={() => setIsFramingModalOpen(false)}
                  />
                )}
              </div>
            )}

            {/* Step 4: Classroom Periodic Table Wall & Batch A4 Print */}
            {currentStep === 4 && (
              <ClassroomWall
                roster={roster}
                currentRoomCode={currentRoomCode}
                onJoinRoom={handleJoinRoom}
                onLeaveRoom={handleLeaveRoom}
                isSyncing={isSyncing}
                onRefreshWall={handleRefreshWall}
                myCardIds={myCardIds}
                onSelectStudent={(selected) => {
                  setActiveElement(selected);
                  setCurrentStep(3);
                }}
                onDeleteStudent={(id) => {
                  updateRoster(roster.filter((item) => item.id !== id));
                  if (currentRoomCode) {
                    deleteElementFromRoom(currentRoomCode, id);
                  }
                }}
                onClearRoster={() => {
                  updateRoster([]);
                }}
                onImportRoster={(imported) => {
                  updateRoster(imported);
                }}
                onNewSynthesis={() => {
                  setActiveElement(null);
                  setCurrentStep(1);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Footer Attribution Strip */}
      <TabbyCatBadge variant="footer" className="no-print mt-auto" />
    </div>
  );
}

export default App;
