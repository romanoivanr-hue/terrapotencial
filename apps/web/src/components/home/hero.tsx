import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '@/constants/site';

const SRCSET = `${HERO_IMAGE}?width=375 375w, ${HERO_IMAGE}?width=768 768w, ${HERO_IMAGE}?width=1024 1024w, ${HERO_IMAGE} 1344w`;

export function Hero() {
	return (
		<section className="hero">
			<img
				className="hero-img"
				src={HERO_IMAGE}
				srcSet={SRCSET}
				sizes="100vw"
				alt="Visualização ilustrativa de uma gleba com sobreposição de quadras, lotes, vias e áreas verdes"
				fetchPriority="high"
			/>
			<div className="hero-overlay" />
			<div className="hero-grid" />
			<div className="hero-content">
				<div className="hero-coords">INTELIGÊNCIA TERRITORIAL · VISUALIZAÇÃO ILUSTRATIVA</div>
				<h1>
					Antes de investir em uma área, <em>visualize o potencial</em> dela.
				</h1>
				<p className="hero-sub">
					A Terra Potencial 360° transforma dados territoriais em mapas e análises preliminares, para que
					loteadoras, corretores e proprietários decidam com clareza antes de comprometer recursos.
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
				<div className="hero-note">Imagem ilustrativa · não representa um loteamento real</div>
			</div>
		</section>
	);
}
