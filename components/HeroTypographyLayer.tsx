"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroTypographyLayer() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hardcoded positions to avoid hydration mismatches
  const scatteredChars = [
    { char: "C", top: "15%", left: "8%" },
    { char: "X", top: "25%", left: "88%" },
    { char: "/", top: "65%", left: "12%" },
    { char: "2", top: "80%", left: "82%" },
    { char: "0", top: "42%", left: "92%" },
    { char: "—", top: "10%", left: "65%" },
    { char: "*", top: "85%", left: "18%" },
    { char: "+", top: "35%", left: "4%" },
    { char: "6", top: "75%", left: "94%" },
    { char: "M", top: "52%", left: "8%" },
    { char: "A", top: "7%", left: "30%" },
    { char: "N", top: "90%", left: "55%" },
  ];

  return (
    <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden select-none">
      {/* ── Top white gradient wash ──────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-white/[0.04] to-transparent mix-blend-overlay z-0" />
      
      {/* ── Subtle Grain / Noise Overlay just for hero ── */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Large 2026 Text Layers ───────────────────── */}
      {/* Container for alignment and animation */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [-15, 15, -15], x: [-5, 5, -5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] md:top-[10%] left-0 w-full h-[80vh] flex items-center justify-center mix-blend-overlay z-10"
        style={{
          // Mask the whole text component so it fades into background at top/bottom and edges
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect"
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full font-sans">
          {/* Base layer (moderate blur, sharpest) */}
          <h1 className="absolute text-[30vw] md:text-[35vw] font-bold text-white/[0.08] blur-[4px] tracking-tighter whitespace-nowrap"
              style={{ transform: "scaleY(1.15)" }}>
            2026
          </h1>
          
          {/* Medium blur layer, slightly offset, reddish tint */}
          <h1 className="absolute text-[30vw] md:text-[35vw] font-bold text-[#D91616]/[0.06] blur-[12px] tracking-tighter whitespace-nowrap"
              style={{ transform: "scaleY(1.15) translate(15px, 10px)" }}>
            2026
          </h1>

          {/* Heavy blur layer */}
          <h1 className="absolute text-[30vw] md:text-[35vw] font-bold text-white/[0.12] blur-[20px] tracking-tighter whitespace-nowrap"
              style={{ transform: "scaleY(1.15) translate(-10px, -20px)" }}>
            2026
          </h1>
        </div>
      </motion.div>

      {/* ── Scattered Tiny Characters ────────────────── */}
      {mounted && scatteredChars.map((item, index) => (
        <motion.span
          key={index}
          className="absolute text-[10px] md:text-xs font-mono text-white/[0.18] blur-[1px] mix-blend-overlay z-10"
          style={{ top: item.top, left: item.left }}
          animate={shouldReduceMotion ? {} : { 
            y: [0, -12, 0], 
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ 
            duration: 8 + (index % 4), 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.4
          }}
        >
          {item.char}
        </motion.span>
      ))}
    </div>
  );
}
