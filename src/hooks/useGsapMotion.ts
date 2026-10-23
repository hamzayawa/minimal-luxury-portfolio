import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTimeline
        .fromTo('.hero-copy .eyebrow', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 })
        .fromTo('.hero h1', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 }, '-=0.38')
        .fromTo('.hero-description', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.48')
        .fromTo('.hero-actions > *', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.1 }, '-=0.3')
        .fromTo('.hero-art', { autoAlpha: 0, scale: 0.975 }, { autoAlpha: 1, scale: 1, duration: 1.05 }, '-=0.75');

      gsap.utils.toArray<HTMLElement>('.section-label, .intro-content, .project-card, .interest-grid article, .footer-top').forEach((element) => {
        gsap.fromTo(element, { y: 22, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });

    return () => context.revert();
  }, []);
}
