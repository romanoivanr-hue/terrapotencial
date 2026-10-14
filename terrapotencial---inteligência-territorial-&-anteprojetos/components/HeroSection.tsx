import React from 'react';
import { ArrowRight, MapPin, Layers, Sparkles, FileText, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

interface HeroSectionProps {
  onStartAnalysis: () => void;
  onExploreDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAnalysis,
  onExploreDemo
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Dynamic Background Topology & Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="topo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Topographic Contour lines mock */}
          <path d="M -100 300 Q 300 150 700 350 T 1500 200" fill="none" stroke="#10b981" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.4" />
          <path d="M -100 400 Q 400 250 900 480 T 1600 320" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M -100 520 Q 350 400 800 620 T 1700 450" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Radial soft emerald glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inteligência Territorial para Proprietários, Loteadores & Investidores</span>
          </div>
        </div>

        {/* Headline & Subheadline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
            Descubra o potencial da sua terra{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              antes de investir no projeto.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Nossa plataforma transforma dados da sua propriedade em uma análise territorial e um anteprojeto preliminar para você entender o que realmente pode ser desenvolvido no terreno.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider hover:from-emerald-400 hover:to-teal-300 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Analisar Minha Terra</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 text-slate-200 font-bold text-sm hover:bg-slate-800 hover:text-white border border-slate-700/80 backdrop-blur-sm flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Ver Demonstração Prática</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Início 100% gratuito sem cartão</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Aceita KMZ, KML, DWG ou coordenadas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sem exigência de 10 documentos de partida</span>
            </div>
          </div>
        </div>

        {/* Transformation Pipeline visual banner (TERRA -> DADOS -> ANÁLISE -> ANTEPROJETO) */}
        <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/70 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              PIPELINE DE VALIDAÇÃO TERRITORIAL
            </span>
            <span>MODELO GEOGRÁFICO INTELIGENTE</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">FASE 01</span>
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">Sua Terra</h4>
                <p className="text-xs text-slate-400 mt-1">KMZ, KML, DWG ou coordenadas do município.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                Origem Territorial
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">FASE 02</span>
                <Layers className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">Cruzamento</h4>
                <p className="text-xs text-slate-400 mt-1">APPs, hidrografia, declividade e malha viária.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-teal-400 font-semibold">
                Dados Ambientais
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">FASE 03</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">Potencial</h4>
                <p className="text-xs text-slate-400 mt-1">Área líquida aproveitável e estimativa de lotes.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                Aproveitamento Real
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 bg-emerald-950/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">FASE 04</span>
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base">Anteprojeto</h4>
                <p className="text-xs text-slate-300 mt-1">Desenho de quadras, arruamento e dossiê executivo.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300 font-bold">
                Dossiê em PDF
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
