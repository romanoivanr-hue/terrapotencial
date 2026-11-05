import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

export function FinalCta() {
	return (
		<section className="final-cta">
			<div className="final-cta-inner">
				<div className="section-eyebrow">PRÓXIMO PASSO</div>
				<h2>Analise sua área antes de investir.</h2>
				<p>
					Envie os arquivos da sua gleba e receba um estudo preliminar com mapas, condicionantes e estimativa
					de aproveitamento.
				</p>
				<div className="hero-actions">
					<Link to="/#contato" className="button accent">
						Solicitar análise <ArrowUpRight size={18} />
					</Link>
					<Link
						to="/#planos"
						className="button outline"
						style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}
					>
						Ver planos
					</Link>
				</div>
			</div>
		</section>
	);
}
