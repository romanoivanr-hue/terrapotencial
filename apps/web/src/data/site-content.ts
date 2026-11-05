import {
	Map,
	Layers,
	ShieldAlert,
	Maximize2,
	FileText,
	ScanLine,
	Upload,
	Search,
	ClipboardCheck,
	Target,
	Eye,
	TrendingUp,
	Building2,
	Users,
	Home,
	Compass,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Deliverable = {
	icon: LucideIcon;
	title: string;
	description: string;
};

export const DELIVERABLES: Deliverable[] = [
	{
		icon: Map,
		title: 'Mapas georreferenciados',
		description: 'Cartografia da gleba com coordenadas reais, pronta para softwares de SIG/GIS.',
	},
	{
		icon: ScanLine,
		title: 'Análise territorial',
		description: 'Leitura do terreno, topografia e contexto regional que influenciam o aproveitamento.',
	},
	{
		icon: ShieldAlert,
		title: 'Condicionantes',
		description: 'Restrições, limites e áreas não edificáveis que incidem sobre a área.',
	},
	{
		icon: TrendingUp,
		title: 'Estimativa de aproveitamento',
		description: 'Cálculo preliminar do potencial construtivo e de lotes da gleba.',
	},
	{
		icon: Maximize2,
		title: 'Implantação preliminar',
		description: 'Visualização da disposição de quadras, lotes, vias e áreas verdes.',
	},
	{
		icon: FileText,
		title: 'Relatório PDF',
		description: 'Documento consolidado com mapas, análises e estimativas, conforme o plano.',
	},
];

export type Step = {
	icon: LucideIcon;
	index: string;
	title: string;
	description: string;
};

export const STEPS: Step[] = [
	{
		icon: Upload,
		index: '01',
		title: 'Envie os arquivos e documentos disponíveis',
		description:
			'Você envia os arquivos da área — shapefile, KMZ/KML, planta em PDF ou CAD e matrícula do imóvel. Quanto mais completos os documentos, mais consistente a análise.',
	},
	{
		icon: Search,
		index: '02',
		title: 'As informações são organizadas e analisadas',
		description:
			'Cruzamos dados geográficos, legais e de restrições para mapear o potencial e as condicionantes da gleba, organizando tudo em camadas territoriais.',
	},
	{
		icon: ClipboardCheck,
		index: '03',
		title: 'Receba os mapas, resultados e relatório',
		description:
			'Você recebe o relatório PDF com mapas georreferenciados, condicionantes e estimativa de aproveitamento, conforme o plano contratado.',
	},
];

export type Benefit = {
	icon: LucideIcon;
	title: string;
	description: string;
};

export const BENEFITS: Benefit[] = [
	{
		icon: Search,
		title: 'Compreender melhor uma propriedade',
		description: 'Reúna em um só lugar as características territoriais que influenciam o aproveitamento da gleba.',
	},
	{
		icon: ShieldAlert,
		title: 'Identificar condicionantes territoriais',
		description: 'Veja restrições, limites e áreas não edificáveis que pesam na decisão antes de investir.',
	},
	{
		icon: Maximize2,
		title: 'Visualizar possibilidades preliminares',
		description: 'Visualize a disposição de quadras, lotes e vias em uma implantação preliminar da área.',
	},
	{
		icon: Layers,
		title: 'Organizar informações para decisões de investimento',
		description: 'Transforme dados dispersos em um relatório estruturado que apoia a tomada de decisão.',
	},
	{
		icon: Target,
		title: 'Avaliar oportunidades antes de avançar',
		description: 'Avalie o potencial preliminar antes de comprometer recursos em projetos mais aprofundados.',
	},
];

export type Audience = {
	icon: LucideIcon;
	label: string;
	title: string;
	description: string;
};

export const AUDIENCES: Audience[] = [
	{
		icon: Building2,
		label: 'LOTEADORAS',
		title: 'Loteadoras',
		description: 'Avalie oportunidades e compreenda o potencial preliminar de novas áreas.',
	},
	{
		icon: Users,
		label: 'CORRETORES',
		title: 'Corretores',
		description: 'Apresente propriedades com informações territoriais mais estruturadas.',
	},
	{
		icon: Home,
		label: 'PROPRIETÁRIOS',
		title: 'Proprietários',
		description: 'Entenda melhor sua terra antes de negociar ou desenvolver.',
	},
];

export type Plan = {
	key: string;
	title: string;
	price: string;
	period: string;
	description: string;
	audience: string;
	features: string[];
	limits: string;
	highlight: boolean;
	cta: string;
	image: string;
	/** Título do produto na loja — quando presente, o botão leva à página do produto. */
	productTitle?: string;
	/** Quando true, o botão leva ao formulário de contato em vez do checkout. */
	contact?: boolean;
	note?: string;
};

export const PLANS: Plan[] = [
	{
		key: 'inicial',
		title: 'Estudo Inicial',
		price: 'R$ 777',
		period: 'entrega única',
		description: 'Uma primeira leitura do potencial da área.',
		audience: 'Indicado para uma primeira avaliação de uma área.',
		features: [
			'Mapa georreferenciado',
			'Condicionantes da área',
			'Estimativa de aproveitamento',
			'Relatório PDF',
		],
		limits: 'Sem revisões incluídas.',
		highlight: false,
		cta: 'Contratar estudo',
		image: 'deliverable',
		productTitle: 'Estudo Inicial',
	},
	{
		key: 'completo',
		title: 'Estudo Completo',
		price: 'R$ 1.790',
		period: 'entrega única',
		description: 'Análise mais aprofundada para decidir com segurança.',
		audience: 'Indicado para quem precisa de uma análise territorial detalhada.',
		features: [
			'Tudo do Estudo Inicial',
			'Análise territorial detalhada',
			'Visualização preliminar de implantação',
			'Relatório PDF ampliado',
			'Até 3 revisões',
		],
		limits: 'Até 3 revisões incluídas no plano.',
		highlight: true,
		cta: 'Contratar estudo',
		image: 'after',
		productTitle: 'Estudo Completo',
	},
	{
		key: 'assinatura',
		title: 'Assinatura Mensal',
		price: 'R$ 2.490',
		period: 'por mês',
		description: 'Para loteadoras com múltiplas áreas.',
		audience: 'Indicado para quem avalia várias áreas recorrentemente.',
		features: [
			'Até 4 estudos completos por mês',
			'Análise territorial detalhada',
			'Visualização preliminar de implantação',
			'Revisões incluídas',
			'Atendimento prioritário',
		],
		limits: 'Conforme as condições do serviço.',
		highlight: false,
		cta: 'Falar com especialista',
		contact: true,
		image: 'hero',
		note: 'Cobrança recorrente contratada sob demanda. Consulte as condições comerciais.',
	},
];

export type Differential = {
	icon: LucideIcon;
	title: string;
	description: string;
};

export const DIFFERENTIALS: Differential[] = [
	{
		icon: Map,
		title: 'Visualização territorial',
		description: 'Mapas que mostram a área e suas camadas de análise em uma única visão.',
	},
	{
		icon: Layers,
		title: 'Organização de informações',
		description: 'Dados dispersos reunidos em um relatório estruturado e legível.',
	},
	{
		icon: ShieldAlert,
		title: 'Análise preliminar de condicionantes',
		description: 'Restrições e limites mapeados antes de comprometer recursos.',
	},
	{
		icon: TrendingUp,
		title: 'Estimativas de aproveitamento',
		description: 'Cálculo preliminar do potencial construtivo e de lotes da gleba.',
	},
	{
		icon: FileText,
		title: 'Diferentes modalidades de estudo',
		description: 'Do Estudo Inicial à Assinatura Mensal, conforme a sua necessidade.',
	},
	{
		icon: Compass,
		title: 'Apoio à tomada de decisão',
		description: 'Informações territoriais que ajudam a decidir com mais clareza.',
	},
];

export type Faq = {
	question: string;
	answer: string;
};

export const FAQS: Faq[] = [
	{
		question: 'Quais arquivos posso enviar?',
		answer:
			'Shapefile, KMZ/KML, GeoJSON, planta em PDF ou CAD e a matrícula do imóvel. Quanto mais completos os arquivos e documentos, mais consistente a análise preliminar.',
	},
	{
		question: 'Preciso ter um projeto pronto?',
		answer:
			'Não. O estudo é justamente uma análise preliminar, anterior ao projeto. Ele ajuda a visualizar o potencial da área antes de investir em projetos executivos de engenharia.',
	},
	{
		question: 'O estudo apresenta mapas de satélite?',
		answer:
			'Os mapas são georreferenciados e podem incluir imagens de satélite como base cartográfica, além das camadas de análise territorial. A disponibilidade depende dos dados da área.',
	},
	{
		question: 'O que recebo ao final?',
		answer:
			'Mapas georreferenciados, análise de condicionantes, estimativa de aproveitamento, visualização preliminar de implantação e relatório PDF, conforme o plano contratado.',
	},
	{
		question: 'A quantidade de lotes é definitiva?',
		answer:
			'Não. A estimativa de lotes é preliminar e indicativa, baseada nos dados disponíveis. A quantidade final depende do projeto executivo, de levantamentos topográficos e das aprovações dos órgãos competentes.',
	},
	{
		question: 'O estudo substitui um projeto de engenharia?',
		answer:
			'Não. O estudo é preliminar e não substitui projetos executivos de engenharia, nem levantamentos topográficos, análises ambientais definitivas e análises jurídicas.',
	},
	{
		question: 'Garante aprovação na prefeitura?',
		answer:
			'Não. O estudo não garante aprovação na prefeitura nem viabilidade definitiva. Ele apoia a decisão antes de investir, mas as aprovações seguem os trâmites legais dos órgãos competentes.',
	},
	{
		question: 'Posso solicitar revisões?',
		answer:
			'Sim, conforme o plano. O Estudo Inicial não inclui revisões. O Estudo Completo inclui até 3 revisões. A Assinatura Mensal contempla revisões incluídas nos estudos completos.',
	},
	{
		question: 'Qual a diferença entre os planos?',
		answer:
			'O Estudo Inicial (R$ 777) oferece uma primeira leitura do potencial. O Estudo Completo (R$ 1.790) traz análise mais aprofundada, visualização de implantação e até 3 revisões. A Assinatura Mensal (R$ 2.490/mês) atende quem avalia várias áreas recorrentemente, com até 4 estudos completos por mês.',
	},
	{
		question: 'Como contratar?',
		answer:
			'Preencha o formulário de solicitação com os dados da área e o plano de interesse, ou fale com a equipe pelo WhatsApp. Retornamos com os próximos passos para o estudo preliminar.',
	},
];
