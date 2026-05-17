"use client";

import { useEffect, useRef } from "react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slightly slower for more cinematic feel
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* Unified Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        // @ts-ignore
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* SINGLE STATIC OVERLAY FOR MOBILE - No gradients, no blur, no mix-blend-mode */}
      <div className="md:hidden absolute inset-0 w-full h-full bg-black/60 z-[1]" />

      {/* Desktop Cinematic Overlays - Hidden entirely on Mobile */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-10 pointer-events-none">
        <div className="absolute inset-0 w-full h-full bg-black/40 z-[1]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-900/10 rounded-full" style={{
            background: "radial-gradient(circle, rgba(127,29,29,0.1) 0%, transparent 70%)"
          }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-red-950/10 rounded-full" style={{
            background: "radial-gradient(circle, rgba(69,10,10,0.1) 0%, transparent 70%)"
          }} />
        </div>

        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>
    </div>
  );
}
