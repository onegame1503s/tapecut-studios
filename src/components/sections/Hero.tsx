"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const slideUp: Variants = {
    initial: { y: "110%" },
    enter: (i: number) => ({
      y: "0%",
      transition: { 
        duration: 1.2, 
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], 
        // Increased the delay so it waits for the Preloader to slide out
        delay: 1.8 + (0.1 * i) 
      }
    })
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-10 overflow-hidden">
      <div className="flex flex-col gap-2 md:gap-0 z-10">
        
        <div className="overflow-hidden">
          <motion.h1 
            custom={1}
            variants={slideUp}
            initial="initial"
            animate="enter"
            className="text-6xl md:text-[8rem] lg:text-[11rem] leading-[0.85] font-display font-bold tracking-tighter uppercase text-foreground"
          >
            Digital
          </motion.h1>
        </div>

        <div className="overflow-hidden flex items-center gap-4 md:gap-10">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number], 
              delay: 2.2 
            }}
            className="hidden md:block h-[1px] bg-metallic flex-grow origin-left mt-4"
          />
          <motion.h1 
            custom={2}
            variants={slideUp}
            initial="initial"
            animate="enter"
            className="text-6xl md:text-[8rem] lg:text-[11rem] leading-[0.85] font-display font-bold tracking-tighter uppercase text-foreground"
          >
            Engineering.
          </motion.h1>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
        className="absolute bottom-10 left-6 md:left-10 max-w-sm"
      >
        <p className="text-sm md:text-base font-sans text-metallic leading-relaxed">
          We craft immersive, high-performance web architecture for elite brands. No templates. No compromises.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute bottom-10 right-6 md:right-10 flex flex-col items-center gap-4 interactive"
      >
        <span className="text-[10px] tracking-widest uppercase text-metallic rotate-90 mb-4">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full border border-charcoal flex items-center justify-center text-metallic hover:text-white hover:border-white transition-colors duration-300"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}