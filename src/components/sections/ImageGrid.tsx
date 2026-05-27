"use client";

import { useFadeIn } from "@/hooks/useScrollAnimation";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpeg",
  "/9.jpeg",
];

export function ImageGrid() {
  const fadeRef = useFadeIn<HTMLDivElement>(0);

  return (
    <section className="relative w-full">
      <div ref={fadeRef} className="w-full">
        <div className="grid grid-cols-3 w-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
