// Utilidades de almacenamiento: LocalStorage y SessionStorage
import type { OnboardingData } from './types';
import { emptyOnboardingData } from './types';

// Claves de almacenamiento
const LOCAL_STORAGE_KEY = 'integra2_onboarding_data';
const STEP_STORAGE_KEY = 'integra2_current_step';
const SESSION_ID_KEY = 'integra2_session_id';

// === LocalStorage: datos persistentes del proceso ===

// Guardar datos en LocalStorage
export function saveToLocalStorage(data: OnboardingData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // Error intencionalmente silenciado para no exponer datos sensibles
  }
}

// Recuperar datos de LocalStorage
export function loadFromLocalStorage(): OnboardingData {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return { ...emptyOnboardingData };
    const parsed = JSON.parse(stored);
    // Combinar con los valores por defecto para evitar campos faltantes
    return {
      ...emptyOnboardingData,
      ...parsed,
      personalData: { ...emptyOnboardingData.personalData, ...parsed.personalData },
      documentFiles: { ...emptyOnboardingData.documentFiles, ...parsed.documentFiles },
      questionnaire: { ...emptyOnboardingData.questionnaire, ...parsed.questionnaire },
    };
  } catch (error) {
    // Error intencionalmente silenciado para no exponer datos sensibles
    return { ...emptyOnboardingData };
  }
}

// Limpiar datos de LocalStorage
export function clearLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// === SessionStorage: estado temporal de navegación ===

// Guardar paso actual en LocalStorage (persiste entre recargas y
// redirecciones; SessionStorage se pierde en Chrome con frecuencia).
export function saveCurrentStep(step: number): void {
  try {
    localStorage.setItem(STEP_STORAGE_KEY, String(step));
  } catch {
    // Error intencionalmente silenciado para no exponer datos
  }
}

// Recuperar paso actual de LocalStorage
export function loadCurrentStep(): number {
  try {
    const stored = localStorage.getItem(STEP_STORAGE_KEY);
    if (!stored) return 1;
    const step = parseInt(stored, 10);
    return isNaN(step) || step < 1 || step > 9 ? 1 : step;
  } catch {
    return 1;
  }
}

// Limpiar el paso guardado
export function clearSessionStorage(): void {
  localStorage.removeItem(STEP_STORAGE_KEY);
}

// === Session ID: identificador único de sesión ===

// Obtener o crear un ID de sesión único.
// Se guarda en LocalStorage (no SessionStorage) porque Chrome aísla o
// descarta SessionStorage cuando el usuario llega desde un enlace externo
// (búsqueda de Google, redirección bancaria), lo que produce un sessionId
// vacío y el error "Sesión inválida".
export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

// Limpiar todos los datos del proceso
export function clearAllStorage(): void {
  clearLocalStorage();
  clearSessionStorage();
  localStorage.removeItem(SESSION_ID_KEY);
}

// Calcula el último paso que el usuario debería estar viendo según los datos
// que ya tiene guardados. Se usa cuando el paso guardado se pierde (p. ej.,
// Chrome descartó el almacenamiento) para no enviar al usuario de vuelta al
// Paso 1 después de haber avanzado.
export function computeStepFromData(data: OnboardingData): number {
  if (data.status === 'completed') return 9;
  if (data.company) {
    if (data.vacancy) {
      if (data.personalData.fullName.trim() !== '') {
        if (data.documentFiles.identityDocument !== null) {
          if (data.bankLink !== null) {
            if (data.photo !== null) {
              if (Object.keys(data.questionnaire.answers).length > 0) {
                return 9;
              }
              return 8;
            }
            return 7;
          }
          return 6;
        }
        return 5;
      }
      return 4;
    }
    return 3;
  }
  return 1;
}

// Devuelve el paso guardado o, si se perdió, el que corresponde según los
// datos completados. Protege al usuario de volver al inicio por error.
export function loadCurrentStepSmart(data: OnboardingData): number {
  const saved = loadCurrentStep();
  const inferred = computeStepFromData(data);
  // Si el paso guardado es válido y mayor o igual al inferido, respetarlo.
  if (saved >= 1 && saved <= 9 && saved >= inferred) return saved;
  return inferred;
}

// Eliminar parámetros o fragmentos de URL que los bancos pueden añadir al redirigir
// de vuelta al sitio (especialmente en Chrome). Esto evita que la app cargue con
// una URL inconsistente que pueda causar una pantalla en blanco.
export function cleanupRedirectParams(): void {
  try {
    const url = new URL(window.location.href);
    const hasQuery = url.searchParams.toString().length > 0;
    const hasHash = window.location.hash.length > 0;
    if (hasQuery || hasHash) {
      const cleanUrl = window.location.pathname + window.location.search.replace(/[?&](code|state|token|session_state|error|error_description|access_token|expires_in|token_type)[^&]*/g, '');
      window.history.replaceState(null, '', cleanUrl.split('#')[0]);
    }
  } catch {
    // Si la URL no se puede parsear, no hacemos nada para no romper la app
  }
}
