import { LogoTitle } from './Shared';
export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="section-content">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#inicio">
              <LogoTitle />
            </a>
            <p>
              LONG LIFE ACADEMIA
              <br />
              Sua jornada começa aqui.
            </p>
            <span className="contact-note">
              Contatos e endereços em atualização.
            </span>
          </div>
          <div>
            <h3>Menu</h3>
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#planos">Planos</a>
            <a href="#historias">Histórias</a>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#sobre">Nossa equipe</a>
            <a href="#unidades">Unidades</a>
            <a href="#unidades">Novidades</a>
            <a href="#contato">Contato</a>
          </div>
          <div>
            <h3>Horários</h3>
            <p>
              Consulte sua unidade
              <br />
              para horários de funcionamento.
            </p>
            <h3 className="footer-question">Vamos começar?</h3>
            <a href="#planos">Encontre o seu plano ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span
            className="socials"
            aria-label="Redes sociais"
          >
            <span title="Instagram">
              <img src={publicAsset('icon/icons-insta.png')} alt="Instagram" />
            </span>
            <span title="Facebook">
              <img src={publicAsset('icon/icon-facebook.png')} alt="Facebook" />
            </span>
            <span title="YouTube">▷</span>
          </span>
          <p>
            © {new Date().getFullYear()} LONG LIFE. Todos os direitos reservados.
          </p>
          <a className="back-top" href="#inicio" aria-label="Voltar ao topo">
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
import { publicAsset } from '../utils/publicAsset';
