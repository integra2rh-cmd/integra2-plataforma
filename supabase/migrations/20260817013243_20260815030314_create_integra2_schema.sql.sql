/*
# Integra2 — Plataforma de incorporación laboral

## Resumen
Crea el esquema de base de datos para Integra2, una plataforma de incorporación laboral.
El usuario selecciona una empresa y una vacante, completa su proceso de incorporación
progresivamente, y queda listo para iniciar labores.

## Tablas nuevas
1. `companies` — Catálogo de empresas disponibles para incorporación.
2. `vacancies` — Catálogo de vacantes/puestos disponibles.
3. `onboarding_records` — Registro del proceso de incorporación de cada usuario.
4. `bank_linking_logs` — Registro de vinculación bancaria con envío de correo.

## Seguridad (RLS)
- Todas las tablas tienen RLS habilitado.
- Las políticas se endurecen en la migración siguiente.
*/

-- ============================================================
-- Tabla: companies
-- ============================================================
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  logo_url text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Tabla: vacancies
-- ============================================================
CREATE TABLE IF NOT EXISTS vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  area text,
  location text,
  work_schedule text,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Tabla: onboarding_records
-- ============================================================
CREATE TABLE IF NOT EXISTS onboarding_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  vacancy_id uuid REFERENCES vacancies(id) ON DELETE SET NULL,
  personal_data jsonb,
  document_files jsonb,
  bank_link jsonb,
  photo_data text,
  questionnaire jsonb,
  employee_code text,
  status text NOT NULL DEFAULT 'in_progress',
  current_step int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE onboarding_records ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Tabla: bank_linking_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS bank_linking_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  bank_name text NOT NULL,
  authorized_user text,
  email text,
  email_sent boolean NOT NULL DEFAULT false,
  virtual_recognition text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bank_linking_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Datos iniciales: empresas
-- ============================================================
INSERT INTO companies (name) VALUES
  ('Amazon'),
  ('Sykes'),
  ('Grupo Q'),
  ('Grupo Purdy'),
  ('Toyota'),
  ('Firestone'),
  ('Fishel'),
  ('Grupo Gollo'),
  ('Artelec'),
  ('Walmart'),
  ('PriceSmart'),
  ('Mega Súper'),
  ('DEKRA'),
  ('Banco Nacional'),
  ('BAC San José'),
  ('FIFCO / Florida Ice and Farm Company'),
  ('Intel'),
  ('Boston Scientific'),
  ('Abbott'),
  ('Thermo Fisher Scientific'),
  ('Microsoft')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- Datos iniciales: vacantes
-- ============================================================
INSERT INTO vacancies (title, area, location, work_schedule) VALUES
  ('Auxiliar contable', 'Contabilidad', 'San José, Costa Rica', 'Tiempo completo'),
  ('Servicio al cliente', 'Atención al cliente', 'Heredia, Costa Rica', 'Tiempo completo'),
  ('Call center', 'Atención al cliente', 'San José, Costa Rica', 'Rotativo'),
  ('Asistente administrativo', 'Administración', 'Alajuela, Costa Rica', 'Tiempo completo'),
  ('Oficina', 'Administración', 'Cartago, Costa Rica', 'Tiempo completo'),
  ('Recepcionista', 'Administración', 'San José, Costa Rica', 'Tiempo completo'),
  ('Chofer', 'Logística', 'Alajuela, Costa Rica', 'Tiempo completo'),
  ('Mecánico', 'Mantenimiento', 'Cartago, Costa Rica', 'Tiempo completo'),
  ('Bodega', 'Logística', 'Heredia, Costa Rica', 'Tiempo completo'),
  ('Operario', 'Producción', 'Alajuela, Costa Rica', 'Tiempo completo'),
  ('Vendedor', 'Ventas', 'San José, Costa Rica', 'Tiempo completo'),
  ('Supervisor', 'Administración', 'San José, Costa Rica', 'Tiempo completo'),
  ('Recursos humanos', 'Recursos humanos', 'Heredia, Costa Rica', 'Tiempo completo'),
  ('Soporte técnico', 'Tecnología', 'San José, Costa Rica', 'Tiempo completo'),
  ('Ejecutivo de ventas', 'Ventas', 'San José, Costa Rica', 'Tiempo completo'),
  ('Mantenimiento', 'Mantenimiento', 'Cartago, Costa Rica', 'Tiempo completo'),
  ('Logística', 'Logística', 'Heredia, Costa Rica', 'Tiempo completo'),
  ('Compras', 'Compras', 'San José, Costa Rica', 'Tiempo completo'),
  ('Otras vacantes', 'General', 'Variable', 'Variable')
ON CONFLICT DO NOTHING;