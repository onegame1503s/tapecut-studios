"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Cpu, Network, Database, Unlock, ShieldAlert } from "lucide-react";

export default function Process() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"locked" | "hacking" | "denied" | "unlocked">("locked");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [matrixCode, setMatrixCode] = useState("");

  useEffect(() => {
    if (status === "hacking") {
      const interval = setInterval(() => {
        let code = "";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        for (let i = 0; i < 200; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
        setMatrixCode(code);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handlePointerDown = () => {
    if (status === "unlocked") return;
    setStatus("hacking");
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          setStatus("unlocked");
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const handlePointerUp = () => {
    if (status === "unlocked") return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    if (progress < 100) {
      setStatus("denied");
      const drain = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(drain);
            setStatus("locked");
            return 0;
          }
          return prev - 5;
        });
      }, 20);
    }
  };

  return (
    <motion.section 
      animate={{ 
        x: status === "hacking" ? [-2, 2, -3, 3, -1, 1, 0] : 0,
        y: status === "hacking" ? [-1, 2, -1, 3, -2, 1, 0] : 0
      }}
      transition={{ repeat: status === "hacking" ? Infinity : 0, duration: 0.2 }}
      className={`relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden border-t border-white/10 transition-colors duration-1000 ${
        status === "unlocked" ? "bg-[#020202]" : "bg-[#050000]"
      }`}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      
      <AnimatePresence>
        {status !== "unlocked" && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full h-full p-4"
          >
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none flex flex-wrap break-all font-mono text-[8px] leading-none text-red-500 p-4">
              {status === "hacking" ? matrixCode : ""}
            </div>

            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(220,38,38,0.1) 100%)' }} />

            <div className="relative flex flex-col items-center z-50">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <ShieldAlert className={`w-6 h-6 ${status === 'denied' ? 'text-red-500' : 'text-red-500/50'}`} />
                <span className={`font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-center ${status === 'denied' ? 'text-red-500 font-bold' : 'text-red-500/50'}`}>
                  {status === "locked" && "Security Protocol Active"}
                  {status === "hacking" && "Overriding Firewall..."}
                  {status === "denied" && "Sequence Interrupted"}
                </span>
              </div>

              <motion.div 
                onPointerDown={handlePointerDown}
                className="relative w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center group interactive cursor-pointer select-none touch-none"
              >
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(220,38,38,0.15)" strokeWidth="4" />
                  <motion.circle 
                    cx="50%" cy="50%" r="48%" 
                    fill="none" 
                    stroke="rgba(220,38,38,1)" 
                    strokeWidth="8" 
                    strokeDasharray="780"
                    strokeDashoffset={780 - (780 * progress) / 100}
                    className="drop-shadow-[0_0_15px_rgba(220,38,38,1)]"
                  />
                </svg>

                <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                  status === "hacking" ? "bg-red-950/80 border-red-500 scale-95" : "bg-black/50 border-red-500/40 group-hover:border-red-500"
                }`}>
                  <motion.div 
                    animate={{ rotate: status === "hacking" ? 180 : 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/30" 
                  />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`transition-colors duration-300 ${status === "hacking" ? "text-red-500 animate-pulse" : "text-red-500/40 group-hover:text-red-500"}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3a2 2 0 0 0-2 2"></path>
                    <path d="M19 3a2 2 0 0 1 2 2"></path>
                    <path d="M21 19a2 2 0 0 1-2 2"></path>
                    <path d="M5 21a2 2 0 0 1-2-2"></path>
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 8v-2"></path>
                    <path d="M12 18v2"></path>
                    <path d="M8 12H6"></path>
                    <path d="M18 12h-2"></path>
                  </svg>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                  {status === "hacking" && (
                    <span className="font-mono text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                      {progress}%
                    </span>
                  )}
                </div>
              </motion.div>

              <div className="mt-12 md:mt-16 text-center">
                <span className={`font-sans text-xs md:text-sm tracking-[0.4em] uppercase transition-colors ${
                  status === "hacking" ? "text-red-500 font-bold" : "text-white/40"
                }`}>
                  [ HOLD TO AUTHENTICATE ]
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "unlocked" && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute inset-0 w-full h-full z-30 px-6 md:px-12 lg:px-24 py-16 md:py-32 overflow-y-auto flex flex-col justify-center"
          >
            <div className="max-w-screen-2xl mx-auto w-full pt-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-10 md:mb-20">
                <div>
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <Unlock className="w-4 h-4 md:w-5 md:h-5 text-metallic" />
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-metallic uppercase">
                      Access Granted // Core Systems
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                    OPERATIONAL <br /> CAPABILITIES.
                  </h2>
                </div>
                <p className="text-xs md:text-sm font-sans text-white/50 max-w-sm leading-relaxed">
                  The infrastructure required to dominate the digital landscape. We provide end-to-end architectural execution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-20">
                
                {/* --- NEW COPY APPLIED HERE --- */}
                <div className="border border-white/10 bg-[#050505] p-6 lg:p-12 flex flex-col group hover:bg-white hover:border-white transition-colors duration-500 rounded-2xl">
                  <Cpu className="w-8 h-8 md:w-10 md:h-10 text-white/30 group-hover:text-black mb-8 md:mb-16 transition-colors duration-500" />
                  <span className="text-3xl md:text-5xl font-display font-bold text-white/10 group-hover:text-black/10 mb-2 md:mb-4 block transition-colors">01</span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-black mb-4 md:mb-6 transition-colors">Bespoke Web Development.</h3>
                  <p className="text-xs md:text-sm font-sans text-white/50 group-hover:text-black/70 leading-relaxed transition-colors">
                    We engineer custom websites and scalable platforms tailored strictly to your brand. No templates. Just lightning-fast, hyper-optimized architecture designed to convert.
                  </p>
                </div>

                <div className="border border-white/10 bg-[#050505] p-6 lg:p-12 flex flex-col group hover:bg-white hover:border-white transition-colors duration-500 rounded-2xl">
                  <Network className="w-8 h-8 md:w-10 md:h-10 text-white/30 group-hover:text-black mb-8 md:mb-16 transition-colors duration-500" />
                  <span className="text-3xl md:text-5xl font-display font-bold text-white/10 group-hover:text-black/10 mb-2 md:mb-4 block transition-colors">02</span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-black mb-4 md:mb-6 transition-colors">Immersive UI/UX Design.</h3>
                  <p className="text-xs md:text-sm font-sans text-white/50 group-hover:text-black/70 leading-relaxed transition-colors">
                    Aesthetic superiority meets user psychology. We craft visceral, interactive interfaces and layouts that captivate your audience and make your brand impossible to ignore.
                  </p>
                </div>

                <div className="border border-white/10 bg-[#050505] p-6 lg:p-12 flex flex-col group hover:bg-white hover:border-white transition-colors duration-500 rounded-2xl">
                  <Database className="w-8 h-8 md:w-10 md:h-10 text-white/30 group-hover:text-black mb-8 md:mb-16 transition-colors duration-500" />
                  <span className="text-3xl md:text-5xl font-display font-bold text-white/10 group-hover:text-black/10 mb-2 md:mb-4 block transition-colors">03</span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-black mb-4 md:mb-6 transition-colors">Full-Stack Solutions.</h3>
                  <p className="text-xs md:text-sm font-sans text-white/50 group-hover:text-black/70 leading-relaxed transition-colors">
                    We future-proof your business. From secure e-commerce payment gateways to AI integrations and robust databases, we give you the tools to dominate your industry.
                  </p>
                </div>
                {/* --- END NEW COPY --- */}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}