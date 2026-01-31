# SMS Marketing Guide

**Hello Gorgeous Med Spa - SMS Campaign Manual**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Accessing SMS Campaigns](#accessing-sms-campaigns)
3. [Composing a Campaign](#composing-a-campaign)
4. [Templates](#templates)
5. [Sending a Test](#sending-a-test)
6. [Launching a Campaign](#launching-a-campaign)
7. [Compliance (TCPA)](#compliance-tcpa)
8. [Cost Calculator](#cost-calculator)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### Your SMS Number
```
+1 (331) 717-7545
```

### Provider
**Telnyx** - Direct carrier integration

### Cost Comparison
| Provider | Cost per 3,000 texts |
|----------|---------------------|
| Fresha | $150 |
| **Hello Gorgeous OS** | **~$12** |
| **Your Savings** | **$138 per campaign** |

---

## Accessing SMS Campaigns

### URL
```
https://www.hellogorgeousmedspa.com/admin/sms
```

### Navigation
Admin Panel → Growth → SMS Campaigns

---

## Composing a Campaign

### Step 1: Choose a Template (Optional)
Click any quick template to start:
- Flash Sale
- Birthday Offer
- Appointment Reminder
- Re-engagement
- And more...

### Step 2: Write Your Message
- Type in the message box
- Use personalization: `{{firstName}}`
- Keep under 160 characters for single SMS
- System auto-adds opt-out language

### Step 3: Add Image (Optional - MMS)
- Enter image URL for MMS
- MMS costs $0.015 vs $0.004 for SMS
- Use for promotions with visuals

### Step 4: Select Recipients
**All Clients:** Sends to everyone with SMS opt-in (~3,000)  
**Custom List:** Enter specific phone numbers

---

## Templates

### Available Templates

| Template | Category | Best For |
|----------|----------|----------|
| Flash Sale | Promotional | Limited-time offers |
| Birthday Offer | Promotional | Birthday month specials |
| Appointment Reminder | Reminder | 24-48 hour reminders |
| Follow-up | Post-Visit | Thank you + rebooking |
| Re-engagement | Win-back | Clients who haven't visited |
| New Service | Announcement | Launching new treatments |
| Holiday Special | Seasonal | Holiday promotions |

### Template Variables
```
{{firstName}} - Client's first name
{{appointmentDate}} - Scheduled date
{{appointmentTime}} - Scheduled time
{{serviceName}} - Booked service
```

---

## Sending a Test

**ALWAYS send a test before launching a campaign!**

1. Click "Send Test to Myself"
2. Enter your phone number
3. Check your phone for the message
4. Verify formatting and links

---

## Launching a Campaign

### Pre-Launch Checklist
```
□ Message is clear and concise
□ Opt-out language included (auto-added)
□ Test message received and looks good
□ Recipients selected correctly
□ Cost estimate reviewed
```

### Launching
1. Review the cost estimate
2. Click "Send Campaign"
3. Confirm the send
4. Campaign runs in background

### Rate Limits
- **Local Number:** 2 messages per minute
- **3,000 clients = ~25 hours** (runs overnight)
- Upgrade to 10DLC for faster sending (60+ msg/sec)

---

## Compliance (TCPA)

### Required Elements

**1. Opt-Out Language**
Every message must include opt-out instructions.
System automatically adds: `Reply STOP to unsubscribe`

**2. Sender Identification**
Messages should identify Hello Gorgeous Med Spa

**3. Consent**
Only text clients who have opted in to SMS marketing

### Keywords (Auto-Handled)

| Keyword | Response |
|---------|----------|
| STOP | Unsubscribes client |
| HELP | Sends business contact info |
| START | Re-subscribes client |

### What NOT to Do
- ❌ Text clients who haven't opted in
- ❌ Send messages without opt-out
- ❌ Send at inappropriate hours (before 8am, after 9pm)
- ❌ Send misleading content

---

## Cost Calculator

### SMS (Text Only)
```
Per message: $0.004
1,000 messages: $4.00
3,000 messages: $12.00
```

### MMS (With Image)
```
Per message: $0.015
1,000 messages: $15.00
3,000 messages: $45.00
```

### Monthly Estimate
| Campaigns/Month | SMS Cost | MMS Cost |
|-----------------|----------|----------|
| 1 | $12 | $45 |
| 2 | $24 | $90 |
| 4 | $48 | $180 |

**Compare to Fresha:** $150 per blast × 4 = $600/month  
**Your cost:** $48/month (SMS) = **$552 savings**

---

## Troubleshooting

### Message Not Delivered
1. Verify phone number format (10 digits)
2. Check if client opted out
3. Landlines cannot receive SMS

### Campaign Taking Too Long
- Local numbers limited to 2/min
- Large campaigns run overnight
- Consider 10DLC registration for speed

### Client Says They Didn't Receive
1. Check if they texted STOP previously
2. Verify their phone number is correct
3. Check their phone isn't blocking unknown numbers

### Cost Higher Than Expected
- MMS (images) cost 4x more than SMS
- Messages over 160 chars = multiple segments
- Check character count before sending

---

## Best Practices

### Timing
- **Best days:** Tuesday, Wednesday, Thursday
- **Best times:** 10am-12pm, 2pm-4pm
- **Avoid:** Before 8am, after 9pm, Sundays

### Message Length
- Keep under 160 characters when possible
- Longer = multiple segments = higher cost

### Frequency
- Maximum 4-6 campaigns per month
- Don't over-message (leads to opt-outs)

### Content That Works
- Limited-time offers with urgency
- Birthday/anniversary specials
- Flash sales
- Appointment reminders
- Exclusive member offers

---

## Quick Reference

### Your SMS Number
```
+1 (331) 717-7545
```

### Campaign URL
```
hellogorgeousmedspa.com/admin/sms
```

### Support Keywords
- **STOP** - Unsubscribe
- **HELP** - Get support info
- **START** - Resubscribe

---

*This guide covers SMS marketing operations. For compliance questions, consult the HIPAA policy.*
