import { useParams, useNavigate } from 'react-router-dom'
import { useGuestByToken } from '@/hooks/useRSVP'
import { InvitationTemplate } from '@/components/invitations/InvitationTemplate'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { ArrowLeft, XCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function InvitationPreview() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { data: guest, isLoading } = useGuestByToken(token || '')

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
              Invitado no encontrado
            </h2>
            <p className="text-muted-foreground mb-6">
              El token de invitación no es válido
            </p>
            <Button onClick={() => navigate('/invitations')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Invitaciones
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Back button overlay */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/invitations')}
          className="shadow-lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>

      {/* Invitation template */}
      <InvitationTemplate guest={guest} />
    </div>
  )
}
