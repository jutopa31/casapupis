import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useGuestByToken(token: string) {
  return useQuery({
    queryKey: ['guest-rsvp', token],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guests')
        .select(`
          *,
          guest_events (
            *,
            event:events (*)
          )
        `)
        .eq('rsvp_token', token)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!token,
  })
}

export function useUpdateRSVP() {
  return useMutation({
    mutationFn: async ({
      guestEventId,
      confirmed,
      plusOnes,
      dietaryRestrictions,
    }: {
      guestEventId: string
      confirmed: boolean
      plusOnes: number
      dietaryRestrictions?: string
    }) => {
      const { error } = await supabase
        .from('guest_events')
        .update({
          confirmed,
          plus_ones: plusOnes,
          dietary_restrictions: dietaryRestrictions,
          confirmed_at: confirmed ? new Date().toISOString() : null,
        })
        .eq('id', guestEventId)

      if (error) throw error
    },
  })
}
