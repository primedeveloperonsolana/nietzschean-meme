"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quotes } from "@/data/quotes";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Quotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quotes"
      ref={sectionRef}
      className="relative py-32 sm:py-40 px-4 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-12">
          The Aphorisms
        </p>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <div
            key={currentIndex}
            className={`transition-all duration-600 ${
              isAnimating
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }`}
          >
            <blockquote className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
              &ldquo;{quotes[currentIndex]}&rdquo;
            </blockquote>
            <p className="text-sm uppercase tracking-widest text-white/40">
              — Friedrich Nietzsche
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prevQuote}
            className="p-2 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {quotes.slice(0, 8).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(i);
                    setTimeout(() => setIsAnimating(false), 600);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex % 8
                    ? "bg-white w-6"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextQuote}
            className="p-2 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
