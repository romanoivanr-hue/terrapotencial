import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromiseSection } from './components/PromiseSection';
import { HowItWorks } from './components/HowItWorks';
import { LocationModal } from './components/LocationModal';
import { ProcessingView } from './components/ProcessingView';
import { PotentialPreview } from './components/PotentialPreview';
import { ProductDossierPreview } from './components/ProductDossierPreview';
import { PricingSection } from './components/PricingSection';
import { CustomerFormModal } from './components/CustomerFormModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ComplementaryUploadModal } from './components/ComplementaryUploadModal';
import { DashboardView } from './components/DashboardView';
import { StudyDetailsView } from './components/StudyDetailsView';
import { PdfDossierModal } from './components/PdfDossierModal';
import { DeployHelpModal } from './components/DeployHelpModal';
import { DomainDeployGuideModal } from './components/DomainDeployGuideModal';
import { Footer } from './components/Footer';
import { AppView, PropertyData, CustomerData, Study, UploadedFile, Coordinates, LatLngPoint, Point2D, PricingPlan } from './types';
import { MOCK_PROPERTY, INITIAL_STUDIES, PRICING_PLANS } from './constants';
import { locationService } from './services/locationService';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [studies, setStudies] = useState<Study[]>(INITIAL_STUDIES);
  const [activeStudy, setActiveStudy] = useState<Study | null>(INITIAL_STUDIES[0]);

  // Current property being analyzed
  const [currentProperty, setCurrentProperty] = useState<PropertyData>(MOCK_PROPERTY);
  const [selectedFileName, setSelectedFileName] = useState<string>('Gleba_Satelite_Georreferenciada.shp');

  // Customer & Lead
  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>({
    name: 'Roberto V. Mendonça',
    email: 'roberto@mendoncapar.com.br',
    phone: '(48) 99182-3344',
    documentCpfCnpj: '12.345.678/0001-90',
    role: 'Proprietário',
    projectObjective: 'Condomínio Fechado'
  });

  // Selected commercial tier
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(PRICING_PLANS[1]);

  // Modal open states
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDeployHelpOpen, setIsDeployHelpOpen] = useState(false);
  const [isDomainGuideOpen, setIsDomainGuideOpen] = useState(false);

  // Active protocol after purchase
  const [currentProtocol, setCurrentProtocol] = useState<string>('TR-2026-000123');

  // Complementary files state
  const [complementaryFiles, setComplementaryFiles] = useState<UploadedFile[]>([
    {
      id: 'f-init-1',
      name: 'Poligono_Propriedade_WGS84.kmz',
      type: 'KMZ',
      size: '2.4 MB',
      uploadedAt: 'Hoje',
      status: 'Enviado',
      category: 'Georreferenciamento'
    }
  ]);

  // 1. Triggered when user clicks "Analisar minha terra"
  const handleOpenLocation = () => {
    setIsLocationModalOpen(true);
  };

  // 2. Triggered when file, drawn polygon or coordinates are selected in LocationModal
  const handleLocationIdentified = async (
    file?: File,
    manualData?: { 
      city: string; 
      state: string; 
      coords?: Coordinates; 
      customPolygon?: Point2D[];
      realGeoPolygon?: LatLngPoint[];
      customAreaM2?: number; 
      customPerimeterM?: number;
    }
  ) => {
    setIsLocationModalOpen(false);
    setSelectedFileName(
      file 
        ? file.name 
        : manualData?.realGeoPolygon 
        ? `Delimitacao_Satelite_${manualData.city}.shp` 
        : `${manualData?.city || 'Propriedade'}.kmz`
    );

    // Inicia animação elegante de processamento
    setCurrentView('processing');

    if (manualData?.customAreaM2) {
      const areaM2 = manualData.customAreaM2;
      const perimeterM = manualData.customPerimeterM || Math.round(Math.sqrt(areaM2) * 4);
      const usableAreaM2 = Math.round(areaM2 * 0.65);
      const environmentalAreaM2 = Math.round(areaM2 * 0.25);
      const estimatedLots = Math.max(12, Math.round(usableAreaM2 / 450));

      setCurrentProperty({
        id: `prop-custom-${Date.now()}`,
        name: `Gleba ${manualData.city} (Satélite Real)`,
        city: manualData.city,
        state: manualData.state,
        coordinates: manualData.coords || { lat: -27.5954, lng: -48.5480 },
        totalAreaM2: areaM2,
        totalAreaHa: +(areaM2 / 10000).toFixed(1),
        perimeterM,
        usableAreaM2,
        environmentalAreaM2,
        estimatedLots,
        averageLotSizeM2: 450,
        potentialGdv: `R$ ${(estimatedLots * 150000).toLocaleString('pt-BR')}`,
        zoningClassification: 'Zona de Expansão Urbana (ZEU)',
        topographyType: 'Suave',
        isMock: false,
        customPolygon: manualData.customPolygon,
        realGeoPolygon: manualData.realGeoPolygon
      });
    } else if (manualData) {
      const prop = await locationService.mockLocateFromCoordinates(
        manualData.city,
        manualData.state,
        manualData.coords
      );
      setCurrentProperty(prop);
    } else {
      setCurrentProperty({
        ...MOCK_PROPERTY,
        name: file?.name ? file.name.replace(/\.[^/.]+$/, "") : MOCK_PROPERTY.name
      });
    }
  };

  // 3. Processing finished -> show Preview (Encontramos sua propriedade)
  const handleProcessingFinished = () => {
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Commercial Unlock -> Open Customer lead form
  const handleUnlockStudy = () => {
    setIsCustomerModalOpen(true);
  };

  // 5. Customer Form submitted -> Open Checkout
  const handleCustomerSubmit = (data: CustomerData) => {
    setCurrentCustomer(data);
    setIsCustomerModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // 6. Direct plan selection from pricing section
  const handleSelectPricingPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutModalOpen(true);
  };

  // 7. Payment approved -> Go to Complementary Upload (Up to 10 files)
  const handlePaymentSuccess = (protocol: string, plan: PricingPlan) => {
    setCurrentProtocol(protocol);
    setIsCheckoutModalOpen(false);

    // Cria novo estudo estruturado
    const newStudy: Study = {
      protocol,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      estimatedDeliveryDate: 'Em 5 dias úteis',
      property: currentProperty,
      client: currentCustomer,
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      revisionsAllowed: plan.revisionsCount,
      revisionsUsed: 0,
      hasMeeting: plan.includesMeeting,
      progress: 30,
      status: 'Aguardando Documentos',
      timeline: [
        { step: 1, title: 'Contratação e Protocolo', description: `Pagamento confirmado e protocolo ${protocol} emitido (${plan.name})`, status: 'completed', date: 'Hoje' },
        { step: 2, title: 'Upload dos Documentos Complementares', description: 'Recepção de matrículas, DWG e fotos', status: 'current', date: 'Em andamento' },
        { step: 3, title: 'Validação e Georreferenciamento', description: 'Cruzamento com limites cadastrais', status: 'pending' },
        { step: 4, title: 'Análise Territorial & APPs', description: 'Diagnóstico hídrico e topográfico', status: 'pending' },
        { step: 5, title: 'Desenvolvimento do Anteprojeto', description: 'Traçado viário e lotes', status: 'pending' },
        { step: 6, title: plan.includesMeeting ? 'Reunião Técnica Online & Entrega' : 'Dossiê Executivo Final', description: 'Emissão da apresentação e alinhamento', status: 'pending' }
      ],
      files: complementaryFiles,
      pdfAvailable: true
    };

    setStudies([newStudy, ...studies]);
    setActiveStudy(newStudy);
    setCurrentView('complementary_upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddFile = (file: UploadedFile) => {
    setComplementaryFiles(prev => [...prev, file]);
  };

  const handleRemoveFile = (fileId: string) => {
    setComplementaryFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleFinishComplementary = () => {
    if (activeStudy) {
      const updated = {
        ...activeStudy,
        status: 'Análise Territorial' as const,
        progress: 50,
        files: complementaryFiles
      };
      setActiveStudy(updated);
      setStudies(studies.map(s => s.protocol === updated.protocol ? updated : s));
    }
    setCurrentView('study_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d17] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        onStartAnalysis={handleOpenLocation}
        onViewDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeployHelp={() => setIsDeployHelpOpen(true)}
        onOpenDomainGuide={() => setIsDomainGuideOpen(true)}
        activeStudiesCount={studies.length}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        
        {/* Landing Page View */}
        {currentView === 'landing' && (
          <>
            <HeroSection
              onStartAnalysis={handleOpenLocation}
              onExploreDemo={() => {
                setCurrentProperty(MOCK_PROPERTY);
                setCurrentView('preview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <PromiseSection />
            <HowItWorks />
            <ProductDossierPreview />
            <PricingSection
              onSelectPlan={handleSelectPricingPlan}
              onOpenDeployHelp={() => setIsDomainGuideOpen(true)}
            />
          </>
        )}

        {/* Processing State */}
        {currentView === 'processing' && (
          <ProcessingView
            fileName={selectedFileName}
            onFinished={handleProcessingFinished}
          />
        )}

        {/* First Potential Preview View (Found Property & Locked Study) */}
        {currentView === 'preview' && (
          <PotentialPreview
            property={currentProperty}
            onUnlockStudy={handleUnlockStudy}
            onModifyLocation={handleOpenLocation}
          />
        )}

        {/* Complementary Upload Phase (Max 10 files) */}
        {currentView === 'complementary_upload' && (
          <ComplementaryUploadModal
            protocol={currentProtocol}
            files={complementaryFiles}
            onAddFile={handleAddFile}
            onRemoveFile={handleRemoveFile}
            onFinish={handleFinishComplementary}
          />
        )}

        {/* Client Dashboard View */}
        {currentView === 'dashboard' && (
          <DashboardView
            studies={studies}
            onSelectStudy={(std) => {
              setActiveStudy(std);
              setCurrentView('study_detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNewAnalysis={handleOpenLocation}
          />
        )}

        {/* Single Study Detail View */}
        {currentView === 'study_detail' && activeStudy && (
          <StudyDetailsView
            study={activeStudy}
            onBack={() => setCurrentView('dashboard')}
            onOpenPdf={() => setIsPdfModalOpen(true)}
          />
        )}

      </main>

      {/* Modals & Dialogs */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationIdentified={handleLocationIdentified}
      />

      <CustomerFormModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        property={currentProperty}
        onSubmit={handleCustomerSubmit}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        property={currentProperty}
        customer={currentCustomer}
        selectedPlan={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {activeStudy && (
        <PdfDossierModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          study={activeStudy}
        />
      )}

      <DeployHelpModal
        isOpen={isDeployHelpOpen}
        onClose={() => setIsDeployHelpOpen(false)}
      />

      <DomainDeployGuideModal
        isOpen={isDomainGuideOpen}
        onClose={() => setIsDomainGuideOpen(false)}
      />

      {/* Footer */}
      <Footer onStartAnalysis={handleOpenLocation} />

    </div>
  );
}
