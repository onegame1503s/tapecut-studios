"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scrolling while the preloader is active
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Unlock scrolling just before the preloader vanishes
          setTimeout(() => {
            document.body.style.overflow = "auto";
            setIsLoading(false);
          }, 400); // Brief pause at 100% for impact
          return 100;
        }
        // Rapid, irregular jumps for a mechanical/engineered feel
        return prev + Math.floor(Math.random() * 12) + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          // Slices upward exactly like a physical curtain revealing the site
          exit={{ y: "-100vh", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-charcoal flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center justify-center overflow-hidden">
             {/* The Name */}
             <motion.span 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
               className="text-4xl md:text-5xl font-display font-bold tracking-tight uppercase text-white"
             >
               Tapecut Studios
             </motion.span>
             
             {/* The Counter */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.5 }}
               className="mt-6 flex items-center gap-4 text-metallic font-sans tracking-widest text-sm"
             >
               <span>[ SYSTEM INITIALIZATION ]</span>
               <span className="w-12 text-right text-white">{Math.min(counter, 100)}%</span>
             </motion.div>
          </div>
          
          {/* Subtle progress bar at the absolute bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black">
             <motion.div 
                className="h-full bg-white"
                style={{ width: `${Math.min(counter, 100)}%` }}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}