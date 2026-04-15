'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, ArrowRight, Zap, Target, ChevronRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Custom tooltip for the Recharts graph
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: 600 }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsEngine() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [insight, setInsight] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [analyticsRes, insightsRes] = await Promise.all([
          fetch(`/api/analytics?range=${timeRange}`),
          fetch('/api/insights')
        ]);
        const analyticsData = await analyticsRes.json();
        const insightsData = await insightsRes.json();
        
        setAnalytics(analyticsData);
        setInsight(insightsData);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current || !leftRef.current || !dashboardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    const leftEls = leftRef.current.children;
    tl.fromTo(leftEls, 
      { opacity: 0, y: 30, filter: 'blur(5px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0)', duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    tl.fromTo(dashboardRef.current,
      { opacity: 0, x: 40, filter: 'blur(10px)' },
      { opacity: 1, x: 0, filter: 'blur(0)', duration: 1, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 gap-16 items-center">
          
          {/* LEFT SIDE: Copy & Features */}
          <div ref={leftRef}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--color-accent-subtle)', borderRadius: '100px', border: '1px solid var(--color-accent-border)', marginBottom: '24px' }}>
              <Brain className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your AI Business Brain</span>
            </div>
            
            <h2 className="text-h1" style={{ marginBottom: '24px' }}>
              Not just leads. <span style={{ color: 'var(--color-text-tertiary)' }}>Intelligence.</span>
            </h2>
            
            <p className="text-body-lg" style={{ marginBottom: '40px', maxWidth: '440px' }}>
              Understand what’s working, what’s not, and what to do next — automatically. Your virtual CEO pinpoints revenue bottlenecks and prescribes growth actions in real-time.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 56px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Revenue insights in real-time',
                'Customer behavior analysis',
                'Pipeline performance breakdown',
                'Actionable AI recommendations'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/waitlist" className="btn-primary">
                Join Waitlist
              </Link>
              <Link href="/demo" className="btn-secondary">
                Book Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Dashboard */}
          <div ref={dashboardRef} style={{ position: 'relative' }}>
            
            {/* Main Glowing Background */}
            <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle at center, var(--color-accent-glow), transparent 70%)', opacity: 0.5, zIndex: 0, pointerEvents: 'none' }} />

            <div style={{
              position: 'relative',
              zIndex: 1,
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: 'var(--shadow-xl)'
            }}>
              
              {/* Dashboard Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginBottom: '8px' }}>Projected Pipeline Revenue</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <h3 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                      ${analytics?.metrics?.totalRevenue ? analytics.metrics.totalRevenue.toLocaleString() : '---,---'}
                    </h3>
                    {analytics?.metrics?.growthPercentage && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontSize: '13px', fontWeight: 600, background: 'var(--color-success-subtle)', padding: '4px 10px', borderRadius: '100px' }}>
                        <TrendingUp className="w-3 h-3" />
                        +{analytics.metrics.growthPercentage}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Time range toggles */}
                <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', borderRadius: '8px', padding: '4px', border: '1px solid var(--color-border)' }}>
                  {['7d', '30d', '90d'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: timeRange === range ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        background: timeRange === range ? 'rgba(255,255,255,0.08)' : 'transparent',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        border: 'none',
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recharts Revenue Graph */}
              <div style={{ height: '220px', width: '100%', marginBottom: '32px', filter: isLoading ? 'blur(4px)' : 'none', transition: 'filter 0.4s ease' }}>
                {analytics && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.revenue} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="displayDate" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
                        minTickGap={30}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="var(--color-accent)" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Conversion Metrics Footer */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '24px', marginBottom: '24px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>Active Leads</p>
                  <p style={{ fontSize: '20px', fontWeight: 600 }}>{analytics?.metrics?.activeLeads.toLocaleString() || '---'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>Avg. Conv. Rate</p>
                  <p style={{ fontSize: '20px', fontWeight: 600 }}>{analytics?.metrics?.conversionRate.toFixed(2) || '-.--'}%</p>
                </div>
              </div>

              {/* AI Insight Panel (Floating over/under) */}
              <div style={{
                background: 'linear-gradient(to right, rgba(20,20,24,0.9), rgba(12,12,14,0.95))',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: insight?.type === 'success' ? 'var(--color-success)' : insight?.type === 'warning' ? 'var(--color-warning)' : 'var(--color-accent)' }} />
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {insight?.type === 'warning' ? <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-warning)' }} /> : <Zap className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />}
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>System Insight</span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                      {insight?.title || 'Analyzing recent campaigns...'}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {insight?.description || 'Gathering multi-channel data to surface actionable insights.'}
                    </p>
                    
                    {insight?.actionText && (
                      <button style={{
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                      >
                        Action: {insight.actionText} <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
