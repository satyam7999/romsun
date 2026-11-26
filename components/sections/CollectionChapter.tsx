"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import type { Artwork, Chapter } from "@/data/artworks";
import ProductCard from "@/components/ui/ProductCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CollectionChapterProps {
  chapter: Chapter;
  artworks: Artwork[];
  onAddToCart: (artwork: Artwork) => void;
}

export default function CollectionChapter({
  chapter,
  artworks,
  onAddToCart,
}: CollectionChapterProps) {
  const chapterRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Banner editorial reveal + watermark parallax
  useGSAP(
    () => {
      // Clip-path reveal + zoom out on Moody 3D Gallery Banner Artwork
      gsap.fromTo(
        ".chapter-banner-img",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.12,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Masked upward reveal on kicker, title, quote, and metadata strip
      gsap.fromTo(
        ".editorial-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Subtle scroll-linked parallax drift on oversized background watermark
      gsap.to(".chapter-watermark", {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: bannerRef }
  );

  // Bento grid staggered cascade
  useGSAP(
    () => {
      if (artworks.length === 0) return;

      gsap.from(".bento-card", {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 84%",
          once: true,
        },
      });

      gsap.fromTo(
        ".bento-card-img",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.12,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 84%",
            once: true,
          },
        }
      );
    },
    { scope: gridRef, dependencies: [artworks.length] }
  );

  const isDarkLeft = Boolean(chapter.isDarkLeftPanel);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id={chapter.id}
      ref={chapterRef}
      className="relative w-full bg-white"
    >
      {/* PART A — Moody 3D Gallery Banner with Split-Tone Lighting */}
      <div
        ref={bannerRef}
        className="chapter-banner relative w-full overflow-hidden py-14 sm:py-20 px-4 sm:px-8"
        style={{
          background: `linear-gradient(115deg, ${chapter.bannerBgLeft} 0%, ${chapter.bannerBgLeft} 46%, ${chapter.bannerBgRight} 46.2%, ${chapter.bannerBgRight} 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 right-[15%] h-80 w-80 rounded-full blur-[120px] opacity-35"
          style={{ backgroundColor: chapter.accentColor }}
        />

        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Panel — Museum-Grade Editorial Typography Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-md lg:max-w-lg z-10 px-6 sm:px-10 md:px-12 py-10 sm:py-12">
              {/* Oversized Background Watermark Numeral */}
              <span
                aria-hidden="true"
                className={`chapter-watermark pointer-events-none select-none absolute -top-4 -left-2 sm:-left-4 font-serif text-[10rem] sm:text-[14rem] leading-none font-bold ${
                  isDarkLeft ? "text-white/[0.06]" : "text-black/[0.06]"
                }`}
              >
                {chapter.watermarkNumber}
              </span>

              {/* 1. Top Kicker */}
              <div className="editorial-reveal relative z-10 flex items-center gap-3">
                <span
                  className={`h-[1px] w-8 inline-block ${
                    isDarkLeft ? "bg-[#D4AF37]" : "bg-[#121212]"
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold ${
                    isDarkLeft ? "text-[#D4AF37]" : "text-[#121212]"
                  }`}
                >
                  {chapter.kicker}
                </span>
              </div>

              {/* 2. Display Title */}
              <h2
                className={`editorial-reveal relative z-10 mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold uppercase tracking-tight leading-[1.02] ${
                  isDarkLeft ? "text-white" : "text-[#121212]"
                }`}
              >
                {chapter.title}
              </h2>

              {/* 3. Featured Quote with Vertical Accent Bar */}
              <blockquote
                className={`editorial-reveal relative z-10 mt-6 pl-5 border-l-2 ${
                  isDarkLeft ? "border-[#D4AF37]" : "border-[#121212]"
                }`}
              >
                <p
                  className={`font-serif italic text-base sm:text-lg leading-relaxed ${
                    isDarkLeft ? "text-white/90" : "text-[#2A2418]"
                  }`}
                >
                  &ldquo;{chapter.quote}&rdquo;
                </p>
                <footer
                  className={`mt-3 text-[10px] uppercase tracking-[0.24em] font-semibold ${
                    isDarkLeft ? "text-[#D4AF37]/90" : "text-[#121212]/75"
                  }`}
                >
                  {chapter.quoteAttribution}
                </footer>
              </blockquote>

              {/* 4. Bottom Metadata Strip */}
              <div
                className={`editorial-reveal relative z-10 mt-8 pt-5 border-t grid grid-cols-2 gap-4 ${
                  isDarkLeft ? "border-white/20" : "border-black/20"
                }`}
              >
                <div>
                  <p
                    className={`text-[9px] uppercase tracking-[0.24em] font-semibold ${
                      isDarkLeft ? "text-white/55" : "text-[#2A2418]/70"
                    }`}
                  >
                    Curation
                  </p>
                  <p
                    className={`mt-1 text-xs font-bold ${
                      isDarkLeft ? "text-white" : "text-[#121212]"
                    }`}
                  >
                    {chapter.curationLabel}
                  </p>
                </div>

                <div
                  className={`pl-4 border-l ${
                    isDarkLeft ? "border-white/20" : "border-black/20"
                  }`}
                >
                  <p
                    className={`text-[9px] uppercase tracking-[0.24em] font-semibold ${
                      isDarkLeft ? "text-white/55" : "text-[#2A2418]/70"
                    }`}
                  >
                    Palette
                  </p>
                  <p
                    className={`mt-1 text-xs font-bold ${
                      isDarkLeft ? "text-white" : "text-[#121212]"
                    }`}
                  >
                    {chapter.paletteLabel}
                  </p>
                </div>
              </div>

              {/* Explore Collection Link */}
              <div className="editorial-reveal relative z-10 mt-6">
                <button
                  type="button"
                  onClick={scrollToGrid}
                  className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold border-b pb-1 transition-colors cursor-pointer ${
                    isDarkLeft
                      ? "text-[#D4AF37] border-[#D4AF37]/60 hover:text-white hover:border-white"
                      : "text-[#121212] border-[#121212]/60 hover:text-[#2A2418] hover:border-[#121212]"
                  }`}
                >
                  <span>Explore Collection</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel — Large Leaning Gallery Artwork */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end perspective-1200">
            <div className="relative w-full max-w-[560px]">
              <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 w-[88%] h-10 rounded-full bg-black/50 blur-xl" />

              <div
                className="relative rounded-sm bg-[#161616] p-3 sm:p-4 gallery-frame-shadow"
                style={{ transform: "rotateY(-6deg) rotateZ(1deg)" }}
              >
                <div className="bg-[#F4F1EA] p-2 sm:p-3">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1A1A1A]">
                    <Image
                      src={chapter.bannerImage}
                      alt={chapter.title}
                      fill
                      className="chapter-banner-img object-cover"
                      sizes="(max-width: 1024px) 92vw, 560px"
                    />
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.22em] text-white/75">
                  <span>{chapter.title}</span>
                  <span style={{ color: chapter.accentColor }}>
                    {chapter.bannerArtworkCaption}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART B — Asymmetric Bento Product Grid */}
      <div
        ref={gridRef}
        className="mx-auto max-w-7xl px-4 sm:px-8 py-14 sm:py-20 bg-white"
      >
        {artworks.length > 0 ? (
          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {artworks.map((artwork) => (
              <ProductCard
                key={artwork.id}
                artwork={artwork}
                onAddToCart={onAddToCart}
                accentColor={chapter.accentColor}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 bg-[#F8F9FA] py-12 text-center">
            <p className="font-display text-lg font-bold text-[#121212]">
              No pieces match the active filter in {chapter.title}.
            </p>
            <p className="mt-1 text-xs text-black/55">
              Select &ldquo;All&rdquo; or switch between Featured Masterpieces
              and New Arrivals above.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
