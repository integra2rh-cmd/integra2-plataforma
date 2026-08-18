// Paso 7 — Fotografía
import { useRef, useState } from 'react';
import { Camera, Upload, RefreshCw, ImageIcon, Trash2, Image, AlertCircle, Info } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES } from '@/lib/stepImages';
import type { OnboardingData } from '@/lib/types';

interface Step7FotografiaProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step7Fotografia({ data, onDataChange, onBack, onContinue }: Step7FotografiaProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [permissionNotice, setPermissionNotice] = useState(false);

  function processFile(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor seleccione un archivo de imagen válido.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB.');
      return;
    }

    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onDataChange({ photo: result });
    };
    reader.onerror = () => {
      setError('Error al leer el archivo de imagen.');
    };
    reader.readAsDataURL(file);
  }

  function handleCameraSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      // User likely denied camera permission or no camera available
      setPermissionNotice(true);
      return;
    }
    setPermissionNotice(false);
    processFile(file);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  }

  function handleGallerySelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    processFile(file);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }

  function handleOpenCamera() {
    setPermissionNotice(false);
    setError('');
    cameraInputRef.current?.click();
  }

  function handleOpenGallery() {
    setError('');
    galleryInputRef.current?.click();
  }

  function handleRemovePhoto() {
    onDataChange({ photo: null });
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }

  return (
    <StepContainer
      title="Fotografía para carnet de trabajo"
      description="Sube una fotografía tipo carnet. Se utilizará en tu carnet de trabajo."
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step7} alt="Sesión de fotos profesional" />

      {/* Input oculto para cámara */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleCameraSelect}
      />

      {/* Input oculto para galería */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleGallerySelect}
      />

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Aviso de permisos de cámara */}
      {permissionNotice && (
        <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
          <div className="flex items-start gap-2">
            <Info size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">No se pudo acceder a la cámara</p>
              <p>
                Su navegador puede haber bloqueado el acceso a la cámara. Para permitirlo:
              </p>
              <ul className="mt-1.5 space-y-0.5 text-xs text-amber-700 pl-1">
                <li>1. Haga clic en el icono de candado o cámara en la barra de direcciones del navegador.</li>
                <li>2. Seleccione "Permitir" para el acceso a la cámara.</li>
                <li>3. Recargue la página e intente nuevamente.</li>
                <li>4. También puede usar la opción "Subir desde galería" como alternativa.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Aviso general sobre permisos */}
      {!permissionNotice && !data.photo && (
        <div className="mb-4 rounded-lg bg-sky-50 border border-sky-100 px-4 py-3">
          <div className="flex items-start gap-2">
            <Info size={16} className="flex-shrink-0 mt-0.5 text-sky-600" />
            <p className="text-xs text-sky-800">
              <span className="font-semibold">Aviso:</span> Si elige usar la cámara, el navegador le pedirá permiso para acceder a ella durante esta sesión. Debe permitir el acceso para poder tomar la foto. También puede subir una imagen desde su galería o archivo.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Vista previa de la fotografía o placeholder */}
        <div className="relative">
          {data.photo ? (
            <div className="relative">
              <img
                src={data.photo}
                alt="Vista previa"
                className="h-48 w-40 rounded-xl border-4 border-white object-cover shadow-lg sm:h-56 sm:w-48"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                <p className="text-xs text-white text-center">Vista previa</p>
              </div>
            </div>
          ) : (
            <div className="flex h-48 w-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 sm:h-56 sm:w-48">
              <ImageIcon className="text-slate-300" size={48} />
              <p className="mt-2 text-xs text-slate-400 text-center px-4">
                Sin fotografía
              </p>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {!data.photo ? (
            <>
              <button
                onClick={handleOpenCamera}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700"
              >
                <Camera size={18} />
                Tomar foto con cámara
              </button>
              <button
                onClick={handleOpenGallery}
                className="flex items-center gap-2 rounded-lg border-2 border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-sky-50"
              >
                <Image size={18} />
                Subir desde galería
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleOpenCamera}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700"
              >
                <RefreshCw size={18} />
                Tomar nueva foto
              </button>
              <button
                onClick={handleOpenGallery}
                className="flex items-center gap-2 rounded-lg border-2 border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-sky-50"
              >
                <Upload size={18} />
                Subir otra imagen
              </button>
              <button
                onClick={handleRemovePhoto}
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </>
          )}
        </div>

        {/* Recomendaciones */}
        <div className="mt-8 w-full max-w-md rounded-xl bg-slate-50 border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Recomendaciones:</h4>
          <ul className="space-y-1.5 text-xs text-slate-500">
            <li className="flex items-start gap-2">
              <Upload size={14} className="mt-0.5 flex-shrink-0 text-sky-500" />
              Use una imagen frontal, con buena iluminación
            </li>
            <li className="flex items-start gap-2">
              <Upload size={14} className="mt-0.5 flex-shrink-0 text-sky-500" />
              Fondo claro y uniforme preferiblemente
            </li>
            <li className="flex items-start gap-2">
              <Upload size={14} className="mt-0.5 flex-shrink-0 text-sky-500" />
              Formato: JPG o PNG, máximo 5MB
            </li>
            <li className="flex items-start gap-2">
              <Upload size={14} className="mt-0.5 flex-shrink-0 text-sky-500" />
              La foto se guarda en su navegador (LocalStorage)
            </li>
          </ul>
        </div>
      </div>

      <NavigationButtons
        currentStep={7}
        onBack={onBack}
        onContinue={onContinue}
        canContinue={data.photo !== null}
      />
    </StepContainer>
  );
}
