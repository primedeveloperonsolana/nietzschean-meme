"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { Transfigurator } from "@/components/sections/Transfigurator";
import { MemeCulture } from "@/components/sections/MemeCulture";
import { Influence } from "@/components/sections/Influence";
import { Works } from "@/components/sections/Works";
import { Philosophy } from "@/components/sections/Philosophy";
import { Quotes } from "@/components/sections/Quotes";
import { Biography } from "@/components/sections/Biography";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-black text-white">
      <Navbar />
      <Hero />
      <ImageGrid />
      <Transfigurator />
      <MemeCulture />
      <Influence />
      <Works />
      <Philosophy />
      <Quotes />
      <Biography />
      <Footer />
    </main>
  );
}
