// Paso 6 — DNI Electrónico
import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Link2, CheckCircle2, Loader2, Building, Lock, Cpu, Zap, AlertCircle, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { StepImageBanner } from '@/components/StepImageBanner';
import { COSTA_RICAN_BANKS, BankInfo } from '@/lib/banks';
import { STEP_IMAGES } from '@/lib/stepImages';
import { invokeLinking, pingLinking } from '@/lib/linkingApi';
import type { BankLink, OnboardingData, LinkingStatus } from '@/lib/types';

// Componente de logo con marcador de respaldo si la imagen falla
function BankLogo({ bank, size = 'card' }: { bank: BankInfo; size?: 'card' | 'header' }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const containerClass = size === 'header'
    ? 'flex h-20 w-20 items-center justify-center rounded-xl overflow-hidden bg-white border border-slate-200'
    : 'flex h-16 items-center justify-center w-full overflow-hidden px-3 py-2';

  if (imgError || !bank.logo) {
    return (
      <div className={containerClass}>
        <span className="text-sm font-extrabold tracking-wider text-slate-700">
          {bank.initials}
        </span>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {!imgLoaded && (
        <span className="text-sm font-extrabold tracking-wider text-slate-400">
          {bank.initials}
        </span>
      )}
      <img
        src={bank.logo}
        alt={`Logo ${bank.name}`}
        className="max-h-full max-w-[90%] object-contain"
        style={{ display: imgLoaded ? 'block' : 'none' }}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
    </div>
  );
}

// Barra de progreso digital moderna con incrementos de 5%
function DigitalProgressBar({ percentage }: { percentage: number }) {
  const segments = 20; // 20 segmentos × 5% = 100%

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Progreso digital</span>
        </div>
        <span className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">
          {percentage}%
        </span>
      </div>
      {/* Segmentos digitales estilo LED */}
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < Math.round(percentage / 5);
          return (
            <div
              key={i}
              className={`h-6 flex-1 rounded-sm transition-all duration-300 ${
                isFilled
                  ? 'bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                  : 'bg-slate-700'
              }`}
            />
          );
        })}
      </div>
      {/* Línea de texto estilo terminal */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-500">
        <span>0%</span>
        <span className={percentage >= 100 ? 'text-cyan-400' : 'text-slate-600'}>
          {percentage >= 100 ? 'COMPLETADO' : 'PROCESANDO...'}
        </span>
        <span>100%</span>
      </div>
    </div>
  );
}

interface Step6DniElectronicoProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Step6DniElectronico({ data, onDataChange, onBack, onContinue }: Step6DniElectronicoProps) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [authorizedUser, setAuthorizedUser] = useState('');
  const [virtualRecognition, setVirtualRecognition] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [linkStatus, setLinkStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [connectionChecked, setConnectionChecked] = useState(false);

  // Estado para "Otros bancos" — entidad no listada
  const [showOtherBankInput, setShowOtherBankInput] = useState(false);
  const [otherBankName, setOtherBankName] = useState('');

  // Estado del procesamiento digital
  const [referenceCode, setReferenceCode] = useState('');
  const [progress, setProgress] = useState(data.bankLink?.progress ?? 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [processError, setProcessError] = useState('');

  function handleBankClick(bankName: string) {
    setSelectedBank(bankName);
    setShowOtherBankInput(false);
    setLinkStatus('idle');
    setErrorMessage('');
    setConnectionChecked(false);
  }

  // Mostrar el campo para escribir el nombre de una entidad no listada
  function handleOtherBankClick() {
    setShowOtherBankInput(true);
    setSelectedBank(null);
    setOtherBankName('');
    setLinkStatus('idle');
    setErrorMessage('');
    setConnectionChecked(false);
  }

  // Confirmar el nombre escrito y avanzar al formulario de vinculación
  function handleConfirmOtherBank() {
    const trimmed = otherBankName.trim();
    if (!trimmed) return;
    setSelectedBank(trimmed);
    setShowOtherBankInput(false);
    setLinkStatus('idle');
    setErrorMessage('');
    setConnectionChecked(false);
  }

  function handleBackToBanks() {
    setSelectedBank(null);
    setShowOtherBankInput(false);
    setOtherBankName('');
    setLinkStatus('idle');
    setErrorMessage('');
    setConnectionChecked(false);
  }

  // Verifica la conexión con el servidor antes de intentar la vinculación.
  // Si falla, muestra instrucciones claras para configurar Chrome.
  async function checkConnection(): Promise<boolean> {
    setIsPinging(true);
    try {
      const ok = await pingLinking();
      setConnectionChecked(true);
      if (!ok) {
        setLinkStatus('error');
        setErrorMessage(
          'No se pudo conectar con el servidor. Recargue la página e intente nuevamente. ' +
          'Si el problema continúa, verifique en Chrome: Ajustes → Privacidad y seguridad → ' +
          'Cookies de terceros → Permitir sitios para guardar y leer datos de cookies.'
        );
      }
      return ok;
    } finally {
      setIsPinging(false);
    }
  }

  async function handleLink() {
    if (!selectedBank || !termsAccepted || !authorizedUser.trim()) return;

    // Verificar conexión primero
    const connected = await checkConnection();
    if (!connected) return;

    setIsLinking(true);
    setLinkStatus('idle');
    setErrorMessage('');

    try {
      const result = await invokeLinking({
        bankName: selectedBank,
        authorizedUser,
        virtualRecognition,
        email: data.personalData.email || '',
      });

      const bankLink: BankLink = {
        bankName: selectedBank,
        authorizedUser,
        virtualRecognition,
        termsAccepted,
        linkedAt: new Date().toISOString(),
        emailSent: result.emailSent ?? false,
        status: 'success' as LinkingStatus,
        progress,
      };

      onDataChange({ bankLink });
      setLinkStatus('success');
    } catch (err) {
      // Guardar el intento fallido para que RH tenga registro, pero permitir continuar.
      const bankLink: BankLink = {
        bankName: selectedBank,
        authorizedUser,
        virtualRecognition,
        termsAccepted,
        linkedAt: new Date().toISOString(),
        emailSent: false,
        status: 'error' as LinkingStatus,
        progress,
      };
      onDataChange({ bankLink });

      setLinkStatus('error');
      setErrorMessage(err instanceof Error && err.message ? err.message : 'Error al procesar la vinculación. Intente nuevamente o continúe al siguiente paso.');
    } finally {
      setIsLinking(false);
    }
  }

  // Permite omitir la vinculación y continuar al siguiente paso.
  function handleSkip() {
    const bankLink: BankLink = {
      bankName: selectedBank || 'No especificado',
      authorizedUser: authorizedUser || 'No proporcionado',
      virtualRecognition: virtualRecognition || '',
      termsAccepted: false,
      linkedAt: new Date().toISOString(),
      emailSent: false,
      status: 'skipped' as LinkingStatus,
      progress,
    };
    onDataChange({ bankLink });
    onContinue();
  }

  const canLink = selectedBank && authorizedUser.trim() !== '' && termsAccepted && !isLinking && !isPinging;
  const isLinked = (data.bankLink !== null && data.bankLink?.status === 'success') || linkStatus === 'success';
  const hasError = linkStatus === 'error' || (data.bankLink !== null && data.bankLink?.status === 'error');

  // Procesar: envía el código de referencia al backend
  async function handleProcesar() {
    if (!referenceCode.trim() || isProcessing) return;

    setIsProcessing(true);
    setProcessStatus('idle');
    setProcessError('');

    try {
      await invokeLinking({
        bankName: data.bankLink?.bankName || selectedBank || 'No especificado',
        authorizedUser: data.bankLink?.authorizedUser || authorizedUser,
        virtualRecognition: data.bankLink?.virtualRecognition || virtualRecognition,
        email: data.personalData.email || '',
        referenceCode: referenceCode.trim(),
      });

      const newProgress = Math.min(progress + 5, 100);
      setProgress(newProgress);
      setProcessStatus('success');

      // Actualizar el progreso guardado
      if (data.bankLink) {
        onDataChange({
          bankLink: { ...data.bankLink, progress: newProgress },
        });
      }

      setReferenceCode('');

      if (newProgress >= 100) {
        setProcessError('');
      }
    } catch (err) {
      setProcessStatus('error');
      setProcessError(err instanceof Error && err.message ? err.message : 'Error al procesar. Puede reintentar o continuar al siguiente paso.');
    } finally {
      setIsProcessing(false);
    }
  }

  function handleLinkAnother() {
    setSelectedBank(null);
    setAuthorizedUser('');
    setVirtualRecognition('');
    setTermsAccepted(false);
    setLinkStatus('idle');
    setErrorMessage('');
    setConnectionChecked(false);
    setShowOtherBankInput(false);
    setOtherBankName('');
  }

  const isComplete = progress >= 100;

  return (
    <StepContainer
      title="DNI Electrónico"
      description="Vincula tu cuenta bancaria para completar el proceso de identificación electrónica."
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step6} alt="Banca digital" />

      {/* Sección informativa sobre el DNI Electrónico */}
      {!selectedBank && !isLinked && !showOtherBankInput && (
        <div className="mb-6 space-y-4">
          {/* Qué es el DNI Electrónico */}
          <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">¿Qué es el DNI Electrónico?</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  El DNI Electrónico (Documento Nacional de Identificación Electrónico) es un sistema de
                  identificación digital que permite verificar su identidad de forma segura en línea. En
                  Costa Rica, este proceso se realiza mediante la vinculación con su entidad bancaria,
                  que actúa como proveedor de autenticación. La banca costarricense utiliza estándares
                  de seguridad equivalentes a los de la firma digital, por lo que la vinculación bancaria
                  constituye un mecanismo válido de identificación electrónica.
                </p>
              </div>
            </div>
          </div>

          {/* Para qué sirve */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">¿Para qué sirve?</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                <p className="text-xs text-slate-600">Verificar su identidad de forma digital sin necesidad de documentos físicos.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                <p className="text-xs text-slate-600">Completar su proceso de incorporación laboral de manera remota.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                <p className="text-xs text-slate-600">Firmar documentos y trámites con validez legal en línea.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                <p className="text-xs text-slate-600">Acceder a servicios empresariales que requieren autenticación segura.</p>
              </div>
            </div>
          </div>

          {/* Cómo funciona el proceso */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Cómo funciona el proceso</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Seleccione su entidad bancaria</p>
                  <p className="text-xs text-slate-500">Elija el banco donde tiene su cuenta entre las entidades disponibles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Ingrese su usuario autorizado</p>
                  <p className="text-xs text-slate-500">Proporcione el usuario que utiliza para acceder a la banca en línea de su entidad.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Ingrese su reconocimiento virtual (opcional)</p>
                  <p className="text-xs text-slate-500">Si su banco lo requiere, ingrese el código de reconocimiento o token de seguridad.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">4</div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Acepte los términos y condiciones</p>
                  <p className="text-xs text-slate-500">Revise y acepte el aviso legal para autorizar la vinculación.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">5</div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Vincule y procese</p>
                  <p className="text-xs text-slate-500">Confirme la vinculación y complete el procesamiento digital para finalizar.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seguridad y privacidad */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <Lock size={20} className="flex-shrink-0 mt-0.5 text-green-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Seguridad y privacidad</h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
                    Sus datos se transmiten mediante conexión cifrada (HTTPS) de extremo a extremo.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
                    La información bancaria no se almacena ni se comparte con terceros.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
                    El proceso cumple con la Ley 8968 de Protección de la Persona frente al tratamiento de sus datos personales.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
                    Solo se utiliza la vinculación para verificar su identidad durante el proceso de incorporación.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Entidades participantes */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Building size={20} className="flex-shrink-0 mt-0.5 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Entidades participantes</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Participan los principales bancos y cooperativas de Costa Rica, incluyendo bancos estatales,
                  bancos privados y cooperativas de ahorro y crédito. Seleccione su entidad de la lista inferior
                  para iniciar el proceso de vinculación.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de bancos — siempre visible cuando no hay uno seleccionado */}
      {!selectedBank && !showOtherBankInput && (
        <>
          {isLinked && (
            <div className="mb-4 rounded-xl border-2 border-sky-200 bg-sky-50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <CheckCircle2 size={20} />
                <span className="text-sm font-medium">
                  Entidad vinculada: <strong>{data.bankLink?.bankName}</strong>
                </span>
              </div>
              <p className="mt-1 text-xs text-blue-600">
                Puede vincular otra entidad si lo desea o continuar al siguiente paso.
              </p>
            </div>
          )}

          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
            <Building className="inline mr-2" size={16} />
            Seleccione su entidad bancaria para iniciar la vinculación.
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {COSTA_RICAN_BANKS.map((bank) => (
              <button
                key={bank.name}
                onClick={() => handleBankClick(bank.name)}
                title={bank.name}
                className="group flex flex-col items-stretch overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all hover:border-sky-400 hover:shadow-md active:scale-95"
              >
                <BankLogo bank={bank} size="card" />
              </button>
            ))}
            {/* Tarjeta "Otros bancos" — entidad no listada */}
            <button
              onClick={handleOtherBankClick}
              title="Otros bancos"
              className="group flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 shadow-sm transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow-md active:scale-95"
            >
              <div className="flex h-16 w-full items-center justify-center px-3 py-2">
                <Building size={28} className="text-slate-400 transition-colors group-hover:text-sky-500" />
              </div>
              <span className="w-full bg-slate-100 py-1.5 text-center text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-sky-100 group-hover:text-sky-700">
                Otros bancos
              </span>
            </button>
          </div>
        </>
      )}

      {/* Campo para escribir el nombre de una entidad no listada */}
      {showOtherBankInput && !selectedBank && (
        <div className="max-w-md mx-auto">
          <button
            onClick={handleBackToBanks}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
            Volver a bancos
          </button>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                <Building size={28} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Otros bancos</h3>
              <p className="text-sm text-slate-500">Indique el nombre de su entidad bancaria</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nombre de la entidad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={otherBankName}
                onChange={(e) => setOtherBankName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && otherBankName.trim()) handleConfirmOtherBank();
                }}
                placeholder="Escriba el nombre de su banco o cooperativa"
                autoFocus
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <button
              onClick={handleConfirmOtherBank}
              disabled={!otherBankName.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={18} />
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Formulario de vinculación bancaria */}
      {selectedBank && (
        <div className="max-w-md mx-auto">
          <button
            onClick={handleBackToBanks}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
            Volver a bancos
          </button>

          <div className="rounded-t-xl bg-white p-6 text-center border border-slate-200 border-b-0">
            {COSTA_RICAN_BANKS.find((b) => b.name === selectedBank) ? (
              <div className="mx-auto mb-3 flex justify-center">
                <BankLogo bank={COSTA_RICAN_BANKS.find((b) => b.name === selectedBank)!} size="header" />
              </div>
            ) : (
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                <Building size={32} className="text-slate-500" />
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-800">{selectedBank}</h3>
            <p className="text-sm text-slate-500">Vinculación de cuenta bancaria</p>
          </div>

          <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white p-6 shadow-sm">
            {linkStatus === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto mb-3 text-blue-600" size={48} />
                <h4 className="text-base font-bold text-blue-800">Vinculación exitosa</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Su información ha sido procesada correctamente.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
                  <CheckCircle2 size={16} />
                  <span>Datos enviados y verificados</span>
                </div>
                <button
                  onClick={handleLinkAnother}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-sky-200 bg-sky-50 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-sky-100"
                >
                  <Building size={16} />
                  Vincular otra entidad
                </button>
              </div>
            ) : (
              <>
                {/* Usuario autorizado */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Usuario Autorizado <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={authorizedUser}
                    onChange={(e) => setAuthorizedUser(e.target.value)}
                    placeholder="Ingrese su usuario autorizado"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* Reconocimiento virtual con ojo de secreto */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Reconocimiento virtual
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={virtualRecognition}
                      onChange={(e) => setVirtualRecognition(e.target.value)}
                      placeholder="Ingrese su código de reconocimiento"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-11 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? 'Ocultar' : 'Mostrar'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                    <Lock size={12} />
                    Su información está protegida
                  </p>
                </div>

                {/* Aceptar términos y condiciones */}
                <div className="mb-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-sky-500"
                    />
                    <span className="text-sm text-slate-600">
                      Acepto términos y condiciones de aviso legal
                    </span>
                  </label>
                </div>

                {/* Mensaje de error */}
                {linkStatus === 'error' && (
                  <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-red-700">{errorMessage}</p>
                      </div>
                    </div>
                    {/* Botones: Reintentar + Continuar sin vincular */}
                    <div className="mt-3 flex flex-col gap-2">
                      <button
                        onClick={handleLink}
                        disabled={isLinking || isPinging}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-white py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-40"
                      >
                        {isLinking || isPinging ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Reintentando...
                          </>
                        ) : (
                          <>
                            <RefreshCw size={16} />
                            Reintentar vinculación
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleSkip}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                      >
                        Continuar al siguiente paso
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Botón Vincular (solo visible si no hay error) */}
                {linkStatus !== 'error' && (
                  <button
                    onClick={handleLink}
                    disabled={!canLink}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isLinking || isPinging ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {isPinging ? 'Verificando conexión...' : 'Vinculando...'}
                      </>
                    ) : (
                      <>
                        <Link2 size={18} />
                        Vincular
                      </>
                    )}
                  </button>
                )}

                <p className="mt-3 text-center text-xs text-slate-400">
                  Sus datos se envían de forma segura al procesar la vinculación.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sección de procesamiento digital — visible después de vincular o si hay intento guardado */}
      {(isLinked || hasError) && (
        <div className="mt-6 max-w-md mx-auto space-y-4">
          {/* Barra de progreso digital */}
          <DigitalProgressBar percentage={progress} />

          {/* Campo libre de escritura */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <input
              type="text"
              value={referenceCode}
              onChange={(e) => {
                setReferenceCode(e.target.value);
                setProcessStatus('idle');
                setProcessError('');
              }}
              placeholder="Escriba aquí..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
            {processStatus === 'success' && !isComplete && (
              <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                <CheckCircle size={12} />
                Enviado correctamente
              </div>
            )}

            {/* Mensaje de error del procesamiento */}
            {processStatus === 'error' && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-700">{processError}</p>
                  <p className="mt-1 text-xs text-red-500">Puede reintentar o continuar al siguiente paso.</p>
                </div>
              </div>
            )}

            {/* Botón central PROCESAR */}
            <button
              onClick={handleProcesar}
              disabled={!referenceCode.trim() || isProcessing || isComplete}
              className="mt-4 mx-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 py-3 px-8 text-sm font-bold text-white shadow-md transition-all hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Procesando...
                </>
              ) : isComplete ? (
                <>
                  <CheckCircle size={18} />
                  Procesado
                </>
              ) : (
                <>
                  <Zap size={18} />
                  PROCESAR
                </>
              )}
            </button>

            {/* Confirmación al completar 100% */}
            {isComplete && (
              <div className="mt-4 rounded-lg border-2 border-cyan-200 bg-cyan-50 px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-cyan-700">
                  <CheckCircle size={18} />
                  <span className="text-sm font-semibold">Información completada correctamente</span>
                </div>
              </div>
            )}

            {/* Aviso de progreso parcial: el usuario puede continuar aunque no llegue a 100% */}
            {!isComplete && progress > 0 && (
              <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-center">
                <p className="text-xs text-amber-700">
                  Ha completado {progress}% del procesamiento. Puede continuar al siguiente paso y completarlo más tarde.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botones de navegación: siempre se puede continuar, aunque la vinculación falle */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Regresar
        </button>
        <button
          onClick={onContinue}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Continuar
          <ArrowRight size={18} />
        </button>
      </div>
    </StepContainer>
  );
}
