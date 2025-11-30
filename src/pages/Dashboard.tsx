import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, CheckSquare, Calendar } from 'lucide-react'
import { useGuests } from '@/hooks/useGuests'
import { useBudgetItems } from '@/hooks/useBudget'
import { useTasks } from '@/hooks/useTasks'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { formatCurrency } from '@/utils/formatters'

export function Dashboard() {
  const { data: guests = [], isLoading: guestsLoading } = useGuests()
  const { data: budgetItems = [], isLoading: budgetLoading } = useBudgetItems()
  const { data: tasks = [], isLoading: tasksLoading } = useTasks()

  if (guestsLoading || budgetLoading || tasksLoading) {
    return <LoadingSpinner />
  }

  const totalGuests = guests.length

  // Invitados asignados a cada evento
  const invitedCeremonia = guests.filter((g) =>
    g.guest_events?.some((ge) => ge.event?.name === 'Ceremonia')
  ).length
  const invitedFiesta = guests.filter((g) =>
    g.guest_events?.some((ge) => ge.event?.name === 'Fiesta')
  ).length

  // Invitados confirmados
  const confirmedCeremonia = guests.filter((g) =>
    g.guest_events?.some((ge) => ge.event?.name === 'Ceremonia' && ge.confirmed)
  ).length
  const confirmedFiesta = guests.filter((g) =>
    g.guest_events?.some((ge) => ge.event?.name === 'Fiesta' && ge.confirmed)
  ).length

  const totalEstimated = budgetItems.reduce((sum, i) => sum + i.estimated_cost, 0)
  const totalActual = budgetItems.reduce((sum, i) => sum + i.actual_cost, 0)

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const tasksPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vista general de tu casamiento</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invitados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground">
              Ceremonia: {invitedCeremonia} ({confirmedCeremonia} ✓) | Fiesta: {invitedFiesta} ({confirmedFiesta} ✓)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Presupuesto
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalActual)}</div>
            <p className="text-xs text-muted-foreground">
              de {formatCurrency(totalEstimated)} estimado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tareas
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {tasksPercentage.toFixed(0)}% completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Ceremonia y Fiesta
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
