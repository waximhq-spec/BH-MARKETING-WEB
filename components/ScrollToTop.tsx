"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScroll";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Scroll to top on every route change
    if (lenis) {
      // Use Lenis for smooth scroll to top if available
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback to native window scroll
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
