import React from 'react';
import { Download, Printer, RefreshCw, Layers, Sliders, Check, ArrowRight, Crop, Sparkles } from 'lucide-react';
import type { ShaderMode, FormFactor, DetailLevel, CardRarity } from '../types/element';

interface ControlPanelProps {
  currentShader: ShaderMode;
  onSelectShader: (mode: ShaderMode) => void;
  formFactor: FormFactor;
  onChangeFormFactor: (form: FormFactor) => void;
  detailLevel: DetailLevel;
  onChangeDetailLevel: (level: DetailLevel) => void;
  rarity: CardRarity;
  hasRerolled?: boolean;
  onRerollIsotope: () => void;
  onOpenFramingModal: () => void;
  onDownloadPng: () => void;
  onPrintA4: () => void;
  onSaveToWall: () => void;
  isSavedToWall: boolean;
  onNewSynthesis: () => void;
  isProcessingShader: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentShader,
  onSelectShader,
  formFactor,
  onChangeFormFactor,
  detailLevel,
  onChangeDetailLevel,
  rarity,
  hasRerolled = false,
  onRerollIsotope,
  onOpenFramingModal,
  onDownloadPng,
  onPrintA4,
  onSaveToWall,
  isSavedToWall,
  onNewSynthesis,
  isProcessingShader,
}) => {
  const shaders: { id: ShaderMode; label: string; desc: string }[] = [
    { id: 'cherenkov', label: 'Cherenkov Blue', desc: 'Electric radiation glow' },
    { id: 'sem', label: 'SEM Micrograph', desc: 'Microscopic scanlines' },
    { id: 'synchrotron', label: 'Thermal Infrared', desc: 'False-color heatmap' },
    { id: 'halide', label: 'Archival Halide', desc: 'Monochrome silver print' },
  ];

  const isRare = rarity === 'rare';
  const isLegendary = rarity === 'legendary';

  return (
    <div className="no-print w-full max-w-4xl mx-auto mt-8 bg-slate-50 border border-slate-300 rounded-lg p-5 sm:p-6 shadow-sm">
      {/* TCG Rarity Status & Pull Tier Ribbon */}
      <div className="mb-4 pb-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-bold uppercase tracking-wider text-[11px]">
            Card Rarity Tier:
          </span>
          {isLegendary ? (
            <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-300 text-slate-950 font-extrabold flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              ✦ LEGENDARY HOLOGRAPHIC FOIL (Top 10% Pull)
            </span>
          ) : isRare ? (
            <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-extrabold flex items-center gap-1 shadow-xs border border-amber-500">
              <span>★</span>
              <span>RARE GILDED GOLD (20% Pull)</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold border border-slate-300">
              COMMON ARCHIVAL MATTE (70% Pull)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Shaders & Presentation Toggles */}
        <div>
          {/* Scientific Shader Selection */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                Scientific Shaders {isProcessingShader && <span className="text-cyan-700 animate-pulse ml-2">[Filtering...]</span>}
              </span>
              <button
                type="button"
                onClick={onOpenFramingModal}
                className="text-[11px] font-mono text-cyan-800 hover:text-cyan-950 underline flex items-center gap-1 cursor-pointer"
                title="Adjust photo zoom, pan, and centering"
              >
                <Crop className="w-3 h-3" />
                <span>Adjust Photo Framing</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {shaders.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectShader(s.id)}
                  disabled={isProcessingShader}
                  className={`min-h-[44px] p-2 text-left rounded border text-xs font-mono transition-colors cursor-pointer flex flex-col justify-between ${
                    currentShader === s.id
                      ? 'border-slate-900 bg-slate-900 text-slate-50 font-semibold shadow-xs'
                      : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="font-bold">{s.label}</span>
                  <span className={`text-[10px] ${currentShader === s.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Factor & Detail Switches */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                Format
              </span>
              <div className="flex bg-slate-200 p-0.5 rounded border border-slate-300">
                <button
                  type="button"
                  onClick={() => onChangeFormFactor('card')}
                  className={`flex-1 min-h-[38px] text-[11px] font-mono rounded transition-colors ${
                    formFactor === 'card'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => onChangeFormFactor('dossier')}
                  className={`flex-1 min-h-[38px] text-[11px] font-mono rounded transition-colors ${
                    formFactor === 'dossier'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Dossier
                </button>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
                Detail Level
              </span>
              <div className="flex bg-slate-200 p-0.5 rounded border border-slate-300">
                <button
                  type="button"
                  onClick={() => onChangeDetailLevel('academic')}
                  className={`flex-1 min-h-[38px] text-[11px] font-mono rounded transition-colors ${
                    detailLevel === 'academic'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Academic
                </button>
                <button
                  type="button"
                  onClick={() => onChangeDetailLevel('streamlined')}
                  className={`flex-1 min-h-[38px] text-[11px] font-mono rounded transition-colors ${
                    detailLevel === 'streamlined'
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Summary
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions (Export, Print, Re-roll, Wall) */}
        <div className="flex flex-col justify-between pt-2 md:pt-0 md:border-l md:border-slate-200 md:pl-6">
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider block mb-1">
              Document Actions
            </span>

            {/* Download PNG */}
            <button
              type="button"
              onClick={onDownloadPng}
              className="w-full min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download High-DPI PNG (3x)</span>
            </button>

            {/* Print A4 */}
            <button
              type="button"
              onClick={onPrintA4}
              className="w-full min-h-[44px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-mono font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print to A4 Paper</span>
            </button>

            {/* Re-roll Isotope & TCG Rarity Pull (Single attempt allowed) */}
            <button
              type="button"
              onClick={onRerollIsotope}
              disabled={hasRerolled}
              className={`w-full min-h-[44px] border rounded flex items-center justify-center gap-2 text-xs font-mono font-semibold transition-colors ${
                hasRerolled
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800 cursor-pointer'
              }`}
              title={
                hasRerolled
                  ? 'Isotope synthesis locked (1 re-roll limit reached)'
                  : 'Re-roll isotope configuration (1 attempt remaining)'
              }
            >
              <RefreshCw className={`w-3.5 h-3.5 ${hasRerolled ? 'text-slate-400' : 'text-slate-600'}`} />
              <span>{hasRerolled ? 'Isotope Locked (0 re-rolls left)' : 'Re-roll Isotope (1 left)'}</span>
            </button>
          </div>

          {/* Wall & Navigation Section */}
          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={onSaveToWall}
              className={`w-full min-h-[44px] rounded text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSavedToWall
                  ? 'bg-emerald-700 text-white'
                  : 'bg-cyan-700 hover:bg-cyan-800 text-white'
              }`}
            >
              {isSavedToWall ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Pinned to Classroom Wall</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Pin to Classroom Wall &amp; View Roster</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onNewSynthesis}
              className="w-full min-h-[40px] text-xs font-mono text-slate-600 hover:text-slate-900 underline text-center cursor-pointer"
            >
              + Synthesize Another Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
