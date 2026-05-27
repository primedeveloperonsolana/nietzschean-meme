"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { TOKEN_CONFIG } from "@/config/token";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const caRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          caRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/back.jpg')" }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="text-center max-w-5xl mx-auto z-10">
        <h1
          ref={titleRef}
          className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.95] mb-8"
        >
          nietzschean
          <br />
          <span className="text-white/50">(anything)</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Enter the abyss where Nietzschean philosophy meets meme culture.
          Transfigure yourself. Embrace the eternal recurrence.
          <br />
          Become the Übermensch.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href={TOKEN_CONFIG.pumpFunUrl(TOKEN_CONFIG.contractAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider text-sm rounded overflow-hidden transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Buy Now</span>
          </a>
          <a
            href={TOKEN_CONFIG.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-wider text-sm rounded hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            <span className="text-sm font-bold">𝕏</span>
            Follow on X
          </a>
        </div>

        <div
          ref={caRef}
          className="inline-flex items-center gap-4 bg-white/10 border border-white/10 rounded-full px-24 py-5"
        >
          <span className="text-base text-white/60 uppercase tracking-wider">
            CA:
          </span>
          <code className="text-base text-white/40 font-mono cursor-pointer" onClick={() => navigator.clipboard.writeText(TOKEN_CONFIG.contractAddress)}>
            {TOKEN_CONFIG.contractAddress === "Contract_Address" ? "Contract Soon" : TOKEN_CONFIG.contractAddress}
          </code>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown size={20} className="text-white/40" />
      </div>
    </section>
  );
}
