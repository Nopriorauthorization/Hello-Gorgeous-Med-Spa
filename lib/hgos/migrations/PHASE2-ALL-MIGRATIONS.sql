-- ============================================================
-- PHASE 2: ALL MIGRATIONS COMBINED
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. INVENTORY TRACKING SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(50) NOT NULL CHECK (category IN ('neurotoxin', 'filler', 'biostimulator', 'skin_booster', 'vitamin', 'skincare', 'supplies', 'other')),
  sku VARCHAR(100) UNIQUE,
  unit_type VARCHAR(50) DEFAULT 'units',
  cost_per_unit DECIMAL(10,2) DEFAULT 0,
  price_per_unit DECIMAL(10,2) DEFAULT 0,
  reorder_point INTEGER DEFAULT 10,
  is_controlled BOOLEAN DEFAULT FALSE,
  requires_lot_tracking BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  lot_number VARCHAR(100) NOT NULL,
  quantity_received INTEGER NOT NULL,
  quantity_remaining INTEGER NOT NULL,
  cost_per_unit DECIMAL(10,2),
  expiration_date DATE NOT NULL,
  received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  received_by UUID REFERENCES users(id),
  supplier VARCHAR(255),
  invoice_number VARCHAR(100),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'depleted', 'recalled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  lot_id UUID REFERENCES inventory_lots(id),
  transaction_type VARCHAR(30) NOT NULL CHECK (transaction_type IN ('receive', 'use', 'adjust', 'waste', 'transfer', 'return')),
  quantity INTEGER NOT NULL,
  appointment_id UUID REFERENCES appointments(id),
  client_id UUID REFERENCES clients(id),
  provider_id UUID REFERENCES providers(id),
  performed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inventory_lots_item ON inventory_lots(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_lots_expiration ON inventory_lots(expiration_date);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_item ON inventory_transactions(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_date ON inventory_transactions(created_at);

-- ============================================================
-- 2. GIFT CARD SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) NOT NULL UNIQUE,
  initial_amount DECIMAL(10,2) NOT NULL,
  current_balance DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired', 'cancelled')),
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  gift_message TEXT,
  purchaser_name VARCHAR(255),
  purchaser_email VARCHAR(255),
  purchaser_client_id UUID REFERENCES clients(id),
  purchase_transaction_id UUID REFERENCES transactions(id),
  sold_by UUID REFERENCES users(id),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gift_card_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_card_id UUID NOT NULL REFERENCES gift_cards(id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('purchase', 'redemption', 'refund', 'adjustment')),
  amount DECIMAL(10,2) NOT NULL,
  balance_before DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  related_transaction_id UUID REFERENCES transactions(id),
  appointment_id UUID REFERENCES appointments(id),
  performed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_status ON gift_cards(status);
CREATE INDEX IF NOT EXISTS idx_gift_card_transactions_card ON gift_card_transactions(gift_card_id);

-- ============================================================
-- 3. MEDICATIONS ADMINISTERED LOG
-- ============================================================

CREATE TABLE IF NOT EXISTS medications_administered (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id),
  chart_note_id UUID REFERENCES chart_notes(id),
  client_id UUID NOT NULL REFERENCES clients(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  medication_name VARCHAR(255) NOT NULL,
  medication_type VARCHAR(50) CHECK (medication_type IN ('neurotoxin', 'filler', 'biostimulator', 'skin_booster', 'vitamin', 'prp', 'other')),
  brand VARCHAR(100),
  quantity DECIMAL(10,2) NOT NULL,
  unit_type VARCHAR(20) DEFAULT 'units',
  lot_number VARCHAR(100),
  expiration_date DATE,
  inventory_lot_id UUID REFERENCES inventory_lots(id),
  treatment_areas TEXT[],
  injection_sites JSONB,
  notes TEXT,
  adverse_reactions TEXT,
  administered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  recorded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_medications_client ON medications_administered(client_id);
CREATE INDEX IF NOT EXISTS idx_medications_provider ON medications_administered(provider_id);
CREATE INDEX IF NOT EXISTS idx_medications_date ON medications_administered(administered_at);
CREATE INDEX IF NOT EXISTS idx_medications_type ON medications_administered(medication_type);
CREATE INDEX IF NOT EXISTS idx_medications_lot ON medications_administered(lot_number);

-- ============================================================
-- 4. MEMBERSHIP SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle VARCHAR(20) DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly')),
  commitment_months INTEGER DEFAULT 0,
  benefits JSONB DEFAULT '[]',
  included_services JSONB DEFAULT '[]',
  discount_percent INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  plan_id UUID NOT NULL REFERENCES membership_plans(id),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'past_due', 'expired')),
  price_locked DECIMAL(10,2),
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  next_billing_date DATE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  credits_remaining DECIMAL(10,2) DEFAULT 0,
  credits_reset_date DATE,
  sold_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS membership_benefit_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES memberships(id) ON DELETE CASCADE,
  benefit_type VARCHAR(50) NOT NULL,
  benefit_description TEXT,
  amount_used DECIMAL(10,2),
  related_transaction_id UUID REFERENCES transactions(id),
  related_appointment_id UUID REFERENCES appointments(id),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_memberships_client ON memberships(client_id);
CREATE INDEX IF NOT EXISTS idx_memberships_status ON memberships(status);
CREATE INDEX IF NOT EXISTS idx_membership_usage_membership ON membership_benefit_usage(membership_id);

-- Insert default membership plans
INSERT INTO membership_plans (name, description, price, billing_cycle, commitment_months, benefits, discount_percent)
VALUES 
  ('VIP Annual', 'Premium annual membership with exclusive benefits', 299, 'yearly', 12, 
   '["10% off all services", "Free vitamin injection monthly", "Priority booking", "Birthday gift ($50 value)", "Exclusive member events"]'::jsonb, 10),
  ('Glow Monthly', 'Monthly skincare membership with treatment credits', 149, 'monthly', 0,
   '["$150 treatment credit (use it or lose it)", "15% off skincare products", "Free signature facial monthly"]'::jsonb, 0),
  ('Botox Club', 'Monthly Botox membership for regular clients', 199, 'monthly', 6,
   '["20 units Botox monthly", "20% off additional units", "Free touch-ups within 14 days"]'::jsonb, 0)
ON CONFLICT DO NOTHING;

-- ============================================================
-- 5. CONSENT IMMUTABILITY (COMPLIANCE)
-- ============================================================

-- Add audit columns to consent_submissions if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consent_submissions' AND column_name = 'ip_address') THEN
    ALTER TABLE consent_submissions ADD COLUMN ip_address INET;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consent_submissions' AND column_name = 'user_agent') THEN
    ALTER TABLE consent_submissions ADD COLUMN user_agent TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consent_submissions' AND column_name = 'consent_version') THEN
    ALTER TABLE consent_submissions ADD COLUMN consent_version VARCHAR(20) DEFAULT '1.0';
  END IF;
END $$;

-- Consent audit log
CREATE TABLE IF NOT EXISTS consent_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_submission_id UUID NOT NULL REFERENCES consent_submissions(id),
  action VARCHAR(50) NOT NULL,
  performed_by UUID REFERENCES users(id),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consent_audit_submission ON consent_audit_log(consent_submission_id);

-- ============================================================
-- 6. ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications_administered ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_benefit_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_audit_log ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view data
CREATE POLICY IF NOT EXISTS "view_inventory_items" ON inventory_items FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_inventory_lots" ON inventory_lots FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_inventory_transactions" ON inventory_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_gift_cards" ON gift_cards FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_gift_card_transactions" ON gift_card_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_medications" ON medications_administered FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_membership_plans" ON membership_plans FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "view_memberships" ON memberships FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_benefit_usage" ON membership_benefit_usage FOR SELECT TO authenticated USING (true);
CREATE POLICY IF NOT EXISTS "view_consent_audit" ON consent_audit_log FOR SELECT TO authenticated USING (true);

-- ============================================================
-- DONE! All Phase 2 tables created.
-- ============================================================
