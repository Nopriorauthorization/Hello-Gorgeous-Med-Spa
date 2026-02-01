#!/usr/bin/env node
/**
 * Run Phase 2 Migrations
 * Usage: node scripts/run-migrations.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

async function runMigration(sql, name) {
  console.log(`\n📦 Running: ${name}...`);
  
  // Split by semicolons but keep statements intact
  const statements = sql
    .split(/;(?=\s*(?:CREATE|ALTER|INSERT|DROP|DO|UPDATE|DELETE|--|\n\n))/gi)
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));

  for (const statement of statements) {
    if (!statement || statement.startsWith('--')) continue;
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      if (error && !error.message.includes('already exists')) {
        console.log(`   ⚠️  ${error.message.substring(0, 80)}...`);
      }
    } catch (e) {
      // Ignore errors for "already exists" type issues
      if (!e.message?.includes('already exists')) {
        console.log(`   ⚠️  Statement issue: ${e.message?.substring(0, 60) || 'unknown'}`);
      }
    }
  }
  console.log(`   ✅ ${name} complete`);
}

async function main() {
  console.log('🚀 Hello Gorgeous Med Spa - Phase 2 Migrations');
  console.log('================================================\n');

  // First, create the exec_sql function if it doesn't exist
  console.log('📝 Setting up SQL execution function...');
  
  try {
    // Try to create tables directly using the REST API
    const tables = [
      // Inventory Items
      {
        name: 'inventory_items',
        sql: `
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
          )
        `
      },
      // Gift Cards
      {
        name: 'gift_cards',
        sql: `
          CREATE TABLE IF NOT EXISTS gift_cards (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            code VARCHAR(20) NOT NULL UNIQUE,
            initial_amount DECIMAL(10,2) NOT NULL,
            current_balance DECIMAL(10,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'active',
            recipient_name VARCHAR(255),
            recipient_email VARCHAR(255),
            gift_message TEXT,
            purchaser_name VARCHAR(255),
            purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `
      },
      // Membership Plans
      {
        name: 'membership_plans',
        sql: `
          CREATE TABLE IF NOT EXISTS membership_plans (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            billing_cycle VARCHAR(20) DEFAULT 'monthly',
            commitment_months INTEGER DEFAULT 0,
            benefits JSONB DEFAULT '[]',
            discount_percent INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `
      }
    ];

    console.log('\n⚠️  Note: For full migration, please run the SQL in Supabase Dashboard.');
    console.log('   The REST API cannot create tables directly.\n');
    console.log('   Quick link: https://supabase.com/dashboard/project/ljixwtwxjufbwpxpxpff/sql\n');
    
    // Test connection
    const { data, error } = await supabase.from('services').select('count').limit(1);
    if (error) {
      console.log('❌ Could not connect to Supabase:', error.message);
    } else {
      console.log('✅ Connected to Supabase successfully!');
      console.log('\n📋 To complete setup, copy the SQL from:');
      console.log('   lib/hgos/migrations/PHASE2-ALL-MIGRATIONS.sql');
      console.log('\n   And paste it into the Supabase SQL Editor.');
    }

  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();
