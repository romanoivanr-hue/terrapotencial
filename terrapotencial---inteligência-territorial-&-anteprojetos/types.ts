export type AppView = 
  | 'landing' 
  | 'location_input' 
  | 'processing' 
  | 'preview' 
  | 'customer_form' 
  | 'checkout' 
  | 'complementary_upload' 
  | 'dashboard' 
  | 'study_detail';

export type FileType = 'KMZ' | 'KML' | 'DWG' | 'SHP' | 'PDF_MATRICULA' | 'TOPOGRAFIA' | 'FOTO' | 'OUTRO';

export type DocumentStatus = 'Enviando' | 'Enviado' | 'Processando' | 'Erro';

export interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploadedAt: string;
  status: DocumentStatus;
  category: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface PropertyData {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: Coordinates;
  totalAreaM2: number;
  totalAreaHa: number;
  perimeterM: number;
  usableAreaM2?: number;
  environmentalAreaM2?: number;
  estimatedLots?: number;
  averageLotSizeM2?: number;
  potentialGdv?: string;
  zoningClassification?: string;
  topographyType?: 'Suave' | 'Ondulado' | 'Acidentado';
  isMock: boolean;
  customPolygon?: Point2D[];
  realGeoPolygon?: LatLngPoint[];
}

export type StudyStatus = 
  | 'Aguardando Documentos' 
  | 'Validação' 
  | 'Análise Territorial' 
  | 'Desenvolvimento de Anteprojeto' 
  | 'Revisão Técnica' 
  | 'Concluído';

export interface StudyTimelineStep {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface Study {
  protocol: string;
  createdAt: string;
  estimatedDeliveryDate: string;
  property: PropertyData;
  client: CustomerData;
  planId: string;
  planName: string;
  price: number;
  revisionsAllowed: number;
  revisionsUsed: number;
  hasMeeting: boolean;
  progress: number;
  status: StudyStatus;
  timeline: StudyTimelineStep[];
  files: UploadedFile[];
  pdfAvailable: boolean;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  documentCpfCnpj?: string;
  role: 'Proprietário' | 'Investidor' | 'Loteador' | 'Engenheiro/Arquiteto' | 'Imobiliária' | 'Outro';
  projectObjective: 'Loteamento Aberto' | 'Condomínio Fechado' | 'Chácaras de Lazer' | 'Misto' | 'Avaliação de Potencial';
  notes?: string;
}

export interface PricingPlan {
  id: 'estudo-preliminar' | 'estudo-completo' | 'corporate-mensal';
  code: string;
  name: string;
  badge?: string;
  tagline: string;
  price: number;
  priceLabel?: string;
  originalPrice?: number;
  installments?: string;
  revisionsCount: number;
  includesMeeting: boolean;
  meetingDescription?: string;
  highlighted: boolean;
  features: string[];
  ctaLabel: string;
}
