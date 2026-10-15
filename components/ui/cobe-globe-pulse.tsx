"use client";

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import createGlobe, { type Globe } from 'cobe';
import { cn } from '@/lib/utils';

export interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
}

interface GlobePulseProps {
  id?: string;
  markers?: PulseMarker[];
  className?: string;
  /** Rotation per frame at 60 Hz, matching the supplied component. */
  speed?: number;
}

const defaultMarkers: PulseMarker[] = [
  { id: 'pulse-1', location: [51.51, -0.13], delay: 0 },
  { id: 'pulse-2', location: [40.71, -74.01], delay: 0.5 },
  { id: 'pulse-3', location: [35.68, 139.65], delay: 1 },
  { id: 'pulse-4', location: [-33.87, 151.21], delay: 1.5 },
];

export function GlobePulse({ id, markers = defaultMarkers, className, speed = 0.003 }: GlobePulseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const mount = mountRef.current;
    if (!root || !mount) return;
    const events = new AbortController();
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    // COBE owns and wraps this canvas. Keep its mutable DOM outside React's tree.
    const canvas = document.createElement('canvas');
    canvas.className = 'globe-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    mount.append(canvas);
    let globe: Globe | null = null;
    let frame = 0;
    let phi = -Math.PI / 2 + 0.2;
    let theta = 0.2;
    let lastTime = 0;
    let width = 0;
    let onScreen = true;
    let pointer: { id: number; x: number; y: number; phi: number; theta: number; touch: boolean } | null = null;
    const scale = 1.18;

    // Project the same coordinates as COBE. Pulses also work without CSS anchors.
    function positionMarkers() {
      markers.forEach((marker, index) => {
        const element = markerRefs.current[index];
        if (!element) return;
        const lat = marker.location[0] * Math.PI / 180;
        const lon = marker.location[1] * Math.PI / 180;
        const x = Math.cos(lat) * Math.cos(lon) * 0.8;
        const y = Math.sin(lat) * 0.8;
        const z = -Math.cos(lat) * Math.sin(lon) * 0.8;
        const px = Math.cos(phi) * x + Math.sin(phi) * z;
        const py = Math.sin(phi) * Math.sin(theta) * x + Math.cos(theta) * y - Math.cos(phi) * Math.sin(theta) * z;
        const pz = -Math.sin(phi) * Math.cos(theta) * x + Math.sin(theta) * y + Math.cos(phi) * Math.cos(theta) * z;
        element.style.left = `${(px * scale + 1) * 50}%`;
        element.style.top = `${(1 - py * scale) * 50}%`;
        element.style.opacity = String(Math.min(1, Math.max(0, pz * 12)));
      });
    }

    function draw() {
      globe?.update({ phi, theta });
      positionMarkers();
    }

    function isActive() {
      return onScreen && !document.hidden && root!.dataset.sceneActive !== 'false';
    }

    function animate(time: number) {
      frame = 0;
      if (!globe || !isActive()) return;
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16.67;
      lastTime = time;
      if (!pointer && !motion.matches) phi += speed * elapsed / (1000 / 60);
      draw();
      if (!motion.matches || pointer) frame = requestAnimationFrame(animate);
    }

    function refresh() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      root!.dataset.animating = String(isActive() && !motion.matches);
      if (globe && isActive()) {
        draw();
        // One frame also refreshes the asynchronously decoded embedded map.
        frame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      const nextWidth = mount!.clientWidth;
      if (!nextWidth || nextWidth === width) return;
      width = nextWidth;
      if (globe) {
        globe.update({ width, height: width });
        draw();
        return;
      }
      try {
        const context = canvas.getContext('webgl2', { alpha: true, antialias: true }) || canvas.getContext('webgl', { alpha: true, antialias: true });
        if (!context) throw new Error('WebGL unavailable');
        globe = createGlobe(canvas, {
          devicePixelRatio: Math.min(devicePixelRatio || 1, 2),
          width, height: width, phi, theta, scale,
          dark: 1, diffuse: 1.5, mapSamples: 16000, mapBrightness: 10,
          baseColor: [0.5, 0.5, 0.5], markerColor: [0.2, 0.8, 0.9],
          glowColor: [0.05, 0.05, 0.05], markerElevation: 0,
          markers: markers.map(marker => ({ location: marker.location, size: 0.025 })),
          arcs: [], arcColor: [0.3, 0.85, 0.95], arcWidth: 0.5, arcHeight: 0.25, opacity: 0.7,
        });
        root!.dataset.globeReady = 'true';
        setUnavailable(false);
        refresh();
      } catch {
        setUnavailable(true);
        root!.dataset.globeReady = 'false';
      }
    }

    function release() {
      if (pointer && canvas.hasPointerCapture(pointer.id)) canvas.releasePointerCapture(pointer.id);
      pointer = null;
      canvas.style.cursor = 'grab';
      refresh();
    }

    canvas.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !isActive()) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, phi, theta, touch: event.pointerType === 'touch' };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = 'grabbing';
    }, { signal: events.signal });
    canvas.addEventListener('pointermove', event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      phi = pointer.phi + (event.clientX - pointer.x) / 300;
      // Vertical touch gestures remain available for scrolling the landing page.
      if (!pointer.touch) theta = Math.max(-1, Math.min(1, pointer.theta + (event.clientY - pointer.y) / 1000));
      draw();
    }, { signal: events.signal });
    for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      canvas.addEventListener(name, release, { signal: events.signal });
    }
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setUnavailable(true);
      root.dataset.globeReady = 'false';
    }, { signal: events.signal });
    root.addEventListener('globe-visibility', refresh, { signal: events.signal });
    document.addEventListener('visibilitychange', refresh, { signal: events.signal });
    motion.addEventListener('change', refresh, { signal: events.signal });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const intersectionObserver = new IntersectionObserver(entries => {
      onScreen = entries[0]?.isIntersecting ?? false;
      refresh();
    });
    intersectionObserver.observe(root);
    resize();
    const mapRefresh = window.setTimeout(refresh, 300);

    return () => {
      events.abort();
      clearTimeout(mapRefresh);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      globe?.destroy();
      mount.replaceChildren();
    };
  }, [markers, speed]);

  return (
    <div id={id} ref={rootRef} className={cn('globe-pulse relative aspect-square select-none', className)} role="img" aria-label="Rotating dotted Earth with pulsing location markers. Drag horizontally to rotate.">
      <div ref={mountRef} className="globe-mount" />
      {unavailable && <svg className="globe-fallback" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="94" /><ellipse cx="100" cy="100" rx="45" ry="94" /><ellipse cx="100" cy="100" rx="94" ry="34" /><path d="M6 100h188M100 6v188" /></svg>}
      {!unavailable && markers.map((marker, index) => (
        <div key={marker.id} ref={element => { markerRefs.current[index] = element; }} className="globe-pulse-marker" aria-hidden="true">
          <span className="globe-pulse-ring" style={{ '--pulse-delay': `${marker.delay}s` } as CSSProperties} />
          <span className="globe-pulse-ring" style={{ '--pulse-delay': `${marker.delay + 0.5}s` } as CSSProperties} />
          <span className="globe-pulse-dot" />
        </div>
      ))}
    </div>
  );
}
