-- Add active column to clients table
ALTER TABLE clients ADD COLUMN active BOOLEAN DEFAULT true;

-- Modify offers table to ensure offers expire after 3 months
ALTER TABLE offers ADD CONSTRAINT check_valid_until 
CHECK (valid_until <= DATE_ADD(date, INTERVAL 3 MONTH));