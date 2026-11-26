"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eye, ShoppingBag, Sparkles, X } from "lucide-react";
import { SPOTLIGHT_TRIPTYCH, type Artwork } from "@/data/artworks";
import WaveDivider from "@/components/ui/WaveDivider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SpotlightSectionProps {
  onAcquirePiece: (artwork: Artwork) => void;
}

export default function SpotlightSection({
  onAcquirePiece,
}: SpotlightSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const acquireBtnRef = useRef<HTMLButtonElement>(null);
  const [roomModalOpen, setRoomModalOpen] = useState(false);

  useGSAP(
    () => {
      // Sculptural wave parallax
      gsap.to(".spotlight-wave-top", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Triptych card entrance
      gsap.from(".spotlight-card", {
        y: 60,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spotlight-card",
          start: "top 82%",
          once: true,
        },
      });

      // Clip-path reveal on the 3 panels
      gsap.fromTo(
        ".triptych-panel",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.12,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".spotlight-card",
            start: "top 78%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Cursor-reactive 3D tilt on Spotlight Triptych card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = tiltCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: xPct * 8,
      rotateX: -yPct * 6,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = () => {
    const card = tiltCardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  // Magnetic pull on Acquire button
  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = acquireBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleBtnLeave = () => {
    const btn = acquireBtnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" });
  };

  const handleAcquire = () => {
    onAcquirePiece({
      id: SPOTLIGHT_TRIPTYCH.id,
      title: SPOTLIGHT_TRIPTYCH.title,
      artist: SPOTLIGHT_TRIPTYCH.artist,
      dimensions: SPOTLIGHT_TRIPTYCH.dimensions,
      price: SPOTLIGHT_TRIPTYCH.price,
      category: "Triptychs",
      imageUrl: SPOTLIGHT_TRIPTYCH.panels[1],
      edition: SPOTLIGHT_TRIPTYCH.edition,
      tag: "featured",
      featured: true,
      isNewArrival: true,
      chapterId: "spotlight",
    });
  };

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#121212] pt-24 pb-28 sm:pt-32 sm:pb-36"
    >
      {/* Top Sculptural White-and-Red 3D Wavy Divider */}
      <WaveDivider variant="spotlight" />

      {/* Subtle ambient crimson glow behind spotlight card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[820px] rounded-full bg-[#C8232C]/25 blur-[130px]" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-8 pt-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#D4AF37] font-semibold">
            Exhibition Spotlight
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The Three-Panel Triptych
          </h2>
        </div>

        {/* Floating Crimson Glassmorphic/Matte Spotlight Card */}
        <div className="perspective-2000">
          <div
            ref={tiltCardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="spotlight-card preserve-3d relative mx-auto max-w-6xl rounded-[2.25rem] bg-gradient-to-br from-[#B81D25]/95 via-[#C8232C]/92 to-[#8C141A]/95 backdrop-blur-xl border border-white/15 p-6 sm:p-10 lg:p-12 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.75)] text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* 3-Panel Landscape Triptych Artwork */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {SPOTLIGHT_TRIPTYCH.panels.map((panelUrl, idx) => (
                    <div
                      key={panelUrl}
                      className="rounded-sm bg-[#161616] p-1.5 sm:p-2.5 shadow-[0_24px_45px_rgba(0,0,0,0.55)] border border-white/10"
                    >
                      <div className="bg-[#F4F1EA] p-1 sm:p-1.5">
                        <div className="relative aspect-[3/5] w-full overflow-hidden bg-[#1D1D1D]">
                          <Image
                            src={panelUrl}
                            alt={`Crimson Horizon Panel ${idx + 1}`}
                            fill
                            className="triptych-panel object-cover"
                            sizes="(max-width: 768px) 28vw, 220px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artwork Details & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-[#D4AF37]/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[#F7E8B9] font-semibold">
                    <Sparkles size={12} />
                    <span>{SPOTLIGHT_TRIPTYCH.edition}</span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold leading-tight">
                    {SPOTLIGHT_TRIPTYCH.title}
                  </h3>

                  <p className="mt-2 font-serif italic text-white/85 text-base">
                    by {SPOTLIGHT_TRIPTYCH.artist}
                  </p>

                  <div className="mt-6 space-y-2.5 border-y border-white/15 py-5 text-xs sm:text-sm text-white/85">
                    <div className="flex items-center justify-between gap-4">
                      <span className="uppercase tracking-[0.18em] text-white/60 text-[11px]">
                        Dimensions
                      </span>
                      <span className="font-medium text-right">
                        {SPOTLIGHT_TRIPTYCH.dimensions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="uppercase tracking-[0.18em] text-white/60 text-[11px]">
                        Medium
                      </span>
                      <span className="font-medium text-right">
                        Belgian Linen · Walnut Frame
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-xs uppercase tracking-[0.22em] text-white/65">
                      Exhibition Price
                    </span>
                    <span className="font-display text-4xl font-extrabold text-white">
                      ${SPOTLIGHT_TRIPTYCH.price}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3.5">
                    <button
                      ref={acquireBtnRef}
                      type="button"
                      onMouseMove={handleBtnMove}
                      onMouseLeave={handleBtnLeave}
                      onClick={handleAcquire}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#121212] px-6 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:bg-white hover:text-[#121212] transition-colors shadow-xl cursor-pointer"
                    >
                      <ShoppingBag size={15} className="text-[#D4AF37]" />
                      <span>Acquire Piece</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRoomModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <Eye size={15} />
                      <span>View in Room</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View in Room Architectural Modal */}
      {roomModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setRoomModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#161616] border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setRoomModalOpen(false)}
              aria-label="Close room preview"
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2.5 text-white hover:bg-[#C8232C] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={SPOTLIGHT_TRIPTYCH.roomPreviewUrl}
                alt="Crimson Horizon Triptych styled in a modern living room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 95vw, 900px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 sm:p-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#D4AF37]">
                  Architectural Scale Preview · 72&quot; Span
                </p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-bold">
                  {SPOTLIGHT_TRIPTYCH.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
