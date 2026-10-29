import React, { useState, useEffect } from 'react';
import type { StudentElement } from '../types/element';
import { Search, X, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { fetchRoomRoster } from '../utils/wallApi';
import { soundEffects } from '../utils/audioSynthesizer';

interface SpecimenLookupModalProps {
  localRoster: StudentElement[];
  currentRoomCode?: string;
  onSelectSpecimen: (element: StudentElement, roomCode?: string) => void;
  onClose: () => void;
}

export const SpecimenLookupModal: React.FC<SpecimenLookupModalProps> = ({
  localRoster,
  currentRoomCode,
  onSelectSpecimen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);
  const [remoteResults, setRemoteResults] = useState<StudentElement[]>([]);

  // Parse potential room code from input like "Z132-GG-GIGA" or "GIGA"
  const cleanQuery = query.trim().toUpperCase();

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim() || val.trim().length < 2) {
      setRemoteResults([]);
    }
  };

  useEffect(() => {
    if (!cleanQuery || cleanQuery.length < 2) {
      return;
    }

    // Check if query contains a room suffix (e.g. Z132-GG-GIGA or CHEM-119)
    const parts = cleanQuery.split('-');
    let extractedRoom: string | null = null;
    if (parts.length >= 3) {
      extractedRoom = parts[parts.length - 1];
    } else if (currentRoomCode) {
      extractedRoom = currentRoomCode;
    }

    if (extractedRoom && extractedRoom !== currentRoomCode) {
      let isSubscribed = true;
      const timeoutId = setTimeout(() => {
        setIsSearchingRemote(true);
      }, 0);

      fetchRoomRoster(extractedRoom)
        .then((roster) => {
          if (!isSubscribed) return;
          setIsSearchingRemote(false);
          if (roster && roster.length > 0) {
            setRemoteResults(roster);
          } else {
            setRemoteResults([]);
          }
        })
        .catch(() => {
          if (!isSubscribed) return;
          setIsSearchingRemote(false);
        });

      return () => {
        isSubscribed = false;
        clearTimeout(timeoutId);
      };
    }
  }, [cleanQuery, currentRoomCode]);

  // Combine and deduplicate candidates from local and remote
  const combinedRoster = [...localRoster];
  for (const item of remoteResults) {
    if (!combinedRoster.some((c) => c.id === item.id)) {
      combinedRoster.push(item);
    }
  }

  // Filter matches
  const matches = cleanQuery
    ? combinedRoster.filter((item) => {
        const zCode = `Z${item.atomicNumber}-${item.symbol}`.toUpperCase();
        const fullCode = `${zCode}-${currentRoomCode || ''}`.toUpperCase();
        const numStr = String(item.atomicNumber);
        const nameStr = item.studentName.toUpperCase();
        const elemStr = item.elementName.toUpperCase();
        const symbolStr = item.symbol.toUpperCase();

        return (
          fullCode.includes(cleanQuery) ||
          zCode.includes(cleanQuery) ||
          numStr === cleanQuery ||
          nameStr.includes(cleanQuery) ||
          elemStr.includes(cleanQuery) ||
          symbolStr === cleanQuery
        );
      })
    : [];

  const handleSelect = (item: StudentElement) => {
    soundEffects.playTabbyPurr();
    // Extract room if entered in code
    const parts = cleanQuery.split('-');
    const room = parts.length >= 3 ? parts[parts.length - 1] : currentRoomCode;
    onSelectSpecimen(item, room);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-mono font-bold tracking-tight text-white flex items-center gap-2">
                <span>IUPAC Specimen Verification</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Lookup physical card by Specimen ID, name, or atomic number Z
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="e.g. Z132-GG-GIGA or Gigachad or 132"
              className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 uppercase tracking-wider"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 flex items-center justify-between">
            <span>Tip: Look at the code under the barcode on your card</span>
            {isSearchingRemote && (
              <span className="text-cyan-400 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" /> Searching Vault...
              </span>
            )}
          </p>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-4 space-y-2">
          {matches.length > 0 ? (
            matches.map((item) => {
              const isLegendary = item.rarity === 'legendary';
              const isRare = item.rarity === 'rare';
              const code = `Z${item.atomicNumber}-${item.symbol}${currentRoomCode ? `-${currentRoomCode}` : ''}`;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left cursor-pointer ${
                    isLegendary
                      ? 'bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-cyan-500/40 hover:border-cyan-400'
                      : isRare
                      ? 'bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950 border-amber-500/40 hover:border-amber-400'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center font-mono shrink-0">
                      <span className="text-[9px] text-slate-400 leading-none">Z</span>
                      <span className="text-xs font-bold text-white leading-none">{item.atomicNumber}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm tracking-tight">{item.elementName}</span>
                        <span className="text-xs font-mono font-bold text-cyan-400">({item.symbol})</span>
                        {isLegendary && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-pink-950/80 text-pink-300 border border-pink-500/30 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Holo
                          </span>
                        )}
                        {isRare && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-amber-950/80 text-amber-300 border border-amber-500/30">
                            Gold
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        Student: <strong className="text-slate-300">{item.studentName}</strong> &bull; Code: <span className="text-slate-300">{code}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 shrink-0">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          ) : query ? (
            <div className="py-8 text-center text-slate-500 font-mono text-xs">
              <p>No specimen matches found for "{cleanQuery}".</p>
              <p className="text-[11px] text-slate-600 mt-1">
                Make sure the Specimen ID (e.g. Z132-GG-GIGA) or student name is typed correctly.
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 font-mono text-xs">
              <p>Enter any code like <strong className="text-slate-400">Z132-GG</strong> or a student name.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 px-5">
          <span>Official IUPAC Superheavy Register</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
