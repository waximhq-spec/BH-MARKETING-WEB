"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

// Context so children (BackToTop etc.) can call lenis methods
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Disable Lenis on ALL iOS devices (including Chrome on iPhone which uses WebKit).
    // Lenis conflicts with WebKit's native momentum scrolling causing jitter,
    // white flashes, and rendering instability on any browser on iOS.
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) return;

    // Also skip on low-end Android (< 4 cores) to avoid janky scroll
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2 && /Android/.test(ua)) return;

    const lenis = new Lenis({
      lerp: 0.08,           // smoother, less springy
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      syncTouch: false,     // let touch devices use native scroll
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
