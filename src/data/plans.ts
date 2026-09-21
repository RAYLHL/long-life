export interface Plan {
  name: string;
  price: number;
  description: string;
  benefits: string[];
}
// Valores demonstrativos. Atualize aqui para alterar todos os cards.
export const plans: Plan[] = [
  {
    name: 'Mensal',
    price: 99.90,
    description: 'A experiência completa para ir além, todos os dias.',
    benefits: [
      'Acompanhamento profissional',
      'Acesso a toda a estrutura',
      'Musculação e aulas coletivas',
      'Avaliação física',
    ],
  },
  {
    name: 'Semestral',
    price: 85.00,
    description:
      'Mais possibilidades para o seu treino. Musculação, aulas e acompanhamento para evoluir.',
    benefits: [
      'Musculação completa',
      'Aulas coletivas',
      'Orientação profissional',
    ],
  },
  {
    name: 'Anual',
    price: 70.00,
    description:
      'Seu primeiro passo começa aqui. Estrutura e apoio para fazer do treino parte da sua vida.',
    benefits: ['Acesso à musculação', 'Orientação profissional'],
  },
  {
    name: 'Família',
    price:  95.00,
    description: 'A motivação é ainda maior quando a jornada é compartilhada.',
    benefits: [
      'Plano para duas pessoas',
      'Acesso à musculação',
      'Aulas coletivas',
    ],
  },
];
export const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
