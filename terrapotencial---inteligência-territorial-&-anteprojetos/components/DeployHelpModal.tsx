import React from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';

interface DeployHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployHelpModal: React.FC<DeployHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Como Resolver o Erro de OAuth no Deploy
              </h3>
              <p className="text-xs text-slate-400">
                "Empty Google Account OAuth client ID(s)/secret(s)"
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Instructions */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300">
          
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
            <strong>Por que esse erro acontece?</strong>
            <p className="mt-1 text-slate-300">
              O painel de deploy do Google Cloud / Vertex AI Studio tenta proteger a aplicação solicitando autenticação por conta Google, mas o formulário de credenciais ficou vazio.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>
              <span>Solução Mais Rápida: Implantar como Acesso Público</span>
            </h4>
            <div className="pl-8 space-y-2 text-xs text-slate-400">
              <p>Como o <strong>TerraPotencial</strong> é uma landing page comercial com demonstração interativa para seus clientes:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li>Volte à tela de <strong>Implantar (Deploy)</strong>.</li>
                <li>Na seção de <strong>Autenticação (Authentication)</strong>, selecione <strong>"Allow unauthenticated invocations" (Permitir acesso público)</strong>.</li>
                <li>Desmarque o requisito de <em>"Google Account OAuth"</em>.</li>
                <li>Clique em <strong>Implantar</strong> novamente. O build irá rodar perfeitamente sem travar.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 pt-3 border-t border-slate-800">
            <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs flex items-center justify-center font-bold">2</span>
              <span>Solução se precisar de login obrigatório com Google:</span>
            </h4>
            <div className="pl-8 space-y-2 text-xs text-slate-400">
              <p>Caso a sua empresa exija login restrito via conta Google Workspace:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>Acesse o <strong>Google Cloud Console &gt; APIs e Serviços &gt; Credenciais</strong>.</li>
                <li>Clique em <strong>Criar Credenciais &gt; ID do cliente OAuth</strong> (Aplicativo da Web).</li>
                <li>Copie o <strong>Client ID</strong> e o <strong>Client Secret</strong> gerados.</li>
                <li>Cole-os nos campos da tela de Deploy e prossiga.</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Aplicação pronta e otimizada para execução.
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
