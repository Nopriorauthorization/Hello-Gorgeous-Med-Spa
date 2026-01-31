// ============================================================
// STRIPE WEBHOOK HANDLER
// Handles Stripe events (payment success, refunds, etc.)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Disable body parsing for webhooks (we need raw body)
export const runtime = 'nodejs';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 400 }
        );
      }
    } else {
      // If no webhook secret, parse event without verification (dev only)
      event = JSON.parse(body) as Stripe.Event;
      console.warn('⚠️ Webhook signature not verified - add STRIPE_WEBHOOK_SECRET for production');
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('💰 Payment succeeded:', paymentIntent.id);
        console.log('   Amount:', paymentIntent.amount / 100);
        console.log('   Client:', paymentIntent.metadata?.clientName);
        console.log('   Services:', paymentIntent.metadata?.services);
        
        // TODO: Update appointment/payment record in database
        // TODO: Send receipt email
        // TODO: Update client's payment history
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('❌ Payment failed:', paymentIntent.id);
        console.error('   Error:', paymentIntent.last_payment_error?.message);
        
        // TODO: Log failed payment attempt
        // TODO: Notify staff
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('↩️ Refund processed:', charge.id);
        console.log('   Amount refunded:', charge.amount_refunded / 100);
        
        // TODO: Update payment record with refund
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        console.warn('⚠️ Dispute created:', dispute.id);
        console.warn('   Amount:', dispute.amount / 100);
        
        // TODO: Alert owner about dispute
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
