# CasaPupis - Planificador de Casamiento 💍

Aplicación minimalista y completa para planear tu casamiento con React, TypeScript y Supabase.

![Estado](https://img.shields.io/badge/Estado-Producción-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## ✨ Funcionalidades Completas

### 🎯 Dashboard
- Vista general con estadísticas en tiempo real
- Total de invitados y confirmaciones por evento
- Progreso del presupuesto (estimado vs real)
- Porcentaje de tareas completadas

### 👥 Gestión de Invitados
- CRUD completo de invitados
- Asignación a eventos (Ceremonia y/o Fiesta)
- Categorización (Familia, Amigos, Trabajo)
- Agrupación por familias
- Filtros y estadísticas

### ✅ Checklist de Tareas
- Crear y gestionar tareas pendientes
- Categorías personalizadas
- Prioridades (Alta, Media, Baja)
- Fechas de vencimiento
- Barra de progreso visual
- Separación de pendientes/completadas

### 💰 Presupuesto
- Control de gastos por categorías
- Costo estimado vs costo real
- Marcador de items pagados
- Diferencias visualizadas con colores
- Resumen con totales y restante
- 9 categorías predefinidas

### 📧 Sistema de Invitaciones
- Generación automática de enlaces únicos por invitado
- Página pública de RSVP (sin login)
- Confirmación por evento
- Campo para acompañantes (plus ones)
- Restricciones alimentarias
- Estadísticas de confirmaciones
- Copiar enlaces al clipboard

## 🎨 Diseño

- **Paleta**: Verde naturaleza minimalista
- **Tipografía**: Cormorant (headings) + Inter (body)
- **Responsive**: Mobile-first con Tailwind CSS
- **Componentes**: Shadcn/ui

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + Shadcn/ui + Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth)
- **Estado**: Zustand + TanStack Query
- **Routing**: React Router v6
- **Formularios**: React Hook Form + Zod
- **Utilidades**: date-fns, nanoid

## 📋 Configuración del Proyecto

### 1. Clonar e Instalar

```bash
git clone https://github.com/jutopa31/casapupis.git
cd casapupis
npm install
```

### 2. Configurar Supabase

**IMPORTANTE**: Ya se ha ejecutado el schema en tu proyecto de Supabase.

**URL**: `https://hkuvpgqirpiszxdtyrbm.supabase.co`

Si necesitas recrear la base de datos:
1. Ir a SQL Editor en Supabase
2. Ejecutar el contenido de `supabase-schema.sql`

### 3. Variables de Entorno

El archivo `.env.local` ya está configurado con:

```env
VITE_SUPABASE_URL=https://hkuvpgqirpiszxdtyrbm.supabase.co
VITE_SUPABASE_ANON_KEY=[tu-key]
VITE_APP_URL=http://localhost:5173
```

### 4. Crear Usuario Admin

1. Ir a [Supabase Dashboard](https://app.supabase.com) → Authentication → Users
2. Click "Add user" → "Create new user"
3. Email y password para acceder a la app

### 5. Ejecutar Proyecto

```bash
npm run dev
```

Abre [http://localhost:5174](http://localhost:5174) en tu navegador.

## 📱 Uso de la Aplicación

### Para Administradores (La Pareja)

1. **Login**: Ingresar con el usuario creado en Supabase
2. **Dashboard**: Ver resumen general
3. **Invitados**:
   - Crear invitados con nombre, email, teléfono
   - Asignar a Ceremonia y/o Fiesta
   - Ver confirmaciones
4. **Tareas**:
   - Agregar tareas con categoría y prioridad
   - Marcar como completadas
5. **Presupuesto**:
   - Agregar items por categoría
   - Ingresar costos estimados y reales
   - Marcar como pagado
6. **Invitaciones**:
   - Ver enlaces únicos de cada invitado
   - Copiar y enviar por WhatsApp/Email
   - Ver quién confirmó

### Para Invitados

1. Recibir enlace único (ej: `https://tu-app.com/rsvp/ABC123`)
2. Abrir enlace (sin necesidad de login)
3. Ver eventos a los que está invitado
4. Confirmar asistencia por evento
5. Indicar acompañantes
6. Agregar restricciones alimentarias
7. Enviar confirmación

## 🌐 Deploy a Vercel

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno:
   ```
   VITE_SUPABASE_URL=https://hkuvpgqirpiszxdtyrbm.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   VITE_APP_URL=https://tu-app.vercel.app
   ```
3. Deploy automático

Ver guía completa en `DEPLOY.md`

## 📁 Estructura del Proyecto

```
casapupis/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn components
│   │   ├── layout/          # Header, Sidebar, MainLayout
│   │   ├── guests/          # Componentes de invitados
│   │   ├── tasks/           # Componentes de tareas
│   │   ├── budget/          # Componentes de presupuesto
│   │   ├── invitations/     # (futuro)
│   │   └── shared/          # LoadingSpinner, etc
│   ├── hooks/               # useGuests, useTasks, useBudget, useRSVP
│   ├── pages/               # Dashboard, GuestsPage, etc
│   ├── stores/              # authStore, uiStore (Zustand)
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # formatters, validators, constants
│   └── lib/                 # supabase client
├── supabase-schema.sql      # Schema de base de datos
└── DEPLOY.md                # Guía de deployment
```

## 🔐 Seguridad

- Autenticación con Supabase Auth
- Rutas protegidas con ProtectedRoute
- Validación de formularios con Zod
- Tokens únicos con nanoid (16 caracteres)
- RSVP público sin exponer datos sensibles

## 📊 Base de Datos

### Tablas Principales

- **events**: Ceremonia y Fiesta
- **guests**: Datos de invitados
- **guest_events**: Relación invitados-eventos + confirmaciones
- **tasks**: Checklist de tareas
- **budget_categories**: Categorías de presupuesto
- **budget_items**: Items del presupuesto

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # ESLint
```

## 🔗 Links Importantes

- **GitHub**: https://github.com/jutopa31/casapupis
- **Supabase**: https://app.supabase.com
- **Deploy**: Ver DEPLOY.md

## ✅ Estado del Proyecto

- [x] Autenticación
- [x] Layout y navegación
- [x] Módulo de Invitados
- [x] Módulo de Tareas
- [x] Módulo de Presupuesto
- [x] Sistema de Invitaciones
- [x] RSVP Público
- [x] Dashboard con datos reales
- [x] Deploy a Vercel preparado

## 📝 Notas

- La aplicación usa **solo tablas** en presupuesto (sin gráficos)
- **Sin texto genérico**: Solo muestra datos ingresados por el usuario
- Template de invitaciones es **editable**
- Diseño **minimalista** con espaciado generoso
- **Mobile-first** y completamente responsive

---

Desarrollado con ❤️ para tu casamiento
