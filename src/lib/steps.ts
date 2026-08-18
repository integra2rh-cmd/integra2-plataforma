// Definición de los 9 pasos del proceso de incorporación
export interface StepDefinition {
  id: number;
  title: string;
  shortTitle: string;
}

export const STEPS: StepDefinition[] = [
  { id: 1, title: 'Inicio', shortTitle: 'Inicio' },
  { id: 2, title: 'Empresa', shortTitle: 'Empresa' },
  { id: 3, title: 'Vacante', shortTitle: 'Vacante' },
  { id: 4, title: 'Datos personales', shortTitle: 'Datos personales' },
  { id: 5, title: 'Documentación', shortTitle: 'Documentación' },
  { id: 6, title: 'DNI Electrónico', shortTitle: 'DNI Electrónico' },
  { id: 7, title: 'Fotografía', shortTitle: 'Fotografía' },
  { id: 8, title: 'Preguntas de incorporación', shortTitle: 'Preguntas' },
  { id: 9, title: 'Finalizar incorporación', shortTitle: 'Finalizar' },
];

export const TOTAL_STEPS = 9;

// Calcular porcentaje de progreso según el paso
export function getProgressPercentage(step: number): number {
  return (step / TOTAL_STEPS) * 100;
}
