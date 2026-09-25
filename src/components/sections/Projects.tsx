"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Tapecut.online",
    category: "Proprietary Sandbox",
    description: "Our core performance sandbox. A testing ground for cutting-edge React 19 architecture, advanced Framer Motion physics, and high-performance routing.",
    tech: ["REACT 19", "FRAMER MOTION", "LENIS", "WEBGL"],
    linkText: "tapecut.online",
    url: "https://tapecut.online",
    image: "https://s.wordpress.com/mshots/v1/https://tapecut.online?w=1920",
  },
  {
    id: "02",
    title: "Lakshya PG",
    category: "Booking Architecture",
    description: "Digital infrastructure for premium student housing. Engineered a high-performance, seamless booking engine and facility management dashboard, eliminating all user friction.",
    tech: ["NEXT.JS", "POSTGRESQL", "TAILWIND", "VERCEL"],
    linkText: "lakshyapgonlyforboys.co.in",
    url: "https://lakshyapgonlyforboys.co.in",
    image: "https://s.wordpress.com/mshots/v1/https://lakshyapgonlyforboys.co.in?w=1920",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // A 300vh track ensures we have plenty of physical scrolling room for the cinematic pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The physics engine. Tuned for a heavy, mechanical "blast door" feel.
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.5 });

  /* 
    ========================================================================
    THE APERTURE ENGINE MATH (GPU-Accelerated Clip Paths)
    ========================================================================
    Instead of scaling the image (which causes jitter), we keep the image 
    perfectly still at 1x resolution, and we animate a mathematical "mask" 
    over it that opens and closes like an eyelid/shutter.
  */

  // Project 1 (0.0 to 0.45)
  // inset(top right bottom left) -> 50% top and bottom means it is 0px tall.
  const p1Clip = useTransform(smoothProgress, [0, 0.1, 0.35, 0.45], ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(50% 0% 50% 0%)"]);
  const p1Opacity = useTransform(smoothProgress, [0, 0.05, 0.4, 0.45], [0, 1, 1, 0]);
  const p1TextY = useTransform(smoothProgress, [0, 0.1, 0.35, 0.45], [20, 0, 0, -20]);

  // Project 2 (0.55 to 1.0)
  const p2Clip = useTransform(smoothProgress, [0.55, 0.65, 0.9, 1], ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(50% 0% 50% 0%)"]);
  const p2Opacity = useTransform(smoothProgress, [0.5, 0.55, 0.95, 1], [0, 1, 1, 0]);
  const p2TextY = useTransform(smoothProgress, [0.55, 0.65, 0.9, 1], [20, 0, 0, -20]);

  // The Kinetic Scanline (Sweeps the screen during the empty black gap between P1 and P2)
  const scanlineY = useTransform(smoothProgress, [0.45, 0.55], ["0vh", "100vh"]);
  const scanlineOpacity = useTransform(smoothProgress, [0.45, 0.48, 0.52, 0.55], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="work" className="relative w-full h-[300vh] bg-[#020202]">
      
      {/* Viewport Locker - Stays completely locked on the screen while you scroll the data */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]">
        
        {/* Subtle scanline background texture for the HUD feel */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)' }} 
        />

        {/* The Transition Scanner (Only visible between cards) */}
        <motion.div 
          style={{ top: scanlineY, opacity: scanlineOpacity }}
          className="absolute left-0 w-full h-[2px] bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] z-50"
        />

        {/* 
          =================================================
          PROJECT 01: TAPECUT
          =================================================
        */}
        <motion.div 
          style={{ opacity: p1Opacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          {/* THE HUD: Data fixed to the extreme corners of the screen */}
          <motion.div style={{ y: p1TextY }} className="absolute top-10 left-10 md:top-16 md:left-16 flex flex-col pointer-events-auto">
            <span className="text-[100px] md:text-[140px] font-display font-bold text-white/5 leading-[0.75] tracking-tighter mix-blend-screen">
              {projects[0].id}
            </span>
          </motion.div>

          <motion.div style={{ y: p1TextY }} className="absolute top-10 right-10 md:top-16 md:right-16 text-right pointer-events-auto hidden md:block">
            <span className="text-xs font-sans tracking-[0.3em] text-white/40 uppercase">
              {projects[0].category}
            </span>
          </motion.div>

          <motion.div style={{ y: p1TextY }} className="absolute bottom-10 left-10 md:bottom-16 md:left-16 pointer-events-auto">
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white drop-shadow-2xl mb-4">
              {projects[0].title}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] md:text-xs font-sans text-metallic uppercase tracking-[0.2em]">
                {projects[0].tech.join(" • ")}
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: p1TextY }} className="absolute bottom-10 right-10 md:bottom-16 md:right-16 text-right max-w-sm pointer-events-auto hidden lg:block">
            <p className="text-sm font-sans text-white/50 leading-relaxed">
              {projects[0].description}
            </p>
          </motion.div>

          {/* THE APERTURE VIEWPORT (The Image) */}
          <motion.div 
            style={{ clipPath: p1Clip }}
            className="w-full max-w-5xl h-[50vh] md:h-[60vh] relative z-30 pointer-events-auto"
          >
            <a href={projects[0].url} target="_blank" rel="noopener noreferrer" className="block w-full h-full interactive cursor-none group">
              <img 
                src={projects[0].image} 
                alt={projects[0].title} 
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <ArrowUpRight className="w-8 h-8 text-white" />
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* 
          =================================================
          PROJECT 02: LAKSHYA PG
          =================================================
        */}
        <motion.div 
          style={{ opacity: p2Opacity }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          {/* THE HUD */}
          <motion.div style={{ y: p2TextY }} className="absolute top-10 left-10 md:top-16 md:left-16 flex flex-col pointer-events-auto">
            <span className="text-[100px] md:text-[140px] font-display font-bold text-white/5 leading-[0.75] tracking-tighter mix-blend-screen">
              {projects[1].id}
            </span>
          </motion.div>

          <motion.div style={{ y: p2TextY }} className="absolute top-10 right-10 md:top-16 md:right-16 text-right pointer-events-auto hidden md:block">
            <span className="text-xs font-sans tracking-[0.3em] text-white/40 uppercase">
              {projects[1].category}
            </span>
          </motion.div>

          <motion.div style={{ y: p2TextY }} className="absolute bottom-10 left-10 md:bottom-16 md:left-16 pointer-events-auto">
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white drop-shadow-2xl mb-4">
              {projects[1].title}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] md:text-xs font-sans text-metallic uppercase tracking-[0.2em]">
                {projects[1].tech.join(" • ")}
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: p2TextY }} className="absolute bottom-10 right-10 md:bottom-16 md:right-16 text-right max-w-sm pointer-events-auto hidden lg:block">
            <p className="text-sm font-sans text-white/50 leading-relaxed">
              {projects[1].description}
            </p>
          </motion.div>

          {/* THE APERTURE VIEWPORT (The Image) */}
          <motion.div 
            style={{ clipPath: p2Clip }}
            className="w-full max-w-5xl h-[50vh] md:h-[60vh] relative z-30 pointer-events-auto"
          >
            <a href={projects[1].url} target="_blank" rel="noopener noreferrer" className="block w-full h-full interactive cursor-none group">
              <img 
                src={projects[1].image} 
                alt={projects[1].title} 
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <ArrowUpRight className="w-8 h-8 text-white" />
                </div>
              </div>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}