// Botones de navegación: Regresar y Continuar
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
  canContinue?: boolean;
}

export function NavigationButtons({
  currentStep,
  onBack,
  onContinue,
  continueLabel = 'Continuar',
  canContinue = true,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {/* Botón Regresar */}
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft size={18} />
        Regresar
      </button>

      {/* Botón Continuar */}
      {currentStep < 9 && (
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {continueLabel}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
