// Tipos de datos para Integra2

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
}

export interface Vacancy {
  id: string;
  title: string;
  area: string | null;
  location: string | null;
  work_schedule: string | null;
  company_id: string | null;
}

export interface PersonalData {
  fullName: string;
  idNumber: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  canton: string;
  district: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface DocumentFiles {
  identityDocument: string | null;
  certification: string | null;
  additionalDocument: string | null;
  otherDocuments: string | null;
}

export type LinkingStatus = 'success' | 'error' | 'skipped';

export interface BankLink {
  bankName: string;
  authorizedUser: string;
  virtualRecognition: string;
  termsAccepted: boolean;
  linkedAt: string;
  emailSent: boolean;
  status: LinkingStatus;
  progress: number;
}

export interface Questionnaire {
  answers: Record<string, string>;
  observations: string;
}

export interface OnboardingData {
  company: Company | null;
  vacancy: Vacancy | null;
  personalData: PersonalData;
  documentFiles: DocumentFiles;
  bankLink: BankLink | null;
  photo: string | null;
  questionnaire: Questionnaire;
  employeeCode: string;
  status: string;
}

// Datos personales vacíos por defecto
export const emptyPersonalData: PersonalData = {
  fullName: '',
  idNumber: '',
  birthDate: '',
  phone: '',
  email: '',
  address: '',
  province: '',
  canton: '',
  district: '',
  emergencyContact: '',
  emergencyPhone: '',
};

// Archivos vacíos por defecto
export const emptyDocumentFiles: DocumentFiles = {
  identityDocument: null,
  certification: null,
  additionalDocument: null,
  otherDocuments: null,
};

// Cuestionario vacío por defecto
export const emptyQuestionnaire: Questionnaire = {
  answers: {},
  observations: '',
};

// Datos de incorporación vacíos por defecto
export const emptyOnboardingData: OnboardingData = {
  company: null,
  vacancy: null,
  personalData: { ...emptyPersonalData },
  documentFiles: { ...emptyDocumentFiles },
  bankLink: null,
  photo: null,
  questionnaire: { ...emptyQuestionnaire },
  employeeCode: '',
  status: 'in_progress',
};
