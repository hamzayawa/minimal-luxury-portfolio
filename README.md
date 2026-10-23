# Minimal Luxury Portfolio — Phase 1

A dark, editorial portfolio foundation for Hamza Abdullahi, using React, TypeScript, Vite, and a restrained electric-emerald design system. The 3D mathematical scene is intentionally not implemented yet; the current hero art is a CSS placeholder for Phase 2.

## Requirements

- Node.js 20.19+ or 22.12+
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

## GitHub repository plan

The public profile repository `hamzayawa/hamzayawa` already exists. Keep this project in a separate repository named `minimal-luxury-portfolio`, then copy `profile/README.md` into the existing profile repository when ready. The existing `hamzayawa.github.io` website should remain untouched until the replacement is tested and ready.

The Vite base path is configured for `https://hamzayawa.github.io/minimal-luxury-portfolio/` in GitHub Actions builds. Local development uses `/`.

## Current phase

- [x] Design tokens and global styles
- [x] Responsive site structure
- [x] Initial project content model
- [x] Profile README draft
- [ ] Three.js mathematical universe (Phase 2)
- [ ] GSAP choreography (Phase 3)
- [ ] GitHub Pages deployment workflow (deployment phase)
