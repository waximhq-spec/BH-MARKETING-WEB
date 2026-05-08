"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer to detect theme sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // We only care about sections intersecting with the bottom area of the viewport
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme");
            
            // Map custom theme names to standard dark/light
            if (theme === "dark" || theme === "pricing") {
              setCurrentTheme("dark");
            } else if (theme === "light" || theme === "split") {
              // Note: "split" (ProcessSection) has white background on the right side where the button is
              setCurrentTheme("light");
            }
          }
        });
      },
      {
        // Shrink the observer root to only look at the bottom 15% of the viewport
        // This ensures the theme matches exactly where the button is positioned
        rootMargin: "-85% 0px 0px 0px",
        threshold: 0,
      }
    );

    // Watch all elements with data-theme
    document.querySelectorAll("[data-theme]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // User said: "red on black background sections and black on white background sections"
  // dark theme -> Red (Red-600)
  // light theme -> Black
  const isDark = currentTheme === "dark";
  const bgColor = isDark ? "rgba(220, 38, 38, 0.95)" : "rgba(0, 0, 0, 0.95)";
  const iconColor = "text-white";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            backgroundColor: bgColor
          }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            opacity: { duration: 0.3 },
            y: { duration: 0.3 },
            backgroundColor: { duration: 0.6, ease: "easeInOut" }
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 md:bottom-10 md:right-10 z-[998] transform-gpu w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-[0.92] transition-transform duration-200"
          aria-label="Back to top"
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={iconColor}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
