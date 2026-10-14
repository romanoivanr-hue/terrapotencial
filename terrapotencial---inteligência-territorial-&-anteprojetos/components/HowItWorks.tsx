import React from 'react';
import { UploadCloud, SearchCheck, Layers, FileSignature, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Localize sua terra',
      desc: 'Envie um arquivo KMZ, KML, DWG ou simplesmente informe cidade e estado. Sem exigir 10 certidões.',
      icon: UploadCloud
    },
    {
      num: '02',
      title: 'Prévia Gratuita Instantânea',
      desc: 'Nosso sistema delimita o polígono, calcula o perímetro e identifica as coordenadas oficiais da gleba.',
      icon: SearchCheck
    },
    {
      num: '03',
      title: 'Contratação do Estudo Completo',
      desc: 'Libere o cruzamento ambiental, zoneamento, estimativa de lotes e o anteprojeto urbanístico detalhado.',
      icon: FileSignature
    },
    {
      num: '04',
      title: 'Dossiê Executivo em PDF',
      desc: 'Receba a apresentação técnica completa, quadro de áreas e plantas prontas para investidores.',
      icon: Layers
    }
  ];

  return (
    <section id="como-funciona" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
            Jornada Sem Fricção
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white">
            Como funciona a análise territorial
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            O primeiro contato é simples e sem barreiras. Primeiro você visualiza sua propriedade; depois decide avançar para o estudo executivo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.num}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display font-bold text-2xl text-slate-600 group-hover:text-emerald-400 transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center text-[11px] text-emerald-400 font-semibold gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Etapa do processo</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
