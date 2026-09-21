import { useState } from 'react';
import { Chevrons } from './Shared';
import { statistics } from '../data/statistics';
const stories = [
  {
    name: 'Juntos, mais fortes',
    image: '/images/hero.png',
    text: 'Cada conquista começa com um primeiro passo. Na LONG LIFE, a orientação e o apoio fazem parte de cada treino.',
  },
  {
    name: 'Movimento ao ar livre',
    image: '/images/beach.png',
    text: 'Treinar também é compartilhar bons momentos. Movimento, companhia e disposição para a vida.',
  },
  {
    name: 'Uma nova rotina',
    image: '/images/outdoor.png',
    text: 'Encontre o seu ritmo e transforme o movimento em um hábito. Um dia de cada vez, uma evolução de cada vez.',
  },
];
export default function Stories() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="stories" id="historias">
      <div className="section-content">
        <div className="stories-top">
          <div className="stories-intro" data-reveal>
            <Chevrons />
            <h2>
              HISTÓRIAS DE
              <br />
              QUEM EVOLUIU
            </h2>
            <p>
              Mais que treinar, evoluir. Conheça os momentos de quem faz parte da
              nossa comunidade.
            </p>
            <div className="controls">
              <button
                aria-label="História anterior"
                onClick={() => setIndex((index + 2) % 3)}
              >
                ←
              </button>
              <button
                aria-label="Próxima história"
                onClick={() => setIndex((index + 1) % 3)}
              >
                →
              </button>
            </div>
          </div>
          <div className="stories-window">
            <div
              className="story-track"
              style={{
                transform: `translateX(calc(${index} * (-1 * (var(--story-width) + 26px))))`,
              }}
            >
              {stories.map((s, i) => (
                <button
                  key={s.name}
                  className="story-card"
                  onClick={() => setActive(i)}
                  aria-label={`Abrir história: ${s.name}`}
                >
                  <img src={s.image} alt={s.name} loading="lazy" />
                  <span className="story-name">{s.name}</span>
                  <span className="story-play" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="statistics">
          {statistics.map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <strong>
                {s.prefix}
                <span data-count={s.value}>
                  {s.value.toLocaleString('pt-BR')}
                </span>
                {s.suffix}
              </strong>
              <p>{s.label}</p>
              <small>{s.detail}</small>
            </div>
          ))}
        </div>
        <span className="mock-note">Indicadores demonstrativos.</span>
        {active !== null && (
          <div className="modal-backdrop" onClick={() => setActive(null)}>
            <section
              className="story-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={stories[active].name}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                autoFocus
                className="close-modal"
                onClick={() => setActive(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setActive(null);
                }}
                aria-label="Fechar história"
              >
                ×
              </button>
              <img src={stories[active].image} alt={stories[active].name} />
              <div>
                <h2>{stories[active].name}</h2>
                <p>{stories[active].text}</p>
                <small>
                  Conteúdo ilustrativo sobre os registros da academia.
                </small>
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
