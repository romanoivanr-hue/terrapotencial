import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import { PLANS } from '@/data/site-content';

const NOTICE =
	'Importante: linhas de transmissão de energia elétrica, gasodutos e outras interferências não identificadas nas bases utilizadas não são consideradas automaticamente nos estudos. Para que essas estruturas sejam consideradas, o cliente deverá fornecer levantamento topográfico adequado contendo sua localização.';

export function StudyInfo({ planKey }: { planKey: 'inicial' | 'completo' }) {
	const plan = PLANS.find((item) => item.key === planKey)!;
	const image = `/assets/mapa-condicionantes-estudo-${planKey}.png`;

	return (
		<main className="study-info page-shell">
			<Link to="/#planos" className="inline-link">← Voltar aos planos</Link>
			<div className="study-info-grid">
				<div className="study-info-media">
					<img src={image} alt={`Imagem ilustrativa do mapa de condicionantes do ${plan.title}`} />
				</div>
				<div className="study-info-copy">
					<span className="section-index">CONFIRA ANTES DE FINALIZAR</span>
					<h1>{plan.title}</h1>
					<p className="study-price">{plan.price} <span>{plan.period}</span></p>
					<p className="study-lead">{plan.description} {plan.audience}</p>
					<h2>O que você receberá</h2>
					<ul className="study-feature-list">
						{plan.features.map((feature) => (
							<li key={feature}><Check size={17} />{feature}</li>
						))}
					</ul>
					<p className="study-environmental">
						O estudo apresenta um mapa com as condicionantes ambientais identificadas, incluindo Áreas de
						Preservação Permanente (APPs), quando aplicáveis.
					</p>
					<p className="study-limits">{plan.limits}</p>
					<a className="button accent" href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
						FINALIZAR COMPRA <ArrowUpRight size={18} />
					</a>
				</div>
			</div>
			<p className="technical-notice">{NOTICE}</p>
		</main>
	);
}
