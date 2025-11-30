import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { guestSchema } from '@/utils/validators'
import { Guest } from '@/types'
import { useCreateGuest, useUpdateGuest, useEvents } from '@/hooks/useGuests'
import { GUEST_CATEGORIES } from '@/utils/constants'
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
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface GuestFormProps {
  open: boolean
  onClose: () => void
  guest?: Guest
}

export function GuestForm({ open, onClose, guest }: GuestFormProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const { data: events = [], isLoading: eventsLoading } = useEvents()
  const createGuest = useCreateGuest()
  const updateGuest = useUpdateGuest()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestSchema),
    defaultValues: guest,
  })

  useEffect(() => {
    if (guest) {
      reset(guest)
      const eventIds = guest.guest_events?.map((ge) => ge.event_id) || []
      setSelectedEvents(eventIds)
    } else {
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        group_name: '',
        notes: '',
        category: '',
      })
      setSelectedEvents([])
    }
  }, [guest, reset])

  const onSubmit = async (data: any) => {
    try {
      if (guest) {
        await updateGuest.mutateAsync({
          id: guest.id,
          data,
          eventIds: selectedEvents,
        })
      } else {
        await createGuest.mutateAsync({
          ...data,
          eventIds: selectedEvents,
        })
      }
      onClose()
    } catch (error) {
      console.error('Error saving guest:', error)
    }
  }

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    )
  }

  if (eventsLoading) return <LoadingSpinner />

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {guest ? 'Editar Invitado' : 'Nuevo Invitado'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Nombre *</Label>
              <Input
                id="first_name"
                {...register('first_name')}
                placeholder="Juan"
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Apellido *</Label>
              <Input
                id="last_name"
                {...register('last_name')}
                placeholder="Pérez"
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="juan@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+54 9 11 1234-5678"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                defaultValue={guest?.category || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {GUEST_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="group_name">Grupo/Familia</Label>
              <Input
                id="group_name"
                {...register('group_name')}
                placeholder="Familia Pérez"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Eventos Invitado</Label>
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={event.id}
                    checked={selectedEvents.includes(event.id)}
                    onCheckedChange={() => toggleEvent(event.id)}
                  />
                  <Label
                    htmlFor={event.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {event.name}
                  </Label>
                </div>
              ))}
            </div>
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
              disabled={createGuest.isPending || updateGuest.isPending}
            >
              {createGuest.isPending || updateGuest.isPending
                ? 'Guardando...'
                : guest
                  ? 'Actualizar'
                  : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
