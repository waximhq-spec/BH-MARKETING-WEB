"use client";

/**
 * PageBgSync — iOS white/black flash eliminator & White Page Top Glow
 *
 * iOS Safari paints one frame of the html/body background during client-side
 * navigation before the page content is ready. This component syncs
 * html[data-page-bg] immediately on mount so the html background colour
 * matches the page before any content renders.
 *
 * Additionally, for white pages, it renders a subtle reddish top-right glow
 * to provide a signature brand accent shadow.
 */

import { useEffect } from "react";

export default function PageBgSync({ bg }: { bg: "white" | "black" }) {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-page-bg", bg);
    return () => {
      // Reset to black when leaving the page (back to dark pages)
      html.setAttribute("data-page-bg", "black");
    };
  }, [bg]);

  if (bg === "white") {
    return (
      <div
        className="pointer-events-none absolute top-0 right-0 z-0 w-full max-w-[700px] sm:max-w-[850px] lg:max-w-[1050px] h-[500px] sm:h-[650px] lg:h-[800px] overflow-hidden transform-gpu"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(154, 14, 31, 0.26) 0%, rgba(255, 42, 42, 0.12) 25%, rgba(154, 14, 31, 0.03) 55%, transparent 75%)",
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)",
        }}
        aria-hidden="true"
      />
    );
  }

  return null;
}
