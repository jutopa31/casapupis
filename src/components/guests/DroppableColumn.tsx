import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Guest, CertaintyLevel } from '@/types'
import { GuestChip } from './GuestChip'

interface DroppableColumnProps {
  id: CertaintyLevel
  title: string
  color: string
  bgColor: string
  borderColor: string
  guests: Guest[]
  onGuestClick: (guest: Guest) => void
}

export function DroppableColumn({
  id,
  title,
  color,
  bgColor,
  borderColor,
  guests,
  onGuestClick,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <Card className={`${borderColor} border-2 ${isOver ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className={`${bgColor} pb-3`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            {title}
          </CardTitle>
          <span className="text-sm font-medium bg-white px-2 py-1 rounded">
            {guests.length}
          </span>
        </div>
      </CardHeader>
      <CardContent ref={setNodeRef} className="p-3 space-y-2 min-h-[400px]">
        <SortableContext
          items={guests.map((g) => g.id)}
          strategy={verticalListSortingStrategy}
        >
          {guests.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Arrastra invitados aquí
            </div>
          ) : (
            guests.map((guest) => (
              <GuestChip
                key={guest.id}
                guest={guest}
                onClick={() => onGuestClick(guest)}
              />
            ))
          )}
        </SortableContext>
      </CardContent>
    </Card>
  )
}
