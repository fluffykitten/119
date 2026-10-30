import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, User, AlertCircle, Play, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { bakeFramedPortrait } from '../utils/imageCropper';

interface IntakeChamberProps {
  onBeginSynthesis: (studentName: string, photoDataUrl: string, birthMonth: number) => void;
}

export const IntakeChamber: React.FC<IntakeChamberProps> = ({ onBeginSynthesis }) => {
  const [studentName, setStudentName] = useState('');
  const [birthMonth, setBirthMonth] = useState<number>(() => new Date().getMonth() + 1);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Portrait zoom and pan framing controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Bind active MediaStream to video element once mounted
  useEffect(() => {
    if (useWebcam && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.muted = true;
      video.playsInline = true;
      video.play().catch((err: unknown) => {
        console.warn('Webcam playback error:', err);
      });
    }
  }, [useWebcam]);

  // Start webcam
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam API is not supported in this browser context.');
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 720 }, height: { ideal: 960 }, facingMode: 'user' },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      setUseWebcam(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.play().catch((err: unknown) => {
          console.warn('Webcam playback error:', err);
        });
      }
    } catch (err: unknown) {
      console.warn('Camera access denied or unavailable:', err);
      const isPermissionDenied =
        err instanceof DOMException &&
        (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError');
      setCameraError(
        isPermissionDenied
          ? 'Camera permission denied. Please allow camera access in your browser or upload a photo.'
          : 'Camera access unavailable. Please upload a photo.'
      );
      setUseWebcam(false);
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setCountdown(null);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setUseWebcam(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capture frame from webcam
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn('Video frame not ready yet');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/jpeg', 0.92);
    setPhotoDataUrl(data);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    stopCamera();
    setValidationError(null);
  };

  // Trigger 3-second countdown
  const triggerCountdownCapture = () => {
    if (countdown !== null) return;
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          countdownTimerRef.current = null;
          captureSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    countdownTimerRef.current = timer;
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPhotoDataUrl(event.target.result);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setValidationError(null);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };


  // Dragging handlers for interactive framing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!photoDataUrl || useWebcam) return;
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
    if (!photoDataUrl || useWebcam || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStartRef.current = { ...pan };
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

  // Submit and start particle accelerator
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setValidationError('Please enter student full name.');
      return;
    }
    if (!photoDataUrl) {
      setValidationError('Please take a webcam snapshot or upload a photo.');
      return;
    }
    setValidationError(null);

    // Bake framing adjustments if modified or bake to standard 4:5 portrait
    try {
      const bakedPhoto = await bakeFramedPortrait(photoDataUrl, zoom, pan.x, pan.y);
      onBeginSynthesis(studentName.trim(), bakedPhoto, birthMonth);
    } catch {
      onBeginSynthesis(studentName.trim(), photoDataUrl, birthMonth);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner & Context */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 border border-slate-300 text-slate-800 rounded font-mono text-xs uppercase tracking-wider mb-3">
          <span>Stage 01</span>
          <span>&bull;</span>
          <span>Student Ion-Source Registration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2 font-sans">
          Intake Chamber &bull; Element 119+
        </h1>
        <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Register the student candidate for superheavy particle synthesis. Take a live portrait snapshot or upload a portrait to seed the IUPAC quantum characterization engine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-300 rounded-lg shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Visual Capture / Webcam & Framing */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-[4/5] bg-slate-200 border-2 border-dashed border-slate-300 rounded-md overflow-hidden relative flex items-center justify-center">
              {useWebcam ? (
                <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isMirrored ? '-scale-x-100' : ''}`}
                  />
                  {countdown !== null && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-6xl font-mono font-extrabold text-white animate-ping">
                        {countdown}
                      </span>
                    </div>
                  )}
                  {/* Viewfinder crosshairs */}
                  <div className="absolute inset-4 pointer-events-none border border-cyan-500/40">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                  </div>
                </div>
              ) : photoDataUrl ? (
                <div
                  className="w-full h-full relative bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  title="Click and drag to reposition student portrait"
                >
                  <img
                    src={photoDataUrl}
                    alt="Captured student portrait"
                    draggable={false}
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.08s ease-out',
                    }}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Drag prompt indicator */}
                  <div className="absolute top-2 left-2 bg-slate-950/80 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 pointer-events-none">
                    <Move className="w-3 h-3" />
                    <span>Drag to Pan</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 pointer-events-none">
                    Zoom: {Math.round(zoom * 100)}%
                  </div>
                  {/* Viewfinder crosshairs */}
                  <div className="absolute inset-3 pointer-events-none border border-cyan-500/30">
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-slate-500">
                  <User className="w-16 h-16 mx-auto mb-2 text-slate-400 stroke-1" />
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-600">
                    No Portrait Sample
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Use webcam or upload an image file.
                  </p>
                </div>
              )}
            </div>

            {/* Framing & Zoom Controls (Visible when photo is present and webcam is off) */}
            {photoDataUrl && !useWebcam && (
              <div className="w-full mt-2.5 p-2.5 bg-white border border-slate-300 rounded font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span>Photo Framing &amp; Zoom</span>
                  <span className="text-cyan-800 font-bold">{Math.round(zoom * 100)}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.15) * 100) / 100))}
                    className="min-h-[34px] min-w-[34px] p-1 rounded border border-slate-300 bg-slate-50 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
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
                    aria-label="Portrait zoom scale slider"
                  />

                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(3.0, Math.round((z + 0.15) * 100) / 100))}
                    className="min-h-[34px] min-w-[34px] p-1 rounded border border-slate-300 bg-slate-50 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
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
                    className="min-h-[34px] px-2 text-[10px] rounded border border-slate-300 bg-slate-50 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer"
                    title="Reset zoom and position"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-600" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}

            {/* Camera / Upload Controls */}
            <div className="w-full mt-3 flex flex-wrap gap-2">
              {useWebcam ? (
                <>
                  <button
                    type="button"
                    onClick={triggerCountdownCapture}
                    disabled={countdown !== null}
                    className="flex-1 min-h-[44px] bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{countdown !== null ? `Snapping (${countdown}s)...` : 'Snap Photo (3s Timer)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMirrored(!isMirrored)}
                    className="min-h-[44px] px-3 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono rounded flex items-center justify-center gap-1 transition-colors"
                    title="Toggle mirror view"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mirror</span>
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="min-h-[44px] px-3 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono rounded transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex-1 min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Webcam</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 min-h-[44px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-mono font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Upload portrait image file"
              />
            </div>

            {cameraError && (
              <div className="w-full mt-2 p-2 bg-amber-50 border border-amber-300 rounded text-amber-800 text-xs flex items-start gap-1.5 font-mono">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>

          {/* Right Column: Candidate Input Form */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <label htmlFor="studentName" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                Candidate Full Name:
              </label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setValidationError(null);
                }}
                placeholder="e.g. Marie Curie, Salman Khan, Chen Wei"
                className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-700"
                maxLength={40}
                required
              />
              <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                The student name determines the predicted IUPAC element name, chemical symbol, and subshell electron configuration.
              </p>

              {/* Candidate Birth Month Selector */}
              <div className="mt-4">
                <label htmlFor="birthMonth" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                  Candidate Birth Month:
                </label>
                <select
                  id="birthMonth"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(Number(e.target.value))}
                  className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded font-sans text-sm text-slate-900 focus:border-cyan-700 cursor-pointer"
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </div>
            </div>

            {/* Validation Message & Submit Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              {validationError && (
                <div className="mb-3 p-2.5 bg-rose-50 border border-rose-300 rounded text-rose-800 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[50px] bg-slate-900 hover:bg-slate-800 text-white text-sm font-mono font-bold tracking-wide rounded-md shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>INITIATE PARTICLE SYNTHESIS</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
