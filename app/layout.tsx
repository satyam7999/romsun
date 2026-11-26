import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ROM SUN — ART LIFE | Curated Modern Wall Art & Luxury Gallery",
  description:
    "Curated gallery-grade wall art, sculptural triptychs, and museum-quality modern home decor for architectural spaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-[#121212] font-sans selection:bg-[#C8232C] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
