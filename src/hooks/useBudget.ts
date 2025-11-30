import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { BudgetItem, BudgetCategory } from '@/types'

export function useBudgetCategories() {
  return useQuery({
    queryKey: ['budget-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_categories')
        .select('*')
        .order('order_index')

      if (error) throw error
      return data as BudgetCategory[]
    },
  })
}

export function useBudgetItems() {
  return useQuery({
    queryKey: ['budget-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select(`
          *,
          category:budget_categories(*)
        `)
        .order('created_at')

      if (error) throw error
      return data as BudgetItem[]
    },
  })
}

export function useCreateBudgetItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newItem: Partial<BudgetItem>) => {
      const { data, error } = await supabase
        .from('budget_items')
        .insert(newItem)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] })
    },
  })
}

export function useUpdateBudgetItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BudgetItem> }) => {
      const { error } = await supabase
        .from('budget_items')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] })
    },
  })
}

export function useDeleteBudgetItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('budget_items').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items'] })
    },
  })
}
