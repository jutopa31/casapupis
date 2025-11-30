export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          name: string
          event_date: string | null
          location: string | null
          address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          event_date?: string | null
          location?: string | null
          address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          event_date?: string | null
          location?: string | null
          address?: string | null
          created_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          group_name: string | null
          notes: string | null
          category: string | null
          rsvp_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          group_name?: string | null
          notes?: string | null
          category?: string | null
          rsvp_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          group_name?: string | null
          notes?: string | null
          category?: string | null
          rsvp_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guest_events: {
        Row: {
          id: string
          guest_id: string
          event_id: string
          invited: boolean
          confirmed: boolean
          confirmed_at: string | null
          plus_ones: number
          dietary_restrictions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          guest_id: string
          event_id: string
          invited?: boolean
          confirmed?: boolean
          confirmed_at?: string | null
          plus_ones?: number
          dietary_restrictions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          guest_id?: string
          event_id?: string
          invited?: boolean
          confirmed?: boolean
          confirmed_at?: string | null
          plus_ones?: number
          dietary_restrictions?: string | null
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string | null
          completed: boolean
          due_date: string | null
          priority: string
          assigned_to: string | null
          order_index: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string | null
          completed?: boolean
          due_date?: string | null
          priority?: string
          assigned_to?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string | null
          completed?: boolean
          due_date?: string | null
          priority?: string
          assigned_to?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      budget_categories: {
        Row: {
          id: string
          name: string
          color: string | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string | null
          order_index?: number | null
          created_at?: string
        }
      }
      budget_items: {
        Row: {
          id: string
          category_id: string
          name: string
          estimated_cost: number
          actual_cost: number
          paid: boolean
          paid_date: string | null
          vendor: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          estimated_cost?: number
          actual_cost?: number
          paid?: boolean
          paid_date?: string | null
          vendor?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          estimated_cost?: number
          actual_cost?: number
          paid?: boolean
          paid_date?: string | null
          vendor?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
