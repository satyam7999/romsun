"use client";

import { Fragment, useMemo, useState } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CouponRibbon from "@/components/sections/CouponRibbon";
import SpotlightSection from "@/components/sections/SpotlightSection";
import CollectionChapter from "@/components/sections/CollectionChapter";
import ExhibitionSlider from "@/components/sections/ExhibitionSlider";
import GalleryOverlays, {
  type CartItem,
} from "@/components/ui/GalleryOverlays";
import {
  ARTWORKS,
  COLLECTION_CHAPTERS,
  type ArtCategory,
  type Artwork,
} from "@/data/artworks";
import type { VipVoucher } from "@/data/navigation";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ArtCategory>("All");
  const [viewMode, setViewMode] = useState<"featured" | "new">("featured");
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>([]);
  const [claimedVoucher, setClaimedVoucher] = useState<VipVoucher | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 2600);
  };

  const handleAddToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { artwork, quantity: 1 }];
    });
    showToast(`Added "${artwork.title}" to your collection.`);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.artwork.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClaimVoucher = (voucher: VipVoucher) => {
    setClaimedVouchers((prev) =>
      prev.includes(voucher.id) ? prev : [...prev, voucher.id]
    );
    setClaimedVoucher(voucher);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(voucher.code).catch(() => {});
    }
    showToast(`Voucher ${voucher.code} applied at checkout`);
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.artwork.price * item.quantity, 0),
    [cart]
  );

  const discount = claimedVoucher ? Math.min(claimedVoucher.amount, subtotal) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ARTWORKS.slice(0, 6);
    return ARTWORKS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const getChapterArtworks = (chapterId: string) =>
    ARTWORKS.filter((art) => {
      if (art.chapterId !== chapterId) return false;
      if (selectedCategory !== "All" && art.category !== selectedCategory) {
        return false;
      }
      if (viewMode === "new" && !art.isNewArrival) {
        return false;
      }
      return true;
    });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col bg-[#F8F9FA]">
        <Navbar
          cartCount={totalItems}
          onOpenCart={() => setCartOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main className="flex-1">
          <HeroSection />

          <CouponRibbon
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            claimedVouchers={claimedVouchers}
            onClaimVoucher={handleClaimVoucher}
            onAddToCart={handleAddToCart}
          />

          <SpotlightSection onAcquirePiece={handleAddToCart} />

          {/* Chapters 01–02, Middle Exhibition Slider, Chapters 03–04 */}
          <div id="collections">
            {COLLECTION_CHAPTERS.map((chapter) => (
              <Fragment key={chapter.id}>
                <CollectionChapter
                  chapter={chapter}
                  artworks={getChapterArtworks(chapter.id)}
                  onAddToCart={handleAddToCart}
                />
                {chapter.id === "chapter-02" && (
                  <ExhibitionSlider onAcquirePiece={handleAddToCart} />
                )}
              </Fragment>
            ))}
          </div>
        </main>

        <Footer />

        <GalleryOverlays
          toast={toast}
          cartOpen={cartOpen}
          onCloseCart={() => setCartOpen(false)}
          cart={cart}
          totalItems={totalItems}
          finalTotal={finalTotal}
          discount={discount}
          claimedVoucher={claimedVoucher}
          onUpdateQty={handleUpdateQty}
          onCheckout={() => {
            showToast("Proceeding to White-Glove Checkout...");
            setCartOpen(false);
          }}
          searchOpen={searchOpen}
          onCloseSearch={() => setSearchOpen(false)}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchResults={searchResults}
          onAddFromSearch={(item) => {
            handleAddToCart(item);
            setSearchOpen(false);
          }}
        />
      </div>
    </SmoothScroll>
  );
}
