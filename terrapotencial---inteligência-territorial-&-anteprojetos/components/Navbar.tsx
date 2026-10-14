import React from 'react';
import { Compass, Layers, Globe, ArrowRight, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onStartAnalysis: () => void;
  onViewDashboard: () => void;
  onOpenDeployHelp?: () => void;
  onOpenDomainGuide?: () => void;
  activeStudiesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartAnalysis,
  onViewDashboard,
  onOpenDeployHelp,
  onOpenDomainGuide,
  activeStudiesCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080d17]/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-white">
                TERRA<span className="text-emerald-400">POTENCIAL</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide">Inteligência Territorial & Loteamentos</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">Como Funciona</a>
          <a href="#metodologia" className="hover:text-emerald-400 transition-colors">Metodologia</a>
          <a href="#dossie-pdf" className="hover:text-emerald-400 transition-colors">O Anteprojeto</a>
          <a href="#preco" className="hover:text-emerald-400 transition-colors">Valores</a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          {onOpenDomainGuide && (
            <button
              onClick={onOpenDomainGuide}
              title="Passo a passo para colocar no seu domínio e vincular pagamentos"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Colocar Online / Domínio</span>
            </button>
          )}

          <button
            onClick={onViewDashboard}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-all duration-200"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Meus Estudos ({activeStudiesCount})</span>
          </button>

          <button
            onClick={onStartAnalysis}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 active:scale-95 transition-all duration-200"
          >
            <span>Analisar Minha Terra</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
