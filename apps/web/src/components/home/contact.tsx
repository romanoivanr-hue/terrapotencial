import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact-links';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CONTACT_EMAIL } from '@/constants/site';

const PERFIS = [
	{ value: 'loteadora', label: 'Loteadora' },
	{ value: 'corretor', label: 'Corretor' },
	{ value: 'proprietario', label: 'Proprietário' },
	{ value: 'outro', label: 'Outro' },
];

const PLANOS = [
	{ value: 'estudo_inicial', label: 'Estudo Inicial — R$ 777' },
	{ value: 'estudo_completo', label: 'Estudo Completo — R$ 1.790' },
	{ value: 'assinatura_mensal', label: 'Assinatura Mensal — R$ 2.490/mês' },
	{ value: 'nao_definido', label: 'Ainda não sei / quero orientação' },
];

export function Contact() {
	const [searchParams] = useSearchParams();
	const wasSent = searchParams.get('enviado') === '1';
	const requestedPlan = searchParams.get('plano') ?? '';
	const selectedPlan = PLANOS.some((plan) => plan.value === requestedPlan) ? requestedPlan : '';

	return (
		<section id="contato" className="section contact">
			<div className="contact-layout">
				<div className="contact-info">
					<div className="section-eyebrow">SOLICITE SUA ANÁLISE</div>
					<h2>Vamos analisar o potencial da sua área.</h2>
					<p>
						Conte sobre a gleba e o seu objetivo. Retornamos com os próximos passos para o estudo
						preliminar.
					</p>
					<div className="contact-channels">
						<a
							className="contact-channel"
							href={whatsappUrl({ phone: WHATSAPP_NUMBER, text: WHATSAPP_MESSAGE })}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="contact-channel-icon">
								<MessageCircle size={20} strokeWidth={1.6} />
							</span>
							<span>
								<strong>WhatsApp comercial</strong>
								<span>{WHATSAPP_NUMBER}</span>
							</span>
						</a>
						<a className="contact-channel" href={`mailto:${CONTACT_EMAIL}`}>
							<span className="contact-channel-icon">
								<Mail size={20} strokeWidth={1.6} />
							</span>
							<span>
								<strong>E-mail</strong>
								<span>{CONTACT_EMAIL}</span>
							</span>
						</a>
					</div>
				</div>
				<form
					className="contact-form"
					action="https://script.google.com/macros/s/AKfycbz0y_UmesRWX-p89cbOgyl-tTe-rdnsesO5GzqgILM_DyQynomOXZrJuRB9y67yKyVe6w/exec"
					method="POST"
				>
					<input
						type="text"
						name="_honey"
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
						style={{ position: 'absolute', left: '-10000px', width: 1, height: 1 }}
					/>
					<h3>Solicitar análise preliminar</h3>
					<p>Preencha os dados e descreva a área.</p>
					<div className="form-row">
						<label>
							Nome *
							<input name="nome" placeholder="Como podemos chamar você?" required maxLength={150} />
						</label>
						<label>
							Empresa
							<input name="empresa" placeholder="Nome da empresa (opcional)" maxLength={200} />
						</label>
					</div>
					<div className="form-row">
						<label>
							WhatsApp *
							<input name="whatsapp" placeholder="(11) 99999-0000" required maxLength={30} />
						</label>
						<label>
							E-mail *
							<input name="email" type="email" placeholder="voce@exemplo.com" required />
						</label>
					</div>
					<div className="form-row">
						<label>
							Perfil *
							<select name="perfil" required defaultValue="">
								<option value="" disabled>
									Selecione…
								</option>
								{PERFIS.map((p) => (
									<option key={p.value} value={p.value}>
										{p.label}
									</option>
								))}
							</select>
						</label>
						<label>
							Plano de interesse *
							<select name="plano_interesse" required defaultValue={selectedPlan}>
								<option value="" disabled>
									Selecione…
								</option>
								{PLANOS.map((p) => (
									<option key={p.value} value={p.value}>
										{p.label}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className="form-row">
						<label>
							Localização da área *
							<input
								name="localizacao"
								placeholder="Cidade / estado da gleba"
								required
								maxLength={200}
							/>
						</label>
						<label>
							Área aproximada *
							<input
								name="area_aproximada"
								placeholder="Ex.: 50.000 m² / 5 ha"
								required
								maxLength={100}
							/>
						</label>
					</div>
					<label>
						Sobre a área e a necessidade *
						<textarea
							name="mensagem"
							placeholder="Descreva o objetivo do estudo, o estágio atual da área e informações relevantes."
							rows={4}
							maxLength={5000}
							required
						/>
					</label>
					<label
						style={{
							flexDirection: 'row',
							alignItems: 'flex-start',
							gap: 10,
							fontWeight: 400,
							fontSize: '12px',
							marginBottom: '8px',
						}}
					>
						<input
							type="checkbox"
							name="consentimento"
							required
							style={{ width: 'auto', minHeight: 'auto', marginTop: '3px' }}
						/>
						<span>
							Concordo com o tratamento dos meus dados para resposta a esta solicitação, conforme a{' '}
							<Link to="/privacidade">política de privacidade</Link> (LGPD). *
						</span>
					</label>
					<div className="form-bottom">
						<small>
							Os campos com * são obrigatórios. Seus dados são usados apenas para responder à
							solicitação.
						</small>
						<button className="button" type="submit">
							Enviar solicitação
							<ArrowUpRight size={18} />
						</button>
					</div>
					<div aria-live="polite">
						{wasSent && (
							<p className="success-text">Solicitação recebida. Entraremos em contato em breve.</p>
						)}
					</div>
				</form>
			</div>
		</section>
	);
}
