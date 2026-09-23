import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { className: 'gallery-logo', type: 'logo' as const },
  { className: 'gallery-left-photo', src: publicAsset('images/structure.png'), alt: 'Área de musculação da Long Life' },
  { className: 'gallery-center-photo', src: publicAsset('images/gym.png'), alt: 'Espaço interno da Long Life' },
  { className: 'gallery-right-photo', src: publicAsset('images/treadmills.png'), alt: 'Esteiras da Long Life' },
  { className: 'gallery-bottom-photo', src: publicAsset('images/outdoor.png'), alt: 'Treino ao ar livre da Long Life' },
];

export default function Gallery() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { autoAlpha: 0, y: 30, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.gallery-section', start: 'top 78%', once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-section" id="galeria" aria-label="Galeria Long Life">
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div className={`gallery-item gallery-frame ${item.className}`} key={item.className}>
            {item.type === 'logo' ? (
              <img className="gallery-logo-image" src={publicAsset('images/logoTitle.png')} alt="Long Life" />
            ) : (
              <img src={item.src} alt={item.alt} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
import { publicAsset } from '../utils/publicAsset';
