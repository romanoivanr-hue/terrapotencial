import { PricingPlan, PropertyData, Study } from './types';

export const MAX_COMPLEMENTARY_FILES = 10;
export const ESTIMATED_DELIVERY_DAYS = 5;

// Estrutura Comercial Técnica de 3 Planos
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'estudo-preliminar',
    code: 'PLANO_777',
    name: 'Diagnóstico Territorial & Restrições',
    badge: 'Entrada Acessível',
    tagline: 'Mapeamento expedito de restrições ambientais, área líquida e contagem preliminar de lotes.',
    price: 777,
    originalPrice: 1250,
    installments: '12x de R$ 78,01',
    revisionsCount: 1,
    includesMeeting: false,
    meetingDescription: 'Revisão técnica remota via plataforma',
    highlighted: false,
    ctaLabel: 'Contratar Diagnóstico (R$ 777)',
    features: [
      'Delimitação cartográfica oficial e perímetro da gleba',
      'Diagnóstico de restrições ambientais (APPs, recursos hídricos e declividades)',
      'Cálculo de Área Líquida Potencialmente Aproveitável',
      'Estimativa preliminar de número de lotes potenciais',
      'Direito a 1 (uma) revisão técnica inclusa',
      'Emissão de Relatório Preliminar em PDF'
    ]
  },
  {
    id: 'estudo-completo',
    code: 'PLANO_2490',
    name: 'Estudo Completo + Anteprojeto Urbanístico',
    badge: 'Mais Recomendado',
    tagline: 'Análise técnica aprofundada, anteprojeto com traçado de vias, quadras e reunião com especialistas.',
    price: 2490,
    originalPrice: 3900,
    installments: '12x de R$ 249,90 sem juros',
    revisionsCount: 3,
    includesMeeting: true,
    meetingDescription: 'Reunião Técnica Online de Apresentação (Google Meet) com a equipe de engenharia/urbanismo',
    highlighted: true,
    ctaLabel: 'Quero o Estudo Completo (R$ 2.490)',
    features: [
      'Tudo incluído no Diagnóstico Preliminar',
      'Anteprojeto Urbanístico Preliminar com sistema viário hierarquizado',
      'Desenho e distribuição geométrica de quadras e lotes padronizados',
      'Definição preliminar de áreas verdes, institucionais e doações públicas',
      'Quadro Geral de Áreas discriminado (percentuais segundo Lei 6.766/79)',
      'Reunião técnica de alinhamento por videoconferência com os especialistas',
      'Até 3 (três) adequações/revisões de projeto (largura de vias, dimensões de lotes, acessos)',
      'Dossiê executivo final em alta resolução (PDF) pronto para investidores e sócios'
    ]
  },
  {
    id: 'corporate-mensal',
    code: 'PLANO_CORPORATE',
    name: 'Assinatura Mensal Multi-Glebas',
    badge: 'Empresarial / Loteadoras',
    tagline: 'Esteira contínua de inteligência territorial para loteadoras, incorporadoras e fundos de investimento.',
    price: 0,
    priceLabel: 'Sob Medida / Mensal',
    revisionsCount: 99,
    includesMeeting: true,
    meetingDescription: 'Validação e alinhamento prévio em reunião técnica com a diretoria de engenharia',
    highlighted: false,
    ctaLabel: 'Agendar Reunião Técnica',
    features: [
      'Pacote mensal de múltiplos estudos territoriais e anteprojetos contínuos',
      'Atendimento prioritário com SLA de entrega acelerado',
      'Suporte direto via canal exclusivo com time de urbanistas e SIG',
      'Revisões flexíveis e customização conforme leis de zoneamento locais',
      'Acesso multi-usuário para equipe técnica da sua incorporadora',
      'Validação de volume e formato em reunião com nossa equipe'
    ]
  }
];

export const DEFAULT_PRICING_PLAN = PRICING_PLANS[1];

// Mock property para demonstração do MVP
export const MOCK_PROPERTY: PropertyData = {
  id: 'prop-mock-001',
  name: 'Fazenda Modelo das Palmeiras',
  city: 'Florianópolis',
  state: 'SC',
  coordinates: {
    lat: -27.5954,
    lng: -48.5480
  },
  totalAreaM2: 2500000,
  totalAreaHa: 250,
  perimeterM: 7420,
  usableAreaM2: 1625000,
  environmentalAreaM2: 625000,
  estimatedLots: 980,
  averageLotSizeM2: 450,
  potentialGdv: 'R$ 145.000.000',
  zoningClassification: 'Zona de Expansão Urbana (ZEU-2)',
  topographyType: 'Suave',
  isMock: true
};

export const INITIAL_STUDIES: Study[] = [
  {
    protocol: 'TR-2026-000123',
    createdAt: '18/02/2026',
    estimatedDeliveryDate: '23/02/2026',
    property: MOCK_PROPERTY,
    client: {
      name: 'Roberto V. Mendonça',
      email: 'roberto@mendoncapar.com.br',
      phone: '(48) 99182-3344',
      documentCpfCnpj: '12.345.678/0001-90',
      role: 'Proprietário',
      projectObjective: 'Condomínio Fechado',
      notes: 'Gleba com fácil acesso à rodovia. Interesse em lotes residenciais médios de 400m² a 600m².'
    },
    planId: 'estudo-completo',
    planName: 'Estudo Completo + Anteprojeto Urbanístico',
    price: 2490,
    revisionsAllowed: 3,
    revisionsUsed: 0,
    hasMeeting: true,
    progress: 65,
    status: 'Análise Territorial',
    timeline: [
      { step: 1, title: 'Contratação e Protocolo', description: 'Pagamento confirmado e protocolo TR-2026-000123 emitido', status: 'completed', date: '18/02 10:14' },
      { step: 2, title: 'Documentos Recebidos', description: 'KMZ e matrícula anexados pela plataforma', status: 'completed', date: '18/02 11:30' },
      { step: 3, title: 'Validação e Georreferenciamento', description: 'Limites confrontantes auditados com malha municipal', status: 'completed', date: '19/02 09:00' },
      { step: 4, title: 'Análise Territorial & Restrições', description: 'Cruzamento com bacias hídricas, APPs e zoneamento', status: 'current', date: 'Em andamento' },
      { step: 5, title: 'Desenvolvimento do Anteprojeto', description: 'Geração de eixos viários, quadras e quadros de área', status: 'pending' },
      { step: 6, title: 'Reunião Técnica & Dossiê PDF', description: 'Apresentação com os especialistas e adequações de projeto', status: 'pending' }
    ],
    files: [
      {
        id: 'f-1',
        name: 'Fazenda_Modelo_Poligono_WGS84.kmz',
        type: 'KMZ',
        size: '2.4 MB',
        uploadedAt: '18/02/2026 10:20',
        status: 'Enviado',
        category: 'Georreferenciamento'
      },
      {
        id: 'f-2',
        name: 'Matricula_Imovel_Gleba_7.pdf',
        type: 'PDF_MATRICULA',
        size: '5.1 MB',
        uploadedAt: '18/02/2026 11:32',
        status: 'Enviado',
        category: 'Jurídico / Registro'
      }
    ],
    pdfAvailable: true
  }
];
