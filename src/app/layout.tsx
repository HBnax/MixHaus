import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "MixHaus",
  description: "Generated by create next app",
  icons: {
    icon: "/mixhaus1.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
        <div className="bg-animated-gradient"></div> {/* Gradient layer */}
        <div className="relative z-10">{children}</div> {/* Content layer */}
      </body>
    </html>
  );
}


