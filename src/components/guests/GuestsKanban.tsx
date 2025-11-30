import { useState } from 'react'
import { Guest, CertaintyLevel } from '@/types'
import { useUpdateGuest } from '@/hooks/useGuests'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core'
import { GuestChip } from './GuestChip'
import { DroppableColumn } from './DroppableColumn'

interface GuestsKanbanProps {
  guests: Guest[]
  onGuestClick: (guest: Guest) => void
}

const COLUMNS = [
  {
    id: 'confirmed' as CertaintyLevel,
    title: 'Confirmado',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'probable' as CertaintyLevel,
    title: 'Probable',
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    id: 'uncertain' as CertaintyLevel,
    title: 'Incierto',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
]

export function GuestsKanban({ guests, onGuestClick }: GuestsKanbanProps) {
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null)
  const updateGuest = useUpdateGuest()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const guest = guests.find((g) => g.id === event.active.id)
    setActiveGuest(guest || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveGuest(null)
      return
    }

    const guestId = active.id as string
    const guest = guests.find((g) => g.id === guestId)

    if (!guest) {
      setActiveGuest(null)
      return
    }

    // El over.id puede ser el ID de la columna o el ID de otro guest
    let newCertaintyLevel: CertaintyLevel | null = null

    // Verificar si es una columna
    if (over.id === 'confirmed' || over.id === 'probable' || over.id === 'uncertain') {
      newCertaintyLevel = over.id as CertaintyLevel
    } else {
      // Si es un guest, encontrar su columna
      const targetGuest = guests.find((g) => g.id === over.id)
      if (targetGuest) {
        newCertaintyLevel = targetGuest.certainty_level || 'probable'
      }
    }

    if (newCertaintyLevel && guest.certainty_level !== newCertaintyLevel) {
      try {
        await updateGuest.mutateAsync({
          id: guestId,
          data: { certainty_level: newCertaintyLevel },
        })
      } catch (error) {
        console.error('Error updating guest certainty level:', error)
      }
    }

    setActiveGuest(null)
  }

  const getGuestsByColumn = (columnId: CertaintyLevel) => {
    return guests.filter(
      (g) => (g.certainty_level || 'probable') === columnId
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((column) => {
          const columnGuests = getGuestsByColumn(column.id)

          return (
            <DroppableColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              bgColor={column.bgColor}
              borderColor={column.borderColor}
              guests={columnGuests}
              onGuestClick={onGuestClick}
            />
          )
        })}
      </div>

      <DragOverlay>
        {activeGuest ? (
          <div className="rotate-3">
            <GuestChip guest={activeGuest} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
