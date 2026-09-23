import { useEffect, useState } from 'react';
import Header from './Header';
import { publicAsset } from '../utils/publicAsset';

const heroSlides = [
  // { src: '/images/hero.png', alt: 'Profissionais LONG LIFE acompanhando um treino na academia' },
  { src: publicAsset('images/treadmills.png'), alt: 'Área de esteiras da academia LONG LIFE' },
  { src: publicAsset('images/functional.png'), alt: 'Espaço de treinamento funcional LONG LIFE' },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="inicio">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.src}
          className="hero-photo"
          src={slide.src}
          alt={slide.alt}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          aria-hidden={index !== activeSlide}
          style={{ opacity: index === activeSlide ? 1 : 0 }}
        />
      ))}
      <div className="hero-shade" />
      <div className="hero-content section-content">
        <Header />
        <div className="hero-copy">
          <h1>
            <span className="hero-academia">ACADEMIA</span>
            <img className="hero-logo-title" src={publicAsset('images/logoTitle.png')} alt="Academia Long Life" />
          </h1>
          <p className="hero-tagline">TREINE FORTE PARA<br />VIVER LONGE!</p>
          <div className="hero-cta-wrap">
            <div className="hero-cta-backdrop" aria-hidden="true" />
            <a className="hero-cta" href="#planos">SEJA NOSSO ALUNO</a>
          </div>
        </div>
      </div>
      <div className="hero-indicators" aria-label="Slides do Hero">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === activeSlide ? 'active' : ''}
            aria-label={`Mostrar slide ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
