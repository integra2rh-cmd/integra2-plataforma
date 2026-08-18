// Paso 5 — Documentación
import { useRef } from 'react';
import { FileText, Upload, FileCheck, ShieldCheck } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES, HR_IMAGES } from '@/lib/stepImages';
import type { DocumentFiles, OnboardingData } from '@/lib/types';

interface Step5DocumentacionProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Configuración de los campos de documentos
const DOCUMENT_FIELDS: {
  key: keyof DocumentFiles;
  label: string;
  description: string;
}[] = [
  { key: 'identityDocument', label: 'Documento de identidad', description: 'Cédula, DIMEX o pasaporte' },
  { key: 'certification', label: 'Certificación', description: 'Títulos, diplomas o certificados' },
  { key: 'additionalDocument', label: 'Documento adicional', description: 'Constancias, referencias, etc.' },
  { key: 'otherDocuments', label: 'Otros documentos', description: 'Cualquier otro documento relevante' },
];

export function Step5Documentacion({ data, onDataChange, onBack, onContinue }: Step5DocumentacionProps) {
  const files = data.documentFiles;

  // Manejar selección de archivo
  function handleFileSelect(key: keyof DocumentFiles, event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onDataChange({
        documentFiles: { ...files, [key]: selectedFile.name },
      });
    }
  }

  return (
    <StepContainer
      title="Documentación"
      description="Carga los documentos solicitados para tu proceso de incorporación."
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step5} alt="Firma de documentos" />

      {/* Bloque visual con imagen y texto sobre la firma de documentos */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col justify-center p-5 sm:p-6 order-2 sm:order-1">
            <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <FileText size={14} />
              Documentos requeridos
            </div>
            <h3 className="text-sm font-bold text-slate-800">Prepare sus documentos con anticipación</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Para agilizar su incorporación, tenga a mano su documento de identidad,
              certificaciones académicas y cualquier constancia laboral relevante.
              Los documentos deben ser legibles y estar vigentes.
            </p>
          </div>
          <div className="relative h-40 sm:h-auto order-1 sm:order-2">
            <img
              src={HR_IMAGES.signingDoc}
              alt="Firma de documento oficial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {DOCUMENT_FIELDS.map((field) => (
          <FileUploadCard
            key={field.key}
            label={field.label}
            description={field.description}
            fileName={files[field.key]}
            onSelect={(e) => handleFileSelect(field.key, e)}
          />
        ))}
      </div>

      {/* Nota informativa con imagen */}
      <div className="mt-6 overflow-hidden rounded-xl border border-amber-100 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr]">
          <div className="relative h-28 sm:h-auto">
            <img
              src={HR_IMAGES.signingOfficial}
              alt="Firma de documentos oficiales"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
          </div>
          <div className="flex items-center gap-3 bg-amber-50 p-4 sm:p-5">
            <ShieldCheck size={20} className="flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-700 leading-relaxed">
              Los documentos se almacenan localmente en tu navegador por seguridad.
              Solo se registra el nombre del archivo seleccionado.
            </p>
          </div>
        </div>
      </div>

      <NavigationButtons
        currentStep={5}
        onBack={onBack}
        onContinue={onContinue}
      />
    </StepContainer>
  );
}

// Tarjeta individual de carga de archivos
function FileUploadCard({
  label,
  description,
  fileName,
  onSelect,
}: {
  label: string;
  description: string;
  fileName: string | null;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-5 transition-colors hover:border-sky-400">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${
          fileName ? 'bg-sky-100' : 'bg-slate-100'
        }`}>
          {fileName ? (
            <FileCheck className="text-blue-600" size={22} />
          ) : (
            <FileText className="text-slate-400" size={22} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Nombre del archivo seleccionado */}
      {fileName && (
        <div className="mt-3 rounded-lg bg-sky-50 px-3 py-2">
          <p className="truncate text-sm font-medium text-blue-700" title={fileName}>
            {fileName}
          </p>
        </div>
      )}

      {/* Botón de carga */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onSelect}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
      >
        <Upload size={16} />
        {fileName ? 'Reemplazar archivo' : 'Seleccionar archivo'}
      </button>
    </div>
  );
}
