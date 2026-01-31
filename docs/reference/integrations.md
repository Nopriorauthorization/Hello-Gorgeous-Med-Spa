# Integrations Guide

**Hello Gorgeous Med Spa - Third-Party Services**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Active Integrations

### Supabase (Database)

**Purpose:** Database, authentication, file storage

**Status:** ✅ Connected

**Dashboard:** https://supabase.com/dashboard

**Key Features:**
- PostgreSQL database
- Row-level security
- Real-time subscriptions
- File storage for photos

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

### Vercel (Hosting)

**Purpose:** Website hosting and deployment

**Status:** ✅ Connected

**Dashboard:** https://vercel.com/dashboard

**Custom Domain:** hellogorgeousmedspa.com

**Key Features:**
- Automatic deployments from GitHub
- SSL certificates
- Edge caching
- Environment variables

**DNS Managed:** Yes (nameservers point to Vercel)

---

### Telnyx (SMS)

**Purpose:** SMS and MMS marketing campaigns

**Status:** ✅ Connected

**Dashboard:** https://portal.telnyx.com

**Phone Number:** +1 (331) 717-7545

**Messaging Profile ID:** `40019c14-a962-41a6-8d90-976426c9299f`

**Environment Variables:**
```
TELNYX_API_KEY
TELNYX_PHONE_NUMBER
TELNYX_MESSAGING_PROFILE_ID
```

**Features:**
- SMS at $0.004/message
- MMS at $0.015/message
- TCPA-compliant keywords
- Delivery receipts

**Keywords Configured:**
- STOP → Unsubscribe
- HELP → Support info
- START → Resubscribe

---

### eFax (Faxing)

**Purpose:** Digital fax send/receive

**Status:** ✅ Connected (Portal Link)

**Dashboard:** https://efax.com/login

**Fax Number:** (630) 982-6014

**Account ID:** 6309826014

**Features:**
- Send faxes online
- Receive faxes as PDF
- Email notifications
- HIPAA compliant

---

### Zoho Mail (Email)

**Purpose:** Business email

**Status:** ✅ Connected

**Dashboard:** https://mail.zoho.com

**Email:** hello.gorgeous@hellogorgeousmedspa.com

**DNS Records Required:**
- MX records (mx.zoho.com, mx2.zoho.com, mx3.zoho.com)
- SPF record
- DKIM record

---

## Pending Integrations

### Stripe (Payments)

**Purpose:** Payment processing

**Status:** ⏳ Pending Setup

**Dashboard:** https://dashboard.stripe.com

**To Set Up:**
1. Create Stripe account at stripe.com
2. Complete business verification
3. Get API keys
4. Add to Vercel environment variables:
   ```
   STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   ```
5. Redeploy application

**Features (Once Connected):**
- Credit/debit card processing
- Apple Pay / Google Pay
- Automatic receipts
- Refund processing
- Subscription billing
- POS integration

**Processing Fees:**
- 2.9% + $0.30 per transaction
- No monthly fee

---

## Optional Future Integrations

### SendGrid / Mailgun (Email Marketing)

**Purpose:** Email campaign sending

**Why Needed:** For email blasts and automated emails

**Setup Required:**
1. Create account
2. Verify domain
3. Get API key
4. Add to environment variables

---

### Google Calendar Sync

**Purpose:** Two-way calendar sync

**Why Useful:** Sync appointments to personal calendar

**Setup Required:**
1. Enable Google Calendar API
2. OAuth configuration
3. Connect in settings

---

### QuickBooks / Xero (Accounting)

**Purpose:** Financial sync

**Why Useful:** Automatic bookkeeping

**Setup Required:**
1. Connect accounting software
2. Map payment types
3. Configure sync schedule

---

### Allergan / Galderma Rewards

**Purpose:** Loyalty program integration

**Why Useful:** Connect Alle/Aspire points

**Setup Required:**
1. Provider partnership agreement
2. API credentials
3. Point sync configuration

---

## Environment Variables Reference

### Currently Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Authentication
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://hellogorgeousmedspa.com

# SMS (Telnyx)
TELNYX_API_KEY=KEYxxx
TELNYX_PHONE_NUMBER=+13317177545
TELNYX_MESSAGING_PROFILE_ID=40019c14-a962-41a6-8d90-976426c9299f
```

### Pending (Stripe)

```bash
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

### Optional

```bash
# OpenAI (AI features)
OPENAI_API_KEY=sk-xxx

# Email
SENDGRID_API_KEY=SG.xxx
```

---

## Adding Environment Variables to Vercel

1. Go to https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Name: Variable name
   - Value: Variable value
   - Environment: Production (and Preview/Development if needed)
5. Click **Save**
6. **Redeploy** for changes to take effect

---

## Integration Security

### API Key Safety
- Never commit API keys to Git
- Use environment variables only
- Rotate keys if compromised
- Use least-privilege access

### Business Associate Agreements
All services handling PHI have signed BAAs:
- ✅ Supabase
- ✅ Vercel
- ✅ Telnyx
- ✅ eFax
- ✅ Stripe (when connected)
- ✅ Zoho

---

## Troubleshooting Integrations

### Supabase Not Connected
- Check environment variables in Vercel
- Verify URL and keys are correct
- Check Supabase dashboard for status

### SMS Not Sending
- Verify Telnyx API key
- Check phone number format
- Review Telnyx logs for errors
- Verify messaging profile assigned

### Email Not Receiving
- Check MX records in Vercel DNS
- Verify SPF and DKIM records
- Check spam folder
- Test with Zoho mail checker

### Payments Not Processing
- Verify Stripe keys (use live, not test)
- Check Stripe dashboard for errors
- Ensure account is fully verified

---

*Update this document when adding new integrations.*
