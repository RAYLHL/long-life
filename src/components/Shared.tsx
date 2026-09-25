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
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a className="cta" href={href} target={target} rel={rel}>
      {children}
      <span aria-hidden="true">➜</span>
    </a>
  );
}
import { publicAsset } from '../utils/publicAsset';
import type { ButtonHTMLAttributes } from 'react';

export function ArrowButton({ direction = 'right', size = 'md', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { direction?: 'left' | 'right'; size?: 'sm' | 'md' | 'lg' }) {
  const path = direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6';
  return <button {...props} className={`arrow-button arrow-button-${size} ${className}`.trim()} type={props.type ?? 'button'} aria-label={props['aria-label'] ?? (direction === 'left' ? 'Anterior' : 'Próximo')}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
  </button>;
}
