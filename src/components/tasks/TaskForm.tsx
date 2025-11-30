import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '@/utils/validators'
import { Task } from '@/types'
import { useCreateTask, useUpdateTask } from '@/hooks/useTasks'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '@/utils/constants'
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

interface TaskFormProps {
  open: boolean
  onClose: () => void
  task?: Task
}

export function TaskForm({ open, onClose, task }: TaskFormProps) {
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task,
  })

  useEffect(() => {
    if (task) {
      reset(task)
    } else {
      reset({
        title: '',
        description: '',
        category: '',
        due_date: '',
        priority: 'medium',
        assigned_to: '',
      })
    }
  }, [task, reset])

  const onSubmit = async (data: any) => {
    try {
      if (task) {
        await updateTask.mutateAsync({ id: task.id, data })
      } else {
        await createTask.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task ? 'Editar Tarea' : 'Nueva Tarea'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Reservar venue"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Detalles adicionales..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                defaultValue={task?.category || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {TASK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select
                onValueChange={(value) => setValue('priority', value as 'low' | 'medium' | 'high')}
                defaultValue={task?.priority || 'medium'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due_date">Fecha límite</Label>
              <Input
                id="due_date"
                type="date"
                {...register('due_date')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assigned_to">Asignado a</Label>
              <Input
                id="assigned_to"
                {...register('assigned_to')}
                placeholder="Nombre"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createTask.isPending || updateTask.isPending}
            >
              {createTask.isPending || updateTask.isPending
                ? 'Guardando...'
                : task
                  ? 'Actualizar'
                  : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
