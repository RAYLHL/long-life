import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo } from './Shared';

const links = [
  ['SOBRE', '#sobre'],
  ['PLANOS', '#planos'],
  ['UNIDADES', '#unidades'],
  ['CONTATO', '#contato'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onPreferenceChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onPreferenceChange);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      media.removeEventListener('change', onPreferenceChange);
    };
  }, []);

  useEffect(() => {
    if (!headerRef.current || !brandRef.current || !navRef.current) return;
    const targets = [headerRef.current, brandRef.current, navRef.current];
    if (!scrolled) {
      if (reducedMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return;
      }
      const fadeBack = gsap.timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => {
          gsap.set(targets, { clearProps: 'all' });
        },
      });
      fadeBack.to(headerRef.current, { opacity: 0, duration: 0.22, ease: 'power2.out' });
      fadeBack.set(headerRef.current, { opacity: 1 });
      return () => {
        fadeBack.kill();
      };
    }
    const values = scrolled
      ? { header: { top: 0, left: 0, right: 0, padding: '7px 18px', backgroundColor: '#090909ee', borderRadius: 0, boxShadow: '0 8px 28px #0005' }, brand: { width: 95 }, nav: { gap: 24, padding: '10px 18px', backgroundColor: 'transparent' } }
      : { header: { top: 14, left: 18, right: 18, padding: '0px', backgroundColor: 'transparent', borderRadius: 0, boxShadow: 'none' }, brand: { width: 110 }, nav: { gap: 32, padding: '20px 30px', backgroundColor: '#00000091' } };
    if (reducedMotion) {
      gsap.set(targets, { clearProps: 'all' });
      gsap.set(headerRef.current, values.header);
      gsap.set(brandRef.current, values.brand);
      gsap.set(navRef.current, values.nav);
      return;
    }
    const tween = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power3.inOut', overwrite: 'auto' },
    });
    tween.to(headerRef.current, values.header, 0).to(brandRef.current, values.brand, 0).to(navRef.current, values.nav, 0);
    return () => {
      tween.kill();
    };
  }, [scrolled, reducedMotion]);

  return (
    <header ref={headerRef} className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <a ref={brandRef} className="brand" href="#inicio" aria-label="LONG LIFE">
        <Logo />
      </a>
      <nav ref={navRef} className="nav-right" aria-label="Navegação principal">
        {links.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
