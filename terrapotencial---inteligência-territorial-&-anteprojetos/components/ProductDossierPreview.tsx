import React, { useState } from 'react';
import { FileText, CheckCircle2, ChevronRight, ChevronLeft, Eye, ShieldCheck, Download } from 'lucide-react';

export const ProductDossierPreview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const pages = [
    {
      page: 'CAPA',
      title: 'Apresentação Executiva',
      subtitle: 'Dossiê de Diagnóstico Territorial e Anteprojeto',
      content: 'Identificação oficial da propriedade, requerente, data de emissão, georreferenciamento e chancela técnica TerraPotencial.',
      tag: '00 — IDENTIFICAÇÃO'
    },
    {
      page: '01',
      title: 'Resumo Executivo & Localização',
      subtitle: 'Inserção Urbana e Malha Regional',
      content: 'Mapeamento de confrontações, rodovias de acesso, distâncias para polos urbanos e posicionamento geográfico SIRGAS 2000.',
      tag: '01 — LOCALIZAÇÃO'
    },
    {
      page: '02',
      title: 'Análise Territorial & Restrições',
      subtitle: 'APPs, Cursos d’água e Topografia',
      content: 'Mapeamento das faixas de preservação hídrica, corpos d’água perenes, curvas de nível e classificação de declividade.',
      tag: '02 — CONDICIONANTES'
    },
    {
      page: '03',
      title: 'Área Efetivamente Aproveitável',
      subtitle: 'Descontos Ambientais e Solo Loteável',
      content: 'Demonstração matemática dos m² brutos vs. m² líquidos edificáveis para loteamento ou condomínio fechado.',
      tag: '03 — APROVEITAMENTO'
    },
    {
      page: '04',
      title: 'Anteprojeto Urbanístico Preliminar',
      subtitle: 'Traçado Viário, Quadras e Lotes',
      content: 'Planta de implantação preliminar com hierarquia viária, sistema de circulação, distribuição de quadras e áreas públicas.',
      tag: '04 — ANTEPROJETO'
    },
    {
      page: '05',
      title: 'Quadro Geral de Áreas & Próximos Passos',
      subtitle: 'Balanço Territorial & Diretrizes Técnicas',
      content: 'Tabela oficial discriminando: Área Loteável (%), Sistema Viário (%), Áreas Verdes (%), Áreas Institucionais (%) e estimativa de lotes.',
      tag: '05 — CONCLUSÕES'
    }
  ];

  return (
    <section id="dossie-pdf" className="py-20 bg-slate-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
            O Que Você Irá Receber
          </span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-white">
            Não entregamos apenas um mapa.
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Entregamos uma <strong className="text-white font-semibold">visão estruturada do potencial da sua propriedade</strong> em formato de apresentação executiva de alto padrão para você negociar com sócios, prefeituras ou loteadores.
          </p>
        </div>

        {/* Dossier Mockup Slide Viewer */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Navigation thumbnail list */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-mono uppercase text-slate-400 mb-3 px-1">Páginas do Dossiê Final (PDF):</p>
            {pages.map((p, idx) => (
              <button
                key={p.page}
                onClick={() => setActiveSlide(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  activeSlide === idx
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-white font-bold shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    activeSlide === idx ? 'bg-emerald-500 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {p.page}
                  </span>
                  <span className="truncate max-w-[180px]">{p.title}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
              </button>
            ))}
          </div>

          {/* Slide Preview Page Visual */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-slate-900 to-[#070d19] border-2 border-slate-700/80 p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Subtle page watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-5 font-mono text-7xl font-black text-white pointer-events-none select-none">
                TERRAPRO
              </div>

              {/* Page Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                    {pages[activeSlide].tag}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-white mt-0.5">
                    {pages[activeSlide].title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {pages[activeSlide].subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    DOSSIÊ TR-2026-000123
                  </span>
                </div>
              </div>

              {/* Simulated Diagram / Graphics Box */}
              <div className="my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex-1 flex flex-col justify-center">
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {pages[activeSlide].content}
                </p>

                {/* Mini graphical mock indicators */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Metodologia</span>
                    <strong className="text-emerald-400">SIG Vetorial</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Resolução</span>
                    <strong className="text-teal-300">Alta Definição</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Conformidade</span>
                    <strong className="text-white">Lei 6.766 / 13.465</strong>
                  </div>
                </div>
              </div>

              {/* Page Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                <span>ESTUDO PRELIMINAR DE VIABILIDADE • NÃO SUBSTITUI PROJETOS EXECUTIVOS</span>
                <span>Página {activeSlide + 1} de {pages.length}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
