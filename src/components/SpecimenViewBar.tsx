import React from 'react';
import type { FormFactor } from '../types/element';
import { CreditCard, FileText, Download, ShieldCheck, X } from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface SpecimenViewBarProps {
  formFactor: FormFactor;
  onChangeFormFactor: (ff: FormFactor) => void;
  onDownloadPng: () => void;
  atomicNumber: number;
  symbol: string;
  onExitViewOnly?: () => void;
}

export const SpecimenViewBar: React.FC<SpecimenViewBarProps> = ({
  formFactor,
  onChangeFormFactor,
  onDownloadPng,
  atomicNumber,
  symbol,
  onExitViewOnly,
}) => {
  return (
    <div className="no-print mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white rounded-xl shadow-2xl max-w-xl mx-auto animate-fade-in">
      {/* Verified Badge */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold uppercase tracking-wider text-[10px]">IUPAC Verified</span>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">
          Z-{atomicNumber} &bull; {symbol}
        </span>
      </div>

      {/* Action Buttons: Card/Dossier Toggle + Download */}
      <div className="flex items-center gap-2">
        {/* Format Selector Pill */}
        <div className="inline-flex rounded-lg bg-slate-800/90 p-1 border border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              onChangeFormFactor('card');
            }}
            className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              formFactor === 'card'
                ? 'bg-cyan-600 text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onChangeFormFactor('dossier');
            }}
            className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              formFactor === 'dossier'
                ? 'bg-cyan-600 text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Dossier</span>
          </button>
        </div>

        {/* Download Button */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playTabbyPurr();
            onDownloadPng();
          }}
          className="min-h-[34px] px-3 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          title="Download specimen image as high-resolution PNG"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Save PNG</span>
        </button>

        {/* Exit View Button */}
        {onExitViewOnly && (
          <button
            type="button"
            onClick={onExitViewOnly}
            className="min-h-[34px] px-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer"
            title="Exit specimen view"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        )}
      </div>
    </div>
  );
};
