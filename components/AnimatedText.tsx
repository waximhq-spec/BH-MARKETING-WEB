"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".split-char");

    const t = gsap.fromTo(
      chars,
      { y: 120, opacity: 0, rotate: 10 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
    
    return () => {
      t.kill();
    }
  }, []);

  return (
    <div ref={containerRef} className={clsx("overflow-hidden flex flex-wrap", className)}>
      {text.split(" ").map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.3em] overflow-hidden">
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="split-char inline-block translate-y-full opacity-0"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
