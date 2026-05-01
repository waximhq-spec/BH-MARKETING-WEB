import React from "react";

interface VisualHiddenSEOProps {
  children: React.ReactNode;
}

/**
 * A component that renders content for SEO purposes (crawlers) 
 * but hides it visually from users without impacting the layout or UI.
 * This ensures key content is present in the initial HTML and visible to Googlebot.
 */
export default function VisualHiddenSEO({ children }: VisualHiddenSEOProps) {
  return (
    <section
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
      }}
      aria-hidden="false"
    >
      {children}
    </section>
  );
}
