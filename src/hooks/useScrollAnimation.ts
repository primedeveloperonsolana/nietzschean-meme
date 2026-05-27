"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
}

export function useScrollAnimation<T extends HTMLElement>(
  animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const anim = animationCallback(element, gsap);
      if (anim) {
        ScrollTrigger.create({
          trigger: options.trigger || element,
          start: options.start || "top 85%",
          end: options.end || "bottom 20%",
          scrub: options.scrub || false,
          markers: options.markers || false,
          toggleActions: options.toggleActions || "play none none none",
          animation: anim,
          onEnter: options.onEnter,
        });
      }
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

export function useFadeIn<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}
