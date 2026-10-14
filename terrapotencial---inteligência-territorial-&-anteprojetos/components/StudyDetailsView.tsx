import React from 'react';
import { Study } from '../types';
import { MapViewer } from './MapViewer';
import { Check, Clock, FileText, Download, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { geospatialService } from '../services/geospatialService';

interface StudyDetailsViewProps {
  study: Study;
  onBack: () => void;
  onOpenPdf: () => void;
}

export const StudyDetailsView: React.FC<StudyDetailsViewProps> = ({
  study,
  onBack,
  onOpenPdf
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Meus Estudos</span>
      </button>

      {/* Top Banner: Protocol and Quick Details */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 mb-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              ESTUDO #{study.protocol}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {study.status}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {study.property.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {study.property.city} - {study.property.state} • {geospatialService.formatHectares(study.property.totalAreaM2)}
          </p>
        </div>

        {/* Deliverable Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPdf}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Visualizar Apresentação Executiva</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Timeline (Left) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
          <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center justify-between">
            <span>Acompanhe Seu Estudo</span>
            <span className="text-xs font-mono text-emerald-400">{study.progress}% Concluído</span>
          </h3>

          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
            {study.timeline.map((step) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={step.step} className="relative flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 border ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : isCurrent
                      ? 'bg-teal-950 text-teal-300 border-teal-400 animate-pulse'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}>
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.step}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className={`text-sm font-bold ${
                        isDone ? 'text-white' : isCurrent ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </h4>
                      {step.date && (
                        <span className="text-[10px] font-mono text-slate-400">{step.date}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Previsão de conclusão do relatório: <strong>{study.estimatedDeliveryDate}</strong></span>
          </div>
        </div>

        {/* Map and Anteprojeto Preview (Right) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="text-xs font-mono uppercase text-slate-400">Malha Territorial & Anteprojeto</span>
              <span className="text-[11px] text-emerald-400 font-semibold">Camadas Geográficas Ativas</span>
            </div>
            <MapViewer property={study.property} showAnteprojetoOverlay={true} />
          </div>

          {/* Quick Metrics Breakdown Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Área Aproveitável</span>
              <strong className="text-base text-emerald-400 font-display">162,5 ha</strong>
              <span className="text-[10px] text-slate-500 block">65% Loteável</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Preservação</span>
              <strong className="text-base text-teal-300 font-display">62,5 ha</strong>
              <span className="text-[10px] text-slate-500 block">25% APP/Reserva</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Estimativa Lotes</span>
              <strong className="text-base text-white font-display">980 unidades</strong>
              <span className="text-[10px] text-slate-500 block">Média 450 m²</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Potencial VGV</span>
              <strong className="text-base text-amber-300 font-display">R$ 145M</strong>
              <span className="text-[10px] text-slate-500 block">Projeção de Mercado</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
