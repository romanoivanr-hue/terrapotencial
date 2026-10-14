import React from 'react';
import { X, Globe, Key, Server, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

interface DomainDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainDeployGuideModal: React.FC<DomainDeployGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Guia: Como Colocar Online no Seu Domínio
              </h3>
              <p className="text-xs text-slate-400">
                Passo a passo de publicação e vinculação do gateway de pagamento
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* STEP 1: CONTRATAR DOMÍNIO */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center">1</span>
              <h4>Contratar e Apontar seu Domínio Próprio</h4>
            </div>
            <p className="text-xs text-slate-400 pl-8">
              Você pode registrar seu domínio no <strong>Registro.br</strong> (ex: <code>seunome.com.br</code>) ou na Hostinger/GoDaddy.
            </p>
            <div className="pl-8 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 text-emerald-300">
              Tipo A: @ &rarr; IP do seu servidor de hospedagem<br />
              Tipo CNAME: www &rarr; cname.seudominio.com.br
            </div>
          </div>

          {/* STEP 2: HOSPEDAGEM WEB */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs flex items-center justify-center">2</span>
              <h4>Hospedagem da Aplicação (Frontend React)</h4>
            </div>
            <p className="text-xs text-slate-400 pl-8">
              A aplicação é um Single Page Application (SPA) moderna sem dependências pesadas de backend inicial.
            </p>
            <ul className="list-disc pl-12 text-xs text-slate-300 space-y-1">
              <li>Pode ser hospedada gratuitamente e em alta velocidade na <strong>Vercel</strong>, <strong>Netlify</strong> ou <strong>Cloudflare Pages</strong>.</li>
              <li>Basta conectar o repositório ou fazer o upload dos arquivos da pasta raiz.</li>
              <li>O SSL (HTTPS) é configurado automaticamente com 1 clique.</li>
            </ul>
          </div>

          {/* STEP 3: VINCULAR PAGAMENTOS */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center">3</span>
              <h4>Como Vincular a Plataforma de Pagamento</h4>
            </div>
            <p className="text-xs text-slate-400 pl-8">
              Recomendamos o <strong>Asaas</strong> ou <strong>Mercado Pago</strong> para recebimentos via PIX imediato, Cartão até 12x e Boletos:
            </p>
            <ol className="list-decimal pl-12 text-xs text-slate-300 space-y-1.5">
              <li>Crie uma conta jurídica no <strong>Asaas</strong> (asaas.com) ou <strong>Mercado Pago Developers</strong>.</li>
              <li>Vá em <strong>Configurações da Conta &gt; Integrações &gt; Chaves de API</strong>.</li>
              <li>Gere sua <strong>API Key de Produção</strong> e o segredo de Webhook.</li>
              <li>No arquivo <code>services/paymentService.ts</code>, configure a variável <code>ASAAS_API_KEY</code> com a sua chave.</li>
              <li>O valor das vendas cai direto na sua conta bancária com liquidação D+0 (PIX).</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Arquitetura pronta para produção comercial.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
