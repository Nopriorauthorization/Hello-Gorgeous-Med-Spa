-- ============================================================
-- ADD PROVIDER ASSIGNMENT TO SERVICES
-- Allows assigning which providers can perform each service
-- ============================================================

-- Add provider_ids array to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS provider_ids UUID[] DEFAULT '{}';

-- Add comment
COMMENT ON COLUMN public.services.provider_ids IS 'Array of provider IDs who can perform this service';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_provider_ids ON public.services USING GIN (provider_ids);

-- ============================================================
-- UPDATE EXISTING SERVICES WITH PROVIDER ASSIGNMENTS
-- Based on service categories/types
-- ============================================================

-- First, get the provider IDs (you'll need to update these with actual IDs)
-- Ryan handles: Botox, Fillers, Weight Loss, IV, Medical, Hormone, PRP, Laser
-- Danielle handles: Lash, Brow, Facials, Skincare

-- This is a template - run with actual provider IDs from your database:
/*
-- Get Ryan's provider ID
SELECT id FROM providers WHERE user_id IN (SELECT id FROM users WHERE first_name = 'Ryan');

-- Get Danielle's provider ID  
SELECT id FROM providers WHERE user_id IN (SELECT id FROM users WHERE first_name = 'Danielle');

-- Then update services:
-- Example for Botox services (assign to Ryan)
UPDATE services 
SET provider_ids = ARRAY['ryan-provider-uuid-here']::uuid[]
WHERE slug ILIKE '%botox%' OR slug ILIKE '%filler%' OR slug ILIKE '%weight%' OR slug ILIKE '%iv-%' 
   OR slug ILIKE '%hormone%' OR slug ILIKE '%pellet%' OR slug ILIKE '%semaglutide%'
   OR slug ILIKE '%tirzepatide%' OR slug ILIKE '%prp%' OR slug ILIKE '%medical%';

-- Example for Lash/Brow services (assign to Danielle)
UPDATE services 
SET provider_ids = ARRAY['danielle-provider-uuid-here']::uuid[]
WHERE slug ILIKE '%lash%' OR slug ILIKE '%brow%' OR slug ILIKE '%facial%' 
   OR slug ILIKE '%dermaplan%' OR slug ILIKE '%hydra%' OR slug ILIKE '%peel%';
*/

-- ============================================================
-- CREATE PROVIDER SCHEDULES TABLE
-- Stores each provider's working hours
-- ============================================================

CREATE TABLE IF NOT EXISTS public.provider_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
    start_time TIME,
    end_time TIME,
    is_working BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider_id, day_of_week)
);

-- Index for faster schedule lookups
CREATE INDEX IF NOT EXISTS idx_provider_schedules_provider ON public.provider_schedules(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_schedules_day ON public.provider_schedules(day_of_week);

-- Enable RLS
ALTER TABLE public.provider_schedules ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading schedules
CREATE POLICY IF NOT EXISTS "Anyone can view provider schedules"
ON public.provider_schedules FOR SELECT
USING (true);

-- Policy for staff to manage schedules
CREATE POLICY IF NOT EXISTS "Staff can manage provider schedules"
ON public.provider_schedules FOR ALL
TO authenticated
USING (true);
