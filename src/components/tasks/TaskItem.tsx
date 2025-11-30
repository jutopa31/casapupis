import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { useToggleTask } from '@/hooks/useTasks'
import { Pencil, Trash2, Calendar, User } from 'lucide-react'
import { formatDate } from '@/utils/formatters'
import { cn } from '@/lib/utils'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const priorityColors = {
  low: 'bg-muted',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
}

export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const toggleTask = useToggleTask()

  const handleToggle = async () => {
    await toggleTask.mutateAsync({ id: task.id, completed: !task.completed })
  }

  return (
    <div className={cn(
      "p-4 border-b last:border-b-0 hover:bg-accent/50 transition-colors",
      task.completed && "opacity-60"
    )}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={cn(
                "font-medium",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {task.category && (
                  <Badge variant="secondary">
                    {task.category}
                  </Badge>
                )}

                {task.priority && (
                  <Badge
                    className={priorityColors[task.priority]}
                    variant="outline"
                  >
                    {task.priority === 'low' && 'Baja'}
                    {task.priority === 'medium' && 'Media'}
                    {task.priority === 'high' && 'Alta'}
                  </Badge>
                )}

                {task.due_date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(task.due_date, 'dd/MM/yyyy')}
                  </div>
                )}

                {task.assigned_to && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {task.assigned_to}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
