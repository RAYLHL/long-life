import { useState } from 'react';
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className="newsletter-section" id="unidades">
      <div className="newsletter section-content">
        <div data-reveal>
          <h2>
            FIQUE POR DENTRO
            <br />
            DAS NOVIDADES LONG LIFE
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="email">
              Seu email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              required
              placeholder="Seu email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDone(false);
              }}
            />
            <button type="submit">INSCREVER-SE</button>
          </form>
          <p className="newsletter-status" role="status">
            {done
              ? 'Pré-cadastro demonstrativo concluído. Nenhum email foi enviado.'
              : 'Respeitamos sua privacidade. Seus dados merecem cuidado.'}
          </p>
        </div>
        <a href="#contato" className="location-card" data-reveal>
          <img
            src="/images/structure.png"
            alt="Estrutura e equipamentos da academia LONG LIFE"
            loading="lazy"
          />
          <span className="location-label">
            LONG LIFE ACADEMIA
            <br />
            <small>Encontre seu lugar para evoluir</small>
          </span>
          <span className="map-pin" aria-hidden="true">
            ●
          </span>
          <span className="location-link">CONHEÇA NOSSAS UNIDADES ↗</span>
        </a>
      </div>
    </section>
  );
}
