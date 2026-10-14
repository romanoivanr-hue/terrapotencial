import { Coordinates, PropertyData } from '../types';
import { MOCK_PROPERTY } from '../constants';

export interface LocationValidationResult {
  isValid: boolean;
  message: string;
  detectedType?: string;
}

export const locationService = {
  validateLocationFile(file: File): LocationValidationResult {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['kmz', 'kml', 'dwg', 'shp', 'pdf', 'zip'];

    if (!ext || !validExtensions.includes(ext)) {
      return {
        isValid: false,
        message: 'Ainda não conseguimos localizar sua propriedade com segurança. Envie um KMZ, KML, DWG ou documento técnico que contenha informações geográficas.'
      };
    }

    let detectedType = 'Documento Geográfico';
    if (ext === 'kmz' || ext === 'kml') detectedType = 'Google Earth / Vetor KML';
    if (ext === 'dwg') detectedType = 'AutoCAD / Desenho Técnico';
    if (ext === 'shp' || ext === 'zip') detectedType = 'Shapefile GIS';
    if (ext === 'pdf') detectedType = 'Matrícula ou Planta Topográfica';

    return {
      isValid: true,
      message: `Arquivo ${file.name} identificado com sucesso como ${detectedType}.`,
      detectedType
    };
  },

  async mockLocateFromCoordinates(city: string, state: string, coords?: Coordinates): Promise<PropertyData> {
    // Simula chamada de geoprocessamento / backend futuro
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...MOCK_PROPERTY,
      city: city || MOCK_PROPERTY.city,
      state: state || MOCK_PROPERTY.state,
      coordinates: coords || MOCK_PROPERTY.coordinates,
      name: `Gleba Territorial ${city || 'Modelo'}`
    };
  }
};
