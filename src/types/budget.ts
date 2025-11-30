export interface BudgetCategory {
  id: string
  name: string
  color?: string | null
  order_index?: number | null
  created_at: string
}

export interface BudgetItem {
  id: string
  category_id: string
  name: string
  estimated_cost: number
  actual_cost: number
  paid: boolean
  paid_date?: string | null
  vendor?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
  category?: BudgetCategory
}
