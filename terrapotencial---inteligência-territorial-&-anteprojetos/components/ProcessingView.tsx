import React, { useEffect, useState } from 'react';
import { Compass, Check, Layers, Loader2 } from 'lucide-react';

interface ProcessingViewProps {
  fileName?: string;
  onFinished: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  fileName = 'Arquivo de Localização',
  onFinished
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Arquivo recebido com sucesso',
    'Extraindo dados vetoriais e geográficos',
    'Localização espacial identificada',
    'Polígono e perímetro da área delimitados',
    'Preparando síntese da propriedade'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onFinished, 600);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(timer);
  }, [onFinished, steps.length]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0c1424] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        
        {/* Animated radar rings in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-72 h-72 border border-emerald-500 rounded-full animate-ping" />
          <div className="w-48 h-48 border border-teal-400 rounded-full animate-pulse" />
        </div>

        {/* Compass scanner icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <Compass className="w-9 h-9 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <h3 className="font-display font-bold text-2xl text-white mb-2">
          Localizando sua propriedade...
        </h3>
        <p className="text-xs text-slate-400 mb-8 truncate px-4">
          Interpretando dados geográficos de: <span className="text-emerald-300 font-mono">{fileName}</span>
        </p>

        {/* Step Checklist */}
        <div className="space-y-3 text-left max-w-xs mx-auto">
          {steps.map((stepText, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div 
                key={stepText}
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                  isDone 
                    ? 'text-emerald-400 font-medium' 
                    : isCurrent 
                    ? 'text-white font-bold scale-105' 
                    : 'text-slate-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${
                  isDone
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : isCurrent
                    ? 'bg-slate-800 text-emerald-400 border-emerald-400 animate-pulse'
                    : 'bg-slate-900 text-slate-600 border-slate-800'
                }`}>
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : isCurrent ? <Loader2 className="w-3 h-3 animate-spin" /> : idx + 1}
                </div>
                <span>{stepText}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
          CONECTANDO SERVIÇO DE GEOPROCESSAMENTO...
        </div>

      </div>
    </div>
  );
};
