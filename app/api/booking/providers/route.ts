// ============================================================
// API: GET PROVIDERS FOR A SERVICE
// Returns providers who can perform a specific service
// Checks database first, falls back to logic-based assignment
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/hgos/supabase';

// Fallback provider data (used when database isn't populated)
const FALLBACK_PROVIDERS = [
  {
    id: 'danielle-001',
    name: 'Danielle Glazier-Alcala',
    title: 'Owner & Aesthetic Specialist',
    color: '#EC4899',
    schedule: {
      0: null, // Sunday
      1: { start: '11:00', end: '16:00' }, // Monday
      2: { start: '11:00', end: '16:00' }, // Tuesday
      3: null, // Wednesday
      4: { start: '11:00', end: '16:00' }, // Thursday
      5: { start: '11:00', end: '16:00' }, // Friday
      6: null, // Saturday
    },
    serviceKeywords: ['lash', 'brow', 'facial', 'dermaplanning', 'hydra', 'peel', 'lamination', 'wax', 'extension', 'lift', 'tint', 'glow', 'geneo', 'frequency'],
  },
  {
    id: 'ryan-001',
    name: 'Ryan Kent',
    title: 'APRN, FNP-BC',
    color: '#8B5CF6',
    schedule: {
      0: null, // Sunday
      1: { start: '10:00', end: '17:00' }, // Monday
      2: { start: '10:00', end: '17:00' }, // Tuesday
      3: { start: '10:00', end: '17:00' }, // Wednesday
      4: null, // Thursday
      5: { start: '10:00', end: '15:00' }, // Friday
      6: null, // Saturday
    },
    serviceKeywords: ['botox', 'filler', 'jeuveau', 'dysport', 'lip', 'semaglutide', 'tirzepatide', 'retatrutide', 'weight', 'iv', 'vitamin', 'prp', 'pellet', 'hormone', 'bhrt', 'medical', 'trigger', 'kybella', 'consult', 'laser', 'ipl', 'photofacial', 'anteage'],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');
  const serviceSlug = searchParams.get('serviceSlug');

  if (!serviceId && !serviceSlug) {
    return NextResponse.json(
      { error: 'serviceId or serviceSlug required' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();

    // Try to get service from database
    let service = null;
    if (serviceId) {
      const { data } = await supabase
        .from('services')
        .select('id, slug, provider_ids')
        .eq('id', serviceId)
        .single();
      service = data;
    } else if (serviceSlug) {
      const { data } = await supabase
        .from('services')
        .select('id, slug, provider_ids')
        .eq('slug', serviceSlug)
        .single();
      service = data;
    }

    // If service has provider_ids in database, fetch those providers
    if (service?.provider_ids && service.provider_ids.length > 0) {
      const { data: providers } = await supabase
        .from('providers')
        .select(`
          id,
          color_hex,
          users!inner(first_name, last_name),
          credentials
        `)
        .in('id', service.provider_ids);

      // Get schedules for these providers
      const { data: schedules } = await supabase
        .from('provider_schedules')
        .select('*')
        .in('provider_id', service.provider_ids);

      if (providers && providers.length > 0) {
        const formattedProviders = providers.map((p: any) => {
          // Build schedule object
          const providerSchedules = schedules?.filter((s: any) => s.provider_id === p.id) || [];
          const schedule: any = {};
          for (let day = 0; day <= 6; day++) {
            const daySchedule = providerSchedules.find((s: any) => s.day_of_week === day);
            if (daySchedule && daySchedule.is_working) {
              schedule[day] = {
                start: daySchedule.start_time?.slice(0, 5),
                end: daySchedule.end_time?.slice(0, 5),
              };
            } else {
              schedule[day] = null;
            }
          }

          return {
            id: p.id,
            name: `${p.users.first_name} ${p.users.last_name}`,
            title: p.credentials || 'Provider',
            color: p.color_hex || '#EC4899',
            schedule,
          };
        });

        return NextResponse.json({ providers: formattedProviders, source: 'database' });
      }
    }

    // Fallback: Use keyword matching
    const slug = service?.slug || serviceSlug || '';
    const matchingProviders = FALLBACK_PROVIDERS.filter((provider) =>
      provider.serviceKeywords.some((keyword) => slug.toLowerCase().includes(keyword))
    );

    // If no matches, return all providers
    const providers = matchingProviders.length > 0 ? matchingProviders : FALLBACK_PROVIDERS;

    // Remove serviceKeywords from response
    const cleanProviders = providers.map(({ serviceKeywords, ...rest }) => rest);

    return NextResponse.json({ providers: cleanProviders, source: 'fallback' });
  } catch (error) {
    console.error('Error fetching providers:', error);
    
    // Return fallback on any error
    const cleanProviders = FALLBACK_PROVIDERS.map(({ serviceKeywords, ...rest }) => rest);
    return NextResponse.json({ providers: cleanProviders, source: 'error-fallback' });
  }
}
