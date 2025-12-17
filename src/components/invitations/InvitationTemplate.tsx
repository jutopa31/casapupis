import { Guest } from '@/types'

interface InvitationTemplateProps {
  guest: Guest
}

export function InvitationTemplate({ guest }: InvitationTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-2xl">
        {/* Original invitation image as background */}
        <div className="relative shadow-2xl">
          <img
            src="/images/invitation-template.jpg"
            alt="Invitación de boda"
            className="w-full h-auto"
          />

          {/* Overlay for personalized guest name */}
          <div className="absolute top-[8%] left-0 right-0 text-center">
            <h1 className="text-base sm:text-lg md:text-xl font-serif text-[#8b6f47] tracking-wide uppercase">
              {guest.first_name.toUpperCase()}, ¡NOS VAMOS A CASAR!
            </h1>
          </div>
        </div>

        {/* Outer shadow effect */}
        <div className="absolute inset-0 -z-10 blur-xl bg-[#5a7c6f]/10 scale-105"></div>
      </div>
    </div>
  )
}
