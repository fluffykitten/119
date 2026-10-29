import React, { useState } from 'react';
import type { StudentElement, FormFactor, DetailLevel } from '../types/element';
import { TabbyCatBadge } from './TabbyCatBadge';
import { BarcodeModal } from './BarcodeModal';

interface ElementCardProps {
  element: StudentElement;
  formFactor: FormFactor;
  detailLevel: DetailLevel;
  roomCode?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}

// NFPA 704 Standard Hazard Diamond Component
export const NfpaDiamond: React.FC<{
  health: number;
  flammability: number;
  instability: number;
  special: string;
  size?: 'sm' | 'md';
}> = ({ health, flammability, instability, special, size = 'md' }) => {
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
  const fontSize = size === 'sm' ? 'text-[9px]' : 'text-xs';

  return (
    <div
      className={`relative ${dim} rotate-45 border border-slate-900 bg-white grid grid-cols-2 grid-rows-2 shrink-0 shadow-xs`}
      aria-label={`NFPA 704 Hazard Diamond: Health ${health}, Flammability ${flammability}, Instability ${instability}, Special ${special}`}
    >
      {/* Top: Flammability (Red) */}
      <div className="bg-red-500/20 border-b border-r border-slate-900 flex items-center justify-center">
        <span className={`-rotate-45 font-mono font-bold text-red-950 ${fontSize}`}>
          {flammability}
        </span>
      </div>
      {/* Right: Instability (Yellow) */}
      <div className="bg-amber-400/25 border-b border-slate-900 flex items-center justify-center">
        <span className={`-rotate-45 font-mono font-bold text-amber-950 ${fontSize}`}>
          {instability}
        </span>
      </div>
      {/* Left: Health (Blue) */}
      <div className="bg-blue-500/20 border-r border-slate-900 flex items-center justify-center">
        <span className={`-rotate-45 font-mono font-bold text-blue-950 ${fontSize}`}>
          {health}
        </span>
      </div>
      {/* Bottom: Special (White) */}
      <div className="bg-white flex items-center justify-center">
        <span className={`-rotate-45 font-mono font-bold text-slate-900 ${fontSize}`}>
          {special}
        </span>
      </div>
    </div>
  );
};

// Interactive Barcode SVG Component
const BarcodeStrip: React.FC<{ code: string; color?: string; onClick?: () => void }> = ({ code, color = 'text-slate-900', onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-end cursor-pointer group hover:opacity-85 transition-opacity focus:outline-none text-right"
      title="Click to view digital specimen QR code & share link"
    >
      <svg className={`w-24 h-6 ${color}`} viewBox="0 0 100 24" fill="currentColor">
        <rect x="0" y="0" width="2" height="24" />
        <rect x="4" y="0" width="1" height="24" />
        <rect x="7" y="0" width="3" height="24" />
        <rect x="12" y="0" width="1" height="24" />
        <rect x="15" y="0" width="2" height="24" />
        <rect x="19" y="0" width="4" height="24" />
        <rect x="25" y="0" width="2" height="24" />
        <rect x="29" y="0" width="1" height="24" />
        <rect x="32" y="0" width="3" height="24" />
        <rect x="37" y="0" width="1" height="24" />
        <rect x="40" y="0" width="3" height="24" />
        <rect x="45" y="0" width="1" height="24" />
        <rect x="48" y="0" width="2" height="24" />
        <rect x="52" y="0" width="4" height="24" />
        <rect x="58" y="0" width="1" height="24" />
        <rect x="61" y="0" width="2" height="24" />
        <rect x="65" y="0" width="3" height="24" />
        <rect x="70" y="0" width="1" height="24" />
        <rect x="73" y="0" width="4" height="24" />
        <rect x="79" y="0" width="2" height="24" />
        <rect x="83" y="0" width="1" height="24" />
        <rect x="86" y="0" width="3" height="24" />
        <rect x="91" y="0" width="2" height="24" />
        <rect x="95" y="0" width="1" height="24" />
        <rect x="98" y="0" width="2" height="24" />
      </svg>
      <span className="text-[8px] font-mono tracking-widest opacity-80 mt-0.5 group-hover:underline">
        {code}
      </span>
    </button>
  );
};

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  formFactor,
  detailLevel,
  roomCode,
  innerRef,
}) => {
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const isCard = formFactor === 'card';
  const isAcademic = detailLevel === 'academic';
  const rarity = element.rarity || 'common';
  const isRare = rarity === 'rare';
  const isLegendary = rarity === 'legendary';

  // Human-readable specimen lookup code (e.g. Z132-GG-GIGA or Z132-GG)
  const specimenCode = `Z${element.atomicNumber}-${element.symbol}${roomCode ? `-${roomCode}` : ''}`;

  // Melting and boiling points with safe fallbacks
  const meltingCelsius = element.meltingPointCelsius ?? 64;
  const boilingCelsius = element.boilingPointCelsius ?? 630;
  const meltingKelvin = element.meltingPointKelvin ?? Math.round((meltingCelsius + 273.15) * 10) / 10;
  const boilingKelvin = element.boilingPointKelvin ?? Math.round((boilingCelsius + 273.15) * 10) / 10;

  // Fallback for chemical zodiac archetype
  const zodiac = element.zodiacArchetype || {
    month: 4,
    monthName: 'April',
    title: 'The Spontaneous Catalyst',
    shortTitle: 'Spontaneous Catalyst',
    description: 'Dramatically lowers the activation energy required to turn a quiet study session into spirited laboratory chaos. They initiate spontaneous exothermic social reactions in seconds and emerge at the end completely unconsumed, watching the resulting chaos with total innocence.'
  };

  // Interactive mouse tracking for holographic diffraction sheen
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLegendary) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setHoloPos({ x, y });
  };

  // 1. TRADING CARD PRESENTATION (3:4 ratio standard collectible)
  if (isCard) {
    return (
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        className={`w-[360px] max-w-full rounded-sm p-4 relative font-sans select-none print-card-container transition-shadow ${
          isLegendary
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 border-2 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.35)]'
            : isRare
            ? 'bg-gradient-to-b from-amber-50 via-amber-100/70 to-yellow-100/60 text-amber-950 border-2 border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
            : 'bg-slate-50 text-slate-900 border-2 border-slate-900 shadow-md'
        }`}
      >
        {/* Holographic Prismatic Diffraction Sheen (Legendary Only) */}
        {isLegendary && (
          <>
            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-40 mix-blend-color-dodge transition-opacity duration-300 rounded-sm"
              style={{
                background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.7) 0%, rgba(244,114,182,0.4) 25%, rgba(56,189,248,0.4) 50%, rgba(250,204,21,0.3) 75%, transparent 90%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay rounded-sm"
              style={{
                backgroundImage: `repeating-linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.25) 5%, transparent 10%)`,
              }}
            />
          </>
        )}

        {/* Registration crosshair marks at corners */}
        <span className={`absolute top-1 left-1 font-mono text-[9px] leading-none ${isLegendary ? 'text-cyan-400 font-bold' : isRare ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>+</span>
        <span className={`absolute top-1 right-1 font-mono text-[9px] leading-none ${isLegendary ? 'text-cyan-400 font-bold' : isRare ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>+</span>
        <span className={`absolute bottom-1 left-1 font-mono text-[9px] leading-none ${isLegendary ? 'text-cyan-400 font-bold' : isRare ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>+</span>
        <span className={`absolute bottom-1 right-1 font-mono text-[9px] leading-none ${isLegendary ? 'text-cyan-400 font-bold' : isRare ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>+</span>

        {/* Card Header Strip */}
        <div className={`flex items-start justify-between pb-2 mb-2.5 border-b ${isLegendary ? 'border-cyan-500/40' : isRare ? 'border-amber-300' : 'border-slate-300'}`}>
          <div>
            <div className="flex items-center gap-1.5">
              {isLegendary ? (
                <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold bg-gradient-to-r from-pink-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  ✦ LEGENDARY HOLOGRAPHIC ✦
                </span>
              ) : isRare ? (
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-extrabold flex items-center gap-1">
                  <span>★</span>
                  <span>RARE GILDED ISOTOPE</span>
                  <span>★</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold">
                  IUPAC Period 8 Series
                </span>
              )}
            </div>
            <div className={`text-base font-extrabold tracking-tight leading-none mt-0.5 ${isLegendary ? 'text-white' : isRare ? 'text-amber-950' : 'text-slate-900'}`}>
              {element.elementName}
            </div>
            <div className={`text-[11px] font-mono ${isLegendary ? 'text-cyan-200' : isRare ? 'text-amber-800' : 'text-slate-600'}`}>
              {element.iupacName}
            </div>
          </div>
          <div className="text-right max-w-[135px]">
            <span className={`text-xs font-mono font-bold block leading-none ${isLegendary ? 'text-cyan-300' : isRare ? 'text-amber-950' : 'text-slate-900'}`}>
              Z = {element.atomicNumber}
            </span>
            <span
              className={`text-[9px] font-mono font-semibold block mt-1 truncate ${isLegendary ? 'text-cyan-200' : isRare ? 'text-amber-900' : 'text-slate-600'}`}
              title={`${zodiac.title} (${zodiac.monthName})`}
            >
              ✦ {zodiac.shortTitle}
            </span>
          </div>
        </div>

        {/* Center Section: Portrait + Large Symbol Grid */}
        <div className="grid grid-cols-12 gap-2 mb-2.5 items-stretch relative z-10">
          {/* Portrait with active laboratory shader */}
          <div className={`col-span-7 aspect-[3/4] rounded-xs overflow-hidden relative border ${isLegendary ? 'border-cyan-400 bg-slate-900' : isRare ? 'border-amber-500 bg-amber-100' : 'border-slate-400 bg-slate-200'}`}>
            <img
              src={element.filteredPhotoDataUrl || element.rawPhotoDataUrl}
              alt={`${element.studentName} scientific portrait`}
              className="w-full h-full object-cover"
            />
            {/* Shader watermark tag */}
            <div className="absolute bottom-1 left-1 bg-slate-950/80 text-white font-mono text-[8px] uppercase tracking-wider px-1 py-0.2 rounded">
              {element.shaderMode}
            </div>
          </div>

          {/* Authentic IUPAC Periodic Element Tile */}
          <div className={`col-span-5 rounded-xs p-2 flex flex-col justify-between items-center text-center border ${
            isLegendary
              ? 'bg-slate-900/90 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : isRare
              ? 'bg-gradient-to-b from-amber-100 to-yellow-200 border-2 border-amber-600 text-amber-950 shadow-xs'
              : 'bg-white border-slate-300 text-slate-900'
          }`}>
            {/* Top row: Atomic Number (Z) and Atomic Mass (Ar) */}
            <div className={`w-full flex items-center justify-between font-mono text-[10px] leading-none pb-1 border-b ${
              isLegendary ? 'border-cyan-500/30 text-cyan-300 font-bold' : isRare ? 'border-amber-300 text-amber-900 font-bold' : 'border-slate-200 text-slate-700 font-bold'
            }`}>
              <span>Z={element.atomicNumber}</span>
              <span>{element.atomicMass} u</span>
            </div>

            {/* Center: Hero Chemical Symbol + Student Element Name */}
            <div className="my-auto py-1 flex flex-col items-center w-full px-1">
              <span className="text-4xl font-extrabold font-sans tracking-tighter block leading-none">
                {element.symbol}
              </span>
              <span className={`font-bold tracking-tight block mt-1 leading-tight text-center w-full ${
                element.elementName.length > 12
                  ? 'text-[8.5px]'
                  : element.elementName.length > 9
                  ? 'text-[9.5px]'
                  : 'text-[11px]'
              } ${
                isLegendary ? 'text-slate-100' : isRare ? 'text-amber-950' : 'text-slate-900'
              }`}>
                {element.elementName}
              </span>
            </div>

            {/* Bottom: Valence Configuration Pill & Series Classification */}
            <div className={`w-full pt-1.5 border-t flex flex-col items-center gap-1 ${
              isLegendary ? 'border-cyan-500/30' : isRare ? 'border-amber-300' : 'border-slate-200'
            }`}>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border block w-full text-center ${
                isLegendary
                  ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400'
                  : isRare
                  ? 'bg-amber-300/80 text-amber-950 border-amber-500'
                  : 'bg-cyan-100/70 text-cyan-800 border-cyan-300'
              }`}>
                {element.electronConfiguration.valenceOrbitals}
              </span>
              <span className={`text-[8px] font-mono uppercase tracking-widest font-semibold block ${
                isLegendary ? 'text-cyan-300/80' : isRare ? 'text-amber-800' : 'text-slate-500'
              }`}>
                {element.block.toUpperCase()}-Block &bull; Period 8
              </span>
            </div>
          </div>
        </div>

        {/* Chemistry Stats Strip & NFPA Hazard Diamond */}
        <div className={`rounded-xs p-2 mb-2 font-mono text-[10px] leading-tight border relative z-10 flex items-stretch gap-2.5 ${
          isLegendary
            ? 'bg-slate-900/80 border-cyan-500/40 text-slate-200'
            : isRare
            ? 'bg-amber-100/70 border-amber-300 text-amber-950'
            : 'bg-slate-100 border-slate-300 text-slate-900'
        }`}>
          {/* Left: Technical Stats Rows */}
          <div className="flex-1 space-y-1 min-w-0">
            <div className={`flex justify-between border-b pb-0.5 ${isLegendary ? 'border-slate-800' : isRare ? 'border-amber-200' : 'border-slate-200'}`}>
              <span className={isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}>Config:</span>
              <span className="font-bold truncate ml-1">{element.electronConfiguration.fullString}</span>
            </div>
            <div className={`flex justify-between border-b pb-0.5 ${isLegendary ? 'border-slate-800' : isRare ? 'border-amber-200' : 'border-slate-200'}`}>
              <span className={isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}>Half-Life:</span>
              <span className="font-bold truncate ml-1">{element.halfLife}</span>
            </div>
            <div className="flex justify-between">
              <span className={isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}>Primary Decay:</span>
              <span className="font-semibold truncate ml-1">{element.decay.primaryMode} ({element.decay.energyMeV} MeV)</span>
            </div>
            {isAcademic && (
              <>
                <div className={`flex justify-between pt-0.5 border-t ${isLegendary ? 'border-slate-800' : isRare ? 'border-amber-200' : 'border-slate-200'}`}>
                  <span className={isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}>M.P. / B.P.:</span>
                  <span className="font-semibold">{meltingCelsius}&deg;C / {boilingCelsius}&deg;C</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}>Oxidation States:</span>
                  <span className="font-semibold">{element.oxidationStates.join(', ')}</span>
                </div>
              </>
            )}
          </div>

          {/* Right: NFPA 704 Hazard Diamond */}
          <div className={`w-14 shrink-0 flex flex-col items-center justify-center pl-2 border-l ${
            isLegendary ? 'border-slate-800' : isRare ? 'border-amber-200' : 'border-slate-200'
          }`}>
            <span className={`text-[7px] font-mono uppercase tracking-widest font-bold mb-1 ${
              isLegendary ? 'text-cyan-400/80' : isRare ? 'text-amber-800' : 'text-slate-500'
            }`}>
              NFPA
            </span>
            <NfpaDiamond
              health={element.nfpa.health}
              flammability={element.nfpa.flammability}
              instability={element.nfpa.instability}
              special={element.nfpa.special}
              size="sm"
            />
          </div>
        </div>

        {/* Spectroscopic Observation Log */}
        <div className={`pl-2 py-1.5 pr-1.5 mb-3 border-l-2 relative z-10 ${
          isLegendary
            ? 'bg-slate-900/90 border-cyan-400 text-slate-100 shadow-sm'
            : isRare
            ? 'bg-white/90 border-amber-600 text-amber-950 shadow-sm'
            : 'bg-white border-slate-900 text-slate-800'
        }`}>
          <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-wider mb-0.5 opacity-75">
            <span>Spectroscopic Observation Log</span>
            <span className="font-bold">
              {isLegendary ? '✦ HOLO ISOTOPE' : isRare ? '★ GILDED SPECIMEN' : 'STANDARD SPECIMEN'}
            </span>
          </div>
          <p className="text-[10px] italic leading-snug">
            "{element.flavorNote}"
          </p>
        </div>

        {/* Technical Footer Strip */}
        <div className={`pt-2 flex items-center justify-between border-t relative z-10 ${isLegendary ? 'border-cyan-500/30' : isRare ? 'border-amber-300' : 'border-slate-300'}`}>
          <TabbyCatBadge variant="card" />
          <BarcodeStrip
            code={specimenCode}
            color={isLegendary ? 'text-cyan-300' : isRare ? 'text-amber-800' : 'text-slate-900'}
            onClick={() => setIsBarcodeModalOpen(true)}
          />
        </div>

        {/* Interactive Barcode QR Modal */}
        {isBarcodeModalOpen && (
          <BarcodeModal
            element={element}
            roomCode={roomCode}
            formFactor={formFactor}
            onClose={() => setIsBarcodeModalOpen(false)}
          />
        )}
      </div>
    );
  }

  // 2. FULL IUPAC TECHNICAL DOSSIER PRESENTATION (A4 Portrait Document)
  return (
    <div
      ref={innerRef}
      className={`w-[740px] max-w-full p-6 sm:p-10 relative font-sans shadow-md print:shadow-none print:border-none print-card-container print:p-0 border ${
        isLegendary
          ? 'bg-slate-950 text-slate-100 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
          : isRare
          ? 'bg-amber-50/70 text-amber-950 border-amber-400'
          : 'bg-slate-50 text-slate-900 border-slate-300'
      }`}
    >
      {/* Millimeter ruler calibration ticks along top margin */}
      <div className={`flex justify-between text-[8px] font-mono border-b pb-1 mb-6 ${isLegendary ? 'border-slate-800 text-slate-400' : isRare ? 'border-amber-300 text-amber-800' : 'border-slate-300 text-slate-500'}`}>
        <span>0 mm</span>
        <span>25 mm</span>
        <span>50 mm</span>
        <span>75 mm</span>
        <span>100 mm</span>
        <span>125 mm</span>
        <span>150 mm</span>
        <span>175 mm</span>
        <span>200 mm</span>
      </div>

      {/* Official Laboratory Dossier Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 mb-6 border-b-2 ${isLegendary ? 'border-cyan-400' : isRare ? 'border-amber-600' : 'border-slate-900'}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono uppercase tracking-widest font-bold ${isLegendary ? 'text-cyan-300' : isRare ? 'text-amber-800' : 'text-slate-600'}`}>
              International Union of Pure and Applied Chemistry (IUPAC)
            </span>
            {isLegendary && (
              <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-slate-950 text-[9px] font-mono font-extrabold uppercase">
                ✦ Legendary Foil
              </span>
            )}
            {isRare && (
              <span className="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 text-[9px] font-mono font-extrabold uppercase">
                ★ Rare Gilded
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 mb-0.5">
            SYNTHESIS CERTIFICATION DOSSIER
          </h1>
          <p className={`text-xs font-mono ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}`}>
            Division of Superheavy Elements &bull; Joint Institute for Relativistic Synthesis
          </p>
        </div>

        {/* Official Approval Stamp */}
        <div className={`px-3 py-1.5 rotate-1 rounded font-mono text-center shrink-0 border-2 ${
          isLegendary
            ? 'border-cyan-400 text-cyan-300 bg-slate-900 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            : isRare
            ? 'border-amber-600 text-amber-900 bg-amber-100'
            : 'border-rose-800 text-rose-800'
        }`}>
          <div className="text-[9px] uppercase tracking-wider font-bold">
            {isLegendary ? '✦ LEGENDARY TCG FOIL ✦' : isRare ? '★ RARE GILDED SEAL ★' : 'IUPAC STANDARD'}
          </div>
          <div className="text-xs font-extrabold tracking-tight">SYNTHESIS APPROVED</div>
          <div className="text-[8px] tracking-widest mt-0.5">{element.createdAt}</div>
        </div>
      </div>

      {/* Top Grid: Specimen Portrait + Large Chemical Tile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        {/* Specimen Portrait with Calibration Frame */}
        <div className={`md:col-span-5 p-2 rounded-xs relative border ${isLegendary ? 'border-cyan-500/50 bg-slate-900' : isRare ? 'border-amber-400 bg-amber-100/60' : 'border-slate-400 bg-slate-200'}`}>
          <div className="aspect-[4/5] bg-slate-950 overflow-hidden relative">
            <img
              src={element.filteredPhotoDataUrl || element.rawPhotoDataUrl}
              alt={`${element.studentName} laboratory specimen`}
              className="w-full h-full object-cover"
            />
            {/* Viewfinder corner crosshairs */}
            <div className="absolute top-1 left-1 text-[8px] font-mono text-cyan-300">+</div>
            <div className="absolute top-1 right-1 text-[8px] font-mono text-cyan-300">+</div>
            <div className="absolute bottom-1 left-1 text-[8px] font-mono text-cyan-300">+</div>
            <div className="absolute bottom-1 right-1 text-[8px] font-mono text-cyan-300">+</div>
          </div>
          <div className={`flex justify-between items-center mt-1.5 px-0.5 font-mono text-[9px] ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}`}>
            <span>SAMPLE: #{element.id.slice(0, 10)}</span>
            <span className="uppercase">FILTER: {element.shaderMode}</span>
          </div>
        </div>

        {/* Identity & Core Chemical Tile */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div className={`rounded p-4 border ${isLegendary ? 'bg-slate-900/90 border-slate-800' : isRare ? 'bg-white/90 border-amber-300' : 'bg-white border-slate-300'}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${isLegendary ? 'text-cyan-400' : isRare ? 'text-amber-700' : 'text-slate-500'}`}>
                  Candidate Synthesis Name
                </span>
                <span className="text-3xl font-extrabold tracking-tight block">
                  {element.elementName}
                </span>
                <span className={`text-sm font-mono block mt-0.5 ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-900' : 'text-slate-600'}`}>
                  IUPAC Systematic: <strong className={isLegendary ? 'text-cyan-200' : isRare ? 'text-amber-950' : 'text-slate-800'}>{element.iupacName}</strong>
                </span>
              </div>

              {/* Chemical Tile */}
              <div className={`w-20 h-22 rounded flex flex-col items-center justify-between p-1.5 text-center border-2 ${
                isLegendary
                  ? 'border-cyan-400 bg-slate-950 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : isRare
                  ? 'border-amber-600 bg-gradient-to-b from-amber-100 to-yellow-200 text-amber-950 shadow-xs'
                  : 'border-slate-900 bg-slate-50 text-slate-900'
              }`}>
                <span className="text-[10px] font-mono font-bold leading-none">
                  {element.atomicNumber}
                </span>
                <span className="text-3xl font-extrabold font-sans leading-none tracking-tighter">
                  {element.symbol}
                </span>
                <span className="text-[9px] font-mono leading-none">
                  {element.atomicMass}
                </span>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs font-mono ${isLegendary ? 'border-slate-800' : isRare ? 'border-amber-200' : 'border-slate-200'}`}>
              <div>
                <span className={`block text-[10px] ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-500'}`}>Classification:</span>
                <span className="font-semibold">{element.group}</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-500'}`}>Candidate Student:</span>
                <span className="font-semibold">{element.studentName}</span>
              </div>
            </div>
          </div>

          {/* NFPA & Electron Configuration Card */}
          <div className={`rounded p-3 mt-3 flex items-center justify-between gap-4 border ${isLegendary ? 'bg-slate-900/90 border-slate-800' : isRare ? 'bg-white/90 border-amber-300' : 'bg-white border-slate-300'}`}>
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-wider block ${isLegendary ? 'text-cyan-400' : isRare ? 'text-amber-700' : 'text-slate-500'}`}>
                Dirac-Fock Relativistic Configuration
              </span>
              <span className="font-mono text-sm font-bold block mt-0.5">
                {element.electronConfiguration.fullString}
              </span>
              <span className={`text-[11px] font-mono block ${isLegendary ? 'text-slate-400' : isRare ? 'text-amber-800' : 'text-slate-600'}`}>
                Block: <strong className="uppercase">{element.block}-block</strong> &bull; Period 8
              </span>
            </div>

            <NfpaDiamond
              health={element.nfpa.health}
              flammability={element.nfpa.flammability}
              instability={element.nfpa.instability}
              special={element.nfpa.special}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Technical Characterization Tables */}
      <div className={`border rounded overflow-hidden mb-6 ${isLegendary ? 'bg-slate-900 border-slate-800' : isRare ? 'bg-white/90 border-amber-300' : 'bg-white border-slate-300'}`}>
        <div className={`px-4 py-2 border-b font-mono text-xs font-bold uppercase tracking-wider flex justify-between ${isLegendary ? 'bg-slate-800/80 border-slate-700 text-slate-200' : isRare ? 'bg-amber-100/80 border-amber-300 text-amber-950' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
          <span>Physical &amp; Quantum Characterization</span>
          <span className="opacity-75">IUPAC SECTION 4.2</span>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x text-xs font-mono ${isLegendary ? 'divide-slate-800' : isRare ? 'divide-amber-200' : 'divide-slate-200'}`}>
          <div className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="opacity-75">Predicted Half-Life:</span>
              <span className="font-bold">{element.halfLife}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Primary Decay Mode:</span>
              <span className="font-bold">{element.decay.primaryMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Daughter Nuclide:</span>
              <span className="font-bold">{element.decay.daughterIsotope}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Decay Particle Energy:</span>
              <span className="font-bold">{element.decay.energyMeV} MeV</span>
            </div>
          </div>

          <div className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="opacity-75">Melting / Boiling:</span>
              <span className="font-bold">{meltingCelsius}&deg;C / {boilingCelsius}&deg;C ({meltingKelvin} K / {boilingKelvin} K)</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Pauling Electronegativity:</span>
              <span className="font-bold">{element.electronegativity}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Oxidation States:</span>
              <span className="font-bold">{element.oxidationStates.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Detection Confidence:</span>
              <span className="font-bold text-emerald-600">{element.synthesisTelemetry.detectorConfidence}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Predicted Reactivity & Spectroscopic Observations */}
      <div className="space-y-4 mb-6">
        <div className={`rounded p-4 border ${isLegendary ? 'bg-slate-900 border-slate-800' : isRare ? 'bg-white/90 border-amber-300' : 'bg-white border-slate-300'}`}>
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-slate-200">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLegendary ? 'text-cyan-400' : isRare ? 'text-amber-800' : 'text-slate-700'}`}>
              <span>✦</span>
              <span>Laboratory Spectroscopic Incident Observation</span>
            </span>
            <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
              isLegendary
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : isRare
                ? 'bg-amber-200/80 text-amber-950 border border-amber-400'
                : 'bg-slate-200 text-slate-800 border border-slate-300'
            }`}>
              {zodiac.title.toUpperCase()} ({zodiac.monthName})
            </span>
          </div>
          <p className="text-xs leading-relaxed font-sans opacity-95">
            {zodiac.description}
          </p>
        </div>

        <div className={`p-4 rounded-r border-l-4 ${isLegendary ? 'bg-slate-900/90 border-cyan-400 text-slate-100' : isRare ? 'bg-amber-100/60 border-amber-600 text-amber-950' : 'bg-slate-100 border-slate-900 text-slate-900'}`}>
          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-1 opacity-75">
            <span>Field Eyewitness Incident Log</span>
            <span>{isLegendary ? '✦ LEGENDARY FOIL LOG' : isRare ? '★ GILDED LOG' : 'STANDARD LOG'}</span>
          </div>
          <p className="text-xs italic font-sans leading-relaxed">
            "{element.flavorNote}"
          </p>
        </div>
      </div>

      {/* Beamline Telemetry Summary */}
      <div className={`rounded p-3 mb-6 text-[11px] font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 border ${isLegendary ? 'bg-slate-900 border-slate-800 text-slate-300' : isRare ? 'bg-white/90 border-amber-300 text-amber-900' : 'bg-white border-slate-300 text-slate-700'}`}>
        <div>
          <span className="opacity-75 block text-[9px]">Projectile Ion:</span>
          <span className="font-bold">{element.synthesisTelemetry.projectileNuclide}</span>
        </div>
        <div>
          <span className="opacity-75 block text-[9px]">Target Foil:</span>
          <span className="font-bold">{element.synthesisTelemetry.targetNuclide}</span>
        </div>
        <div>
          <span className="opacity-75 block text-[9px]">Beam Energy:</span>
          <span className="font-bold">{element.synthesisTelemetry.beamEnergyMeV} MeV</span>
        </div>
        <div>
          <span className="opacity-75 block text-[9px]">Magnetic Flux:</span>
          <span className="font-bold">{element.synthesisTelemetry.magneticFluxTesla} Tesla</span>
        </div>
      </div>

      {/* Dossier Footer with Barcode and Attribution */}
      <div className={`pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 ${isLegendary ? 'border-cyan-400' : isRare ? 'border-amber-600' : 'border-slate-900'}`}>
        <TabbyCatBadge variant="card" />
        <BarcodeStrip
          code={`IUPAC-${specimenCode}`}
          color={isLegendary ? 'text-cyan-300' : isRare ? 'text-amber-800' : 'text-slate-900'}
          onClick={() => setIsBarcodeModalOpen(true)}
        />
      </div>

      {/* Interactive Barcode QR Modal */}
      {isBarcodeModalOpen && (
        <BarcodeModal
          element={element}
          roomCode={roomCode}
          formFactor={formFactor}
          onClose={() => setIsBarcodeModalOpen(false)}
        />
      )}
    </div>
  );
};
