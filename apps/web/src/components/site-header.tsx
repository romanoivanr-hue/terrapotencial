import { Link, NavLink } from 'react-router';
import { ArrowUpRight, Menu, X, MessageCircle } from 'lucide-react';
import { useDisclosure } from '@/hooks/use-disclosure';
import { whatsappUrl } from '@/lib/contact-links';
import { LOGO_IMAGE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/constants/site';

export function SiteHeader() {
	const menu = useDisclosure();
	const open = menu.isOpen;

	return (
		<header className="site-header">
			<Link to="/" className="brand" aria-label="Terra Potencial 360° — início">
				<img className="brand-logo" src={LOGO_IMAGE} alt="Terra Potencial 360°" />
			</Link>
			<nav
				{...menu.panelProps}
				aria-label="Navegação principal"
				className={open ? 'navigation is-open' : 'navigation'}
			>
				<NavLink to="/" end onClick={menu.close}>
					Início
				</NavLink>
				<Link to="/#entregaveis" onClick={menu.close}>
					Entregáveis
				</Link>
				<Link to="/#como-funciona" onClick={menu.close}>
					Como funciona
				</Link>
				<Link to="/#planos" onClick={menu.close}>
					Planos
				</Link>
				<Link to="/#contato" onClick={menu.close}>
					Contato
				</Link>
			</nav>
			<div className="header-actions">
				<a
					className="whatsapp-link"
					href={whatsappUrl({ phone: WHATSAPP_NUMBER, text: WHATSAPP_MESSAGE })}
					target="_blank"
					rel="noopener noreferrer"
				>
					<MessageCircle size={18} strokeWidth={1.6} />
					<span>WhatsApp</span>
				</a>
				<Link to="/#contato" className="button header-cta">
					Solicitar análise <ArrowUpRight size={16} />
				</Link>
				<button
					className="menu-button"
					{...menu.triggerProps}
					aria-label={open ? 'Fechar menu' : 'Abrir menu'}
				>
					{open ? <X /> : <Menu />}
				</button>
			</div>
		</header>
	);
}
