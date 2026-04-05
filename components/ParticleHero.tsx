"use client";

import { useEffect, useRef } from "react";

class Particle {
  angle: number;
  radius: number;
  speed: number;
  color: string;
  history: { x: number; y: number }[];
  size: number;
  centerX: number;
  centerY: number;
  offsetX: number;
  offsetY: number;
  maxHistory: number;

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (Math.max(canvasWidth, canvasHeight)) + 20;
    this.speed = (Math.random() * 0.0004) + 0.0001; 
    if (Math.random() > 0.6) this.speed *= -0.7; 
    
    this.color = color;
    this.history = [];
    const isMobile = canvasWidth < 768;
    this.size = isMobile ? Math.random() * 2.5 + 0.8 : Math.random() * 1.2 + 0.2; 
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;
    this.offsetX = 0;
    this.offsetY = 0;
    this.maxHistory = Math.floor(Math.random() * 6) + 3; 
  }

  update(mouseX: number, mouseY: number) {
    this.angle += this.speed;
    
    const baseX = this.centerX + Math.cos(this.angle) * this.radius;
    const baseY = this.centerY + Math.sin(this.angle) * this.radius;

    // Fluid Repulsion physics
    const dx = (baseX + this.offsetX) - mouseX;
    const dy = (baseY + this.offsetY) - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 400; // Wide footprint to part smoothly

    if (dist < threshold && mouseX > 0) {
      const force = Math.pow((threshold - dist) / threshold, 2); 
      // Push more deliberately
      this.offsetX += (dx / Math.max(dist, 1)) * force * 12;
      this.offsetY += (dy / Math.max(dist, 1)) * force * 12;
    }

    // Heavy fluid dampening (springs back slowly, like thick liquid)
    this.offsetX *= 0.96;
    this.offsetY *= 0.96;

    const finalX = baseX + this.offsetX;
    const finalY = baseY + this.offsetY;

    this.history.push({ x: finalX, y: finalY });
    if (this.history.length > this.maxHistory) {
        this.history.shift();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.history.length < 2) return;
    
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.stroke();
  }
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  // Used to interpolate mouse movement so the glow feels like a fluid trail
  const fluidMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 1200;
    const colors = ["#ffffff", "#e0e0e0", "#8a9bb8", "#5a6a8a", "#303a50"];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(canvas.width, canvas.height, color));
      }
    };

    const animate = () => {
      // Clear canvas fully to maintain transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate the fluid mouse position
      if (mouseRef.current.x > 0) {
         fluidMouseRef.current.x += (mouseRef.current.x - fluidMouseRef.current.x) * 0.15;
         fluidMouseRef.current.y += (mouseRef.current.y - fluidMouseRef.current.y) * 0.15;
      } else {
         fluidMouseRef.current.x = -1000;
         fluidMouseRef.current.y = -1000;
      }

      // Draw the fluid subtle white glow
      if (fluidMouseRef.current.x > 0) {
        const gradient = ctx.createRadialGradient(
          fluidMouseRef.current.x, fluidMouseRef.current.y, 0,
          fluidMouseRef.current.x, fluidMouseRef.current.y, 400
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fluidMouseRef.current.x, fluidMouseRef.current.y, 400, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over"; // Reset blend mode for particles
      }

      particles.forEach((p) => {
        p.update(fluidMouseRef.current.x, fluidMouseRef.current.y);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Snap fluid mouse immediately on first entrance to avoid flying across screen
      if (mouseRef.current.x < 0) {
          fluidMouseRef.current = { x: e.clientX, y: e.clientY };
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#03050a]">
      {/* The Stars / Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none z-10" />
      
      {/* Depth Shadow to blend typography nicely */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#03050a]/20 via-transparent to-[#03050a]/90 z-20 pointer-events-none" />
    </div>
  );
}
