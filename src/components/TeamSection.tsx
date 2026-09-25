import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowButton, Chevrons } from './Shared';
import { publicAsset } from '../utils/publicAsset';

const professionals = [
  { name: 'Eridson', role: 'PERSONAL TRAINER', image: publicAsset('images/foto4.png') },
  { name: 'Vinicius', role: 'PERSONAL TRAINER', image: publicAsset('images/foto4.png') },
  { name: 'Patricia', role: 'PERSONAL TRAINER', image: publicAsset('images/foto1.png') },
  { name: 'Giulia', role: 'PERSONAL TRAINER', image: publicAsset('images/foto2.png') },
  { name: 'Pierre', role: 'PERSONAL TRAINER', image: publicAsset('images/foto3.png') },
];
const circularIndex = (index: number) => (index + professionals.length) % professionals.length;

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingDirection, setPendingDirection] = useState<1 | -1>(1);
  const cardRefs = useRef<HTMLElement[]>([]);
  const rootRef = useRef<HTMLElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    ctxRef.current = gsap.context(() => {}, rootRef);
    return () => { ctxRef.current?.revert(); timelineRef.current?.kill(); };
  }, []);

  const animateTo = (step: -1 | 1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPendingDirection(step);
    const cards = cardRefs.current.filter(Boolean);
    const [previous, current, next, incoming] = cards;
    const distance = 26;
    const incomingDirection = step > 0 ? 1 : -1;
    timelineRef.current?.kill();
    const timeline = gsap.timeline({ defaults: { duration: .42, ease: 'power2.out' } });
    timelineRef.current = timeline;
    gsap.set(incoming, { x: incomingDirection * distance, opacity: 0, scale: .84, filter: 'grayscale(1) brightness(.68)' });
    timeline
      .to(previous, { x: step > 0 ? -distance : distance, opacity: 0, scale: .98 }, 0)
      .to(current, { x: step > 0 ? -distance : distance, opacity: .55, scale: .98 }, 0)
      .to(next, { x: step > 0 ? -distance : distance, opacity: 1, scale: 1 }, 0)
      .to(incoming, { x: 0, opacity: .55, scale: .98 }, 0)
      .add(() => setActive((value) => circularIndex(value + step)))
      .eventCallback('onComplete', () => { setIsAnimating(false); });
  };

  const getCards = () => [
    professionals[circularIndex(active - 1)],
    professionals[active],
    professionals[circularIndex(active + 1)],
    professionals[circularIndex(active + 2)],
  ];
  const cards = getCards();

  return (
    <section ref={rootRef} className="team-section" id="equipe" aria-label="Nossa equipe">
      <div className="team-heading section-content">
        <div className="team-heading-title"><Chevrons /><h2>NOSSA EQUIPE</h2></div>
        <p className="team-heading-copy"><i />Experiência, cuidado e acompanhamento para fazer cada treino evoluir com você.</p>
      </div>
      <div className="team-carousel">
        <ArrowButton className="team-control team-control-prev" direction="left" aria-label="Profissional anterior" onClick={() => animateTo(-1)} disabled={isAnimating} />
        <div className="team-stage">
          {cards.map((person, index) => <article ref={(node) => { if (node) cardRefs.current[index] = node; }} className={`team-card ${index === 1 ? 'team-card-active' : index === 0 ? 'team-card-side team-card-prev' : index === 3 ? `team-card-side team-card-incoming ${pendingDirection > 0 ? 'team-card-next' : 'team-card-prev'}` : 'team-card-side team-card-next'}`} key={`${person.name}-${index}`}>
            <img className="team-card-photo" src={person.image} alt={person.name} />
            <div className="team-card-info"><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>)}
        </div>
        <ArrowButton className="team-control team-control-next" direction="right" aria-label="Próximo profissional" onClick={() => animateTo(1)} disabled={isAnimating} />
      </div>
      <div className="team-dots" aria-label="Selecionar profissional">{professionals.map((person, index) => <button key={person.name} className={index === active ? 'is-active' : ''} type="button" onClick={() => { if (index !== active && !isAnimating) animateTo(index > active ? 1 : -1); }} aria-label={`Ver ${person.name}`} />)}</div>
    </section>
  );
}
