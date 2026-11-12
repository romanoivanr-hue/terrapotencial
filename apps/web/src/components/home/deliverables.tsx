import { DELIVERABLES } from '@/data/site-content';

export function Deliverables() {
	return (
		<section id="entregaveis" className="section">
			<div className="section-head">
				<div className="section-eyebrow">O QUE ENTREGAMOS</div>
				<h2>Dados territoriais que comunicam o potencial da área.</h2>
				<p>
					Cada estudo reúne cartografia, análise e estimativas em um único relatório, conforme o plano
					contratado.
				</p>
			</div>
			<div className="deliverables-grid">
				{DELIVERABLES.map((d) => (
					<div className="deliverable" key={d.title}>
						<div className="deliverable-icon">
							<d.icon size={22} strokeWidth={1.6} />
						</div>
						<h3>{d.title}</h3>
						<p>{d.description}</p>
					</div>
				))}
			</div>
			<p className="environmental-intro">
				Identifique as condicionantes ambientais do seu terreno. Nossos estudos apresentam um mapa com as
				restrições ambientais identificadas, incluindo Áreas de Preservação Permanente (APPs), quando
				aplicáveis, auxiliando na compreensão das limitações e do potencial de aproveitamento do imóvel.
			</p>
			<p className="technical-notice">
				<strong>Importante:</strong> linhas de transmissão de energia elétrica, gasodutos e outras interferências
				não identificadas nas bases utilizadas não são consideradas automaticamente nos estudos. Para que
				essas estruturas sejam consideradas, o cliente deverá fornecer levantamento topográfico adequado
				contendo sua localização.
			</p>
		</section>
	);
}
