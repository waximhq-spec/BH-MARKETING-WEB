"use client";

import React, { useRef, useState, useEffect } from "react";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  autoPlayViewport?: boolean;
  hoverPlay?: boolean;
  mobileFallback?: boolean;
}

export default function SmartVideo({
  src,
  poster,
  className = "",
  ...props
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // HERO / BACKGROUND VIDEOS: Keep as they were (immediate autoplay)
  if (props.autoPlay) {
    return (
      <video
        key={src}
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

  const handleInteraction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isActivated) {
      setIsActivated(true);
      setIsLoading(true);
    } else {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    }
  };

  useEffect(() => {
    if (isActivated && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, show UI to play manually
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  }, [isActivated]);

  return (
    <div 
      className={`relative group/video overflow-hidden cursor-pointer ${className}`}
      onClick={handleInteraction}
    >
      {/* 1. THUMBNAIL LAYER (Static Image) - Hidden only when video is actually playing */}
      <div className={`absolute inset-0 z-[5] transition-opacity duration-700 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {poster ? (
            <img
              src={poster}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900" />
          )}
      </div>

      {/* 2. VIDEO LAYER (Only mounted when activated) */}
      {isActivated && (
        <video
          key={src}
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
          onPlay={() => { setIsPlaying(true); setIsLoading(false); }}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          {...props}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* 3. FROST BLUR OVERLAY (Maintains cinematic aesthetic) */}
      <div 
        className={`absolute inset-0 bg-white/5 backdrop-blur-[4px] transition-opacity duration-700 pointer-events-none z-[10] transform-gpu ${
          !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 4. INTERACTION AREA / PLAY BUTTON */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-[20] pointer-events-none">
        {isLoading && isActivated ? (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div 
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ease-out hover:bg-[#ff2a2a] hover:border-[#ff2a2a] hover:scale-110 transform-gpu will-change-transform ${
              !isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100"
            }`}
          >
            {!isPlaying ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

