-- ============================================================
-- PHASE 3: SOAP CHART NOTES SYSTEM
-- Clinical documentation for med spa treatments
-- ============================================================

-- Chart Notes Table
CREATE TABLE IF NOT EXISTS chart_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Links
  client_id UUID NOT NULL,
  appointment_id UUID,
  provider_id UUID NOT NULL,
  
  -- SOAP Structure
  chief_complaint TEXT,
  subjective TEXT,  -- S: Patient's symptoms, history, concerns
  objective TEXT,   -- O: Observations, vitals, exam findings
  assessment TEXT,  -- A: Diagnosis, clinical impression
  plan TEXT,        -- P: Treatment plan, recommendations
  
  -- Treatment Details
  treatment_performed TEXT,
  areas_treated TEXT[],
  products_used JSONB DEFAULT '[]',  -- [{name, units, lot_number}]
  
  -- Photos
  before_photos TEXT[],  -- URLs to photos
  after_photos TEXT[],
  
  -- Consent & Safety
  consent_obtained BOOLEAN DEFAULT FALSE,
  adverse_reactions TEXT,
  patient_instructions TEXT,
  follow_up_date DATE,
  
  -- Signature & Locking
  signed_at TIMESTAMP WITH TIME ZONE,
  signed_by UUID,
  is_locked BOOLEAN DEFAULT FALSE,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID,
  last_modified_by UUID
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chart_notes_client ON chart_notes(client_id);
CREATE INDEX IF NOT EXISTS idx_chart_notes_appointment ON chart_notes(appointment_id);
CREATE INDEX IF NOT EXISTS idx_chart_notes_provider ON chart_notes(provider_id);
CREATE INDEX IF NOT EXISTS idx_chart_notes_date ON chart_notes(created_at);

-- Chart Note Versions (for audit trail)
CREATE TABLE IF NOT EXISTS chart_note_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chart_note_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL,  -- Full snapshot of the note at this version
  changed_by UUID,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  change_reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_chart_versions_note ON chart_note_versions(chart_note_id);

-- RLS
ALTER TABLE chart_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_note_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "view_chart_notes" ON chart_notes;
CREATE POLICY "view_chart_notes" ON chart_notes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "view_chart_versions" ON chart_note_versions;
CREATE POLICY "view_chart_versions" ON chart_note_versions FOR SELECT TO authenticated USING (true);

-- DONE!
