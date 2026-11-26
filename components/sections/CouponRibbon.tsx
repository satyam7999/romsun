"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Sparkles, Ticket } from "lucide-react";
import {
  ARTWORKS,
  ART_CATEGORIES,
  type ArtCategory,
  type Artwork,
} from "@/data/artworks";
import { VIP_VOUCHERS, type VipVoucher } from "@/data/navigation";
import ProductCard from "@/components/ui/ProductCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CouponRibbonProps {
  selectedCategory: ArtCategory;
  onSelectCategory: (cat: ArtCategory) => void;
  viewMode: "featured" | "new";
  onChangeViewMode: (mode: "featured" | "new") => void;
  claimedVouchers: string[];
  onClaimVoucher: (voucher: VipVoucher) => void;
  onAddToCart: (artwork: Artwork) => void;
}

export default function CouponRibbon({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  claimedVouchers,
  onClaimVoucher,
  onAddToCart,
}: CouponRibbonProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter artworks by category (case-insensitive) + tab ("featured" | "new")
  // with graceful fallback so the curated grid is never blank.
  const filteredArtworks = useMemo(() => {
    const normalizedCat = selectedCategory.trim().toLowerCase();
    const byCategory =
      normalizedCat === "all"
        ? ARTWORKS
        : ARTWORKS.filter(
            (art) => art.category.toLowerCase() === normalizedCat
          );

    const byTab = byCategory.filter((art) =>
      viewMode === "featured"
        ? art.tag === "featured" || art.featured
        : art.tag === "new" || art.isNewArrival
    );

    const results = byTab.length > 0 ? byTab : byCategory;
    // When "All" is selected, display 6 curated pieces for a balanced 2x3 gallery grid
    return normalizedCat === "all" ? results.slice(0, 6) : results;
  }, [selectedCategory, viewMode]);

  // Initial entrance reveal for the header & voucher ribbon
  useGSAP(
    () => {
      gsap.from(".ribbon-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  // Bug-free GSAP filter animation: always animates fromTo and clears transform
  // so cards never remain stuck at opacity: 0 during rapid category/tab switches.
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll(".curated-grid-item");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform",
            overwrite: true,
          }
        );
      }

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => cancelAnimationFrame(rafId);
    },
    { scope: gridRef, dependencies: [selectedCategory, viewMode] }
  );

  const handleVoucherClick = (voucher: VipVoucher, idx: number) => {
    onClaimVoucher(voucher);
    gsap.fromTo(
      `.voucher-card-${idx}`,
      { scale: 0.94 },
      { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }
    );
  };

  return (
    <section
      id="vip-offers"
      ref={sectionRef}
      className="relative bg-[#F8F9FA] pt-10 pb-20 sm:pt-14 sm:pb-24 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Category Pills Above the Ribbon */}
        <div className="ribbon-reveal flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {(["All", ...ART_CATEGORIES] as ArtCategory[]).map((category) => {
            const active =
              selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-[#121212] text-white shadow-lg scale-[1.03]"
                    : "bg-white text-[#121212]/75 border border-black/10 hover:border-[#C8232C] hover:text-[#C8232C]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Layered Red Organic SVG Cutout VIP Coupon Ribbon */}
        <div className="ribbon-reveal relative mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-r from-[#B81D25] via-[#C8232C] to-[#E03131] p-6 sm:p-10 md:p-12 text-white shadow-[0_28px_60px_-15px_rgba(200,35,44,0.45)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 320"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
            >
              <path
                fill="#FFFFFF"
                d="M-40,260 C180,140 340,310 620,190 C880,80 1040,230 1240,110 L1240,340 L-40,340 Z"
              />
              <path
                fill="#590B10"
                opacity="0.45"
                d="M-20,60 C240,140 460,-20 740,70 C980,145 1100,20 1230,60 L1230,0 L-20,0 Z"
              />
            </svg>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-sm">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-[#F7E8B9] font-semibold">
                  <Ticket size={14} />
                  <span>Collector&apos;s Privilege</span>
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  VIP Gallery Vouchers
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                  Select an exhibition tier to copy &amp; apply instantly at
                  checkout.
                </p>
              </div>

              {/* 5 Interactive VIP Voucher Tiers with generous gap-4 so notches never collide */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 flex-1">
                {VIP_VOUCHERS.map((voucher, idx) => {
                  const isClaimed = claimedVouchers.includes(voucher.id);
                  return (
                    <button
                      key={voucher.id}
                      type="button"
                      onClick={() => handleVoucherClick(voucher, idx)}
                      className={`voucher-card-${idx} group relative flex flex-col items-center justify-center rounded-2xl px-3.5 py-4 text-center transition-all duration-300 cursor-pointer border ${
                        isClaimed
                          ? "bg-[#121212] text-white border-[#D4AF37] shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                          : "bg-white/95 text-[#121212] border-white/60 hover:-translate-y-1 hover:bg-white shadow-md"
                      }`}
                    >
                      <span className="pointer-events-none absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#C8232C]" />
                      <span className="pointer-events-none absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#C8232C]" />

                      <span
                        className={`font-display text-lg sm:text-xl font-extrabold tracking-tight ${
                          isClaimed ? "text-[#D4AF37]" : "text-[#C8232C]"
                        }`}
                      >
                        {voucher.label}
                      </span>
                      <span
                        className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${
                          isClaimed ? "text-white/75" : "text-black/55"
                        }`}
                      >
                        {voucher.minSpend}
                      </span>

                      <span
                        className={`mt-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold ${
                          isClaimed
                            ? "bg-[#D4AF37]/20 text-[#F7E8B9]"
                            : "bg-[#C8232C]/10 text-[#C8232C] group-hover:bg-[#C8232C] group-hover:text-white transition-colors"
                        }`}
                      >
                        {isClaimed ? (
                          <>
                            <span>CLAIMED</span>
                            <Check size={10} />
                          </>
                        ) : (
                          "CLAIM"
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sleek Editorial Toggle Below the Ribbon */}
        <div className="ribbon-reveal mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/60 font-medium">
            <Sparkles size={14} className="text-[#C8232C]" />
            <span>
              CURATED SELECTION ·{" "}
              <strong className="text-[#121212] font-bold">
                {selectedCategory.toUpperCase()}
              </strong>
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Exhibition Filter Mode"
            className="inline-flex rounded-full bg-white p-1 border border-black/10 shadow-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "featured"}
              onClick={() => onChangeViewMode("featured")}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer ${
                viewMode === "featured"
                  ? "bg-[#121212] text-white shadow-sm"
                  : "text-black/60 hover:text-[#121212]"
              }`}
            >
              Featured Masterpieces
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "new"}
              onClick={() => onChangeViewMode("new")}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer ${
                viewMode === "new"
                  ? "bg-[#C8232C] text-white shadow-sm"
                  : "text-black/60 hover:text-[#121212]"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Filtered Artwork Gallery Grid Directly Below the Divider */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredArtworks.map((artwork) => (
            <div key={`${selectedCategory}-${viewMode}-${artwork.id}`} className="curated-grid-item">
              <ProductCard
                artwork={{ ...artwork, span: "standard" }}
                onAddToCart={onAddToCart}
                accentColor="#C8232C"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
