import { CTA } from './Shared';
import { publicAsset } from '../utils/publicAsset';

const benefits = [
  'Acesse sua área de aluno pelo celular',
  'Tenha suas informações sempre à mão',
  'Leve a Long Life com você onde estiver',
];

export default function AppSection() {
  return (
    <section className="app-section" id="area-do-aluno" aria-labelledby="app-section-title">
      <div className="app-section-layout section-content">
        <div className="app-visual" data-reveal aria-label="Prévia visual da área do aluno">
          <span className="app-shape app-shape-ring" aria-hidden="true" />
          <span className="app-shape app-shape-line" aria-hidden="true" />
          <div className="app-device" aria-hidden="true">
            <div className="app-device-screen">
              <span className="app-device-notch" />
              <span className="app-device-kicker">LONG LIFE</span>
              <strong>ÁREA DO<br />ALUNO</strong>
              <span className="app-device-line" />
            </div>
          </div>
        </div>
        <div className="app-content" data-reveal>
          <span className="app-eyebrow">LONG LIFE NA SUA ROTINA</span>
          <h2 id="app-section-title">SUA ACADEMIA<br />NA PALMA DA MÃO</h2>
          <p className="app-intro">Mais praticidade para acompanhar sua rotina e manter seus treinos sempre por perto.</p>
          <ul className="app-benefits">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
          <div className="app-store-badges" aria-label="Disponível para celular">
            <img src={publicAsset('images/googleplay.webp')} alt="Disponível no Google Play" />
            <img src={publicAsset('images/appstore.webp')} alt="Disponível na App Store" />
          </div>
          <CTA href="https://mobile.melfitness.com.br/login" target="_blank" rel="noopener noreferrer">ACESSAR ÁREA DO ALUNO</CTA>
        </div>
      </div>
    </section>
  );
}
