-- Script para verificar el estado de RLS en todas las tablas
-- Ejecutar en Supabase SQL Editor

SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'guests',
    'events',
    'guest_events',
    'tasks',
    'budget_categories',
    'budget_items'
  )
ORDER BY tablename;

-- Verificar políticas existentes
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
