import { useEffect, useState } from 'react';
import { CTA } from './Shared';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Academia+Long+Life/@-26.8660433,-48.6409269,17z/data=!3m1!4b1!4m6!3m5!1s0x94d8cd083615e04f:0x77298ca11180b396!8m2!3d-26.8660433!4d-48.6409269!16s%2Fg%2F11yzw_bwgc';
const reviews = [
  { name: 'Jhonatan Esperandio', text: 'Minha experiência foi maravilhosa, o instrutor da manhã super atencioso esclareceu todas as minhas dúvidas e me auxiliou naquilo que eu precisava 💕', googleUrl: GOOGLE_MAPS_URL },
  { name: 'Pamela Biazoto', text: 'Lugar excelente, meu filho ama fazer natação. Super indico, é tudo limpinho e organizado.', googleUrl: GOOGLE_MAPS_URL },
  { name: 'Junior Nelson Pedro Bom', text: 'Ótima academia! Profissionais super qualificados, ambiente agradável e excelente piscina.', googleUrl: GOOGLE_MAPS_URL },
];

function Chevron({ direction }: { direction: 'left' | 'right' }) { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} /></svg>; }

export default function Stories() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const review = reviews[index];
  const go = (step: number) => { setDirection(step); setIndex((current) => (current + step + reviews.length) % reviews.length); };
  useEffect(() => { setExpanded(false); }, [index]);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);
  return <section className="reviews-section" id="historias">
    <span className="reviews-background-mark" aria-hidden="true">“</span>
    <div className="reviews-layout section-content">
      <div className="reviews-intro" data-reveal>
        <div className="reviews-eyebrow"><span>AVALIAÇÕES</span><i /></div>
        <h2>O QUE NOSSOS<br /><em>ALUNOS</em> DIZEM</h2>
        <p>Resultados reais, de pessoas reais.<br />Aqui você encontra histórias de quem<br />já faz parte da Long Life.</p>
        <span className="reviews-cta-wrap">
          <span className="reviews-cta-back" aria-hidden="true" />
          <CTA href="#contato">SEJA NOSSO ALUNO</CTA>
        </span>
      </div>
      <div className="reviews-stage" data-reveal>
        <button className="reviews-arrow reviews-arrow-left" type="button" onClick={() => go(-1)} aria-label="Avaliação anterior"><Chevron direction="left" /></button>
        <div className={`review-card review-slide-${direction > 0 ? 'next' : 'previous'}`} key={index}>
          <div className="review-top"><div className="review-stars" aria-label="5 estrelas">★★★★★</div><span className="review-quote" aria-hidden="true">“</span></div>
          <p className={`review-text ${expanded ? 'is-expanded' : ''}`}>“{review.text}”</p>
          {review.text.length > 120 && <button className="review-more" type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? 'VER MENOS' : 'VER MAIS'}</button>}
          <div className="review-divider" />
          <div className="review-footer"><div className="review-author"><img src={publicAsset('images/user-jojo.png')} alt="" /><span><strong>{review.name}</strong><small>ALUNO LONG LIFE</small></span></div><a href={review.googleUrl} target="_blank" rel="noopener noreferrer">VER NO GOOGLE <span aria-hidden="true">↗</span></a></div>
        </div>
        <button className="reviews-arrow reviews-arrow-right" type="button" onClick={() => go(1)} aria-label="Próxima avaliação"><Chevron direction="right" /></button>
        <div className="review-dots" aria-label="Selecionar avaliação">{reviews.map((item, itemIndex) => <button key={item.name} className={itemIndex === index ? 'is-active' : ''} type="button" onClick={() => { setDirection(itemIndex >= index ? 1 : -1); setIndex(itemIndex); }} aria-label={`Ver avaliação de ${item.name}`} />)}</div>
      </div>
    </div>
  </section>;
}
import { publicAsset } from '../utils/publicAsset';
