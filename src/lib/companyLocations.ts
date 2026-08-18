// Ubicaciones de las sedes centrales de las empresas en Costa Rica
// Para agregar una nueva empresa solo se requiere:
//   name, lat, lng, address, phone, category
export interface CompanyLocation {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  category: string;
}

export const COMPANY_LOCATIONS: CompanyLocation[] = [
  // Automotriz
  {
    name: 'Grupo Purdy',
    address: 'Autopista Próspero Fernández, San José',
    phone: '+506 2528-8000',
    lat: 9.9345,
    lng: -84.1320,
    category: 'Automotriz',
  },
  {
    name: 'Grupo Q Costa Rica',
    address: 'Ruta 27, Escazú, San José',
    phone: '+506 4000-1000',
    lat: 9.9210,
    lng: -84.1420,
    category: 'Automotriz',
  },
  {
    name: 'DEKRA Costa Rica',
    address: 'La Uruca, San José',
    phone: '+506 2542-4200',
    lat: 9.9490,
    lng: -84.1080,
    category: 'Automotriz',
  },
  // Industria y alimentos
  {
    name: 'FIFCO',
    address: 'Heredia, Costa Rica',
    phone: '+506 2560-3000',
    lat: 9.9980,
    lng: -84.1280,
    category: 'Industria y alimentos',
  },
  {
    name: 'Dos Pinos',
    address: 'Coyol, Alajuela',
    phone: '+506 2436-0000',
    lat: 10.0030,
    lng: -84.2030,
    category: 'Industria y alimentos',
  },
  {
    name: 'Pozuelo',
    address: 'San Antonio de Belén, Heredia',
    phone: '+506 2398-0000',
    lat: 9.9790,
    lng: -84.1870,
    category: 'Industria y alimentos',
  },
  // Comercio
  {
    name: 'Walmart',
    address: 'Centro Corporativo el Tobogue, Escazú, San José',
    phone: '+506 2543-4000',
    lat: 9.9360,
    lng: -84.1410,
    category: 'Comercio',
  },
  {
    name: 'PriceSmart',
    address: 'San Antonio de Belén, Heredia',
    phone: '+506 2580-7000',
    lat: 9.9790,
    lng: -84.1910,
    category: 'Comercio',
  },
  {
    name: 'Auto Mercado',
    address: 'San Rafael de Escazú, San José',
    phone: '+506 2528-8000',
    lat: 9.9280,
    lng: -84.1400,
    category: 'Comercio',
  },
  // Banca
  {
    name: 'Banco Nacional',
    address: 'Avenida 1, Calle 4, San José',
    phone: '+506 2212-2000',
    lat: 9.9360,
    lng: -84.0780,
    category: 'Banca',
  },
  {
    name: 'Banco Improsa',
    address: 'San Pedro, Montes de Oca, San José',
    phone: '+506 2527-8000',
    lat: 9.9330,
    lng: -84.0500,
    category: 'Banca',
  },
  {
    name: 'BAC San José',
    address: 'Edificio BAC, Paseo Colón, San José',
    phone: '+506 2208-8000',
    lat: 9.9280,
    lng: -84.0820,
    category: 'Banca',
  },
  // Salud
  {
    name: 'Farmacia Fischel',
    address: 'San Pedro, Montes de Oca, San José',
    phone: '+506 2528-0000',
    lat: 9.9340,
    lng: -84.0490,
    category: 'Salud',
  },
  {
    name: 'Farmacia La Bomba',
    address: 'San José, Costa Rica',
    phone: '+506 2221-9000',
    lat: 9.9400,
    lng: -84.0900,
    category: 'Salud',
  },
  {
    name: 'Alfa Médica',
    address: 'San José, Costa Rica',
    phone: '+506 2520-7000',
    lat: 9.9370,
    lng: -84.0950,
    category: 'Salud',
  },
  {
    name: 'Meditek',
    address: 'San José, Costa Rica',
    phone: '+506 2580-9000',
    lat: 9.9420,
    lng: -84.0760,
    category: 'Salud',
  },
  {
    name: 'Sumedical',
    address: 'San José, Costa Rica',
    phone: '+506 2290-8000',
    lat: 9.9380,
    lng: -84.0840,
    category: 'Salud',
  },
  {
    name: 'CQ Medical',
    address: 'Zona Franca El Coyol, Alajuela',
    phone: '+506 2438-0000',
    lat: 10.0050,
    lng: -84.2080,
    category: 'Salud',
  },
  // Construcción
  {
    name: 'Grupo Intaco',
    address: 'Heredia, Costa Rica',
    phone: '+506 2560-9000',
    lat: 9.9980,
    lng: -84.1300,
    category: 'Construcción y materiales',
  },
];
