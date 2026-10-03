# Design and release review — 3 October 2026

Three review passes were performed with a real Chrome browser, alongside production-build validation.

## Pass 1: desktop composition and first live deployment

Compared the cinematic navy/cyan direction against the supplied references. Added locally hosted generated covers, a factual highlights strip, selected resume projects, and the notebook sidebar. The first React version was pushed as `90b819c` and successfully deployed in [run 37135749223](https://github.com/Satyam2003-dev/satyam2003-dev.github.io/actions/runs/37135749223). The root site was observed displaying the portfolio rather than the README.

The live review caught an overlapping handwritten note and awkward wrapping in the small TryHackMe panel. Both were adjusted. Header search was added with a native dialog and a lightweight content index.

## Pass 2: compact layouts, light mode, and About

Checked the homepage at 390px and 320px, the collection at 768px, the reader at 390px, and About at 320px. Document width matched viewport width in those checks. Checked both themes; dark remains the fresh-visitor default and explicit choices persist. The mountain image now stays at full opacity in light mode, with readable text on the dark cinematic hero.

Collection cards now use three columns on desktop, two on tablet, and one on phones. At the observed desktop width, the article tile was approximately 379px wide, replacing the earlier half-page card. About received a compact profile panel, anchored section links, experience and education cards, and consistent project cards.

## Pass 3: reading, keyboard behavior, motion, and production output

Verified search filtering, empty results, result navigation, and Escape dismissal with focus returned to the trigger. Verified article contents links/disclosure, direct blog refresh with 14 sections and 4,661 displayed body words, and article body text in IBM Plex Sans at 17px on mobile.

The review caught a transformed page wrapper displacing the fixed reading indicator. The wrapper now animates opacity, and the indicator remains at the header boundary. Content-size tracking keeps progress correct when an article loads. Deep-link offsets were consolidated to prevent double spacing.

Reduced-motion emulation confirmed the hero and shield transforms are absent and the moving signal is hidden. Emulation settings were restored. Browser console checks on the tested production preview reported no application warnings or errors.

Article bodies are separate on-demand chunks. Shared React, router, and Motion bundles are cached separately; no bundle exceeds Vite’s 500kB warning threshold. Full article text is still prerendered into HTML for direct visits and reading without JavaScript.

`npm run build` and `npm run check` validate seven public routes and a custom 404, internal asset and route targets, anchors, unique IDs, metadata, canonical URLs, author handles, and the initial one-blog/one-article scope. Body counts are 4,661 and 4,622 words.

## CI runtime warnings

The Actions runtime updates and Ubuntu 24.04 runner pin were pushed as `dcdf5fe`. [Run 37135874349](https://github.com/Satyam2003-dev/satyam2003-dev.github.io/actions/runs/37135874349) passed build and deployment without the Node 20 runtime and ubuntu-latest migration annotations. SHA-pinned Actions use Node 24; the application build uses Node 22.

This is a functional and visual review, not a comprehensive accessibility certification or security audit.
