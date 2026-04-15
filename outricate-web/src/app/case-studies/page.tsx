'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    company: 'Enterprise SaaS Platform',
    industry: 'SaaS',
    initials: 'SP',
    challenge: 'A 5-person sales team could only reach 200 prospects per month, leaving thousands of potential customers untouched.',
    solution: 'OUTRICATE identified 3,400+ qualified prospects in their target market, launched personalized outreach, and booked meetings with decision-makers.',
    results: [
      { metric: '340%', label: 'Lead increase' },
      { metric: '127', label: 'New partnerships' },
      { metric: '$850K', label: 'Pipeline (90 days)' },
    ],
    quote: 'OUTRICATE did in 3 months what our sales team couldn\'t do in 2 years.',
    author: 'Director of Sales',
    timeline: '90-day pilot',
  },
  {
    company: 'Healthcare Clinic Network',
    industry: 'Healthcare',
    initials: 'HC',
    challenge: 'Spending $120 per patient acquisition through traditional channels with zero pipeline visibility.',
    solution: 'Automated physician referral outreach and deployed targeted acquisition campaigns for new patient bookings.',
    results: [
      { metric: '2.8x', label: 'Patient acquisition' },
      { metric: '60%', label: 'CAC reduction' },
      { metric: '$420K', label: 'Revenue growth' },
    ],
    quote: 'Patient acquisition is now a predictable, scalable system.',
    author: 'Medical Director',
    timeline: '6-month pilot',
  },
  {
    company: 'B2B Wholesale Group',
    industry: 'Wholesale',
    initials: 'WG',
    challenge: 'Making 50 cold calls a day with a 2% success rate. Massive catalog but no way to find buyers.',
    solution: 'Identified 5,000+ potential buyers across 3 product categories, launched targeted outreach with AI calling.',
    results: [
      { metric: '$1.2M', label: 'Pipeline (90 days)' },
      { metric: '5x', label: 'Outreach ROI' },
      { metric: '312', label: 'Meetings booked' },
    ],
    quote: 'The AI calling agent outperforms any SDR we\'ve hired.',
    author: 'CEO',
    timeline: '90-day pilot',
  },
];

const industries = [
  { label: 'All', value: 'all' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Wholesale', value: 'Wholesale' },
];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? caseStudies : caseStudies.filter(cs => cs.industry === filter);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="section-container text-center">
          <ScrollReveal>
            <p className="text-overline" style={{ marginBottom: '24px' }}>CASE STUDIES</p>
            <h1 className="text-display" style={{ maxWidth: '700px', margin: '0 auto 28px' }}>
              Real results from{' '}
              <span style={{ color: 'var(--color-accent)' }}>pilot programs.</span>
            </h1>
            <p className="text-body-xl" style={{ maxWidth: '500px', margin: '0 auto 48px' }}>
              See how businesses across industries are building predictable revenue with OUTRICATE.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {industries.map((ind) => (
                <button
                  key={ind.value}
                  onClick={() => setFilter(ind.value)}
                  className="cursor-pointer"
                  style={{
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '100px',
                    border: '1.5px solid',
                    borderColor: filter === ind.value ? 'var(--color-accent-border)' : 'var(--color-border)',
                    background: filter === ind.value ? 'var(--color-accent-subtle)' : 'transparent',
                    color: filter === ind.value ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cases */}
      {filtered.map((cs, i) => (
        <section
          key={i}
          className="section-padding"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: i % 2 === 0 ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
          }}
        >
          <div className="section-container">
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
                <div
                  style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: 'var(--color-accent-subtle)',
                    border: '1px solid var(--color-accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700, color: 'var(--color-accent)',
                  }}
                >
                  {cs.initials}
                </div>
                <div>
                  <h2 className="text-h3">{cs.company}</h2>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>{cs.industry} · {cs.timeline}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px', marginBottom: '48px' }}>
                {cs.results.map((r, j) => (
                  <div key={j} className="card-flat text-center" style={{ padding: '32px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-accent)' }}>{r.metric}</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginTop: '8px' }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '48px' }}>
              <ScrollReveal delay={0.15}>
                <div style={{ marginBottom: '36px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>THE CHALLENGE</h3>
                  <p className="text-body">{cs.challenge}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>THE SOLUTION</h3>
                  <p className="text-body">{cs.solution}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="card h-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '16px', color: '#F59E0B', letterSpacing: '2px', marginBottom: '20px' }}>★★★★★</div>
                  <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--color-text-primary)', marginBottom: '24px' }}>
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-tertiary)' }}>
                    — {cs.author}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Summary */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: '64px' }}>
              <h2 className="text-h2">Pilot program results</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
              {[
                { value: 2.4, suffix: 'M', prefix: '$', label: 'Projected pipeline', decimals: 1 },
                { value: 120, suffix: '+', prefix: '', label: 'Companies in pilot', decimals: 0 },
                { value: 340, suffix: '%', prefix: '', label: 'Avg lead increase', decimals: 0 },
                { value: 89, suffix: '%', prefix: '', label: 'Meeting show rate', decimals: 0 },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="metric-value">
                    <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="metric-label">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-lg" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-h1" style={{ marginBottom: '20px' }}>Your success story starts here.</h2>
            <p className="text-body-lg" style={{ maxWidth: '440px', margin: '0 auto 48px' }}>
              Join 120+ companies building revenue infrastructure with OUTRICATE.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '16px' }}>
              <Link href="/waitlist" className="btn-primary">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/demo" className="btn-secondary">Book a Demo</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
