'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const industries = ['SaaS / Technology', 'Healthcare', 'B2B Services', 'Real Estate', 'Wholesale / Distribution', 'Agency / Consulting', 'Other'];

export default function WaitlistPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [position, setPosition] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, businessName: form.company, industry: form.industry, phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setPosition(data.position);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <section className="section-padding-lg">
        <div className="section-container" style={{ maxWidth: '1000px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: '80px' }}>
            {/* Left */}
            <ScrollReveal className="lg:sticky lg:top-[120px]">
              <p className="text-overline" style={{ marginBottom: '24px' }}>EARLY ACCESS</p>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Get started.
              </h1>
              <p className="text-body-xl" style={{ marginBottom: '48px' }}>
                Be among the first to access OUTRICATE. Early members get free access during our launch period.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
                {['Priority access when we launch', 'Free during early access period', 'Dedicated onboarding support', 'Shape the product with your feedback'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-accent)', flexShrink: 0 }} strokeWidth={2} />
                    <span className="text-body">{item}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="card-flat" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex' }}>
                  {['#C9A84C', '#30D158', '#8E8E93', '#F5F5F7'].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        border: '2px solid var(--color-bg-elevated)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 700, color: i === 3 ? '#050506' : 'white', background: c,
                        marginLeft: i > 0 ? '-8px' : 0,
                      }}
                    >
                      {['AM', 'PS', 'VT', 'SK'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>120+ companies onboard</span>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Growing every day</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal delay={0.15}>
              <div className="card-elevated">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center" style={{ padding: '32px 0' }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}
                      >
                        <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                      </motion.div>
                      <h3 className="text-h3" style={{ marginBottom: '12px' }}>You&apos;re in!</h3>
                      <p className="text-body" style={{ marginBottom: '8px' }}>You&apos;re #{position} on the list.</p>
                      <p className="text-caption" style={{ marginBottom: '32px' }}>We&apos;ll notify you as soon as we&apos;re ready.</p>
                      <Link href="/demo" className="btn-primary-gold" style={{ height: '44px', padding: '0 24px', fontSize: '14px' }}>
                        Book a Demo <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div><label className="label-field">Full Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="input-field" /></div>
                      <div><label className="label-field">Work Email *</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-field" /></div>
                      <div><label className="label-field">Company Name *</label><input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company" className="input-field" /></div>
                      <div><label className="label-field">Industry *</label>
                        <select required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="input-field cursor-pointer" style={{ appearance: 'none' }}>
                          <option value="" disabled>Select your industry</option>
                          {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                        </select>
                      </div>
                      <div><label className="label-field">Phone Number</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="input-field" /></div>

                      {status === 'error' && <p style={{ fontSize: '14px', color: 'var(--color-error)' }}>{errorMsg}</p>}

                      <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Joining...</> : <>Get Started <ArrowRight className="w-4 h-4" /></>}
                      </button>
                      <p className="text-center" style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No spam. No credit card required.</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
