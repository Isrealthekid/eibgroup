 "use client";

import { useEffect } from 'react';
import { initializeScrollScene } from '../lib/scroll-scene';
import { GlobePulse } from '@/components/ui/cobe-globe-pulse';
import BrandLogo from '@/components/brand-logo';
import SiteNavigation from '@/components/site-navigation';
import CompaniesSection from '@/components/companies-section';
import LeadershipSection from '@/components/leadership-section';
import SiteFooter from '@/components/site-footer';

const aboutCopy = 'EIB Group unites businesses across fashion, security, communications and infrastructure, driving change and shaping Africa’s future.';

export default function HomeExperience() {
  useEffect(() => initializeScrollScene(), []);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to introduction
      </a>
      <SiteNavigation />
      <main id="home">
        <div className="scroll-story">
          <div className="stage">
            <section className="intro" aria-label="EIB Group">
              <h1 className="hero-logo" aria-label="EIB Group">
                <BrandLogo className="hero-brand" />
              </h1>
              <p className="intro-caption">A WORLD OF POSSIBILITY.</p>
            </section>
            <section
              className="world"
              aria-label="Rooted in Africa. Built for the world."
            >
              <p className="world-copy world-left">Rooted in Africa.</p>
              <GlobePulse id="earth" />
              <p className="world-copy world-right">Built for the world.</p>
            </section>
            <svg
              className="morph-layer"
              width="100%"
              height="100%"
              aria-hidden="true"
              focusable="false"
            >
              <circle className="seed" cx="50%" cy="50%" r="0" />
              <circle className="circle-white" cx="50%" cy="50%" r="0" />
              <circle className="circle-blue" cx="50%" cy="50%" r="0" />
            </svg>
            <section
              id="about"
              className="purpose"
              aria-label="About EIB Group"
            >
              <div className="purpose-content">
                <h2 id="purpose-title">
                  {aboutCopy.split(" ").map((word, index) => (
                    <span key={index}>
                      <span className="word">{word}</span>{" "}
                    </span>
                  ))}
                </h2>
              </div>
            </section>
            <button
              className="scroll-prompt"
              aria-label="Scroll to explore our world"
            >
              <span>↓</span> SCROLL TO EXPLORE <span>↓</span>
            </button>
          </div>
        </div>
        <span id="world" className="anchor-world" aria-hidden="true"></span>
        <LeadershipSection />
        <CompaniesSection />
      </main>
      <SiteFooter />

      <noscript>
        <style>
          {
            ".scroll-story{height:100svh}.intro{display:none}.purpose{clip-path:none!important;pointer-events:auto}h2 .word{opacity:1!important}"
          }
        </style>
      </noscript>
    </>
  );
}
