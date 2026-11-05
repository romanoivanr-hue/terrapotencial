import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { getProducts, EcommerceApiError } from '@/api/ecommerce-api';
import { HERO_IMAGE } from '@/constants/site';
import { FAQS } from '@/data/site-content';
import { Hero } from '@/components/home/hero';
import { Deliverables } from '@/components/home/deliverables';
import { Demo } from '@/components/home/demo';
import { Benefits } from '@/components/home/benefits';
import { HowItWorks } from '@/components/home/how-it-works';
import { Audiences } from '@/components/home/audiences';
import { Plans } from '@/components/home/plans';
import { Trust } from '@/components/home/trust';
import { Faq } from '@/components/home/faq';
import { FinalCta } from '@/components/home/final-cta';
import { Contact } from '@/components/home/contact';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Terra Potencial 360° — visualize o potencial de uma área antes de investir',
		description:
			'Análise de terrenos para loteamento, estudo preliminar de glebas e potencial de aproveitamento com mapas e inteligência territorial imobiliária.',
		image: HERO_IMAGE,
		jsonLd: [
			{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Terra Potencial 360°' },
			{
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: 'Terra Potencial 360°',
				description:
					'Inteligência territorial para análise preliminar de terrenos para loteamentos.',
			},
			{
				'@context': 'https://schema.org',
				'@type': 'Service',
				serviceType: 'Estudo preliminar de loteamento e análise territorial',
				provider: { '@type': 'Organization', name: 'Terra Potencial 360°' },
				description:
					'Análise preliminar de terrenos para loteamentos: mapas georreferenciados, condicionantes e estimativa de aproveitamento.',
			},
			{
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: FAQS.map((f) => ({
					'@type': 'Question',
					name: f.question,
					acceptedAnswer: { '@type': 'Answer', text: f.answer },
				})),
			},
		],
	});
}

export async function loader() {
	try {
		const { products } = await getProducts({
			limit: 24,
			exclude_types: 'subscription',
			sort_by: 'order',
			order: 'ASC',
		});
		return { products };
	} catch (error) {
		if (error instanceof EcommerceApiError && error.status === 404) {
			throw new Response('Não encontrado', { status: 404 });
		}
		throw error;
	}
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<main>
			<Hero />
			<Deliverables />
			<Demo />
			<Benefits />
			<HowItWorks />
			<Audiences />
			<Plans products={loaderData.products} />
			<Trust />
			<Faq />
			<FinalCta />
			<Contact />
		</main>
	);
}
