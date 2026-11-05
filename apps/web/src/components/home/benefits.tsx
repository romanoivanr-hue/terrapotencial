import { BENEFITS } from '@/data/site-content';

export function Benefits() {
	return (
		<section id="beneficios" className="section">
			<div className="section-head">
				<div className="section-eyebrow">PROBLEMA E BENEFÍCIOS</div>
				<h2>Uma área pode parecer uma grande oportunidade. Mas você conhece seu potencial?</h2>
				<p>
					Uma gleba pode apresentar características territoriais que afetam seu aproveitamento — topografia,
					restrições, condicionantes e contexto regional. Avaliar somente números não é suficiente para decidir
					com segurança.
				</p>
				<p>
					A Terra Potencial 360° ajuda a transformar dados territoriais em análises preliminares, para que
					você decida com clareza antes de comprometer recursos.
				</p>
			</div>
			<div className="benefits-grid">
				{BENEFITS.map((b) => (
					<div className="benefit" key={b.title}>
						<div className="benefit-icon">
							<b.icon size={24} strokeWidth={1.6} />
						</div>
						<h3>{b.title}</h3>
						<p>{b.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
