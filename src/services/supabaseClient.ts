import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqesvabbhirxyzmmyqkh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZXN2YWJiaGlyeHl6bW15cWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2ODk0NTEsImV4cCI6MjAzOTI2NTQ1MX0.87zm7uXPUJBLVZGihYz16E6qc2vMMlAr3QB73mq-3ts';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key must be provided');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;