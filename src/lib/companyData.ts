// Catálogo de empresas y vacantes para Integra2
// Las empresas se agrupan por categoría y cada una tiene sus vacantes asociadas

export interface CompanyCategory {
  id: string;
  label: string;
  icon: string;
  companies: string[];
}

export const COMPANY_CATEGORIES: CompanyCategory[] = [
  {
    id: 'automotriz',
    label: 'Automotriz',
    icon: 'car',
    companies: ['Grupo Purdy', 'Grupo Q Costa Rica', 'DEKRA Costa Rica'],
  },
  {
    id: 'industria',
    label: 'Industria y alimentos',
    icon: 'factory',
    companies: ['FIFCO', 'Dos Pinos', 'Pozuelo'],
  },
  {
    id: 'comercio',
    label: 'Comercio',
    icon: 'cart',
    companies: ['Walmart', 'PriceSmart', 'Auto Mercado'],
  },
  {
    id: 'banca',
    label: 'Banca',
    icon: 'bank',
    companies: ['Banco Nacional', 'Banco Improsa', 'BAC San José'],
  },
  {
    id: 'salud',
    label: 'Salud',
    icon: 'health',
    companies: ['Farmacia Fischel', 'Farmacia La Bomba', 'Alfa Médica', 'Meditek', 'Sumedical', 'CQ Medical'],
  },
  {
    id: 'construccion',
    label: 'Construcción y materiales',
    icon: 'building',
    companies: ['Grupo Intaco'],
  },
];

// Vacantes por sector
const VACANTES_AUTOMOTRIZ = [
  'Asesor de Ventas',
  'Técnico Automotriz',
  'Repuestos',
  'Servicio al Cliente',
  'Inspector Vehicular',
  'Auxiliar Contable',
  'Asistente Administrativo',
  'Conductor',
];

const VACANTES_INDUSTRIA = [
  'Operario de Producción',
  'Auxiliar de Bodega',
  'Logística',
  'Control de Calidad',
  'Ventas',
  'Auxiliar Contable',
  'Servicio al Cliente',
  'Asistente Administrativo',
  'Conductor',
];

const VACANTES_COMERCIO = [
  'Cajero',
  'Auxiliar de Tienda',
  'Servicio al Cliente',
  'Bodega',
  'Supervisor',
  'Auxiliar Contable',
  'Asistente Administrativo',
  'Conductor',
];

const VACANTES_BANCA = [
  'Ejecutivo Bancario',
  'Servicio al Cliente',
  'Ejecutivo de Ventas',
  'Analista Financiero',
  'Operaciones',
  'Auxiliar Contable',
  'Cajero',
  'Asistente Administrativo',
];

const VACANTES_SALUD_FARMACIA = [
  'Dependiente de Farmacia',
  'Regente Farmacéutico',
  'Servicio al Cliente',
  'Auxiliar Contable',
  'Asistente Administrativo',
  'Cajero',
];

const VACANTES_SALUD_MEDICA = [
  'Ejecutivo de Ventas',
  'Técnico',
  'Técnico Biomédico',
  'Soporte Técnico',
  'Servicio al Cliente',
  'Auxiliar Contable',
  'Asistente Administrativo',
];

const VACANTES_CONSTRUCCION = [
  'Ejecutivo de Ventas',
  'Bodega',
  'Logística',
  'Operario',
  'Auxiliar Contable',
  'Servicio al Cliente',
  'Asistente Administrativo',
  'Conductor',
];

// Mapping de vacantes por empresa
export const COMPANY_VACANCIES: Record<string, string[]> = {
  'Grupo Purdy': VACANTES_AUTOMOTRIZ,
  'Grupo Q Costa Rica': VACANTES_AUTOMOTRIZ,
  'DEKRA Costa Rica': VACANTES_AUTOMOTRIZ,
  'FIFCO': VACANTES_INDUSTRIA,
  'Dos Pinos': VACANTES_INDUSTRIA,
  'Pozuelo': VACANTES_INDUSTRIA,
  'Walmart': VACANTES_COMERCIO,
  'PriceSmart': VACANTES_COMERCIO,
  'Auto Mercado': VACANTES_COMERCIO,
  'Banco Nacional': VACANTES_BANCA,
  'Banco Improsa': VACANTES_BANCA,
  'BAC San José': VACANTES_BANCA,
  'Farmacia Fischel': VACANTES_SALUD_FARMACIA,
  'Farmacia La Bomba': VACANTES_SALUD_FARMACIA,
  'Alfa Médica': VACANTES_SALUD_MEDICA,
  'Meditek': VACANTES_SALUD_MEDICA,
  'Sumedical': VACANTES_SALUD_MEDICA,
  'CQ Medical': VACANTES_SALUD_MEDICA,
  'Grupo Intaco': VACANTES_CONSTRUCCION,
};

// Lista plana de todas las empresas
export const ALL_COMPANY_NAMES: string[] = COMPANY_CATEGORIES.flatMap((cat) => cat.companies);

// Obtener las vacantes de una empresa por nombre
export function getVacanciesForCompany(companyName: string): string[] {
  return COMPANY_VACANCIES[companyName] ?? [];
}
