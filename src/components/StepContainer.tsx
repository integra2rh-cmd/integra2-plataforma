// Contenedor de cada paso con título y descripción
import type { ReactNode } from 'react';

interface StepContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function StepContainer({ title, description, children }: StepContainerProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 text-base text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
