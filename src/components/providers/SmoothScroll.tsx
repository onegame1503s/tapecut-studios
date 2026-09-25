"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.07, // The friction. Lower is smoother/slower.
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {/* 
        Bypassing the React 19 vs 18 type mismatch. 
        The DOM renders perfectly, TS just needs to be overridden here.
      */}
      {children as any}
    </ReactLenis>
  );
}