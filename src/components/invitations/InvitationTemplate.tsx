import { Guest } from '@/types'

interface InvitationTemplateProps {
  guest: Guest
}

export function InvitationTemplate({ guest }: InvitationTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-2xl">
        {/* Main invitation card with ornamental SVG border */}
        <div className="relative bg-[#faf8f3] shadow-2xl">
          {/* SVG Ornamental Border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main green ornamental border */}
            <rect x="10" y="10" width="380" height="580" fill="none" stroke="#4a6b5c" strokeWidth="20" rx="8"/>

            {/* Inner frame */}
            <rect x="30" y="30" width="340" height="540" fill="none" stroke="#8b6f47" strokeWidth="2" opacity="0.4"/>

            {/* Top decorative scrollwork */}
            <g transform="translate(200, 15)">
              {/* Center ornament */}
              <path d="M -20,-5 Q -15,-8 -10,-5 T 0,0 T 10,-5 Q 15,-8 20,-5"
                    stroke="#8b6f47" strokeWidth="2" fill="none"/>
              <circle cx="0" cy="-2" r="3" fill="#8b6f47"/>
              {/* Flowers */}
              <circle cx="-25" cy="-3" r="4" fill="#7c5ba7" opacity="0.8"/>
              <circle cx="-22" cy="-6" r="3" fill="#9b7cc4" opacity="0.7"/>
              <circle cx="25" cy="-3" r="4" fill="#7c5ba7" opacity="0.8"/>
              <circle cx="22" cy="-6" r="3" fill="#9b7cc4" opacity="0.7"/>
            </g>

            {/* Bottom decorative scrollwork */}
            <g transform="translate(200, 585)">
              {/* Center ornament */}
              <path d="M -20,5 Q -15,8 -10,5 T 0,0 T 10,5 Q 15,8 20,5"
                    stroke="#8b6f47" strokeWidth="2" fill="none"/>
              <circle cx="0" cy="2" r="3" fill="#8b6f47"/>
              {/* Flowers */}
              <circle cx="-25" cy="3" r="4" fill="#7c5ba7" opacity="0.8"/>
              <circle cx="-22" cy="6" r="3" fill="#9b7cc4" opacity="0.7"/>
              <circle cx="25" cy="3" r="4" fill="#7c5ba7" opacity="0.8"/>
              <circle cx="22" cy="6" r="3" fill="#9b7cc4" opacity="0.7"/>
            </g>

            {/* Top-left corner ornament */}
            <g transform="translate(35, 35)">
              <path d="M 0,15 Q 0,5 5,5 Q 10,5 10,0"
                    stroke="#4a6b5c" strokeWidth="3" fill="none"/>
              <circle cx="8" cy="8" r="5" fill="#7c5ba7" opacity="0.7"/>
              <circle cx="5" cy="12" r="3" fill="#9b7cc4" opacity="0.6"/>
              <circle cx="12" cy="5" r="3" fill="#9b7cc4" opacity="0.6"/>
            </g>

            {/* Top-right corner ornament */}
            <g transform="translate(365, 35)">
              <path d="M 0,0 Q 0,5 -5,5 Q -10,5 -15,5 Q -15,10 -15,15"
                    stroke="#4a6b5c" strokeWidth="3" fill="none"/>
              <circle cx="-8" cy="8" r="5" fill="#7c5ba7" opacity="0.7"/>
              <circle cx="-5" cy="12" r="3" fill="#9b7cc4" opacity="0.6"/>
              <circle cx="-12" cy="5" r="3" fill="#9b7cc4" opacity="0.6"/>
            </g>

            {/* Bottom-left corner ornament */}
            <g transform="translate(35, 565)">
              <path d="M 0,-15 Q 0,-5 5,-5 Q 10,-5 10,0"
                    stroke="#4a6b5c" strokeWidth="3" fill="none"/>
              <circle cx="8" cy="-8" r="5" fill="#7c5ba7" opacity="0.7"/>
              <circle cx="5" cy="-12" r="3" fill="#9b7cc4" opacity="0.6"/>
              <circle cx="12" cy="-5" r="3" fill="#9b7cc4" opacity="0.6"/>
            </g>

            {/* Bottom-right corner ornament */}
            <g transform="translate(365, 565)">
              <path d="M 0,0 Q 0,-5 -5,-5 Q -10,-5 -15,-5 Q -15,-10 -15,-15"
                    stroke="#4a6b5c" strokeWidth="3" fill="none"/>
              <circle cx="-8" cy="-8" r="5" fill="#7c5ba7" opacity="0.7"/>
              <circle cx="-5" cy="-12" r="3" fill="#9b7cc4" opacity="0.6"/>
              <circle cx="-12" cy="-5" r="3" fill="#9b7cc4" opacity="0.6"/>
            </g>

            {/* Side flowers - Left */}
            <g>
              <circle cx="25" cy="150" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="28" cy="155" r="3" fill="#9b7cc4" opacity="0.5"/>
              <circle cx="25" cy="300" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="28" cy="305" r="3" fill="#9b7cc4" opacity="0.5"/>
              <circle cx="25" cy="450" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="28" cy="455" r="3" fill="#9b7cc4" opacity="0.5"/>
            </g>

            {/* Side flowers - Right */}
            <g>
              <circle cx="375" cy="150" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="372" cy="155" r="3" fill="#9b7cc4" opacity="0.5"/>
              <circle cx="375" cy="300" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="372" cy="305" r="3" fill="#9b7cc4" opacity="0.5"/>
              <circle cx="375" cy="450" r="5" fill="#7c5ba7" opacity="0.6"/>
              <circle cx="372" cy="455" r="3" fill="#9b7cc4" opacity="0.5"/>
            </g>

            {/* Scrollwork patterns along borders */}
            <g stroke="#4a6b5c" strokeWidth="2" fill="none" opacity="0.6">
              {/* Top */}
              <path d="M 80,20 Q 85,18 90,20 T 100,20"/>
              <path d="M 120,20 Q 125,18 130,20 T 140,20"/>
              <path d="M 260,20 Q 265,18 270,20 T 280,20"/>
              <path d="M 300,20 Q 305,18 310,20 T 320,20"/>

              {/* Bottom */}
              <path d="M 80,580 Q 85,582 90,580 T 100,580"/>
              <path d="M 120,580 Q 125,582 130,580 T 140,580"/>
              <path d="M 260,580 Q 265,582 270,580 T 280,580"/>
              <path d="M 300,580 Q 305,582 310,580 T 320,580"/>

              {/* Left side */}
              <path d="M 20,100 Q 18,105 20,110 T 20,120"/>
              <path d="M 20,200 Q 18,205 20,210 T 20,220"/>
              <path d="M 20,380 Q 18,385 20,390 T 20,400"/>
              <path d="M 20,480 Q 18,485 20,490 T 20,500"/>

              {/* Right side */}
              <path d="M 380,100 Q 382,105 380,110 T 380,120"/>
              <path d="M 380,200 Q 382,205 380,210 T 380,220"/>
              <path d="M 380,380 Q 382,385 380,390 T 380,400"/>
              <path d="M 380,480 Q 382,485 380,490 T 380,500"/>
            </g>
          </svg>

          {/* Content */}
          <div className="relative z-10 text-center px-8 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 space-y-4 sm:space-y-6">
            {/* Top decoration */}
            <div className="flex justify-center mb-2">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#8b6f47] to-transparent"></div>
            </div>

            {/* Greeting */}
            <div className="space-y-2">
              <h1 className="text-base sm:text-lg md:text-xl font-serif text-[#8b6f47] tracking-wide uppercase">
                {guest.first_name}, ¡Nos vamos a casar!
              </h1>
            </div>

            {/* Couple names in script font */}
            <div className="py-4 sm:py-6">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#8b6f47] italic leading-tight">
                Juli
              </h2>
              <p className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#8b6f47] my-1 sm:my-2">y</p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#8b6f47] italic leading-tight">
                Jacqui
              </h2>
            </div>

            {/* Message */}
            <p className="text-sm sm:text-base md:text-lg text-[#8b6f47] max-w-md mx-auto leading-relaxed px-2 sm:px-4">
              Celebramos el amor y la vida, y es una alegría poder hacerlo en tu compañía.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 py-3 sm:py-4">
              <div className="w-10 sm:w-12 h-px bg-[#8b6f47]"></div>
              <div className="w-2 h-2 bg-[#8b6f47] rotate-45"></div>
              <div className="w-10 sm:w-12 h-px bg-[#8b6f47]"></div>
            </div>

            {/* Event details */}
            <div className="space-y-2 sm:space-y-3 text-[#8b6f47]">
              <p className="text-lg sm:text-xl md:text-2xl font-serif">
                21 de febrero 2026 - 16 hs.
              </p>
              <p className="text-sm sm:text-base md:text-lg font-serif">
                Calle 617, n° 5176 - El Pato, Berazategui
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 py-3 sm:py-4">
              <div className="w-10 sm:w-12 h-px bg-[#8b6f47]"></div>
              <div className="w-2 h-2 bg-[#8b6f47] rotate-45"></div>
              <div className="w-10 sm:w-12 h-px bg-[#8b6f47]"></div>
            </div>

            {/* Dress code */}
            <p className="text-xs sm:text-sm md:text-base text-[#5a7c6f] italic">
              Dress code: elegante sport
            </p>

            {/* Bottom decoration */}
            <div className="flex justify-center mt-4 sm:mt-6">
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
