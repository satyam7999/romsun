"use client";

import Image from "next/image";
import { Plus, Sparkles } from "lucide-react";
import type { Artwork } from "@/data/artworks";

interface ProductCardProps {
  artwork: Artwork;
  onAddToCart: (artwork: Artwork) => void;
  accentColor: string;
}

export default function ProductCard({
  artwork,
  onAddToCart,
  accentColor,
}: ProductCardProps) {
  const isWide = artwork.span === "wide";

  return (
    <article
      className={`bento-card group relative flex flex-col overflow-hidden rounded-2xl bg-[#F8F9FA] border border-black/8 transition-shadow duration-500 hover:shadow-[0_24px_55px_-18px_rgba(0,0,0,0.22)] ${
        isWide ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Framed Interior Artwork Image Container */}
      <div
        className={`relative w-full overflow-hidden bg-[#EAECEF] ${
          isWide ? "aspect-[16/10]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={artwork.imageUrl}
          alt={`${artwork.title} in modern interior`}
          fill
          className="bento-card-img object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={
            isWide
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />

        {/* Edition / New Arrival Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="rounded-full bg-[#121212]/85 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white">
            {artwork.edition}
          </span>
          {artwork.isNewArrival && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-white shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <Sparkles size={10} />
              New
            </span>
          )}
        </div>

        {/* Quick-Add Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
          <span className="text-xs uppercase tracking-[0.22em] text-white/85 font-medium">
            {artwork.category}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(artwork)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold text-[#121212] shadow-xl hover:bg-[#C8232C] hover:text-white transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Editorial Metadata Footer */}
      <div className="flex items-start justify-between gap-4 p-5 bg-white">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-[#121212] tracking-tight">
            {artwork.title}
          </h3>
          <p className="mt-0.5 text-xs text-black/55">
            {artwork.artist} · {artwork.dimensions}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display text-lg font-bold text-[#121212]">
            ${artwork.price}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(artwork)}
            className="mt-1 block md:hidden text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C8232C]"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
