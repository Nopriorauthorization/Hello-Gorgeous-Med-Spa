-- ============================================================
-- PHASE 2: ALL MIGRATIONS (SIMPLIFIED)
-- ============================================================

-- 1. INVENTORY ITEMS
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  sku VARCHAR(100),
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

-- 2. INVENTORY LOTS
CREATE TABLE IF NOT EXISTS inventory_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID,
  lot_number VARCHAR(100) NOT NULL,
  quantity_received INTEGER NOT NULL,
  quantity_remaining INTEGER NOT NULL,
  cost_per_unit DECIMAL(10,2),
  expiration_date DATE NOT NULL,
  received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  received_by UUID,
  supplier VARCHAR(255),
  invoice_number VARCHAR(100),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. INVENTORY TRANSACTIONS
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID,
  lot_id UUID,
  transaction_type VARCHAR(30) NOT NULL,
  quantity INTEGER NOT NULL,
  appointment_id UUID,
  client_id UUID,
  provider_id UUID,
  performed_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. GIFT CARDS
CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) NOT NULL UNIQUE,
  initial_amount DECIMAL(10,2) NOT NULL,
  current_balance DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  gift_message TEXT,
  purchaser_name VARCHAR(255),
  purchaser_email VARCHAR(255),
  purchaser_client_id UUID,
  purchase_transaction_id UUID,
  sold_by UUID,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. GIFT CARD TRANSACTIONS
CREATE TABLE IF NOT EXISTS gift_card_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_card_id UUID,
  transaction_type VARCHAR(20) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  balance_before DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  related_transaction_id UUID,
  appointment_id UUID,
  performed_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. MEDICATIONS ADMINISTERED
CREATE TABLE IF NOT EXISTS medications_administered (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID,
  chart_note_id UUID,
  client_id UUID,
  provider_id UUID,
  medication_name VARCHAR(255) NOT NULL,
  medication_type VARCHAR(50),
  brand VARCHAR(100),
  quantity DECIMAL(10,2) NOT NULL,
  unit_type VARCHAR(20) DEFAULT 'units',
  lot_number VARCHAR(100),
  expiration_date DATE,
  inventory_lot_id UUID,
  treatment_areas TEXT[],
  injection_sites JSONB,
  notes TEXT,
  adverse_reactions TEXT,
  administered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  recorded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. MEMBERSHIP PLANS
CREATE TABLE IF NOT EXISTS membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle VARCHAR(20) DEFAULT 'monthly',
  commitment_months INTEGER DEFAULT 0,
  benefits JSONB DEFAULT '[]',
  included_services JSONB DEFAULT '[]',
  discount_percent INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. MEMBERSHIPS
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  plan_id UUID,
  status VARCHAR(20) DEFAULT 'active',
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
  sold_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. MEMBERSHIP BENEFIT USAGE
CREATE TABLE IF NOT EXISTS membership_benefit_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID,
  benefit_type VARCHAR(50) NOT NULL,
  benefit_description TEXT,
  amount_used DECIMAL(10,2),
  related_transaction_id UUID,
  related_appointment_id UUID,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. CONSENT AUDIT LOG
CREATE TABLE IF NOT EXISTS consent_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_submission_id UUID,
  action VARCHAR(50) NOT NULL,
  performed_by UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INSERT DEFAULT MEMBERSHIP PLANS
INSERT INTO membership_plans (name, description, price, billing_cycle, commitment_months, benefits, discount_percent)
VALUES 
  ('VIP Annual', 'Premium annual membership', 299, 'yearly', 12, '["10% off all services", "Free vitamin injection monthly", "Priority booking"]'::jsonb, 10),
  ('Glow Monthly', 'Monthly skincare membership', 149, 'monthly', 0, '["$150 treatment credit", "15% off skincare products"]'::jsonb, 0),
  ('Botox Club', 'Monthly Botox membership', 199, 'monthly', 6, '["20 units Botox monthly", "20% off additional units"]'::jsonb, 0)
ON CONFLICT DO NOTHING;

-- DONE!
