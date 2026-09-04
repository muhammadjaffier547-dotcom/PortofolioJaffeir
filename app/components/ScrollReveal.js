"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, stagger = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");

          // Stagger children if enabled
          if (stagger) {
            const children = el.querySelectorAll(
              ".experience-card, .project-card, .skill-card, .about-stat, .crow, .tag, .chip"
            );
            children.forEach((child, i) => {
              child.style.setProperty("--stagger-delay", `${i * 80}ms`);
              child.classList.add("stagger-item");
              // Trigger reflow then add visible
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  child.classList.add("stagger-visible");
                });
              });
            });
          }

          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
