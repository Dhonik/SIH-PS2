import { createClient } from '@supabase/supabase-js';

// Retrieve public environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Security reminder: Never expose SUPABASE_SERVICE_ROLE_KEY on the client frontend!
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock Client fallback for seamless SIH prototype demonstration
      auth: {
        getUser: async () => ({ data: { user: { id: 'usr-st-arun-2026', email: 'arun.kumar@student.tn.edu' } }, error: null }),
        signInWithOtp: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
      },
      from: (table) => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => Promise.resolve({ data: [], error: null })
          }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        insert: async (data) => ({ data, error: null }),
        update: async (data) => ({ data, error: null }),
        delete: async () => ({ error: null }),
      })
    };

export default supabase;
