import { useState } from 'react'
import { useGuests } from '@/hooks/useGuests'
import { Guest } from '@/types'
import { Button } from '@/components/ui/button'
import { GuestForm } from '@/components/guests/GuestForm'
import { GuestStats } from '@/components/guests/GuestStats'
import { GuestsKanban } from '@/components/guests/GuestsKanban'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Plus } from 'lucide-react'

export function GuestsPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>()
  const { data: guests = [], isLoading } = useGuests()

  const handleGuestClick = (guest: Guest) => {
    setEditingGuest(guest)
    setFormOpen(true)
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
          <p className="text-muted-foreground">
            Arrastra los invitados entre columnas para cambiar su nivel de certeza
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Invitado
        </Button>
      </div>

      <GuestStats guests={guests} />

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
        <GuestsKanban guests={guests} onGuestClick={handleGuestClick} />
      )}

      <GuestForm
        open={formOpen}
        onClose={handleCloseForm}
        guest={editingGuest}
      />
    </div>
  )
}
