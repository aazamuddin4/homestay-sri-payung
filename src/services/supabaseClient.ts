import { createClient } from '@supabase/supabase-js';

// Use Create React App env var convention. Add these to a local `.env` file (see .env.example).
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast so it's clear the developer needs to provide credentials to resume Supabase.
  throw new Error(
    'Missing Supabase credentials. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env file (see .env.example)'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;