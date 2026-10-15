# EIB Group — Next.js

The Next.js App Router project lives directly in this `eibgroup` folder.

Run `npm install`, then `npm run dev` and visit http://localhost:3000.

`npm run build` generates the production static export in `out/`. Run `npm start` to preview that build at http://localhost:4173. `npm run check` checks the animation module's JavaScript syntax. With the preview server running, `npm run test:browser` verifies the desktop and mobile scroll sequence, navigation, runtime errors, and reduced motion in headless Chrome on Windows.

The route is in `app/page.jsx`; page markup, the placeholder wordmark, and tagline are in `components/home-experience.jsx`. Global styles are in `app/globals.css`. The ASCII Earth renderer and scroll choreography live in `lib/scroll-scene.js`, initialized through a React effect with event-listener and animation-frame cleanup. Metadata and the root document are in `app/layout.jsx`.

Sequence: text wordmark shrinks and blurs into a tiny SVG circle → the circle grows and morphs into an automatically rotating ASCII Earth → Earth fills white → blue circle follows after 500 ms → a second white reveal opens the purpose section → tagline words move from 50% to 100% opacity.

The experience uses native page scrolling, reverses when scrolling upward, supports mobile viewports, and provides a static three-section experience for reduced-motion preferences. The menu supports keyboard navigation and Escape. No analytics or third-party runtime requests are included.

Design references: https://special.co and the user-supplied screenshots. Brand context: https://www.eibgroup.com/. This concept does not change the existing eibgroup.com website.
