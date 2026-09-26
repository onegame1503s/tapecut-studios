"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const leaders = [
  {
    name: "Pranay Dauthal",
    role: "Lead Architect & Founder",
    email: "pranaydauthal@gmail.com"
  },
  {
    name: "Manas Negi",
    role: "Lead Architect & Founder",
    email: "manasnegi261@gmail.com"
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"] 
  });

  // Background architectural text parallax
  const xBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  // Kinetic Masking: Wipes from 100% hidden on the right, to 0% hidden (fully revealed)
  const clipPath = useTransform(scrollYProgress, [0.3, 0.7], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section id="studio" className="relative w-full bg-background pt-32 pb-40 px-6 md:px-10 overflow-hidden" ref={containerRef}>
      
      {/* Background Architectural Outline Text */}
      <motion.div 
        style={{ x: xBackground }}
        className="absolute top-[10%] left-0 w-[200vw] overflow-hidden pointer-events-none select-none z-0 flex whitespace-nowrap"
      >
        <h2 className="text-[25vw] md:text-[20vw] font-display font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.04)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.04)]">
          TAPECUT STUDIOS — TAPECUT STUDIOS — TAPECUT STUDIOS
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20 md:gap-32">
        
        {/* Section Header */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-[1px] bg-metallic" />
          <h2 className="text-sm tracking-widest uppercase text-metallic">The Studio</h2>
        </div>

        {/* 
          EDITORIAL BRUTALISM LAYOUT 
          Breaks the text into an asymmetrical, cinematic journey (Left -> Center -> Right)
        */}
        <div className="w-full flex flex-col gap-16 md:gap-24 py-10">
          
          {/* Act I: The Origin (Left Aligned) - UPDATED COPY */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-md"
          >
            <span className="text-xs font-display tracking-[0.2em] text-white/30 mb-4 block">[ 01 // MISSION ]</span>
            <p className="text-metallic font-sans text-base md:text-lg leading-relaxed tracking-wide">
              We don't just build websites; we engineer digital ecosystems. Tapecut Studios was founded on a singular obsession: creating high-performance web platforms that elevate brands and multiply revenue.
            </p>
          </motion.div>

          {/* Act II: The Hook (Centered, Massive, Kinetic Fill) - UPDATED COPY */}
          <div className="flex justify-center w-full relative py-10">
            <h3 className="text-[12vw] md:text-[9vw] lg:text-[7.5rem] font-display font-bold uppercase leading-[0.85] tracking-tighter flex flex-col items-center select-none text-center">
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)]">
                We Engineer
              </span>
              <div className="relative mt-2">
                {/* Skeletal Base Layer */}
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)]">
                  Digital Dominance.
                </span>
                {/* Solid Fill Layer (Revealed by Scroll) */}
                <motion.span
                  style={{ clipPath }}
                  className="absolute inset-0 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Digital Dominance.
                </motion.span>
              </div>
            </h3>
          </div>

          {/* Act III: The Result (Right Aligned) - UPDATED COPY */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-md self-end text-right"
          >
             <span className="text-xs font-display tracking-[0.2em] text-white/30 mb-4 block">[ 02 // SCALE ]</span>
            <p className="text-metallic font-sans text-base md:text-lg leading-relaxed tracking-wide">
              Our reputation is built on results. Today, Tapecut Studios partners with ambitious businesses to deliver elite UI/UX design, custom architectures, and scalable web solutions that leave competitors behind.
            </p>
          </motion.div>

        </div>

        {/* Leadership & Engineering Grid */}
        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-start pt-20 border-t border-white/10 mt-10">
          
          {/* UPDATED COPY */}
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-display font-bold tracking-tight mb-4">Elite Execution.</h3>
            <p className="text-metallic font-sans text-sm md:text-base leading-relaxed">
              We operate as a premium digital agency. Every project is meticulously crafted and overseen directly by our founders, ensuring your brand receives a bespoke, high-converting masterpiece with zero compromises.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {leaders.map((leader, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-white/10 bg-[#0a0a0a] hover:bg-white interactive transition-colors duration-500 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col z-10 transition-colors duration-500 group-hover:text-black">
                  <h4 className="text-xl font-display font-bold">{leader.name}</h4>
                  <span className="text-sm font-sans tracking-widest uppercase text-metallic group-hover:text-black/60 mt-1">
                    {leader.role}
                  </span>
                </div>
                
                <a 
                  href={`mailto:${leader.email}`}
                  className="mt-4 sm:mt-0 z-10 flex items-center gap-2 text-sm font-sans tracking-wider text-white group-hover:text-black transition-colors duration-500"
                >
                  <span className="hidden sm:inline-block border-b border-transparent group-hover:border-black transition-colors">
                    {leader.email}
                  </span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </a>

                <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}