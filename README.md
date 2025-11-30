# CasaPupis - Planificador de Casamiento

Aplicación minimalista para planear tu casamiento con React, TypeScript y Supabase.

## Stack Tecnológico

- **Frontend**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Estado**: Zustand + TanStack Query
- **Routing**: React Router v6

## Configuración del Proyecto

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crear un proyecto en [supabase.com](https://supabase.com)
2. Ir a Project Settings > API
3. Copiar las credenciales:
   - Project URL
   - Anon/Public Key

### 3. Variables de Entorno

Crear archivo `.env.local` con:

```env
VITE_SUPABASE_URL=tu-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
VITE_APP_URL=http://localhost:5173
```

### 4. Crear Esquema de Base de Datos

Ejecutar el script SQL en Supabase SQL Editor:
Ver archivo `supabase-schema.sql`

### 5. Ejecutar Proyecto

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Funcionalidades

- ✅ Checklist de tareas pendientes
- ✅ Presupuesto con categorías
- ✅ Lista de invitados con filtros
- ✅ Sistema de invitaciones digitales con RSVP
- ✅ Dashboard con estadísticas

## Estructura del Proyecto

```
src/
├── components/     # Componentes React
├── hooks/          # Custom hooks
├── lib/            # Configuraciones (Supabase)
├── pages/          # Páginas de la app
├── stores/         # Zustand stores
├── styles/         # CSS global
├── types/          # TypeScript types
└── utils/          # Utilidades y constantes
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter
