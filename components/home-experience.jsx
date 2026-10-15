"use client";

import { useEffect } from 'react';
import { initializeScrollScene } from '../lib/scroll-scene';

export default function HomeExperience() {
  useEffect(() => initializeScrollScene(), []);

  return (
    <>
<a className="skip-link" href="#about">Skip to introduction</a>
  <header className="navigation">
    <a className="nav-brand" href="#home" aria-label="EIB Group home"><span className="brand-dot" aria-hidden="true"></span><span>EIB GROUP</span></a>
    <button className="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="site-menu"><span></span><span></span></button>
    <nav id="site-menu" className="menu" aria-label="Main navigation" hidden>
      <a href="#home">The beginning <span>01</span></a>
      <a href="#world">Our world <span>02</span></a>
      <a href="#about">Our purpose <span>03</span></a>
      <a href="mailto:info@eibgroup.com">Get in touch <span>↗</span></a>
    </nav>
  </header>
  <main id="home">
    <div className="scroll-story">
      <div className="stage">
        <section className="intro" aria-label="EIB Group">
          <h1 className="hero-logo" aria-label="EIB Group"><span>EIB</span><span className="logo-group">GROUP</span></h1>
          <p className="intro-caption">A WORLD OF POSSIBILITY.</p>
        </section>
        <div className="seed" aria-hidden="true"></div>
        <section className="world" aria-label="Rooted in Africa. Built for the world.">
          <p className="world-copy world-left">Rooted in Africa.</p>
          <canvas id="earth" width="640" height="640" role="img" aria-label="An automatically rotating Earth illustrated with ASCII characters"></canvas>
          <p className="world-copy world-right">Built for the world.</p>
          <div className="globe-caption" aria-hidden="true"><span className="live-dot"></span> ONE WORLD. LIMITLESS POSSIBILITY.</div>
        </section>
        <div className="circle circle-white" aria-hidden="true"></div>
        <div className="circle circle-blue" aria-hidden="true"></div>
        <section className="purpose" aria-labelledby="purpose-title">
          <div className="purpose-content">
            <p className="eyebrow">THE FUTURE IS OUR SHARED PURPOSE</p>
            <h2 id="purpose-title"><span className="word">Engineering</span>{" "}<span className="word">tomorrow.</span><br /><span className="word">Empowering</span>{" "}<span className="word">Africa.</span></h2>
            <p className="purpose-statement">We bring bold ideas to life, building businesses that move Africa forward.</p>
            <a className="contact-link" href="mailto:info@eibgroup.com">Let’s build what’s next <span aria-hidden="true">↗</span></a>
          </div>
          <footer><span>EIB GROUP © <span id="year">2026</span></span><a href="mailto:info@eibgroup.com">INFO@EIBGROUP.COM <span aria-hidden="true">↗</span></a><a href="#home">BACK TO THE BEGINNING ↑</a></footer>
        </section>
        <div className="stage-meta" aria-hidden="true"><span className="meta-left">INSPIRING PROGRESS</span><span className="chapter">01 — THE BEGINNING</span><span className="meta-right">AFRICA → THE WORLD</span></div>
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
