import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { PLANS } from '@/data/site-content';
import { DELIVERABLE_IMAGE, AFTER_IMAGE, HERO_IMAGE } from '@/constants/site';
import type { ProductListItem } from '@/api/ecommerce-api';

const PLAN_IMAGES: Record<string, string> = {
	deliverable: DELIVERABLE_IMAGE,
	after: AFTER_IMAGE,
	hero: HERO_IMAGE,
};

export function Plans({ products }: { products: ProductListItem[] }) {
	return (
		<section id="planos" className="section plans">
			<div className="section-head center">
				<div className="section-eyebrow">PLANOS E PREÇOS</div>
				<h2>Escolha o estudo para a sua decisão.</h2>
				<p>
					Do primeiro diagnóstico à análise recorrente de múltiplas áreas. Destacamos o Estudo Completo sem
					esconder as demais opções.
				</p>
			</div>
			<div className="plans-grid">
				{PLANS.map((plan) => {
					const product = plan.productTitle
						? products.find((p) => p.title === plan.productTitle)
						: undefined;
					const href = plan.infoPath
						? `/?plano=estudo_${plan.key}#contato`
						: plan.checkoutUrl ?? (plan.contact
						? '/#contato'
						: product
							? `/product/${product.url_handle}`
							: '/#contato');
					return (
						<div className={plan.highlight ? 'plan highlight' : 'plan'} key={plan.key}>
							{plan.highlight && <span className="plan-badge">RECOMENDADO</span>}
							<div className="plan-media">
								<img
									src={PLAN_IMAGES[plan.image]}
									alt={`Exemplo de entregável do ${plan.title}`}
									loading="lazy"
								/>
								<span className="plan-media-label">ILUSTRATIVO</span>
							</div>
							<div className="plan-body">
								<h3>{plan.title}</h3>
								<p className="plan-desc">{plan.description}</p>
								<div className="plan-price">
									<strong>{plan.price}</strong>
									<span className="plan-period">{plan.period}</span>
								</div>
								<p className="plan-audience">{plan.audience}</p>
								<ul className="plan-features">
									{plan.features.map((f) => (
										<li key={f}>
											<Check size={15} strokeWidth={2.5} className="plan-check" />
											{f}
										</li>
									))}
								</ul>
								<p className="plan-limits">{plan.limits}</p>
								{plan.checkoutUrl && !plan.infoPath ? (
									<a
										href={href}
										className={plan.highlight ? 'button accent' : 'button'}
										target="_blank"
										rel="noopener noreferrer"
									>
										{plan.cta} <ArrowUpRight size={17} />
									</a>
								) : (
									<Link to={href} className={plan.highlight ? 'button accent' : 'button'}>
										{plan.cta} <ArrowUpRight size={17} />
									</Link>
								)}
								{plan.note && <p className="plan-note">{plan.note}</p>}
							</div>
						</div>
					);
				})}
			</div>
			<p className="plans-disclaimer">
				Os estudos são preliminares e não substituem projetos executivos nem aprovações técnicas e legais junto
				aos órgãos competentes. Imagens ilustrativas · não representam um loteamento real ou aprovado.
			</p>
		</section>
	);
}
