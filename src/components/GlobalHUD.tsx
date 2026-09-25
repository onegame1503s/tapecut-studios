"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalHUD() {
  const { scrollYProgress } = useScroll();
  // Heavy spring physics for the global scrollbar
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    // Live Coordinate Tracking
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Live System Clock
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' SYS.T');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    // mix-blend-difference guarantees this UI is always visible regardless of background color
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden mix-blend-difference font-mono text-[10px] uppercase tracking-[0.2em] text-white">

      {/* 
        ====================================================
        THE 4 CORNER TARGETING BRACKETS 
        ====================================================
      */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/50" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/50" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/50" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/50" />

      {/* Top Left: Pulsing System Status */}
      <div className="absolute top-6 left-8 flex flex-col gap-1">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <span>TAPECUT.SYS_ONLINE</span>
        </motion.div>
      </div>

      {/* Top Right: Live Server Time */}
      <div className="absolute top-6 right-8 opacity-50">
        <span>{time}</span>
      </div>

      {/* Bottom Left: Live Mouse Telemetry */}
      <div className="absolute bottom-6 left-8 flex flex-col gap-1 opacity-50">
        <span>POS_X: {coords.x.toString().padStart(4, '0')}</span>
        <span>POS_Y: {coords.y.toString().padStart(4, '0')}</span>
      </div>

      {/* Bottom Right: Scroll Data Label */}
      <div className="absolute bottom-6 right-8 flex flex-col items-end opacity-50">
        <span>DATA_STREAM</span>
        <span>ENGAGED</span>
      </div>

      {/* 
        ====================================================
        THE KINETIC SCROLL TRACK (Right Edge)
        ====================================================
      */}
      <div className="absolute top-0 right-0 w-[2px] h-full bg-white/10 origin-top">
        <motion.div
          style={{ scaleY }}
          className="w-full h-full bg-white origin-top shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"
        />
      </div>

    </div>
  );
}