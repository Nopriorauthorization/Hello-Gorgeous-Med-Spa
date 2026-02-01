// ============================================================
// API: GIFT CARDS - Full CRUD
// Create, redeem, void gift cards
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/hgos/supabase';

// Generate random gift card code
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'HG-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET /api/gift-cards - List all gift cards
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabase
      .from('gift_cards')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`code.ilike.%${search}%,recipient_name.ilike.%${search}%,recipient_email.ilike.%${search}%`);
    }

    const { data: giftCards, error } = await query;

    if (error) {
      console.error('Gift cards fetch error:', error);
      return NextResponse.json({ giftCards: [] });
    }

    return NextResponse.json({ giftCards: giftCards || [] });
  } catch (error) {
    console.error('Gift cards GET error:', error);
    return NextResponse.json({ giftCards: [] });
  }
}

// POST /api/gift-cards - Create new gift card
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const { 
      initial_amount, 
      recipient_name, 
      recipient_email, 
      purchaser_name,
      message,
      expires_at 
    } = body;

    if (!initial_amount || initial_amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    // Generate unique code
    let code = generateCode();
    let attempts = 0;
    while (attempts < 10) {
      const { data: existing } = await supabase
        .from('gift_cards')
        .select('id')
        .eq('code', code)
        .single();
      
      if (!existing) break;
      code = generateCode();
      attempts++;
    }

    // Default expiration: 1 year from now
    const defaultExpiration = new Date();
    defaultExpiration.setFullYear(defaultExpiration.getFullYear() + 1);

    const { data: giftCard, error } = await supabase
      .from('gift_cards')
      .insert({
        code,
        initial_amount,
        current_balance: initial_amount,
        recipient_name: recipient_name || null,
        recipient_email: recipient_email || null,
        purchaser_name: purchaser_name || null,
        message: message || null,
        status: 'active',
        expires_at: expires_at || defaultExpiration.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Gift card create error:', error);
      return NextResponse.json({ error: 'Failed to create gift card' }, { status: 500 });
    }

    return NextResponse.json({ success: true, giftCard });
  } catch (error) {
    console.error('Gift cards POST error:', error);
    return NextResponse.json({ error: 'Failed to create gift card' }, { status: 500 });
  }
}

// PUT /api/gift-cards - Update gift card (redeem, void, etc)
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const { id, code, action, amount, ...data } = body;

    // Find by ID or code
    let giftCard;
    if (id) {
      const { data: gc } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('id', id)
        .single();
      giftCard = gc;
    } else if (code) {
      const { data: gc } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();
      giftCard = gc;
    }

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 });
    }

    // REDEEM action
    if (action === 'redeem') {
      if (!amount || amount <= 0) {
        return NextResponse.json({ error: 'Valid redemption amount required' }, { status: 400 });
      }

      if (giftCard.status !== 'active') {
        return NextResponse.json({ error: 'Gift card is not active' }, { status: 400 });
      }

      if (amount > giftCard.current_balance) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
      }

      const newBalance = giftCard.current_balance - amount;
      const newStatus = newBalance <= 0 ? 'redeemed' : 'active';

      const { error } = await supabase
        .from('gift_cards')
        .update({
          current_balance: newBalance,
          status: newStatus,
          last_used_at: new Date().toISOString(),
        })
        .eq('id', giftCard.id);

      if (error) throw error;

      // Log transaction
      await supabase
        .from('gift_card_transactions')
        .insert({
          gift_card_id: giftCard.id,
          transaction_type: 'redemption',
          amount: -amount,
          balance_after: newBalance,
        });

      return NextResponse.json({ 
        success: true, 
        message: `Redeemed $${amount}`,
        newBalance,
        status: newStatus,
      });
    }

    // VOID action
    if (action === 'void') {
      const { error } = await supabase
        .from('gift_cards')
        .update({
          status: 'voided',
          current_balance: 0,
          voided_at: new Date().toISOString(),
          void_reason: data.reason || 'Voided by admin',
        })
        .eq('id', giftCard.id);

      if (error) throw error;

      return NextResponse.json({ success: true, message: 'Gift card voided' });
    }

    // Regular UPDATE (edit details)
    const update: any = {};
    if (data.recipient_name !== undefined) update.recipient_name = data.recipient_name;
    if (data.recipient_email !== undefined) update.recipient_email = data.recipient_email;
    if (data.expires_at !== undefined) update.expires_at = data.expires_at;

    if (Object.keys(update).length > 0) {
      const { error } = await supabase
        .from('gift_cards')
        .update(update)
        .eq('id', giftCard.id);

      if (error) throw error;
    }

    return NextResponse.json({ success: true, message: 'Gift card updated' });
  } catch (error) {
    console.error('Gift cards PUT error:', error);
    return NextResponse.json({ error: 'Failed to update gift card' }, { status: 500 });
  }
}
