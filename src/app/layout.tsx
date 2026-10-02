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
export const metadata: Metadata = {
  title: "Tapecut Studios | Premium Web Architecture Agency",
  description: "Tapecut Studios is an elite digital architecture agency based in Delhi, engineering high-performance, cinematic web platforms for ambitious brands.",
  keywords: ["Tapecut Studios", "Web Development Agency Delhi", "Next.js Developers", "Premium Web Design", "Digital Architecture"],
  metadataBase: new URL("https://tapecut.info"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tapecut Studios | Premium Web Architecture",
    description: "Elite web development, immersive digital experiences, and architectural code by Tapecut Studios.",
    url: "https://tapecut.info",
    siteName: "Tapecut Studios",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapecut Studios",
    description: "Premium Web Architecture Agency in Delhi",
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