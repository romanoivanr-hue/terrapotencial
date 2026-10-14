import { PropertyData, Point2D, LatLngPoint } from '../types';

export interface SpatialBreakdown {
  label: string;
  areaM2: number;
  percentage: number;
  color: string;
}

const METERS_PER_PIXEL = 14.5;

export const geospatialService = {
  calculateSpatialBreakdown(totalAreaM2: number): SpatialBreakdown[] {
    const environmental = Math.round(totalAreaM2 * 0.22);
    const roads = Math.round(totalAreaM2 * 0.16);
    const institutional = Math.round(totalAreaM2 * 0.07);
    const lotsArea = Math.max(0, totalAreaM2 - environmental - roads - institutional);

    return [
      { label: 'Área Loteável Privativa', areaM2: lotsArea, percentage: Math.round((lotsArea / totalAreaM2) * 100), color: '#10b981' },
      { label: 'Preservação Ambiental (APP/Reserva)', areaM2: environmental, percentage: Math.round((environmental / totalAreaM2) * 100), color: '#047857' },
      { label: 'Sistema Viário Interno', areaM2: roads, percentage: Math.round((roads / totalAreaM2) * 100), color: '#6366f1' },
      { label: 'Áreas Públicas e Institucionais', areaM2: institutional, percentage: Math.round((institutional / totalAreaM2) * 100), color: '#f59e0b' }
    ];
  },

  formatHectares(m2: number): string {
    const ha = m2 / 10000;
    return `${ha.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} ha`;
  },

  formatArea(m2: number): string {
    return `${Math.round(m2).toLocaleString('pt-BR')} m²`;
  },

  calculatePolygonAreaM2(points: Point2D[]): number {
    if (points.length < 3) return 0;
    let areaPx = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      areaPx += points[i].x * points[j].y;
      areaPx -= points[j].x * points[i].y;
    }

    areaPx = Math.abs(areaPx) / 2;
    return Math.round(areaPx * (METERS_PER_PIXEL * METERS_PER_PIXEL));
  },

  calculatePolygonPerimeterM(points: Point2D[]): number {
    if (points.length < 2) return 0;
    let perimeterPx = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
      const nextIndex = (i + 1) % n;
      if (points.length === 2 && i === 1) break;
      const dx = points[nextIndex].x - points[i].x;
      const dy = points[nextIndex].y - points[i].y;
      perimeterPx += Math.sqrt(dx * dx + dy * dy);
    }

    return Math.round(perimeterPx * METERS_PER_PIXEL);
  },

  /**
   * Cálculo real geodésico esférico de área para coordenadas reais (Lat/Lng WGS84)
   */
  calculateGeoPolygonAreaM2(coords: LatLngPoint[]): number {
    if (coords.length < 3) return 0;
    const R = 6378137; // Raio da Terra em metros
    let total = 0;
    const n = coords.length;

    for (let i = 0; i < n; i++) {
      const p1 = coords[i];
      const p2 = coords[(i + 1) % n];
      const lat1Rad = (p1.lat * Math.PI) / 180;
      const lat2Rad = (p2.lat * Math.PI) / 180;
      const dLngRad = ((p2.lng - p1.lng) * Math.PI) / 180;
      total += dLngRad * (2 + Math.sin(lat1Rad) + Math.sin(lat2Rad));
    }

    total = Math.abs((total * R * R) / 2);
    return Math.round(total);
  },

  calculateGeoPerimeterM(coords: LatLngPoint[]): number {
    if (coords.length < 2) return 0;
    let totalMeters = 0;
    const R = 6378137;

    for (let i = 0; i < coords.length; i++) {
      const next = (i + 1) % coords.length;
      if (coords.length === 2 && i === 1) break;
      const p1 = coords[i];
      const p2 = coords[next];
      const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
      const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
          Math.cos((p2.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalMeters += R * c;
    }

    return Math.round(totalMeters);
  }
};
