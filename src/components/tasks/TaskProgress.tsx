import { Task } from '@/types'
import { Progress } from '@/components/ui/progress'

interface TaskProgressProps {
  tasks: Task[]
}

export function TaskProgress({ tasks }: TaskProgressProps) {
  const completed = tasks.filter((t) => t.completed).length
  const total = tasks.length
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progreso</span>
        <span className="font-medium">
          {completed} / {total} completadas
        </span>
      </div>
      <Progress value={percentage} />
      <p className="text-xs text-muted-foreground text-right">
        {percentage.toFixed(0)}% completo
      </p>
    </div>
  )
}
