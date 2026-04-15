'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <section className="section-padding-lg">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '80px' }}>
            {/* Left */}
            <ScrollReveal>
              <p className="text-overline" style={{ marginBottom: '24px' }}>CONTACT</p>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Let&apos;s talk.
              </h1>
              <p className="text-body-xl" style={{ marginBottom: '56px' }}>
                Have a question, partnership idea, or want to learn more about OUTRICATE? We&apos;d love to hear from you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div className="feature-icon" style={{ marginBottom: 0 }}>
                    <Mail className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-caption" style={{ marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>hello@outricate.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div className="feature-icon" style={{ marginBottom: 0 }}>
                    <MapPin className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-caption" style={{ marginBottom: '4px' }}>Headquarters</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Ahmedabad, India</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right */}
            <ScrollReveal delay={0.15}>
              <div className="card-elevated">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center" style={{ padding: '48px 0' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                        <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                      </div>
                      <h3 className="text-h3" style={{ marginBottom: '12px' }}>Message sent!</h3>
                      <p className="text-body">We&apos;ll get back to you within 24 hours.</p>
                      <button onClick={() => setStatus('idle')} className="btn-secondary cursor-pointer" style={{ marginTop: '28px', height: '44px', padding: '0 24px' }}>Send Another</button>
                    </motion.div>
                  ) : (
                    <motion.form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div><label className="label-field">Full Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-field" /></div>
                      <div><label className="label-field">Email *</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-field" /></div>
                      <div><label className="label-field">Company *</label><input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company name" className="input-field" /></div>
                      <div><label className="label-field">Message *</label><textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your needs..." className="input-field" style={{ resize: 'none' }} /></div>
                      {status === 'error' && <p style={{ fontSize: '14px', color: 'var(--color-error)' }}>{errorMsg}</p>}
                      <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
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
