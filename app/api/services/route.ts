// ============================================================
// API: SERVICES - Full CRUD with default data
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/hgos/supabase';

// Default categories for Hello Gorgeous Med Spa
const DEFAULT_CATEGORIES = [
  { id: 'cat-injectables', name: 'Injectables', slug: 'injectables', display_order: 1 },
  { id: 'cat-fillers', name: 'Dermal Fillers', slug: 'dermal-fillers', display_order: 2 },
  { id: 'cat-weight-loss', name: 'Weight Loss', slug: 'weight-loss', display_order: 3 },
  { id: 'cat-skin', name: 'Skin Treatments', slug: 'skin-treatments', display_order: 4 },
  { id: 'cat-iv', name: 'IV Therapy', slug: 'iv-therapy', display_order: 5 },
  { id: 'cat-laser', name: 'Laser Treatments', slug: 'laser-treatments', display_order: 6 },
  { id: 'cat-wellness', name: 'Wellness', slug: 'wellness', display_order: 7 },
  { id: 'cat-consults', name: 'Consultations', slug: 'consultations', display_order: 8 },
];

// Default services for Hello Gorgeous Med Spa
const DEFAULT_SERVICES = [
  // INJECTABLES
  {
    id: 'svc-botox',
    name: 'Botox',
    slug: 'botox',
    short_description: 'Smooth wrinkles & fine lines',
    description: 'FDA-approved treatment to reduce the appearance of facial wrinkles and fine lines. Results typically last 3-4 months.',
    category_id: 'cat-injectables',
    price_cents: 1200,
    price_display: '$12/unit',
    duration_minutes: 30,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-dysport',
    name: 'Dysport',
    slug: 'dysport',
    short_description: 'Natural-looking wrinkle reduction',
    description: 'A botulinum toxin treatment that smooths moderate to severe frown lines. Known for its natural-looking results.',
    category_id: 'cat-injectables',
    price_cents: 400,
    price_display: '$4/unit',
    duration_minutes: 30,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-jeuveau',
    name: 'Jeuveau',
    slug: 'jeuveau',
    short_description: 'Modern wrinkle treatment',
    description: 'The newest FDA-approved neurotoxin, sometimes called "Newtox". Great for frown lines and forehead wrinkles.',
    category_id: 'cat-injectables',
    price_cents: 1000,
    price_display: '$10/unit',
    duration_minutes: 30,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  // DERMAL FILLERS
  {
    id: 'svc-lip-filler',
    name: 'Lip Filler',
    slug: 'lip-filler',
    short_description: 'Fuller, more defined lips',
    description: 'Enhance lip volume and shape with hyaluronic acid fillers. Natural-looking results that last 6-12 months.',
    category_id: 'cat-fillers',
    price_cents: 65000,
    price_display: '$650',
    duration_minutes: 45,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-cheek-filler',
    name: 'Cheek Filler',
    slug: 'cheek-filler',
    short_description: 'Restore volume & contour',
    description: 'Add volume to cheeks for a lifted, youthful appearance. Uses premium hyaluronic acid fillers.',
    category_id: 'cat-fillers',
    price_cents: 75000,
    price_display: '$750',
    duration_minutes: 45,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-jawline-filler',
    name: 'Jawline Contouring',
    slug: 'jawline-contouring',
    short_description: 'Define & sculpt your jawline',
    description: 'Create a more defined jawline and chin profile with dermal fillers.',
    category_id: 'cat-fillers',
    price_cents: 80000,
    price_display: '$800',
    duration_minutes: 60,
    is_active: true,
    requires_consult: true,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-under-eye-filler',
    name: 'Under Eye Filler',
    slug: 'under-eye-filler',
    short_description: 'Reduce dark circles & hollows',
    description: 'Treat under-eye hollows and dark circles with specialized tear trough filler treatment.',
    category_id: 'cat-fillers',
    price_cents: 70000,
    price_display: '$700',
    duration_minutes: 45,
    is_active: true,
    requires_consult: true,
    requires_consent: true,
    allow_online_booking: true,
  },
  // WEIGHT LOSS
  {
    id: 'svc-semaglutide',
    name: 'Semaglutide Weight Loss',
    slug: 'semaglutide-weight-loss',
    short_description: 'Medical weight loss program',
    description: 'FDA-approved GLP-1 medication for weight management. Includes weekly injections and provider support.',
    category_id: 'cat-weight-loss',
    price_cents: 35000,
    price_display: '$350/month',
    duration_minutes: 30,
    is_active: true,
    requires_consult: true,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-tirzepatide',
    name: 'Tirzepatide Weight Loss',
    slug: 'tirzepatide-weight-loss',
    short_description: 'Advanced weight loss program',
    description: 'Dual-action GLP-1/GIP medication for significant weight loss. Includes weekly injections and monitoring.',
    category_id: 'cat-weight-loss',
    price_cents: 45000,
    price_display: '$450/month',
    duration_minutes: 30,
    is_active: true,
    requires_consult: true,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-lipo-b',
    name: 'Lipo-B Injection',
    slug: 'lipo-b-injection',
    short_description: 'Fat-burning vitamin shot',
    description: 'MIC + B12 injection to boost metabolism and support weight loss efforts.',
    category_id: 'cat-weight-loss',
    price_cents: 3500,
    price_display: '$35',
    duration_minutes: 15,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  // IV THERAPY
  {
    id: 'svc-myers-cocktail',
    name: "Myers' Cocktail IV",
    slug: 'myers-cocktail-iv',
    short_description: 'Ultimate wellness drip',
    description: 'Classic IV therapy with vitamins B & C, magnesium, and calcium for energy and immune support.',
    category_id: 'cat-iv',
    price_cents: 17500,
    price_display: '$175',
    duration_minutes: 45,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-immunity-iv',
    name: 'Immunity Boost IV',
    slug: 'immunity-boost-iv',
    short_description: 'High-dose vitamin C & zinc',
    description: 'Strengthen your immune system with high-dose Vitamin C, zinc, and B vitamins.',
    category_id: 'cat-iv',
    price_cents: 15000,
    price_display: '$150',
    duration_minutes: 45,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-beauty-iv',
    name: 'Beauty Glow IV',
    slug: 'beauty-glow-iv',
    short_description: 'Biotin & glutathione drip',
    description: 'Promote healthy skin, hair, and nails with biotin, glutathione, and vitamin C.',
    category_id: 'cat-iv',
    price_cents: 20000,
    price_display: '$200',
    duration_minutes: 60,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-hydration-iv',
    name: 'Hydration IV',
    slug: 'hydration-iv',
    short_description: 'Quick rehydration',
    description: 'Fast hydration with electrolytes. Perfect for recovery, hangovers, or general wellness.',
    category_id: 'cat-iv',
    price_cents: 12500,
    price_display: '$125',
    duration_minutes: 30,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  // SKIN TREATMENTS
  {
    id: 'svc-chemical-peel',
    name: 'Chemical Peel',
    slug: 'chemical-peel',
    short_description: 'Reveal fresh, glowing skin',
    description: 'Professional chemical exfoliation to improve skin texture, tone, and clarity.',
    category_id: 'cat-skin',
    price_cents: 15000,
    price_display: '$150',
    duration_minutes: 45,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-microneedling',
    name: 'Microneedling',
    slug: 'microneedling',
    short_description: 'Collagen-boosting treatment',
    description: 'Stimulate collagen production for smoother, firmer skin. Great for scars, wrinkles, and pores.',
    category_id: 'cat-skin',
    price_cents: 30000,
    price_display: '$300',
    duration_minutes: 60,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-prp-facial',
    name: 'PRP Facial (Vampire Facial)',
    slug: 'prp-facial',
    short_description: 'Natural rejuvenation',
    description: 'Combine microneedling with your own platelet-rich plasma for enhanced skin rejuvenation.',
    category_id: 'cat-skin',
    price_cents: 50000,
    price_display: '$500',
    duration_minutes: 75,
    is_active: true,
    requires_consult: true,
    requires_consent: true,
    allow_online_booking: true,
  },
  // WELLNESS
  {
    id: 'svc-b12-shot',
    name: 'B12 Injection',
    slug: 'b12-injection',
    short_description: 'Energy boost',
    description: 'Quick vitamin B12 injection for energy, metabolism, and mood support.',
    category_id: 'cat-wellness',
    price_cents: 2500,
    price_display: '$25',
    duration_minutes: 10,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  {
    id: 'svc-glutathione',
    name: 'Glutathione Injection',
    slug: 'glutathione-injection',
    short_description: 'Master antioxidant',
    description: 'Powerful antioxidant injection for detox, skin brightening, and immune support.',
    category_id: 'cat-wellness',
    price_cents: 3500,
    price_display: '$35',
    duration_minutes: 15,
    is_active: true,
    requires_consult: false,
    requires_consent: true,
    allow_online_booking: true,
  },
  // CONSULTATIONS
  {
    id: 'svc-consult-new',
    name: 'New Client Consultation',
    slug: 'new-client-consultation',
    short_description: 'Personalized treatment planning',
    description: 'Meet with our provider to discuss your goals and create a customized treatment plan.',
    category_id: 'cat-consults',
    price_cents: 0,
    price_display: 'Free',
    duration_minutes: 30,
    is_active: true,
    requires_consult: false,
    requires_consent: false,
    allow_online_booking: true,
  },
  {
    id: 'svc-consult-follow-up',
    name: 'Follow-Up Consultation',
    slug: 'follow-up-consultation',
    short_description: 'Check your progress',
    description: 'Review your treatment results and adjust your plan as needed.',
    category_id: 'cat-consults',
    price_cents: 0,
    price_display: 'Free',
    duration_minutes: 15,
    is_active: true,
    requires_consult: false,
    requires_consent: false,
    allow_online_booking: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    
    // Fetch services from database
    let servicesQuery = supabase
      .from('services')
      .select(`
        *,
        category:service_categories(id, name, slug)
      `)
      .order('name');

    if (activeOnly) {
      servicesQuery = servicesQuery.eq('is_active', true);
    }

    const { data: services, error: servicesError } = await servicesQuery;

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('service_categories')
      .select('id, name, slug, display_order')
      .order('display_order');

    // If we have data, return it
    if (services && services.length > 0) {
      return NextResponse.json({
        services: services,
        categories: categories || DEFAULT_CATEGORIES,
      });
    }

    // If no services in DB or error, return defaults
    console.log('No services in database, returning defaults. Error:', servicesError?.message);
    
    // Try to seed the database with defaults
    if (!services || services.length === 0) {
      // Seed categories first
      const { error: catSeedError } = await supabase
        .from('service_categories')
        .upsert(DEFAULT_CATEGORIES, { onConflict: 'id' });
      
      if (catSeedError) {
        console.log('Could not seed categories:', catSeedError.message);
      }

      // Seed services
      const { error: svcSeedError } = await supabase
        .from('services')
        .upsert(DEFAULT_SERVICES, { onConflict: 'id' });

      if (svcSeedError) {
        console.log('Could not seed services:', svcSeedError.message);
      }

      // Try fetching again after seeding
      const { data: seededServices } = await supabase
        .from('services')
        .select(`*, category:service_categories(id, name, slug)`)
        .order('name');

      const { data: seededCategories } = await supabase
        .from('service_categories')
        .select('id, name, slug, display_order')
        .order('display_order');

      if (seededServices && seededServices.length > 0) {
        return NextResponse.json({
          services: seededServices,
          categories: seededCategories || DEFAULT_CATEGORIES,
        });
      }
    }

    // Return defaults if all else fails
    return NextResponse.json({
      services: DEFAULT_SERVICES.map(s => ({
        ...s,
        category: DEFAULT_CATEGORIES.find(c => c.id === s.category_id) || null,
        price: s.price_cents / 100,
      })),
      categories: DEFAULT_CATEGORIES,
    });
  } catch (error) {
    console.error('Services API error:', error);
    // Return defaults on error
    return NextResponse.json({
      services: DEFAULT_SERVICES.map(s => ({
        ...s,
        category: DEFAULT_CATEGORIES.find(c => c.id === s.category_id) || null,
        price: s.price_cents / 100,
      })),
      categories: DEFAULT_CATEGORIES,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    // Generate ID if not provided
    if (!body.id) {
      body.id = `svc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    const { data, error } = await supabase
      .from('services')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Service create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, service: data });
  } catch (error) {
    console.error('Service POST error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Service update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, service: data });
  } catch (error) {
    console.error('Service PUT error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Service delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Service DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
