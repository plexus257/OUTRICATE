'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = [
  'on autopilot.',
  'without cold calling.',
  'while you sleep.',
  'at infinite scale.',
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GSAP cinematic entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    // Gradient orb breathing
    const orb = sectionRef.current?.querySelector('.hero-orb');
    if (orb) {
      gsap.to(orb, {
        scale: 1.08,
        opacity: 0.8,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Badge
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 24, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      );
    }

    // Headline — line by line
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.hero-line');
      tl.fromTo(
        lines,
        { opacity: 0, y: 50, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // Subheadline
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.7'
      );
    }

    // CTAs
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // Trust bar
    if (trustRef.current) {
      tl.fromTo(
        trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Parallax on scroll
    if (sectionRef.current) {
      gsap.to(badgeRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to(headlineRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to(subRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to(ctaRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }, []);

  // Word transition with GSAP
  const animateWord = useCallback(() => {
    if (!wordRef.current) return;
    gsap.fromTo(
      wordRef.current,
      { opacity: 0, y: 30, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    animateWord();
  }, [wordIndex, animateWord]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', paddingTop: '180px', paddingBottom: '140px' }}
    >
      {/* Cinematic gradient orb — gold tinted */}
      <div
        className="hero-orb absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1400px',
          height: '900px',
          background: 'radial-gradient(ellipse 45% 45% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 100%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      {/* Second orb — warm */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '30%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.02) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 section-container text-center flex flex-col items-center w-full">
        {/* Badge */}
        <div ref={badgeRef} style={{ marginBottom: '48px', opacity: 0 }}>
          <span className="badge" style={{ padding: '10px 22px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', marginRight: '8px' }} />
            Revenue Infrastructure for B2B
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-hero w-full flex flex-col items-center"
          style={{ maxWidth: '1100px', marginBottom: '36px' }}
        >
          <span className="hero-line" style={{ opacity: 0 }}>Your pipeline,</span>
          <div className="hero-line" style={{ opacity: 0 }}>
            <div
              ref={wordRef}
              style={{ color: 'var(--color-accent)', display: 'inline-block' }}
            >
              {rotatingWords[wordIndex]}
            </div>
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-body-xl"
          style={{
            maxWidth: '600px', marginBottom: '64px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            opacity: 0,
          }}
        >
          OUTRICATE finds qualified leads, contacts them, and books meetings on your calendar — so you only show up to close.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center w-full"
          style={{ gap: '16px', marginBottom: '140px' }}
        >
          <Link href="/waitlist" className="btn-primary" style={{ minWidth: '180px' }}>
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/demo" className="btn-secondary" style={{ minWidth: '180px' }}>
            Book a Demo
          </Link>
        </div>

        {/* Trust bar */}
        <div ref={trustRef} className="w-full" style={{ opacity: 0 }}>
          <p className="text-overline text-center" style={{ marginBottom: '28px' }}>
            TRUSTED BY GROWING B2B COMPANIES
          </p>
          <div className="flex items-center justify-center flex-wrap" style={{ gap: '48px' }}>
            {['SaaS', 'Healthcare', 'Real Estate', 'Wholesale', 'Enterprise'].map((industry, i) => (
              <span
                key={i}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.18)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
