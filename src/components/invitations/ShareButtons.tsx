import { Guest } from '@/types'
import { Button } from '@/components/ui/button'
import { MessageCircle, Copy, Check, Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ShareButtonsProps {
  guest: Guest
  appUrl: string
}

export function ShareButtons({ guest, appUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  // Generate personalized link with name slug
  const generateRSVPLink = () => {
    const nameSlug = `${guest.first_name}-${guest.last_name}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9-]/g, '-') // Replace special chars with dash
      .replace(/-+/g, '-') // Remove multiple dashes
      .replace(/^-|-$/g, '') // Remove leading/trailing dashes

    return `${appUrl}/rsvp/${nameSlug}?t=${guest.rsvp_token}`
  }

  const rsvpLink = generateRSVPLink()

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(rsvpLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const message = `¡Hola ${guest.first_name}! 💚

¡Nos casamos! 🎉

Queremos que seas parte de este momento tan especial. Te invitamos a confirmar tu asistencia en el siguiente enlace:

${rsvpLink}

¡Esperamos verte!
Suly y Jacqui 💕`

    const whatsappUrl = guest.phone
      ? `https://wa.me/${guest.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  const handlePreview = () => {
    navigate(`/invitations/preview/${guest.rsvp_token}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreview}
        className="flex-1 sm:flex-initial"
      >
        <Eye className="mr-2 h-4 w-4" />
        Ver Invitación
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        className="flex-1 sm:flex-initial bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex-1 sm:flex-initial"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copiar Link
          </>
        )}
      </Button>
    </div>
  )
}
