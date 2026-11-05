import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BEFORE_IMAGE, AFTER_IMAGE } from '@/constants/site';

export function Demo() {
	return (
		<section id="demonstracao" className="section demo">
			<div className="section-head">
				<div className="section-eyebrow">DEMONSTRAÇÃO VISUAL</div>
				<h2>Do terreno bruto à visualização do potencial.</h2>
				<p>
					Veja como as camadas de análise e a implantação preliminar revelam o que a área pode se tornar.
				</p>
			</div>
			<div className="demo-compare">
				<div className="demo-card">
					<img src={BEFORE_IMAGE} alt="Terreno bruto sem análise" loading="lazy" />
					<div className="demo-card-label">
						<span>Terreno original</span>
						<span>ANTES</span>
					</div>
				</div>
				<div className="demo-card">
					<img src={AFTER_IMAGE} alt="Terreno com camadas de análise e implantação preliminar" loading="lazy" />
					<div className="demo-card-label">
						<span>Com análise e implantação</span>
						<span>DEPOIS</span>
					</div>
				</div>
			</div>
			<p className="demo-caption">
				Imagens ilustrativas de demonstração · não representam uma área real, imagem de satélite comprovada ou loteamento aprovado. A utilização de base de satélite licenciada e de dados reais da área depende de configuração e disponibilidade.
			</p>
			<div style={{ textAlign: 'center', marginTop: '34px' }}>
				<Link to="/#contato" className="button accent">
					Solicitar análise da minha área <ArrowUpRight size={17} />
				</Link>
			</div>
		</section>
	);
}
