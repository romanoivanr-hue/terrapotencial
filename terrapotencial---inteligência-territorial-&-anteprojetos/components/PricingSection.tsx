import React from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles, Clock, Video, Users, Layers, CalendarCheck } from 'lucide-react';
import { PRICING_PLANS } from '../constants';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenDeployHelp?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, onOpenDeployHelp }) => {
  return (
    <section id="preco" className="py-24 relative overflow-hidden bg-[#070c16] border-t border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
            Planos & Soluções Comerciais
          </span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-white">
            Quanto custa descobrir o potencial da sua terra?
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Elimine meses de incerteza e custos de dezenas de milhares de reais antes de contratar projetos executivos de engenharia.
          </p>
        </div>

        {/* 3 Structured Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#0f1d2e] via-slate-900 to-[#0b1322] border-2 border-emerald-500/60 shadow-2xl shadow-emerald-950/40 lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-xl text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-6">
                    {plan.price > 0 ? (
                      <div>
                        {plan.originalPrice && (
                          <span className="text-xs text-slate-500 line-through block">
                            De R$ {plan.originalPrice.toLocaleString('pt-BR')}
                          </span>
                        )}
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-sm font-bold text-slate-400">R$</span>
                          <span className="font-display font-black text-3xl sm:text-4xl text-white">
                            {plan.price.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">à vista</span>
                        </div>
                        {plan.installments && (
                          <p className="text-xs text-emerald-400 font-medium mt-1">
                            ou em até {plan.installments}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs text-amber-400 font-mono font-bold block uppercase tracking-wider">
                          Recorrência Mensal
                        </span>
                        <span className="font-display font-black text-2xl text-white block mt-1">
                          Sob Demanda
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Alinhamento e contratação em reunião técnica
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Technical Support Specifications */}
                  <div className="space-y-2 mb-6 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Revisões Inclusas:</span>
                      <strong className="text-white">
                        {plan.revisionsCount === 99 ? 'Ilimitadas/Contínuas' : `${plan.revisionsCount} adequação(ões)`}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 pt-1.5 border-t border-slate-800/60">
                      <span>Reunião Técnica Online:</span>
                      <strong className={plan.includesMeeting ? 'text-emerald-400' : 'text-slate-500'}>
                        {plan.includesMeeting ? 'Inclusa (Meeting)' : 'Não Inclusa'}
                      </strong>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-500 text-center block mt-2">
                    Emissão de nota fiscal e protocolo técnico imediato
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Pagamento 100% seguro via <strong>Asaas</strong>, <strong>Mercado Pago</strong> e <strong>Stripe</strong>. Suporte a PIX, Boleto e Cartão em até 12x.
            </span>
          </div>

          {onOpenDeployHelp && (
            <button
              onClick={onOpenDeployHelp}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold whitespace-nowrap"
            >
              Guia: Como Conectar seu Domínio
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
