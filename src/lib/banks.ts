// Información de bancos de Costa Rica para el DNI Electrónico
export interface BankInfo {
  name: string;
  logo: string | null;
  bgColor: string;
  textColor: string;
  initials: string;
}

// Lista completa de entidades bancarias de Costa Rica con logos oficiales
export const COSTA_RICAN_BANKS: BankInfo[] = [
  { name: 'Banco Nacional de Costa Rica', logo: '/logo-banco-nacional-cr.png', bgColor: '#003366', textColor: '#ffffff', initials: 'BNCR' },
  { name: 'Banco de Costa Rica', logo: '/logo-bcr.png', bgColor: '#00529b', textColor: '#ffffff', initials: 'BCR' },
  { name: 'Banco Popular y de Desarrollo Comunal', logo: '/logo-banco-popular.png', bgColor: '#006341', textColor: '#ffffff', initials: 'BP' },
  { name: 'BAC San José', logo: '/logo-bac.png', bgColor: '#e30613', textColor: '#ffffff', initials: 'BAC' },
  { name: 'Scotiabank Costa Rica', logo: '/logo-scotiabank.png', bgColor: '#ec008c', textColor: '#ffffff', initials: 'SC' },
  { name: 'Banco Promerica', logo: '/logo-banco-promerica.png', bgColor: '#e8772e', textColor: '#ffffff', initials: 'PR' },
  { name: 'Banco Davivienda', logo: '/logo-davivienda.png', bgColor: '#d61a28', textColor: '#ffffff', initials: 'DV' },
  { name: 'Banco Lafise', logo: '/logo-banco-lafise.png', bgColor: '#1a3c6e', textColor: '#fcbf49', initials: 'LF' },
  { name: 'Banco BCT', logo: '/logo-banco-bct.png', bgColor: '#003f5c', textColor: '#ffffff', initials: 'BCT' },
  { name: 'Banco Improsa', logo: '/logo-banco-improsa.webp', bgColor: '#2d6a4f', textColor: '#ffffff', initials: 'IMP' },
  { name: 'Banco Cathay de Costa Rica', logo: '/logo-banco-cathay.webp', bgColor: '#7b2d26', textColor: '#ffffff', initials: 'CT' },
  { name: 'Banco G&T Continental Costa Rica', logo: '/logo-banco-gyt.webp', bgColor: '#1a3c6e', textColor: '#ffffff', initials: 'G&T' },
  { name: 'BANHVI', logo: '/logo-banhvi.png', bgColor: '#004e64', textColor: '#ffffff', initials: 'BANHVI' },
  { name: 'Cooperativa Coopetarrazú', logo: '/logo-coopetarrazu.png', bgColor: '#2d6a4f', textColor: '#ffffff', initials: 'CTZ' },
  { name: 'Cooperativa Coopelesca', logo: '/logo-coopelesca.png', bgColor: '#002d6a', textColor: '#ffffff', initials: 'CLS' },
  { name: 'Cooperativa CoopeAnde', logo: '/logo-coopeande.svg', bgColor: '#0d7a5f', textColor: '#ffffff', initials: 'CPE' },
  { name: 'Mutual Alajuela', logo: '/logo-grupo-mutual.webp', bgColor: '#003f5c', textColor: '#ffffff', initials: 'MA' },
  { name: 'Kash', logo: '/logo-kash.png', bgColor: '#6c2bd9', textColor: '#ffffff', initials: 'KASH' },
];
