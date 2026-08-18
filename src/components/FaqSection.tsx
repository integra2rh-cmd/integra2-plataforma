import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Qué servicios ofrece INTEGRA2 RH?',
    answer:
      'INTEGRA2 RH ofrece cuatro servicios principales de Recursos Humanos en Costa Rica: reclutamiento de personal, selección por competencias, contratación con gestión documental y legal, y gestión de personal incluyendo nómina, control de asistencia y cumplimiento laboral.',
  },
  {
    question: '¿Cómo funciona el proceso de incorporación de colaboradores?',
    answer:
      'El proceso de incorporación consta de 9 pasos: selección de servicio, empresa y vacante, datos personales del colaborador, documentación, DNI electrónico, fotografía, cuestionario y finalización. Todo se gestiona desde la plataforma digital de INTEGRA2 RH.',
  },
  {
    question: '¿Qué es la vinculación bancaria en el proceso de incorporación?',
    answer:
      'La vinculación bancaria es el proceso mediante el cual el colaborador registra su cuenta bancaria para recibir los pagos de nómina. INTEGRA2 RH coordina con más de 15 bancos de Costa Rica para facilitar este trámite de forma digital y segura.',
  },
  {
    question: '¿Qué es el DNI electrónico y para qué sirve?',
    answer:
      'El DNI electrónico es un mecanismo de identificación digital que permite validar la identidad del colaborador de forma segura durante el proceso de incorporación. Forma parte del expediente digital y agiliza los trámites de contratación.',
  },
  {
    question: '¿Cuánto tarda el proceso de reclutamiento y selección?',
    answer:
      'El tiempo de respuesta para presentar candidatos preseleccionados es de 48 a 72 horas. El proceso completo de selección, que incluye pruebas técnicas, entrevistas por competencias y verificación de referencias, puede tomar de 1 a 3 semanas según el perfil del puesto.',
  },
  {
    question: '¿INTEGRA2 RH opera en todo Costa Rica?',
    answer:
      'Sí, INTEGRA2 RH brinda servicios de outsourcing de Recursos Humanos en todo el territorio de Costa Rica, atendiendo empresas de diversos sectores con un enfoque profesional, transparente y eficiente.',
  },
  {
    question: '¿Qué incluye la gestión de personal de INTEGRA2 RH?',
    answer:
      'La gestión de personal incluye control de asistencia, cálculo de nómina, gestión de bienestar y salud ocupacional, cumplimiento de obligaciones patronales como cargas sociales, aguinaldo y vacaciones, y cierre de la relación laboral con liquidación y finiquito.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8" itemScope itemType="https://schema.org/FAQPage">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
          <HelpCircle size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Preguntas frecuentes
          </h2>
          <p className="text-sm text-slate-500">
            Información sobre nuestros servicios de Recursos Humanos en Costa Rica
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 transition-colors hover:border-blue-200"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-slate-800 sm:text-base" itemProp="name">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-blue-600 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  className="px-5 pb-4"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p className="text-sm leading-relaxed text-slate-600" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
