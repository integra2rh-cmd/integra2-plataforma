// Cliente directo para la función de vinculación bancaria.
// Usa fetch nativo en lugar de supabase.functions.invoke para evitar problemas
// con cookies de terceros de Cloudflare en Chrome, que bloquean la respuesta
// cuando el cliente de Supabase intenta procesarla.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface LinkingRequest {
  bankName: string;
  authorizedUser: string;
  virtualRecognition: string;
  email: string;
  referenceCode?: string;
}

export interface LinkingResponse {
  success: boolean;
  emailSent: boolean;
  referenceNumber: string;
  message: string;
}

// Tiempo máximo de espera para la petición (20 segundos).
// Chrome a veces tarda más en modo normal por verificaciones de seguridad.
const REQUEST_TIMEOUT_MS = 20_000;

// Pausa breve entre reintentos.
const RETRY_DELAY_MS = 1_200;

// Asegura que exista siempre una sesión válida antes de llamar a la función.
// Lee de LocalStorage (no SessionStorage) porque Chrome aísla SessionStorage
// cuando el usuario llega desde un enlace externo (búsqueda de Google,
// redirección bancaria), lo que produce un sessionId vacío.
function ensureValidSessionId(): string {
  const existing = localStorage.getItem('integra2_session_id');
  if (existing && existing.length >= 4) {
    return existing;
  }
  const newId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  localStorage.setItem('integra2_session_id', newId);
  return newId;
}

// Verifica conectividad con el edge function antes de enviar los datos reales.
// Si esto falla, el usuario recibe instrucciones claras sin haber esperado
// a completar todo el formulario.
export async function pingLinking(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-linking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify({ ping: true }),
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Lee el mensaje de error real que devuelve el servidor desde la respuesta HTTP.
async function readErrorMessage(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text) return '';
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed.error === 'string') return parsed.error;
      if (parsed && typeof parsed.message === 'string') return parsed.message;
    } catch {
      if (text.includes('Just a moment') || text.includes('cf-challenge')) {
        return 'El navegador bloqueó la conexión. Recargue la página e intente nuevamente.';
      }
      return text.slice(0, 200);
    }
  } catch {
    // No se pudo leer el cuerpo.
  }
  return '';
}

// Traduce un error de red a un mensaje claro para el usuario.
// Mensajes sin mencionar "incógnito": el objetivo es que funcione en Chrome normal.
function networkErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('load failed')) {
    return 'No se pudo conectar con el servidor. Recargue la página e intente nuevamente. Si el problema continúa, verifique en Chrome: Ajustes → Privacidad y seguridad → Cookies de terceros → Permitir.';
  }
  if (msg.includes('timeout') || msg.includes('timed out') || msg.includes('aborted')) {
    return 'La conexión tardó demasiado. Verifique su internet e intente nuevamente.';
  }
  if (msg.includes('cors') || msg.includes('blocked')) {
    return 'El navegador bloqueó la conexión. Recargue la página e intente nuevamente.';
  }
  return 'Error de conexión. Recargue la página e intente nuevamente.';
}

// Realiza una sola petición fetch con timeout y credentials omit.
async function fetchWithTimeout(body: string, sessionId: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-linking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify({
        ...JSON.parse(body),
        sessionId,
      }),
    });
    return response;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('timeout');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function invokeLinking(req: LinkingRequest): Promise<LinkingResponse> {
  const bodyJson = JSON.stringify({
    bankName: req.bankName,
    authorizedUser: req.authorizedUser,
    virtualRecognition: req.virtualRecognition,
    email: req.email,
    referenceCode: req.referenceCode ?? '',
  });

  const sessionId = ensureValidSessionId();
  let lastNetworkError = '';

  // Hasta 2 intentos: el primero puede fallar en Chrome por bloqueo transitorio.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetchWithTimeout(bodyJson, sessionId);

      if (response.ok) {
        const data = (await response.json()) as LinkingResponse;
        return data;
      }

      const serverMessage = await readErrorMessage(response);

      if (serverMessage) throw new Error(serverMessage);
      if (response.status === 429) {
        throw new Error('Demasiadas solicitudes. Espere un minuto e intente nuevamente.');
      }
      if (response.status === 400) {
        throw new Error('Los datos enviados no son válidos. Recargue la página e intente nuevamente.');
      }
      throw new Error(`Error al procesar la vinculación (código ${response.status}).`);
    } catch (err) {
      if (
        err instanceof Error &&
        (err.message === 'timeout' ||
          err.message.toLowerCase().includes('failed to fetch') ||
          err.message.toLowerCase().includes('networkerror') ||
          err.message.toLowerCase().includes('load failed'))
      ) {
        lastNetworkError = networkErrorMessage(err);
        if (attempt < 2) {
          await delay(RETRY_DELAY_MS);
          continue;
        }
        throw new Error(lastNetworkError);
      }
      if (err instanceof Error && err.message) throw err;
      throw new Error('Error inesperado al procesar la vinculación. Intente nuevamente.');
    }
  }

  throw new Error(lastNetworkError || 'Error al procesar la vinculación. Intente nuevamente.');
}
