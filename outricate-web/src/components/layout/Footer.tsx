'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Links stagger reveal
    if (linksRef.current) {
      const cols = linksRef.current.querySelectorAll('.footer-col');
      gsap.fromTo(cols, {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
        },
      });
    }

    // Giant brand mark reveal
    if (brandRef.current) {
      gsap.fromTo(brandRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.92,
        filter: 'blur(12px)',
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: brandRef.current,
          start: 'top 92%',
        },
      });
    }

    // Bottom section
    if (bottomRef.current) {
      gsap.fromTo(bottomRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bottomRef.current,
          start: 'top 95%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full overflow-hidden"
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        fontFamily: "var(--font-display), var(--font-sans), system-ui, sans-serif",
      }}
    >
      {/* Top Links Section */}
      <div
        ref={linksRef}
        className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 px-6 md:px-12 lg:px-20 pt-16 pb-20 md:pb-28"
      >
        {/* Left Column - Tagline */}
        <div className="lg:w-5/12 flex flex-col justify-start footer-col">
          <h2
            className="text-[1.75rem] md:text-[2.25rem] font-medium tracking-tight leading-[1.15]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Your Revenue Infrastructure: Leads, Outreach &amp; Meetings — on autopilot.
          </h2>
        </div>

        {/* Right Columns - Links */}
        <div className="lg:w-7/12 flex flex-wrap justify-start lg:justify-end gap-12 md:gap-20 lg:gap-24">
          {/* Column 1: Product */}
          <div className="flex flex-col gap-3.5 footer-col">
            <span className="text-[15px] font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Product</span>
            {['Features', 'Pricing', 'Security', 'Enterprise', 'India'].map((label, i) => (
              <Link key={i} href={i === 0 ? '/product' : i === 1 ? '/pricing' : '#'} className="text-[15px] font-medium transition-colors duration-300" style={{ color: 'var(--color-text-tertiary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-tertiary)'}>{label}</Link>
            ))}
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-3.5 footer-col">
            <span className="text-[15px] font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Company</span>
            {[{ label: 'About', href: '/about' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '/contact' }].map((item, i) => (
              <Link key={i} href={item.href} className="text-[15px] font-medium transition-colors duration-300" style={{ color: 'var(--color-text-tertiary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-tertiary)'}>{item.label}</Link>
            ))}
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col gap-3.5 footer-col">
            <span className="text-[15px] font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Connect</span>
            {['Twitter', 'LinkedIn', 'GitHub'].map((label, i) => (
              <a key={i} href="#" className="text-[15px] font-medium transition-colors duration-300" style={{ color: 'var(--color-text-tertiary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-tertiary)'}>{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Giant Brand Mark — Cinematic name.png ═══ */}
      <div
        ref={brandRef}
        className="relative w-full"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
          opacity: 0,
        }}
      >
        {/* Ambient glow behind the brand */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />

        {/* The name.png — full width, edge-to-edge for maximum impact */}
        <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
          <Image
            src="/name.png"
            alt="OUTRICATE"
            width={1600}
            height={300}
            className="w-full h-auto select-none"
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 40px rgba(201, 168, 76, 0.12))',
            }}
            priority
            draggable={false}
            unoptimized
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        ref={bottomRef}
        className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6 md:px-12 lg:px-20 py-6"
        style={{
          opacity: 0,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {/* Logo + Copyright */}
        <div className="flex items-center gap-3 select-none">
          <Image
            src="/logo.png"
            alt="OUTRICATE"
            width={24}
            height={24}
            unoptimized
          />
          <span className="text-[12px] font-semibold tracking-widest uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
            © {new Date().getFullYear()} OUTRICATE
          </span>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label, i) => (
            <a key={i} href="#" className="transition-colors duration-300" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-tertiary)'}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
