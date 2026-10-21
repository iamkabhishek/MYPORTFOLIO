"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ExperienceSection({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.classList.add("motion-ready");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} id="experience" className="experience-section section-grid section-pad">{children}</section>;
}
