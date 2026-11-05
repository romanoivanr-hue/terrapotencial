import { Link } from 'react-router';
import { openCookiePreferences } from '@/lib/cookie-consent';
import { whatsappUrl } from '@/lib/contact-links';
import { LOGO_IMAGE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CONTACT_EMAIL, SITE_NAME } from '@/constants/site';

export function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="footer-grid">
				<div>
					<div className="footer-brand">
						<img className="brand-logo" src={LOGO_IMAGE} alt="Terra Potencial 360°" />
					</div>
					<p>
						Inteligência territorial para análise preliminar de terrenos para loteamentos. Estudos que
						ajudam a visualizar o potencial antes de investir.
					</p>
				</div>
				<div className="footer-col">
					<h4>NAVEGAÇÃO</h4>
					<Link to="/#entregaveis">Entregáveis</Link>
					<Link to="/#como-funciona">Como funciona</Link>
					<Link to="/#planos">Planos</Link>
					<Link to="/#faq">Perguntas frequentes</Link>
				</div>
				<div className="footer-col">
					<h4>CONTATO</h4>
					<a
						href={whatsappUrl({ phone: WHATSAPP_NUMBER, text: WHATSAPP_MESSAGE })}
						target="_blank"
						rel="noopener noreferrer"
					>
						WhatsApp comercial
					</a>
					<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
					<Link to="/#contato">Solicitar análise</Link>
					<Link to="/privacidade">Política de privacidade</Link>
					<Link to="/termos">Termos de uso</Link>
				</div>
			</div>
			<div className="footer-bottom">
				<span>
					© 2026 {SITE_NAME} · Estudos preliminares, não substituem projetos e aprovações técnicas e legais.
				</span>
				<div>
					<Link to="/privacidade">Privacidade</Link>
					<Link to="/termos">Termos de uso</Link>
					<button onClick={openCookiePreferences}>Preferências de cookies</button>
				</div>
			</div>
		</footer>
	);
}
