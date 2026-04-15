'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  y = 40,
  stagger = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger: stagger > 0 ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'bottom 20%',
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, duration, y, stagger, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
