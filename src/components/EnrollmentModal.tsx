import { FormEvent, useEffect, useState } from 'react';
import { plans } from '../data/plans';

export interface EnrollmentData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  plano: string;
  origem?: string;
  aceitouPolitica: boolean;
}

type Props = { selectedPlan: string | null; onClose: () => void };
type Errors = Partial<Record<keyof EnrollmentData, string>>;

const onlyDigits = (value: string) => value.replace(/\D/g, '');
const maskCpf = (value: string) => onlyDigits(value).slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const maskPhone = (value: string) => onlyDigits(value).slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');

export default function EnrollmentModal({ selectedPlan, onClose }: Props) {
  const [form, setForm] = useState<EnrollmentData>({ nome: '', cpf: '', dataNascimento: '', telefone: '', email: '', plano: selectedPlan ?? plans[0].name, origem: '', aceitouPolitica: false });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (!selectedPlan) return;
    setForm((current) => ({ ...current, plano: selectedPlan }));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedPlan, onClose]);

  if (!selectedPlan) return null;
  const update = (field: keyof EnrollmentData, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));
  const validate = () => {
    const next: Errors = {};
    if (!form.nome.trim()) next.nome = 'Informe seu nome completo.';
    if (onlyDigits(form.cpf).length !== 11) next.cpf = 'Informe um CPF válido.';
    if (!form.dataNascimento) next.dataNascimento = 'Informe sua data de nascimento.';
    if (onlyDigits(form.telefone).length < 10) next.telefone = 'Informe um telefone válido.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Informe um e-mail válido.';
    if (!form.plano) next.plano = 'Selecione um plano.';
    if (!form.aceitouPolitica) next.aceitouPolitica = 'Você precisa aceitar a política de privacidade.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = (event: FormEvent) => { event.preventDefault(); if (!validate()) return; const data: EnrollmentData = { ...form, cpf: onlyDigits(form.cpf), telefone: onlyDigits(form.telefone), origem: form.origem || undefined }; console.info('Pré-matrícula pronta para integração:', data); };
  const field = (name: keyof EnrollmentData, label: string, control: React.ReactNode) => <label className={`enrollment-field ${errors[name] ? 'has-error' : ''}`}><span>{label}</span>{control}{errors[name] && <small role="alert">{errors[name]}</small>}</label>;

  return <div className="enrollment-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="enrollment-modal" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="enrollment-title">
      <button className="enrollment-close" type="button" onClick={onClose} aria-label="Fechar">×</button>
      <span className="enrollment-eyebrow">SUA JORNADA COMEÇA AQUI</span>
      <h2 id="enrollment-title">QUASE LÁ.</h2>
      <p className="enrollment-intro">Preencha seus dados para iniciar sua matrícula na Long Life.</p>
      <form onSubmit={submit} noValidate>
        {field('nome', 'Nome completo', <input autoFocus value={form.nome} onChange={(e) => update('nome', e.target.value)} />)}
        <div className="enrollment-grid">{field('cpf', 'CPF', <input inputMode="numeric" value={form.cpf} onChange={(e) => update('cpf', maskCpf(e.target.value))} placeholder="000.000.000-00" />)}{field('dataNascimento', 'Data de nascimento', <input type="date" value={form.dataNascimento} onChange={(e) => update('dataNascimento', e.target.value)} />)}</div>
        <div className="enrollment-grid">{field('telefone', 'WhatsApp / Telefone', <input inputMode="tel" value={form.telefone} onChange={(e) => update('telefone', maskPhone(e.target.value))} placeholder="(00) 00000-0000" />)}{field('email', 'E-mail', <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />)}</div>
        {field('plano', 'Plano', <select value={form.plano} onChange={(e) => update('plano', e.target.value)}>{plans.map((plan) => <option key={plan.name} value={plan.name}>Plano {plan.name}</option>)}</select>)}
        {field('origem', 'Como conheceu a Long Life?', <select value={form.origem} onChange={(e) => update('origem', e.target.value)}><option value="">Selecione uma opção</option>{['Instagram', 'Google', 'Indicação', 'Passei em frente', 'Outro'].map((source) => <option key={source}>{source}</option>)}</select>)}
        <label className={`enrollment-check ${errors.aceitouPolitica ? 'has-error' : ''}`}><input type="checkbox" checked={form.aceitouPolitica} onChange={(e) => update('aceitouPolitica', e.target.checked)} /><span>Li e concordo com a Política de Privacidade e com o uso dos meus dados para realização da pré-matrícula.</span></label>
        {errors.aceitouPolitica && <small className="enrollment-check-error" role="alert">{errors.aceitouPolitica}</small>}
        <button className="cta enrollment-submit" type="submit">CONTINUAR <span>↗</span></button>
      </form>
    </section>
  </div>;
}
