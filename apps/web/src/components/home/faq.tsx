import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '@/data/site-content';

export function Faq() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section id="faq" className="section">
			<div className="section-head center">
				<div className="section-eyebrow">PERGUNTAS FREQUENTES</div>
				<h2>Tudo o que você precisa saber antes de contratar.</h2>
			</div>
			<div className="faq-list">
				{FAQS.map((f, i) => (
					<div className={open === i ? 'faq-item open' : 'faq-item'} key={f.question}>
						<button
							className="faq-q"
							onClick={() => setOpen(open === i ? null : i)}
							aria-expanded={open === i}
						>
							{f.question}
							<Plus size={20} />
						</button>
						<div className="faq-a">
							<p>{f.answer}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
