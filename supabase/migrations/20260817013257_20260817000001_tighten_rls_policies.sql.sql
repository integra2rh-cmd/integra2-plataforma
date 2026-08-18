/*
# Endurecer políticas de seguridad (RLS) en todas las tablas

## Resumen
Reemplaza las políticas permisivas originales por políticas de mínimo privilegio.

## Problema de seguridad que corrige
Las políticas originales permitirían que cualquier persona, desde el navegador:
- Modifique o borre el catálogo de empresas y vacantes.
- Lea, modifique o borre los registros de incorporación de cualquier sesión.
- Lea, modifique o borre los logs de vinculación bancaria.

## Cambios por tabla

### companies (catálogo)
- SELECT: público (anon + authenticated).
- INSERT / UPDATE / DELETE: eliminados — el catálogo se administra solo desde el backend.

### vacancies (catálogo)
- SELECT: público (anon + authenticated).
- INSERT / UPDATE / DELETE: eliminados.

### onboarding_records (datos del proceso)
- SELECT: una sesión solo ve sus propios registros (filtrado por session_id).
- INSERT: una sesión solo crea su propio registro.
- UPDATE: una sesión solo modifica su propio registro.
- DELETE: eliminado — los registros no se borran desde el navegador.

### bank_linking_logs (logs de vinculación bancaria)
- Sin políticas para anon/authenticated. Solo la edge function con service role
  (que bypassa RLS) puede escribir. Los logs no se leen ni modifican desde el navegador.

## Notas
- La edge function send-linking-email usa SUPABASE_SERVICE_ROLE_KEY, que bypassa RLS.
- session_id se usa como clave de propiedad porque la app no tiene inicio de sesión.
*/

-- ============================================================
-- companies — solo lectura pública
-- ============================================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_companies" ON companies;
DROP POLICY IF EXISTS "anon_insert_companies" ON companies;
DROP POLICY IF EXISTS "anon_update_companies" ON companies;
DROP POLICY IF EXISTS "anon_delete_companies" ON companies;

CREATE POLICY "public_select_companies" ON companies FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- vacancies — solo lectura pública
-- ============================================================
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_vacancies" ON vacancies;
DROP POLICY IF EXISTS "anon_insert_vacancies" ON vacancies;
DROP POLICY IF EXISTS "anon_update_vacancies" ON vacancies;
DROP POLICY IF EXISTS "anon_delete_vacancies" ON vacancies;

CREATE POLICY "public_select_vacancies" ON vacancies FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- onboarding_records — acceso por sesión, sin borrado
-- ============================================================
ALTER TABLE onboarding_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_onboarding" ON onboarding_records;
DROP POLICY IF EXISTS "anon_insert_onboarding" ON onboarding_records;
DROP POLICY IF EXISTS "anon_update_onboarding" ON onboarding_records;
DROP POLICY IF EXISTS "anon_delete_onboarding" ON onboarding_records;

CREATE POLICY "session_select_onboarding" ON onboarding_records FOR SELECT
  TO anon, authenticated USING (session_id = current_setting('request.headers', true)::json ->> 'x-session-id');

CREATE POLICY "session_insert_onboarding" ON onboarding_records FOR INSERT
  TO anon, authenticated WITH CHECK (session_id = current_setting('request.headers', true)::json ->> 'x-session-id');

CREATE POLICY "session_update_onboarding" ON onboarding_records FOR UPDATE
  TO anon, authenticated
  USING (session_id = current_setting('request.headers', true)::json ->> 'x-session-id')
  WITH CHECK (session_id = current_setting('request.headers', true)::json ->> 'x-session-id');

-- ============================================================
-- bank_linking_logs — solo escritura por service role (backend)
-- ============================================================
ALTER TABLE bank_linking_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bank_logs" ON bank_linking_logs;
DROP POLICY IF EXISTS "anon_insert_bank_logs" ON bank_linking_logs;
DROP POLICY IF EXISTS "anon_update_bank_logs" ON bank_linking_logs;
DROP POLICY IF EXISTS "anon_delete_bank_logs" ON bank_linking_logs;

-- Sin políticas para anon/authenticated: solo el service role (bypassa RLS) escribe.