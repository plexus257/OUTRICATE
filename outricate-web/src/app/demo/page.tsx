'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Clock, CheckCircle2, Loader2 } from 'lucide-react';

interface Slot { date: string; displayDate: string; times: string[]; }

export default function DemoPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/demo').then((r) => r.json()).then((d) => setSlots(d.slots || [])).catch(console.error);
  }, []);

  const selectedSlot = slots.find((s) => s.date === selectedDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <section className="section-padding-lg">
        <div className="section-container" style={{ maxWidth: '720px' }}>
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: '64px' }}>
              <p className="text-overline" style={{ marginBottom: '24px' }}>BOOK A DEMO</p>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                See OUTRICATE{' '}
                <span style={{ color: 'var(--color-accent)' }}>in action.</span>
              </h1>
              <p className="text-body-xl" style={{ maxWidth: '480px', margin: '0 auto' }}>
                30-minute personalized walkthrough. No commitment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="card-elevated">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center" style={{ padding: '48px 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-success-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                      <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                    </div>
                    <h3 className="text-h3" style={{ marginBottom: '12px' }}>Demo Booked!</h3>
                    <p className="text-body" style={{ marginBottom: '4px' }}>{selectedSlot?.displayDate} at {selectedTime}</p>
                    <p className="text-caption">Calendar invite sent to {form.email}</p>
                  </motion.div>
                ) : (
                  <motion.div>
                    {/* Steps */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                      {[1, 2].map((s) => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '13px', fontWeight: 700,
                            background: step >= s ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                            color: step >= s ? 'white' : 'var(--color-text-tertiary)',
                            border: `1.5px solid ${step >= s ? 'var(--color-accent)' : 'var(--color-border)'}`,
                          }}>{s}</div>
                          <span style={{ fontSize: '14px', fontWeight: step >= s ? 600 : 400, color: step >= s ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
                            {s === 1 ? 'Select Time' : 'Your Details'}
                          </span>
                          {s < 2 && <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                          <h3 className="text-h3" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <CalendarCheck className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Pick a Date & Time
                          </h3>
                          <p className="text-caption" style={{ marginBottom: '32px' }}>30-minute personalized demo</p>

                          <div style={{ marginBottom: '28px' }}>
                            <label className="label-field" style={{ marginBottom: '12px' }}>Available Dates</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '10px' }}>
                              {slots.slice(0, 8).map((slot) => (
                                <button key={slot.date} onClick={() => { setSelectedDate(slot.date); setSelectedTime(''); }}
                                  className="cursor-pointer"
                                  style={{
                                    padding: '14px', borderRadius: '14px', textAlign: 'center', fontSize: '13px', fontWeight: 500,
                                    border: `1.5px solid ${selectedDate === slot.date ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                                    background: selectedDate === slot.date ? 'var(--color-accent-subtle)' : 'var(--color-bg-elevated)',
                                    color: selectedDate === slot.date ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                    transition: 'all 0.2s',
                                  }}
                                >{slot.displayDate}</button>
                              ))}
                            </div>
                          </div>

                          {selectedDate && selectedSlot && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                              <label className="label-field" style={{ marginBottom: '12px' }}>Available Times</label>
                              <div className="grid grid-cols-3 sm:grid-cols-5" style={{ gap: '10px' }}>
                                {selectedSlot.times.map((time) => (
                                  <button key={time} onClick={() => setSelectedTime(time)}
                                    className="cursor-pointer"
                                    style={{
                                      padding: '12px', borderRadius: '12px', fontSize: '13px',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                      border: `1.5px solid ${selectedTime === time ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                                      background: selectedTime === time ? 'var(--color-accent-subtle)' : 'var(--color-bg-elevated)',
                                      color: selectedTime === time ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                      transition: 'all 0.2s',
                                    }}
                                  ><Clock className="w-3 h-3" /> {time}</button>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          <button onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime}
                            className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '36px', opacity: !selectedDate || !selectedTime ? 0.3 : 1, cursor: !selectedDate || !selectedTime ? 'not-allowed' : 'pointer' }}>
                            Continue
                          </button>
                        </motion.div>
                      ) : (
                        <motion.form key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} onSubmit={handleSubmit}
                          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          <div className="card-flat" style={{ padding: '16px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <CalendarCheck className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 600 }}>{selectedSlot?.displayDate} at {selectedTime}</div>
                              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>30-minute demo</div>
                            </div>
                            <button type="button" onClick={() => setStep(1)} className="cursor-pointer" style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--color-accent)', background: 'none', border: 'none' }}>Change</button>
                          </div>
                          <div><label className="label-field">Full Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-field" /></div>
                          <div><label className="label-field">Email *</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-field" /></div>
                          <div><label className="label-field">Company *</label><input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="input-field" /></div>
                          <div><label className="label-field">What do you want to see?</label><textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your use case (optional)" className="input-field" style={{ resize: 'none' }} /></div>
                          {status === 'error' && <p style={{ fontSize: '14px', color: 'var(--color-error)' }}>{errorMsg}</p>}
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                              {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : 'Confirm Booking'}
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
