import { useState } from 'react'
import { useGuests, useDeleteGuest } from '@/hooks/useGuests'
import { Guest } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GuestForm } from '@/components/guests/GuestForm'
import { GuestStats } from '@/components/guests/GuestStats'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Plus, Pencil, Trash2, Mail, Phone } from 'lucide-react'

export function GuestsPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>()
  const { data: guests = [], isLoading } = useGuests()
  const deleteGuest = useDeleteGuest()

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest)
    setFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este invitado?')) {
      await deleteGuest.mutateAsync(id)
    }
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingGuest(undefined)
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Invitados</h1>
          <p className="text-muted-foreground">Gestiona tu lista de invitados</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Invitado
        </Button>
      </div>

      <GuestStats guests={guests} />

      <Card>
        <CardContent className="p-0">
          {guests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No hay invitados aún</p>
              <Button
                variant="link"
                onClick={() => setFormOpen(true)}
                className="mt-2"
              >
                Crear el primero
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {guest.first_name} {guest.last_name}
                        </h3>
                        {guest.category && (
                          <Badge variant="secondary">{guest.category}</Badge>
                        )}
                        {guest.group_name && (
                          <span className="text-sm text-muted-foreground">
                            ({guest.group_name})
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {guest.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {guest.email}
                          </div>
                        )}
                        {guest.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {guest.phone}
                          </div>
                        )}
                      </div>

                      {guest.guest_events && guest.guest_events.length > 0 && (
                        <div className="mt-2 flex gap-2">
                          {guest.guest_events.map((ge) => (
                            <Badge
                              key={ge.id}
                              variant={ge.confirmed ? 'default' : 'outline'}
                            >
                              {ge.event?.name}{' '}
                              {ge.confirmed ? '✓' : ''}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {guest.notes && (
                        <p className="mt-2 text-sm text-muted-foreground italic">
                          {guest.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(guest)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(guest.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <GuestForm
        open={formOpen}
        onClose={handleCloseForm}
        guest={editingGuest}
      />
    </div>
  )
}
