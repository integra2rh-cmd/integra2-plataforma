// Integra2 — Aplicación principal
import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { CentroLaboral } from '@/components/CentroLaboral';
import { Step1Inicio } from '@/components/steps/Step1Inicio';
import { Step2Empresa } from '@/components/steps/Step2Empresa';
import { Step3Vacante } from '@/components/steps/Step3Vacante';
import { Step4DatosPersonales } from '@/components/steps/Step4DatosPersonales';
import { Step5Documentacion } from '@/components/steps/Step5Documentacion';
import { Step6DniElectronico } from '@/components/steps/Step6DniElectronico';
import { Step7Fotografia } from '@/components/steps/Step7Fotografia';
import { Step8Preguntas } from '@/components/steps/Step8Preguntas';
import { Step9Finalizar } from '@/components/steps/Step10Finalizar';
import { loadFromLocalStorage, saveToLocalStorage, clearAllStorage, loadCurrentStep, saveCurrentStep, loadCurrentStepSmart, cleanupRedirectParams } from '@/lib/storage';
import type { OnboardingData } from '@/lib/types';
import { SERVICES } from '@/lib/services';
import { ServicioDetalle } from '@/components/ServicioDetalle';

type View = 'onboarding' | 'laboral' | 'servicio';

function App() {
  // Estado: datos del proceso y paso actual
  const [data, setData] = useState<OnboardingData>(() => loadFromLocalStorage());
  const [currentStep, setCurrentStep] = useState<number>(() => loadCurrentStep());
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>('onboarding');
  const [isReady, setIsReady] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Recuperar información al cargar la aplicación
  useEffect(() => {
    // Limpiar parámetros de redirección bancaria que Chrome puede conservar
    // en la URL y causar comportamientos erráticos.
    cleanupRedirectParams();

    const savedData = loadFromLocalStorage();
    // Usar recuperación inteligente: si el paso guardado se perdió, calcular
    // el paso correcto según los datos ya completados.
    const savedStep = loadCurrentStepSmart(savedData);
    setData(savedData);
    setCurrentStep(savedStep);
    setIsReady(true);
  }, []);

  // Guardar datos en LocalStorage cuando cambien
  useEffect(() => {
    saveToLocalStorage(data);
  }, [data]);

  // Guardar paso actual en LocalStorage cuando cambie
  useEffect(() => {
    saveCurrentStep(currentStep);
  }, [currentStep]);

  // Actualizar datos del proceso
  const handleDataChange = useCallback((newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  // Cambiar de paso
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 9) {
      setCurrentStep(step);
      setMenuOpen(false);
      setView('onboarding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Avanzar al siguiente paso
  const handleContinue = useCallback(() => {
    if (currentStep < 9) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, goToStep]);

  // Regresar al paso anterior
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  // Iniciar un nuevo proceso: limpiar todos los datos
  const handleNewProcess = useCallback(() => {
    if (window.confirm('¿Está seguro que desea iniciar un nuevo proceso? Se perderán todos los datos guardados.')) {
      clearAllStorage();
      setData(loadFromLocalStorage());
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Navegación entre vistas
  const handleNavigate = useCallback((target: 'home' | 'laboral') => {
    setView(target === 'laboral' ? 'laboral' : 'onboarding');
    setSelectedServiceId(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navegación a la página de un servicio
  const handleNavigateService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);
    setView('servicio');
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Marcar el proceso como completado al llegar al paso 9
  useEffect(() => {
    if (currentStep === 9 && data.status !== 'completed') {
      setData((prev) => ({ ...prev, status: 'completed' }));
    }
  }, [currentStep, data.status]);

  // Renderizar el paso actual
  function renderStep() {
    switch (currentStep) {
      case 1:
        return <Step1Inicio onContinue={handleContinue} onNavigateLaboral={() => handleNavigate('laboral')} onNavigateService={handleNavigateService} />;
      case 2:
        return <Step2Empresa data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 3:
        return <Step3Vacante data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 4:
        return <Step4DatosPersonales data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 5:
        return <Step5Documentacion data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 6:
        return <Step6DniElectronico data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 7:
        return <Step7Fotografia data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 8:
        return <Step8Preguntas data={data} onDataChange={handleDataChange} onBack={handleBack} onContinue={handleContinue} />;
      case 9:
        return (
          <Step9Finalizar
            data={data}
            onBack={handleBack}
            onNewProcess={handleNewProcess}
          />
        );
      default:
        return <Step1Inicio onContinue={handleContinue} onNavigateLaboral={() => handleNavigate('laboral')} onNavigateService={handleNavigateService} />;
    }
  }

  // Pantalla de carga mientras se restaura el estado guardado
  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <p className="text-sm font-medium text-slate-600">Cargando su proceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Encabezado */}
      <Header
        onToggleMenu={() => setMenuOpen(true)}
        currentView={view}
        onNavigate={handleNavigate}
      />

      {/* Menú lateral */}
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentStep={currentStep}
        data={data}
        onStepSelect={goToStep}
      />

      {/* Contenido principal */}
      {view === 'laboral' ? (
        <main className="flex-1 pt-16">
          <CentroLaboral onBackToHome={() => handleNavigate('home')} />
        </main>
      ) : view === 'servicio' && selectedServiceId ? (
        <main className="flex-1 pt-16">
          {(() => {
            const service = SERVICES.find((s) => s.id === selectedServiceId);
            if (!service) return null;
            return (
              <ServicioDetalle
                service={service}
                onBack={() => handleNavigate('home')}
                onContinue={() => {
                  setView('onboarding');
                  setSelectedServiceId(null);
                  goToStep(2);
                }}
              />
            );
          })()}
        </main>
      ) : (
        <main className="px-4 pb-12 pt-24 sm:px-6 sm:pt-28 flex-1">
          {/* Paso actual */}
          <div className="animate-fadeIn">
            {renderStep()}
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer onNavigateLaboral={() => handleNavigate('laboral')} />

      {/* Banner de cookies */}
      <CookieBanner />
    </div>
  );
}

export default App;
