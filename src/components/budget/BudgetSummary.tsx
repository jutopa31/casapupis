import { BudgetItem } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/formatters'
import { DollarSign, TrendingUp, CheckCircle } from 'lucide-react'

interface BudgetSummaryProps {
  items: BudgetItem[]
}

export function BudgetSummary({ items }: BudgetSummaryProps) {
  const totalEstimated = items.reduce((sum, item) => sum + item.estimated_cost, 0)
  const totalActual = items.reduce((sum, item) => sum + item.actual_cost, 0)
  const totalPaid = items.filter((item) => item.paid).reduce((sum, item) => sum + item.actual_cost, 0)

  const remaining = totalEstimated - totalActual
  const percentageUsed = totalEstimated > 0 ? (totalActual / totalEstimated) * 100 : 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalEstimated)}</div>
          <p className="text-xs text-muted-foreground">estimado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastado</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalActual)}</div>
          <p className="text-xs text-muted-foreground">
            {percentageUsed.toFixed(1)}% del presupuesto
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pagado</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
          <p className="text-xs text-muted-foreground">
            {items.filter((i) => i.paid).length} items
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {remaining >= 0 ? 'Restante' : 'Excedido'}
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${remaining < 0 ? 'text-destructive' : ''}`}>
            {formatCurrency(Math.abs(remaining))}
          </div>
          <p className="text-xs text-muted-foreground">
            {remaining >= 0 ? 'disponible' : 'sobre presupuesto'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
