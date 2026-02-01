// ============================================================
// API: PROVIDERS - Full CRUD
// Manage bookable providers/staff
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/hgos/supabase';

// GET /api/providers - List all providers
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const { data: providers, error } = await supabase
      .from('providers')
      .select(`
        id,
        user_id,
        credentials,
        color_hex,
        is_active,
        users!inner(id, first_name, last_name, email)
      `)
      .order('is_active', { ascending: false })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Providers fetch error:', error);
      return NextResponse.json({ providers: [] });
    }

    // Flatten the data
    const formatted = (providers || []).map(p => ({
      id: p.id,
      user_id: p.user_id,
      first_name: p.users?.first_name,
      last_name: p.users?.last_name,
      email: p.users?.email,
      credentials: p.credentials,
      color_hex: p.color_hex || '#EC4899',
      is_active: p.is_active,
    }));

    return NextResponse.json({ providers: formatted });
  } catch (error) {
    console.error('Providers GET error:', error);
    return NextResponse.json({ providers: [] });
  }
}

// POST /api/providers - Create new provider
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const { user_id, credentials, color_hex } = body;

    if (!user_id) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    // Check if already a provider
    const { data: existing } = await supabase
      .from('providers')
      .select('id')
      .eq('user_id', user_id)
      .single();

    if (existing) {
      // Reactivate if exists
      const { error } = await supabase
        .from('providers')
        .update({ is_active: true, credentials, color_hex })
        .eq('id', existing.id);

      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Provider reactivated' });
    }

    // Create new provider
    const { data: newProvider, error } = await supabase
      .from('providers')
      .insert({
        user_id,
        credentials: credentials || null,
        color_hex: color_hex || '#EC4899',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Provider create error:', error);
      return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 });
    }

    return NextResponse.json({ success: true, provider: newProvider });
  } catch (error) {
    console.error('Providers POST error:', error);
    return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 });
  }
}

// PUT /api/providers - Update provider
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const { id, credentials, color_hex, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const update: any = {};
    if (credentials !== undefined) update.credentials = credentials;
    if (color_hex !== undefined) update.color_hex = color_hex;
    if (is_active !== undefined) update.is_active = is_active;
    update.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('providers')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Provider update error:', error);
      return NextResponse.json({ error: 'Failed to update provider' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Provider updated' });
  } catch (error) {
    console.error('Providers PUT error:', error);
    return NextResponse.json({ error: 'Failed to update provider' }, { status: 500 });
  }
}

// DELETE /api/providers - Soft delete (deactivate) provider
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Soft delete - just deactivate
    const { error } = await supabase
      .from('providers')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Provider delete error:', error);
      return NextResponse.json({ error: 'Failed to remove provider' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Provider removed' });
  } catch (error) {
    console.error('Providers DELETE error:', error);
    return NextResponse.json({ error: 'Failed to remove provider' }, { status: 500 });
  }
}
