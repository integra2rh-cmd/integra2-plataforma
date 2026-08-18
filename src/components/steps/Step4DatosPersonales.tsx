// Paso 4 — Datos personales
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES, HR_IMAGES } from '@/lib/stepImages';
import { ShieldCheck } from 'lucide-react';
import type { PersonalData, OnboardingData } from '@/lib/types';

interface Step4DatosPersonalesProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Provincias de Costa Rica
const PROVINCIAS = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];

export function Step4DatosPersonales({ data, onDataChange, onBack, onContinue }: Step4DatosPersonalesProps) {
  const personal = data.personalData;

  // Actualizar un campo de datos personales
  function updateField(field: keyof PersonalData, value: string) {
    onDataChange({
      personalData: { ...personal, [field]: value },
    });
  }

  // Verificar si el formulario es válido
  const isValid =
    personal.fullName.trim() !== '' &&
    personal.idNumber.trim() !== '' &&
    personal.email.trim() !== '' &&
    personal.phone.trim() !== '';

  return (
    <StepContainer
      title="Datos personales"
      description="Completa tu información personal. Los datos se guardan automáticamente."
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step4} alt="Profesional de recursos humanos" />

      {/* Bloque visual destacado: importancia de los datos correctos */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative h-40 sm:h-auto">
            <img
              src={HR_IMAGES.formReview}
              alt="Profesional revisando formulario"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-6">
            <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <ShieldCheck size={14} />
              Datos verificados
            </div>
            <h3 className="text-sm font-bold text-slate-800">¿Por qué son importantes sus datos?</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Su información personal nos permite gestionar su registro ante la Caja
              Costarricense de Seguro Social (CCSS), el Banco Popular y otras
              instituciones. Datos incorrectos pueden retrasar su incorporación.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Nombre completo */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personal.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Ej: Juan Pérez González"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Número de identificación */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Número de identificación <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personal.idNumber}
              onChange={(e) => updateField('idNumber', e.target.value)}
              placeholder="Ej: 1-2345-6789"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={personal.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={personal.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="Ej: 8888-8888"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={personal.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="Ej: correo@ejemplo.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Dirección */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Dirección
            </label>
            <input
              type="text"
              value={personal.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Ej: 200 metros norte del parque"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Provincia */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Provincia
            </label>
            <select
              value={personal.province}
              onChange={(e) => updateField('province', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100 bg-white"
            >
              <option value="">Seleccionar...</option>
              {PROVINCIAS.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {/* Cantón */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cantón
            </label>
            <input
              type="text"
              value={personal.canton}
              onChange={(e) => updateField('canton', e.target.value)}
              placeholder="Ej: San José"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Distrito */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Distrito
            </label>
            <input
              type="text"
              value={personal.district}
              onChange={(e) => updateField('district', e.target.value)}
              placeholder="Ej: Carmen"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Contacto de emergencia */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Contacto de emergencia
            </label>
            <input
              type="text"
              value={personal.emergencyContact}
              onChange={(e) => updateField('emergencyContact', e.target.value)}
              placeholder="Nombre completo"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Teléfono del contacto de emergencia */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Teléfono del contacto de emergencia
            </label>
            <input
              type="tel"
              value={personal.emergencyPhone}
              onChange={(e) => updateField('emergencyPhone', e.target.value)}
              placeholder="Ej: 8888-8888"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Nota de guardado automático */}
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-sky-50 px-4 py-3 text-sm text-blue-700">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Los datos se guardan automáticamente mientras escribes.
        </div>
      </div>

      <NavigationButtons
        currentStep={4}
        onBack={onBack}
        onContinue={onContinue}
        canContinue={isValid}
      />
    </StepContainer>
  );
}
