// Paso 2 — Empresa
import { useState } from 'react';
import { Building2, Check, Search, Car, Factory, ShoppingCart, Landmark, HeartPulse, HardHat, ChevronDown, Briefcase, ExternalLink, MapPin } from 'lucide-react';

function CompanyLogo({ logo, initials, bgColor, textColor }: {
  logo: string | null;
  initials: string;
  bgColor: string;
  textColor: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!logo || imgError) {
    return (
      <span
        className="text-sm font-extrabold tracking-wider"
        style={{ color: textColor, backgroundColor: bgColor }}
      >
        {initials}
      </span>
    );
  }

  return (
    <>
      {!imgLoaded && (
        <span
          className="text-sm font-extrabold tracking-wider"
          style={{ color: textColor, backgroundColor: bgColor }}
        >
          {initials}
        </span>
      )}
      <img
        src={logo}
        alt={`Logo ${initials}`}
        className="max-h-10 max-w-[100%] object-contain"
        style={{ display: imgLoaded ? 'block' : 'none' }}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
    </>
  );
}
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { getCompanyVisual } from '@/lib/companyVisuals';
import { COMPANY_CATEGORIES, getVacanciesForCompany } from '@/lib/companyData';
import { CompanyMap } from '@/components/CompanyMap';
import type { Company, OnboardingData } from '@/lib/types';

interface Step2EmpresaProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const CATEGORY_ICONS: Record<string, typeof Car> = {
  car: Car,
  factory: Factory,
  cart: ShoppingCart,
  bank: Landmark,
  health: HeartPulse,
  building: HardHat,
};

export function Step2Empresa({ data, onDataChange, onBack, onContinue }: Step2EmpresaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(COMPANY_CATEGORIES.map((c) => c.id))
  );

  function toggleCategory(id: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSelect(name: string) {
    const company: Company = {
      id: name,
      name,
      logo_url: null,
    };
    onDataChange({ company, vacancy: null });
  }

  const filteredCategories = COMPANY_CATEGORIES.map((cat) => ({
    ...cat,
    companies: cat.companies.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.companies.length > 0);

  return (
    <StepContainer
      title="Selecciona tu empresa"
      description="Elige la empresa donde realizarás tu proceso de incorporación."
    >
      <StepImageBanner imageUrl="/header-bg-dgsc.webp" alt="Edificio de la Dirección General de Servicio Civil" />

      {/* Banner informativo DGSC */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-sky-100 bg-sky-50/80 p-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
          <Landmark size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-800">
            Dirección General de Servicio Civil (DGSC)
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Institución rectora del Empleo Público en el Régimen de Servicio Civil de Costa Rica,
            adscrita a la Presidencia de la República. Administra y fiscaliza el régimen bajo la
            Ley 1581 desde 1953, para promover la eficiencia de la Administración Pública.
          </p>
          <a
            href="https://www.dgsc.go.cr"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
          >
            Consultar sitio oficial
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {/* Categorías con empresas */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon] || Building2;
          const isExpanded = expandedCategories.has(category.id);

          return (
            <div key={category.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Encabezado de categoría */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="text-blue-600" size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{category.label}</h3>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {category.companies.length}
                  </span>
                </div>
                <ChevronDown
                  className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  size={18}
                />
              </button>

              {/* Empresas de la categoría */}
              {isExpanded && (
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.companies.map((name) => {
                    const visual = getCompanyVisual(name);
                    const isSelected = data.company?.id === name;
                    const vacancyCount = getVacanciesForCompany(name).length;

                    return (
                      <button
                        key={name}
                        onClick={() => handleSelect(name)}
                        className={`group flex items-center gap-3 rounded-xl border-2 bg-white p-3 text-left transition-all hover:shadow-md ${
                          isSelected ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Logo pequeño */}
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden bg-slate-50 border border-slate-200"
                        >
                          <CompanyLogo
                            logo={visual.logo}
                            initials={visual.initials}
                            bgColor={visual.bgColor}
                            textColor={visual.textColor}
                          />
                        </div>

                        {/* Nombre + vacantes */}
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h4 className="truncate text-sm font-semibold text-slate-800">
                            {name}
                          </h4>
                          <div className="mt-0.5 flex items-center gap-1">
                            <Briefcase size={12} className="text-blue-500 flex-shrink-0" />
                            <span className="text-xs text-slate-500">
                              {vacancyCount} {vacancyCount === 1 ? 'vacante' : 'vacantes'}
                            </span>
                          </div>
                        </div>

                        {/* Indicador de selección */}
                        <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                          isSelected ? 'bg-blue-600' : 'border-2 border-slate-200 group-hover:border-slate-300'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Mensaje si no hay resultados */}
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">
              No se encontraron empresas que coincidan con "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* Sección: Mapa interactivo de ubicaciones */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <MapPin size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Ubicaciones de las empresas</h3>
            <p className="text-xs text-slate-500">
              Mapa interactivo con las sedes centrales. Haz clic en un marcador para ver el detalle.
            </p>
          </div>
        </div>
        <CompanyMap />
      </div>

      <NavigationButtons
        currentStep={2}
        onBack={onBack}
        onContinue={onContinue}
        canContinue={data.company !== null}
      />
    </StepContainer>
  );
}
