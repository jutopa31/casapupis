-- Script de Importación de Invitados desde CSV
-- Ejecutar en Supabase SQL Editor

-- PASO 1: Obtener el ID del evento "Fiesta"
-- (Guardarlo para usar en PASO 3)
SELECT id, name FROM events WHERE name = 'Fiesta';

-- PASO 2: Insertar invitados con tokens únicos
-- IMPORTANTE: Los tokens se generan automáticamente con gen_random_uuid()
-- Después los convertiremos a formato corto

INSERT INTO guests (first_name, last_name, rsvp_token) VALUES
  ('MAMA GABI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('PAPA ARTURO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('PAULA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('TOMAS', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('FACUNDO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ABUELA SUSANA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ABUELA BEATRIZ', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ABUELA MERCEDES', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('TÍA VERO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('TÍO PABLO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('PRIMO MATEO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('TÍA SILVANA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('TOTI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NICO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MARTI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('CAMI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MARIDO DE CAMI MARTIN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ALE', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NOVIA DE ALE SOLE', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('PAPA ALEJANDRO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MAMÁ LAURA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('HERMANA AILIN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('HERMANA MAGUI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('INDI + NEHUÉN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('HERMANO JONI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('BREN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ALE', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MARTIN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('SANTI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('JOACO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('PABLO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('SEBA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('JACQUI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('CARO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MANU', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('JONI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('MAGA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('GABI DE PAPA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NEGRO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('URI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('JUAN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('BRIAN DE JACQUI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NOVIA DE SEBA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NOVIA DE SANTI', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('JULIO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('EZEQUIEL', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('LUCIA', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NOVIO DE CARO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('NOVIO DE BREN', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('LAU', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('DANTE', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('ELOY', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('Martina prima', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('IVO', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('Mariela', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('marido', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('Juan', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16)),
  ('lucho', '', substring(md5(random()::text || clock_timestamp()::text) from 1 for 16));

-- PASO 3: Asignar todos los invitados al evento "Fiesta"
-- IMPORTANTE: Reemplazar 'EVENTO_FIESTA_ID' con el ID obtenido en PASO 1

INSERT INTO guest_events (guest_id, event_id, invited, confirmed)
SELECT
  g.id,
  'EVENTO_FIESTA_ID'::uuid,  -- ⚠️ REEMPLAZAR con el ID real del evento Fiesta
  true,
  false
FROM guests g
WHERE g.first_name IN (
  'MAMA GABI', 'PAPA ARTURO', 'PAULA', 'TOMAS', 'FACUNDO',
  'ABUELA SUSANA', 'ABUELA BEATRIZ', 'ABUELA MERCEDES', 'TÍA VERO', 'TÍO PABLO',
  'PRIMO MATEO', 'TÍA SILVANA', 'TOTI', 'NICO', 'MARTI',
  'CAMI', 'MARIDO DE CAMI MARTIN', 'ALE', 'NOVIA DE ALE SOLE', 'PAPA ALEJANDRO',
  'MAMÁ LAURA', 'HERMANA AILIN', 'HERMANA MAGUI', 'INDI + NEHUÉN', 'HERMANO JONI',
  'BREN', 'MARTIN', 'SANTI', 'JOACO', 'PABLO',
  'SEBA', 'JACQUI', 'CARO', 'MANU', 'JONI',
  'MAGA', 'GABI DE PAPA', 'NEGRO', 'URI', 'JUAN',
  'BRIAN DE JACQUI', 'NOVIA DE SEBA', 'NOVIA DE SANTI', 'JULIO', 'EZEQUIEL',
  'LUCIA', 'NOVIO DE CARO', 'NOVIO DE BREN', 'LAU', 'DANTE',
  'ELOY', 'Martina prima', 'IVO', 'Mariela', 'marido',
  'lucho'
);

-- PASO 4: Verificar que se importaron correctamente
SELECT
  COUNT(*) as total_invitados,
  COUNT(DISTINCT rsvp_token) as tokens_unicos
FROM guests;

-- PASO 5: Ver los primeros invitados con sus eventos asignados
SELECT
  g.first_name,
  g.rsvp_token,
  e.name as evento
FROM guests g
LEFT JOIN guest_events ge ON g.id = ge.guest_id
LEFT JOIN events e ON ge.event_id = e.id
LIMIT 10;
