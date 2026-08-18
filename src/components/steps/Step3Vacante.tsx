// Paso 3 — Vacante
import { useState } from 'react';
import { Check, Briefcase, MapPin, Clock, Search } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES } from '@/lib/stepImages';
import { getVacanciesForCompany } from '@/lib/companyData';
import type { Vacancy, OnboardingData } from '@/lib/types';

interface Step3VacanteProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step3Vacante({ data, onDataChange, onBack, onContinue }: Step3VacanteProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener vacantes correspondientes a la empresa seleccionada
  const companyName = data.company?.name ?? '';
  const companyVacancies = getVacanciesForCompany(companyName);

  // Generar objetos Vacancy a partir de los títulos
  const vacancies: Vacancy[] = companyVacancies.map((title) => ({
    id: `${companyName}-${title}`,
    title,
    area: null,
    location: null,
    work_schedule: null,
    company_id: companyName,
  }));

  // Filtrar vacantes por búsqueda
  const filteredVacancies = vacancies.filter((vacancy) =>
    vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seleccionar vacante
  function handleSelect(vacancy: Vacancy) {
    onDataChange({ vacancy });
  }

  return (
    <StepContainer
      title="Selecciona tu vacante"
      description="Elige el puesto para el cual fuiste seleccionado."
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step3} alt="Entrevista de trabajo" />

      {/* Empresa seleccionada */}
      {data.company && (
        <div className="mb-4 rounded-lg bg-sky-50 border border-sky-100 px-4 py-3">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Empresa seleccionada:</span> {data.company.name}
          </p>
        </div>
      )}

      {/* Si no hay empresa seleccionada */}
      {!data.company && (
        <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 px-4 py-4 text-center">
          <p className="text-sm text-amber-700">
            Primero debes seleccionar una empresa en el paso anterior.
          </p>
        </div>
      )}

      {/* Barra de búsqueda — solo si hay empresa */}
      {data.company && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar vacante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      )}

      {/* Lista de vacantes */}
      {data.company && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredVacancies.map((vacancy) => {
              const isSelected = data.vacancy?.id === vacancy.id;

              return (
                <div
                  key={vacancy.id}
                  className={`rounded-xl border-2 bg-white p-5 shadow-sm transition-all hover:shadow-md ${
                    isSelected ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200'
                  }`}
                >
                  {/* Título del puesto */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sky-100">
                      <Briefcase className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-800">{vacancy.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{data.company?.name}</p>
                    </div>
                  </div>

                  {/* Detalles del puesto */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={15} className="text-slate-400 flex-shrink-0" />
                      <span>Costa Rica</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock size={15} className="text-slate-400 flex-shrink-0" />
                      <span>Tiempo completo</span>
                    </div>
                  </div>

                  {/* Botón seleccionar */}
                  <button
                    onClick={() => handleSelect(vacancy)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-sky-50 text-blue-700 hover:bg-sky-100'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} />
                        Seleccionada
                      </>
                    ) : (
                      'Seleccionar'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredVacancies.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">
                No se encontraron vacantes que coincidan con "{searchTerm}"
              </p>
            </div>
          )}
        </>
      )}

      <NavigationButtons
        currentStep={3}
        onBack={onBack}
        onContinue={onContinue}
        canContinue={data.vacancy !== null}
      />
    </StepContainer>
  );
}
