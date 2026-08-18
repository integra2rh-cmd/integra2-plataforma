/*
# Corregir política de update en vacancies

## Problema
La política "anon_update_vacancies" fue creada accidentalmente sobre la tabla `companies`
en lugar de `vacancies` en la migración anterior.

## Cambios
- Eliminar la política errónea en `companies`
- Crear la política correcta en `vacancies`
*/

DROP POLICY IF EXISTS "anon_update_vacancies" ON companies;

DROP POLICY IF EXISTS "anon_update_vacancies" ON vacancies;
CREATE POLICY "anon_update_vacancies" ON vacancies FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
