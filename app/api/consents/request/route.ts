import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient, isAdminConfigured } from '@/lib/hgos/supabase';
import { ConsentFormType, getConsentForm } from '@/lib/hgos/consent-forms';
import { randomBytes } from 'crypto';

// POST /api/consents/request - Send consent form request to client
export async function POST(request: NextRequest) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: 'Server not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      clientId,
      formTypes,
      appointmentId,
      sendVia = 'email',
    } = body;

    // Validate
    if (!clientId || !formTypes || !Array.isArray(formTypes) || formTypes.length === 0) {
      return NextResponse.json(
        { error: 'clientId and formTypes array are required' },
        { status: 400 }
      );
    }

    // Validate all form types
    for (const formType of formTypes) {
      if (!getConsentForm(formType as ConsentFormType)) {
        return NextResponse.json(
          { error: `Invalid form type: ${formType}` },
          { status: 400 }
        );
      }
    }

    const supabase = createAdminSupabaseClient();

    // Get client info
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id, user_id, users(email, first_name, last_name, phone)')
      .eq('id', clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Generate unique token
    const token = randomBytes(32).toString('hex');
    
    // Set expiration (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Determine send destination
    const user = client.users as any;
    const sentTo = sendVia === 'sms' ? user.phone : user.email;

    if (!sentTo) {
      return NextResponse.json(
        { error: `Client has no ${sendVia === 'sms' ? 'phone number' : 'email address'}` },
        { status: 400 }
      );
    }

    // Create consent request record
    const { data: consentRequest, error: insertError } = await supabase
      .from('consent_requests')
      .insert({
        client_id: clientId,
        form_types: formTypes,
        appointment_id: appointmentId || null,
        sent_via: sendVia,
        sent_to: sentTo,
        token,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating consent request:', insertError);
      return NextResponse.json(
        { error: 'Failed to create consent request' },
        { status: 500 }
      );
    }

    // Generate consent link
    const baseUrl = process.env.NEXTAUTH_URL || 'https://hellogorgeousmedspa.com';
    const consentLink = `${baseUrl}/consent/${token}`;

    // TODO: Actually send email/SMS here
    // For now, we'll return the link for testing
    // In production, integrate with SendGrid, Twilio, etc.

    const formNames = formTypes.map((ft: ConsentFormType) => getConsentForm(ft)?.shortName).join(', ');

    // Log the request (in real implementation, this would send the email)
    console.log(`
      📧 CONSENT REQUEST
      To: ${user.first_name} ${user.last_name} <${sentTo}>
      Forms: ${formNames}
      Link: ${consentLink}
      Expires: ${expiresAt.toLocaleDateString()}
    `);

    return NextResponse.json({
      success: true,
      consentRequest,
      consentLink,
      message: `Consent request sent to ${sentTo}`,
      formNames,
    });

  } catch (error) {
    console.error('Consent request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/consents/request?token=xxx - Get consent request by token (for public signing page)
export async function GET(request: NextRequest) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: 'Server not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
      .from('consent_requests')
      .select(`
        *,
        clients(
          id,
          users(first_name, last_name, email)
        )
      `)
      .eq('token', token)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Consent request not found' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Consent request has expired' },
        { status: 410 }
      );
    }

    // Check if already completed
    if (data.completed_at) {
      return NextResponse.json(
        { error: 'Consent forms have already been signed' },
        { status: 409 }
      );
    }

    // Get form details
    const forms = (data.form_types as ConsentFormType[]).map(ft => getConsentForm(ft)).filter(Boolean);

    return NextResponse.json({
      consentRequest: data,
      forms,
      client: data.clients,
    });

  } catch (error) {
    console.error('Consent request fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
