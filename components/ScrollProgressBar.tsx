"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Spring smoothing so the bar feels liquid, not jumpy
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Gradient fill: red → teal to complement both brand accents */}
      <div className="w-full h-full bg-gradient-to-r from-[#D91616] via-[#D91616] to-[#00A8AB]" />

      {/* Subtle glow trail */}
      <div className="absolute inset-0 blur-[3px] bg-gradient-to-r from-[#D91616]/60 via-[#D91616]/40 to-[#00A8AB]/60" />
    </motion.div>
  );
}
