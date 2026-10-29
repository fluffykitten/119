import React from 'react';
import { Volume2, VolumeX, Grid, Atom, Camera, FileText, Search } from 'lucide-react';

interface HeaderProps {
  currentStep: 1 | 2 | 3 | 4;
  onNavigateStep: (step: 1 | 2 | 3 | 4) => void;
  savedCount: number;
  hasActiveElement: boolean;
  audioMuted: boolean;
  onToggleAudio: () => void;
  onOpenLookup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigateStep,
  savedCount,
  hasActiveElement,
  audioMuted,
  onToggleAudio,
  onOpenLookup,
}) => {
  return (
    <header className="no-print bg-slate-50 border-b border-slate-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-slate-900 text-slate-100 flex items-center justify-center font-mono font-bold text-base shadow-sm">
            119
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900">
                ELEMENT 119+
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono tracking-tight hidden sm:block">
              Superheavy Student Synthesis Dossier &bull; Period 8
            </p>
          </div>
        </div>

        {/* Center: Step Navigation Indicator */}
        <nav aria-label="Synthesis Steps" className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onNavigateStep(1)}
            className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'bg-slate-900 text-slate-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>1. Intake</span>
          </button>

          <span className="text-slate-400 font-mono text-xs">/</span>

          <button
            type="button"
            onClick={() => onNavigateStep(2)}
            disabled={!hasActiveElement && currentStep === 1}
            className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              currentStep === 2
                ? 'bg-slate-900 text-slate-50 font-bold'
                : !hasActiveElement && currentStep === 1
                ? 'text-slate-400 cursor-not-allowed opacity-60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>2. Collider</span>
          </button>

          <span className="text-slate-400 font-mono text-xs">/</span>

          <button
            type="button"
            onClick={() => onNavigateStep(3)}
            disabled={!hasActiveElement}
            className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              currentStep === 3
                ? 'bg-slate-900 text-slate-50 font-bold'
                : !hasActiveElement
                ? 'text-slate-400 cursor-not-allowed opacity-60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Dossier</span>
          </button>

          <span className="text-slate-400 font-mono text-xs">/</span>

          <button
            type="button"
            onClick={() => onNavigateStep(4)}
            className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              currentStep === 4
                ? 'bg-slate-900 text-slate-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>4. Wall</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-cyan-700 text-white text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Specimen Lookup & Audio Toggle */}
        <div className="flex items-center gap-2">
          {onOpenLookup && (
            <button
              type="button"
              onClick={onOpenLookup}
              className="min-h-[40px] px-3 rounded-lg border border-slate-300 hover:border-cyan-500 bg-white hover:bg-slate-50 text-slate-800 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="Verify Specimen by ID Code"
            >
              <Search className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden sm:inline">Verify Specimen</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={audioMuted ? 'Unmute particle sound effects' : 'Mute particle sound effects'}
            className="min-h-[40px] min-w-[40px] p-2 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
            title={audioMuted ? 'Sound Muted' : 'Sound Active'}
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
