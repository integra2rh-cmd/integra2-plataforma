// Paso 1 — Inicio
import {
  ArrowRight,
  Briefcase,
  FileText,
  UserCheck,
  Scale,
  ArrowRight as ArrowRightIcon,
  Search,
  Users,
  FileSignature,
  ClipboardCheck,
  Target,
  Handshake,
  Lock,
  ClipboardList,
} from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { FaqSection } from '@/components/FaqSection';
import { STEP_IMAGES } from '@/lib/stepImages';

interface Step1InicioProps {
  onContinue: () => void;
  onNavigateLaboral: () => void;
  onNavigateService: (serviceId: string) => void;
}

const SERVICES = [
  {
    icon: Search,
    title: 'Reclutamiento',
    description: 'Identificamos y atraemos al talento adecuado para cada puesto dentro de su organización.',
  },
  {
    icon: Users,
    title: 'Selección',
    description: 'Evaluamos competencias y habilidades para garantizar el mejor ajuste entre candidato y vacante.',
  },
  {
    icon: FileSignature,
    title: 'Contratación',
    description: 'Gestionamos todo el proceso documental y legal para una incorporación rápida y segura.',
  },
  {
    icon: ClipboardCheck,
    title: 'Gestión de personal',
    description: 'Administramos su equipo con un acompañamiento integral durante toda la relación laboral.',
  },
];

export function Step1Inicio({ onContinue, onNavigateLaboral, onNavigateService }: Step1InicioProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-fadeIn">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${STEP_IMAGES.step1}')` }}
      />
      {/* Capa semitransparente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/60 to-slate-900/80" />

      {/* Contenido encima del fondo */}
      <div className="relative">
        <StepContainer
          title="Bienvenido a Integra2"
          description="Outsourcing y Gestión de Recursos Humanos para Empresas en Costa Rica"
        >
          {/* Tarjeta principal de presentación */}
          <div className="rounded-2xl bg-blue-800/40 p-6 text-white shadow-xl backdrop-blur-md ring-1 ring-white/20 sm:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur-sm ring-1 ring-white/20">
              <Target size={14} />
              Nuestro propósito
            </div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Outsourcing de Recursos Humanos en Costa Rica: conectamos empresas con talento humano calificado
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-sky-50 sm:text-base">
              Ofrecemos servicios de reclutamiento, selección, contratación y
              gestión de personal. Acompañamos a las empresas en cada etapa del
              ciclo laboral con un enfoque profesional, transparente y eficiente.
            </p>

            {/* Resumen de pasos del proceso */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
                <Briefcase className="mb-2 text-sky-200" size={28} />
                <p className="text-sm font-medium">Selecciona empresa y vacante</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
                <FileText className="mb-2 text-sky-200" size={28} />
                <p className="text-sm font-medium">Completa tu documentación</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
                <UserCheck className="mb-2 text-sky-200" size={28} />
                <p className="text-sm font-medium">Obtén tu carnet de trabajo</p>
              </div>
            </div>
          </div>

          {/* Sección de servicios principales */}
          <div id="servicios" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.title}
                  onClick={() => onNavigateService(service.id)}
                  className="group rounded-2xl bg-white/85 p-5 shadow-lg backdrop-blur-md ring-1 ring-white/30 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-0.5 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/90 text-white shadow-md transition-colors group-hover:bg-blue-700">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-800">{service.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Ver detalles del servicio
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botón Comenzar */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={onContinue}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            >
              Comenzar
              <ArrowRight size={20} />
            </button>
            <p className="text-xs text-sky-100/80">
              Su progreso se guarda automáticamente
            </p>
          </div>

          {/* Bloque de registro de datos */}
          <div className="relative mt-6 overflow-hidden rounded-2xl bg-slate-900/50 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:p-8">
            <div className="absolute top-0 right-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur-sm ring-1 ring-white/20">
                <ClipboardList size={14} />
                Registro de datos
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                Registra tus datos para continuar con el proceso de Recursos Humanos
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-sky-100 sm:text-base">
                Completa los campos solicitados con información correcta y actualizada.
                Estos datos nos permitirán gestionar tu registro y avanzar correctamente
                en las siguientes etapas del proceso.
              </p>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-white/5 p-3.5 ring-1 ring-white/10">
                <Lock size={16} className="mt-0.5 flex-shrink-0 text-emerald-300" />
                <p className="text-xs text-sky-50/90 leading-relaxed">
                  Tu información será tratada de forma confidencial y utilizada
                  únicamente para los fines relacionados con el proceso de Recursos Humanos.
                </p>
              </div>
            </div>
          </div>

          {/* Bloque de compromiso con las empresas */}
          <div className="mt-8 rounded-2xl bg-slate-900/50 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/30">
                <Handshake size={28} className="text-sky-200" />
              </div>
              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Aliados estratégicos de su empresa
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-sky-100 sm:text-base">
                  Trabajamos de la mano con empresas de diversos sectores para
                  construir equipos sólidos y productivos. Nos encargamos del
                  talento humano para que usted se enfoque en hacer crecer su negocio.
                </p>
              </div>
            </div>
          </div>

          {/* Bloque destacado: Centro Laboral */}
          <div id="centro-laboral" className="relative mt-6 mb-6 overflow-hidden rounded-2xl bg-slate-900/50 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:p-10">
            {/* Elementos visuales tecnológicos */}
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100 backdrop-blur-sm ring-1 ring-white/20">
                <Scale size={14} />
                Información de referencia
              </div>
              <h3 className="text-xl font-bold sm:text-2xl">
                ¿Conoce sus derechos laborales?
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-sky-100 sm:text-base">
                Encuentre información general sobre legislación laboral, contratos,
                jornadas, salarios, vacaciones, prestaciones y otros temas
                relacionados con el trabajo en Costa Rica.
              </p>
              <button
                onClick={onNavigateLaboral}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-lg transition-all hover:bg-sky-50 hover:shadow-xl active:scale-95"
              >
                Consultar Centro Laboral
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </div>

          {/* Sección de preguntas frecuentes (SEO + GEO) */}
          <div className="mt-6 mb-6">
            <FaqSection />
          </div>
        </StepContainer>
      </div>
    </div>
  );
}
