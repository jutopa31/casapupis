import { z } from 'zod'

export const guestSchema = z.object({
  first_name: z.string().min(1, 'El nombre es requerido'),
  last_name: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  group_name: z.string().optional(),
  notes: z.string().optional(),
  category: z.string().optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  category: z.string().optional(),
  due_date: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  assigned_to: z.string().optional(),
})

export const budgetItemSchema = z.object({
  category_id: z.string().min(1, 'La categoría es requerida'),
  name: z.string().min(1, 'El nombre es requerido'),
  estimated_cost: z.number().min(0, 'El costo debe ser mayor a 0'),
  actual_cost: z.number().min(0, 'El costo debe ser mayor a 0'),
  vendor: z.string().optional(),
  notes: z.string().optional(),
})

export const rsvpSchema = z.object({
  confirmed: z.boolean(),
  plus_ones: z.number().min(0).max(10),
  dietary_restrictions: z.string().optional(),
})
