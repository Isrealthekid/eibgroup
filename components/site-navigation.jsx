"use client";

import { useEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/brand-logo';

export default function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);

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
    <header ref={headerRef} className={`navigation${isOpen ? ' is-open' : ''}`}>
      <div className="nav-top">
        <svg className="nav-symbol" viewBox="94 710 420 456" aria-hidden="true" focusable="false">
          <image href="/brand/eib-group.png" width="3125" height="1875" />
        </svg>
        <a className="nav-brand" href="#home" aria-label="EIB Group home" onClick={() => setIsOpen(false)}>
          <BrandLogo className="nav-logo" />
        </a>
        <button ref={buttonRef} className="menu-toggle" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="site-menu" onClick={() => setIsOpen(open => !open)}>
          <span /><span />
        </button>
      </div>
      <nav id="site-menu" className="menu" aria-label="Main navigation" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="menu-links" onClick={() => setIsOpen(false)}>
          <a href="#about">About</a>
          <a href="#world">Industries</a>
          <a href="https://x.com/BEFoundation_" target="_blank" rel="noopener noreferrer" aria-label="Our Foundation: Bright Echefu Foundation (opens in a new tab)">Our Foundation</a>
          <a href="mailto:info@eibgroup.com">Contact</a>
        </div>
        <a className="menu-feature" href="#about" onClick={() => setIsOpen(false)}>
          <span className="menu-feature-label">ABOUT EIB GROUP</span>
          <span className="menu-feature-title">Driving change.<br />Across industries.</span>
          <span className="menu-feature-link">Discover EIB Group <span aria-hidden="true">↗</span></span>
        </a>
      </nav>
    </header>
  );
}
