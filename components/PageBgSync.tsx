"use client";

/**
 * PageBgSync — iOS white/black flash eliminator
 *
 * iOS Safari paints one frame of the html/body background during client-side
 * navigation before the page content is ready. This component syncs
 * html[data-page-bg] immediately on mount so the html background colour
 * matches the page before any content renders.
 *
 * Usage: Place <PageBgSync bg="white" /> or <PageBgSync bg="black" />
 * at the very top of each page component (before any visual elements).
 */

import { useEffect } from "react";

export default function PageBgSync({ bg }: { bg: "white" | "black" }) {
  // Run synchronously before browser paint via useLayoutEffect polyfill:
  // useEffect fires after paint on SSR, but on client navigation it fires
  // before the next frame — fast enough to prevent the flash.
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-page-bg", bg);
    return () => {
      // Reset to black when leaving the page (back to dark pages)
      html.setAttribute("data-page-bg", "black");
    };
  }, [bg]);

  return null;
}
