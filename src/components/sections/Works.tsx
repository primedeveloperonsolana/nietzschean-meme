"use client";

import { useStaggerReveal } from "@/hooks/useScrollAnimation";
import { books } from "@/data/books";

export function Works() {
  const staggerRef = useStaggerReveal<HTMLDivElement>(0);

  return (
    <section id="works" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Works
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Studies
          </p>
        </div>

        <div
          ref={staggerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {books.map((book, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/30 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 font-playfair text-5xl text-white/10 group-hover:text-white/20 transition-colors">
                {book.year}
              </div>

              <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                {book.year}
              </p>
              <h3 className="font-playfair text-2xl text-white mb-3 group-hover:text-white/90 transition-all">
                {book.title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-4">
                {book.concept}
              </p>
              <p className="text-sm text-white/50 italic leading-relaxed border-l-2 border-white/20 pl-4">
                &ldquo;{book.quote}&rdquo;
              </p>

              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-glow-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
