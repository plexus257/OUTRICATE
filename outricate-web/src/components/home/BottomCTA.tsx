'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BottomCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const els = contentRef.current.querySelectorAll('.cta-reveal');
    gsap.fromTo(els, {
      opacity: 0, y: 50, filter: 'blur(10px)',
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    // CTAs scale in
    const buttons = contentRef.current.querySelectorAll('.cta-btn');
    gsap.fromTo(buttons, {
      opacity: 0, scale: 0.9, y: 20,
    }, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: '100vh',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      {/* Ambient gradient mesh — gold */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse 40% 40% at 35% 50%, rgba(201,168,76,0.04) 0%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.02) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={contentRef} className="section-container text-center relative z-10" style={{ padding: '200px 48px' }}>
        <p className="text-overline cta-reveal" style={{ marginBottom: '32px', opacity: 0 }}>GET STARTED</p>
        <h2 className="text-display cta-reveal" style={{ maxWidth: '750px', margin: '0 auto 32px', opacity: 0 }}>
          Your revenue engine{' '}
          <span style={{ color: 'var(--color-accent)' }}>is waiting.</span>
        </h2>
        <p
          className="text-body-lg cta-reveal"
          style={{ maxWidth: '480px', margin: '0 auto 64px', opacity: 0 }}
        >
          Join 120+ companies already using OUTRICATE to automate their pipeline. Free to start. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '16px' }}>
          <Link href="/waitlist" className="btn-primary cta-btn" style={{ opacity: 0 }}>
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/demo" className="btn-secondary cta-btn" style={{ opacity: 0 }}>
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
