import { Sora, Inter, Space_Mono } from "next/font/google";

// Load Google Fonts with ONLY needed weights (reduces font file size by ~70%)
export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Only load weights used in design
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"], // Faster fallback
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Reduced from 100-900
  variable: "--font-body",
  display: "optional", // Non-critical font - allows faster initial render
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-accent",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});
