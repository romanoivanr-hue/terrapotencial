import type { Route } from './+types/terms';
import { seo } from '@/lib/seo';
import { HERO_IMAGE } from '@/constants/site';
import { TermsContent } from '@/components/terms-content';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Termos de Uso — Terra Potencial 360°',
		description:
			'Termos de uso dos serviços de inteligência territorial. Os estudos são preliminares e não substituem projetos executivos nem aprovações técnicas e legais.',
		image: HERO_IMAGE,
	});
}

export default function TermsPage() {
	return <TermsContent />;
}
