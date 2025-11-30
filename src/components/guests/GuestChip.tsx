import { Guest } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Users } from 'lucide-react'

interface GuestChipProps {
  guest: Guest
  onClick: () => void
}

export function GuestChip({ guest, onClick }: GuestChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: guest.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const hasEvents = guest.guest_events && guest.guest_events.length > 0
  const confirmedEvents = guest.guest_events?.filter((ge) => ge.confirmed) || []

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white"
        onClick={onClick}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm leading-tight">
              {guest.first_name} {guest.last_name}
            </h4>
            {guest.category && (
              <Badge variant="secondary" className="text-xs shrink-0">
                {guest.category}
              </Badge>
            )}
          </div>

          {guest.group_name && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{guest.group_name}</span>
            </div>
          )}

          <div className="space-y-1">
            {guest.email && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                <Mail className="h-3 w-3 shrink-0" />
                <span className="truncate">{guest.email}</span>
              </div>
            )}
            {guest.phone && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3 shrink-0" />
                <span>{guest.phone}</span>
              </div>
            )}
          </div>

          {hasEvents && (
            <div className="flex gap-1 flex-wrap">
              {guest.guest_events?.map((ge) => (
                <Badge
                  key={ge.id}
                  variant={ge.confirmed ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {ge.event?.name}
                  {ge.confirmed && ' ✓'}
                </Badge>
              ))}
            </div>
          )}

          {confirmedEvents.length > 0 && confirmedEvents[0].plus_ones > 0 && (
            <div className="text-xs text-muted-foreground">
              +{confirmedEvents[0].plus_ones} acompañante{confirmedEvents[0].plus_ones > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
