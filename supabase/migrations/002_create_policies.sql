-- Enable Row Level Security and add simple policies for booking_table
-- Run this in the Supabase SQL editor for the new project.

-- Enable RLS (recommended). If you prefer, you can disable RLS instead.
ALTER TABLE IF EXISTS booking_table ENABLE ROW LEVEL SECURITY;

-- Allow public SELECT (read) for all rows
CREATE POLICY IF NOT EXISTS "Allow public select" ON booking_table
  FOR SELECT
  USING (true);

-- Allow public INSERT
CREATE POLICY IF NOT EXISTS "Allow public insert" ON booking_table
  FOR INSERT
  WITH CHECK (true);

-- Optionally, allow public update/delete only if needed (commented out)
-- CREATE POLICY IF NOT EXISTS "Allow public update" ON booking_table
--   FOR UPDATE
--   USING (true)
--   WITH CHECK (true);

-- Note: Granting public insert/select to anon makes the table writable by anyone with the anon key.
-- For better security, consider creating a function/edge route or using Supabase Auth to restrict writes.
