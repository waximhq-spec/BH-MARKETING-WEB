"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

function Toggle({ 
  checked, 
  onChange, 
  disabled = false 
}: { 
  checked: boolean; 
  onChange: () => void; 
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onChange}
      className={`w-9 h-5 rounded-full relative transition-colors duration-300 flex items-center shrink-0 ${
        checked ? "bg-[#9A0E1F]" : "bg-white/10 border border-white/5"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <motion.div
        layout
        className="w-3.5 h-3.5 rounded-full bg-white absolute"
        animate={{ x: checked ? 17 : 2 }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: true,
    marketing: false
  });

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

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("cinmach-cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cinmach-cookie-consent", JSON.stringify(settings));
    setIsVisible(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === "essential") return; // cannot toggle essential
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[999] w-auto md:w-full md:max-w-[460px] transform-gpu"
        >
          {/* Dark Glassmorphism container */}
          <motion.div 
            layout="position"
            className="relative overflow-hidden rounded-[24px] bg-black/60 backdrop-blur-xl border border-white/10 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col gap-5"
          >
            {/* Subtle Top Red Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#9A0E1F]/50 to-transparent" />

            <AnimatePresence mode="wait">
              {!showSettings ? (
                /* SCREEN 1: Main Consent Request */
                <motion.div
                  key="main-consent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
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
                      onClick={() => setShowSettings(true)}
                      className="flex-1 h-9 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 active:scale-[0.97]"
                    >
                      Preferences
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 h-9 rounded-full bg-[#9A0E1F] text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(154,14,31,0.45)] hover:bg-[#b01428] active:scale-[0.97]"
                    >
                      Accept
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* SCREEN 2: Custom Preferences Selection */
                <motion.div
                  key="cookie-preferences"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" />
                      <h4 className="text-white font-mono text-[9px] uppercase tracking-[0.25em] font-black">
                        Manage Preferences
                      </h4>
                    </div>
                    <p className="text-white/40 text-[10px] leading-relaxed font-light">
                      Customize how cookies and tracking technologies are managed on our platform.
                    </p>
                  </div>

                  {/* Settings list */}
                  <div className="flex flex-col gap-3.5 my-1">
                    {/* Essential (Disabled Switch) */}
                    <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white font-mono text-[10px] uppercase tracking-wider font-bold">Essential Cookies</span>
                        <span className="text-white/45 text-[10px] leading-normal font-light">Necessary for basic website functionality.</span>
                      </div>
                      <Toggle checked={settings.essential} onChange={() => {}} disabled={true} />
                    </div>

                    {/* Analytics Toggle */}
                    <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white font-mono text-[10px] uppercase tracking-wider font-bold">Analytics Cookies</span>
                        <span className="text-white/45 text-[10px] leading-normal font-light">Help us monitor traffic to improve user experiences.</span>
                      </div>
                      <Toggle 
                        checked={settings.analytics} 
                        onChange={() => toggleSetting("analytics")} 
                      />
                    </div>

                    {/* Marketing Toggle */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white font-mono text-[10px] uppercase tracking-wider font-bold">Marketing Cookies</span>
                        <span className="text-white/45 text-[10px] leading-normal font-light">Used to measure campaign success.</span>
                      </div>
                      <Toggle 
                        checked={settings.marketing} 
                        onChange={() => toggleSetting("marketing")} 
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full pt-1">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 h-9 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 active:scale-[0.97]"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 h-9 rounded-full bg-[#9A0E1F] text-white font-mono text-[9px] uppercase tracking-[0.15em] font-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(154,14,31,0.45)] hover:bg-[#b01428] active:scale-[0.97]"
                    >
                      Save Settings
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
