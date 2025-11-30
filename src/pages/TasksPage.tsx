import { useState } from 'react'
import { useTasks, useDeleteTask } from '@/hooks/useTasks'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskItem } from '@/components/tasks/TaskItem'
import { TaskProgress } from '@/components/tasks/TaskProgress'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Plus } from 'lucide-react'

export function TasksPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const { data: tasks = [], isLoading } = useTasks()
  const deleteTask = useDeleteTask()

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar esta tarea?')) {
      await deleteTask.mutateAsync(id)
    }
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingTask(undefined)
  }

  if (isLoading) return <LoadingSpinner />

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tareas</h1>
          <p className="text-muted-foreground">Checklist de pendientes</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <TaskProgress tasks={tasks} />
        </CardContent>
      </Card>

      {/* Tareas pendientes */}
      {pendingTasks.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-muted/50">
              <h2 className="font-semibold">Pendientes ({pendingTasks.length})</h2>
            </div>
            <div>
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tareas completadas */}
      {completedTasks.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-muted/50">
              <h2 className="font-semibold">Completadas ({completedTasks.length})</h2>
            </div>
            <div>
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <p>No hay tareas aún</p>
            <Button
              variant="link"
              onClick={() => setFormOpen(true)}
              className="mt-2"
            >
              Crear la primera
            </Button>
          </CardContent>
        </Card>
      )}

      <TaskForm
        open={formOpen}
        onClose={handleCloseForm}
        task={editingTask}
      />
    </div>
  )
}
