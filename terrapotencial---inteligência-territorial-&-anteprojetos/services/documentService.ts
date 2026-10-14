import { UploadedFile, FileType } from '../types';
import { MAX_COMPLEMENTARY_FILES } from '../constants';

export const documentService = {
  canUploadMore(currentCount: number): boolean {
    return currentCount < MAX_COMPLEMENTARY_FILES;
  },

  formatFileSize(bytes: number): string {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  },

  detectCategory(fileName: string, type: FileType): string {
    const lower = fileName.toLowerCase();
    if (lower.includes('matricula') || lower.includes('registro')) return 'Documento Registrário';
    if (lower.includes('topo') || lower.includes('curva') || lower.includes('relevo')) return 'Topografia & Relevo';
    if (lower.includes('ambiental') || lower.includes('app') || lower.includes('car')) return 'Condicionante Ambiental';
    if (lower.includes('zoneamento') || lower.includes('viabilidade')) return 'Urbanístico & Legal';
    if (type === 'KMZ' || type === 'KML' || type === 'SHP') return 'Georreferenciamento';
    return 'Documento Complementar';
  }
};
