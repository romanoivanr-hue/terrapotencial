import { Form } from 'react-router';
import type { Route } from './+types/offers';
import { seo } from '@/lib/seo';
import { getProducts, EcommerceApiError } from '@/api/ecommerce-api';
import { ProductGrid } from '@/components/product-grid';
import { HERO_IMAGE } from '@/constants/site';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Estudos disponíveis — Terra Potencial 360°',
		description:
			'Consulte os estudos preliminares de análise territorial disponíveis e avance para a contratação online.',
		image: HERO_IMAGE,
		jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Estudos disponíveis' },
	});
}

export async function loader({ url }: Route.LoaderArgs) {
	try {
		const q = url.searchParams.get('q') || '';
		const page = Math.max(1, Number(url.searchParams.get('pagina')) || 1);
		const result = await getProducts({
			limit: 2000,
			exclude_types: 'subscription',
			sort_by: 'order',
			order: 'ASC',
		});
		const filtered = result.products.filter((p) =>
			p.title.toLocaleLowerCase('pt-BR').includes(q.toLocaleLowerCase('pt-BR')),
		);
		return {
			products: filtered.slice((page - 1) * 24, page * 24),
			q,
			page,
			pages: Math.ceil(filtered.length / 24),
			filteredCount: filtered.length,
		};
	} catch (error) {
		if (error instanceof EcommerceApiError && error.status === 404) {
			throw new Response('Não encontrado', { status: 404 });
		}
		throw error;
	}
}

export default function OffersPage({ loaderData: d }: Route.ComponentProps) {
	return (
		<main className="page-shell">
			<span className="section-eyebrow">ESTUDOS DISPONÍVEIS</span>
			<h1>Estudos para a sua decisão.</h1>
			<p className="page-intro">
				Escolha o estudo preliminar ideal para analisar o potencial da sua área antes de investir.
			</p>
			<Form method="get" className="search-form">
				<label htmlFor="q">Buscar estudo</label>
				<div>
					<input id="q" name="q" defaultValue={d.q} placeholder="Digite o nome do estudo" />
					<button className="button">Buscar</button>
				</div>
			</Form>
			{d.q && !d.filteredCount ? (
				<div className="empty-state">
					<p>Nenhum estudo encontrado para “{d.q}”.</p>
					<a href="/ofertas" className="inline-link">
						Limpar busca
					</a>
				</div>
			) : (
				<ProductGrid products={d.products} />
			)}
			<div className="pagination">
				{d.page > 1 && (
					<a href={`?q=${encodeURIComponent(d.q)}&pagina=${d.page - 1}`}>Página anterior</a>
				)}
				{d.page < d.pages && (
					<a href={`?q=${encodeURIComponent(d.q)}&pagina=${d.page + 1}`}>Próxima página</a>
				)}
			</div>
		</main>
	);
}
