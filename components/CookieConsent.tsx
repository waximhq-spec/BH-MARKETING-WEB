"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("cinmach-cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for a premium transition feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cinmach-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cinmach-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[999] w-auto md:w-full md:max-w-[450px]"
        >
          {/* Dark Glassmorphism container */}
          <div className="relative overflow-hidden rounded-[24px] bg-black/60 backdrop-blur-xl border border-white/10 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4 transform-gpu">
            {/* Subtle Top Red Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#9A0E1F]/50 to-transparent" />

            <div className="flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse" />
                <h4 className="text-white font-mono text-[9px] uppercase tracking-[0.25em] font-black">
                  Your Privacy Matters
                </h4>
              </div>
              {/* Description */}
              <p className="text-white/60 text-[11px] md:text-[12px] leading-relaxed font-light">
                We use cookies and tracking technologies to improve your experience, analyze website traffic, and support our marketing efforts. Learn more in our{" "}
                <Link 
                  href="/privacy-policy" 
                  className="text-white/80 hover:text-white underline underline-offset-2 transition-colors font-medium"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleDecline}
                className="flex-1 h-9 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 active:scale-[0.97]"
              >
                Preferences
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 h-9 rounded-full bg-[#9A0E1F] text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(154,14,31,0.45)] hover:bg-[#b01428] active:scale-[0.97]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
