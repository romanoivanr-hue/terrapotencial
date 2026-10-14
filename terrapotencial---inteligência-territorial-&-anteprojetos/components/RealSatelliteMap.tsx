import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, ZoomIn, ZoomOut, RotateCcw, Trash2, CheckCircle2, Crosshair, MapPin, Compass, Layers, Satellite, ShieldCheck, AlertCircle } from 'lucide-react';
import { LatLngPoint, Point2D } from '../types';
import { geospatialService } from '../services/geospatialService';

interface RealSatelliteMapProps {
  initialCity?: string;
  initialState?: string;
  onPolygonConfirmed: (data: {
    coords: LatLngPoint[];
    areaM2: number;
    perimeterM: number;
    center: { lat: number; lng: number };
    city: string;
    state: string;
  }) => void;
}

// Cidades pré-mapeadas com coordenadas de alta resolução para satélite
const BRAZIL_PRESETS: Record<string, { lat: number; lng: number; zoom: number; city: string; state: string }> = {
  florianopolis: { lat: -27.5954, lng: -48.5480, zoom: 15, city: 'Florianópolis', state: 'SC' },
  campinas: { lat: -22.9099, lng: -47.0626, zoom: 15, city: 'Campinas', state: 'SP' },
  ribeiraopreto: { lat: -21.1767, lng: -47.8108, zoom: 15, city: 'Ribeirão Preto', state: 'SP' },
  goiania: { lat: -16.6869, lng: -49.2648, zoom: 15, city: 'Goiânia', state: 'GO' },
  curitiba: { lat: -25.4284, lng: -49.2733, zoom: 15, city: 'Curitiba', state: 'PR' },
  uberlandia: { lat: -18.9186, lng: -48.2772, zoom: 15, city: 'Uberlândia', state: 'MG' },
  brasilia: { lat: -15.7975, lng: -47.8919, zoom: 15, city: 'Brasília', state: 'DF' }
};

export const RealSatelliteMap: React.FC<RealSatelliteMapProps> = ({
  initialCity = 'Florianópolis',
  initialState = 'SC',
  onPolygonConfirmed
}) => {
  const [cityInput, setCityInput] = useState(initialCity);
  const [stateInput, setStateInput] = useState(initialState);
  const [lat, setLat] = useState(-27.5954);
  const [lng, setLng] = useState(-48.5480);
  const [zoom, setZoom] = useState(15);
  const [mapType, setMapType] = useState<'satellite' | 'hybrid'>('satellite');

  // Vértices demarcados em coordenadas reais Lat/Lng
  const [vertices, setVertices] = useState<LatLngPoint[]>([
    { lat: -27.5925, lng: -48.5520 },
    { lat: -27.5910, lng: -48.5440 },
    { lat: -27.5980, lng: -48.5410 },
    { lat: -27.6010, lng: -48.5490 },
    { lat: -27.5975, lng: -48.5540 }
  ]);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const [toolMode, setToolMode] = useState<'draw' | 'pan'>('draw');

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Conversões cartográficas Slippy Map / Web Mercator
  const lngToTileX = useCallback((lon: number, z: number) => {
    return ((lon + 180) / 360) * Math.pow(2, z);
  }, []);

  const latToTileY = useCallback((latitude: number, z: number) => {
    const latRad = (latitude * Math.PI) / 180;
    return ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * Math.pow(2, z);
  }, []);

  const tileXToLng = useCallback((x: number, z: number) => {
    return (x / Math.pow(2, z)) * 360 - 180;
  }, []);

  const tileYToLat = useCallback((y: number, z: number) => {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }, []);

  // Projeção de LatLng para Pixel na tela relativa ao centro
  const latLngToScreenPx = useCallback((pt: LatLngPoint, width: number, height: number) => {
    const tileX = lngToTileX(pt.lng, zoom);
    const tileY = latToTileY(pt.lat, zoom);
    const centerTileX = lngToTileX(lng, zoom);
    const centerTileY = latToTileY(lat, zoom);

    const pxX = width / 2 + (tileX - centerTileX) * 256;
    const pxY = height / 2 + (tileY - centerTileY) * 256;
    return { x: pxX, y: pxY };
  }, [lngToTileX, latToTileY, zoom, lat, lng]);

  // Conversão de Pixel da tela de volta para LatLng
  const screenPxToLatLng = useCallback((pxX: number, pxY: number, width: number, height: number) => {
    const centerTileX = lngToTileX(lng, zoom);
    const centerTileY = latToTileY(lat, zoom);

    const tileX = centerTileX + (pxX - width / 2) / 256;
    const tileY = centerTileY + (pxY - height / 2) / 256;

    const clickedLng = tileXToLng(tileX, zoom);
    const clickedLat = tileYToLat(tileY, zoom);
    return { lat: clickedLat, lng: clickedLng };
  }, [lngToTileX, latToTileY, tileXToLng, tileYToLat, zoom, lat, lng]);

  // Busca de cidade
  const handleSearchCity = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cityInput.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, '');
    if (BRAZIL_PRESETS[clean]) {
      const target = BRAZIL_PRESETS[clean];
      setLat(target.lat);
      setLng(target.lng);
      setZoom(target.zoom);
      // Desloca vértices para a nova cidade
      setVertices([
        { lat: target.lat + 0.003, lng: target.lng - 0.004 },
        { lat: target.lat + 0.004, lng: target.lng + 0.003 },
        { lat: target.lat - 0.002, lng: target.lng + 0.005 },
        { lat: target.lat - 0.005, lng: target.lng - 0.001 },
        { lat: target.lat - 0.002, lng: target.lng - 0.006 }
      ]);
    } else {
      // Mock de deslocamento regional
      setLat(prev => prev + 0.05);
      setLng(prev => prev - 0.05);
    }
  };

  // Clique no mapa
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || toolMode === 'pan') return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newCoord = screenPxToLatLng(clickX, clickY, rect.width, rect.height);
    setVertices(prev => [...prev, newCoord]);
  };

  // Início de Pan (arrastar o mapa)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toolMode === 'pan' || e.button === 1 || e.shiftKey) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY, lat, lng });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (isDragging && dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const centerTileX = lngToTileX(dragStart.lng, zoom);
      const centerTileY = latToTileY(dragStart.lat, zoom);

      const newTileX = centerTileX - dx / 256;
      const newTileY = centerTileY - dy / 256;

      setLng(tileXToLng(newTileX, zoom));
      setLat(tileYToLat(newTileY, zoom));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // Cálculos em tempo real
  const realAreaM2 = geospatialService.calculateGeoPolygonAreaM2(vertices);
  const realPerimeterM = geospatialService.calculateGeoPerimeterM(vertices);

  // Renderização dos azulejos de satélite reais do Esri World Imagery
  const renderTiles = () => {
    if (!containerRef.current) return null;
    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 450;

    const centerTileX = lngToTileX(lng, zoom);
    const centerTileY = latToTileY(lat, zoom);

    const startTileX = Math.floor(centerTileX - width / 512) - 1;
    const endTileX = Math.ceil(centerTileX + width / 512) + 1;
    const startTileY = Math.floor(centerTileY - height / 512) - 1;
    const endTileY = Math.ceil(centerTileY + height / 512) + 1;

    const tiles = [];
    const maxTile = Math.pow(2, zoom);

    for (let x = startTileX; x <= endTileX; x++) {
      for (let y = startTileY; y <= endTileY; y++) {
        if (y < 0 || y >= maxTile) continue;
        const normalizedX = ((x % maxTile) + maxTile) % maxTile;
        const left = width / 2 + (x - centerTileX) * 256;
        const top = height / 2 + (y - centerTileY) * 256;

        // Esri World Imagery oficial (Satélite Global de Alta Resolução)
        const tileUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${normalizedX}`;

        tiles.push(
          <img
            key={`${zoom}-${x}-${y}`}
            src={tileUrl}
            alt=""
            loading="lazy"
            crossOrigin="anonymous"
            className="absolute select-none pointer-events-none"
            style={{
              width: '256px',
              height: '256px',
              left: `${left}px`,
              top: `${top}px`,
              filter: mapType === 'hybrid' ? 'contrast(1.05) brightness(0.95)' : 'none'
            }}
          />
        );
      }
    }
    return tiles;
  };

  // Polígono projetado na tela
  const getPolygonPointsString = () => {
    if (!containerRef.current) return '';
    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 450;
    return vertices
      .map(pt => {
        const screen = latLngToScreenPx(pt, width, height);
        return `${screen.x.toFixed(1)},${screen.y.toFixed(1)}`;
      })
      .join(' ');
  };

  const handleConfirm = () => {
    if (vertices.length < 3) {
      alert('Demarque pelo menos 3 vértices na imagem de satélite para calcular a terra.');
      return;
    }
    onPolygonConfirmed({
      coords: vertices,
      areaM2: realAreaM2,
      perimeterM: realPerimeterM,
      center: { lat, lng },
      city: cityInput,
      state: stateInput
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Top Search & Satellite Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
        
        {/* City Search Bar */}
        <form onSubmit={handleSearchCity} className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Buscar município (ex: Florianópolis, Campinas, Goiânia...)"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>
          <input
            type="text"
            maxLength={2}
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value.toUpperCase())}
            placeholder="UF"
            className="w-14 px-2 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs text-center font-bold uppercase focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Navegar
          </button>
        </form>

        {/* Mode & Zoom Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setToolMode(toolMode === 'draw' ? 'pan' : 'draw')}
            title={toolMode === 'draw' ? 'Clique no mapa para demarcar vértices' : 'Modo Navegação / Mover Mapa'}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              toolMode === 'draw'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{toolMode === 'draw' ? 'Modo Desenho' : 'Mover Mapa'}</span>
          </button>

          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setZoom(Math.min(18, zoom + 1))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded"
              title="Aproximar Satélite"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(Math.max(12, zoom - 1))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded"
              title="Afastar Satélite"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Real Satellite Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleMapClick}
        className={`relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-950 shadow-2xl select-none ${
          toolMode === 'draw' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        {/* Render real tiles */}
        {renderTiles()}

        {/* Live Vector Overlay over real Satellite Imagery */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="sat-poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Polygon fill if >= 3 points */}
          {vertices.length >= 3 && (
            <polygon
              points={getPolygonPointsString()}
              fill="url(#sat-poly-grad)"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          )}

          {/* Polyline if 1 or 2 points */}
          {vertices.length > 0 && vertices.length < 3 && (
            <polyline
              points={getPolygonPointsString()}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Vertex Pins & Labels */}
          {containerRef.current &&
            vertices.map((pt, idx) => {
              const width = containerRef.current?.clientWidth || 800;
              const height = containerRef.current?.clientHeight || 450;
              const scr = latLngToScreenPx(pt, width, height);
              return (
                <g key={idx}>
                  <circle cx={scr.x} cy={scr.y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x={scr.x + 8} y={scr.y - 14} width="28" height="16" rx="4" fill="#0c1322" fillOpacity="0.85" />
                  <text
                    x={scr.x + 22}
                    y={scr.y - 3}
                    fill="#34d399"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    V{idx + 1}
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Top Floating Info Badge */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-semibold text-white shadow-xl">
          <Satellite className="w-3.5 h-3.5 text-emerald-400" />
          <span>Satélite Esri World Imagery HD</span>
          <span className="text-[10px] text-slate-400 font-mono">Zoom {zoom}x</span>
        </div>

        {/* Real-time Instructions helper */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
          {toolMode === 'draw'
            ? 'Clique na terra para marcar os vértices • Arraste com Shift ou mude para Mover'
            : 'Clique e arraste para explorar a região'}
        </div>

        {/* Watermark Esri */}
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none text-[9px] text-slate-400 bg-slate-950/70 px-2 py-0.5 rounded">
          © Esri, Maxar, Earthstar Geographics
        </div>
      </div>

      {/* Real-time Metric Cards & Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
        
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">VÉRTICES MARCADOS</span>
            <strong className="text-white font-mono text-base">{vertices.length} vértices</strong>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">ÁREA GEODÉSICA REAL</span>
            <strong className="text-emerald-400 font-display text-base">
              {vertices.length >= 3 ? geospatialService.formatHectares(realAreaM2) : '—'}
            </strong>
            {vertices.length >= 3 && (
              <span className="text-[10px] text-slate-400 block font-normal">
                {geospatialService.formatArea(realAreaM2)}
              </span>
            )}
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">PERÍMETRO CALCULADO</span>
            <strong className="text-teal-300 font-mono text-base">
              {vertices.length >= 3 ? `${realPerimeterM.toLocaleString('pt-BR')} m` : '—'}
            </strong>
          </div>
        </div>

        {/* Reset / Undo buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVertices(prev => prev.slice(0, -1))}
            disabled={vertices.length === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Desfazer</span>
          </button>
          <button
            type="button"
            onClick={() => setVertices([])}
            disabled={vertices.length === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 hover:text-red-300 text-slate-300 text-xs font-semibold flex items-center gap-1 disabled:opacity-40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>

      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={vertices.length < 3}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-40"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Confirmar Delimitação Real da Gleba ({geospatialService.formatHectares(realAreaM2)})</span>
      </button>

    </div>
  );
};
