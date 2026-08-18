// Contenido de los servicios principales de Integra2
import {
  Search, Users, FileSignature, ClipboardCheck,
  Target, Eye, Megaphone, Network, Filter, CheckCircle2,
  ClipboardList, UserPlus, FileText, CalendarCheck, IdCard,
  ShieldCheck, HeartHandshake, TrendingUp, Bell, HeartPulse,
  Award, Zap, Lock, Clock, ThumbsUp, PhoneCall,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceProcess {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  heroDescription: string;
  overview: string;
  process: ServiceProcess[];
  benefits: ServiceBenefit[];
  highlights: { icon: LucideIcon; label: string }[];
}

export const SERVICES: ServiceDetail[] = [
  // ===== RECLUTAMIENTO =====
  {
    id: 'reclutamiento',
    icon: Search,
    title: 'Reclutamiento',
    tagline: 'Atraemos al talento adecuado para su organización',
    heroDescription:
      'Identificamos y atraemos candidatos calificados que se ajustan a las necesidades específicas de cada puesto y cultura organizacional.',
    overview:
      'Nuestro proceso de reclutamiento combina estrategias tradicionales y herramientas digitales para alcanzar a los mejores talentos del mercado. Trabajamos de la mano con su equipo para entender los requerimientos del puesto, el perfil ideal y los objetivos de la vacante, asegurando un flujo constante de candidatos de alta calidad.',
    process: [
      {
        icon: Target,
        title: 'Análisis de necesidades',
        description:
          'Reunimos con su equipo para entender el perfil del puesto, las competencias requeridas y la cultura organizacional.',
      },
      {
        icon: Megaphone,
        title: 'Difusión de la vacante',
        description:
          'Publicamos la oferta en nuestros canales digitales, redes profesionales y bases de datos de talento.',
      },
      {
        icon: Network,
        title: 'Búsqueda activa',
        description:
          'Realizamos caza de talento (headhunting) para contacted candidatos pasivos que se ajusten al perfil.',
      },
      {
        icon: Filter,
        title: 'Filtro inicial',
        description:
          'Preseleccionamos candidatos según requisitos mínimos: formación, experiencia y disponibilidad.',
      },
      {
        icon: CheckCircle2,
        title: 'Presentación de candidatos',
        description:
          'Entregamos un grupo de candidatos preseleccionados con su hoja de vida para que su equipo evalúe.',
      },
    ],
    benefits: [
      {
        icon: Zap,
        title: 'Respuesta rápida',
        description:
          'Contamos con una base de datos activa que nos permite presentar candidatos en plazos cortos.',
      },
      {
        icon: Target,
        title: 'Ajuste al perfil',
        description:
          'Cada candidato es evaluado contra los requisitos específicos de su vacante, no contra plantillas genéricas.',
      },
      {
        icon: Network,
        title: 'Amplio alcance',
        description:
          'Combinamos canales digitales, redes profesionales y búsqueda directa para maximizar el alcance.',
      },
    ],
    highlights: [
      { icon: Clock, label: 'Tiempo de respuesta: 48-72 horas' },
      { icon: ThumbsUp, label: 'Candidatos preseleccionados y validados' },
    ],
  },

  // ===== SELECCIÓN =====
  {
    id: 'seleccion',
    icon: Users,
    title: 'Selección',
    tagline: 'Evaluamos competencias para el mejor ajuste candidato-vacante',
    heroDescription:
      'Aplicamos pruebas técnicas, entrevistas estructuradas y evaluaciones de competencias para garantizar que cada candidato sea el indicado para el puesto.',
    overview:
      'La selección es el corazón de nuestro servicio. Después del reclutamiento, cada candidato pasa por un proceso riguroso de evaluación que incluye pruebas técnicas, entrevistas por competencias y verificación de referencias. Nuestro objetivo es entregarle no solo un candidato que cumpla los requisitos, sino que se integre bien a su equipo y aporte valor desde el primer día.',
    process: [
      {
        icon: ClipboardList,
        title: 'Evaluación curricular',
        description:
          'Analizamos en detalle la hoja de vida, formación académica y trayectoria profesional de cada preseleccionado.',
      },
      {
        icon: Eye,
        title: 'Entrevista por competencias',
        description:
          'Conducimos entrevistas estructuradas para evaluar habilidades técnicas y competencias conductuales.',
      },
      {
        icon: CheckCircle2,
        title: 'Pruebas técnicas',
        description:
          'Aplicamos pruebas prácticas específicas según el puesto: manejo de herramientas, conocimientos técnicos y resolución de problemas.',
      },
      {
        icon: PhoneCall,
        title: 'Verificación de referencias',
        description:
          'Contactamos empleadores anteriores para validar la experiencia, el desempeño y la conducta laboral del candidato.',
      },
      {
        icon: Award,
        title: 'Recomendación final',
        description:
          'Entregamos un informe con el candidato recomendado, incluyendo el resultado de cada etapa de evaluación.',
      },
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: 'Evaluación rigurosa',
        description:
          'Cada candidato pasa por múltiples etapas de evaluación antes de ser presentado a su empresa.',
      },
      {
        icon: Target,
        title: 'Competencias validadas',
        description:
          'Verificamos no solo la experiencia, sino también las habilidades prácticas y el encaje cultural.',
      },
      {
        icon: Lock,
        title: 'Referencias verificadas',
        description:
          'Validamos la trayectoria laboral con empleadores anteriores para mayor tranquilidad de su empresa.',
      },
    ],
    highlights: [
      { icon: CheckCircle2, label: 'Candidatos evaluados por competencias' },
      { icon: ShieldCheck, label: 'Referencias laborales verificadas' },
    ],
  },

  // ===== CONTRATACIÓN =====
  {
    id: 'contratacion',
    icon: FileSignature,
    title: 'Contratación',
    tagline: 'Gestión documental y legal para una incorporación segura',
    heroDescription:
      'Nos encargamos de todo el proceso documental y legal de la contratación, asegurando el cumplimiento normativo y una incorporación sin contratiempos.',
    overview:
      'Una vez seleccionado el candidato, nos hacemos cargo de toda la gestión de contratación. Preparamos el contrato, gestionamos los documentos requeridos, coordinamos la firma y aseguramos el cumplimiento de la normativa laboral vigente. Su empresa solo necesita recibir al nuevo colaborador; nosotros nos ocupamos del resto.',
    process: [
      {
        icon: FileText,
        title: 'Preparación del contrato',
        description:
          'Elaboramos el contrato laboral según el tipo de relación, modalidad y condiciones acordadas con su empresa.',
      },
      {
        icon: ClipboardList,
        title: 'Recepción de documentos',
        description:
          'Gestionamos la recolección de documentos personales: identificación, seguro social, constancias y otros requisitos.',
      },
      {
        icon: IdCard,
        title: 'Registro y afiliaciones',
        description:
          'Realizamos los trámites de registro ante Caja Costarricense de Seguro Social y otras instituciones correspondientes.',
      },
      {
        icon: FileSignature,
        title: 'Firma y formalización',
        description:
          'Coordinamos la firma del contrato y la entrega de copias tanto al colaborador como al expediente empresarial.',
      },
      {
        icon: CalendarCheck,
        title: 'Fecha de inicio',
        description:
          'Confirmamos la fecha de ingreso, coordinamos la inducción y aseguramos que todo esté listo para el primer día.',
      },
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: 'Cumplimiento legal',
        description:
          'Garantizamos que cada contrato cumpla con el Código de Trabajo y la normativa laboral vigente.',
      },
      {
        icon: Zap,
        title: 'Incorporación rápida',
        description:
          'Optimizamos los tiempos de gestión para que el nuevo colaborador pueda iniciar lo antes posible.',
      },
      {
        icon: Lock,
        title: 'Documentación completa',
        description:
          'Mantenemos un expediente completo y organizado de cada colaborador para futuras consultas o auditorías.',
      },
    ],
    highlights: [
      { icon: FileSignature, label: 'Contratos conforme al Código de Trabajo' },
      { icon: CalendarCheck, label: 'Coordinación de fecha de inicio incluida' },
    ],
  },

  // ===== GESTIÓN DE PERSONAL =====
  {
    id: 'gestion-personal',
    icon: ClipboardCheck,
    title: 'Gestión de Personal',
    tagline: 'Acompañamiento integral durante toda la relación laboral',
    heroDescription:
      'Administramos su equipo con un servicio integral que cubre nómina, cumplimiento legal, bienestar y desarrollo del personal durante toda la relación laboral.',
    overview:
      'Nuestro servicio de gestión de personal va más allá de la nómina. Acompañamos a su empresa y a sus colaboradores en cada etapa de la relación laboral: desde el primer día de trabajo hasta el fin del contrato. Gestionamos pagos, control de asistencia, vacaciones, aguinaldos, y mantenemos todo en cumplimiento con la normativa, para que usted se enfoque en su negocio.',
    process: [
      {
        icon: CalendarCheck,
        title: 'Control de asistencia y tiempo',
        description:
          'Llevamos el registro de horas trabajadas, ausencias, permisos y vacaciones de cada colaborador.',
      },
      {
        icon: ClipboardList,
        title: 'Cálculo de nómina',
        description:
          'Calculamos y procesamos los pagos quincenales o mensuales, incluyendo deducciones y beneficios sociales.',
      },
      {
        icon: HeartPulse,
        title: 'Gestión de bienestar',
        description:
          'Coordinamos temas de salud ocupacional, seguro social y programas de bienestar para los colaboradores.',
      },
      {
        icon: Bell,
        title: 'Cumplimiento de obligaciones',
        description:
          'Gestionamos el pago de cargas sociales, aguinaldo, vacaciones y demás obligaciones patronales en tiempo y forma.',
      },
      {
        icon: HeartHandshake,
        title: 'Cierre de relación laboral',
        description:
          'Al finalizar la relación, gestionamos la liquidación, finiquito y documentos de cierre conforme a la ley.',
      },
    ],
    benefits: [
      {
        icon: TrendingUp,
        title: 'Administración sin preocupaciones',
        description:
          'Nos encargamos de toda la gestión administrativa para que usted se enfoque en su operación.',
      },
      {
        icon: ShieldCheck,
        title: 'Cumplimiento garantizado',
        description:
          'Mantenemos su empresa al día con todas las obligaciones laborales y de seguridad social.',
      },
      {
        icon: HeartHandshake,
        title: 'Bienestar del equipo',
        description:
          'Cuidamos la experiencia del colaborador con un acompañamiento cercano y profesional.',
      },
    ],
    highlights: [
      { icon: ClipboardList, label: 'Nómina y cargas sociales gestionadas' },
      { icon: ShieldCheck, label: 'Cumplimiento laboral permanente' },
    ],
  },
];
