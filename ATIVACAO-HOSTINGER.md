# Ativação final na Hostinger

## O que já está pronto no código

- Imagens realistas locais em `apps/web/public/assets/`, sem dependência do CDN antigo.
- Logotipo oficial com transparência no cabeçalho, rodapé e favicon.
- Formulário com validação, armazenamento na coleção `contatos` e notificação para `ivan@eusouivanromano.com.br`.
- Mensagem de e-mail com todos os campos do formulário e `reply-to` do visitante.
- Build, tipagem e lint aprovados.

## Formulário e e-mail

O hook `apps/pocketbase/pb_hooks/contact-notification.pb.js` utiliza o mailer do PocketBase. Na Hostinger, ele aproveita o mailer interno já incluído no projeto quando SMTP próprio não está habilitado.

Antes do teste final:

1. Publicar esta versão completa, incluindo `apps/pocketbase/pb_hooks/`.
2. No painel do PocketBase/Hostinger, conferir o remetente em **Settings > Mail settings**.
3. Se optar por SMTP próprio, informar host, porta, usuário, senha e remetente somente no painel/segredo do servidor. Nunca colocar a senha no repositório.
4. Enviar um lead de teste e confirmar simultaneamente:
   - criação do registro na coleção `contatos`;
   - recebimento em `ivan@eusouivanromano.com.br`;
   - resposta de sucesso no site.

## Checkout atual

O projeto usa a loja nativa da Hostinger, canal `scha_01M6NZETYG7CTBW707HA12YE04`. A API pública foi verificada em 5 de novembro de 2026:

- Estudo Inicial: R$ 777,00, produto ativo.
- Estudo Completo: R$ 1.790,00, produto ativo.
- Assinatura Mensal: ainda não existe como produto da loja; o botão continua direcionando ao contato.

Para ativar pagamentos reais dos dois estudos, entrar em **Loja online > Configurações da loja > Pagamentos** e conectar a conta Stripe/PayPal compatível com o negócio. Essa etapa exige login, verificação cadastral e autorização do titular.

A loja nativa não expõe no código exportado uma configuração própria de webhook nem um tipo de produto recorrente. A cobrança mensal de R$ 2.490,00 deve ser criada em um provedor com assinaturas e webhooks, como Stripe Billing ou Mercado Pago, e integrada ao servidor com segredos de produção. Para isso serão necessários:

- acesso/autorização na conta do provedor;
- identificadores de preço de produção para os três planos;
- segredo do webhook armazenado no servidor;
- URL pública definitiva para o endpoint de webhook;
- decisão sobre os meios de pagamento habilitados, inclusive PIX quando compatível com o fluxo escolhido.

Não realizar cobrança real como teste. Primeiro validar em sandbox e, depois, fazer uma compra real de valor integral somente com autorização expressa.
