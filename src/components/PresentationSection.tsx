import { publicAsset } from '../utils/publicAsset';

const photos = [
  { className: 'presentation-photo-main', src: publicAsset('images/gym.png'), alt: 'Área de musculação da Long Life' },
  { className: 'presentation-photo-structure', src: publicAsset('images/structure.png'), alt: 'Estrutura de treino da Long Life' },
  { className: 'presentation-photo-outdoor', src: publicAsset('images/outdoor.png'), alt: 'Treino ao ar livre da Long Life' },
];

export default function PresentationSection() {
  return (
    <section className="presentation-section" id="apresentacao" aria-labelledby="presentation-title">
      <div className="presentation-grid section-content">
        <article className="presentation-feature" data-reveal>
          <div className="presentation-feature-copy">
            <div className="presentation-brand">
              <span>CONHEÇA</span>
              <img className="presentation-logo" src={publicAsset('images/logoTitle.png')} alt="Long Life" />
            </div>
            <h2 id="presentation-title">UM ESPAÇO PARA<br />IR MAIS <em>LONGE.</em></h2>
            <p>Um ambiente pensado para transformar movimento em rotina. Estrutura, diferentes experiências e espaço para você evoluir no seu ritmo.</p>
            <div className="presentation-tags" aria-label="Valores da Long Life"><span>ESTRUTURA</span><span>MOVIMENTO</span><span>EVOLUÇÃO</span></div>
          </div>
        </article>
        <div className="presentation-photos">
          {photos.map((photo) => <figure className={`presentation-photo ${photo.className}`} data-reveal key={photo.className}><img src={photo.src} alt={photo.alt} loading="lazy" /></figure>)}
        </div>
      </div>
    </section>
  );
}
