"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

export default function Footer() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intent: "NEW PROJECT",
    details: ""
  });

  const intentOptions = ["NEW PROJECT", "BUSINESS INQUIRY", "GET A QUOTE"];

  // Helper function to force animation timing
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const networkPromise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    try {
      // THE FIX: We FORCE a 4.5-second delay to let the massive CAD missile sequence play out.
      await wait(4500); 

      const response = await networkPromise;
      const responseData = await response.json();

      if (!response.ok) {
        console.error("BREVO API REJECTION:", responseData);
        throw new Error(responseData.error || "Transmission failed");
      }

      setFormState("success");
      
      setTimeout(() => {
        setFormState("idle");
        setFormData({ name: "", email: "", intent: "NEW PROJECT", details: "" });
      }, 6000); 

    } catch (error) {
      console.error("FRONTEND ERROR:", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-background pt-32 flex flex-col justify-between overflow-hidden z-20 border-t border-white/10">
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row justify-between gap-20 lg:gap-10 mb-32">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-[1px] bg-metallic" />
              <h2 className="text-sm tracking-widest uppercase text-metallic">Initiate</h2>
            </div>
            
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
              LET'S BUILD <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,1)]">THE IMPOSSIBLE.</span>
            </h3>
            
            <p className="text-metallic font-sans text-base max-w-md leading-relaxed mb-16">
              We partner with elite brands and visionaries to engineer digital infrastructure that dominates. Tell us about your project or request a direct quote.
            </p>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/30">
                Direct Transmission //
              </span>
              <a 
                href="tel:+910000000000" 
                className="group w-fit flex items-center gap-6 interactive"
              >
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-transparent group-hover:bg-white transition-colors duration-500 relative overflow-hidden">
                   <PhoneCall className="w-5 h-5 text-white group-hover:text-black relative z-10 transition-colors duration-500" />
                   <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:animate-ping z-0" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-display font-bold tracking-widest text-white group-hover:text-metallic transition-colors duration-300">
                    +91 914 917 7677
                  </span>
                  <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out mt-1" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[45%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/30">
                Subject of Inquiry
              </span>
              <div className="flex flex-wrap gap-3">
                {intentOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, intent: option })}
                    disabled={formState !== "idle" && formState !== "error"}
                    className={`text-[10px] md:text-xs font-sans tracking-widest uppercase px-5 py-3 rounded-full border transition-all duration-300 disabled:opacity-50 ${
                      formData.intent === option 
                        ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                        : "border-white/20 text-white/50 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-4">
              <div className="relative group w-full">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={formState !== "idle" && formState !== "error"}
                  placeholder="YOUR NAME" 
                  className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm tracking-widest uppercase text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                />
              </div>

              <div className="relative group w-full">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={formState !== "idle" && formState !== "error"}
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm tracking-widest uppercase text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div className="relative group">
              <textarea 
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                disabled={formState !== "idle" && formState !== "error"}
                placeholder="PROJECT SCOPE / BUDGET / DETAILS" 
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm tracking-widest uppercase text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {/* 
              THE ADVANCED KINETIC LAUNCH TERMINAL 
              Physically expands from h-20 (80px) to h-60 (240px) during launch.
            */}
            <motion.button 
              type="submit"
              disabled={formState === "submitting" || formState === "success"}
              animate={{ height: formState === 'submitting' ? 240 : 80 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="group relative w-full flex items-center border border-transparent border-b-white/20 hover:border-b-white transition-colors overflow-hidden disabled:pointer-events-none cursor-none mt-4 px-2"
            >
              {/* Solid Fill Layers (Success / Error / Hover) */}
              <div className={`absolute inset-0 z-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom
                ${formState === 'error' ? 'bg-red-950 scale-y-100' : 'bg-white scale-y-0 group-hover:scale-y-100'}
                ${formState === 'success' ? '!bg-white !scale-y-100' : ''}
              `} />

              {/* 
                THE LAUNCH SEQUENCE: MASSIVE CAD MISSILE
                Total Animation Duration: 4.5 Seconds.
              */}
              <AnimatePresence>
                {formState === "submitting" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#050505] border border-white/20 z-30 flex items-center justify-center overflow-hidden"
                  >
                    
                    {/* HUD: Top Left */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] text-metallic uppercase flex flex-col gap-1 text-left">
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                        [ ENCRYPTING PAYLOAD ]
                      </motion.span>
                      <span>TARGET: WORKPLACE4568</span>
                    </div>

                    {/* HUD: Bottom Right */}
                    <div className="absolute bottom-4 right-4 font-mono text-[10px] text-metallic text-right flex flex-col gap-1">
                      <span>SYS.OP.4568</span>
                      <motion.span
                        animate={{ textShadow: ["0px 0px 0px white", "0px 0px 10px white", "0px 0px 0px white"] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-white font-bold"
                      >
                        SPOOLING ENGINES...
                      </motion.span>
                    </div>

                    {/* Background Radar / CAD Grid */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    {/* 
                      THE VEHICLE CONTAINER 
                      Timings (4.5s total):
                      0-1s: Slide in from left
                      1-3s: Lock in center (Spooling)
                      3-3.5s: Pull back heavily (Anticipation)
                      3.5-4.5s: BLAST OFF to the right
                    */}
                    <motion.div
                      animate={{ x: ["-150%", "0%", "0%", "-10%", "300%"] }}
                      transition={{ 
                        duration: 4.5, 
                        times: [0, 0.22, 0.66, 0.77, 1], 
                        ease: "easeInOut" 
                      }}
                      className="relative w-full max-w-lg h-full flex items-center justify-center z-10"
                    >
                      {/* 
                        ENGINE VIBRATION 
                        Continuously shakes the SVG slightly to simulate raw power
                      */}
                      <motion.div
                        animate={{ y: [0, -1, 1, -2, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="w-full h-full flex items-center justify-center relative"
                      >
                         
                         {/* MASSIVE PLASMA EXHAUST TRAIL (Fires during the pull-back and launch phase) */}
                         <motion.div 
                           className="absolute top-1/2 -translate-y-1/2 right-[85%] h-1 bg-white blur-[2px] shadow-[0_0_30px_5px_rgba(255,255,255,1)]"
                           animate={{ width: [0, 0, 0, 800, 800], opacity: [0, 0, 0, 1, 0] }}
                           transition={{ duration: 4.5, times: [0, 0.66, 0.77, 0.85, 1] }}
                         />

                         {/* DETAILED AEROSPACE BLUEPRINT (The Data Missile) */}
                         <svg viewBox="0 0 400 150" className="w-full h-[150px] text-white/90 overflow-visible relative z-10" preserveAspectRatio="xMidYMid meet">
                           {/* Targeting Crosshairs behind the ship */}
                           <line x1="200" y1="0" x2="200" y2="150" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                           <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                           <circle cx="200" cy="75" r="40" stroke="currentColor" strokeOpacity="0.2" fill="none" />
                           
                           <g transform="translate(20, 25)">
                              {/* Main Hull */}
                              <path d="M 10 50 L 50 25 L 280 45 L 340 50 L 280 55 L 50 75 Z" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.05)" />
                              {/* Aerodynamic Wings */}
                              <path d="M 50 25 L 80 -10 L 140 35" stroke="currentColor" strokeWidth="2" fill="none" />
                              <path d="M 50 75 L 80 110 L 140 65" stroke="currentColor" strokeWidth="2" fill="none" />
                              {/* Internal Structural Grid Line */}
                              <line x1="10" y1="50" x2="340" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                              {/* Thruster Array Rings */}
                              <path d="M 10 35 L -10 25 L -10 75 L 10 65" stroke="currentColor" strokeWidth="2" fill="none" />
                              <line x1="-10" y1="40" x2="-30" y2="40" stroke="currentColor" strokeWidth="2" />
                              <line x1="-10" y1="60" x2="-30" y2="60" stroke="currentColor" strokeWidth="2" />
                           </g>
                         </svg>

                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Default Button State (Hides during the launch sequence) */}
              <div className={`w-full flex items-center justify-between relative z-20 transition-opacity duration-300 px-2
                ${formState === 'submitting' ? 'opacity-0' : 'opacity-100'}
              `}>
                <span className={`font-sans text-sm tracking-widest uppercase transition-colors duration-500
                  ${(formState === 'success' || formState === 'error') ? 'text-black' : 'text-white group-hover:text-black'}
                `}>
                  {formState === "idle" && "Transmit Encrypted Data"}
                  
                  {/* SUCCESS PROTOCOL */}
                  {formState === "success" && (
                    <span className="flex flex-col text-left py-2">
                        <span className="text-black font-bold text-base">Transmission Successful</span>
                        <span className="text-xs text-black/70 font-sans tracking-wide normal-case mt-1">A lead architect will analyze your scope and respond within 48 hours.</span>
                    </span>
                  )}
                  
                  {formState === "error" && "System Error — Check Console"}
                </span>
                
                {/* Icons */}
                <div className={`transition-colors duration-500
                  ${(formState === 'success' || formState === 'error') ? 'text-black' : 'text-white group-hover:text-black'}
                `}>
                  {(formState === "idle" || formState === "error") && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />}
                  {formState === "success" && <CheckCircle2 className="w-7 h-7" />}
                </div>
              </div>

            </motion.button>
          </form>
        </div>
      </div>

      {/* The Anchor */}
      <div className="w-full flex flex-col items-center justify-end relative mt-20">
        <div className="w-full px-6 md:px-10 flex flex-col md:flex-row justify-between items-center pb-8 z-10 gap-6 md:gap-0">
          <div className="text-xs font-sans tracking-widest uppercase text-metallic hidden md:block">
            <span>OPERATING WORLDWIDE</span>
          </div>
          <a href="mailto:workplace4568@gmail.com" className="text-sm md:text-xl font-sans tracking-widest text-white hover:text-metallic transition-colors interactive">
            workplace4568@gmail.com
          </a>
          <div className="text-xs font-sans tracking-widest uppercase text-metallic">
            © {new Date().getFullYear()} Tapecut Studios
          </div>
        </div>

        <div className="w-full overflow-hidden flex justify-center translate-y-[20%] pointer-events-none select-none">
          <h1 className="text-[22vw] leading-none font-display font-bold tracking-tighter text-white/5">
            TAPECUT
          </h1>
        </div>
      </div>
    </footer>
  );
}