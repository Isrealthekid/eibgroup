 "use client";

import { useEffect } from 'react';
import { initializeScrollScene } from '../lib/scroll-scene';
import { GlobePulse } from '@/components/ui/cobe-globe-pulse';
import BrandLogo from '@/components/brand-logo';
import SiteNavigation from '@/components/site-navigation';

export default function HomeExperience() {
  useEffect(() => initializeScrollScene(), []);

  return (
    <>
<a className="skip-link" href="#about">Skip to introduction</a>
  <SiteNavigation />
  <main id="home">
    <div className="scroll-story">
      <div className="stage">
        <section className="intro" aria-label="EIB Group">
          <h1 className="hero-logo" aria-label="EIB Group"><BrandLogo className="hero-brand" /></h1>
          <p className="intro-caption">A WORLD OF POSSIBILITY.</p>
        </section>
        <section className="world" aria-label="Rooted in Africa. Built for the world.">
          <p className="world-copy world-left">Rooted in Africa.</p>
          <GlobePulse id="earth" />
          <p className="world-copy world-right">Built for the world.</p>
        </section>
        <svg className="morph-layer" width="100%" height="100%" aria-hidden="true" focusable="false">
          <circle className="seed" cx="50%" cy="50%" r="0" />
          <circle className="circle-white" cx="50%" cy="50%" r="0" />
          <circle className="circle-blue" cx="50%" cy="50%" r="0" />
        </svg>
        <section className="purpose" aria-labelledby="purpose-title">
          <div className="purpose-content">
            <p className="eyebrow">THE FUTURE IS OUR SHARED PURPOSE</p>
            <h2 id="purpose-title"><span className="word">Engineering</span>{" "}<span className="word">tomorrow.</span><br /><span className="word">Empowering</span>{" "}<span className="word">Africa.</span></h2>
            <p className="purpose-statement">We bring bold ideas to life, building businesses that move Africa forward.</p>
            <a className="contact-link" href="mailto:info@eibgroup.com">Let’s build what’s next <span aria-hidden="true">↗</span></a>
          </div>
          <footer><span>EIB GROUP © <span id="year">2026</span></span><a href="mailto:info@eibgroup.com">INFO@EIBGROUP.COM <span aria-hidden="true">↗</span></a><a href="#home">BACK TO THE BEGINNING ↑</a></footer>
        </section>
        <button className="scroll-prompt" aria-label="Scroll to explore our world"><span>↓</span> SCROLL TO EXPLORE <span>↓</span></button>
        <div className="progress-track" aria-hidden="true"><div></div></div>
      </div>
    </div>
    <span id="world" className="anchor-world" aria-hidden="true"></span>
    <span id="about" className="anchor-about" aria-hidden="true"></span>
  </main>
  
    <noscript><style>{'.scroll-story{height:100svh}.intro{display:none}.purpose{clip-path:none!important;pointer-events:auto}.purpose-statement,.contact-link,h2 .word{opacity:1!important}'}</style></noscript>
    </>
  );
}
