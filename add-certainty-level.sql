-- Script para agregar campo de nivel de certeza a invitados
-- Ejecutar en Supabase SQL Editor

-- Agregar columna certainty_level
ALTER TABLE guests
ADD COLUMN certainty_level TEXT DEFAULT 'probable';

-- Crear un check constraint para validar valores
ALTER TABLE guests
ADD CONSTRAINT check_certainty_level
CHECK (certainty_level IN ('confirmed', 'probable', 'uncertain'));

-- Actualizar invitados existentes a 'probable' por defecto
UPDATE guests
SET certainty_level = 'probable'
WHERE certainty_level IS NULL;

-- Verificar que se agregó correctamente
SELECT
  first_name,
  certainty_level,
  COUNT(*) OVER (PARTITION BY certainty_level) as count_by_level
FROM guests
LIMIT 10;
