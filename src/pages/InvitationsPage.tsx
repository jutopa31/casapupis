import { useState } from 'react'
import { useGuests } from '@/hooks/useGuests'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ShareButtons } from '@/components/invitations/ShareButtons'
import { Check, Send, Search } from 'lucide-react'

export function InvitationsPage() {
  const { data: guests = [], isLoading } = useGuests()
  const [searchTerm, setSearchTerm] = useState('')

  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin

  if (isLoading) return <LoadingSpinner />

  const filteredGuests = guests.filter((guest) =>
    searchTerm === '' ||
    `${guest.first_name} ${guest.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const guestsWithEvents = filteredGuests.filter(
    (g) => g.guest_events && g.guest_events.length > 0
  )

  const totalConfirmed = guests.filter((g) =>
    g.guest_events?.some((ge) => ge.confirmed)
  ).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Invitaciones</h1>
        <p className="text-muted-foreground">Gestiona invitaciones y confirmaciones</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invitados
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guestsWithEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              con invitación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmados
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConfirmed}</div>
            <p className="text-xs text-muted-foreground">
              respondieron
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pendientes
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guestsWithEvents.length - totalConfirmed}
            </div>
            <p className="text-xs text-muted-foreground">
              sin responder
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar invitado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {guestsWithEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No hay invitados con eventos asignados</p>
              <p className="text-sm mt-2">
                Asigna eventos a tus invitados en la sección "Invitados"
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredGuests.map((guest) => {
                if (!guest.guest_events || guest.guest_events.length === 0) return null

                return (
                  <div
                    key={guest.id}
                    className="p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {guest.first_name} {guest.last_name}
                        </h3>

                        <div className="flex gap-2 mt-2">
                          {guest.guest_events.map((ge) => (
                            <Badge
                              key={ge.id}
                              variant={ge.confirmed ? 'default' : 'outline'}
                            >
                              {ge.event?.name}
                              {ge.confirmed && ' ✓'}
                              {ge.plus_ones > 0 && ` (+${ge.plus_ones})`}
                            </Badge>
                          ))}
                        </div>

                        {guest.rsvp_token && (
                          <div className="mt-3">
                            <ShareButtons guest={guest} appUrl={appUrl} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
