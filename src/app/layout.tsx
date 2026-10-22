import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalHUD from "@/components/GlobalHUD";

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

// UPGRADED SEO METADATA FOR TAPECUT.INFO
// UPGRADED SEO METADATA FOR TAPECUT.INFO
export const metadata: Metadata = {
  // Added "Web Development" and "Delhi" directly to the title
  title: "Tapecut Studios | Premium Web Development Agency in Delhi",
  
  // Explicitly mentioned "Next.js" and "web development" while keeping the premium tone
  description: "Tapecut Studios is an elite web development and digital architecture agency in Delhi. We engineer high-performance Next.js, React, and custom web platforms for ambitious brands.",
  
  keywords: ["Tapecut Studios", "Web Development Agency Delhi", "Next.js Developers", "Premium Web Design", "Digital Architecture"],
  metadataBase: new URL("https://tapecut.info"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tapecut Studios | Premium Web Development Delhi",
    description: "Elite web development, high-performance Next.js architectures, and immersive digital experiences by Tapecut Studios.",
    url: "https://tapecut.info",
    siteName: "Tapecut Studios",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapecut Studios | Web Development",
    description: "Premium Web Development Agency based in Delhi.",
  },
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