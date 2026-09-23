import { Map, MapMarker, MarkerContent, MarkerTooltip } from './ui/mapcn-marker-tooltip';

const LONG_LIFE = { latitude: -26.8660433, longitude: -48.6409269 };
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Academia+Long+Life/@-26.8660433,-48.6409269,17z/data=!3m1!4b1!4m6!3m5!1s0x94d8cd083615e04f:0x77298ca11180b396!8m2!3d-26.8660433!4d-48.6409269!16s%2Fg%2F11yzw_bwgc';
const INSTAGRAM_URL = 'https://www.instagram.com/acad.longlife/';

export default function Newsletter() {
  return (
    <section className="newsletter-section" id="unidades">
      <div className="newsletter section-content">
        <div data-reveal>
          <h2>FIQUE POR DENTRO<br />DAS NOVIDADES LONG LIFE</h2>
          <div className="instagram-cta">
            <a className="instagram-profile" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <img src="/icon/icons-insta.png" alt="" aria-hidden="true" />
              <span>@acad.longlife</span>
            </a>
            <a className="instagram-follow" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">SEGUIR NO INSTAGRAM</a>
          </div>
        </div>
        <div className="location-card" data-reveal>
          <Map center={[LONG_LIFE.longitude, LONG_LIFE.latitude]} zoom={16} className="long-life-location-map">
            <MapMarker longitude={LONG_LIFE.longitude} latitude={LONG_LIFE.latitude}>
              <MarkerContent>
                <button className="long-life-map-pin" type="button" aria-label="Abrir Academia Long Life no Google Maps" onClick={() => window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer')} />
              </MarkerContent>
              <MarkerTooltip>Academia Long Life</MarkerTooltip>
            </MapMarker>
          </Map>
          <span className="location-label">LONG LIFE ACADEMIA<br /><small>Encontre seu lugar para evoluir</small></span>
        </div>
      </div>
    </section>
  );
}
