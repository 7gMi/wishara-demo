"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gift } from "lucide-react";
import { gifts, creators } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const previewGifts = gifts.slice(0, 3);

const cardConfigs = [
  { x: "right-0", y: "top-0", rotate: "rotate-6", delay: "0s", z: 3 },
  { x: "right-28", y: "top-36", rotate: "-rotate-3", delay: "0.5s", z: 2 },
  { x: "right-8", y: "top-72", rotate: "rotate-2", delay: "1s", z: 1 },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-mesh-gradient"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid pattern overlay */}
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
      <div
        className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-secondary-100/30 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-primary-100/20 blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        aria-hidden="true"
      />

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-16 w-3 h-3 rounded-full bg-primary-300/40 animate-[float_6s_ease-in-out_infinite]" aria-hidden="true" />
      <div className="absolute top-48 right-1/3 w-2 h-2 rounded-full bg-secondary-300/40 animate-[float_8s_ease-in-out_infinite_1s]" aria-hidden="true" />
      <div className="absolute bottom-32 left-1/4 w-4 h-4 rounded-full bg-accent-400/30 animate-[float_7s_ease-in-out_infinite_2s]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: text content with staggered reveal */}
          <div className="max-w-xl">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50/80 backdrop-blur-sm border border-primary-200 text-primary-600 text-sm font-medium mb-6",
                "transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>The easiest way to gift creators</span>
            </div>

            <h1
              id="hero-heading"
              className={cn(
                "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]",
                "transition-all duration-700 ease-out delay-150",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Give the gifts they{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
                  actually
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary-100/60 -skew-x-3 rounded" aria-hidden="true" />
              </span>{" "}
              want.
            </h1>

            <p
              className={cn(
                "mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-lg",
                "transition-all duration-700 ease-out delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Browse wishlists from your favorite creators and send gifts
              directly. No guesswork, just joy.
            </p>

            <div
              className={cn(
                "mt-8 flex flex-wrap gap-4",
                "transition-all duration-700 ease-out delay-[450ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <Link
                href="/gifts"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-500 text-white text-lg font-medium shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Explore Gifts
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/creators"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-neutral-200 text-neutral-700 text-lg font-medium hover:border-primary-300 hover:text-primary-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                I&apos;m a Creator
              </Link>
            </div>

            {/* Trust bar */}
            <div
              className={cn(
                "mt-12 flex items-center gap-4",
                "transition-all duration-700 ease-out delay-[600ms]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <div className="flex -space-x-3" aria-hidden="true">
                {creators.map((creator) => (
                  <Image
                    key={creator.id}
                    src={creator.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-500">
                Trusted by{" "}
                <span className="font-semibold text-neutral-700">
                  2,400+ creators
                </span>
              </p>
            </div>
          </div>

          {/* Right: 3D floating gift cards */}
          <div
            className="relative hidden lg:block h-[480px]"
            style={{ perspective: "1200px" }}
            aria-hidden="true"
          >
            {/* Glow behind cards */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200/40 to-secondary-200/30 blur-3xl"
              style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.08}px))` }}
            />

            {previewGifts.map((gift, i) => {
              const config = cardConfigs[i];
              const parallaxY = scrollY * (0.05 + i * 0.03);

              return (
                <div
                  key={gift.id}
                  className={cn(
                    "absolute w-64",
                    config.x,
                    config.y,
                    "transition-all duration-700 ease-out",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  )}
                  style={{
                    transform: `
                      ${config.rotate === "rotate-6" ? "rotateZ(6deg)" : config.rotate === "-rotate-3" ? "rotateZ(-3deg)" : "rotateZ(2deg)"}
                      rotateX(${2 + i * 2}deg)
                      rotateY(${-5 + i * 5}deg)
                      translateY(${-parallaxY}px)
                      translateZ(${config.z * 20}px)
                    `,
                    animationDelay: config.delay,
                    transitionDelay: `${400 + i * 200}ms`,
                    zIndex: config.z,
                  }}
                >
                  <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl shadow-neutral-900/10 overflow-hidden hover:shadow-3xl hover:scale-[1.03] transition-all duration-500 animate-[float_6s_ease-in-out_infinite] group"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={gift.imageUrl}
                        alt={gift.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="256px"
                      />
                      {/* Glassmorphism overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Gift icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <Gift className="w-5 h-5 text-primary-500" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white to-neutral-50/80">
                      <p className="font-heading font-semibold text-neutral-900 truncate">
                        {gift.name}
                      </p>
                      <p className="mt-1 text-primary-500 font-bold">
                        {formatPrice(gift.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
