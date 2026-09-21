import { Chevrons, CTA } from './Shared';
import { professionals } from '../data/professionals';
export default function Training() {
  return (
    <section className="training-section" id="sobre">
      <div className="training section-content">
        <div className="training-heading" data-reveal>
          <Chevrons />
          <h2>
            TREINE COM
            <br />
            QUEM ENTENDE
          </h2>
          <div className="offer">
            <h3>
              SEU PRIMEIRO
              <br />
              PASSO
            </h3>
            <p>
              Conheça a estrutura.
              <br />
              Encontre seu ritmo.
            </p>
            <a href="#contato">
              Vem treinar <span>➜</span>
            </a>
          </div>
        </div>
        <div className="training-photo" data-reveal>
          <img
            src="/images/training.png"
            alt="Profissional auxiliando um aluno durante o treino"
            loading="lazy"
            data-parallax
          />
        </div>
        <div className="training-aside" data-reveal>
          <div className="team-photo">
            {professionals.slice(0, 2).map((p) => (
              <img src={p.image} alt={p.alt} key={p.image} loading="lazy" />
            ))}
            <div className="team-count">
              <strong>+10</strong>
              <span>
                Profissionais
                <br />
                com você
              </span>
            </div>
            <a href="#contato" aria-label="Conheça nossa equipe">
              ↗
            </a>
          </div>
          <p>
            Acompanhamento de perto e profissionais preparados para ajudar você a
            ir além. Seu objetivo, com a orientação certa.
          </p>
          <CTA href="#contato">CONHEÇA A EQUIPE</CTA>
        </div>
      </div>
    </section>
  );
}
