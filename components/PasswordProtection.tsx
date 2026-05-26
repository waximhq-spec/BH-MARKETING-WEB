"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PasswordProtection() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const savedCode = localStorage.getItem("cinmach_passcode");
    if (savedCode === "0831") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    // Add a tiny artificial delay to make it feel premium
    setTimeout(() => {
      if (code === "0831") {
        localStorage.setItem("cinmach_passcode", "0831");
        setIsAuthenticated(true);
      } else {
        setError(true);
        setIsSubmitting(false);
        // Reset password input
        setCode("");
      }
    }, 600);
  };

  // Prevent rendering anything if we are still checking local storage
  if (isAuthenticated === null) return null;

  return (
    <AnimatePresence>
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9A0E1F]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Login Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-4 relative"
          >
            {/* Card with Glassmorphism */}
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center">
              
              {/* Brand Logo */}
              <div className="mb-8">
                <h1 className="text-2xl font-black tracking-[0.25em] text-white select-none">
                  CINMACH<span className="text-[#9A0E1F]">.</span>
                </h1>
                <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 mt-2">
                  Creative & Marketing Agency
                </p>
              </div>

              {/* Status Header */}
              <div className="mb-6">
                <h2 className="text-white font-bold text-sm tracking-widest uppercase">
                  Private Access Required
                </h2>
                <p className="text-white/50 text-[12px] font-light mt-1.5 leading-relaxed">
                  Enter the secure access code to preview the launch candidate.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(false);
                    }}
                    placeholder="ENTER PASSCODE"
                    disabled={isSubmitting}
                    maxLength={10}
                    className={`w-full bg-black/40 border text-center font-mono text-[13px] tracking-[0.3em] uppercase px-4 py-4 rounded-xl text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-black/60 ${
                      error
                        ? "border-[#9A0E1F]/50 shadow-[0_0_15px_rgba(154,14,31,0.15)] text-[#9A0E1F]"
                        : "border-white/5 focus:border-[#9A0E1F]/30 focus:shadow-[0_0_15px_rgba(154,14,31,0.1)]"
                    }`}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[#9A0E1F] text-[10px] font-mono tracking-widest uppercase"
                    >
                      ACCESS DENIED. INVALID PASSCODE.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !code}
                  className="w-full bg-white hover:bg-white/95 text-black disabled:bg-white/20 disabled:text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    "SUBMIT PASSCODE"
                  )}
                </button>
              </form>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase animate-pulse">
                &copy; {new Date().getFullYear()} CINMACH. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
