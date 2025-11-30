import { Guest } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, CheckCircle, XCircle } from 'lucide-react'

interface GuestStatsProps {
  guests: Guest[]
}

export function GuestStats({ guests }: GuestStatsProps) {
  const totalGuests = guests.length

  // Invitados asignados a Ceremonia
  const invitedCeremonia = guests.filter(
    (g) => g.guest_events?.some((ge) => ge.event?.name === 'Ceremonia')
  ).length

  const confirmedCeremonia = guests.filter(
    (g) =>
      g.guest_events?.some(
        (ge) => ge.event?.name === 'Ceremonia' && ge.confirmed
      )
  ).length

  // Invitados asignados a Fiesta
  const invitedFiesta = guests.filter(
    (g) => g.guest_events?.some((ge) => ge.event?.name === 'Fiesta')
  ).length

  const confirmedFiesta = guests.filter(
    (g) =>
      g.guest_events?.some(
        (ge) => ge.event?.name === 'Fiesta' && ge.confirmed
      )
  ).length

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGuests}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ceremonia</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{invitedCeremonia}</div>
          <p className="text-xs text-muted-foreground">
            {confirmedCeremonia} confirmados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fiesta</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{invitedFiesta}</div>
          <p className="text-xs text-muted-foreground">
            {confirmedFiesta} confirmados
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
