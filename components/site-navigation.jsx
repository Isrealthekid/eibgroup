"use client";

import { useEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/brand-logo';

export default function SiteNavigation({ isHome = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isHome) return;
    const header = headerRef.current;
    if (!header) return;
    function updateTone() {
      const banner = document.querySelector('.footer-banner');
      const center = header.getBoundingClientRect().top + header.querySelector('.nav-top').clientHeight / 2;
      const bounds = banner?.getBoundingClientRect();
      const tone = bounds && bounds.top <= center && bounds.bottom > center ? 'dark' : 'light';
      if (header.dataset.tone !== tone) header.dataset.tone = tone;
    }
    updateTone();
    window.addEventListener('scroll', updateTone, { passive: true });
    window.addEventListener('resize', updateTone);
    return () => {
      window.removeEventListener('scroll', updateTone);
      window.removeEventListener('resize', updateTone);
    };
  }, [isHome]);

  const homeSection = hash => isHome ? hash : `/${hash}`;

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setIsOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className={`navigation${isOpen ? ' is-open' : ''}`} data-tone={isHome ? undefined : 'light'}>
      <div className="nav-top">
        <svg className="nav-symbol" viewBox="94 710 420 456" aria-hidden="true" focusable="false">
          <image href="/brand/eib-group.png" width="3125" height="1875" />
        </svg>
        <a className="nav-brand" href={isHome ? '#home' : '/'} aria-label="EIB Group home" onClick={() => setIsOpen(false)}>
          <BrandLogo className="nav-logo" />
        </a>
        <button ref={buttonRef} className="menu-toggle" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="site-menu" onClick={() => setIsOpen(open => !open)}>
          <span /><span />
        </button>
      </div>
      <nav id="site-menu" className="menu" aria-label="Main navigation" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="menu-links" onClick={() => setIsOpen(false)}>
          <a href={homeSection('#about')}>About</a>
          <a href={homeSection('#companies')}>Industries</a>
          <a href="/our-team" aria-current={isHome ? undefined : 'page'}>Our team</a>
          <a href="https://www.brightechefufoundation.org" target="_blank" rel="noopener noreferrer" aria-label="Our Foundation: Bright Echefu Foundation (opens in a new tab)">Our Foundation</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="menu-feature" href={homeSection('#about')} onClick={() => setIsOpen(false)}>
          <span className="menu-feature-label">ABOUT EIB GROUP</span>
          <span className="menu-feature-title">Driving change.<br />Across industries.</span>
          <span className="menu-feature-link">Discover EIB Group <span aria-hidden="true">↗</span></span>
        </a>
      </nav>
    </header>
  );
}
