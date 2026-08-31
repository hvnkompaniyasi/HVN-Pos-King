import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!URL || !KEY) {
  console.warn('Supabase sozlamalari .env faylida topilmadi.');
}

export const supabase = createClient(
  URL || 'https://placeholder.supabase.co',
  KEY || 'placeholder-key'
);
