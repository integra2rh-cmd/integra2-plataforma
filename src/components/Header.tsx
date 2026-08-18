// Encabezado profesional de Integra2 con navegación del sitio
import { Menu, Home, Briefcase, Building2, BookOpen, Mail } from 'lucide-react';
import { LOGO_URL } from '@/lib/stepImages';

interface HeaderProps {
  onToggleMenu: () => void;
  currentView: 'onboarding' | 'laboral' | 'servicio';
  onNavigate: (view: 'home' | 'laboral') => void;
}

export function Header({ onToggleMenu, currentView, onNavigate }: HeaderProps) {
  const navItems = [
    { label: 'Inicio', icon: Home, view: 'home' as const, active: currentView === 'onboarding' || currentView === 'servicio' },
    { label: 'Vacantes', icon: Briefcase, view: 'home' as const, active: false },
    { label: 'Marcas', icon: Building2, view: 'home' as const, active: false },
    { label: 'Centro Laboral', icon: BookOpen, view: 'laboral' as const, active: currentView === 'laboral' },
    { label: 'Contacto', icon: Mail, view: 'home' as const, active: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 shadow-lg">
      {/* Imagen de fondo generada por IA con overlay oscuro para legibilidad */}
      <div className="absolute inset-0">
        <img
          src="/header-bg-integra2.webp"
          alt="Encabezado de INTEGRA2 RH, plataforma de Recursos Humanos en Costa Rica"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm" />
      </div>

      {/* Contenido del header encima del fondo */}
      <div className="relative flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo y título — clickeable para ir al inicio */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left"
        >
          <img src={LOGO_URL} alt="INTEGRA2 RH" className="h-14 w-14 rounded-lg object-cover shadow-md sm:h-16 sm:w-16" />
          <div>
            <span className="text-lg font-bold tracking-wide text-white drop-shadow-md sm:text-2xl">
              INTEGRA<span className="text-sky-300">2</span>
            </span>
            <p className="hidden text-xs text-sky-200 drop-shadow sm:block sm:text-sm">
              Plataforma de incorporación laboral
            </p>
          </div>
        </button>

        {/* Navegación de escritorio */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-white/90 hover:bg-white/15 hover:text-white backdrop-blur-sm'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botón de menú móvil */}
        <button
          onClick={onToggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 active:bg-sky-500 sm:h-12 sm:w-12 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
