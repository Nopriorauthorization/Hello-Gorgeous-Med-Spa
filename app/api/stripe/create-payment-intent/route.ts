// ============================================================
// CREATE PAYMENT INTENT API
// Creates a Stripe PaymentIntent for processing payments
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe, isStripeConfigured, CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      amount, 
      clientId, 
      clientName, 
      clientEmail,
      appointmentId,
      services,
      tipAmount = 0,
      metadata = {} 
    } = body;

    // Validate amount
    if (!amount || typeof amount !== 'number') {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const totalAmount = amount + (tipAmount || 0);

    if (totalAmount < MIN_AMOUNT) {
      return NextResponse.json(
        { error: `Amount must be at least $${MIN_AMOUNT}` },
        { status: 400 }
      );
    }

    if (totalAmount > MAX_AMOUNT) {
      return NextResponse.json(
        { error: `Amount cannot exceed $${MAX_AMOUNT}` },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(totalAmount),
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        clientId: clientId || '',
        clientName: clientName || '',
        appointmentId: appointmentId || '',
        services: services || '',
        tipAmount: tipAmount?.toString() || '0',
        subtotal: amount.toString(),
        ...metadata,
      },
      receipt_email: clientEmail || undefined,
      description: `Hello Gorgeous Med Spa - ${services || 'Services'}`,
      statement_descriptor_suffix: 'HGMEDSPA',
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
