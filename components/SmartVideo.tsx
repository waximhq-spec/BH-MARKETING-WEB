"use client";

import React, { useRef, useState, useEffect } from "react";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  autoPlayViewport?: boolean; // Deprecated by user request
  hoverPlay?: boolean; // Deprecated
  mobileFallback?: boolean; // Deprecated
}

export default function SmartVideo({
  src,
  poster,
  autoPlayViewport = false,
  hoverPlay = false,
  mobileFallback = false,
  className = "",
  ...props
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(props.autoPlay ? true : false);
  const [isHovered, setIsHovered] = useState(false);

  // For background videos (autoPlay), return the original simple tag
  if (props.autoPlay) {
    return (
      <video
        key={src}
        ref={videoRef}
        poster={poster}
        preload="auto"
        muted
        playsInline
        loop
        className={className}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  // Enforce no autoplay for portfolio/content videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div 
      className={`relative group/video overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        key={src}
        ref={videoRef}
        poster={poster}
        preload="metadata"
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Frost Blur Overlay when not playing */}
      <div 
        className={`absolute inset-0 bg-white/5 backdrop-blur-[6px] transition-all duration-700 pointer-events-none ${
          !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Play/Pause Button Area */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-20 outline-none"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ease-out hover:bg-[#B11226] hover:border-[#B11226] hover:scale-110 ${
            !isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100"
          }`}
        >
          {!isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          )}
        </div>
      </button>
    </div>
  );
}

