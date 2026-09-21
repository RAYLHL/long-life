import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      anchors: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-photo', {
        scale: 1.05,
        duration: 1.5,
        ease: 'power2.out',
      });
      gsap.from('.hero h1 span', {
        y: 45,
        opacity: 0,
        stagger: 0.13,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .forEach((el) =>
          gsap.from(el, {
            y: 25,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 93%', once: true },
          })
        );
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const val = { n: 0 };
        gsap.to(val, {
          n: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(val.n).toLocaleString('pt-BR');
          },
        });
      });
      gsap.utils
        .toArray<HTMLElement>('[data-parallax]')
        .forEach((el) =>
          gsap.fromTo(
            el,
            { yPercent: -2 },
            {
              yPercent: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          )
        );
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
