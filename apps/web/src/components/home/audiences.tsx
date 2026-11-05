import { AUDIENCES } from '@/data/site-content';

export function Audiences() {
	return (
		<section id="para-quem-e" className="section audiences">
			<div className="section-head center">
				<div className="section-eyebrow">PARA QUEM É</div>
				<h2>Inteligência territorial para diferentes decisões.</h2>
				<p>
					Seja para avaliar uma oportunidade, apresentar uma propriedade ou entender melhor sua terra, os
					estudos preliminares apoiam cada etapa.
				</p>
			</div>
			<div className="audiences-grid">
				{AUDIENCES.map((a) => (
					<div className="audience" key={a.label}>
						<div className="audience-icon">
							<a.icon size={26} strokeWidth={1.5} />
						</div>
						<div className="audience-label">{a.label}</div>
						<h3>{a.title}</h3>
						<p>{a.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
