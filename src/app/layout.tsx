import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vazifalar — kunlik reja",
  description: "Zustand bilan yozilgan zamonaviy vazifalar ro'yxati",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
