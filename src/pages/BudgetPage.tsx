import { useState } from 'react'
import { useBudgetItems, useDeleteBudgetItem, useBudgetCategories } from '@/hooks/useBudget'
import { BudgetItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { BudgetForm } from '@/components/budget/BudgetForm'
import { BudgetSummary } from '@/components/budget/BudgetSummary'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useUpdateBudgetItem } from '@/hooks/useBudget'
import { Plus, Pencil, Trash2, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/utils/formatters'

export function BudgetPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BudgetItem | undefined>()
  const { data: items = [], isLoading: itemsLoading } = useBudgetItems()
  const { data: categories = [], isLoading: categoriesLoading } = useBudgetCategories()
  const deleteItem = useDeleteBudgetItem()
  const updateItem = useUpdateBudgetItem()

  const handleEdit = (item: BudgetItem) => {
    setEditingItem(item)
    setFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este item?')) {
      await deleteItem.mutateAsync(id)
    }
  }

  const handleTogglePaid = async (item: BudgetItem) => {
    await updateItem.mutateAsync({
      id: item.id,
      data: {
        paid: !item.paid,
        paid_date: !item.paid ? new Date().toISOString().split('T')[0] : null,
      },
    })
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingItem(undefined)
  }

  if (itemsLoading || categoriesLoading) return <LoadingSpinner />

  const itemsByCategory = categories.map((category) => ({
    category,
    items: items.filter((item) => item.category_id === category.id),
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Presupuesto</h1>
          <p className="text-muted-foreground">Control de gastos</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Item
        </Button>
      </div>

      <BudgetSummary items={items} />

      {itemsByCategory.map(({ category, items: categoryItems }) => (
        categoryItems.length > 0 && (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <Badge variant="secondary">
                  {formatCurrency(categoryItems.reduce((sum, i) => sum + i.estimated_cost, 0))}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Checkbox
                          checked={item.paid}
                          onCheckedChange={() => handleTogglePaid(item)}
                          className="mt-1"
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{item.name}</h3>
                            {item.paid && (
                              <Badge variant="default" className="gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Pagado
                              </Badge>
                            )}
                          </div>

                          {item.vendor && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.vendor}
                            </p>
                          )}

                          {item.notes && (
                            <p className="text-sm text-muted-foreground mt-1 italic">
                              {item.notes}
                            </p>
                          )}

                          <div className="flex gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Estimado: </span>
                              <span className="font-medium">
                                {formatCurrency(item.estimated_cost)}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Real: </span>
                              <span className="font-medium">
                                {formatCurrency(item.actual_cost)}
                              </span>
                            </div>
                            {item.actual_cost !== item.estimated_cost && (
                              <div>
                                <span
                                  className={
                                    item.actual_cost > item.estimated_cost
                                      ? 'text-destructive'
                                      : 'text-green-600'
                                  }
                                >
                                  {item.actual_cost > item.estimated_cost ? '+' : ''}
                                  {formatCurrency(item.actual_cost - item.estimated_cost)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ))}

      {items.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <p>No hay items en el presupuesto aún</p>
            <Button
              variant="link"
              onClick={() => setFormOpen(true)}
              className="mt-2"
            >
              Crear el primero
            </Button>
          </CardContent>
        </Card>
      )}

      <BudgetForm
        open={formOpen}
        onClose={handleCloseForm}
        item={editingItem}
      />
    </div>
  )
}
