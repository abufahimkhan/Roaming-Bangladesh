import { Manrope, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const inter = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export { inter, display, jetbrainsMono };
