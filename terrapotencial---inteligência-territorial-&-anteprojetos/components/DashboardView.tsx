import React from 'react';
import { Study } from '../types';
import { Layers, ArrowRight, Clock, FileText, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { geospatialService } from '../services/geospatialService';

interface DashboardViewProps {
  studies: Study[];
  onSelectStudy: (study: Study) => void;
  onNewAnalysis: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  studies,
  onSelectStudy,
  onNewAnalysis
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
            Painel do Proprietário & Investidor
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white mt-1">
            Meus Estudos Territoriais
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Acompanhe o andamento das análises territoriais e acesse os anteprojetos finalizados.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Nova Análise Territorial</span>
        </button>
      </div>

      {/* Studies List */}
      {studies.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-white">Nenhum estudo ativo no momento</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Comece informando uma localização ou enviando um arquivo KMZ/DWG da sua gleba.
          </p>
          <button
            onClick={onNewAnalysis}
            className="mt-5 px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Analisar Minha Terra
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <div
              key={study.protocol}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-bold">
                    #{study.protocol}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
                    {study.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-display font-bold text-xl text-white">
                    {study.property.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {study.property.city} - {study.property.state} • {geospatialService.formatHectares(study.property.totalAreaM2)} ({geospatialService.formatArea(study.property.totalAreaM2)})
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Progresso Técnico</span>
                    <span className="font-mono text-emerald-400 font-bold">{study.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${study.progress}%` }}
                    />
                  </div>
                </div>

                {/* Info tags */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Previsão</span>
                    <strong className="text-white">{study.estimatedDeliveryDate}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Documentos</span>
                    <strong className="text-white">{study.files.length} Anexados</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Iniciado em: {study.createdAt}
                </span>

                <button
                  onClick={() => onSelectStudy(study)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Acompanhar Estudo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
