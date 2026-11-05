import { DELIVERABLE_IMAGE } from '@/constants/site';
import { DIFFERENTIALS } from '@/data/site-content';

export function Trust() {
	return (
		<section id="confianca" className="section">
			<div className="trust-top">
				<div>
					<div className="section-eyebrow">DIFERENCIAIS</div>
					<h2>Mais clareza para avaliar oportunidades imobiliárias.</h2>
					<p>
						Cada estudo entrega mapas georreferenciados e uma visualização preliminar de implantação. O
						processo é transparente, do envio dos arquivos à entrega do relatório.
					</p>
					<p>
						Os estudos são preliminares e dependem dos documentos, dados e características da área. Não substituem levantamentos topográficos, projetos de engenharia, análises ambientais definitivas, análises jurídicas ou aprovações dos órgãos competentes, nem garantem aprovação, viabilidade definitiva, lucro ou eliminação de riscos.
					</p>
				</div>
				<div>
					<img
						className="trust-img"
						src={DELIVERABLE_IMAGE}
						alt="Exemplo de mapa entregável georreferenciado"
						loading="lazy"
					/>
					<div className="trust-img-label">EXEMPLO DE ENTREGÁVEL · ILUSTRATIVO</div>
				</div>
			</div>
			<div className="differentials">
				{DIFFERENTIALS.map((d) => (
					<div className="differential" key={d.title}>
						<div className="differential-icon">
							<d.icon size={20} strokeWidth={1.6} />
						</div>
						<h3>{d.title}</h3>
						<p>{d.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
