import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGuestByToken, useUpdateRSVP } from '@/hooks/useRSVP'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { CheckCircle, XCircle, Heart } from 'lucide-react'

export function PublicRSVP() {
  const { token } = useParams<{ token: string }>()
  const { data: guest, isLoading } = useGuestByToken(token || '')
  const updateRSVP = useUpdateRSVP()
  const [submitted, setSubmitted] = useState(false)

  const [rsvpData, setRsvpData] = useState<Record<string, {
    confirmed: boolean
    plusOnes: number
    dietaryRestrictions: string
  }>>({})

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    )
  }

  if (!guest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">
              Invitación no encontrada
            </h2>
            <p className="text-muted-foreground">
              El enlace de invitación no es válido
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      for (const guestEvent of guest.guest_events || []) {
        const data = rsvpData[guestEvent.id] || {
          confirmed: false,
          plusOnes: 0,
          dietaryRestrictions: '',
        }

        await updateRSVP.mutateAsync({
          guestEventId: guestEvent.id,
          confirmed: data.confirmed,
          plusOnes: data.plusOnes,
          dietaryRestrictions: data.dietaryRestrictions,
        })
      }
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
    }
  }

  const updateEventData = (eventId: string, field: string, value: any) => {
    setRsvpData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        confirmed: prev[eventId]?.confirmed || false,
        plusOnes: prev[eventId]?.plusOnes || 0,
        dietaryRestrictions: prev[eventId]?.dietaryRestrictions || '',
        [field]: value,
      },
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">
              ¡Confirmación recibida!
            </h2>
            <p className="text-muted-foreground">
              Gracias por confirmar tu asistencia. ¡Nos vemos pronto!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center border-b">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl font-heading">
              Invitación de Casamiento
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              {guest.first_name} {guest.last_name}
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {guest.guest_events?.map((guestEvent) => (
                <Card key={guestEvent.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Checkbox
                        checked={rsvpData[guestEvent.id]?.confirmed || false}
                        onCheckedChange={(checked) =>
                          updateEventData(guestEvent.id, 'confirmed', checked)
                        }
                      />
                      <span>{guestEvent.event?.name}</span>
                    </CardTitle>
                  </CardHeader>

                  {rsvpData[guestEvent.id]?.confirmed && (
                    <CardContent className="space-y-4">
                      {guestEvent.event?.location && (
                        <div>
                          <p className="text-sm text-muted-foreground">Lugar</p>
                          <p className="font-medium">{guestEvent.event.location}</p>
                          {guestEvent.event.address && (
                            <p className="text-sm text-muted-foreground">
                              {guestEvent.event.address}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor={`plus-${guestEvent.id}`}>
                          ¿Cuántas personas adicionales asistirán contigo?
                        </Label>
                        <Input
                          id={`plus-${guestEvent.id}`}
                          type="number"
                          min="0"
                          max="10"
                          value={rsvpData[guestEvent.id]?.plusOnes || 0}
                          onChange={(e) =>
                            updateEventData(
                              guestEvent.id,
                              'plusOnes',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`dietary-${guestEvent.id}`}>
                          Restricciones alimentarias
                        </Label>
                        <Textarea
                          id={`dietary-${guestEvent.id}`}
                          placeholder="Ej: vegetariano, celíaco, alérgico a..."
                          value={rsvpData[guestEvent.id]?.dietaryRestrictions || ''}
                          onChange={(e) =>
                            updateEventData(
                              guestEvent.id,
                              'dietaryRestrictions',
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}

              <Button
                type="submit"
                className="w-full"
                disabled={updateRSVP.isPending}
              >
                {updateRSVP.isPending ? 'Enviando...' : 'Confirmar Asistencia'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
