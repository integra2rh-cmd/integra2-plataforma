// Información visual de las empresas: colores de marca, logos y descripciones
export interface CompanyVisual {
  name: string;
  bgColor: string;
  textColor: string;
  initials: string;
  logo: string | null;
  description: string;
}

// Colores representativos, logos oficiales y descripciones de cada empresa
export const COMPANY_VISUALS: Record<string, CompanyVisual> = {
  // Automotriz
  'Grupo Purdy': {
    name: 'Grupo Purdy', bgColor: '#5c1a1b', textColor: '#f4a261', initials: 'GP',
    logo: '/logo-grupo-purdy.png',
    description: 'Concesionario multimarca de vehículos con presencia nacional en Costa Rica.',
  },
  'Grupo Q Costa Rica': {
    name: 'Grupo Q', bgColor: '#0d3b66', textColor: '#faf0ca', initials: 'GQ',
    logo: '/logo-grupo-q.png',
    description: 'Grupo automotriz líder en Centroamérica con múltiples concesionarios.',
  },
  'DEKRA Costa Rica': {
    name: 'Grupo DEKRA Costa Rica', bgColor: '#1b1b1b', textColor: '#ffffff', initials: 'DK',
    logo: '/logo-dekra-official.webp',
    description: 'Inspección técnica vehicular y certificación de seguridad a nivel nacional.',
  },
  // Industria y alimentos
  'FIFCO': {
    name: 'FIFCO', bgColor: '#0b3d2e', textColor: '#fcbf49', initials: 'FF',
    logo: '/logo-fifco-official.webp',
    description: 'Florida Ice and Farm Company — líder en bebidas y alimentos de Costa Rica.',
  },
  'Dos Pinos': {
    name: 'Dos Pinos', bgColor: '#003da5', textColor: '#ffffff', initials: 'DP',
    logo: '/logo-dos-pinos.svg',
    description: 'Cooperativa de productores lácteos con más de 75 años de trayectoria.',
  },
  'Pozuelo': {
    name: 'Pozuelo', bgColor: '#d4a017', textColor: '#1a1a1a', initials: 'PZ',
    logo: '/logo-pozuelo.png',
    description: 'Compañía de Galletas Pozuelo — el principal fabricante de galletas de Centroamérica.',
  },
  // Comercio
  'Walmart': {
    name: 'Walmart', bgColor: '#0071ce', textColor: '#ffc220', initials: 'WM',
    logo: '/logo-walmart.webp',
    description: 'Cadena minorista global con presencia en todo Costa Rica.',
  },
  'PriceSmart': {
    name: 'PriceSmart', bgColor: '#003087', textColor: '#ffcc00', initials: 'PS',
    logo: '/logo-pricesmart.png',
    description: 'Club de precios y almacenes mayoristas con sucursales en todo el país.',
  },
  'Auto Mercado': {
    name: 'Auto Mercado', bgColor: '#1d3557', textColor: '#a8dadc', initials: 'AM',
    logo: '/logo-auto-mercado.webp',
    description: 'Cadena de supermercados premium con énfasis en productos frescos y de calidad.',
  },
  // Banca
  'Banco Nacional': {
    name: 'Banco Nacional', bgColor: '#003366', textColor: '#99ccff', initials: 'BN',
    logo: '/logo-banco-nacional-cr.png',
    description: 'Banco estatal de Costa Rica, el más grande del país por activos.',
  },
  'Banco Improsa': {
    name: 'Banco Improsa', bgColor: '#006341', textColor: '#ffffff', initials: 'BI',
    logo: '/logo-banco-improsa.webp',
    description: 'Banco privado costarricense especializado en banca corporativa y de empresas.',
  },
  'BAC San José': {
    name: 'BAC San José', bgColor: '#e30613', textColor: '#ffffff', initials: 'BAC',
    logo: '/logo-bac.png',
    description: 'Institución financiera regional con presencia en Centroamérica y México.',
  },
  // Salud
  'Farmacia Fischel': {
    name: 'Farmacia Fischel', bgColor: '#003049', textColor: '#fcbf49', initials: 'FF',
    logo: '/logo-farmacia-fischel.png',
    description: 'Cadena farmacéutica más grande de Costa Rica con cobertura nacional.',
  },
  'Farmacia La Bomba': {
    name: 'Farmacia La Bomba', bgColor: '#d62828', textColor: '#ffffff', initials: 'FB',
    logo: '/logo-farmacia-la-bomba.png',
    description: 'Cadena de farmacias de descuento con sucursales en todo el país.',
  },
  'Alfa Médica': {
    name: 'Alfa Médica', bgColor: '#1a3c6e', textColor: '#5bc2e7', initials: 'AM',
    logo: '/logo-alfa-medica.png',
    description: 'Proveedor de equipos e insumos médicos para el sector salud.',
  },
  'Meditek': {
    name: 'Meditek', bgColor: '#264653', textColor: '#e9c46a', initials: 'MT',
    logo: '/logo-meditek.png',
    description: 'Distribuidor de tecnología médica y equipos de diagnóstico en Costa Rica.',
  },
  'Sumedical': {
    name: 'Sumedical', bgColor: '#0a3d62', textColor: '#48bb78', initials: 'SM',
    logo: '/logo-sumedical.png',
    description: 'Empresa especializada en suministros y equipos médicos hospitalarios.',
  },
  'CQ Medical': {
    name: 'CQ Medical', bgColor: '#2d2d2d', textColor: '#e0e0e0', initials: 'CQ',
    logo: '/logo-cq-medical.png',
    description: 'Fabricante global de accesorios de posicionamiento para radioterapia.',
  },
  // Construcción
  'Grupo Intaco': {
    name: 'Grupo Intaco', bgColor: '#6b4423', textColor: '#f5deb3', initials: 'GI',
    logo: '/logo-grupo-intaco.png',
    description: 'Grupo industrial de materiales de construcción con operaciones en Centroamérica.',
  },
};

// Obtener información visual de una empresa por nombre
export function getCompanyVisual(name: string): CompanyVisual {
  return COMPANY_VISUALS[name] || {
    name,
    bgColor: '#334155',
    textColor: '#ffffff',
    initials: name.substring(0, 2).toUpperCase(),
    logo: null,
    description: 'Empresa participante del proceso de incorporación laboral.',
  };
}
