// Paso 9 — Finalizar incorporación
import { PartyPopper, CheckCircle2, RotateCcw, BadgeCheck, Building2, Briefcase, Calendar, User, ArrowLeft, Gift, ClipboardCheck, Users } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES, HR_IMAGES } from '@/lib/stepImages';
import type { OnboardingData } from '@/lib/types';

interface Step9FinalizarProps {
  data: OnboardingData;
  onBack: () => void;
  onNewProcess: () => void;
}

export function Step9Finalizar({ data, onBack, onNewProcess }: Step9FinalizarProps) {
  const entryDate = new Date().toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <StepContainer title="Finalizar incorporación">
      <StepImageBanner imageUrl={STEP_IMAGES.step9} alt="Celebración de equipo" />

      {/* Imagen destacada de bienvenida al equipo */}
      <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
        <div className="relative h-48 sm:h-64">
          <img
            src={HR_IMAGES.teamCelebration}
            alt="Equipo celebrando la incorporación"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/30">
              <PartyPopper size={14} />
              ¡Bienvenido al equipo!
            </div>
            <h3 className="text-lg font-bold text-white drop-shadow-md sm:text-xl">
              Su incorporación se ha completado exitosamente
            </h3>
            <p className="mt-1 text-xs text-sky-100 sm:text-sm">
              El equipo de Recursos Humanos le da la bienvenida
            </p>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
          <PartyPopper className="text-blue-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          ¡Incorporación completada!
        </h2>
        <p className="mt-3 text-base text-slate-500">
          Proceso completado correctamente.
        </p>
      </div>

      {/* Tarjeta de resumen */}
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
            <BadgeCheck className="text-blue-600" size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Resumen de incorporación</h3>
            <p className="text-xs text-slate-500">Datos del proceso completado</p>
          </div>
        </div>

        {/* Datos del resumen */}
        <div className="space-y-4">
          <SummaryItem
            icon={<User size={18} />}
            label="Nombre"
            value={data.personalData.fullName || 'No disponible'}
          />
          <SummaryItem
            icon={<Building2 size={18} />}
            label="Empresa"
            value={data.company?.name || 'No disponible'}
          />
          <SummaryItem
            icon={<Briefcase size={18} />}
            label="Puesto"
            value={data.vacancy?.title || 'No disponible'}
          />
          <SummaryItem
            icon={<Calendar size={18} />}
            label="Fecha de ingreso"
            value={entryDate}
          />
          <div className="flex items-center gap-3 rounded-lg bg-sky-50 px-4 py-3">
            <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-xs text-blue-600 font-medium">Estado</p>
              <p className="text-sm font-bold text-blue-700">Listo para incorporación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={onNewProcess}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 sm:w-auto"
        >
          <RotateCcw size={18} />
          Nuevo proceso
        </button>
      </div>

      {/* Pasos siguientes: lo que viene ahora */}
      <div className="mt-8 mx-auto max-w-lg">
        <h3 className="mb-4 text-center text-sm font-bold text-slate-800">¿Qué sigue ahora?</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Recepción del carnet */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="relative h-24">
              <img
                src={HR_IMAGES.welcomeGift}
                alt="Kit de bienvenida"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-1.5 text-blue-600">
                <Gift size={16} />
                <span className="text-xs font-bold">Kit de bienvenida</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Recibirá su carnet de identificación y materiales de trabajo.
              </p>
            </div>
          </div>

          {/* Inducción */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="relative h-24">
              <img
                src={HR_IMAGES.trainingSeminar}
                alt="Sesión de inducción"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-1.5 text-blue-600">
                <ClipboardCheck size={16} />
                <span className="text-xs font-bold">Inducción</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Participará en una sesión de inducción sobre la empresa y su puesto.
              </p>
            </div>
          </div>

          {/* Primer día */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="relative h-24">
              <img
                src={HR_IMAGES.teamMeeting}
                alt="Primer día de trabajo"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center gap-1.5 text-blue-600">
                <Users size={16} />
                <span className="text-xs font-bold">Primer día</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Conocerá a su equipo de trabajo y sus responsabilidades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón regresar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft size={16} />
          Regresar
        </button>
      </div>
    </StepContainer>
  );
}

// Item del resumen
function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );
}
