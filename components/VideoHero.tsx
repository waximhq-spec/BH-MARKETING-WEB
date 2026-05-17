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
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050101]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        // @ts-ignore — webkit attribute for older iOS
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Replaced backdrop-blur overlay with a semi-transparent tint.
          Direct backdrop-blur on top of <video> triggers constant GPU
          recompositing on iOS, causing white flash on every scroll frame. */}
      <div className="absolute inset-0 w-full h-full bg-black/20 z-[1]" style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }} />

      {/* Cinematic Overlays to maintain legibility and premium feel */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {/* Subtle background glow layers — replaced blur-[150px] with solid gradients.
            Massive blur() values trigger software rasterization on iOS. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-900/10 rounded-full" style={{
            background: "radial-gradient(circle, rgba(127,29,29,0.1) 0%, transparent 70%)"
          }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-red-950/10 rounded-full" style={{
            background: "radial-gradient(circle, rgba(69,10,10,0.1) 0%, transparent 70%)"
          }} />
        </div>

        {/* Strong Vignette for cinematic focus */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80" />
        
        {/* Vertical gradient to anchor content */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>
    </div>
  );
}
