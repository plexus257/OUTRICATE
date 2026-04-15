'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    description: 'For businesses getting started with automated outreach.',
    monthlyBase: 499,
    annualBase: 399,
    features: [
      { text: 'Up to 1,000 leads/month', included: true },
      { text: 'Email outreach engine', included: true },
      { text: 'Basic lead scoring', included: true },
      { text: 'Meeting booking', included: true },
      { text: 'Dashboard analytics', included: true },
      { text: 'AI calling agent', included: false },
      { text: 'Multi-channel outreach', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
    popular: false,
  },
  {
    name: 'Growth',
    description: 'The full revenue engine for scaling businesses.',
    monthlyBase: 1499,
    annualBase: 1199,
    features: [
      { text: 'Up to 5,000 leads/month', included: true },
      { text: 'Email outreach engine', included: true },
      { text: 'Advanced AI lead scoring', included: true },
      { text: 'Meeting booking', included: true },
      { text: 'Full dashboard analytics', included: true },
      { text: 'AI calling agent', included: true },
      { text: 'Multi-channel outreach', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations that need unlimited scale.',
    monthlyBase: null,
    annualBase: null,
    features: [
      { text: 'Unlimited leads', included: true },
      { text: 'Email outreach engine', included: true },
      { text: 'Enterprise AI & scoring', included: true },
      { text: 'Priority meeting booking', included: true },
      { text: 'Custom dashboards', included: true },
      { text: 'AI calling agent (priority)', included: true },
      { text: 'Omni-channel outreach', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    popular: false,
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: 'We offer free early access for waitlist members. Join to be among the first to try OUTRICATE at no cost.' },
  { q: 'Can I change plans later?', a: 'Yes. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'How is the AI calling different from robocalls?', a: 'Our AI conducts natural, intelligent conversations. It understands context, handles objections, and qualifies prospects — it\'s not a recorded message.' },
  { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee on all plans. If OUTRICATE doesn\'t deliver results, you get a full refund.' },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="section-container text-center">
          <ScrollReveal>
            <p className="text-overline" style={{ marginBottom: '24px' }}>PRICING</p>
            <h1 className="text-display" style={{ maxWidth: '600px', margin: '0 auto 28px' }}>
              Simple, transparent{' '}
              <span style={{ color: 'var(--color-accent)' }}>pricing.</span>
            </h1>
            <p className="text-body-xl" style={{ maxWidth: '480px', margin: '0 auto 48px' }}>
              Start free. Pay for results. Scale without limits.
            </p>

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: !isAnnual ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="cursor-pointer"
                style={{
                  position: 'relative',
                  width: '48px', height: '26px',
                  borderRadius: '13px',
                  background: isAnnual ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                  border: `1.5px solid ${isAnnual ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    width: '20px', height: '20px',
                    borderRadius: '10px',
                    background: 'white',
                  }}
                  animate={{ left: isAnnual ? '24px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
              <span style={{ fontSize: '14px', fontWeight: 500, color: isAnnual ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
                Annual<span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-accent)', marginLeft: '8px' }}>Save 20%</span>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Plans */}
      <section style={{ paddingBottom: '140px' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {plans.map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="card h-full"
                  style={{
                    position: 'relative',
                    borderColor: plan.popular ? 'var(--color-accent-border)' : undefined,
                    boxShadow: plan.popular ? 'var(--shadow-glow)' : undefined,
                  }}
                >
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                      <span style={{
                        padding: '6px 20px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 700,
                        background: 'var(--color-accent)',
                        color: 'white',
                        letterSpacing: '0.02em',
                      }}>
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <h3 className="text-h3" style={{ marginBottom: '8px' }}>{plan.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', marginBottom: '32px' }}>{plan.description}</p>

                  <div style={{ marginBottom: '36px' }}>
                    {plan.monthlyBase !== null ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                          ${isAnnual ? plan.annualBase : plan.monthlyBase}
                        </span>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>/month</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                        Custom
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                        {f.included ? (
                          <Check className="w-4 h-4" style={{ color: 'var(--color-accent)', flexShrink: 0 }} strokeWidth={2.5} />
                        ) : (
                          <Minus className="w-4 h-4" style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }} />
                        )}
                        <span style={{ color: f.included ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)' }}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.monthlyBase !== null ? '/waitlist' : '/contact'}
                    className={plan.popular ? 'btn-primary-gold' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {plan.monthlyBase !== null ? 'Get Started' : 'Contact Sales'}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
        <div className="section-narrow">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: '64px' }}>
              <h2 className="text-h2">Frequently asked questions</h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="cursor-pointer"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '22px 28px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 500, paddingRight: '16px' }}>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      style={{ color: 'var(--color-text-tertiary)', fontSize: '20px', flexShrink: 0 }}
                    >+</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ padding: '0 28px 22px', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            <h2 className="text-h1" style={{ marginBottom: '20px' }}>Need a custom plan?</h2>
            <p className="text-body-lg" style={{ maxWidth: '400px', margin: '0 auto 48px' }}>
              Let&apos;s build pricing that matches your business goals.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
