"use client";

import { Award, Frame, Globe, ShieldCheck } from "lucide-react";
import {
  FOOTER_LINKS,
  FOOTER_SERVICES,
  type FooterServiceItem,
} from "@/data/navigation";

const ICON_MAP: Record<FooterServiceItem["iconName"], typeof Award> = {
  award: Award,
  globe: Globe,
  shield: ShieldCheck,
  frame: Frame,
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0E0E0E] text-white pt-20 pb-12 px-4 sm:px-8 overflow-hidden border-t border-white/10">
      {/* Subtle radial gold glow behind wordmark */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-64 w-[620px] rounded-full bg-[#D4AF37]/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Centered Glowing 3D Metallic "ROM SUN" Wordmark + Mirrored Floor Reflection */}
        <div className="flex flex-col items-center justify-center text-center select-none pb-14 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#D4AF37]/80 mb-3">
            Art Life · Modern Gallery
          </p>

          <div className="relative inline-block">
            <h2 className="metallic-wordmark font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[0.22em] leading-none drop-shadow-[0_10px_25px_rgba(212,175,55,0.2)]">
              ROM SUN
            </h2>

            {/* Mirrored Floor Reflection Effect */}
            <div
              aria-hidden="true"
              className="metallic-reflection font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[0.22em] leading-none -mt-2 opacity-60 blur-[1px] pointer-events-none"
            >
              ROM SUN
            </div>
          </div>
        </div>

        {/* Minimal 4-Column Service Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-b border-white/10">
          {FOOTER_SERVICES.map((pillar) => {
            const Icon = ICON_MAP[pillar.iconName];
            return (
              <div key={pillar.id} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/55 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-white/45">
          <p>© 2026 ROM SUN — ART LIFE. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
