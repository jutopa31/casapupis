export interface Task {
  id: string
  title: string
  description?: string | null
  category?: string | null
  completed: boolean
  due_date?: string | null
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string | null
  order_index?: number | null
  created_at: string
  updated_at: string
}
