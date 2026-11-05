import { Link } from 'react-router';

export function TermsContent() {
	return (
		<main className="article-shell">
			<span className="section-index">TERMOS DE USO</span>
			<h1>Termos de uso.</h1>
			<section>
				<h2>Natureza do serviço</h2>
				<p>
					A Terra Potencial 360° presta serviços de inteligência territorial para análise preliminar de
					terrenos e glebas com foco em loteamentos. Os estudos entregues têm caráter preliminar e
					consultivo, destinados a apoiar a tomada de decisão antes de investir em projetos mais
					aprofundados.
				</p>
			</section>
			<section>
				<h2>Caráter preliminar dos estudos</h2>
				<p>
					Os estudos são elaborados a partir dos arquivos, documentos e dados fornecidos pelo cliente e de
					informações públicas disponíveis na data de entrega. A consistência e a precisão dos resultados
					dependem diretamente da qualidade e da completude dessas informações.
				</p>
				<p>
					Os estudos não substituem levantamentos topográficos, projetos de engenharia, análises ambientais
					definitivas, análises jurídicas e aprovações dos órgãos competentes. Não garantem aprovação na
					prefeitura, viabilidade definitiva, lucro ou eliminação de riscos.
				</p>
			</section>
			<section>
				<h2>Entregáveis</h2>
				<p>
					Os entregáveis de cada plano — mapas georreferenciados, análise de condicionantes, estimativa de
					aproveitamento, visualização preliminar de implantação e relatório PDF — são aqueles descritos na
					página de planos no momento da contratação. Imagens apresentadas no site são ilustrativas e não
					representam um loteamento real ou aprovado.
				</p>
			</section>
			<section>
				<h2>Revisões e prazos</h2>
				<p>
					As revisões incluídas seguem o plano contratado. O Estudo Inicial não inclui revisões; o Estudo
					Completo inclui até 3 revisões. Os prazos de entrega são contados após o recebimento dos arquivos
					necessários.
				</p>
			</section>
			<section>
				<h2>Pagamentos</h2>
				<p>
					Os pagamentos são processados pela integração de loja. Dados de pagamento são tratados pelo
					provedor escolhido no checkout; este site não armazena dados de cartão. A Assinatura Mensal é
					contratada sob demanda — consulte as condições comerciais.
				</p>
			</section>
			<section>
				<h2>Dados e privacidade</h2>
				<p>
					Os dados fornecidos nos formulários são tratados conforme a nossa{' '}
					<Link to="/privacidade">política de privacidade</Link> e a LGPD.
				</p>
			</section>
			<section>
				<h2>Alterações</h2>
				<p>
					Estes termos podem ser atualizados a qualquer tempo. A versão vigente é a publicada nesta página.
				</p>
			</section>
		</main>
	);
}
