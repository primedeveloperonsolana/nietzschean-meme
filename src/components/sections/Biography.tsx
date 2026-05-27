"use client";

import { useFadeIn } from "@/hooks/useScrollAnimation";
import { biographyEvents } from "@/data/biography";

export function Biography() {
  const fadeRef = useFadeIn<HTMLDivElement>(0);

  return (
    <section id="biography" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Biography
          </h2>
          <p className="text-white/60">1844 — 1900. The life of a solitary mountain.</p>
        </div>

        <div ref={fadeRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-transparent" />

          <div className="space-y-16">
            {biographyEvents.map((event, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-black z-10" />

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                  }`}
                >
                  <span className="inline-block text-xs uppercase tracking-widest text-white/40 mb-2">
                    {event.year}
                  </span>
                  <h3 className="font-playfair text-2xl text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
