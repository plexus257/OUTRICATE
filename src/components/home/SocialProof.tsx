'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 40, suffix: '%', label: 'Faster pipeline velocity' },
  { value: 120, suffix: '+', label: 'Companies in pilot' },
  { value: 4, suffix: 'X', label: 'Increase in meetings booked' },
];

const testimonials = [
  {
    quote: 'OUTRICATE did in 3 months what our team couldn\'t do in 2 years. We went from scattered outreach to a predictable pipeline.',
    author: 'Rakesh P.',
    role: 'VP of Sales',
    company: 'Enterprise SaaS Company',
  },
  {
    quote: 'We replaced manual prospecting with OUTRICATE and our meeting volume tripled. The ROI paid for itself in week one.',
    author: 'Sneha M.',
    role: 'Head of Growth',
    company: 'B2B Marketplace',
  },
  {
    quote: 'The AI outreach engine is genuinely better than any SDR we\'ve hired. It works 24/7 and never misses a follow-up.',
    author: 'Vikram S.',
    role: 'CEO',
    company: 'Wholesale Distribution Group',
  },
];

// Animated counter using requestAnimationFrame
function MetricCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const el = ref.current;
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function SocialProof() {
  const [activeQuote, setActiveQuote] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animate quote change
  const animateQuote = useCallback(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(quoteRef.current, {
      opacity: 0, y: 20, filter: 'blur(8px)',
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.7, ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    animateQuote();
  }, [activeQuote, animateQuote]);

  // Section entrance
  useEffect(() => {
    if (!sectionRef.current) return;

    const headerEls = sectionRef.current.querySelectorAll('.sp-reveal');
    gsap.fromTo(headerEls, { opacity: 0, y: 40, filter: 'blur(8px)' }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });

    if (metricsRef.current) {
      gsap.fromTo(metricsRef.current.children, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: metricsRef.current, start: 'top 82%' },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const current = testimonials[activeQuote];

  return (
    <section ref={sectionRef} style={{ borderTop: '1px solid var(--color-border)' }}>
      {/* Metrics + Quote — cinematic split */}
      <div className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="section-container">
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '100px' }}>
            <p className="text-overline sp-reveal" style={{ marginBottom: '24px', opacity: 0 }}>PILOT RESULTS</p>
            <h2 className="text-h1 sp-reveal" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0 }}>
              Results that{' '}
              <span style={{ color: 'var(--color-text-tertiary)' }}>speak volumes.</span>
            </h2>
          </div>

          {/* Metrics row */}
          <div
            ref={metricsRef}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '0', maxWidth: '1000px', margin: '0 auto 120px' }}
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                className="text-center"
                style={{
                  padding: '48px 40px',
                  borderRight: i < metrics.length - 1 ? '1px solid var(--color-border)' : 'none',
                  opacity: 0,
                }}
              >
                <div className="metric-value">
                  <MetricCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Single large testimonial */}
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            {/* Quote mark */}
            <div style={{
              fontSize: '80px', lineHeight: 1, color: 'rgba(201,168,76,0.12)',
              fontFamily: 'Georgia, serif', marginBottom: '-20px',
            }}>
              &ldquo;
            </div>

            <div ref={quoteRef}>
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-primary)',
                fontWeight: 400,
                marginBottom: '40px',
                letterSpacing: '-0.01em',
              }}>
                {current.quote}
              </p>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {current.author}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                  {current.role}, {current.company}
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center" style={{ gap: '8px', marginTop: '40px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className="cursor-pointer"
                  aria-label={`View testimonial ${i + 1}`}
                  style={{
                    width: activeQuote === i ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: activeQuote === i ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    padding: 0,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
