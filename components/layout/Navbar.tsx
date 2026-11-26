"use client";

import { useState } from "react";
import { Search, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { NAV_LINKS_LEFT } from "@/data/navigation";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
      <nav
        aria-label="Primary Navigation"
        className="relative flex items-center justify-between px-5 sm:px-8 py-3.5 rounded-full bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.4)] text-white"
      >
        {/* Left Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-white/80">
          {NAV_LINKS_LEFT.map((link) => (
            <button
              key={link.targetId}
              type="button"
              onClick={() => scrollToSection(link.targetId)}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-1.5 text-white/85 hover:text-[#D4AF37] transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Centered Luxury Gold-Accented Brand Emblem */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="flex items-center gap-2.5 group"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-105 transition-transform">
            <Sparkles size={12} />
          </span>
          <span className="font-display text-base sm:text-lg font-extrabold tracking-[0.26em] text-white">
            ROM <span className="text-[#D4AF37]">SUN</span>
          </span>
        </a>

        {/* Right Utility & Action Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs uppercase tracking-[0.18em] font-medium text-white/85">
          <button
            type="button"
            onClick={() => scrollToSection("vip-offers")}
            className="hidden md:inline-block hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            VIP Offers
          </button>
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Search artworks"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#C8232C] border border-white/15 transition-all cursor-pointer"
            aria-label={`Open cart with ${cartCount} items`}
          >
            <ShoppingBag size={14} className="text-[#D4AF37]" />
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-3xl bg-[#121212]/95 backdrop-blur-xl border border-white/10 p-6 shadow-2xl text-white">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.22em]">
            {NAV_LINKS_LEFT.map((link) => (
              <button
                key={link.targetId}
                type="button"
                onClick={() => scrollToSection(link.targetId)}
                className="text-left py-2 border-b border-white/10 hover:text-[#D4AF37]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection("vip-offers")}
              className="text-left py-2 hover:text-[#D4AF37]"
            >
              VIP Offers
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
