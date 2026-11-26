"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { EXHIBITION_SLIDES, type Artwork, type SlideItem } from "@/data/artworks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExhibitionSliderProps {
  onAcquirePiece: (artwork: Artwork) => void;
}

export default function ExhibitionSlider({
  onAcquirePiece,
}: ExhibitionSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageElRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const hasMountedSlide = useRef(false);

  const total = EXHIBITION_SLIDES.length;
  const activeSlide: SlideItem = EXHIBITION_SLIDES[activeIndex];
  const prevSlide: SlideItem =
    EXHIBITION_SLIDES[(activeIndex - 1 + total) % total];
  const nextSlide: SlideItem = EXHIBITION_SLIDES[(activeIndex + 1) % total];

  const goToSlide = useCallback(
    (nextIdx: number, dir: "next" | "prev") => {
      const normalized = ((nextIdx % total) + total) % total;
      if (normalized === activeIndex) return;
      setDirection(dir);
      setActiveIndex(normalized);
    },
    [activeIndex, total]
  );

  const handleNext = useCallback(() => {
    goToSlide(activeIndex + 1, "next");
  }, [activeIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(activeIndex - 1, "prev");
  }, [activeIndex, goToSlide]);

  // 1. ScrollTrigger Entrance Reveal (once: true)
  useGSAP(
    () => {
      gsap.from(".exhibition-entrance", {
        y: 44,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  // 2. Master Slide Transition Choreography
  useGSAP(
    () => {
      const progressTarget = (activeIndex + 1) / total;
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progressTarget,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      if (!hasMountedSlide.current) {
        hasMountedSlide.current = true;
        return;
      }

      const tl = gsap.timeline();

      if (imageWrapRef.current && imageElRef.current) {
        const startClip =
          direction === "next"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)";

        tl.fromTo(
          imageWrapRef.current,
          { clipPath: startClip },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          0
        ).fromTo(
          imageElRef.current,
          { scale: 1.18 },
          { scale: 1, duration: 0.9, ease: "power4.inOut" },
          0
        );
      }

      if (infoRef.current) {
        const textNodes = infoRef.current.querySelectorAll(".kinetic-line");
        tl.fromTo(
          textNodes,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.18
        );
      }

      if (counterRef.current) {
        const yFrom = direction === "next" ? 100 : -100;
        tl.fromTo(
          counterRef.current,
          { yPercent: yFrom, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.1
        );
      }
    },
    { scope: sectionRef, dependencies: [activeIndex, direction] }
  );

  // 3. Auto-Play with Hover Pause (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection("next");
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // 4. Keyboard Arrow Navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // 5. Touch / Mouse Drag-to-Slide
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) > 45) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
  };

  // Magnetic button pull helpers
  const handleArrowMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLButtonElement | null>
  ) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleArrowLeave = (
    ref: React.RefObject<HTMLButtonElement | null>
  ) => {
    const btn = ref.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" });
  };

  const handleAcquire = () => {
    onAcquirePiece({
      id: activeSlide.id,
      title: activeSlide.title,
      artist: activeSlide.artist,
      dimensions: activeSlide.dimensions,
      price: activeSlide.price,
      category: activeSlide.category,
      imageUrl: activeSlide.imageUrl,
      edition: activeSlide.edition,
      tag: "featured",
      featured: true,
      isNewArrival: true,
      chapterId: "exhibition-slider",
    });
  };

  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      aria-label="Signature Masterpieces Exhibition Slider"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#121212] py-24 px-4 sm:px-8 overflow-hidden text-white focus:outline-none"
    >
      {/* Dynamic Ambient Radial Glow matching active slide mood */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[860px] rounded-full blur-[150px] transition-colors duration-1000"
        style={{ backgroundColor: activeSlide.moodColor }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top Header Bar */}
        <div className="exhibition-entrance flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#D4AF37] font-semibold">
              <Sparkles size={13} />
              <span>CURATED EXHIBITION</span>
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase">
              SIGNATURE MASTERPIECES
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5 min-w-[180px]">
            <div className="flex items-baseline gap-1.5 font-display text-xl sm:text-2xl font-bold tracking-widest">
              <span className="inline-block overflow-hidden h-8 leading-8">
                <span ref={counterRef} className="inline-block text-white">
                  {formattedIndex}
                </span>
              </span>
              <span className="text-sm text-white/40">/ {formattedTotal}</span>
            </div>

            <div className="h-[2px] w-44 bg-white/15 overflow-hidden rounded-full">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-[#C8232C]"
                style={{ transform: `scaleX(${1 / total})` }}
              />
            </div>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="exhibition-entrance relative mt-12 sm:mt-14 select-none cursor-grab active:cursor-grabbing"
        >
          {/* Side Peek Previews */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`Previous masterpiece: ${prevSlide.title}`}
            className="hidden xl:block absolute -left-24 top-1/2 -translate-y-1/2 w-40 aspect-[3/4] rounded-lg overflow-hidden opacity-25 hover:opacity-55 scale-90 transition-all duration-500 border border-white/10 cursor-pointer"
          >
            <Image
              src={prevSlide.imageUrl}
              alt={prevSlide.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={`Next masterpiece: ${nextSlide.title}`}
            className="hidden xl:block absolute -right-24 top-1/2 -translate-y-1/2 w-40 aspect-[3/4] rounded-lg overflow-hidden opacity-25 hover:opacity-55 scale-90 transition-all duration-500 border border-white/10 cursor-pointer"
          >
            <Image
              src={nextSlide.imageUrl}
              alt={nextSlide.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          </button>

          {/* Split / Overlapping Editorial Composition */}
          <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
            <div className="lg:col-span-8">
              <div className="relative rounded-sm bg-[#191919] p-3 sm:p-5 gallery-frame-shadow border border-white/10">
                <div className="bg-[#F4F1EA] p-2 sm:p-3.5">
                  <div
                    ref={imageWrapRef}
                    className="relative aspect-[16/11] w-full overflow-hidden bg-[#141414]"
                  >
                    <Image
                      ref={imageElRef}
                      src={activeSlide.imageUrl}
                      alt={activeSlide.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 94vw, 760px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.24em] text-white/65">
                  <span>{activeSlide.artist}</span>
                  <span className="text-[#D4AF37]">{activeSlide.edition}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:-ml-16 relative z-20">
              <div
                ref={infoRef}
                className="rounded-3xl bg-[#181818]/90 backdrop-blur-xl border border-white/15 p-7 sm:p-9 shadow-[0_32px_70px_rgba(0,0,0,0.65)]"
              >
                <div className="overflow-hidden">
                  <span className="kinetic-line inline-block text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold">
                    Slide {formattedIndex} · {activeSlide.category}
                  </span>
                </div>

                <div className="overflow-hidden mt-2.5">
                  <h3 className="kinetic-line font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {activeSlide.title}
                  </h3>
                </div>

                <div className="overflow-hidden mt-2">
                  <p className="kinetic-line font-serif italic text-base sm:text-lg text-white/80">
                    {activeSlide.medium}
                  </p>
                </div>

                <div className="mt-6 border-y border-white/10 py-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-white/50 text-[11px]">
                      Dimensions
                    </span>
                    <span className="font-medium text-white/90">
                      {activeSlide.dimensions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-white/50 text-[11px]">
                      Gallery Price
                    </span>
                    <span className="kinetic-line font-display text-2xl font-extrabold text-[#D4AF37]">
                      ${activeSlide.price}
                    </span>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleAcquire}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#C8232C] px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold text-white hover:bg-[#E03131] transition-colors shadow-xl cursor-pointer"
                  >
                    <ShoppingBag size={15} />
                    <span>Acquire Piece</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="exhibition-entrance mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            role="tablist"
            aria-label="Exhibition Slides"
            className="flex items-center gap-2.5"
          >
            {EXHIBITION_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  onClick={() =>
                    goToSlide(idx, idx > activeIndex ? "next" : "prev")
                  }
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-10 bg-[#C8232C]"
                      : "w-2.5 bg-white/25 hover:bg-white/55"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-3.5">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={handlePrev}
              onMouseMove={(e) => handleArrowMove(e, prevBtnRef)}
              onMouseLeave={() => handleArrowLeave(prevBtnRef)}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] hover:scale-105 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={handleNext}
              onMouseMove={(e) => handleArrowMove(e, nextBtnRef)}
              onMouseLeave={() => handleArrowLeave(nextBtnRef)}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:border-[#C8232C] hover:bg-[#C8232C] hover:text-white hover:scale-105 transition-all cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
