"use client";

import React, { useRef, useEffect, useState } from "react";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  autoPlayViewport?: boolean; // If true, plays when in viewport
  hoverPlay?: boolean; // If true, only plays on hover
  mobileFallback?: boolean; // If true, don't play video on mobile
}

export default function SmartVideo({
  src,
  poster,
  autoPlayViewport = false,
  hoverPlay = false,
  mobileFallback = true,
  className,
  ...props
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!videoRef.current || hoverPlay || (mobileFallback && isMobile)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [hoverPlay, mobileFallback, isMobile]);

  useEffect(() => {
    if (!videoRef.current) return;

    const shouldPlay = 
      (!mobileFallback || !isMobile) && // Not restricted by mobile
      ((autoPlayViewport && isInView) || (hoverPlay && isHovered));

    if (shouldPlay) {
      if (videoRef.current.paused) {
        // Handle promise rejection gracefully (e.g. browser autoplay restrictions)
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [isInView, isHovered, isMobile, autoPlayViewport, hoverPlay, mobileFallback]);

  // If mobile fallback is enabled and we're on mobile, we can just render an image or a paused video.
  // We'll render the video tag for CSS sizing consistency, but without <source> tracking if possible, 
  // or just strictly rely on JS pausing + preload=none.

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="metadata"
      muted
      playsInline
      loop // Default loop assuming most background videos are looping
      className={className}
      onMouseEnter={() => hoverPlay && setIsHovered(true)}
      onMouseLeave={() => hoverPlay && setIsHovered(false)}
      {...props}
    >
      {/* On mobile, if we fallback strictly, we could theoretically not render the source, but for simplicity we rely on it being paused and preload="metadata" to save bandwidth. */}
      {(!isMobile || !mobileFallback) && (
        <source src={src} type="video/mp4" />
      )}
    </video>
  );
}
