// Temas laborales para el Centro de Información Laboral
export interface LaborTopic {
  id: string;
  title: string;
  description: string;
  aspects: string[];
  sourceUrl: string;
  sourceLabel: string;
  keywords: string[];
}

// Enlaces oficiales de fuentes jurídicas y laborales de Costa Rica
const SCIJ_URL = 'https://www.pgrweb.go.cr/scij/';
const MTSS_URL = 'https://www.mtss.go.cr/';
const CODIGO_TRABAJO_URL = 'https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=20547&strTipM=TC';

export const LABOR_TOPICS: LaborTopic[] = [
  {
    id: 'derechos-trabajador',
    title: 'Derechos del trabajador',
    description: 'Información general sobre derechos laborales reconocidos por la normativa costarricense.',
    aspects: [
      'Derecho a un salario conforme al mínimo legal establecido',
      'Derecho a jornada de trabajo con límites legales',
      'Derecho a descansos semanales y vacaciones',
      'Derecho a aguinaldo y prestaciones',
      'Derecho a un ambiente de trabajo seguro y saludable',
      'Protección contra el despido sin causa justificada',
    ],
    sourceUrl: MTSS_URL,
    sourceLabel: 'Ministerio de Trabajo y Seguridad Social',
    keywords: ['derechos', 'trabajador', 'salario', 'vacaciones', 'aguinaldo', 'prestaciones', 'seguridad social'],
  },
  {
    id: 'obligaciones-empleador',
    title: 'Obligaciones del empleador',
    description: 'Principales responsabilidades que corresponden al empleador dentro de la relación laboral.',
    aspects: [
      'Pago puntual del salario acordado',
      'Inscripción y aportes a la Caja Costarricense de Seguro Social (CCSS)',
      'Cumplimiento de las jornadas y horarios legalmente establecidos',
      'Garantizar condiciones de seguridad y salud ocupacional',
      'Concesión de vacaciones y descansos obligatorios',
      'Pago de aguinaldo y prestaciones correspondientes',
    ],
    sourceUrl: MTSS_URL,
    sourceLabel: 'Ministerio de Trabajo y Seguridad Social',
    keywords: ['empleador', 'obligaciones', 'responsabilidades', 'aportes', 'ccss', 'seguridad social', 'pago'],
  },
  {
    id: 'jornadas-horarios',
    title: 'Jornadas y horarios',
    description: 'Información general sobre jornadas, horarios, descansos y tiempo de trabajo.',
    aspects: [
      'Jornada ordinaria diurna y sus límites legales',
      'Jornada nocturna y jornada mixta',
      'Trabajo extraordinario y su remuneración',
      'Descansos dentro de la jornada laboral',
      'Día de descanso semanal obligatorio',
      'Limitaciones al trabajo en días feriados',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['jornada', 'horarios', 'descansos', 'tiempo', 'trabajo', 'nocturna', 'extraordinario', 'feriados'],
  },
  {
    id: 'salarios-remuneraciones',
    title: 'Salarios y remuneraciones',
    description: 'Información relacionada con salarios, formas de pago y remuneraciones.',
    aspects: [
      'Salario mínimo legal y su fijación periódica',
      'Formas de pago del salario',
      'Periodicidad del pago salarial',
      'Descuentos permitidos sobre el salario',
      'Salario en especie y sus limitaciones',
      'Comisiones, bonificaciones y gratificaciones',
    ],
    sourceUrl: MTSS_URL,
    sourceLabel: 'Ministerio de Trabajo y Seguridad Social',
    keywords: ['salario', 'remuneración', 'pago', 'mínimo', 'comisiones', 'bonificaciones', 'descuentos'],
  },
  {
    id: 'vacaciones-feriados',
    title: 'Vacaciones y días feriados',
    description: 'Información general sobre vacaciones, descansos y días feriados.',
    aspects: [
      'Derecho a vacaciones anuales remuneradas',
      'Cálculo del periodo vacacional',
      'Días feriados de pago obligatorio',
      'Compensación de vacaciones no disfrutadas',
      'Continuidad del periodo vacacional',
      'Restricciones al trabajo en días feriados',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['vacaciones', 'feriados', 'descansos', 'remuneradas', 'compensación', 'periodo'],
  },
  {
    id: 'contratos-trabajo',
    title: 'Contratos de trabajo',
    description: 'Conceptos generales sobre la relación laboral y los contratos de trabajo.',
    aspects: [
      'Elementos esenciales del contrato de trabajo',
      'Contratos a plazo definido e indefinido',
      'Contratos para servicios específicos',
      'Contrato verbal y contrato escrito',
      'Cláusulas mínimas del contrato escrito',
      'Periodo de prueba y sus reglas',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['contrato', 'relación laboral', 'plazo', 'indefinido', 'prueba', 'verbal', 'escrito'],
  },
  {
    id: 'seguridad-salud',
    title: 'Seguridad y salud ocupacional',
    description: 'Información sobre condiciones seguras y protección dentro del ambiente laboral.',
    aspects: [
      'Obligación del empleador de garantizar un entorno seguro',
      'Comités de salud ocupacional',
      'Equipos de protección personal',
      'Prevención de riesgos laborales',
      'Reporte de accidentes de trabajo',
      'Consejo de Salud Ocupacional (CSO)',
    ],
    sourceUrl: MTSS_URL,
    sourceLabel: 'Ministerio de Trabajo y Seguridad Social',
    keywords: ['seguridad', 'salud ocupacional', 'riesgos', 'accidentes', 'protección', 'prevención', 'cso'],
  },
  {
    id: 'proteccion-especial',
    title: 'Protección especial',
    description: 'Información general sobre determinadas protecciones reconocidas por la legislación laboral.',
    aspects: [
      'Protección contra el despido durante el embarazo',
      'Protección en caso de lactancia',
      'Estabilidad laboral para personas con discapacidad',
      'Protección a trabajadores menores de edad',
      'Fuero sindical y protección de representantes',
      'Prohibición de discriminación laboral',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['protección', 'embarazo', 'lactancia', 'discapacidad', 'menores', 'sindical', 'discriminación'],
  },
  {
    id: 'terminacion-relacion',
    title: 'Terminación de la relación laboral',
    description: 'Información general sobre las diferentes formas de finalización de una relación laboral.',
    aspects: [
      'Terminación por consentimiento de las partes',
      'Terminación por conclusión del plazo o la obra',
      'Renuncia voluntaria del trabajador',
      'Despido con causa justificada',
      'Despido sin causa justificada',
      'Muerte o incapacidad del trabajador',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['terminación', 'finalización', 'renuncia', 'despido', 'causa', 'muerte', 'incapacidad'],
  },
  {
    id: 'despidos-indemnizaciones',
    title: 'Despidos e indemnizaciones',
    description: 'Información general sobre despido, preaviso, cesantía y otros conceptos relacionados.',
    aspects: [
      'Preaviso y su indemnización',
      'Cesantía y su cálculo',
      'Auxilio de cesantía',
      'Indemnización por despido injustificado',
      'Pago de prestaciones al finalizar la relación',
      'Plazos legales para el pago de prestaciones',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Código de Trabajo — SCIJ',
    keywords: ['despido', 'indemnización', 'preaviso', 'cesantía', 'prestaciones', 'injustificado', 'pago'],
  },
  {
    id: 'aportes-cargas-sociales',
    title: 'Aportes y cargas sociales',
    description: 'Información general sobre obligaciones y aportes relacionados con la seguridad social.',
    aspects: [
      'Aportes patronales y laborales a la CCSS',
      'Inscripción del trabajador en la CCSS',
      'Aportes al Banco Popular y de Desarrollo Comunal',
      'Aportes al Fondo de Capitalización Laboral (FCL)',
      'Impuesto sobre la renta y retenciones salariales',
      'Obligaciones ante el Instituto Nacional de Seguros (INS)',
    ],
    sourceUrl: MTSS_URL,
    sourceLabel: 'Ministerio de Trabajo y Seguridad Social',
    keywords: ['aportes', 'cargas sociales', 'ccss', 'seguridad social', 'banco popular', 'fcl', 'ins', 'impuesto'],
  },
  {
    id: 'codigo-trabajo',
    title: 'Código de Trabajo de Costa Rica',
    description: 'Consulta el Código de Trabajo y sus reformas directamente en la fuente jurídica oficial.',
    aspects: [
      'Texto completo del Código de Trabajo',
      'Reformas y actualizaciones legislativas',
      'Disposiciones sobre contratos individuales',
      'Regulación del trabajo de mujeres y menores',
      'Normas sobre sindicatos y conflictos colectivos',
      'Procedimientos laborales y jurisdicción competente',
    ],
    sourceUrl: CODIGO_TRABAJO_URL,
    sourceLabel: 'Sistema Costarricense de Información Jurídica (SCIJ)',
    keywords: ['código de trabajo', 'legislación', 'ley', 'reformas', 'sindicatos', 'procedimientos', 'jurisdicción'],
  },
];

// Enlaces de referencia general
export const OFFICIAL_LINKS = {
  scij: SCIJ_URL,
  mtss: MTSS_URL,
  codigoTrabajo: CODIGO_TRABAJO_URL,
};
