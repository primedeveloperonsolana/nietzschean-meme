"use client";

import { useEffect, useState } from "react";

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

export function RandomBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * images.length);
        } while (next === prev && images.length > 1);
        return next;
      });
    }, 8000);

    setLoaded(true);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-20">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: loaded && i === currentIndex ? 1 : 0,
          }}
        />
      ))}
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/80" />
    </div>
  );
}
