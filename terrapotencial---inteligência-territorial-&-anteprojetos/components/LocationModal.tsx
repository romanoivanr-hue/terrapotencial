import React, { useState } from 'react';
import { X, Upload, MapPin, FileCode, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Satellite } from 'lucide-react';
import { locationService } from '../services/locationService';
import { Coordinates, LatLngPoint, Point2D } from '../types';
import { RealSatelliteMap } from './RealSatelliteMap';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationIdentified: (
    fileData?: File,
    manualData?: { 
      city: string; 
      state: string; 
      coords?: Coordinates; 
      customPolygon?: Point2D[]; 
      realGeoPolygon?: LatLngPoint[];
      customAreaM2?: number; 
      customPerimeterM?: number 
    }
  ) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onLocationIdentified
}) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'file' | 'manual'>('draw');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Manual inputs
  const [city, setCity] = useState('Florianópolis');
  const [state, setState] = useState('SC');
  const [coordsInput, setCoordsInput] = useState('-27.5954, -48.5480');
  const [addressRef, setAddressRef] = useState('Rodovia SC-401, Km 12');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileError(null);
      const validation = locationService.validateLocationFile(file);
      if (!validation.isValid) {
        setFileError(validation.message);
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleConfirmFile = () => {
    if (!selectedFile) {
      onLocationIdentified(undefined, { city: 'Florianópolis', state: 'SC' });
      return;
    }
    onLocationIdentified(selectedFile);
  };

  const handleConfirmManual = (e: React.FormEvent) => {
    e.preventDefault();
    let parsedCoords: Coordinates | undefined = undefined;
    if (coordsInput.includes(',')) {
      const parts = coordsInput.split(',');
      const lat = parseFloat(parts[0].trim());
      const lng = parseFloat(parts[1].trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        parsedCoords = { lat, lng };
      }
    }
    onLocationIdentified(undefined, {
      city: city || 'Florianópolis',
      state: state || 'SC',
      coords: parsedCoords
    });
  };

  const handleSatellitePolygonConfirmed = (data: {
    coords: LatLngPoint[];
    areaM2: number;
    perimeterM: number;
    center: { lat: number; lng: number };
    city: string;
    state: string;
  }) => {
    onLocationIdentified(undefined, {
      city: data.city,
      state: data.state,
      coords: data.center,
      realGeoPolygon: data.coords,
      customAreaM2: data.areaM2,
      customPerimeterM: data.perimeterM
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0c1322] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Etapa 01 — Localização Inteligente</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              Vamos localizar sua propriedade
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Demarque os limites sobre imagem de satélite real de alta resolução, envie seu arquivo ou informe o município.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option Tabs */}
        <div className="px-5 sm:px-6 pt-4 flex gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
              activeTab === 'draw'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Satellite className="w-4 h-4 text-emerald-400" />
            <span>Satélite Real (Desenhar)</span>
          </button>

          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
              activeTab === 'file'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Enviar Arquivo (KMZ/DWG)</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
              activeTab === 'manual'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Informar Cidade</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: REAL SATELLITE INTERACTIVE DRAWING */}
          {activeTab === 'draw' && (
            <RealSatelliteMap
              initialCity={city}
              initialState={state}
              onPolygonConfirmed={handleSatellitePolygonConfirmed}
            />
          )}

          {/* TAB 2: UPLOAD FILE */}
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-900/40 rounded-2xl p-8 text-center transition-all">
                <input
                  type="file"
                  id="location-file-input"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".kmz,.kml,.dwg,.shp,.pdf,.zip"
                />

                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  {selectedFile ? <FileCode className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                </div>

                {selectedFile ? (
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Arquivo pronto para análise</span>
                    </div>
                    <p className="text-white font-semibold text-base truncate max-w-sm mx-auto">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <label
                      htmlFor="location-file-input"
                      className="mt-3 inline-block text-xs text-emerald-400 hover:underline cursor-pointer"
                    >
                      Trocar por outro arquivo
                    </label>
                  </div>
                ) : (
                  <div>
                    <p className="font-display font-bold text-base text-white">
                      Arraste ou selecione o arquivo da sua propriedade
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Formatos aceitos: <strong className="text-slate-300 font-semibold">KMZ, KML, DWG, SHP, PDF técnico ou Matrícula georreferenciada</strong>
                    </p>
                    <label
                      htmlFor="location-file-input"
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                    >
                      <span>Procurar no computador</span>
                    </label>
                  </div>
                )}
              </div>

              {fileError && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Ainda não conseguimos localizar sua propriedade com segurança.</p>
                    <p className="mt-0.5 text-slate-300">{fileError}</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmFile}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Localizar e Delimitar Minha Terra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 3: INFORM LOCATION MANUAL */}
          {activeTab === 'manual' && (
            <form onSubmit={handleConfirmManual} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Município *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Florianópolis, Ribeirão Preto, Goiânia"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estado (UF) *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    placeholder="SC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400 text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Latitude e Longitude (opcional)
                </label>
                <input
                  type="text"
                  value={coordsInput}
                  onChange={(e) => setCoordsInput(e.target.value)}
                  placeholder="-27.5954, -48.5480"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Endereço / Referência de Acesso
                </label>
                <input
                  type="text"
                  value={addressRef}
                  onChange={(e) => setAddressRef(e.target.value)}
                  placeholder="Ex: Rodovia SC-401, Km 12 - Próximo ao Trevo Norte"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all mt-4"
              >
                <span>Localizar Minha Gleba</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-slate-400">
          Você pode começar gratuitamente. Não solicitaremos dados de pagamento para localizar sua área.
        </div>

      </div>
    </div>
  );
};
