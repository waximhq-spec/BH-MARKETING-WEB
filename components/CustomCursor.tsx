"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Use MotionValues for raw position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use Spring for smooth 'lag' follow effect - Tuned for high responsiveness
  const springConfig = { damping: 30, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide native cursor if missed by CSS
    document.body.style.cursor = "none";

    const moveMouse = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX - 4); // Offset by half of dot size
      mouseY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#D91616] rounded-full pointer-events-none z-[99999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(217, 22, 22, 0.4)" : "rgba(217, 22, 22, 1)",
        boxShadow: isHovering ? "0 0 15px rgba(217, 22, 22, 0.4)" : "0 0 0px rgba(217, 22, 22, 0)",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.3 }}
    >
      {/* Refined Outer ring on hover */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-x-[-14px] inset-y-[-14px] border border-[#D91616]/40 rounded-full"
            style={{ 
              boxShadow: "inset 0 0 8px rgba(217, 22, 22, 0.15)",
              filter: "drop-shadow(0 0 4px rgba(217, 22, 22, 0.2))"
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
