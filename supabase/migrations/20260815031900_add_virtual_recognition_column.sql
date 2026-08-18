/*
# Agregar columna virtual_recognition a bank_linking_logs

## Cambios
- Agrega la columna `virtual_recognition` (text, nullable) a la tabla `bank_linking_logs`
  para almacenar el código de reconocimiento virtual ingresado por el usuario
  durante la vinculación bancaria del DNI Electrónico.

## Notas
- Esta columna almacena el valor del campo "Reconocimiento virtual" del formulario.
- Es nullable porque el campo no es obligatorio en el formulario.
- No se pierden datos existentes: la columna se agrega con ALTER TABLE.
*/

ALTER TABLE bank_linking_logs
  ADD COLUMN IF NOT EXISTS virtual_recognition text;
