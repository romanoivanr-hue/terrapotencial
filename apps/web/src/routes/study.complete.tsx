import type { Route } from './+types/study.complete';
import { StudyInfo } from '@/components/study-info';
import { seo } from '@/lib/seo';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, { title: 'Estudo Completo — Terra Potencial 360°', description: 'Confira os entregáveis do Estudo Completo antes de finalizar a compra.' });
}

export default function CompleteStudy() {
	return <StudyInfo planKey="completo" />;
}
