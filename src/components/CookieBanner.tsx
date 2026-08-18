// Banner de consentimiento de cookies para INTEGRA2 RH
import { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck, Database, Eye } from 'lucide-react';

const STORAGE_KEY = 'integra2_cookie_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fadeIn">
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-slate-900/5">
          {/* Barra superior con icono y cierre */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <Cookie size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Aviso de cookies</h3>
                <p className="text-xs text-slate-500">INTEGRA2 RH respeta su privacidad</p>
              </div>
            </div>
            <button
              onClick={handleAccept}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Cerrar aviso"
            >
              <X size={18} />
            </button>
          </div>

          {/* Contenido principal */}
          <div className="px-5 py-4">
            {!showDetails ? (
              <>
                <p className="text-sm leading-relaxed text-slate-600">
                  Utilizamos cookies y almacenamiento local para guardar su progreso en el
                  proceso de incorporación y mejorar su experiencia en nuestro sitio.
                  No compartimos su información con terceros.
                </p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    Más información
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Solo necesarias
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                  >
                    <ShieldCheck size={16} />
                    Aceptar todas
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Panel de detalles */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg bg-sky-50 p-3.5">
                    <Database size={18} className="mt-0.5 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Almacenamiento local necesario</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        Guarda el paso actual del proceso de incorporación y los datos del
                        formulario para que pueda continuar donde lo dejó al recargar la página.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3.5">
                    <ShieldCheck size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Cookies de funcionalidad</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        Recordarnos su preferencia de consentimiento para no mostrar este
                        aviso nuevamente en visitas futuras.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3.5">
                    <Eye size={18} className="mt-0.5 flex-shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Sin cookies de terceros</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                        No utilizamos cookies publicitarias ni de seguimiento. Su información
                        no se comparte con servicios de analítica externa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Solo necesarias
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                  >
                    <ShieldCheck size={16} />
                    Aceptar todas
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
