import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, QrCode, ShieldCheck } from 'lucide-react';
import type { StudentElement } from '../types/element';
import { soundEffects } from '../utils/audioSynthesizer';

interface BarcodeModalProps {
  element: StudentElement;
  roomCode?: string;
  formFactor?: 'card' | 'dossier';
  onClose: () => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ element, roomCode, formFactor, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Construct official direct link
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const roomQuery = roomCode ? `&room=${encodeURIComponent(roomCode)}` : '';
  const formatQuery = formFactor ? `&format=${encodeURIComponent(formFactor)}` : '';
  const shareUrl = `${origin}${pathname}?element=${encodeURIComponent(element.id)}${roomQuery}${formatQuery}`;

  const serialCode = `IUPAC-Z${element.atomicNumber}-${element.symbol}-${element.id.slice(0, 6).toUpperCase()}`;

  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      width: 240,
      margin: 1.5,
      color: {
        dark: '#090d16',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [shareUrl]);

  const handleCopyLink = () => {
    soundEffects.playTabbyPurr();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white border border-slate-300 rounded-lg shadow-2xl p-6 relative font-sans text-slate-900 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner registration crosshairs */}
        <span className="absolute top-1.5 left-2 font-mono text-[9px] text-slate-400">+</span>
        <span className="absolute top-1.5 right-2 font-mono text-[9px] text-slate-400">+</span>
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-slate-400">+</span>
        <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-slate-400">+</span>

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 mb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-800 font-bold mb-0.5">
              <QrCode className="w-3.5 h-3.5" />
              <span>IUPAC Digital Specimen Scanner</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              {element.elementName} ({element.symbol})
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Serial: {serialCode}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="Close scanner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Specimen Frame */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded border border-slate-200 mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code link for ${element.elementName}`}
              className="w-48 h-48 rounded shadow-xs border border-slate-300 bg-white"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center font-mono text-xs text-slate-400">
              Generating Matrix...
            </div>
          )}

          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scan with any phone camera to inspect dossier</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`w-full min-h-[42px] px-3 rounded text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Card Direct Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Direct Card Link</span>
              </>
            )}
          </button>

          <div className="text-center pt-1">
            <span className="text-[10px] font-mono text-slate-400">
              Class Wall: {roomCode ? `ROOM-${roomCode}` : 'Local Offline Mode'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
