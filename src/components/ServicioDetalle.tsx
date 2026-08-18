// Página de detalle de cada servicio de Integra2
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ServiceDetail } from '@/lib/services';

interface ServicioDetalleProps {
  service: ServiceDetail;
  onBack: () => void;
  onContinue: () => void;
}

export function ServicioDetalle({ service, onBack, onContinue }: ServicioDetalleProps) {
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Patrones decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          {/* Botón volver */}
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </button>

          {/* Icono del servicio */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <Icon size={32} className="text-white" />
          </div>

          {/* Etiqueta */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-sky-100 backdrop-blur-sm ring-1 ring-white/20">
            <CheckCircle2 size={14} />
            Servicio de Integra2
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 text-lg font-medium text-sky-200 sm:text-xl">
            {service.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-base text-sky-100 sm:text-lg">
            {service.heroDescription}
          </p>

          {/* Highlights */}
          <div className="mt-8 flex flex-wrap gap-3">
            {service.highlights.map((highlight) => {
              const HIcon = highlight.icon;
              return (
                <div
                  key={highlight.label}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20"
                >
                  <HIcon size={16} className="text-emerald-300" />
                  {highlight.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Descripción general ===== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Nuestro enfoque</h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {service.overview}
          </p>
        </div>
      </section>

      {/* ===== Proceso paso a paso ===== */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Cómo ejecutamos el proceso</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.process.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-sky-300 hover:bg-white hover:shadow-lg animate-fadeIn"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Número de paso */}
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md">
                    {index + 1}
                  </div>

                  {/* Icono */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md transition-transform group-hover:scale-110">
                    <StepIcon size={24} />
                  </div>

                  {/* Título */}
                  <h3 className="text-base font-bold text-slate-800">{step.title}</h3>

                  {/* Descripción */}
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Beneficios ===== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Beneficios para su empresa</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {service.benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                    <BenefitIcon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 to-blue-700 p-8 text-center shadow-xl sm:p-12">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                ¿Listo para comenzar?
              </h2>
              <p className="mt-3 text-base text-sky-100 sm:text-lg">
                Inicie su proceso de incorporación con Integra2 hoy mismo.
                Su progreso se guarda automáticamente.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={onContinue}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-blue-800 shadow-lg transition-all hover:bg-sky-50 hover:shadow-xl active:scale-95"
                >
                  Comenzar proceso
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={onBack}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                >
                  <ArrowLeft size={18} />
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
