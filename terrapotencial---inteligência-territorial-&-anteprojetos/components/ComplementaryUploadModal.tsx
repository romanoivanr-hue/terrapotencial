import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Trash2, AlertCircle, ArrowRight, Layers, Info, Check } from 'lucide-react';
import { UploadedFile, FileType } from '../types';
import { MAX_COMPLEMENTARY_FILES } from '../constants';
import { documentService } from '../services/documentService';

interface ComplementaryUploadModalProps {
  protocol: string;
  files: UploadedFile[];
  onAddFile: (file: UploadedFile) => void;
  onRemoveFile: (fileId: string) => void;
  onFinish: () => void;
}

export const ComplementaryUploadModal: React.FC<ComplementaryUploadModalProps> = ({
  protocol,
  files,
  onAddFile,
  onRemoveFile,
  onFinish
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Matrícula Atualizada');

  const fileCards = [
    { name: 'Matrícula Atualizada', type: 'PDF_MATRICULA' as FileType, desc: 'Ajuda a compreender limites, confrontações e informações registrárias.' },
    { name: 'DWG / CAD', type: 'DWG' as FileType, desc: 'Pode conter limites, topografia, curvas de nível e informações técnicas.' },
    { name: 'KMZ / KML Adicional', type: 'KMZ' as FileType, desc: 'Permite refinar a localização e delimitação precisa da propriedade.' },
    { name: 'Levantamento Topográfico', type: 'TOPOGRAFIA' as FileType, desc: 'Ajuda na análise de relevo, drenagem e implantação do sistema viário.' },
    { name: 'Consulta de Viabilidade', type: 'OUTRO' as FileType, desc: 'Ajuda a compreender parâmetros urbanísticos municipais e diretrizes.' },
    { name: 'Zoneamento / PDM', type: 'OUTRO' as FileType, desc: 'Permite avaliar regras de uso e ocupação do solo vigentes no município.' },
    { name: 'Documentos Ambientais', type: 'OUTRO' as FileType, desc: 'Auxiliam na identificação de APPs, nascentes, florestas e restrições.' },
    { name: 'Fotos ou Imagens Aéreas', type: 'FOTO' as FileType, desc: 'Ajudam na interpretação visual e entendimento da ocupação atual da área.' }
  ];

  const handleSimulateAdd = (cardName: string, type: FileType) => {
    if (!documentService.canUploadMore(files.length)) {
      alert(`Limite máximo de ${MAX_COMPLEMENTARY_FILES} documentos atingido.`);
      return;
    }

    const newDoc: UploadedFile = {
      id: `doc-${Date.now()}`,
      name: `${cardName.replace(/\s+/g, '_')}_Anexo_${files.length + 1}.pdf`,
      type,
      size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      uploadedAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'Enviado',
      category: cardName
    };

    onAddFile(newDoc);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 mb-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            PROTOCOLO #{protocol}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2">
            Agora precisamos conhecer melhor sua propriedade.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Você já nos enviou o arquivo inicial para localizar sua terra. Agora, quanto mais informações você fornecer, mais detalhado e preciso será o estudo executivo e o anteprojeto.
          </p>
        </div>

        {/* Counter Widget */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[160px]">
          <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">Limite de Arquivos</span>
          <div className="font-display font-black text-3xl text-emerald-400">
            {files.length} <span className="text-base text-slate-500 font-normal">/ {MAX_COMPLEMENTARY_FILES}</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {MAX_COMPLEMENTARY_FILES - files.length} disponíveis
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recommended Document Cards (Left) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Documentos Recomendados</span>
          </h3>
          <p className="text-xs text-slate-400">
            Clique em "Adicionar documento" para anexar cada tipo de informação que você possuir:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {fileCards.map((card) => (
              <div 
                key={card.name}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{card.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{card.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => handleSimulateAdd(card.name, card.type)}
                    disabled={files.length >= MAX_COMPLEMENTARY_FILES}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-30"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Adicionar documento</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Uploaded Files List (Right) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-display font-bold text-base text-white">
                  Arquivos Anexados ({files.length})
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {files.length}/{MAX_COMPLEMENTARY_FILES}
                </span>
              </div>

              {files.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  Nenhum documento complementar adicionado ainda. Adicione ao lado para enriquecer seu anteprojeto.
                </div>
              ) : (
                <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate max-w-[180px]">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium">{file.status}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveFile(file.id)}
                        title="Excluir arquivo"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onFinish}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Concluir e Iniciar Processamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Você também poderá anexar outros documentos posteriormente no seu painel.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
