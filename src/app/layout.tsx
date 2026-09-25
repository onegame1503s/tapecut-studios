import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalHUD from "@/components/GlobalHUD"; // THE INJECTION

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tapecut Studios | Premium Digital Engineering",
  description: "Elite web development, immersive digital experiences, and architectural code by Tapecut Studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground relative`}>
        
        {/* GLOBAL SYSTEM UI */}
        <CustomCursor />
        <GlobalHUD />
        
        {/* PAGE CONTENT */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        
      </body>
    </html>
  );
}