import React from 'react';
import { Compass, ArrowRight, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onStartAnalysis: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartAnalysis }) => {
  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 pt-20 pb-12 relative overflow-hidden">
      
      {/* Final Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Sua terra pode valer mais quando você entende o que pode ser feito nela.
            </h3>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Comece localizando sua propriedade gratuitamente. Sem burocracia, sem dezenas de formulários.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onStartAnalysis}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Analisar Minha Terra Gratuitamente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                TERRA<span className="text-emerald-400">POTENCIAL</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Plataforma de inteligência territorial, cálculo de potencial imobiliário e geração de anteprojetos urbanísticos preliminares para proprietários, investidores e loteadores.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider font-mono text-[11px]">Plataforma</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#como-funciona" className="hover:text-emerald-400 transition-colors">Como Funciona</a></li>
              <li><a href="#metodologia" className="hover:text-emerald-400 transition-colors">Metodologia SIG</a></li>
              <li><a href="#dossie-pdf" className="hover:text-emerald-400 transition-colors">Dossiê Executivo</a></li>
              <li><a href="#preco" className="hover:text-emerald-400 transition-colors">Valores & Prazos</a></li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider font-mono text-[11px]">Atendimento</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Florianópolis / São Paulo / Goiânia</li>
              <li>contato@terrapotencial.com.br</li>
              <li>(48) 3200-9840</li>
              <li className="pt-2 text-[11px] text-emerald-400 font-semibold">Suporte Especializado para Glebas</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 TerraPotencial Tecnologia Territorial Ltda. Todos os direitos reservados.</p>
          <p className="max-w-md text-right sm:text-right text-[10px]">
            Estudos preliminares não substituem projetos técnicos oficiais, sondagens geológicas ou aprovações municipais e ambientais.
          </p>
        </div>
      </div>

    </footer>
  );
};
