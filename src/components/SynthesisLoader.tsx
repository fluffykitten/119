import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../utils/audioSynthesizer';
import type { CardRarity } from '../types/element';
import { Sparkles, Zap } from 'lucide-react';

interface SynthesisLoaderProps {
  studentName: string;
  photoDataUrl?: string;
  rarity?: CardRarity;
  onComplete: () => void;
}

interface DisintegrationParticle {
  originX: number;
  originY: number;
  color: string;
  size: number;
  angle: number;
  initialDist: number;
  releaseThreshold: number;
  spiralSpeed: number;
  driftMultiplier: number;
}

export const SynthesisLoader: React.FC<SynthesisLoaderProps> = ({
  studentName,
  photoDataUrl,
  rarity = 'common',
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [telemetryStage, setTelemetryStage] = useState(1);
  const [beamEnergy, setBeamEnergy] = useState(140);
  const [magneticFlux, setMagneticFlux] = useState(2.1);
  const [disintegrationPercent, setDisintegrationPercent] = useState(0);

  const isRare = rarity === 'rare';
  const isLegendary = rarity === 'legendary';

  // Derived element name
  const cleanName = studentName.trim().replace(/[^a-zA-Z]/g, '') || 'Student';
  const derivedElementName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase() + 'ium';

  useEffect(() => {
    // Trigger procedural accelerator hum
    soundEffects.playCyclotronHum(2.4);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 2400; // 2.4 seconds total sequence
    let collisionPlayed = false;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const targetRadius = 44; // Central photo aperture radius

    // Particle sampling buffer
    const particles: DisintegrationParticle[] = [];
    const photoImg = new Image();
    let isPhotoLoaded = false;

    const initParticlesFromImage = (image: HTMLImageElement) => {
      try {
        const offscreen = document.createElement('canvas');
        const size = 64;
        offscreen.width = size;
        offscreen.height = size;
        const offCtx = offscreen.getContext('2d');
        if (!offCtx) return;

        offCtx.save();
        offCtx.beginPath();
        offCtx.arc(size / 2, size / 2, 28, 0, Math.PI * 2);
        offCtx.clip();
        offCtx.drawImage(image, 0, 0, size, size);
        offCtx.restore();

        const imgData = offCtx.getImageData(0, 0, size, size).data;
        const step = 2; // Sample in 2px steps for crisp resolution

        for (let y = 0; y < size; y += step) {
          for (let x = 0; x < size; x += step) {
            const idx = (y * size + x) * 4;
            const a = imgData[idx + 3];
            if (a < 40) continue;

            const dx = x - size / 2;
            const dy = y - size / 2;
            const distNorm = Math.hypot(dx, dy) / 28;
            if (distNorm > 1) continue;

            const originX = centerX + dx * (targetRadius / 28);
            const originY = centerY + dy * (targetRadius / 28);
            const initialDist = Math.hypot(originX - centerX, originY - centerY);
            const angle = Math.atan2(originY - centerY, originX - centerX);

            // Outer ring peels off first (0.28), inner core dissolves by (0.72)
            const releaseThreshold = 0.28 + (1 - distNorm) * 0.42 + (Math.random() * 0.08 - 0.04);
            const spiralSpeed = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 5);

            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];

            particles.push({
              originX,
              originY,
              color: `rgb(${r},${g},${b})`,
              size: 2.2,
              angle,
              initialDist,
              releaseThreshold,
              spiralSpeed,
              driftMultiplier: 0.8 + Math.random() * 0.5,
            });
          }
        }
      } catch (err) {
        console.warn('Could not sample photo particles, generating fallback particles:', err);
      }
    };

    const initFallbackParticles = () => {
      if (particles.length > 0) return;
      for (let i = 0; i < 480; i++) {
        const rad = Math.sqrt(Math.random()) * targetRadius;
        const ang = Math.random() * Math.PI * 2;
        const originX = centerX + Math.cos(ang) * rad;
        const originY = centerY + Math.sin(ang) * rad;
        const distNorm = rad / targetRadius;
        const releaseThreshold = 0.28 + (1 - distNorm) * 0.42 + (Math.random() * 0.08 - 0.04);
        const spiralSpeed = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 5);
        const hue = (i * 23) % 360;

        particles.push({
          originX,
          originY,
          color: `hsl(${hue}, 80%, 65%)`,
          size: 2.2,
          angle: ang,
          initialDist: rad,
          releaseThreshold,
          spiralSpeed,
          driftMultiplier: 0.8 + Math.random() * 0.5,
        });
      }
    };

    if (photoDataUrl) {
      photoImg.onload = () => {
        isPhotoLoaded = true;
        initParticlesFromImage(photoImg);
      };
      photoImg.src = photoDataUrl;
    } else {
      initFallbackParticles();
    }

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ensure particles are ready
      if (particles.length === 0 && !isPhotoLoaded) {
        initFallbackParticles();
      }

      // Telemetry state updates
      if (progress < 0.28) {
        setTelemetryStage(1);
        setBeamEnergy(Math.round(140 + progress * 400));
        setMagneticFlux(Math.round((2.1 + progress * 4) * 10) / 10);
        setDisintegrationPercent(0);
      } else if (progress < 0.55) {
        setTelemetryStage(2);
        setBeamEnergy(Math.round(250 + progress * 160));
        setMagneticFlux(Math.round((3.2 + progress * 2.5) * 10) / 10);
        const disT = (progress - 0.28) / 0.48;
        setDisintegrationPercent(Math.min(100, Math.round(disT * 100)));
      } else if (progress < 0.82) {
        setTelemetryStage(3);
        setBeamEnergy(338);
        setMagneticFlux(5.2);
        const disT = (progress - 0.28) / 0.48;
        setDisintegrationPercent(Math.min(100, Math.round(disT * 100)));
      } else {
        setTelemetryStage(4);
        setDisintegrationPercent(100);
        if (!collisionPlayed) {
          soundEffects.playTriumphantPull(rarity);
          collisionPlayed = true;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Vacuum synchrotron ring background
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isLegendary ? '#0284c7' : isRare ? '#b45309' : '#334155';
      ctx.lineWidth = isLegendary || isRare ? 2 : 1.5;
      ctx.stroke();

      // Outer degree calibration ticks
      for (let i = 0; i < 36; i++) {
        const angle = (i * 10 * Math.PI) / 180;
        const x1 = centerX + Math.cos(angle) * (radius - 5);
        const y1 = centerY + Math.sin(angle) * (radius - 5);
        const x2 = centerX + Math.cos(angle) * (radius + 2);
        const y2 = centerY + Math.sin(angle) * (radius + 2);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = i % 9 === 0 ? (isLegendary ? '#38bdf8' : isRare ? '#f59e0b' : '#0e7490') : '#475569';
        ctx.lineWidth = i % 9 === 0 ? 1.5 : 0.75;
        ctx.stroke();
      }

      // 2. Center Target Chamber & Disintegrating Portrait
      if (progress < 0.82) {
        // A. If intact phase (progress < 0.28), render full photo with laser scanning reticle
        if (progress < 0.28) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, targetRadius, 0, Math.PI * 2);
          ctx.clip();

          if (isPhotoLoaded && photoImg.width > 0) {
            ctx.drawImage(photoImg, centerX - targetRadius, centerY - targetRadius, targetRadius * 2, targetRadius * 2);
          } else {
            // High-tech placeholder if image still baking
            ctx.fillStyle = '#0f172a';
            ctx.fill();
            ctx.fillStyle = '#38bdf8';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('TARGET LOCK', centerX, centerY + 3);
          }
          ctx.restore();

          // Magnetic containment aperture border
          ctx.beginPath();
          ctx.arc(centerX, centerY, targetRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isLegendary ? '#38bdf8' : isRare ? '#fbbf24' : '#06b6d4';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Vertical laser scanline sweep
          const scanY = centerY - targetRadius + ((elapsed * 0.16) % (targetRadius * 2));
          ctx.beginPath();
          ctx.moveTo(centerX - targetRadius + 4, scanY);
          ctx.lineTo(centerX + targetRadius - 4, scanY);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // B. Disintegration Phase (0.28 <= progress < 0.76): Particles peel and spiral outward!
          const disintegrationPhase = Math.min(1, (progress - 0.28) / 0.48);

          // Render all particles
          for (let pIdx = 0; pIdx < particles.length; pIdx++) {
            const p = particles[pIdx];

            if (progress < p.releaseThreshold) {
              // Unreleased particle: vibrates slightly with energetic lattice instability
              const jitter = disintegrationPhase * 1.8;
              const jx = (Math.random() - 0.5) * jitter;
              const jy = (Math.random() - 0.5) * jitter;
              ctx.fillStyle = p.color;
              ctx.fillRect(p.originX + jx, p.originY + jy, p.size, p.size);
            } else {
              // Released particle: spirals outward along relativistic cyclotron lines!
              const relT = Math.min(1, (progress - p.releaseThreshold) / (0.76 - p.releaseThreshold));
              const easedT = Math.pow(relT, 0.75);

              // Radial distance expanding toward accelerator beam ring
              const currentDist = p.initialDist + (radius - p.initialDist) * easedT * p.driftMultiplier;
              // Swirling spiral angle
              const currentAngle = p.angle + p.spiralSpeed * easedT * 3.8;
              const px = centerX + Math.cos(currentAngle) * currentDist;
              const py = centerY + Math.sin(currentAngle) * currentDist;

              // Color energizes into neon particle burst near outer ring
              ctx.fillStyle = relT > 0.55
                ? (isLegendary ? '#f472b6' : isRare ? '#fde047' : '#38bdf8')
                : p.color;
              ctx.fillRect(px - p.size / 2, py - p.size / 2, p.size * (1 + relT * 0.6), p.size * (1 + relT * 0.6));
            }
          }

          // Cherenkov ionization electrical arcs from ring into target core
          if (progress > 0.35 && progress < 0.76 && Math.random() > 0.35) {
            ctx.beginPath();
            const arcAngle = Math.random() * Math.PI * 2;
            let ax = centerX + Math.cos(arcAngle) * radius;
            let ay = centerY + Math.sin(arcAngle) * radius;
            ctx.moveTo(ax, ay);

            const steps = 4;
            for (let s = 1; s <= steps; s++) {
              const frac = s / steps;
              const tx = centerX + (Math.random() - 0.5) * 24;
              const ty = centerY + (Math.random() - 0.5) * 24;
              const mx = ax + (tx - ax) * frac + (Math.random() - 0.5) * 16;
              const my = ay + (ty - ay) * frac + (Math.random() - 0.5) * 16;
              ctx.lineTo(mx, my);
            }
            ctx.strokeStyle = isLegendary ? '#ec4899' : isRare ? '#fbbf24' : '#38bdf8';
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }
        }

        // 3. Counter-rotating heavy-ion collider beams
        const speedMultiplier = 1 + Math.pow(progress, 2.6) * 24;
        const angleClockwise = (elapsed * 0.008 * speedMultiplier) % (Math.PI * 2);
        const angleCounter = (-elapsed * 0.007 * speedMultiplier) % (Math.PI * 2);

        // Projectile beam (clockwise)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angleClockwise - 0.8, angleClockwise);
        ctx.strokeStyle = isLegendary ? '#ec4899' : isRare ? '#f59e0b' : '#06b6d4';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX + Math.cos(angleClockwise) * radius, centerY + Math.sin(angleClockwise) * radius, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Target nuclide beam (counter-clockwise)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 8, angleCounter - 0.6, angleCounter);
        ctx.strokeStyle = isLegendary ? '#06b6d4' : isRare ? '#fbbf24' : '#f59e0b';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX + Math.cos(angleCounter) * (radius - 8), centerY + Math.sin(angleCounter) * (radius - 8), 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isLegendary ? '#a855f7' : '#fbbf24';
        ctx.fill();
      } else {
        // 4. Fusion Impact Moment (progress >= 0.82): Supernova explosion & shockwave
        const flashT = (progress - 0.82) / 0.18;
        const flashRadius = flashT * radius * 1.4;

        // Shockwave ripple
        ctx.beginPath();
        ctx.arc(centerX, centerY, flashRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLegendary ? '#ec4899' : isRare ? '#f59e0b' : '#38bdf8';
        ctx.lineWidth = Math.max(1, (1 - flashT) * 4);
        ctx.stroke();

        // Expanding fusion fireball
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(1, flashRadius * 0.75), 0, Math.PI * 2);
        ctx.fillStyle = isLegendary
          ? `rgba(236, 72, 153, ${Math.max(0, 0.7 - flashT * 0.7)})`
          : isRare
          ? `rgba(245, 158, 11, ${Math.max(0, 0.7 - flashT * 0.7)})`
          : `rgba(6, 182, 212, ${Math.max(0, 0.6 - flashT * 0.6)})`;
        ctx.fill();

        // Radial emission particle debris
        const particleCount = isLegendary ? 42 : isRare ? 32 : 24;
        const rainbowColors = ['#f43f5e', '#38bdf8', '#fbbf24', '#a855f7', '#ffffff', '#34d399'];
        for (let p = 0; p < particleCount; p++) {
          const pAngle = (p * (Math.PI * 2)) / particleCount + p * 0.25;
          const pDist = flashT * radius * (0.8 + (p % 5) * 0.28);
          const px = centerX + Math.cos(pAngle) * pDist;
          const py = centerY + Math.sin(pAngle) * pDist;

          ctx.beginPath();
          ctx.arc(px, py, isLegendary ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isLegendary
            ? rainbowColors[p % rainbowColors.length]
            : isRare
            ? (p % 2 === 0 ? '#fbbf24' : '#ffffff')
            : (p % 2 === 0 ? '#ffffff' : '#38bdf8');
          ctx.fill();
        }
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setTimeout(onComplete, 150);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete, rarity, isRare, isLegendary, photoDataUrl]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">
      {/* Header status */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-slate-100 rounded font-mono text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Stage 02 &bull; Heavy-Ion Synchrotron Active</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Synthesizing Element {derivedElementName}...
        </h2>
        <p className="text-slate-600 font-mono text-xs mt-1">
          Relativistic ion collision in progress. Specimen deconstructing into subatomic plasma.
        </p>

        {/* TCG God Pack Pull Teaser Banner */}
        {telemetryStage >= 4 && (isLegendary || isRare) && (
          <div className="mt-3 animate-bounce">
            {isLegendary ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-300 text-slate-950 font-mono font-extrabold text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                ✦ GOD PACK PULL: LEGENDARY HOLOGRAPHIC FOIL DETECTED ✦
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-mono font-extrabold text-xs shadow-md border border-amber-500">
                <span>★</span>
                <span>RARE PULL: GILDED GOLD ISOTOPE DETECTED</span>
                <span>★</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Accelerator Canvas */}
      <div className={`relative p-3 bg-slate-950 rounded-xl border shadow-lg transition-colors ${
        isLegendary
          ? 'border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.3)]'
          : isRare
          ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
          : 'border-slate-700'
      }`}>
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]"
        />
        <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400">
          BEAM: ⁵⁸Fe²⁴⁺
        </div>
        <div className="absolute top-4 right-4 text-[10px] font-mono text-amber-400">
          TARGET: {studentName.slice(0, 10).toUpperCase()}
        </div>
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-400">
          B-FIELD: {magneticFlux} T
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400">
          ENERGY: {beamEnergy} MeV
        </div>

        {/* Live Disintegration Progress HUD Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-cyan-300 whitespace-nowrap shadow-xs">
          IONIZATION: {disintegrationPercent}%
        </div>
      </div>

      {/* Diagnostic telemetry sequence */}
      <div className="w-full max-w-md mt-6 bg-slate-50 border border-slate-300 rounded-md p-4 font-mono text-xs">
        <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 pb-1 border-b border-slate-200 flex justify-between">
          <span>Diagnostic Beamline Stream</span>
          <span className="text-cyan-700 font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-600" />
            SYNCHROTRON ONLINE
          </span>
        </div>

        <ul className="space-y-1.5 text-slate-700">
          <li className={`flex items-center gap-2 ${telemetryStage >= 1 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
            <span className={telemetryStage >= 1 ? 'text-cyan-700 font-bold' : ''}>[01]</span>
            <span>Candidate specimen injected into magnetic target chamber</span>
          </li>
          <li className={`flex items-center gap-2 ${telemetryStage >= 2 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
            <span className={telemetryStage >= 2 ? 'text-cyan-700 font-bold' : ''}>[02]</span>
            <span>Heavy-ion beam bombardment: Relativistic lattice ionization ({disintegrationPercent}%)</span>
          </li>
          <li className={`flex items-center gap-2 ${telemetryStage >= 3 ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
            <span className={telemetryStage >= 3 ? 'text-cyan-700 font-bold' : ''}>[03]</span>
            <span>Subatomic plasma vaporization: Coulomb barrier breached at {beamEnergy} MeV</span>
          </li>
          <li className={`flex items-center gap-2 ${telemetryStage >= 4 ? (isLegendary ? 'text-pink-600 font-extrabold' : isRare ? 'text-amber-700 font-extrabold' : 'text-emerald-700 font-bold') : 'text-slate-400'}`}>
            <span className={telemetryStage >= 4 ? (isLegendary ? 'text-pink-500' : isRare ? 'text-amber-600' : 'text-emerald-600') : ''}>[04]</span>
            <span>
              {isLegendary
                ? '✦ Coincident alpha-decay chain registered: LEGENDARY FOIL!'
                : isRare
                ? '★ Stable nuclear resonance registered: RARE GILDED ISOTOPE!'
                : 'Coincident alpha-decay chain registered! Element verified.'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
