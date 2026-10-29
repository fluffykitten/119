import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X } from 'lucide-react';
import { bakeFramedPortrait } from '../utils/imageCropper';

interface PhotoFramingModalProps {
  originalPhotoDataUrl: string;
  initialZoom?: number;
  initialPan?: { x: number; y: number };
  onApplyFraming: (newFramedDataUrl: string, zoom: number, pan: { x: number; y: number }) => void;
  onClose: () => void;
}

export const PhotoFramingModal: React.FC<PhotoFramingModalProps> = ({
  originalPhotoDataUrl,
  initialZoom = 1,
  initialPan = { x: 0, y: 0 },
  onApplyFraming,
  onClose,
}) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState(initialPan);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleApply = async () => {
    try {
      const baked = await bakeFramedPortrait(originalPhotoDataUrl, zoom, pan.x, pan.y);
      onApplyFraming(baked, zoom, pan);
      onClose();
    } catch (err) {
      console.error('Failed to bake framed portrait:', err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-100 border border-slate-300 rounded-lg max-w-md w-full p-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              Adjust Portrait Framing
            </h3>
            <p className="text-[11px] text-slate-600 font-mono">
              Drag photo to pan &bull; Slider to zoom
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Box (4:5 Aspect Ratio) */}
        <div className="w-full max-w-[260px] aspect-[4/5] mx-auto bg-slate-950 border-2 border-slate-800 rounded-md overflow-hidden relative cursor-grab active:cursor-grabbing select-none shadow-inner">
          <div
            className="w-full h-full relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={originalPhotoDataUrl}
              alt="Portrait framing preview"
              draggable={false}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.08s ease-out',
              }}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-3 pointer-events-none border border-cyan-400/40">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />
            </div>
          </div>
        </div>

        {/* Zoom Controls Bar */}
        <div className="mt-4 p-3 bg-white border border-slate-300 rounded font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            <span>Zoom Scale</span>
            <span className="text-cyan-800 font-bold">{Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.15) * 100) / 100))}
              className="p-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-200"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-slate-700" />
            </button>

            <input
              type="range"
              min="0.6"
              max="3.0"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-cyan-700 h-1.5 bg-slate-300 rounded-lg cursor-pointer"
              aria-label="Portrait zoom scale"
            />

            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3.0, Math.round((z + 0.15) * 100) / 100))}
              className="p-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-200"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5 text-slate-700" />
            </button>

            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-200 flex items-center gap-1 text-[10px]"
              title="Reset position and zoom"
            >
              <RotateCcw className="w-3 h-3 text-slate-600" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-300 pt-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 rounded text-xs font-mono text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="min-h-[44px] px-4 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Framing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
