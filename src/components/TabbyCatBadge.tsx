import React, { useState } from 'react';
import { soundEffects } from '../utils/audioSynthesizer';

interface TabbyCatBadgeProps {
  variant?: 'footer' | 'card' | 'inline';
  className?: string;
}

export const TabbyCatBadge: React.FC<TabbyCatBadgeProps> = ({
  variant = 'footer',
  className = '',
}) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playTabbyPurr();
    setShowEasterEgg(true);
    setTimeout(() => {
      setShowEasterEgg(false);
    }, 3200);
  };

  // Minimalist vector grayscale tabby cat icon
  const TabbyCatIcon = (
    <svg
      className={variant === 'card' ? 'w-4 h-4' : 'w-5 h-5'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grayscale Tabby Cat Mascot"
    >
      {/* Cat face contour */}
      <path
        d="M4 10L6.5 4.5L10 7C11.3 6.6 12.7 6.6 14 7L17.5 4.5L20 10C21.3 12.8 21.3 16.2 19 19C16.8 21.7 13.8 22 12 22C10.2 22 7.2 21.7 5 19C2.7 16.2 2.7 12.8 4 10Z"
        fill="#334155"
        stroke="#0f172a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Inner ears */}
      <path d="M7 6L9 8" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      <path d="M17 6L15 8" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      {/* Tabby forehead stripes ('M' mark) */}
      <path d="M10 8L12 11L14 8" stroke="#f8fafc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7V9" stroke="#f8fafc" strokeWidth="0.9" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="8.5" cy="13.5" r="1.3" fill="#38bdf8" stroke="#0f172a" strokeWidth="0.5" />
      <circle cx="15.5" cy="13.5" r="1.3" fill="#38bdf8" stroke="#0f172a" strokeWidth="0.5" />
      {/* Nose & Mouth */}
      <path d="M11.3 15.8L12 15.2L12.7 15.8" fill="none" stroke="#f8fafc" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 15.5V17" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" />
      {/* Whiskers */}
      <path d="M5.5 15L3 14.5" stroke="#94a3b8" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M5.5 16.5L3.2 17" stroke="#94a3b8" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M18.5 15L21 14.5" stroke="#94a3b8" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M18.5 16.5L20.8 17" stroke="#94a3b8" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'card') {
    return (
      <div className={`relative inline-flex items-center gap-1.5 text-[9px] font-mono tracking-tight text-slate-600 ${className}`}>
        <button
          type="button"
          onClick={handleClick}
          title="fluffykitten Mascot"
          className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
        >
          {TabbyCatIcon}
          <span>designed by fluffykitten</span>
        </button>

        {showEasterEgg && (
          <div className="absolute bottom-full left-0 mb-1 z-50 whitespace-nowrap bg-slate-900 text-slate-100 text-[10px] px-2 py-1 rounded shadow-md border border-slate-700 animate-fade-in font-sans">
            Official Lab Mascot: Fluffykitten, Honorary Fellow of IUPAC
          </div>
        )}
      </div>
    );
  }

  return (
    <footer className={`relative py-4 px-6 border-t border-slate-300 bg-slate-50 text-slate-700 text-xs ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClick}
          className="group inline-flex items-center gap-2.5 hover:text-slate-950 transition-colors cursor-pointer text-left focus:outline-none"
          title="Click the tabby mascot for an easter egg"
        >
          <div className="p-1 rounded bg-slate-200 group-hover:bg-slate-300 transition-colors">
            {TabbyCatIcon}
          </div>
          <span className="font-mono tracking-tight">
            designed by <strong className="font-semibold text-slate-900">fluffykitten</strong>
          </span>
        </button>

        <div className="text-slate-600 font-mono text-[11px] tracking-tight">
          Element 119+ Synthesis Terminal &bull; IUPAC Standard &bull; IGCSE / AS-Level Chemistry
        </div>
      </div>

      {showEasterEgg && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-slate-50 px-4 py-2.5 rounded-md shadow-xl border border-slate-700 font-mono text-xs text-center animate-fade-in">
          <span className="text-cyan-400 font-bold">&#9733; Fluffykitten:</span> Official Lab Mascot, Honorary Fellow of IUPAC (Purr-fect Synthesis Verified)
        </div>
      )}
    </footer>
  );
};
