# Design system — Minimal Luxury

## Direction

Minimal Luxury with an electric-emerald accent and a procedural mathematical object planned for Phase 2. The design avoids noisy gradients, excessive neon, and unverified activity metrics.

## Color tokens

| Token | Value | Use |
|---|---|---|
| Void | `#080A09` | Main background |
| Graphite | `#111613` | Secondary surface |
| Electric emerald | `#00E59B` | Key actions, focus, accents |
| Soft ivory | `#E7ECE8` | Main text |
| Muted | `#8E9891` | Supporting text |

## Type

- Display/body: Manrope
- Technical labels: DM Mono

## Layout

- Maximum content width: 1200px
- Fluid side gutters using CSS clamp
- Thin low-contrast borders
- Generous vertical rhythm

## Motion principles

- Prefer purposeful transitions to perpetual movement.
- Honor `prefers-reduced-motion`.
- The future WebGL scene must have a static fallback and be loaded independently.


## Mathematical scene

The hero uses a gyroid-inspired implicit surface generated from `sin(x)cos(y) + sin(y)cos(z) + sin(z)cos(x) = 0`. A marching-tetrahedra polygonizer builds the isosurface at runtime. Three.js handles lighting, surface shading, and pointer-responsive rotation. The scene caps renderer pixel ratio at 1.5 and disposes geometry, materials, and renderer resources during cleanup.

If WebGL initialization fails, the component displays a CSS geometric fallback. The scene honors `prefers-reduced-motion` by disabling continuous rotation. GSAP entrance and scroll animations are also skipped when reduced motion is requested.

## Deployment

GitHub Actions builds the Vite project and deploys the `dist` folder using the GitHub Pages artifact and deployment actions. The repository is configured as a project site at `/minimal-luxury-portfolio/` in CI builds. If the repository name changes, update `vite.config.ts` and the public portfolio link in `profile/README.md`.
