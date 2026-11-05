import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact-links';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/constants/site';

export function WhatsappButton() {
	return (
		<a
			className="whatsapp-fab"
			href={whatsappUrl({ phone: WHATSAPP_NUMBER, text: WHATSAPP_MESSAGE })}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Falar no WhatsApp"
		>
			<MessageCircle size={26} strokeWidth={1.8} />
		</a>
	);
}
