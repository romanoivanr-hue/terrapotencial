import React from 'react';
import { HelpCircle, CheckCircle, AlertTriangle, Compass, TrendingUp, ShieldAlert, GitFork } from 'lucide-react';

export const PromiseSection: React.FC = () => {
  return (
    <section id="metodologia" className="py-20 bg-slate-950/80 border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
            A Transparência Que Falta No Mercado
          </span>
          <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-white">
            Você tem uma terra. Nós ajudamos você a enxergar o potencial dela.
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Muitas vezes o proprietário ou investidor sabe apenas: <strong className="text-white font-semibold">"Tenho 50, 100 ou 250 hectares."</strong> Mas sem inteligência territorial, não sabe o que realmente pode ser construído ou negociado.
          </p>
        </div>

        {/* Comparative 2 columns */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* What users usually know (Dúvidas e Incertezas) */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">O Que O Proprietário Costuma Saber:</h3>
                  <p className="text-xs text-slate-400">Cenário tradicional sem análise preliminar</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✕</span>
                  <span>"Tenho tantos hectares na escritura, mas quanto disso dá para lotear?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✕</span>
                  <span>Incerteza sobre onde ficam os córregos, topos de morro e faixas de APP obrigatórias.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✕</span>
                  <span>Dúvida sobre a viabilidade de ligação viária com a rodovia principal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✕</span>
                  <span>Risco de contratar projetos executivos caríssimos antes de saber se a conta fecha.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✕</span>
                  <span>Dificuldade em negociar com loteadoras por não saber o real VGV da terra.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 italic">
              Resultado: Decisões tomadas no escuro ou anos de propriedade parada sem gerar valor.
            </div>
          </div>

          {/* What TerraPotencial reveals */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-900/90 border border-emerald-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">O Que Nossa Plataforma Revela:</h3>
                  <p className="text-xs text-emerald-400">Visão técnica estruturada e inteligência comercial</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Área líquida aproveitável:</strong> Saiba exatamente quantos m² sobram após descontos ambientais.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mapeamento de condicionantes:</strong> Identificação de APPs hídricas, declividades e restrições.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Acessos e sistema viário preliminar:</strong> Diretrizes de circulação e conectividade urbana.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Estimativa de lotes e tipologias:</strong> Quantos lotes (ex: 360m², 450m² ou 1.000m²) cabem na área.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dossiê executivo completo:</strong> Documento profissional para negociar com sócios e investidores.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/20 text-xs font-semibold text-emerald-300">
              Transformamos incerteza territorial em poder de decisão e negociação sólida.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
