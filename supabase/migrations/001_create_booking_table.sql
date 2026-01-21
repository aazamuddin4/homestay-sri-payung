-- Supabase / Postgres migration: create booking_table
-- Run this in the Supabase SQL editor or via psql

CREATE TABLE IF NOT EXISTS booking_table (
  id SERIAL PRIMARY KEY,
  homestay_id TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  uname TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Optional: index for faster date queries
CREATE INDEX IF NOT EXISTS idx_booking_start_date ON booking_table (start_date);
CREATE INDEX IF NOT EXISTS idx_booking_end_date ON booking_table (end_date);
