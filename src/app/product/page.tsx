'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import Link from 'next/link';
import { ArrowRight, Search, Mail, Phone, CalendarCheck, BarChart3, Shield, Database, Bot, LineChart, Globe } from 'lucide-react';

const features = [
  {
    step: '01',
    title: 'Lead Intelligence Engine',
    subtitle: 'Find the right leads, automatically.',
    description: 'Our AI continuously scans databases, directories, and industry sources to identify prospects matching your ideal customer profile. Every contact is verified and enriched.',
    capabilities: [
      { icon: Database, text: 'Multi-source discovery across 50+ platforms' },
      { icon: Search, text: 'Real-time lead scoring and qualification' },
      { icon: Globe, text: 'Industry-specific targeting filters' },
      { icon: Shield, text: 'Verified contact information' },
    ],
    metric: '12,847+',
    metricLabel: 'Leads identified monthly',
  },
  {
    step: '02',
    title: 'Outreach Engine',
    subtitle: 'Personalized outreach at infinite scale.',
    description: 'Deploy multi-channel campaigns that feel personal. Email sequences, SMS, and social outreach — orchestrated by our platform to maximize response rates.',
    capabilities: [
      { icon: Bot, text: 'AI-generated personalized messaging' },
      { icon: LineChart, text: 'Automated A/B testing and optimization' },
      { icon: Mail, text: 'Multi-channel sequences (Email + SMS + Social)' },
      { icon: Shield, text: 'Deliverability optimization built in' },
    ],
    metric: '94%',
    metricLabel: 'Email deliverability rate',
  },
  {
    step: '03',
    title: 'AI Calling Agent',
    subtitle: 'Convert conversations into meetings.',
    description: 'Our voice AI conducts natural conversations with prospects. It handles objections, qualifies leads, and schedules meetings — without human intervention.',
    capabilities: [
      { icon: Phone, text: 'Natural language conversation engine' },
      { icon: Shield, text: 'Industry-trained objection handling' },
      { icon: Bot, text: 'Real-time sentiment analysis' },
      { icon: Database, text: 'Call recording and transcription' },
    ],
    metric: '8,234+',
    metricLabel: 'Calls completed monthly',
  },
  {
    step: '04',
    title: 'Revenue Dashboard',
    subtitle: 'Full-funnel visibility in real time.',
    description: 'See every lead, touchpoint, and conversion in one unified view. Predictive analytics show where revenue is coming from and where it\'s going.',
    capabilities: [
      { icon: BarChart3, text: 'Real-time pipeline analytics' },
      { icon: LineChart, text: 'Revenue forecasting and predictions' },
      { icon: Globe, text: 'Team performance tracking' },
      { icon: CalendarCheck, text: 'Custom reporting and exports' },
    ],
    metric: '$2.4M',
    metricLabel: 'Projected pipeline value',
  },
];

export default function ProductPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="section-container text-center">
          <ScrollReveal>
            <p className="text-overline" style={{ marginBottom: '24px' }}>PRODUCT</p>
            <h1 className="text-display" style={{ maxWidth: '700px', margin: '0 auto 28px' }}>
              The complete{' '}
              <span style={{ color: 'var(--color-accent)' }}>revenue engine.</span>
            </h1>
            <p className="text-body-xl" style={{ maxWidth: '520px', margin: '0 auto' }}>
              Four powerful systems working together to find leads, reach them, convert them, and deliver revenue — on autopilot.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      {features.map((feature, i) => (
        <section
          key={i}
          className="section-padding"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: i % 2 === 0 ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
          }}
        >
          <div className="section-container">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 items-start ${i % 2 === 1 ? 'direction-rtl' : ''}`}
              style={{ gap: '80px' }}
            >
              <ScrollReveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-mono" style={{ marginBottom: '20px', display: 'block' }}>{feature.step}</span>
                <h2 className="text-h2" style={{ marginBottom: '12px' }}>{feature.title}</h2>
                <p className="text-body-lg" style={{ marginBottom: '24px', color: 'var(--color-accent)' }}>{feature.subtitle}</p>
                <p className="text-body" style={{ marginBottom: '40px' }}>{feature.description}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {feature.capabilities.map((cap, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '36px', height: '36px', borderRadius: '10px',
                          background: 'var(--color-accent-subtle)',
                          border: '1px solid var(--color-accent-border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}
                      >
                        <cap.icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} strokeWidth={1.5} />
                      </div>
                      <span className="text-body" style={{ fontSize: '14px' }}>{cap.text}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div
                  className="card text-center"
                  style={{ padding: '64px 40px' }}
                >
                  <div className="metric-value" style={{ color: 'var(--color-accent)' }}>{feature.metric}</div>
                  <div className="metric-label" style={{ marginTop: '12px' }}>{feature.metricLabel}</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section-padding-lg" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-h1" style={{ marginBottom: '20px' }}>
              Ready to see it in action?
            </h2>
            <p className="text-body-lg" style={{ maxWidth: '460px', margin: '0 auto 48px' }}>
              Book a personalized demo and see how OUTRICATE builds your revenue infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '16px' }}>
              <Link href="/demo" className="btn-primary">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/waitlist" className="btn-secondary">
                Get Started Free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
