import { STEPS } from '@/data/site-content';

export function HowItWorks() {
	return (
		<section id="como-funciona" className="section">
			<div className="section-head center">
				<div className="section-eyebrow">COMO FUNCIONA</div>
				<h2>Do envio dos arquivos à entrega do estudo.</h2>
				<p>
					Um processo transparente, em três etapas, do recebimento dos documentos à entrega dos mapas e do
					relatório previsto no plano contratado.
				</p>
			</div>
			<div className="process-steps">
				{STEPS.map((s) => (
					<div className="step" key={s.index}>
						<div className="step-num">
							<s.icon size={26} strokeWidth={1.5} />
							<span>{s.index}</span>
						</div>
						<h3>{s.title}</h3>
						<p>{s.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
