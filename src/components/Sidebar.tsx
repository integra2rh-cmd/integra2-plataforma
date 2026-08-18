// Menú lateral con los 10 pasos del proceso
import { Check, Circle, X, Home, Building2, Briefcase, User, FileText, CreditCard, Camera, HelpCircle, PartyPopper } from 'lucide-react';
import { STEPS } from '@/lib/steps';
import type { OnboardingData } from '@/lib/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  data: OnboardingData;
  onStepSelect: (step: number) => void;
}

// Imagen de fondo corporativa
const SIDEBAR_BG = 'https://images.pexels.com/photos/33362520/pexels-photo-33362520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

// Iconos para cada paso
const STEP_ICONS = [
  Home, Building2, Briefcase, User, FileText, CreditCard, Camera, HelpCircle, PartyPopper
];

// Determinar si un paso está completado
function isStepCompleted(step: number, data: OnboardingData): boolean {
  switch (step) {
    case 1: return true;
    case 2: return data.company !== null;
    case 3: return data.vacancy !== null;
    case 4: return data.personalData.fullName.trim() !== '';
    case 5: return data.documentFiles.identityDocument !== null;
    case 6: return data.bankLink !== null;
    case 7: return data.photo !== null;
    case 8: return Object.keys(data.questionnaire.answers).length > 0;
    case 9: return data.status === 'completed';
    default: return false;
  }
}

export function Sidebar({ isOpen, onClose, currentStep, data, onStepSelect }: SidebarProps) {
  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel lateral */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Encabezado con imagen de fondo */}
        <div className="relative shrink-0 overflow-hidden">
          <img
            src={SIDEBAR_BG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-sky-800/85" />
          <div className="relative flex items-start justify-between px-5 py-5">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">INTEGRA2</span>
              </div>
              <h2 className="text-lg font-bold text-white drop-shadow-sm">Pasos del proceso</h2>
              <p className="text-xs text-sky-200">Incorporación laboral</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Lista de pasos con línea conectora */}
        <nav className="relative flex-1 overflow-y-auto py-3">
          {/* Línea conectora vertical */}
          <div
            className="pointer-events-none absolute left-[37px] top-6 bottom-6 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => {
            const completed = isStepCompleted(step.id, data);
            const isCurrent = step.id === currentStep;
            const Icon = STEP_ICONS[index];
            const isLast = index === STEPS.length - 1;

            return (
              <button
                key={step.id}
                onClick={() => onStepSelect(step.id)}
                className={`group relative flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                  isCurrent
                    ? 'bg-sky-50'
                    : completed
                    ? 'text-slate-700 hover:bg-slate-50'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {/* Barra lateral de paso actual */}
                {isCurrent && (
                  <span className="absolute left-0 top-1/2 h-8 -translate-y-1/2 w-1 rounded-r-full bg-blue-600" />
                )}

                {/* Indicador de estado */}
                <div className="relative z-10 flex-shrink-0">
                  {completed && !isCurrent ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-100 bg-white text-blue-600 shadow-sm">
                      <Check size={16} />
                    </div>
                  ) : isCurrent ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/30">
                      <Icon size={15} />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-300">
                      <Circle size={12} />
                    </div>
                  )}
                </div>

                {/* Número y título */}
                <div className={`flex-1 min-w-0 ${isLast ? 'pb-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-slate-300'}`}>
                      {step.id}.
                    </span>
                    <span className={`text-sm truncate ${isCurrent ? 'font-semibold text-blue-800' : ''}`}>
                      {step.title}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Pie con logo y leyenda */}
        <div className="relative shrink-0 overflow-hidden border-t border-slate-100 bg-gradient-to-br from-slate-900 to-blue-900 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">INTEGRA2</span>
            <span className="text-[10px] font-medium text-slate-400">Costa Rica</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
              <span>Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border-2 border-sky-200 bg-white" />
              <span>Completado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border-2 border-slate-500 bg-slate-700" />
              <span>Pendiente</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
