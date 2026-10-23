# Minimal Luxury Portfolio

An editorial, dark portfolio for Hamza Abdullahi built with React, TypeScript, Vite, Three.js, and GSAP. The visual system pairs a graphite canvas with electric emerald accents and a procedurally generated gyroid-inspired mathematical surface.

## Requirements

- Node.js 22 (or Node.js 20.19+)
- npm
- Git

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
npm run preview
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes `dist` to GitHub Pages when changes are pushed to `main`. In the repository settings, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.

The Vite base path is `/minimal-luxury-portfolio/` in GitHub Actions builds and `/` locally. If you rename the repository, update `vite.config.ts` and the portfolio link in `profile/README.md`.

## Project structure

- `src/scenes/MathematicalUniverse.tsx` — procedurally generated gyroid-inspired isosurface and WebGL fallback.
- `src/hooks/useGsapMotion.ts` — entrance and scroll-triggered motion, disabled for reduced-motion preferences.
- `src/data/projects.ts` — editable featured project data.
- `src/styles/tokens.css` and `src/styles/global.css` — design tokens and responsive styling.
- `profile/README.md` — draft for the `hamzayawa/hamzayawa` profile repository.

## Rollout safety

The existing `hamzayawa.github.io` site is not changed by this project. Deploy the new repository as a project site first; only replace the existing portfolio after reviewing the new site in production.
