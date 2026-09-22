import { useMemo, useState } from 'react';
import { Chevrons } from './Shared';

const professionals = [
  { name: 'João Silva', role: 'PERSONAL TRAINER', image: '/images/professional-1.png' },
  { name: 'Gabriel Santos', role: 'PERSONAL TRAINER', image: '/images/professional-2.png' },
  { name: 'Marina Costa', role: 'PERSONAL TRAINER', image: '/images/professional-3.png' },
  { name: 'Lucas Martins', role: 'PREPARADOR FÍSICO', image: '/images/professional-1.png' },
  { name: 'Ana Oliveira', role: 'PERSONAL TRAINER', image: '/images/professional-2.png' },
];

const positionFor = (index: number, active: number) => {
  const relative = (index - active + professionals.length) % professionals.length;
  if (relative === 0) return 'is-active';
  if (relative === 1) return 'is-right';
  if (relative === 4) return 'is-left';
  if (relative === 2) return 'is-far-right';
  return 'is-far-left';
};

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const cards = useMemo(() => professionals.map((person, index) => ({
    ...person,
    position: positionFor(index, active),
  })), [active]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + professionals.length) % professionals.length);
  };

  return (
    <section className="team-section" aria-label="Nossa equipe">
      <div className="team-heading section-content">
        <Chevrons />
        <h2>CONHEÇA NOSSA EQUIPE</h2>
      </div>
      <div className="team-carousel">
        <button className="team-control team-control-prev" type="button" aria-label="Profissional anterior" onClick={() => move(-1)}>‹</button>
        <div className="team-stage">
          {cards.map((person, index) => (
            <article className={`team-card ${person.position}`} key={`${person.name}-${index}`}>
              <img className="team-card-photo" src={person.image} alt={person.name} />
              <span className="team-card-plus" aria-hidden="true">+</span>
              <div className="team-card-info">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
        <button className="team-control team-control-next" type="button" aria-label="Próximo profissional" onClick={() => move(1)}>›</button>
      </div>
    </section>
  );
}
