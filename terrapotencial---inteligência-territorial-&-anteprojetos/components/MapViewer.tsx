import React, { useState } from 'react';
import { Layers, Eye, EyeOff, ZoomIn, ZoomOut, Compass, MapPin } from 'lucide-react';
import { PropertyData } from '../types';

interface MapViewerProps {
  property: PropertyData;
  showAnteprojetoOverlay?: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  property,
  showAnteprojetoOverlay = false
}) => {
  const [showContours, setShowContours] = useState(true);
  const [showEnvironmental, setShowEnvironmental] = useState(true);
  const [showSubdivision, setShowSubdivision] = useState(showAnteprojetoOverlay);

  // Fallback default polygon vertices if not drawn custom
  const defaultPolygon = [
    { x: 180, y: 80 },
    { x: 620, y: 95 },
    { x: 690, y: 360 },
    { x: 450, y: 440 },
    { x: 140, y: 370 }
  ];

  const polygonPoints = property.customPolygon && property.customPolygon.length >= 3
    ? property.customPolygon
    : defaultPolygon;

  const pointsString = polygonPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Compute centroid for property label
  const centroidX = Math.round(polygonPoints.reduce((acc, p) => acc + p.x, 0) / polygonPoints.length);
  const centroidY = Math.round(polygonPoints.reduce((acc, p) => acc + p.y, 0) / polygonPoints.length);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-800 bg-[#080d1a] shadow-2xl flex flex-col">
      
      {/* Top Map Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Location tag badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md shadow-lg text-xs font-semibold text-white">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{property.city} - {property.state}</span>
          <span className="text-[10px] text-slate-400 font-mono">({property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)})</span>
          {property.customPolygon && (
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Demarcado Manualmente
            </span>
          )}
        </div>

        {/* Layer Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setShowEnvironmental(!showEnvironmental)}
            title="Alternar APP / Ambiental"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
              showEnvironmental ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">APP & Reserva</span>
          </button>

          <button
            onClick={() => setShowContours(!showContours)}
            title="Alternar Curvas de Nível"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
              showContours ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="hidden sm:inline">Topografia</span>
          </button>

          <button
            onClick={() => setShowSubdivision(!showSubdivision)}
            title="Alternar Anteprojeto Viário"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
              showSubdivision ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="hidden sm:inline">Anteprojeto</span>
          </button>
        </div>

      </div>

      {/* SVG GIS Simulator Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Satellite Grid Texture */}
            <pattern id="sat-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131e33" strokeWidth="0.8" />
            </pattern>

            <linearGradient id="poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.09" />
            </linearGradient>

            <linearGradient id="app-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#065f46" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Deep dark satellite map background */}
          <rect width="100%" height="100%" fill="#070c18" />
          <rect width="100%" height="100%" fill="url(#sat-grid)" />

          {/* Surrounding Context Road & Rivers */}
          <path d="M -20 180 C 200 190, 400 120, 820 160" fill="none" stroke="#334155" strokeWidth="6" />
          <path d="M -20 180 C 200 190, 400 120, 820 160" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="8 6" />
          
          {/* River Stream */}
          <path d="M 680 -20 Q 560 220 540 520" fill="none" stroke="#0284c7" strokeWidth="4" opacity="0.6" />

          {/* Contours lines (Curvas de nível) */}
          {showContours && (
            <g opacity="0.35" stroke="#2dd4bf" strokeWidth="0.8" fill="none">
              <path d="M 140 100 Q 300 80 500 130 T 700 110" />
              <path d="M 120 160 Q 280 140 480 190 T 720 180" />
              <path d="M 100 220 Q 260 200 460 260 T 740 250" />
              <path d="M 90 280 Q 250 260 450 330 T 750 320" />
              <path d="M 110 350 Q 270 330 470 400 T 730 390" />
              <path d="M 150 420 Q 300 400 500 460 T 680 450" />
            </g>
          )}

          {/* Main Property Polygon (Drawn or Default) */}
          <polygon
            points={pointsString}
            fill="url(#poly-grad)"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Vertices Pins */}
          {polygonPoints.map((pt, index) => (
            <g key={index}>
              <circle cx={pt.x} cy={pt.y} r="5" fill="#10b981" stroke="#fff" strokeWidth="1.8" />
              <text x={pt.x + 8} y={pt.y - 6} fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                V{index + 1}
              </text>
            </g>
          ))}

          {/* Environmental APP buffer / Preservation Area */}
          {showEnvironmental && (
            <g>
              <polygon
                points={`${polygonPoints[1]?.x || 520},${polygonPoints[1]?.y || 110} ${polygonPoints[2]?.x || 610},${polygonPoints[2]?.y || 100} ${centroidX + 40},${centroidY + 50} ${centroidX},${centroidY}`}
                fill="url(#app-grad)"
                stroke="#059669"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x={centroidX + 20} y={centroidY + 30} fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                APP Córrego / 22%
              </text>
            </g>
          )}

          {/* Subdivision Anteprojeto Layer */}
          {showSubdivision && (
            <g>
              {/* Internal Road Arterials */}
              <path d={`M ${polygonPoints[0].x + 40} ${polygonPoints[0].y + 50} C ${centroidX - 20} ${centroidY - 40}, ${centroidX + 20} ${centroidY + 40}, ${polygonPoints[polygonPoints.length - 1].x + 40} ${polygonPoints[polygonPoints.length - 1].y - 30}`} fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
              <path d={`M ${polygonPoints[0].x + 40} ${polygonPoints[0].y + 50} C ${centroidX - 20} ${centroidY - 40}, ${centroidX + 20} ${centroidY + 40}, ${polygonPoints[polygonPoints.length - 1].x + 40} ${polygonPoints[polygonPoints.length - 1].y - 30}`} fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Blocks & Lots Simulated Rectangles */}
              <rect x={centroidX - 80} y={centroidY - 70} width="65" height="40" rx="3" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" />
              <text x={centroidX - 65} y={centroidY - 45} fill="#a7f3d0" fontSize="9" fontWeight="bold">QD. 01</text>

              <rect x={centroidX + 10} y={centroidY - 65} width="75" height="42" rx="3" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" />
              <text x={centroidX + 25} y={centroidY - 40} fill="#a7f3d0" fontSize="9" fontWeight="bold">QD. 02</text>

              <rect x={centroidX - 90} y={centroidY - 10} width="70" height="45" rx="3" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" />
              <text x={centroidX - 70} y={centroidY + 18} fill="#a7f3d0" fontSize="9" fontWeight="bold">QD. 03</text>

              <rect x={centroidX + 15} y={centroidY - 5} width="80" height="48" rx="3" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" />
              <text x={centroidX + 35} y={centroidY + 24} fill="#a7f3d0" fontSize="9" fontWeight="bold">QD. 04</text>
            </g>
          )}

          {/* Property Label in centroid */}
          <g transform={`translate(${centroidX - 90}, ${centroidY - 120})`}>
            <rect x="0" y="0" width="180" height="26" rx="6" fill="#0c1322" stroke="#10b981" strokeWidth="1" />
            <text x="90" y="17" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              {property.name}
            </text>
          </g>

          {/* North Arrow icon on map */}
          <g transform="translate(740, 70)">
            <circle cx="0" cy="0" r="16" fill="#0c1322" stroke="#334155" strokeWidth="1" />
            <path d="M 0 -10 L 4 6 L 0 3 L -4 6 Z" fill="#ef4444" />
            <text x="0" y="-13" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
          </g>
        </svg>

        {/* Map Watermark & Scale Info */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-3 text-[10px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
          <span>Escala 1:10.000</span>
          <span>•</span>
          <span>{polygonPoints.length} Vértices Registrados</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Base Vetorial Identificada</span>
        </div>

      </div>

    </div>
  );
};
