# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CasaPupis is a minimalist wedding planning application built with React, TypeScript, and Supabase. It allows couples to manage guests, tasks, budget, and send RSVP invitations with a public confirmation system.

## Development Commands

```bash
# Start development server (runs on port 5173 or 5174 if occupied)
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Data Flow & State Management

1. **React Query (TanStack Query)** is the primary data fetching/caching layer
   - Configured in `src/App.tsx` with `refetchOnWindowFocus: false` and `retry: 1`
   - All data hooks are in `src/hooks/` (useGuests, useTasks, useBudget, useRSVP)
   - Query keys follow pattern: `['entity-name']` or `['entity-name', id]`

2. **Zustand** is used only for client-side state
   - `authStore`: User authentication state
   - `uiStore`: UI-related state (if exists)
   - NOT used for server data (that's React Query's job)

3. **Supabase Client** (`src/lib/supabase.ts`)
   - Single client instance shared across app
   - Uses environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Throws error if env vars are missing

### Form Validation Pattern

All forms use **React Hook Form + Zod** with this pattern:

```typescript
// In src/utils/validators.ts - define schema
export const entitySchema = z.object({
  // Use z.coerce.number() for numeric inputs (NOT z.number())
  // HTML number inputs return strings, z.coerce converts automatically
  cost: z.coerce.number().min(0),
  name: z.string().min(1, 'Error message'),
})

// In component - use zodResolver
const { register, handleSubmit, setValue } = useForm({
  resolver: zodResolver(entitySchema)
})

// For standard inputs
<Input {...register('name')} />

// For Shadcn Select components - use setValue, NOT register
<Select onValueChange={(value) => setValue('category_id', value)}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

**CRITICAL**:
- Always use `z.coerce.number()` for numeric form fields, never `z.number()`. HTML inputs with `type="number"` return string values.
- Shadcn `<Select>` components use `setValue()` from React Hook Form, not `{...register()}`

### Database Schema (Supabase)

Key tables and relationships:
- `events` (Ceremony, Party)
- `guests` (guest data)
- `guest_events` (many-to-many: guests ↔ events + RSVP confirmations)
- `tasks` (checklist)
- `budget_categories` (9 predefined categories)
- `budget_items` (belongs to category)

**Row Level Security (RLS)**:
- If tables have RLS enabled without policies, ALL requests will fail
- For development: disable RLS with `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`
- For production: create permissive policies or use `supabase-fix-rls.sql`

### Routing Structure

React Router v6 with nested routes in `src/App.tsx`:
- `/login` - Public login page
- `/rsvp/:token` - Public RSVP page (no auth required)
- Protected routes (wrapped in `<ProtectedRoute>`):
  - `/` - Dashboard
  - `/guests` - Guest management
  - `/budget` - Budget tracking
  - `/tasks` - Task checklist
  - `/invitations` - Invitation links

### Authentication

- Supabase Auth for production
- Development bypass exists in `ProtectedRoute.tsx` (check `import.meta.env.DEV`)
- Auth state managed by `authStore` (Zustand)
- Session persistence handled by Supabase client

## Common Patterns

### Custom Hooks Pattern
Located in `src/hooks/`, all follow React Query pattern:

```typescript
// Query hook
export function useEntityName() {
  return useQuery({
    queryKey: ['entity-name'],
    queryFn: async () => {
      const { data, error } = await supabase.from('table').select()
      if (error) throw error
      return data
    }
  })
}

// Mutation hook
export function useCreateEntity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newData) => { /* ... */ },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entity-name'] })
    }
  })
}
```

### Component Organization

```
src/components/
├── ui/              # Shadcn/ui primitives (Button, Dialog, etc.)
├── layout/          # Header, Sidebar, MainLayout
├── guests/          # Guest-specific components
├── tasks/           # Task-specific components
├── budget/          # Budget-specific components
└── shared/          # Reusable components (LoadingSpinner)
```

Pages import feature components and hooks, minimal logic in page components.

### Styling Approach

- **Tailwind CSS** for all styling
- **Shadcn/ui** components in `src/components/ui/`
- Design system:
  - Colors: Green nature palette (defined in tailwind.config)
  - Typography: Cormorant (headings), Inter (body)
  - Mobile-first responsive design
  - Generous spacing, minimalist aesthetic

## Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json` and `vite.config.ts`:
- `@/*` maps to `./src/*`
- Example: `import { supabase } from '@/lib/supabase'`
- All imports should use this alias instead of relative paths

## Environment Variables

Required in `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=http://localhost:5173  # Used for RSVP link generation
```

## Database Connection Issues

If you encounter `net::ERR_NAME_NOT_RESOLVED` or infinite request loops:

1. Check RLS status: run `supabase-check-rls.sql` in Supabase SQL Editor
2. Fix RLS: run `supabase-fix-rls.sql` (OPTION 1 to disable for dev)
3. Verify `.env.local` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Ensure Supabase project is active (not paused)

## Type Safety

- All types defined in `src/types/`
- Database types auto-generated in `src/types/database.types.ts`
- Feature-specific types in dedicated files (guest.ts, budget.ts, task.ts)
- Re-exported from `src/types/index.ts` for convenience

## Public RSVP System

The `/rsvp/:token` route is publicly accessible:
- Guests receive unique 16-char token (generated with nanoid)
- No authentication required
- Can confirm/decline for each event they're invited to
- Can add plus_ones and dietary_restrictions
- Updates `guest_events` table directly via token lookup
