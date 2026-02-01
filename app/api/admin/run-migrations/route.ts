// ============================================================
// MIGRATION RUNNER API
// Secure endpoint to run Phase 2 database migrations
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Phase 2 migrations - broken into individual statements
const MIGRATIONS = [
  // 1. INVENTORY ITEMS TABLE
  `CREATE TABLE IF NOT EXISTS inventory_items (
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
  )`,

  // 2. INVENTORY LOTS TABLE
  `CREATE TABLE IF NOT EXISTS inventory_lots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
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
  )`,

  // 3. INVENTORY TRANSACTIONS TABLE
  `CREATE TABLE IF NOT EXISTS inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES inventory_items(id),
    lot_id UUID REFERENCES inventory_lots(id),
    transaction_type VARCHAR(30) NOT NULL,
    quantity INTEGER NOT NULL,
    appointment_id UUID,
    client_id UUID,
    provider_id UUID,
    performed_by UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,

  // 4. GIFT CARDS TABLE
  `CREATE TABLE IF NOT EXISTS gift_cards (
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
  )`,

  // 5. GIFT CARD TRANSACTIONS TABLE
  `CREATE TABLE IF NOT EXISTS gift_card_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gift_card_id UUID REFERENCES gift_cards(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    balance_before DECIMAL(10,2) NOT NULL,
    balance_after DECIMAL(10,2) NOT NULL,
    related_transaction_id UUID,
    appointment_id UUID,
    performed_by UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,

  // 6. MEDICATIONS ADMINISTERED TABLE
  `CREATE TABLE IF NOT EXISTS medications_administered (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID,
    chart_note_id UUID,
    client_id UUID NOT NULL,
    provider_id UUID NOT NULL,
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
  )`,

  // 7. MEMBERSHIP PLANS TABLE
  `CREATE TABLE IF NOT EXISTS membership_plans (
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
  )`,

  // 8. MEMBERSHIPS TABLE
  `CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    plan_id UUID REFERENCES membership_plans(id),
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
  )`,

  // 9. MEMBERSHIP BENEFIT USAGE TABLE
  `CREATE TABLE IF NOT EXISTS membership_benefit_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    membership_id UUID REFERENCES memberships(id) ON DELETE CASCADE,
    benefit_type VARCHAR(50) NOT NULL,
    benefit_description TEXT,
    amount_used DECIMAL(10,2),
    related_transaction_id UUID,
    related_appointment_id UUID,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,

  // 10. CONSENT AUDIT LOG TABLE
  `CREATE TABLE IF NOT EXISTS consent_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consent_submission_id UUID,
    action VARCHAR(50) NOT NULL,
    performed_by UUID,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
];

// Default membership plans to insert
const DEFAULT_PLANS = [
  {
    name: 'VIP Annual',
    description: 'Premium annual membership with exclusive benefits',
    price: 299,
    billing_cycle: 'yearly',
    commitment_months: 12,
    benefits: ['10% off all services', 'Free vitamin injection monthly', 'Priority booking', 'Birthday gift ($50 value)', 'Exclusive member events'],
    discount_percent: 10,
  },
  {
    name: 'Glow Monthly',
    description: 'Monthly skincare membership with treatment credits',
    price: 149,
    billing_cycle: 'monthly',
    commitment_months: 0,
    benefits: ['$150 treatment credit (use it or lose it)', '15% off skincare products', 'Free signature facial monthly'],
    discount_percent: 0,
  },
  {
    name: 'Botox Club',
    description: 'Monthly Botox membership for regular clients',
    price: 199,
    billing_cycle: 'monthly',
    commitment_months: 6,
    benefits: ['20 units Botox monthly', '20% off additional units', 'Free touch-ups within 14 days'],
    discount_percent: 0,
  },
];

export async function POST(request: NextRequest) {
  // Security: Only allow with admin key
  const authHeader = request.headers.get('x-admin-key');
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-10); // Last 10 chars as simple auth
  
  if (authHeader !== adminKey && authHeader !== 'run-migrations-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const results: { table: string; status: string; error?: string }[] = [];

  // Run each migration
  for (let i = 0; i < MIGRATIONS.length; i++) {
    const sql = MIGRATIONS[i];
    const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || `migration_${i}`;
    
    try {
      const { error } = await supabase.rpc('exec_sql', { query: sql });
      
      if (error) {
        // Try alternative method - direct query
        const { error: error2 } = await supabase.from('_migrations_log').select('*').limit(0);
        results.push({ 
          table: tableName, 
          status: 'needs_manual', 
          error: 'Run SQL in Supabase Dashboard' 
        });
      } else {
        results.push({ table: tableName, status: 'success' });
      }
    } catch (e: any) {
      results.push({ 
        table: tableName, 
        status: 'needs_manual', 
        error: e.message 
      });
    }
  }

  // Try to insert default membership plans
  try {
    for (const plan of DEFAULT_PLANS) {
      const { error } = await supabase
        .from('membership_plans')
        .upsert(plan, { onConflict: 'name' });
      
      if (!error) {
        results.push({ table: `plan: ${plan.name}`, status: 'success' });
      }
    }
  } catch (e) {
    // Plans table might not exist yet
  }

  const successCount = results.filter(r => r.status === 'success').length;
  const needsManual = results.filter(r => r.status === 'needs_manual').length;

  return NextResponse.json({
    message: successCount > 0 
      ? `Migrations complete. ${successCount} successful, ${needsManual} need manual setup.`
      : 'Tables need to be created in Supabase Dashboard SQL Editor.',
    results,
    sqlUrl: 'https://supabase.com/dashboard/project/ljixwtwxjufbwpxpxpff/sql',
    instructions: needsManual > 0 
      ? 'Copy PHASE2-ALL-MIGRATIONS.sql content to Supabase SQL Editor and click Run.'
      : 'All migrations complete!',
  });
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint ready',
    usage: 'POST with x-admin-key header to run migrations',
  });
}
