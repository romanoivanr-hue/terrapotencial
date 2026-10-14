import React from 'react';
import { PropertyData } from '../types';
import { MapViewer } from './MapViewer';
import { Check, Lock, ArrowRight, Sparkles, AlertCircle, Compass, Trees, Car, Building2, Layers } from 'lucide-react';
import { geospatialService } from '../services/geospatialService';

interface PotentialPreviewProps {
  property: PropertyData;
  onUnlockStudy: () => void;
  onModifyLocation: () => void;
}

export const PotentialPreview: React.FC<PotentialPreviewProps> = ({
  property,
  onUnlockStudy,
  onModifyLocation
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Banner: Encontramos sua propriedade */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <Check className="w-3.5 h-3.5" />
              <span>Propriedade Identificada com Sucesso</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Encontramos sua propriedade.
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Polígono delimitado com precisão geográfica em <strong className="text-white">{property.city} - {property.state}</strong>.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[120px]">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Área Total</span>
              <span className="font-display font-extrabold text-lg text-emerald-400">
                {geospatialService.formatHectares(property.totalAreaM2)}
              </span>
              <span className="text-[10px] text-slate-500 block">({geospatialService.formatArea(property.totalAreaM2)})</span>
            </div>

            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[120px]">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Perímetro</span>
              <span className="font-display font-extrabold text-lg text-teal-300">
                {property.perimeterM.toLocaleString('pt-BR')} m
              </span>
              <span className="text-[10px] text-slate-500 block">Limites Calculados</span>
            </div>

            <button
              onClick={onModifyLocation}
              className="px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
            >
              Trocar Localização
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Viewer */}
      <div className="mb-10">
        <MapViewer property={property} showAnteprojetoOverlay={false} />
      </div>

      {/* A GRANDE VIRADA COMERCIAL */}
      <div className="my-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fase 02 — Descoberta de Potencial</span>
        </div>
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Agora começa a parte mais interessante.
        </h3>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Com a localização da propriedade identificada, podemos cruzar informações territoriais e desenvolver um estudo executivo muito mais completo. Veja o que está prestes a ser desbloqueado:
        </p>
      </div>

      {/* Grid of Potential Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Dimension 1 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Potencial de Aproveitamento</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Cálculo preciso de quanto da área total poderá ser efetivamente aproveitada para implantação de lotes ou glebas comerciais.
          </p>
        </div>

        {/* Dimension 2 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
            <Trees className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Restrições & APPs</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Identificação de cursos d’água, áreas de preservação permanente (APP), faixas de declividade e condicionantes legais.
          </p>
        </div>

        {/* Dimension 3 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Car className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Acessos & Conexões</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Análise preliminar dos acessos viários existentes, rodovias confrontantes e possibilidades de integração com a cidade.
          </p>
        </div>

        {/* Dimension 4 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Sistema Viário Preliminar</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Possível estrutura de circulação dentro da gleba, hierarquia de vias, eixos estruturantes e conexões entre quadras.
          </p>
        </div>

        {/* Dimension 5 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
            <Building2 className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Estudo de Implantação</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Possibilidades de setorização das áreas residenciais, comerciais, institucionais e áreas de lazer comunitário.
          </p>
        </div>

        {/* Dimension 6 */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-white text-base">Lotes & Estimativa de VGV</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Simulação de quantidade estimada de lotes, metragem média e estimativa preliminar de aproveitamento imobiliário.
          </p>
        </div>

      </div>

      {/* BLOQUEIO E CONVERSÃO COM ELEMENTOS OCULTOS / BLUR */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#0b1324] to-[#070c18] border-2 border-emerald-500/40 shadow-2xl overflow-hidden text-center">
        
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-6">
            <Lock className="w-3.5 h-3.5" />
            <span>Disponível no Estudo Completo & Anteprojeto</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-6">
            Quer descobrir o que realmente pode ser feito nessa terra?
          </h3>

          {/* Blurred/Redacted Teaser Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-8 backdrop-blur-md">
            
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Área Potencialmente Aproveitável</span>
              <div className="h-7 bg-slate-800/90 rounded filter blur-sm select-none text-slate-500 flex items-center justify-center font-mono text-sm">
                1.625.000 m²
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Liberado no estudo</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Quantidade Estimada de Lotes</span>
              <div className="h-7 bg-slate-800/90 rounded filter blur-sm select-none text-slate-500 flex items-center justify-center font-mono text-sm">
                980 lotes
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Liberado no estudo</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Área Média dos Lotes</span>
              <div className="h-7 bg-slate-800/90 rounded filter blur-sm select-none text-slate-500 flex items-center justify-center font-mono text-sm">
                450 m²
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Liberado no estudo</span>
            </div>

          </div>

          <p className="text-sm text-slate-300 mb-8 leading-relaxed">
            Elimine as suposições. Receba o diagnóstico completo com restrições ambientais, arruamento preliminar, quadras e o dossiê executivo em alta resolução.
          </p>

          <button
            onClick={onUnlockStudy}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Ver Meu Estudo Completo</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-slate-400 mt-4">
            Sem mensalidades recorrentes • Pagamento único • Prazo estimado de 5 dias úteis
          </p>

        </div>

      </div>

    </div>
  );
};
