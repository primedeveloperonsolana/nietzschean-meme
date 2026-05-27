"use client";

import { useState } from "react";
import { useStaggerReveal } from "@/hooks/useScrollAnimation";
import { philosophyConcepts } from "@/data/philosophy";
import { ChevronDown } from "lucide-react";

export function Philosophy() {
  const staggerRef = useStaggerReveal<HTMLDivElement>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="philosophy" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Philosophy
          </h2>
          <p className="text-white/60">
            The core concepts that shattered Western thought
          </p>
        </div>

        <div ref={staggerRef} className="space-y-4">
          {philosophyConcepts.map((concept, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/15 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div>
                  <h3 className="font-playfair text-xl sm:text-2xl text-white">
                    {concept.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                    {concept.subtitle}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-white/30 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-white/70 leading-[1.9]">
                    {concept.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
