/*
# Integra2 — Plataforma de incorporación laboral

## Resumen
Crea el esquema de base de datos para Integra2, una plataforma de incorporación laboral.
El usuario selecciona una empresa y una vacante, completa su proceso de incorporación
progresivamente, y queda listo para iniciar labores.

## Tablas nuevas
1. `companies` — Catálogo de empresas disponibles para incorporación.
   - id (uuid, pk)
   - name (text, único, no nulo) — nombre de la empresa
   - logo_url (text, nullable) — URL del logotipo
   - active (boolean, default true) — si la empresa está activa
   - created_at (timestamptz)

2. `vacancies` — Catálogo de vacantes/puestos disponibles.
   - id (uuid, pk)
   - title (text, no nulo) — nombre del puesto
   - area (text, nullable) — área departamental
   - location (text, nullable) — ubicación del puesto
   - work_schedule (text, nullable) — jornada laboral
   - company_id (uuid, nullable, fk → companies) — empresa asociada (opcional, las vacantes pueden ser generales)
   - active (boolean, default true)
   - created_at (timestamptz)

3. `onboarding_records` — Registro del proceso de incorporación de cada usuario.
   - id (uuid, pk)
   - session_id (text, no nulo, único) — identificador de sesión del navegador
   - company_id (uuid, nullable, fk → companies)
   - vacancy_id (uuid, nullable, fk → vacancies)
   - personal_data (jsonb, nullable) — datos personales del formulario
   - document_files (jsonb, nullable) — nombres de archivos cargados
   - bank_link (jsonb, nullable) — info de vinculación bancaria (banco, usuario, fecha)
   - photo_data (text, nullable) — foto en base64 para el carnet
   - questionnaire (jsonb, nullable) — respuestas del cuestionario
   - employee_code (text, nullable) — código ficticio de empleado
   - status (text, default 'in_progress') — estado del proceso: in_progress, completed
   - current_step (int, default 1) — paso actual del proceso (1-10)
   - created_at (timestamptz)
   - updated_at (timestamptz)

4. `bank_linking_logs` — Registro de vinculación bancaria con envío de correo.
   - id (uuid, pk)
   - session_id (text, no nulo)
   - bank_name (text, no nulo)
   - authorized_user (text, nullable)
   - email (text, nullable)
   - email_sent (boolean, default false)
   - created_at (timestamptz)

## Seguridad (RLS)
- Todas las tablas tienen RLS habilitado.
- Política de acceso público (anon + authenticated) para SELECT, INSERT, UPDATE, DELETE
  en todas las tablas, ya que esta es una aplicación sin inicio de sesión (single-tenant).
  Los datos se asocian por session_id generado en el navegador.

## Notas
- Los datos sensibles (foto, datos personales) se almacenan también en LocalStorage del navegador.
- La tabla onboarding_records permite recuperar el proceso si el usuario limpia LocalStorage
  pero mantiene el mismo session_id en SessionStorage.
- Las tablas companies y vacancies se siembran con datos iniciales.
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

DROP POLICY IF EXISTS "anon_select_companies" ON companies;
CREATE POLICY "anon_select_companies" ON companies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_companies" ON companies;
CREATE POLICY "anon_insert_companies" ON companies FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_companies" ON companies;
CREATE POLICY "anon_update_companies" ON companies FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_companies" ON companies;
CREATE POLICY "anon_delete_companies" ON companies FOR DELETE
  TO anon, authenticated USING (true);

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

DROP POLICY IF EXISTS "anon_select_vacancies" ON vacancies;
CREATE POLICY "anon_select_vacancies" ON vacancies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_vacancies" ON vacancies;
CREATE POLICY "anon_insert_vacancies" ON vacancies FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_vacancies" ON vacancies;
CREATE POLICY "anon_update_vacancies" ON companies FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_vacancies" ON vacancies;
CREATE POLICY "anon_delete_vacancies" ON vacancies FOR DELETE
  TO anon, authenticated USING (true);

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

DROP POLICY IF EXISTS "anon_select_onboarding" ON onboarding_records;
CREATE POLICY "anon_select_onboarding" ON onboarding_records FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_onboarding" ON onboarding_records;
CREATE POLICY "anon_insert_onboarding" ON onboarding_records FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_onboarding" ON onboarding_records;
CREATE POLICY "anon_update_onboarding" ON onboarding_records FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_onboarding" ON onboarding_records;
CREATE POLICY "anon_delete_onboarding" ON onboarding_records FOR DELETE
  TO anon, authenticated USING (true);

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
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bank_linking_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bank_logs" ON bank_linking_logs;
CREATE POLICY "anon_select_bank_logs" ON bank_linking_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bank_logs" ON bank_linking_logs;
CREATE POLICY "anon_insert_bank_logs" ON bank_linking_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bank_logs" ON bank_linking_logs;
CREATE POLICY "anon_update_bank_logs" ON bank_linking_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bank_logs" ON bank_linking_logs;
CREATE POLICY "anon_delete_bank_logs" ON bank_linking_logs FOR DELETE
  TO anon, authenticated USING (true);

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
