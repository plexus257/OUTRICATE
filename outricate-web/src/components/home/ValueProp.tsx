'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Mail, CalendarCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Search,
    title: 'Find Leads',
    description: 'AI-powered prospecting from 50+ data sources. Qualified leads enriched with verified contact information, delivered daily.',
    stat: '50+',
    statLabel: 'Data sources',
  },
  {
    icon: Mail,
    title: 'Reach Out',
    description: 'Personalized multi-channel outreach at scale. Email, SMS, and AI voice calls — orchestrated automatically.',
    stat: '94%',
    statLabel: 'Deliverability',
  },
  {
    icon: CalendarCheck,
    title: 'Book Meetings',
    description: 'Qualified prospects auto-booked on your calendar. You show up, they show up, deals get closed.',
    stat: '340+',
    statLabel: 'Meetings / month',
  },
];

export default function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.vp-reveal');
      gsap.fromTo(els, {
        opacity: 0, y: 40, filter: 'blur(8px)',
      }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    }

    // Horizontal line
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, {
        width: '0%',
      }, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%',
        },
      });
    }

    // Cards stagger
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children, {
        opacity: 0, y: 60, filter: 'blur(6px)',
      }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="text-center" style={{ marginBottom: '100px' }}>
          <p className="text-overline vp-reveal" style={{ marginBottom: '24px', opacity: 0 }}>HOW IT WORKS</p>
          <h2 className="text-h1 vp-reveal" style={{ maxWidth: '650px', margin: '0 auto', opacity: 0 }}>
            Three engines.{' '}
            <span style={{ color: 'var(--color-text-tertiary)' }}>One revenue system.</span>
          </h2>
        </div>

        {/* Animated horizontal rule */}
        <div style={{ marginBottom: '80px' }}>
          <div
            ref={lineRef}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--color-border-strong), transparent)',
              width: '0%',
            }}
          />
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="card h-full flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="feature-icon">
                <pillar.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-h3" style={{ marginBottom: '16px' }}>{pillar.title}</h3>
              <p className="text-body" style={{ marginBottom: '40px', flex: 1 }}>{pillar.description}</p>
              <div
                style={{
                  paddingTop: '28px',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div style={{
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}>
                  {pillar.stat}
                </div>
                <div className="text-caption" style={{ marginTop: '8px' }}>{pillar.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
