export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  description: string;
  offers: string[];
  discount: string;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
  coupon: string;
}

export const PARTNERS: Partner[] = [
  {
    id: 'unifatecie',
    name: 'Centro Universitário UniFatecie (UNIFATECIE)',
    logo_url: '/assets/partners/unifatecie.png', // Fallback para inicial se não existir
    description: 'Educação de qualidade e excelência para o seu futuro.',
    offers: ['Descontos em cursos de graduação', 'Descontos em pós-graduação'],
    discount: 'Até 20% off',
    phone: '',
    whatsapp: '',
    website: 'https://www.unifatecie.edu.br',
    address: '',
    coupon: '',
  },
  {
    id: 'influx',
    name: 'Influx Idiomas',
    logo_url: '/assets/partners/influx.png',
    description: 'O seu futuro global começa aqui.',
    offers: ['Inglês e Espanhol', 'Material didático incluso'],
    discount: '15% off na matrícula',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    coupon: '',
  },
  {
    id: 'praxis',
    name: 'Instituto Práxis',
    logo_url: '/assets/partners/praxis.png',
    description: 'Desenvolvimento humano e profissional.',
    offers: ['Cursos de capacitação', 'Mentorias'],
    discount: '',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    coupon: '',
  },
  {
    id: 'world-opportunity',
    name: 'Instituto World Opportunity',
    logo_url: '/assets/partners/world-opportunity.png',
    description: 'Conectando você a oportunidades internacionais.',
    offers: ['Intercâmbios', 'Cursos no exterior'],
    discount: 'Condições especiais',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    coupon: '',
  },
];

export function getPartnerById(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}
