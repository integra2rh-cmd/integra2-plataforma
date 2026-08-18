// Paso 8 — Preguntas de incorporación (30 preguntas según vacante)
import { useState } from 'react';
import { ClipboardList, MessageSquare } from 'lucide-react';
import { StepContainer } from '@/components/StepContainer';
import { NavigationButtons } from '@/components/NavigationButtons';
import { StepImageBanner } from '@/components/StepImageBanner';
import { STEP_IMAGES, HR_IMAGES } from '@/lib/stepImages';
import { getQuestionsForVacancy } from '@/lib/questionBank';
import type { OnboardingData } from '@/lib/types';

interface Step8PreguntasProps {
  data: OnboardingData;
  onDataChange: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const YES_NO_OPTIONS = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
];

export function Step8Preguntas({ data, onDataChange, onBack, onContinue }: Step8PreguntasProps) {
  const [showAll, setShowAll] = useState(false);

  const questions = getQuestionsForVacancy(data.vacancy?.title ?? '');
  const questionnaire = data.questionnaire;
  const answeredCount = questions.filter((q) => {
    const ans = questionnaire.answers[q.id];
    return ans && ans.trim() !== '';
  }).length;
  const allAnswered = answeredCount === questions.length;

  function updateAnswer(questionId: string, value: string) {
    onDataChange({
      questionnaire: {
        ...questionnaire,
        answers: { ...questionnaire.answers, [questionId]: value },
      },
    });
  }

  function updateObservations(value: string) {
    onDataChange({
      questionnaire: { ...questionnaire, observations: value },
    });
  }

  const visibleQuestions = showAll ? questions : questions.slice(0, 10);

  return (
    <StepContainer
      title="Preguntas de incorporación"
      description={`Responda las siguientes preguntas sobre su proceso de incorporación al puesto de ${data.vacancy?.title ?? 'su interés'}.`}
    >
      <StepImageBanner imageUrl={STEP_IMAGES.step8} alt="Cuestionario de incorporación" />

      {/* Bloque visual de bienvenida al cuestionario */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-center p-5 sm:p-6">
            <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <ClipboardList size={14} />
              Cuestionario de incorporación
            </div>
            <h3 className="text-sm font-bold text-slate-800">Conozcamos más sobre usted</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Estas preguntas nos ayudan a entender su experiencia y adaptar su proceso
              de incorporación. Responda con sinceridad; no hay respuestas correctas
              o incorrectas.
            </p>
          </div>
          <div className="relative h-32 sm:h-auto">
            <img
              src={HR_IMAGES.businessInterview}
              alt="Entrevista de incorporación"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Progreso: {answeredCount} de {questions.length} preguntas
          </span>
          <span className="text-sm font-bold text-blue-600">
            {Math.round((answeredCount / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Leyenda de tipos de respuesta */}
      <div className="mb-4 rounded-lg bg-sky-50 border border-sky-100 px-4 py-3 text-xs text-slate-600">
        <span className="font-semibold text-slate-700">Nota: </span>
        Algunas preguntas se responden escribiendo su respuesta, otras con Sí o No. Escriba su respuesta en el espacio indicado.
      </div>

      <div className="space-y-4">
        {/* Lista de preguntas */}
        {visibleQuestions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-2 mb-3">
              <span className="text-blue-600 font-bold text-sm flex-shrink-0">{index + 1}.</span>
              <p className="text-sm font-medium text-slate-800 flex-1">{q.text}</p>
            </div>

            {/* Respuesta de texto */}
            {q.type === 'text' && (
              <textarea
                value={questionnaire.answers[q.id] ?? ''}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                placeholder="Escriba su respuesta aquí..."
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100 resize-none"
              />
            )}

            {/* Respuesta Sí/No */}
            {q.type === 'yesno' && (
              <div className="flex gap-3">
                {YES_NO_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateAnswer(q.id, option.value)}
                    className={`flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-all sm:flex-none sm:px-8 ${
                      questionnaire.answers[q.id] === option.value
                        ? option.value === 'si'
                          ? 'border-sky-500 bg-sky-50 text-blue-700'
                          : 'border-slate-400 bg-slate-100 text-slate-700'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Botón mostrar más/menos */}
        {questions.length > 10 && !showAll && (
          <>
            {/* Imagen intercalada: equipo colaborando */}
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <img
                src={HR_IMAGES.teamCollaboration}
                alt="Equipo de trabajo colaborando"
                loading="lazy"
                className="h-36 w-full object-cover sm:h-44"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 text-white">
                  <MessageSquare size={16} className="text-sky-300" />
                  <p className="text-xs font-medium sm:text-sm">
                    Su opinión nos ayuda a crear un mejor ambiente de trabajo
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                {showAll ? 'Mostrar menos' : `Mostrar las ${questions.length - 10} preguntas restantes`}
              </button>
            </div>
          </>
        )}

        {showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Mostrar menos
            </button>
          </div>
        )}

        {/* Campo de observaciones */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Observaciones
          </label>
          <textarea
            value={questionnaire.observations}
            onChange={(e) => updateObservations(e.target.value)}
            placeholder="Escriba aquí cualquier observación o comentario adicional..."
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100 resize-none"
          />
        </div>
      </div>

      <NavigationButtons
        currentStep={8}
        onBack={onBack}
        onContinue={onContinue}
        canContinue={allAnswered}
      />
    </StepContainer>
  );
}
