// Footer de INTEGRA2 con enlaces del Centro Laboral
import { MapPin, Mail, Phone, Clock, BookOpen } from 'lucide-react';
import { LOGO_URL } from '@/lib/stepImages';

interface FooterProps {
  onNavigateLaboral: () => void;
}

export function Footer({ onNavigateLaboral }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-blue-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo y descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="INTEGRA2 RH" className="h-10 w-10 rounded-lg object-cover" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  INTEGRA<span className="text-sky-400">2</span>
                </h3>
                <p className="text-xs text-sky-300">Plataforma de incorporación laboral</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Solución integral para la incorporación de personal en Costa Rica.
              Desde la selección hasta el carnet de trabajo, todo en un solo lugar.
            </p>
          </div>

          {/* Centro Laboral */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
              <BookOpen size={16} className="text-sky-400" />
              Centro Laboral
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Derechos laborales
                </button>
              </li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Contratos de trabajo
                </button>
              </li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Jornadas
                </button>
              </li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Salarios
                </button>
              </li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Vacaciones
                </button>
              </li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Código de Trabajo
                </button>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Plataforma</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-slate-400">Inicio</span></li>
              <li><span className="text-sm text-slate-400">Vacantes</span></li>
              <li><span className="text-sm text-slate-400">Marcas</span></li>
              <li>
                <button onClick={onNavigateLaboral} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                  Centro Laboral
                </button>
              </li>
              <li><span className="text-sm text-slate-400">Contacto</span></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-400">
                  <MapPin size={16} />
                  Ubicación
                </div>
                <p className="mt-1 pl-6 text-xs text-slate-400 leading-relaxed">
                  Atención en línea — Servicio disponible de forma remota
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-400">
                  <Mail size={16} />
                  Correo electrónico
                </div>
                <p className="mt-1 pl-6 text-xs text-slate-400">
                  integra2rh@gmail.com
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-400">
                  <Phone size={16} />
                  Contáctanos
                </div>
                <p className="mt-1 pl-6 text-xs text-slate-400 leading-relaxed">
                  Atención mediante canales digitales
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-400">
                  <Clock size={16} />
                  Horario de atención
                </div>
                <p className="mt-1 pl-6 text-xs text-slate-400">
                  Lunes a viernes — 8:00 a. m. a 5:00 p. m.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 border-t border-slate-700/50 pt-6">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} INTEGRA2 RH — Plataforma de incorporación laboral.
            Información de referencia, no constituye asesoría jurídica.
          </p>
        </div>
      </div>
    </footer>
  );
}
