"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent, TouchEvent, useEffect, useState } from "react";
import { Power, Crosshair, Terminal, Fingerprint } from "lucide-react";

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [powerState, setPowerState] = useState<"offline" | "powering_up" | "online">("offline");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const torchRadius = useSpring(0, { damping: 15, stiffness: 150 });

  const maskImage = useMotionTemplate`radial-gradient(${torchRadius}px circle at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // NEW: Touch handler for mobile screens
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(touch.clientX - left);
    mouseY.set(touch.clientY - top);
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  }, [mouseX, mouseY]);

  const togglePower = () => {
    if (powerState === "offline") {
      setPowerState("powering_up");
      torchRadius.set(200);
      setTimeout(() => torchRadius.set(50), 100);
      setTimeout(() => torchRadius.set(300), 250);
      setTimeout(() => torchRadius.set(100), 400);
      setTimeout(() => {
        setPowerState("online");
        torchRadius.set(350); 
      }, 600);
    } else if (powerState === "online") {
      torchRadius.set(0);
      setPowerState("offline");
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove} // Added mobile touch event
      className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden border-t border-white/10 transition-colors duration-1000"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        {powerState === "offline" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-8 relative">
               <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
               <LockIcon />
            </div>
            <h2 className="text-sm font-mono tracking-[0.4em] text-white/40 uppercase mb-8">
              VISUAL ENCRYPTION ACTIVE
            </h2>
            <button 
              onClick={togglePower}
              className="group relative px-8 py-4 bg-[#0a0a0a] border border-white/20 hover:border-white transition-all duration-300 flex items-center gap-4 interactive"
            >
              <Power className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white group-hover:text-white">
                Initialize Optics
              </span>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="absolute inset-0 bg-[#0a0a0a] z-20 pointer-events-none flex flex-col items-center justify-center p-6"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <div className="absolute inset-0 z-50 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 15%, transparent 85%, #020202 100%)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="absolute top-16 left-16 flex items-center gap-4 text-metallic/50 font-mono text-xs tracking-widest hidden md:flex">
          <Terminal className="w-4 h-4" />
          <span>SYS.OP // OVERRIDE SUCCESSFUL</span>
        </div>

        <div className="absolute bottom-16 right-16 flex flex-col items-end gap-2 text-white/20 hidden md:flex">
          <Fingerprint className="w-12 h-12" />
          <span className="font-mono text-[10px] tracking-widest">CLEARANCE LEVEL 4</span>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl text-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-[1px] bg-white/30" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-white/50 uppercase">
              Classified Directive 001
            </span>
            <div className="w-12 h-[1px] bg-white/30" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-display font-bold tracking-tighter text-white leading-[0.9] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-8">
            YOU FOUND <br /> THE SIGNAL.
          </h2>

          <p className="text-sm md:text-base font-sans text-white/70 leading-relaxed max-w-xl">
            If you are reading this, you bypassed the aesthetic layer. Most agencies sell you templates dressed up as custom code. They sell illusions. 
            <br/><br/>
            At Tapecut Studios, we engineer the underlying physics. No bloat. No limits. Pure, raw digital infrastructure built from the ground up. You have found the truth in the noise.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['REACT 19', 'NEXT.JS CORE', 'FRAMER PHYSICS', 'WEBGL RENDER'].map(tech => (
               <span key={tech} className="px-4 py-2 border border-white/20 text-[10px] font-mono text-white/80 tracking-widest uppercase bg-white/5 backdrop-blur-md">
                 {tech}
               </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-4 pointer-events-auto">
        <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase hidden md:block">
          OPTICS: {powerState === 'online' ? 'ONLINE' : 'OFFLINE'}
        </span>
        <button 
          onClick={togglePower}
          disabled={powerState === "powering_up"}
          className={`w-12 h-6 rounded-full border p-1 transition-colors duration-300 interactive flex items-center ${
            powerState === "online" ? "border-white bg-white/10" : "border-white/20 bg-transparent"
          }`}
        >
          <motion.div 
            animate={{ x: powerState === "online" ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-4 h-4 rounded-full ${powerState === "online" ? "bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" : "bg-white/30"}`}
          />
        </button>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}