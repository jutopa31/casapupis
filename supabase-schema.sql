-- CasaPupis - Schema de Base de Datos
-- Ejecutar en Supabase SQL Editor

-- 1. Tabla de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de invitados
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  group_name TEXT,
  notes TEXT,
  category TEXT,
  rsvp_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de relación invitados-eventos
CREATE TABLE guest_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  invited BOOLEAN DEFAULT TRUE,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  plus_ones INTEGER DEFAULT 0,
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(guest_id, event_id)
);

-- 4. Tabla de tareas
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE,
  priority TEXT DEFAULT 'medium',
  assigned_to TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de categorías de presupuesto
CREATE TABLE budget_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  color TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabla de items de presupuesto
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) DEFAULT 0,
  actual_cost DECIMAL(10, 2) DEFAULT 0,
  paid BOOLEAN DEFAULT FALSE,
  paid_date DATE,
  vendor TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_guests_category ON guests(category);
CREATE INDEX idx_guests_rsvp_token ON guests(rsvp_token);
CREATE INDEX idx_guest_events_guest_id ON guest_events(guest_id);
CREATE INDEX idx_guest_events_event_id ON guest_events(event_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_budget_items_category ON budget_items(category_id);

-- Datos iniciales: Eventos
INSERT INTO events (name) VALUES
  ('Ceremonia'),
  ('Fiesta');

-- Datos iniciales: Categorías de presupuesto
INSERT INTO budget_categories (name, color, order_index) VALUES
  ('Venue', '#8BA888', 1),
  ('Catering', '#9CAF88', 2),
  ('Decoración', '#A8C686', 3),
  ('Fotografía', '#B4D68C', 4),
  ('Música', '#7FA57B', 5),
  ('Vestimenta', '#6B8A6B', 6),
  ('Invitaciones', '#9CB89A', 7),
  ('Transporte', '#8AA888', 8),
  ('Otros', '#A0B49D', 9);

-- Habilitar Row Level Security (RLS) - Opcional
-- Descomentar si quieres habilitar seguridad a nivel de filas

-- ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

-- Política: Solo usuarios autenticados pueden acceder
-- CREATE POLICY "Authenticated users can do everything" ON guests
--   FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can do everything" ON tasks
--   FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can do everything" ON budget_categories
--   FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can do everything" ON budget_items
--   FOR ALL USING (auth.role() = 'authenticated');

-- Política especial para RSVP público
-- guest_events es pública para permitir confirmaciones sin auth
-- CREATE POLICY "Anyone can update guest_events for RSVP" ON guest_events
--   FOR UPDATE USING (true);

-- CREATE POLICY "Anyone can read guest_events for RSVP" ON guest_events
--   FOR SELECT USING (true);
