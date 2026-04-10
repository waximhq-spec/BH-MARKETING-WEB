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
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050301]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[3px]"
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Overlays to maintain legibility and premium feel */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {/* Subtle background glow layers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        </div>

        {/* Strong Vignette for cinematic focus */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
        
        {/* Vertical gradient to anchor content */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>
    </div>
  );
}
