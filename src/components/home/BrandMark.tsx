'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function BrandMark() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Image reveal — scale + blur + opacity
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        scale: 0.85,
        filter: 'blur(20px)',
      }, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Gentle floating after reveal
      gsap.to(imageRef.current, {
        y: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    }

    // Lines expand outward from center
    if (lineLeftRef.current) {
      gsap.fromTo(lineLeftRef.current, { width: '0%' }, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });
    }

    if (lineRightRef.current) {
      gsap.fromTo(lineRightRef.current, { width: '0%' }, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* Subtle ambient glow behind the brand mark */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Horizontal lines flanking the brand */}
        <div className="flex items-center justify-center" style={{ gap: '40px' }}>
          {/* Left line — grows from center outward */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div
              ref={lineLeftRef}
              style={{
                height: '1px',
                background: 'linear-gradient(to left, rgba(201,168,76,0.25), transparent)',
                width: '0%',
              }}
            />
          </div>

          {/* Brand mark — name.png */}
          <div
            ref={imageRef}
            style={{
              flexShrink: 0,
              opacity: 0,
            }}
          >
            <Image
              src="/name.png"
              alt="OUTRICATE"
              width={280}
              height={56}
              className="select-none"
              style={{
                objectFit: 'contain',
                height: '48px',
                width: 'auto',
                filter: 'drop-shadow(0 0 24px rgba(201, 168, 76, 0.15))',
              }}
              draggable={false}
              unoptimized
            />
          </div>

          {/* Right line — grows from center outward */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <div
              ref={lineRightRef}
              style={{
                height: '1px',
                background: 'linear-gradient(to right, rgba(201,168,76,0.25), transparent)',
                width: '0%',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
