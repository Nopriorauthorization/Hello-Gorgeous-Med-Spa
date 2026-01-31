-- ============================================================
-- HELLO GORGEOUS OS - COMPLIANCE & LEGAL PROTECTION TABLES
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. ENUMS
-- ============================================================

-- Compliance status
CREATE TYPE compliance_status AS ENUM (
  'compliant',
  'non_compliant', 
  'pending',
  'expires_soon'
);

-- Incident severity
CREATE TYPE incident_severity AS ENUM (
  'minor',
  'moderate',
  'severe',
  'critical'
);

-- Incident status
CREATE TYPE incident_status AS ENUM (
  'open',
  'investigating',
  'resolved',
  'closed'
);

-- Incident type
CREATE TYPE incident_type AS ENUM (
  'adverse_reaction',
  'allergic_reaction',
  'infection',
  'bruising_excessive',
  'swelling_excessive',
  'vascular_occlusion',
  'nerve_damage',
  'burn',
  'scarring',
  'asymmetry',
  'product_issue',
  'equipment_malfunction',
  'client_complaint',
  'slip_fall',
  'data_breach',
  'other'
);

-- Credential type
CREATE TYPE credential_type AS ENUM (
  'medical_license',
  'np_license',
  'pa_license',
  'rn_license',
  'esthetician_license',
  'laser_certification',
  'dea_registration',
  'cpr_bls',
  'acls',
  'injection_certification',
  'other'
);

-- ============================================================
-- 2. COMPLIANCE TRACKING TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.compliance_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_key VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'malpractice_insurance'
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  required BOOLEAN DEFAULT true,
  frequency VARCHAR(50), -- 'once', 'annual', 'monthly', 'per_client', 'per_treatment'
  status compliance_status DEFAULT 'pending',
  last_completed TIMESTAMP WITH TIME ZONE,
  next_due TIMESTAMP WITH TIME ZONE,
  responsible_person VARCHAR(255),
  document_urls TEXT[], -- Array of document URLs
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 3. INCIDENTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_number VARCHAR(20) NOT NULL UNIQUE, -- e.g., 'INC-2026-001'
  type incident_type NOT NULL,
  severity incident_severity NOT NULL,
  status incident_status DEFAULT 'open',
  
  -- What happened
  date_occurred DATE NOT NULL,
  time_occurred TIME,
  location VARCHAR(255),
  description TEXT NOT NULL,
  
  -- Who was involved
  client_id UUID REFERENCES public.clients(id),
  provider_id UUID REFERENCES public.providers(id),
  witnesses TEXT[],
  
  -- Treatment details
  treatment_type VARCHAR(255),
  product_used VARCHAR(255),
  lot_number VARCHAR(100),
  
  -- Response
  immediate_actions TEXT NOT NULL,
  medical_attention_required BOOLEAN DEFAULT false,
  medical_attention_provided TEXT,
  client_notified BOOLEAN DEFAULT false,
  client_notified_at TIMESTAMP WITH TIME ZONE,
  
  -- Follow-up
  root_cause TEXT,
  preventive_measures TEXT,
  insurance_notified BOOLEAN DEFAULT false,
  insurance_notified_at TIMESTAMP WITH TIME ZONE,
  insurance_claim_number VARCHAR(100),
  
  -- Documentation
  photo_urls TEXT[],
  attachment_urls TEXT[],
  
  -- Audit trail
  reported_by UUID REFERENCES public.users(id),
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  closed_by UUID REFERENCES public.users(id),
  closed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident notes (sub-table)
CREATE TABLE IF NOT EXISTS public.incident_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 4. PROVIDER CREDENTIALS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.provider_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  type credential_type NOT NULL,
  name VARCHAR(255) NOT NULL,
  license_number VARCHAR(100),
  issuing_body VARCHAR(255) NOT NULL,
  issued_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'expired', 'pending_renewal', 'suspended'
  document_url TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES public.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 5. PROVIDER TRAININGS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.provider_trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL, -- Training provider/organization
  completed_date DATE NOT NULL,
  expiration_date DATE,
  certificate_url TEXT,
  hours_completed DECIMAL(5,2),
  category VARCHAR(50), -- 'clinical', 'compliance', 'safety', 'product'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 6. INSURANCE POLICIES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'malpractice', 'general_liability', 'workers_comp', 'cyber', 'product'
  carrier VARCHAR(255) NOT NULL,
  policy_number VARCHAR(100) NOT NULL,
  coverage_amount VARCHAR(100),
  effective_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  document_url TEXT,
  auto_renew BOOLEAN DEFAULT false,
  premium_amount DECIMAL(10,2),
  premium_frequency VARCHAR(50), -- 'monthly', 'quarterly', 'annual'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 7. AUDIT LOG TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES public.users(id),
  user_name VARCHAR(255),
  user_role VARCHAR(50),
  action VARCHAR(50) NOT NULL, -- 'view', 'create', 'update', 'delete', 'export', 'login', 'logout', etc.
  resource VARCHAR(100) NOT NULL, -- Table/entity name
  resource_id UUID,
  details TEXT,
  ip_address INET,
  user_agent TEXT,
  -- For PHI access tracking
  client_id UUID REFERENCES public.clients(id),
  access_reason TEXT
);

-- ============================================================
-- 8. INDEXES
-- ============================================================

CREATE INDEX idx_compliance_status ON public.compliance_items(status);
CREATE INDEX idx_compliance_next_due ON public.compliance_items(next_due);
CREATE INDEX idx_compliance_category ON public.compliance_items(category);

CREATE INDEX idx_incidents_status ON public.incidents(status);
CREATE INDEX idx_incidents_severity ON public.incidents(severity);
CREATE INDEX idx_incidents_date ON public.incidents(date_occurred);
CREATE INDEX idx_incidents_client ON public.incidents(client_id);
CREATE INDEX idx_incidents_provider ON public.incidents(provider_id);

CREATE INDEX idx_credentials_provider ON public.provider_credentials(provider_id);
CREATE INDEX idx_credentials_expiration ON public.provider_credentials(expiration_date);
CREATE INDEX idx_credentials_status ON public.provider_credentials(status);

CREATE INDEX idx_trainings_provider ON public.provider_trainings(provider_id);
CREATE INDEX idx_trainings_expiration ON public.provider_trainings(expiration_date);

CREATE INDEX idx_insurance_expiration ON public.insurance_policies(expiration_date);
CREATE INDEX idx_insurance_type ON public.insurance_policies(type);

CREATE INDEX idx_audit_timestamp ON public.audit_log(timestamp);
CREATE INDEX idx_audit_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_resource ON public.audit_log(resource);
CREATE INDEX idx_audit_client ON public.audit_log(client_id);

-- ============================================================
-- 9. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.compliance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Policies for admin/staff access
CREATE POLICY "Staff can view compliance items" ON public.compliance_items FOR SELECT USING (true);
CREATE POLICY "Staff can manage compliance items" ON public.compliance_items FOR ALL USING (true);

CREATE POLICY "Staff can view incidents" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Staff can manage incidents" ON public.incidents FOR ALL USING (true);

CREATE POLICY "Staff can view incident notes" ON public.incident_notes FOR SELECT USING (true);
CREATE POLICY "Staff can manage incident notes" ON public.incident_notes FOR ALL USING (true);

CREATE POLICY "Staff can view credentials" ON public.provider_credentials FOR SELECT USING (true);
CREATE POLICY "Staff can manage credentials" ON public.provider_credentials FOR ALL USING (true);

CREATE POLICY "Staff can view trainings" ON public.provider_trainings FOR SELECT USING (true);
CREATE POLICY "Staff can manage trainings" ON public.provider_trainings FOR ALL USING (true);

CREATE POLICY "Staff can view insurance" ON public.insurance_policies FOR SELECT USING (true);
CREATE POLICY "Staff can manage insurance" ON public.insurance_policies FOR ALL USING (true);

CREATE POLICY "Staff can view audit log" ON public.audit_log FOR SELECT USING (true);
CREATE POLICY "System can insert audit log" ON public.audit_log FOR INSERT WITH CHECK (true);

-- ============================================================
-- 10. AUTO-UPDATE TIMESTAMPS
-- ============================================================

CREATE OR REPLACE FUNCTION update_compliance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_compliance_items_timestamp
  BEFORE UPDATE ON public.compliance_items
  FOR EACH ROW EXECUTE FUNCTION update_compliance_updated_at();

CREATE TRIGGER update_incidents_timestamp
  BEFORE UPDATE ON public.incidents
  FOR EACH ROW EXECUTE FUNCTION update_compliance_updated_at();

CREATE TRIGGER update_credentials_timestamp
  BEFORE UPDATE ON public.provider_credentials
  FOR EACH ROW EXECUTE FUNCTION update_compliance_updated_at();

CREATE TRIGGER update_trainings_timestamp
  BEFORE UPDATE ON public.provider_trainings
  FOR EACH ROW EXECUTE FUNCTION update_compliance_updated_at();

CREATE TRIGGER update_insurance_timestamp
  BEFORE UPDATE ON public.insurance_policies
  FOR EACH ROW EXECUTE FUNCTION update_compliance_updated_at();

-- ============================================================
-- 11. HELPER FUNCTIONS
-- ============================================================

-- Generate incident number
CREATE OR REPLACE FUNCTION generate_incident_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part VARCHAR(4);
  seq_num INT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(incident_number FROM 10) AS INT)), 0) + 1
  INTO seq_num
  FROM public.incidents
  WHERE incident_number LIKE 'INC-' || year_part || '-%';
  
  NEW.incident_number := 'INC-' || year_part || '-' || LPAD(seq_num::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_incident_number
  BEFORE INSERT ON public.incidents
  FOR EACH ROW
  WHEN (NEW.incident_number IS NULL)
  EXECUTE FUNCTION generate_incident_number();

-- Get expiring credentials (for alerts)
CREATE OR REPLACE FUNCTION get_expiring_credentials(days_ahead INT DEFAULT 60)
RETURNS TABLE (
  credential_id UUID,
  provider_id UUID,
  credential_name VARCHAR,
  expiration_date DATE,
  days_until_expiration INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pc.id,
    pc.provider_id,
    pc.name,
    pc.expiration_date,
    (pc.expiration_date - CURRENT_DATE)::INT
  FROM public.provider_credentials pc
  WHERE pc.expiration_date <= CURRENT_DATE + days_ahead
    AND pc.status != 'expired'
  ORDER BY pc.expiration_date ASC;
END;
$$ LANGUAGE plpgsql;

-- Get compliance summary
CREATE OR REPLACE FUNCTION get_compliance_summary()
RETURNS TABLE (
  total_items INT,
  compliant INT,
  non_compliant INT,
  pending INT,
  expires_soon INT,
  compliance_percentage DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INT,
    COUNT(*) FILTER (WHERE status = 'compliant')::INT,
    COUNT(*) FILTER (WHERE status = 'non_compliant')::INT,
    COUNT(*) FILTER (WHERE status = 'pending')::INT,
    COUNT(*) FILTER (WHERE status = 'expires_soon')::INT,
    ROUND(
      (COUNT(*) FILTER (WHERE status = 'compliant')::DECIMAL / NULLIF(COUNT(*), 0)) * 100,
      1
    )
  FROM public.compliance_items;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 12. INITIAL COMPLIANCE ITEMS (seed data)
-- ============================================================

INSERT INTO public.compliance_items (item_key, category, title, description, required, frequency) VALUES
-- Licensing
('business_license', 'licensing', 'Business License', 'Valid state/local business license for med spa operations', true, 'annual'),
('medical_director', 'licensing', 'Medical Director Agreement', 'Written agreement with supervising physician (required in IL)', true, 'annual'),
('np_license', 'licensing', 'NP/PA License', 'Valid Illinois APRN license for all nurse practitioners', true, 'annual'),
('laser_certification', 'licensing', 'Laser Operator Certification', 'Required certification for laser equipment operators', true, 'annual'),

-- Insurance
('malpractice_insurance', 'insurance', 'Professional Liability (Malpractice) Insurance', 'Coverage for medical malpractice claims - minimum $1M/$3M recommended', true, 'annual'),
('general_liability', 'insurance', 'General Liability Insurance', 'Slip/fall, property damage coverage', true, 'annual'),
('workers_comp', 'insurance', 'Workers Compensation Insurance', 'Required if you have employees', true, 'annual'),
('cyber_liability', 'insurance', 'Cyber Liability Insurance', 'Coverage for data breaches and HIPAA violations', true, 'annual'),

-- HIPAA
('hipaa_policies', 'hipaa', 'HIPAA Policies & Procedures', 'Written policies for PHI handling', true, 'annual'),
('hipaa_training', 'hipaa', 'HIPAA Training', 'Annual HIPAA training for all staff', true, 'annual'),
('baa_agreements', 'hipaa', 'Business Associate Agreements', 'BAAs with all vendors who access PHI', true, 'once'),

-- OSHA
('bloodborne_pathogens', 'osha', 'Bloodborne Pathogens Training', 'Annual training for staff handling blood/bodily fluids', true, 'annual'),
('sharps_disposal', 'osha', 'Sharps Disposal Program', 'Proper needle/sharps disposal containers and pickup', true, 'monthly'),

-- Training
('cpr_certification', 'training', 'CPR/BLS Certification', 'Current CPR certification for all clinical staff', true, 'annual'),
('emergency_protocols', 'training', 'Emergency Protocol Training', 'Training on anaphylaxis, vascular occlusion response', true, 'annual'),

-- Equipment
('emergency_kit', 'equipment', 'Emergency Kit Inventory', 'Epi-pens, hyaluronidase, emergency medications current and accessible', true, 'monthly')

ON CONFLICT (item_key) DO NOTHING;

-- ============================================================
-- Done! Your compliance system is ready.
-- ============================================================
