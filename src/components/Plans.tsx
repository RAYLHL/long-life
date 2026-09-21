import { useState } from 'react';
import { plans, formatPrice } from '../data/plans';
import { Chevrons } from './Shared';
export default function Plans({
  onSelect,
}: {
  onSelect: (name: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const order = plans.map((_, i) => plans[(i + selected) % plans.length]);
  const changePlan = (nextIndex: number) => {
    setDirection(nextIndex >= selected ? 'next' : 'previous');
    setSelected(nextIndex);
  };
  return (
    <section className="plans" id="planos">
      <div className="section-content">
        <div className="plans-top">
          <Chevrons />
          <h2 data-reveal>
            PLANOS FLEXÍVEIS PARA
            <br />O SEU ESTILO DE VIDA
          </h2>
        </div>
        <div className="plan-controls">
          <div className="progress-track">
            <span style={{ transform: `translateX(${selected * 100}%)` }} />
          </div>
          <div className="controls">
            <button
              aria-label="Plano anterior"
              onClick={() => changePlan((selected + plans.length - 1) % plans.length)}
            >
              ←
            </button>
            <button
              aria-label="Próximo plano"
              onClick={() => changePlan((selected + 1) % plans.length)}
            >
              →
            </button>
          </div>
        </div>
        <div className="plans-row">
          <article
            className={`featured-plan plan-card-${direction}`}
            key={order[0].name}
            data-reveal
          >
            <div className="featured-top">
              <h3>{order[0].name}</h3>
              <div className="price">
                <strong>
                  <small>R$</small> {formatPrice(order[0].price)}
                </strong>
                <span>/mês</span>
              </div>
            </div>
            <button className="cta" onClick={() => onSelect(order[0].name)}>
              QUERO ESTE <span>➜</span>
            </button>
            <ul>
              {order[0].benefits.map((b) => (
                <li key={b}>
                  <span>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
          <div className="secondary-plans">
            {order.slice(1).map((p) => (
              <button
                key={p.name}
                className="small-plan"
                onClick={() =>
                  changePlan(plans.findIndex((item) => item.name === p.name))
                }
              >
                <h3>{p.name}</h3>
                <div className="price-pill">
                  <strong>R$ {formatPrice(p.price)}</strong>
                  <small>/mês</small>
                </div>
                <p>{p.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
