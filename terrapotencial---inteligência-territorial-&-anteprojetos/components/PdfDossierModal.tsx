import React, { useState } from 'react';
import { X, Download, Printer, ChevronLeft, ChevronRight, FileCheck, ShieldAlert } from 'lucide-react';
import { Study } from '../types';
import { geospatialService } from '../services/geospatialService';

interface PdfDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: Study;
}

export const PdfDossierModal: React.FC<PdfDossierModalProps> = ({
  isOpen,
  onClose,
  study
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  if (!isOpen) return null;

  const handleDownload = () => {
    alert(`Iniciando download do Dossiê Executivo Oficial #${study.protocol}.pdf (Simulação em Alta Resolução).`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[92vh] overflow-hidden">
        
        {/* PDF Top Toolbar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-400 font-bold">
              DOSSIÊ_{study.protocol}.PDF
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Apresentação Executiva de Viabilidade</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Page Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#060a12]">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[640px] text-slate-100 relative">
            
            {/* Header Document */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 font-display font-extrabold text-white text-base">
                  <span className="text-emerald-400">TERRAPOTENCIAL</span>
                  <span className="text-[10px] text-slate-400 font-mono font-normal">| RELATÓRIO TÉCNICO</span>
                </div>
                <div className="text-right font-mono text-[11px] text-slate-400">
                  REF: {study.protocol}
                </div>
              </div>

              {/* Dynamic Page Content */}
              {currentPage === 1 && (
                <div className="py-10 text-center">
                  <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                    RELATÓRIO EXECUTIVO PRELIMINAR
                  </span>
                  <h1 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl text-white">
                    {study.property.name}
                  </h1>
                  <p className="text-sm text-slate-300 mt-2">
                    Município de {study.property.city} - {study.property.state}
                  </p>

                  <div className="mt-12 p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-left max-w-md mx-auto space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Requerente:</span>
                      <strong className="text-white">{study.client.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Área Total Calculada:</span>
                      <strong className="text-emerald-400">{geospatialService.formatHectares(study.property.totalAreaM2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Objetivo Declarado:</span>
                      <strong className="text-white">{study.client.projectObjective}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data de Emissão:</span>
                      <strong className="text-white">{study.createdAt}</strong>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="py-6 space-y-4">
                  <h2 className="font-display font-bold text-xl text-white">01 — Localização & Confrontações</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A propriedade está inserida no polígono georreferenciado sob coordenadas SIRGAS 2000 ({study.property.coordinates.lat}, {study.property.coordinates.lng}), com acesso facilitado e confrontações diretas com a malha viária municipal.
                  </p>
                  <div className="h-56 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-slate-500 font-mono">
                    [ MAPA REGIONAL DE ACESSOS E INSERÇÃO URBANA ]
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className="py-6 space-y-4">
                  <h2 className="font-display font-bold text-xl text-white">02 — Diagnóstico Territorial & Restrições</h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mapeamento de Áreas de Preservação Permanente (APP) ao longo das drenagens naturais, faixas non aedificandi e análise de declividade média (&lt; 30%, apta para parcelamento segundo a Lei 6.766/79).
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Área de Preservação (APP)</span>
                      <strong className="text-emerald-400 text-sm">625.000 m² (25%)</strong>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Topografia Dominante</span>
                      <strong className="text-teal-300 text-sm">Suave Ondulada</strong>
                    </div>
                  </div>
                </div>
              )}

              {currentPage >= 4 && (
                <div className="py-6 space-y-4">
                  <h2 className="font-display font-bold text-xl text-white">
                    0{currentPage} — Anteprojeto Urbanístico & Quadro de Áreas
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Distribuição espacial proposta para implantação de {study.property.estimatedLots} lotes com área média de {study.property.averageLotSizeM2} m², sistema viário hierarquizado e preservação dos maciços arbóreos.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between font-semibold border-b border-slate-800 pb-1">
                      <span>Destinação</span>
                      <span>Área (m²)</span>
                      <span>Percentual</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Área Loteável Privativa</span>
                      <span>1.625.000 m²</span>
                      <span>65%</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Sistema Viário Interno</span>
                      <span>400.000 m²</span>
                      <span>16%</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Preservação Ambiental (APP)</span>
                      <span>625.000 m²</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer Footer Required */}
            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 leading-snug">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>NOTA LEGAL:</strong> Este documento constitui um estudo preliminar e anteprojeto de inteligência territorial. Não substitui projetos executivos, levantamentos topográficos planialtimétricos cadastrais oficiais nem dispensa licenciamentos ou aprovações junto aos órgãos municipais e ambientais competentes.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
