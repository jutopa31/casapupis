import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Guest } from '@/types'
import { nanoid } from 'nanoid'

export function useGuests() {
  return useQuery({
    queryKey: ['guests'],
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
        .order('last_name')

      if (error) throw error
      return data as Guest[]
    },
  })
}

export function useCreateGuest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newGuest: Partial<Guest> & { eventIds?: string[] }) => {
      const { eventIds, ...guestData } = newGuest

      // Generar token único para RSVP
      const rsvp_token = nanoid(16)

      // Crear invitado
      const { data: guest, error: guestError } = await supabase
        .from('guests')
        .insert({ ...guestData, rsvp_token })
        .select()
        .single()

      if (guestError) throw guestError

      // Asignar eventos si se proporcionaron
      if (eventIds && eventIds.length > 0) {
        const guestEvents = eventIds.map((event_id) => ({
          guest_id: guest.id,
          event_id,
        }))

        const { error: eventsError } = await supabase
          .from('guest_events')
          .insert(guestEvents)

        if (eventsError) throw eventsError
      }

      return guest
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] })
    },
  })
}

export function useUpdateGuest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
      eventIds,
    }: {
      id: string
      data: Partial<Guest>
      eventIds?: string[]
    }) => {
      // Actualizar datos del invitado
      const { error: updateError } = await supabase
        .from('guests')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (updateError) throw updateError

      // Actualizar eventos si se proporcionaron
      if (eventIds) {
        // Eliminar eventos existentes
        await supabase.from('guest_events').delete().eq('guest_id', id)

        // Insertar nuevos eventos
        if (eventIds.length > 0) {
          const guestEvents = eventIds.map((event_id) => ({
            guest_id: id,
            event_id,
          }))

          const { error: eventsError } = await supabase
            .from('guest_events')
            .insert(guestEvents)

          if (eventsError) throw eventsError
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] })
    },
  })
}

export function useDeleteGuest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('guests').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] })
    },
  })
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at')

      if (error) throw error
      return data
    },
  })
}
