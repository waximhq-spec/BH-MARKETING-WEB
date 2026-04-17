"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function StartProjectButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 right-6 z-40 hidden md:block"
    >
      <Link href="/estimate">
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(217,22,22,0.4)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2.5 px-5 py-3 bg-[#D91616] text-white rounded-full border border-white/10 shadow-[0_0_15px_rgba(217,22,22,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-white shrink-0" />
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Start a Project
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
