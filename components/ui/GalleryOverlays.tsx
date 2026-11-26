"use client";

import Image from "next/image";
import { Minus, Plus, Search, ShoppingBag, Ticket, Trash2, X } from "lucide-react";
import type { Artwork } from "@/data/artworks";
import type { VipVoucher } from "@/data/navigation";

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface GalleryOverlaysProps {
  toast: string | null;
  cartOpen: boolean;
  onCloseCart: () => void;
  cart: CartItem[];
  totalItems: number;
  finalTotal: number;
  discount: number;
  claimedVoucher: VipVoucher | null;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  searchOpen: boolean;
  onCloseSearch: () => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  searchResults: Artwork[];
  onAddFromSearch: (artwork: Artwork) => void;
}

export default function GalleryOverlays({
  toast,
  cartOpen,
  onCloseCart,
  cart,
  totalItems,
  finalTotal,
  discount,
  claimedVoucher,
  onUpdateQty,
  onCheckout,
  searchOpen,
  onCloseSearch,
  searchQuery,
  onSearchQueryChange,
  searchResults,
  onAddFromSearch,
}: GalleryOverlaysProps) {
  return (
    <>
      {/* Subtle Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#121212] border border-[#D4AF37]/50 px-6 py-3 text-xs uppercase tracking-[0.18em] text-white shadow-2xl">
          {toast}
        </div>
      )}

      {/* Slide-Over Gallery Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm"
          onClick={onCloseCart}
        >
          <aside
            aria-label="Acquisition Cart"
            className="relative flex h-full w-full max-w-md flex-col bg-[#121212] text-white shadow-2xl border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg font-bold tracking-wide">
                  Your Collection ({totalItems})
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-lg font-bold text-white/80">
                    Your gallery bag is empty
                  </p>
                  <p className="mt-1.5 text-xs text-white/50 max-w-xs">
                    Explore the four curated chapters or acquire the Spotlight
                    Triptych to begin your collection.
                  </p>
                </div>
              ) : (
                cart.map(({ artwork, quantity }) => (
                  <div
                    key={artwork.id}
                    className="flex gap-4 rounded-2xl bg-white/5 p-3.5 border border-white/10"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#1E1E1E]">
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-white">
                            {artwork.title}
                          </h3>
                          <p className="text-[11px] text-white/55">
                            {artwork.dimensions}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(artwork.id, -quantity)}
                          aria-label={`Remove ${artwork.title}`}
                          className="text-white/40 hover:text-[#E03131] cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-2.5 py-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(artwork.id, -1)}
                            aria-label="Decrease quantity"
                            className="text-white/70 hover:text-white cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(artwork.id, 1)}
                            aria-label="Increase quantity"
                            className="text-white/70 hover:text-white cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold text-[#D4AF37]">
                          ${artwork.price * quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-6 bg-[#0E0E0E] space-y-4">
              {claimedVoucher && (
                <div className="flex items-center justify-between rounded-xl bg-[#C8232C]/20 border border-[#C8232C]/50 px-3.5 py-2 text-xs">
                  <span className="flex items-center gap-2 text-[#F7E8B9]">
                    <Ticket size={14} />
                    Voucher {claimedVoucher.code}
                  </span>
                  <span className="font-semibold text-white">-${discount}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/65">Total</span>
                <span className="font-display text-2xl font-extrabold text-white">
                  ${finalTotal}
                </span>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={onCheckout}
                className="w-full rounded-full bg-[#C8232C] py-3.5 text-xs uppercase tracking-[0.22em] font-bold text-white hover:bg-[#E03131] disabled:opacity-40 transition-colors cursor-pointer"
              >
                Proceed to Acquisition
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-md pt-24 px-4"
          onClick={onCloseSearch}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#141414] border border-white/15 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Search size={18} className="text-[#D4AF37]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Search artworks, artists, or mediums..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={onCloseSearch}
                aria-label="Close search"
                className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2.5">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-xl p-2.5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#222]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-[11px] text-white/55">
                        {item.artist} · {item.category} · ${item.price}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddFromSearch(item)}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#C8232C] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
