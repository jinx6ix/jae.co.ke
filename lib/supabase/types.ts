// lib/supabase/types.ts
// Minimal typed schema for the public site. We only write to
// `online_bookings` from this app, so only that table is declared here.
// If the public site later needs to read other tables, add them.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      online_bookings: {
        Row: {
          id: string;
          source_booking_id: string;
          booking_kind: 'tour' | 'vehicle_hire';
          tour_slug: string | null;
          vehicle_slug: string | null;
          service_name: string | null;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string;
          customer_country: string | null;
          departure_date: string;
          return_date: string | null;
          adults: number;
          total_price: number;
          currency: string | null;
          pickup_location: string | null;
          special_requests: string | null;
          source_url: string | null;
          status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
          confirmed_booking_id: string | null;
          confirmed_at: string | null;
          confirmed_by: string | null;
          rejected_at: string | null;
          rejected_by: string | null;
          rejection_reason: string | null;
          internal_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['online_bookings']['Row'],
          | 'id'
          | 'created_at'
          | 'updated_at'
          | 'status'
          | 'confirmed_booking_id'
          | 'confirmed_at'
          | 'confirmed_by'
          | 'rejected_at'
          | 'rejected_by'
          | 'rejection_reason'
        > & {
          id?: string;
          status?: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
        };
        Update: Partial<Database['public']['Tables']['online_bookings']['Insert']>;
      };
    };
  };
};

export type OnlineBooking = Database['public']['Tables']['online_bookings']['Row'];
