import { Guest } from '@/types'

interface InvitationTemplateProps {
  guest: Guest
}

export function InvitationTemplate({ guest }: InvitationTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-2xl">
        {/* Decorative border frame */}
        <div className="relative bg-[#faf8f3] p-8 sm:p-12 md:p-16 shadow-2xl">
          {/* Ornamental border using CSS */}
          <div className="absolute inset-0 border-[12px] border-[#5a7c6f] pointer-events-none">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-[#8b6f47] rounded-tl-3xl"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-[#8b6f47] rounded-tr-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16">
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-[#8b6f47] rounded-bl-3xl"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-[#8b6f47] rounded-br-3xl"></div>
            </div>
          </div>

          {/* Inner decorative border */}
          <div className="absolute inset-6 border-2 border-[#5a7c6f]/30 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            {/* Top decoration */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#8b6f47] to-transparent"></div>
            </div>

            {/* Greeting */}
            <div className="space-y-2">
              <h1 className="text-lg sm:text-xl font-serif text-[#8b6f47] tracking-wide uppercase">
                {guest.first_name}, ¡Nos vamos a casar!
              </h1>
            </div>

            {/* Couple names in script font */}
            <div className="py-6">
              <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl text-[#8b6f47] italic">
                Suly
              </h2>
              <p className="font-heading text-4xl sm:text-5xl text-[#8b6f47] my-2">y</p>
              <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl text-[#8b6f47] italic">
                Jacqui
              </h2>
            </div>

            {/* Message */}
            <p className="text-base sm:text-lg text-[#8b6f47] max-w-md mx-auto leading-relaxed px-4">
              Celebramos el amor y la vida, y es una alegría poder hacerlo en tu compañía.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-[#8b6f47]"></div>
              <div className="w-2 h-2 bg-[#8b6f47] rotate-45"></div>
              <div className="w-12 h-px bg-[#8b6f47]"></div>
            </div>

            {/* Event details */}
            <div className="space-y-3 text-[#8b6f47]">
              <p className="text-xl sm:text-2xl font-serif">
                21 de febrero 2026 - 16 hs.
              </p>
              <p className="text-base sm:text-lg font-serif">
                Calle 617, n° 5176 - El Pato, Berazategui
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-[#8b6f47]"></div>
              <div className="w-2 h-2 bg-[#8b6f47] rotate-45"></div>
              <div className="w-12 h-px bg-[#8b6f47]"></div>
            </div>

            {/* Dress code */}
            <p className="text-sm sm:text-base text-[#5a7c6f] italic">
              Dress code: elegante sport
            </p>

            {/* Bottom decoration */}
            <div className="flex justify-center mt-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#8b6f47] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Outer shadow effect */}
        <div className="absolute inset-0 -z-10 blur-xl bg-[#5a7c6f]/10 scale-105"></div>
      </div>
    </div>
  )
}
