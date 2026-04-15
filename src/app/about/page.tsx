'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import Link from 'next/link';
import { ArrowRight, Target, Zap, Shield, Heart, Globe, Users } from 'lucide-react';

const values = [
  { icon: Target, title: 'Results Over Everything', description: 'We measure success in revenue delivered, not features shipped.' },
  { icon: Zap, title: 'Relentless Execution', description: 'We ship fast, iterate faster, and never stop improving.' },
  { icon: Shield, title: 'Trust is Non-Negotiable', description: 'Enterprise-grade security is built into our DNA.' },
  { icon: Heart, title: 'Customer Obsession', description: 'Every line of code is written with our customer\'s success in mind.' },
  { icon: Globe, title: 'Think at Scale', description: 'Everything is designed to scale from 10 leads to 10 million.' },
  { icon: Users, title: 'People First', description: 'Technology should amplify human potential, not replace it.' },
];

const timeline = [
  { year: '2024', event: 'Founded with a mission to democratize revenue infrastructure for Indian businesses.' },
  { year: 'Q1 2025', event: 'Launched pilot program with 50 B2B companies across India.' },
  { year: 'Q2 2025', event: 'Expanded to healthcare and B2B wholesale verticals.' },
  { year: 'Today', event: '120+ businesses in active pilot. Building the future of B2B sales.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: '80px' }}>
            <ScrollReveal>
              <p className="text-overline" style={{ marginBottom: '24px' }}>ABOUT OUTRICATE</p>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Revenue infrastructure.{' '}
                <span style={{ color: 'var(--color-accent)' }}>Redefined.</span>
              </h1>
              <p className="text-body-lg" style={{ marginBottom: '24px' }}>
                We started OUTRICATE with a simple belief: businesses shouldn&apos;t need armies of salespeople to grow. They need infrastructure that generates revenue.
              </p>
              <p className="text-body">
                Our platform combines AI-powered lead discovery, automated outreach, voice AI, and smart scheduling into one unified engine.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { value: '120+', label: 'Companies in pilot program' },
                  { value: '$2.4M', label: 'Projected pipeline value' },
                  { value: '3', label: 'Industries served' },
                ].map((stat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '28px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text-primary)', minWidth: '130px' }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
        <div className="section-narrow text-center">
          <ScrollReveal>
            <p className="text-overline" style={{ marginBottom: '24px' }}>OUR MISSION</p>
            <h2 className="text-h1" style={{ marginBottom: '24px' }}>
              Make revenue generation as easy as turning on a switch.
            </h2>
            <p className="text-body-lg" style={{ maxWidth: '560px', margin: '0 auto' }}>
              Every business deserves a predictable, scalable revenue engine — regardless of team size, budget, or technical expertise.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: '72px' }}>
              <p className="text-overline" style={{ marginBottom: '20px' }}>OUR VALUES</p>
              <h2 className="text-h2">What drives us</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="card h-full">
                  <div className="feature-icon"><v.icon className="w-5 h-5" strokeWidth={1.8} /></div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-text-primary)' }}>{v.title}</h3>
                  <p className="text-body" style={{ fontSize: '14px' }}>{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
        <div className="section-narrow">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: '64px' }}>
              <p className="text-overline" style={{ marginBottom: '20px' }}>OUR JOURNEY</p>
              <h2 className="text-h2">The road so far</h2>
            </div>
          </ScrollReveal>

          <div>
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: '24px', paddingBottom: '40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                    {i < timeline.length - 1 && <div style={{ width: '1px', flex: 1, background: 'var(--color-border)', marginTop: '8px' }} />}
                  </div>
                  <div style={{ paddingBottom: '8px' }}>
                    <span className="text-mono">{item.year}</span>
                    <p className="text-body" style={{ marginTop: '8px' }}>{item.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-lg" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-h1" style={{ marginBottom: '20px' }}>
              We&apos;re building revenue infrastructure.
            </h2>
            <p className="text-body-lg" style={{ maxWidth: '440px', margin: '0 auto 48px' }}>
              OUTRICATE is for businesses that are serious about growth. Join us.
            </p>
            <Link href="/waitlist" className="btn-primary">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
