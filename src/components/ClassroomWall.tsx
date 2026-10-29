import React, { useState, useRef } from 'react';
import type { StudentElement, FormFactor, DetailLevel, CardRarity } from '../types/element';
import { ElementCard } from './ElementCard';
import {
  Printer,
  Download,
  Upload,
  Trash2,
  Eye,
  X,
  Plus,
  Scissors,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  UserCheck,
  Lock,
  Search,
  LogOut,
} from 'lucide-react';
import { triggerPrintDialog, downloadCardAsPng } from '../utils/exportCanvas';
import { soundEffects } from '../utils/audioSynthesizer';

function getRosterFilename(roomCode?: string): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const roomTag = roomCode ? `_${roomCode}` : '';
  return `Element119_Classroom_Roster${roomTag}_${dateStr}.json`;
}

interface ClassroomWallProps {
  roster: StudentElement[];
  currentRoomCode: string;
  onJoinRoom: (roomCode: string) => void;
  onLeaveRoom: () => void;
  isSyncing: boolean;
  onRefreshWall: () => void;
  myCardIds: string[];
  onSelectStudent: (student: StudentElement) => void;
  onDeleteStudent: (id: string) => void;
  onClearRoster: () => void;
  onImportRoster: (imported: StudentElement[]) => void;
  onNewSynthesis: () => void;
}

export const ClassroomWall: React.FC<ClassroomWallProps> = ({
  roster,
  currentRoomCode,
  onJoinRoom,
  onLeaveRoom,
  isSyncing,
  onRefreshWall,
  myCardIds,
  onSelectStudent,
  onDeleteStudent,
  onClearRoster,
  onImportRoster,
  onNewSynthesis,
}) => {
  const [activeModalStudent, setActiveModalStudent] = useState<StudentElement | null>(null);
  const [modalFormFactor, setModalFormFactor] = useState<FormFactor>('card');
  const [modalDetailLevel, setModalDetailLevel] = useState<DetailLevel>('academic');
  const [isBatchPrintMode, setIsBatchPrintMode] = useState(false);
  const [rarityFilter, setRarityFilter] = useState<'all' | CardRarity>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [roomInput, setRoomInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const modalCardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sort students chronologically by Atomic Number Z ascending
  const sortedRoster = [...roster].sort((a, b) => a.atomicNumber - b.atomicNumber);

  // Filtered roster for screen view (rarity + specimen code / name search)
  const displayedRoster = sortedRoster.filter((item) => {
    if (rarityFilter !== 'all' && (item.rarity || 'common') !== rarityFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toUpperCase();
      const code = `Z${item.atomicNumber}-${item.symbol}${currentRoomCode ? `-${currentRoomCode}` : ''}`.toUpperCase();
      const match =
        code.includes(q) ||
        String(item.atomicNumber) === q ||
        item.symbol.toUpperCase() === q ||
        item.studentName.toUpperCase().includes(q) ||
        item.elementName.toUpperCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Counts by rarity
  const countCommon = sortedRoster.filter((i) => (i.rarity || 'common') === 'common').length;
  const countRare = sortedRoster.filter((i) => i.rarity === 'rare').length;
  const countLegendary = sortedRoster.filter((i) => i.rarity === 'legendary').length;

  // Group into pages of 4 for batch A4 printing
  const printPages: StudentElement[][] = [];
  for (let i = 0; i < sortedRoster.length; i += 4) {
    printPages.push(sortedRoster.slice(i, i + 4));
  }

  // Copy class invite link
  const handleCopyInviteLink = () => {
    if (!currentRoomCode) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const inviteUrl = `${origin}${pathname}?room=${encodeURIComponent(currentRoomCode)}`;
    soundEffects.playTabbyPurr();
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  // Export roster as JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(sortedRoster, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getRosterFilename(currentRoomCode);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import roster from JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportRoster(parsed);
        }
      } catch (err) {
        console.error('Invalid roster import JSON:', err);
        alert('Invalid JSON roster file format.');
      }
    };
    reader.readAsText(file);
  };

  // Trigger browser print for batch 4-up mode
  const handleTriggerBatchPrint = () => {
    triggerPrintDialog('Classroom Periodic Table (4 Cards Per Page)');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner and Controls */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[11px] uppercase tracking-wider mb-1">
            <span>Stage 04</span>
            <span>&bull;</span>
            <span>Period 8 Periodic Table Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Classroom Periodic Shelf
          </h1>
          <p className="text-xs text-slate-600 font-mono mt-0.5">
            {sortedRoster.length} {sortedRoster.length === 1 ? 'element' : 'elements'} synthesized &bull; Arranged by atomic number Z
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {sortedRoster.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setIsBatchPrintMode(!isBatchPrintMode)}
                className={`min-h-[44px] px-3.5 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isBatchPrintMode
                    ? 'bg-cyan-800 text-white'
                    : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>{isBatchPrintMode ? 'Exit Batch Layout' : 'Batch 4-Up Layout'}</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerBatchPrint}
                className="min-h-[44px] px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Roster (A4)</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onNewSynthesis}
            className="min-h-[44px] px-3.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* Online Classroom Room Bar: Join / Create / Active Status */}
      {!currentRoomCode ? (
        <div className="no-print mb-6 p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 text-slate-100 rounded-lg shadow-md border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  School Online Periodic Wall
                </span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight">
                Connect to Your Class Wall
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Join your teacher's private class code so all students can see each other's synthesized elements.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (roomInput.trim()) {
                  onJoinRoom(roomInput.trim().toUpperCase());
                }
              }}
              className="flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value.toUpperCase())}
                placeholder="e.g. CHEM-119"
                maxLength={12}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded font-mono text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none uppercase w-32 sm:w-36"
              />
              <button
                type="submit"
                disabled={!roomInput.trim()}
                className="min-h-[38px] px-3.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Join Wall
              </button>
              <button
                type="button"
                onClick={() => {
                  const randomCode = `P8-${Math.floor(100 + Math.random() * 900)}`;
                  onJoinRoom(randomCode);
                }}
                className="min-h-[38px] px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
                title="Create a new class wall code"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="no-print mb-6 p-3 sm:px-4 sm:py-3 bg-slate-900/95 border border-cyan-500/30 rounded-xl shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE WALL</span>
            </div>

            <span className="text-slate-300 text-xs font-medium">
              Classroom:
            </span>

            <span className="px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/50 text-cyan-200 font-extrabold tracking-wider text-xs shadow-inner">
              {currentRoomCode.startsWith('ROOM-') ? currentRoomCode : `ROOM-${currentRoomCode}`}
            </span>

            {isSyncing && (
              <span className="text-[11px] text-cyan-300 animate-pulse flex items-center gap-1.5 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/60 shadow-sm">
                <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                <span>Syncing...</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyInviteLink}
              className="min-h-[34px] px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Copy shareable invite link for classmates"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5 text-cyan-100" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Class Link'}</span>
            </button>

            <button
              type="button"
              onClick={onRefreshWall}
              disabled={isSyncing}
              className="min-h-[34px] p-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-cyan-300 hover:text-white border border-slate-700 transition-all cursor-pointer disabled:opacity-40"
              title="Refresh classroom periodic wall"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onLeaveRoom}
              className="min-h-[34px] px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 active:scale-95 text-rose-300 hover:text-rose-100 border border-rose-800/70 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Leave this classroom wall and return to local roster"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Leave Room</span>
            </button>
          </div>
        </div>
      )}

      {/* Roster Utility Bar & TCG Rarity Filter */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 border border-slate-300 rounded p-3 mb-6 font-mono text-xs text-slate-700">
        {/* Rarity Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
            Filter Rarity:
          </span>
          <button
            type="button"
            onClick={() => setRarityFilter('all')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
              rarityFilter === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All ({sortedRoster.length})
          </button>
          <button
            type="button"
            onClick={() => setRarityFilter('common')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
              rarityFilter === 'common'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Common ({countCommon})
          </button>
          <button
            type="button"
            onClick={() => setRarityFilter('rare')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
              rarityFilter === 'rare'
                ? 'bg-amber-500 text-slate-950 font-bold border border-amber-600 shadow-xs'
                : 'bg-white border border-slate-300 text-amber-900 hover:bg-amber-50'
            }`}
          >
            <span>★ Rare Gold ({countRare})</span>
          </button>
          <button
            type="button"
            onClick={() => setRarityFilter('legendary')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
              rarityFilter === 'legendary'
                ? 'bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-300 text-slate-950 font-bold shadow-xs'
                : 'bg-white border border-slate-300 text-cyan-900 hover:bg-cyan-50'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Legendary Holo ({countLegendary})</span>
          </button>
        </div>

        {/* Search Specimen Code / Name Input */}
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code or name..."
            className="pl-8 pr-6 py-1 bg-white border border-slate-300 rounded text-xs font-mono w-44 sm:w-48 focus:outline-none focus:border-cyan-500 uppercase placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              &times;
            </button>
          )}
        </div>

        {/* JSON Backup & Clear */}
        <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
          <button
            type="button"
            onClick={handleExportJson}
            disabled={sortedRoster.length === 0}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3 text-slate-600" />
            <span>Backup</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3 h-3 text-slate-600" />
            <span>Restore</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportJson}
            className="hidden"
            aria-label="Upload JSON roster backup"
          />

          {!currentRoomCode && sortedRoster.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your local roster?')) {
                  onClearRoster();
                }
              }}
              className="text-rose-700 hover:text-rose-900 ml-1 p-1 cursor-pointer"
              title="Clear local roster"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {sortedRoster.length === 0 && (
        <div className="no-print text-center py-16 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-6">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 mx-auto mb-3 flex items-center justify-center font-mono font-bold text-lg">
            ?
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {currentRoomCode ? `Classroom Wall ROOM-${currentRoomCode} is Empty` : 'Classroom Periodic Shelf is Empty'}
          </h3>
          <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">
            {currentRoomCode
              ? 'No students have pinned their cards to this class wall yet. Be the first!'
              : 'Synthesize student portraits to populate Period 8 superheavy elements with custom IUPAC dossiers.'}
          </p>
          <button
            type="button"
            onClick={onNewSynthesis}
            className="min-h-[44px] px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded-md transition-colors cursor-pointer"
          >
            Synthesize First Student
          </button>
        </div>
      )}

      {/* 1. SCREEN VIEW: Interactive Periodic Block Shelf with TCG Rarity Styling */}
      {!isBatchPrintMode && displayedRoster.length > 0 && (
        <div className="no-print grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayedRoster.map((elem) => {
            const isHolo = elem.rarity === 'legendary';
            const isGold = elem.rarity === 'rare';
            const isMyCard = myCardIds.includes(elem.id);

            return (
              <div
                key={elem.id}
                onClick={() => setActiveModalStudent(elem)}
                className={`rounded p-2.5 transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between group relative border ${
                  isHolo
                    ? 'bg-slate-900 text-slate-100 border-2 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : isGold
                    ? 'bg-gradient-to-b from-amber-50 to-yellow-100/70 text-amber-950 border-2 border-amber-500 shadow-xs'
                    : 'bg-white border-slate-300 hover:border-slate-900 text-slate-900'
                }`}
              >
                {/* Top Z & Rarity Tag */}
                <div className="flex justify-between items-start font-mono text-[10px]">
                  <span className={`font-bold text-xs ${isHolo ? 'text-cyan-300' : isGold ? 'text-amber-950' : 'text-slate-900'}`}>
                    {elem.atomicNumber}
                  </span>

                  <div className="flex items-center gap-1">
                    {isMyCard && (
                      <span className="px-1 py-0.2 rounded bg-cyan-700 text-white text-[8px] font-mono font-bold flex items-center gap-0.5">
                        <UserCheck className="w-2.5 h-2.5" />
                        <span>YOU</span>
                      </span>
                    )}

                    {isHolo ? (
                      <span className="px-1 py-0.2 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-slate-950 font-extrabold text-[8px] uppercase tracking-wider">
                        ✦ HOLO
                      </span>
                    ) : isGold ? (
                      <span className="px-1 py-0.2 rounded bg-amber-400 text-amber-950 font-bold text-[8px] uppercase tracking-wider border border-amber-500">
                        ★ RARE
                      </span>
                    ) : (
                      <span className="px-1 rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold uppercase text-[9px]">
                        {elem.block}-block
                      </span>
                    )}
                  </div>
                </div>

                {/* Portrait Thumbnail + Bold Symbol */}
                <div className="my-2 flex items-center gap-2">
                  <img
                    src={elem.filteredPhotoDataUrl || elem.rawPhotoDataUrl}
                    alt={elem.studentName}
                    className={`w-10 h-12 object-cover rounded border ${isHolo ? 'border-cyan-400' : isGold ? 'border-amber-500' : 'border-slate-300'}`}
                  />
                  <div className="leading-none">
                    <span className="text-2xl font-extrabold tracking-tighter block font-sans">
                      {elem.symbol}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold block mt-0.5 ${isHolo ? 'text-cyan-300' : isGold ? 'text-amber-800' : 'text-cyan-800'}`}>
                      {elem.electronConfiguration.valenceOrbitals}
                    </span>
                  </div>
                </div>

                {/* Names */}
                <div className={`pt-2 border-t font-mono ${isHolo ? 'border-slate-800' : isGold ? 'border-amber-200' : 'border-slate-100'}`}>
                  <span className="font-bold text-xs block truncate" title={elem.elementName}>
                    {elem.elementName}
                  </span>
                  <span className={`text-[10px] block truncate ${isHolo ? 'text-slate-400' : isGold ? 'text-amber-800' : 'text-slate-500'}`} title={elem.studentName}>
                    {elem.studentName}
                  </span>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5 opacity-75" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. BATCH 4-UP PRINT VIEW (Rendered for Screen Preview and Strict Print Mode) */}
      {(isBatchPrintMode || sortedRoster.length > 0) && (
        <div className={isBatchPrintMode ? 'block' : 'print-only'}>
          {printPages.map((pageGroup, pageIdx) => (
            <div
              key={pageIdx}
              className="print-page-break mb-8 bg-white p-4 border border-slate-200 rounded print:border-none print:p-0"
            >
              {/* Print Header */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 border-b border-slate-300 pb-1 mb-4">
                <span>IUPAC CLASSROOM PERIODIC ROSTER &bull; {currentRoomCode ? `ROOM-${currentRoomCode} &bull; ` : ''}SHEET {pageIdx + 1} OF {printPages.length}</span>
                <span>4 CARDS PER A4 SHEET &bull; CUT ALONG DASHED GUIDES</span>
              </div>

              {/* 2x2 Grid of Cards on A4 Paper with Scissor Cut Guides */}
              <div className="grid grid-cols-2 gap-4">
                {pageGroup.map((item) => (
                  <div
                    key={item.id}
                    className="relative border border-dashed border-slate-400 p-2 rounded-xs"
                  >
                    <ElementCard
                      element={item}
                      formFactor="card"
                      detailLevel="academic"
                      roomCode={currentRoomCode}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Individual Student Inspection Modal */}
      {activeModalStudent && (
        <div
          role="dialog"
          aria-modal="true"
          className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveModalStudent(null)}
        >
          <div
            className="bg-slate-100 border border-slate-300 rounded-lg max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  Inspecting: {activeModalStudent.studentName}
                </span>
                <span className="text-xs font-mono text-cyan-800">
                  (Z = {activeModalStudent.atomicNumber})
                </span>
                {activeModalStudent.rarity === 'legendary' && (
                  <span className="px-1.5 py-0.2 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-slate-950 text-[9px] font-mono font-extrabold uppercase">
                    ✦ Legendary Holo
                  </span>
                )}
                {activeModalStudent.rarity === 'rare' && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 text-[9px] font-mono font-extrabold uppercase border border-amber-500">
                    ★ Rare Gold
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setModalDetailLevel(modalDetailLevel === 'academic' ? 'streamlined' : 'academic')
                  }
                  className="px-2.5 py-1 text-xs font-mono border border-slate-300 bg-white hover:bg-slate-100 rounded cursor-pointer"
                >
                  {modalDetailLevel === 'academic' ? 'Academic' : 'Summary'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setModalFormFactor(modalFormFactor === 'card' ? 'dossier' : 'card')
                  }
                  className="px-2.5 py-1 text-xs font-mono border border-slate-300 bg-white hover:bg-slate-100 rounded cursor-pointer"
                >
                  View as: {modalFormFactor === 'card' ? 'Dossier' : 'Card'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalStudent(null)}
                  className="min-h-[36px] min-w-[36px] p-1 rounded hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Card Display */}
            <div className="flex justify-center my-4 overflow-x-auto py-2">
              <ElementCard
                element={activeModalStudent}
                formFactor={modalFormFactor}
                detailLevel={modalDetailLevel}
                roomCode={currentRoomCode}
                innerRef={modalCardRef}
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-300 pt-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  if (modalCardRef.current) {
                    downloadCardAsPng(modalCardRef.current, activeModalStudent, modalFormFactor);
                  }
                }}
                className="min-h-[44px] px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectStudent(activeModalStudent);
                    setActiveModalStudent(null);
                  }}
                  className="min-h-[44px] px-3 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-mono font-bold rounded transition-colors cursor-pointer"
                >
                  Load in Studio
                </button>

                {/* Only creator student (or local offline mode) can delete their own card */}
                {(!currentRoomCode || myCardIds.includes(activeModalStudent.id)) ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete ${activeModalStudent.studentName} from the classroom wall?`)) {
                        onDeleteStudent(activeModalStudent.id);
                        setActiveModalStudent(null);
                      }
                    }}
                    className="min-h-[44px] px-3 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-mono rounded transition-colors cursor-pointer"
                  >
                    Delete My Card
                  </button>
                ) : (
                  <div
                    className="min-h-[44px] px-3 border border-slate-200 bg-slate-100 text-slate-500 text-xs font-mono rounded flex items-center gap-1.5 select-none"
                    title="You can only delete cards created on your device"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Classmate Specimen (View Only)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
