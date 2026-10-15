# EIB Group homepage concept

Run `npm run dev`, then visit http://localhost:4173. No dependencies or build step are required. `npm run check` checks JavaScript syntax.

The static website is in `dist/`. The text wordmark is in `dist/index.html`; replace `.hero-logo` with the eventual logo while retaining its animation wrapper. The tagline is draft copy and can be edited in the same file. Styling lives in `dist/styles.css`; ASCII globe rendering and scroll choreography are in `dist/app.js`.

Sequence: text wordmark enlarges and blurs → white seed expands into an automatically rotating ASCII Earth → Earth fills white → blue circle follows after 500 ms → a second white reveal opens the purpose section → tagline words move from 50% to 100% opacity.

The experience uses native page scrolling, reverses when scrolling upward, supports mobile viewports, and provides a static three-section experience for reduced-motion preferences. The menu supports keyboard navigation and Escape. No analytics or third-party runtime requests are included.

Design references: https://special.co and the user-supplied screenshots. Brand context: https://www.eibgroup.com/. This concept does not change the existing eibgroup.com website.
