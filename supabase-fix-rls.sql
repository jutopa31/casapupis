-- Script para verificar y arreglar RLS en CasaPupis
-- Ejecutar en Supabase SQL Editor

-- OPCIÓN 1: Desactivar RLS completamente (recomendado para desarrollo)
-- Esto permitirá acceso completo con la clave anon

ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE guest_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE budget_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items DISABLE ROW LEVEL SECURITY;

-- VERIFICAR: Después de ejecutar lo anterior, prueba la app
-- Si funciona, puedes dejar RLS desactivado para desarrollo
-- Para producción, usa la OPCIÓN 2 más abajo

-- ================================================================
-- OPCIÓN 2: Habilitar RLS con políticas permisivas
-- ================================================================
-- Solo ejecuta esto si quieres habilitar RLS con políticas
-- (Descomentar las líneas siguientes si quieres usar esta opción)

/*
-- Habilitar RLS
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas anteriores si existen
DROP POLICY IF EXISTS "Enable all for anon" ON guests;
DROP POLICY IF EXISTS "Enable all for anon" ON events;
DROP POLICY IF EXISTS "Enable all for anon" ON guest_events;
DROP POLICY IF EXISTS "Enable all for anon" ON tasks;
DROP POLICY IF EXISTS "Enable all for anon" ON budget_categories;
DROP POLICY IF EXISTS "Enable all for anon" ON budget_items;

-- Crear políticas que permitan acceso completo con clave anon
-- (para desarrollo - ajustar para producción)

CREATE POLICY "Enable all for anon" ON guests
  FOR ALL USING (true);

CREATE POLICY "Enable all for anon" ON events
  FOR ALL USING (true);

CREATE POLICY "Enable all for anon" ON guest_events
  FOR ALL USING (true);

CREATE POLICY "Enable all for anon" ON tasks
  FOR ALL USING (true);

CREATE POLICY "Enable all for anon" ON budget_categories
  FOR ALL USING (true);

CREATE POLICY "Enable all for anon" ON budget_items
  FOR ALL USING (true);
*/
