export function Chevrons() {
  return (
    <div className="chevrons" aria-hidden="true">
      <i />
      <i />
    </div>
  );
}
export function Arrow({
  direction = 'right',
}: {
  direction?: 'right' | 'left' | 'up';
}) {
  return (
    <span aria-hidden="true">
      {direction === 'left' ? '←' : direction === 'up' ? '↑' : '↗'}
    </span>
  );
}
export function Logo() {
  return (
    <img className="logo" src={publicAsset('images/logoSemFundo.png')} alt="LONG LIFE Academia" />
  );
}
export function LogoTitle() {
  return (
    <img className="logo" src={publicAsset('images/logoTitle.png')} alt="LONG LIFE Academia" />
  );
}
export function CTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="cta" href={href}>
      {children}
      <span aria-hidden="true">➜</span>
    </a>
  );
}
import { publicAsset } from '../utils/publicAsset';
