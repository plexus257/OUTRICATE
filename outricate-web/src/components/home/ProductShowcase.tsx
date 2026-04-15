'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database, Mail, MessageSquare, Calendar, User, Building2,
  CheckCircle2, Clock, Send,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: 'find',
    step: '01',
    label: 'Find Leads',
    title: 'We find your ideal customers',
    description: 'Our AI scans 50+ data sources to identify prospects matching your ideal customer profile. Every lead is scored, verified, and enriched with contact details.',
    metric: '12,847+',
    metricLabel: 'Leads identified monthly',
  },
  {
    id: 'reach',
    step: '02',
    label: 'Reach Out',
    title: 'We reach them across every channel',
    description: 'Personalized multi-channel outreach — email, SMS, and AI-powered voice calls. Each message crafted by AI for maximum response rate.',
    metric: '94%',
    metricLabel: 'Deliverability rate',
  },
  {
    id: 'book',
    step: '03',
    label: 'Book Meetings',
    title: 'Qualified meetings, on your calendar',
    description: 'Interested, qualified prospects are automatically booked onto your calendar. Pre-meeting briefings prepared. You just close.',
    metric: '340+',
    metricLabel: 'Meetings booked monthly',
  },
];

function FindVisual() {
  const sources = [
    { icon: Database, label: 'Databases' },
    { icon: Building2, label: 'Directories' },
    { icon: User, label: 'LinkedIn' },
  ];
  const leads = [
    { name: 'Arjun M.', company: 'TechScale Inc.', role: 'Head of Sales' },
    { name: 'Priya S.', company: 'GrowthFirst', role: 'Director, BD' },
    { name: 'Vikram T.', company: 'NextEdge Group', role: 'CEO' },
    { name: 'Anita K.', company: 'CloudVista', role: 'Operations Lead' },
  ];
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visualRef.current) return;
    const els = visualRef.current.querySelectorAll('.vis-item');
    gsap.fromTo(els, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={visualRef} className="flex flex-col items-center" style={{ gap: '32px', padding: '40px 24px' }}>
      <div className="flex items-center" style={{ gap: '20px' }}>
        {sources.map((s, i) => (
          <div key={i} className="vis-item flex flex-col items-center" style={{ gap: '10px', opacity: 0 }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'var(--color-accent-subtle)',
              border: '1px solid var(--color-accent-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <s.icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', letterSpacing: '0.02em' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="vis-item" style={{ width: '1px', height: '32px', background: 'var(--color-border-strong)', opacity: 0 }} />

      <div className="grid grid-cols-2" style={{ gap: '8px', maxWidth: '340px', width: '100%' }}>
        {leads.map((lead, i) => (
          <div
            key={i}
            className="vis-item"
            style={{
              background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
              borderRadius: '12px', padding: '14px', opacity: 0,
              transition: 'border-color 0.4s ease',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{lead.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{lead.company}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-accent)', marginTop: '2px' }}>{lead.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReachVisual() {
  const channels = [
    { icon: Mail, label: 'Email sent', detail: 'Personalized intro to Arjun...', time: '9:00 AM' },
    { icon: MessageSquare, label: 'SMS follow-up', detail: 'Quick follow-up message...', time: '2:30 PM' },
    { icon: Send, label: 'LinkedIn message', detail: 'Connection request sent...', time: '4:15 PM' },
  ];
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visualRef.current) return;
    const els = visualRef.current.querySelectorAll('.ch-item');
    gsap.fromTo(els, { opacity: 0, x: 20 }, {
      opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={visualRef} className="flex flex-col items-center" style={{ gap: '10px', padding: '40px 24px' }}>
      {channels.map((ch, i) => (
        <div
          key={i}
          className="ch-item"
          style={{
            width: '100%', maxWidth: '380px',
            background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
            borderRadius: '14px', padding: '16px',
            display: 'flex', alignItems: 'flex-start', gap: '14px',
            opacity: 0, transition: 'border-color 0.4s ease',
          }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <ch.icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{ch.label}</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{ch.time}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>{ch.detail}</div>
          </div>
          <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
        </div>
      ))}
    </div>
  );
}

function BookVisual() {
  const meetings = [
    { name: 'Arjun M. · TechScale', time: '10:00 AM', status: 'Confirmed' },
    { name: 'Priya S. · GrowthFirst', time: '2:00 PM', status: 'Confirmed' },
    { name: 'Vikram T. · NextEdge', time: '4:30 PM', status: 'Pending' },
  ];
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visualRef.current) return;
    const els = visualRef.current.querySelectorAll('.meet-item');
    gsap.fromTo(els, { opacity: 0, x: -12 }, {
      opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.15,
    });
  }, []);

  return (
    <div ref={visualRef} className="flex flex-col items-center" style={{ padding: '40px 24px' }}>
      <div style={{
        width: '100%', maxWidth: '380px',
        background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
        borderRadius: '16px', overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 18px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Upcoming Meetings</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Today</span>
        </div>
        {meetings.map((m, i) => (
          <div
            key={i}
            className="meet-item"
            style={{
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: i < meetings.length - 1 ? '1px solid var(--color-border)' : 'none',
              opacity: 0,
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{m.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <Clock className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{m.time}</span>
              </div>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px',
              background: m.status === 'Confirmed' ? 'var(--color-success-subtle)' : 'rgba(255,255,255,0.03)',
              color: m.status === 'Confirmed' ? 'var(--color-success)' : 'var(--color-text-tertiary)',
              border: `1px solid ${m.status === 'Confirmed' ? 'rgba(48,209,88,0.15)' : 'var(--color-border)'}`,
            }}>
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals: Record<string, React.FC> = {
  find: FindVisual,
  reach: ReachVisual,
  book: BookVisual,
};

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState('find');
  const activeData = tabs.find((t) => t.id === activeTab)!;
  const Visual = visuals[activeTab];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.ps-reveal');
      gsap.fromTo(els, { opacity: 0, y: 40, filter: 'blur(8px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }

    if (tabRef.current) {
      gsap.fromTo(tabRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 82%' },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Tab change animation
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, { opacity: 0, x: -20, filter: 'blur(6px)' }, {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out',
      });
    }
    if (visualContainerRef.current) {
      gsap.fromTo(visualContainerRef.current, { opacity: 0, scale: 0.97, filter: 'blur(4px)' }, {
        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out',
      });
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="section-padding" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="text-center" style={{ marginBottom: '80px' }}>
          <p className="text-overline ps-reveal" style={{ marginBottom: '24px', opacity: 0 }}>THE PRODUCT</p>
          <h2 className="text-h1 ps-reveal" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0 }}>
            See how OUTRICATE{' '}
            <span style={{ color: 'var(--color-text-tertiary)' }}>builds your pipeline.</span>
          </h2>
        </div>

        {/* Tab bar */}
        <div ref={tabRef} style={{ opacity: 0 }}>
          <div
            className="flex items-center justify-center flex-wrap"
            style={{ gap: '4px', marginBottom: '72px' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer"
                style={{
                  padding: '12px 28px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? 'var(--color-accent-border)' : 'var(--color-border)',
                  background: activeTab === tab.id ? 'var(--color-accent-subtle)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  letterSpacing: '-0.01em',
                }}
              >
                <span style={{ marginRight: '8px', opacity: 0.4, fontSize: '12px' }}>{tab.step}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content — Two column */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap: '64px', minHeight: '480px', opacity: 0 }}
        >
          {/* Left: Text */}
          <div ref={textRef}>
            <h3 className="text-h2" style={{ marginBottom: '24px' }}>
              {activeData.title}
            </h3>
            <p className="text-body-lg" style={{ marginBottom: '56px', maxWidth: '480px' }}>
              {activeData.description}
            </p>
            <div>
              <div className="metric-value" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                {activeData.metric}
              </div>
              <div className="metric-label">{activeData.metricLabel}</div>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            ref={visualContainerRef}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              minHeight: '420px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Visual />
          </div>
        </div>
      </div>
    </section>
  );
}
