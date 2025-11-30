export interface Guest {
  id: string
  first_name: string
  last_name: string
  email?: string | null
  phone?: string | null
  group_name?: string | null
  notes?: string | null
  category?: string | null
  rsvp_token?: string | null
  created_at: string
  updated_at: string
  guest_events?: GuestEvent[]
}

export interface GuestEvent {
  id: string
  guest_id: string
  event_id: string
  invited: boolean
  confirmed: boolean
  confirmed_at?: string | null
  plus_ones: number
  dietary_restrictions?: string | null
  created_at: string
  event?: Event
}

export interface Event {
  id: string
  name: string
  event_date?: string | null
  location?: string | null
  address?: string | null
  created_at: string
}
