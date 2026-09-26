"use client";

import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import Link from "next/link";

// Isolated button component for bulletproof hover math
const AnimatedLink = ({ title, href }: { title: string; href: string }) => {
  const isAnchor = href.startsWith("#");

  const innerContent = (
    <motion.div
      variants={{
        initial: { y: 0 },
        hover: { y: "-50%" } // Moves exactly half-way up
      }}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="flex flex-col"
    >
      {/* Top text (Default) */}
      <span className="h-5 flex items-center leading-none">{title}</span>
      {/* Bottom text (Hover state) */}
      <span className="h-5 flex items-center leading-none text-metallic">{title}</span>
    </motion.div>
  );

  return (
    <Magnetic>
      {/* 
        The outer div strictly clips the overflow. 
        h-5 locks the height exactly to the text size.
        We check if it's a # link to ensure flawless smooth scrolling.
      */}
      {isAnchor ? (
        <a href={href} className="interactive relative block h-5 overflow-hidden group px-1">
          {innerContent}
        </a>
      ) : (
        <Link href={href} className="interactive relative block h-5 overflow-hidden group px-1">
          {innerContent}
        </Link>
      )}
    </Magnetic>
  );
};

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[90] mix-blend-difference text-white pointer-events-none"
    >
      {/* Brand Logo */}
      <div className="pointer-events-auto">
        <AnimatedLink title="Tapecut Studios" href="/" />
      </div>

      {/* Nav Links */}
      <div className="pointer-events-auto flex gap-8 md:gap-12 text-sm font-sans tracking-widest uppercase">
        <AnimatedLink title="Work" href="#work" />
        <AnimatedLink title="Studio" href="#studio" />
        <AnimatedLink title="Contact" href="#contact" />
      </div>
    </motion.nav>
  );
}