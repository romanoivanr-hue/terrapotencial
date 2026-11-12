import type { Route } from './+types/study.initial';
import { StudyInfo } from '@/components/study-info';
import { seo } from '@/lib/seo';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, { title: 'Estudo Inicial — Terra Potencial 360°', description: 'Confira os entregáveis do Estudo Inicial antes de finalizar a compra.' });
}

export default function InitialStudy() {
	return <StudyInfo planKey="inicial" />;
}
