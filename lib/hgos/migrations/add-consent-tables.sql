-- ============================================================
-- HELLO GORGEOUS OS - CONSENT FORMS MIGRATION
-- Add tables for storing signed consent forms
-- ============================================================

-- Consent form type enum
CREATE TYPE consent_form_type AS ENUM (
  'general_consent',
  'hipaa_authorization',
  'arbitration_agreement',
  'liability_waiver',
  'photo_release',
  'cancellation_policy',
  'treatment_consent',
  'injectable_consent',
  'laser_consent',
  'weight_loss_consent',
  'chemical_peel_consent',
  'microneedling_consent'
);

-- Consent status enum
CREATE TYPE consent_status AS ENUM (
  'pending',
  'signed',
  'declined',
  'expired'
);

-- Signed consents table
CREATE TABLE IF NOT EXISTS public.signed_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  form_type consent_form_type NOT NULL,
  form_version VARCHAR(20) NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  signature_data TEXT NOT NULL, -- Base64 signature image or typed name
  signature_type VARCHAR(10) NOT NULL CHECK (signature_type IN ('drawn', 'typed')),
  ip_address INET,
  user_agent TEXT,
  witness_name VARCHAR(200),
  witness_signature TEXT,
  expires_at TIMESTAMPTZ,
  status consent_status NOT NULL DEFAULT 'signed',
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_signed_consents_client_id ON public.signed_consents(client_id);
CREATE INDEX idx_signed_consents_form_type ON public.signed_consents(form_type);
CREATE INDEX idx_signed_consents_status ON public.signed_consents(status);
CREATE INDEX idx_signed_consents_expires_at ON public.signed_consents(expires_at) WHERE expires_at IS NOT NULL;

-- Unique constraint: one active consent per form type per client
CREATE UNIQUE INDEX idx_signed_consents_active 
  ON public.signed_consents(client_id, form_type) 
  WHERE status = 'signed' AND (expires_at IS NULL OR expires_at > NOW());

-- Enable RLS
ALTER TABLE public.signed_consents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Clients can view their own consents"
  ON public.signed_consents FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM public.clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can sign their own consents"
  ON public.signed_consents FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT id FROM public.clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all consents"
  ON public.signed_consents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'provider', 'staff')
    )
  );

CREATE POLICY "Staff can manage consents"
  ON public.signed_consents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'provider')
    )
  );

-- Updated_at trigger
CREATE TRIGGER update_signed_consents_updated_at
  BEFORE UPDATE ON public.signed_consents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- CONSENT REQUESTS TABLE (for tracking sent consent requests)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.consent_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  form_types consent_form_type[] NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_via VARCHAR(20) NOT NULL CHECK (sent_via IN ('email', 'sms', 'link')),
  sent_to VARCHAR(255), -- email or phone
  token VARCHAR(100) UNIQUE NOT NULL, -- Unique link token
  expires_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_consent_requests_client_id ON public.consent_requests(client_id);
CREATE INDEX idx_consent_requests_token ON public.consent_requests(token);
CREATE INDEX idx_consent_requests_expires_at ON public.consent_requests(expires_at);

-- Enable RLS
ALTER TABLE public.consent_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Staff can manage consent requests"
  ON public.consent_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'provider', 'staff')
    )
  );

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Function to check if client has valid consent for a form type
CREATE OR REPLACE FUNCTION has_valid_consent(
  p_client_id UUID,
  p_form_type consent_form_type
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.signed_consents
    WHERE client_id = p_client_id
    AND form_type = p_form_type
    AND status = 'signed'
    AND (expires_at IS NULL OR expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get all missing consents for a client
CREATE OR REPLACE FUNCTION get_missing_consents(
  p_client_id UUID,
  p_required_forms consent_form_type[]
) RETURNS consent_form_type[] AS $$
DECLARE
  v_missing consent_form_type[];
BEGIN
  SELECT ARRAY_AGG(f)
  INTO v_missing
  FROM UNNEST(p_required_forms) AS f
  WHERE NOT has_valid_consent(p_client_id, f);
  
  RETURN COALESCE(v_missing, '{}');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- VIEWS FOR REPORTING
-- ============================================================

-- View: Consent compliance summary
CREATE OR REPLACE VIEW consent_compliance_summary AS
SELECT 
  c.id AS client_id,
  u.first_name,
  u.last_name,
  u.email,
  COUNT(DISTINCT sc.form_type) FILTER (WHERE sc.status = 'signed' AND (sc.expires_at IS NULL OR sc.expires_at > NOW())) AS valid_consents,
  COUNT(DISTINCT sc.form_type) FILTER (WHERE sc.status = 'signed' AND sc.expires_at IS NOT NULL AND sc.expires_at <= NOW() + INTERVAL '30 days' AND sc.expires_at > NOW()) AS expiring_soon,
  COUNT(DISTINCT sc.form_type) FILTER (WHERE sc.expires_at IS NOT NULL AND sc.expires_at <= NOW()) AS expired_consents,
  MAX(sc.signed_at) AS last_consent_signed
FROM public.clients c
JOIN public.users u ON c.user_id = u.id
LEFT JOIN public.signed_consents sc ON c.id = sc.client_id
GROUP BY c.id, u.first_name, u.last_name, u.email;

-- Grant permissions
GRANT SELECT ON consent_compliance_summary TO authenticated;
