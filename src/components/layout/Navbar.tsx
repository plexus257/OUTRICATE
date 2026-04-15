'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/product', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-studies', label: 'Case Studies' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );
    }

    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, []);

  // Scroll-aware
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled ? 'rgba(5,5,6,0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.6)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          opacity: 0,
        }}
      >
        <div className="section-container" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo — logo.png + name.png as wordmark */}
          <Link ref={logoRef} href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', opacity: 0 }}>
            <Image
              src="/logo.png"
              alt="OUTRICATE Logo"
              width={36}
              height={36}
              style={{
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
              }}
              priority
              unoptimized
            />
            <Image
              src="/name.png"
              alt="OUTRICATE"
              width={120}
              height={24}
              style={{
                objectFit: 'contain',
                height: '20px',
                width: 'auto',
                transition: 'opacity 0.5s ease',
                opacity: isScrolled ? 0.85 : 1,
              }}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div ref={linksRef} className="hidden lg:flex items-center" style={{ gap: '2px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'color 0.3s ease',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
              >
                {link.label}
              </Link>
            ))}

            {/* Company dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button
                className="cursor-pointer"
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  borderRadius: '8px',
                  transition: 'color 0.3s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                Company
                <ChevronDown
                  className="w-3 h-3"
                  style={{
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isCompanyOpen ? 'rotate(180deg)' : 'rotate(0)',
                    opacity: 0.5,
                  }}
                />
              </button>

              {isCompanyOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    width: '180px',
                    background: 'rgba(18,18,20,0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '14px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    padding: '6px',
                    overflow: 'hidden',
                    animation: 'fadeInDown 0.2s ease forwards',
                  }}
                >
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        display: 'block',
                        padding: '10px 14px',
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA */}
          <div ref={ctaRef} className="hidden lg:flex items-center" style={{ gap: '12px', opacity: 0 }}>
            <Link href="/demo" style={{
              fontSize: '13px', fontWeight: 500,
              color: 'var(--color-text-tertiary)', textDecoration: 'none',
              padding: '8px 12px', transition: 'color 0.3s ease',
              letterSpacing: '-0.01em',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
            >
              Book a Demo
            </Link>
            <Link href="/waitlist" className="btn-primary" style={{ height: '40px', padding: '0 24px', fontSize: '13px', borderRadius: '10px' }}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden cursor-pointer"
            aria-label="Toggle menu"
            style={{ padding: '8px', color: 'var(--color-text-primary)', background: 'none', border: 'none' }}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          className="lg:hidden"
        >
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setIsMobileOpen(false)}
          />
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0,
              background: 'var(--color-bg-secondary)',
              borderBottom: '1px solid var(--color-border)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ paddingTop: '88px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px' }}>
              {[...navLinks, ...companyLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px 0',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <div style={{ marginTop: '24px' }}>
                <Link
                  href="/waitlist"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
