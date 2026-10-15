# EIB Group — Next.js

The Next.js App Router project lives directly in this `eibgroup` folder.

Run `npm install`, then `npm run dev` and visit http://localhost:3000.

`npm run build` generates the production static export in `out/`. Run `npm start` to preview that build at http://localhost:4173. `npm run check` checks the animation module's JavaScript syntax. With the preview server running, `npm run test:browser` verifies the desktop and mobile scroll sequence, navigation, runtime errors, and reduced motion in headless Chrome on Windows.

The route is in `app/page.jsx`; page markup and tagline are in `components/home-experience.jsx`. `components/brand-logo.jsx` displays the supplied EIB Group artwork from `public/brand/eib-group.png` in the hero and navigation, with an SVG viewBox excluding the transparent padding. The transition accent is `#E31C79`, sampled from `assets/eib color1 background.png`. Global styles and Tailwind utilities are in `app/globals.css`. The COBE globe from the supplied prompt is in `components/ui/cobe-globe-pulse.tsx`, with configurable markers, speed, and class names. `components/globe-pulse-demo.tsx` is its standalone usage example. `components/ui` and `components.json` provide the shadcn component structure and import aliases; TypeScript is configured in `tsconfig.json`.

Scroll choreography lives in `lib/scroll-scene.js`. It scales the whole globe, including markers, through the circle morph and pauses rendering outside the globe section. The globe supports pointer dragging, preserves vertical touch scrolling, resizes its WebGL canvas, and respects reduced motion. Pulses use projected globe coordinates so CSS Anchor Positioning support is not required. Metadata and the root document are in `app/layout.jsx`.

Sequence: EIB Group logo shrinks and blurs into a tiny SVG circle → the circle grows and morphs into an automatically rotating dotted COBE Earth with pulsing cyan markers → Earth fills white → brand magenta circle follows after 500 ms → a second white reveal opens the purpose section → tagline words move from 50% to 100% opacity.

The experience uses native page scrolling, reverses when scrolling upward, supports mobile viewports, and provides a static three-section experience for reduced-motion preferences. The menu supports keyboard navigation and Escape. No analytics or third-party runtime requests are included.

Design references: https://special.co and the user-supplied screenshots. Brand context: https://www.eibgroup.com/. This concept does not change the existing eibgroup.com website.
