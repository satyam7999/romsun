"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Frame, Sparkles } from "lucide-react";
import WaveDivider from "@/components/ui/WaveDivider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // 1. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title-word",
          {
            yPercent: 115,
            rotateX: -18,
            opacity: 0,
            duration: 1.05,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          ".hero-subtitle",
          {
            y: 24,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.65"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .from(
          ".hero-canvas-frame",
          {
            y: 70,
            rotateY: -18,
            rotateX: 10,
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.95"
        )
        .from(
          ".hero-floating-badge",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.6"
        );

      // 2. Scroll-Linked Parallax on 3D Paper-Cut SVG Waves
      gsap.to(".wave-layer-back", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".wave-layer-mid", {
        yPercent: -24,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".wave-layer-front", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Subtle continuous float on accent orbs
      gsap.to(".hero-orb", {
        y: -14,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });
    },
    { scope: heroRef }
  );

  // Magnetic CTA pull
  const handleCtaMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleCtaLeave = () => {
    const btn = ctaRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const scrollToExhibition = () => {
    const el = document.getElementById("vip-offers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#C8232C] via-[#D62828] to-[#E03131] pt-28 pb-28 sm:pb-36 flex items-center"
    >
      {/* Subtle architectural radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.16),transparent_50%)]" />

      {/* Floating 3D Accent Elements */}
      <div className="hero-orb pointer-events-none absolute top-28 right-[14%] h-14 w-14 rounded-full bg-gradient-to-br from-white/40 to-white/5 backdrop-blur-md border border-white/30 shadow-2xl hidden lg:block" />
      <div className="hero-orb pointer-events-none absolute bottom-44 left-[8%] h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37]/70 to-[#8C6D23]/40 border border-[#F7E8B9]/40 shadow-xl hidden md:block" />

      {/* Multi-Layered 3D Paper-Cut Organic SVG Waves */}
      <WaveDivider variant="hero" />

      {/* Main Foreground Composition */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-6 text-white">
          <div className="hero-eyebrow inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-[11px] uppercase tracking-[0.28em] font-semibold mb-6">
            <Sparkles size={12} className="text-[#F7E8B9]" />
            <span>Autumn / Winter 2026 Exhibition</span>
          </div>

          <h1 className="font-display font-extrabold tracking-tight leading-[0.88] text-[4.25rem] sm:text-[6rem] md:text-[7.25rem] xl:text-[8rem] uppercase">
            <span className="block overflow-hidden">
              <span className="hero-title-word inline-block">ART</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-title-word inline-block text-white/95">
                LIFE
              </span>
            </span>
          </h1>

          <p className="hero-subtitle mt-6 max-w-md font-serif italic text-lg sm:text-xl text-white/90 leading-relaxed">
            &ldquo;Curated Gallery-Grade Wall Art for Modern Spaces&rdquo;
          </p>

          <p className="hero-subtitle mt-3 max-w-md text-sm text-white/75 leading-relaxed">
            Museum-caliber archival canvases, bespoke walnut &amp; brushed brass
            frames, and tactile large-scale triptychs designed for architectural
            interiors.
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-5">
            <button
              ref={ctaRef}
              type="button"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              onClick={scrollToExhibition}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#121212] text-white text-xs uppercase tracking-[0.22em] font-semibold shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white hover:text-[#121212] transition-colors duration-300 cursor-pointer"
            >
              <span>Explore the Exhibition</span>
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80">
              <Frame size={15} className="text-[#F7E8B9]" />
              <span>180+ Curated Editions</span>
            </div>
          </div>
        </div>

        {/* Right Oversized Angled Framed Canvas Resting on the Wave */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end perspective-2000">
          <div className="relative w-full max-w-[440px] sm:max-w-[490px]">
            {/* Realistic Grounded Perspective Shadow */}
            <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-12 rounded-full bg-black/55 blur-2xl" />

            {/* Framed Canvas */}
            <div
              className="hero-canvas-frame preserve-3d relative rounded-sm bg-[#161616] p-3.5 sm:p-5 gallery-frame-shadow"
              style={{
                transform: "rotateY(-10deg) rotateX(4deg) rotateZ(-2deg)",
              }}
            >
              {/* Inner Museum Mat */}
              <div className="bg-[#F4F1EA] p-3 sm:p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1D1D1D]">
                  <Image
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=85"
                    alt="Rom Sun Featured Surrealist Exhibition Canvas"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 490px"
                  />
                  {/* Subtle glass/linen sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
                </div>
              </div>

              {/* Brass Plaque Caption */}
              <div className="mt-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.22em] text-white/75">
                <span>No. 01 · Crimson Soliloquy</span>
                <span className="text-[#D4AF37]">48&quot; × 60&quot;</span>
              </div>
            </div>

            {/* Floating Editorial Badge */}
            <div className="hero-floating-badge absolute -bottom-4 -left-4 sm:-left-8 rounded-2xl bg-[#121212]/95 backdrop-blur-md border border-white/15 px-5 py-3.5 text-white shadow-2xl">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]">
                Museum Grade
              </p>
              <p className="mt-0.5 text-xs font-medium text-white/90">
                Belgian Linen · 100-Yr Archival Ink
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
