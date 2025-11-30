import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { budgetItemSchema } from '@/utils/validators'
import { BudgetItem } from '@/types'
import { useCreateBudgetItem, useUpdateBudgetItem, useBudgetCategories } from '@/hooks/useBudget'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface BudgetFormProps {
  open: boolean
  onClose: () => void
  item?: BudgetItem
}

export function BudgetForm({ open, onClose, item }: BudgetFormProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useBudgetCategories()
  const createItem = useCreateBudgetItem()
  const updateItem = useUpdateBudgetItem()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetItemSchema),
    defaultValues: item,
  })

  useEffect(() => {
    if (item) {
      reset(item)
    } else {
      reset({
        category_id: '',
        name: '',
        estimated_cost: 0,
        actual_cost: 0,
        vendor: '',
        notes: '',
      })
    }
  }, [item, reset])

  const onSubmit = async (data: any) => {
    try {
      if (item) {
        await updateItem.mutateAsync({ id: item.id, data })
      } else {
        await createItem.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error saving budget item:', error)
    }
  }

  if (categoriesLoading) return <LoadingSpinner />

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? 'Editar Item' : 'Nuevo Item'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category_id">Categoría *</Label>
            <Select
              onValueChange={(value) => setValue('category_id', value)}
              defaultValue={item?.category_id || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-sm text-destructive">{errors.category_id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Ej: Salón principal"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimated_cost">Costo Estimado *</Label>
              <Input
                id="estimated_cost"
                type="number"
                step="0.01"
                {...register('estimated_cost')}
                placeholder="0.00"
              />
              {errors.estimated_cost && (
                <p className="text-sm text-destructive">{errors.estimated_cost.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="actual_cost">Costo Real</Label>
              <Input
                id="actual_cost"
                type="number"
                step="0.01"
                {...register('actual_cost')}
                placeholder="0.00"
              />
              {errors.actual_cost && (
                <p className="text-sm text-destructive">{errors.actual_cost.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor">Proveedor</Label>
            <Input
              id="vendor"
              {...register('vendor')}
              placeholder="Nombre del proveedor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Notas adicionales..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createItem.isPending || updateItem.isPending}
            >
              {createItem.isPending || updateItem.isPending
                ? 'Guardando...'
                : item
                  ? 'Actualizar'
                  : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
