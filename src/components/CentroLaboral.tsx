// Centro de Información Laboral — página secundaria
import { useState, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, Search, Scale, BookOpen, ExternalLink, X,
  ShieldCheck, Users, Clock, DollarSign, CalendarDays, FileText,
  HardHat, Umbrella, LogOut, TrendingDown, Receipt,
  Gavel, Info, BookMarked, Building2,
} from 'lucide-react';
import { LABOR_TOPICS, OFFICIAL_LINKS, type LaborTopic } from '@/lib/laborTopics';

interface CentroLaboralProps {
  onBackToHome: () => void;
}

// Iconos por tema
const TOPIC_ICONS: Record<string, typeof ShieldCheck> = {
  'derechos-trabajador': Users,
  'obligaciones-empleador': Building2,
  'jornadas-horarios': Clock,
  'salarios-remuneraciones': DollarSign,
  'vacaciones-feriados': CalendarDays,
  'contratos-trabajo': FileText,
  'seguridad-salud': HardHat,
  'proteccion-especial': Umbrella,
  'terminacion-relacion': LogOut,
  'despidos-indemnizaciones': TrendingDown,
  'aportes-cargas-sociales': Receipt,
  'codigo-trabajo': Gavel,
};

export function CentroLaboral({ onBackToHome }: CentroLaboralProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<LaborTopic | null>(null);

  // Filtrar temas según la búsqueda
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return LABOR_TOPICS;
    const query = searchQuery.toLowerCase().trim();
    return LABOR_TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.keywords.some((kw) => kw.includes(query)),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Patrón tecnológico de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          {/* Etiqueta visual */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-sky-100 backdrop-blur-sm ring-1 ring-white/20">
            <BookMarked size={14} />
            Información de referencia
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Centro de Información Laboral
          </h1>
          <p className="mt-4 max-w-2xl text-base text-sky-100 sm:text-lg">
            Información de referencia sobre derechos, obligaciones y aspectos fundamentales
            de las relaciones laborales en Costa Rica.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-sky-200/80">
            En INTEGRA2 RH ponemos a disposición información de referencia sobre legislación laboral
            con el propósito de facilitar la comprensión de temas relacionados con el trabajo,
            tanto para personas trabajadoras como para empleadores.
          </p>

          {/* Botones del hero */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={OFFICIAL_LINKS.scij}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-lg transition-all hover:bg-sky-50 hover:shadow-xl active:scale-95"
            >
              <Scale size={18} />
              Consultar legislación oficial
            </a>
            <a
              href={OFFICIAL_LINKS.mtss}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
            >
              <BookOpen size={18} />
              Guía laboral
            </a>
          </div>
        </div>
      </section>

      {/* ===== Buscador ===== */}
      <section className="relative -mt-8 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué información laboral está buscando?"
                className="w-full rounded-xl border-0 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-sky-200"
              />
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            Busque por palabras: salario, vacaciones, contrato, jornada, despido, cesantía, aguinaldo, feriados y más.
          </p>
        </div>
      </section>

      {/* ===== Temas principales ===== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Temas principales</h2>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <Search className="mx-auto mb-3 text-slate-300" size={40} />
              <p className="text-base font-medium text-slate-600">No se encontraron resultados</p>
              <p className="mt-1 text-sm text-slate-400">
                Intente con otros términos como "salario", "vacaciones" o "contrato".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 rounded-lg bg-sky-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-sky-100"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic, index) => {
                const Icon = TOPIC_ICONS[topic.id] || ShieldCheck;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-lg hover:-translate-y-1 animate-fadeIn"
                  >
                    {/* Icono */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md transition-transform group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    {/* Título */}
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-700">
                      {topic.title}
                    </h3>
                    {/* Descripción */}
                    <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                      {topic.description}
                    </p>
                    {/* Indicador */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Ver detalles
                      <ArrowRight size={14} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== Aviso legal ===== */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/30">
                <Info className="text-amber-700" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900">Información orientativa</h3>
                <p className="mt-2 text-sm text-amber-800 leading-relaxed">
                  La información presentada en este apartado tiene carácter informativo y educativo.
                  No constituye asesoría jurídica ni sustituye la consulta de la normativa oficial
                  o de un profesional competente. La legislación puede ser modificada, por lo que
                  recomendamos verificar siempre la información directamente en las fuentes oficiales.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={OFFICIAL_LINKS.scij}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
                  >
                    <Scale size={16} />
                    Consultar legislación oficial
                  </a>
                  <a
                    href={OFFICIAL_LINKS.mtss}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-50"
                  >
                    <Building2 size={16} />
                    Consultar información del MTSS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Botón volver al inicio ===== */}
      <div className="px-4 pb-16 text-center sm:px-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </button>
      </div>

      {/* ===== Modal de detalle del tema ===== */}
      {selectedTopic && (
        <TopicDetailModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      )}
    </div>
  );
}

// ===== Modal de detalle =====
function TopicDetailModal({ topic, onClose }: { topic: LaborTopic; onClose: () => void }) {
  const Icon = TOPIC_ICONS[topic.id] || ShieldCheck;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del modal */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-800 to-blue-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <Icon size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">{topic.title}</h2>
                <p className="mt-1 text-sm text-sky-200">{topic.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 sm:p-8">
          {/* Aspectos principales */}
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-blue-600" />
              <h3 className="text-base font-bold text-slate-800">Aspectos principales</h3>
            </div>
            <ul className="space-y-3">
              {topic.aspects.map((aspect, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <ShieldCheck className="mt-0.5 flex-shrink-0 text-blue-600" size={18} />
                  <span>{aspect}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fuente oficial */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <BookMarked className="text-blue-700" size={18} />
              <h4 className="text-sm font-bold text-blue-800">Fuente oficial</h4>
            </div>
            <p className="text-sm text-blue-700">{topic.sourceLabel}</p>
            <a
              href={topic.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Consultar fuente oficial
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Botón volver */}
          <button
            onClick={onClose}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Volver al Centro Laboral
          </button>
        </div>
      </div>
    </div>
  );
}
