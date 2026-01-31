# POS Terminal Guide

**Hello Gorgeous Med Spa - Point of Sale Manual**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Overview

The POS Terminal handles:
- Processing payments for appointments
- Walk-in product sales
- Gift card sales and redemptions
- Tips and gratuities
- Refunds and adjustments

**Status:** Awaiting Stripe integration (currently shows demo data)

---

## Accessing POS

### URL
```
https://www.hellogorgeousmedspa.com/pos
```

### Navigation
- Admin Panel → POS Terminal button (header)
- Or directly via URL
- Or from admin sidebar → Daily Operations → POS Terminal

---

## POS Layout

### Left Panel (2/3 width)
- Search bar
- Ready for Checkout tab
- Scheduled tab
- Walk-in Sale tab
- Appointment list

### Right Panel (1/3 width)
- Selected appointment details
- Line items
- Discounts
- Tips
- Payment buttons
- Receipt options

---

## Processing an Appointment Payment

### Step 1: Find the Appointment
1. Open POS terminal
2. Use "Ready for Checkout" tab
3. Or search by client name

### Step 2: Select Appointment
1. Click on the appointment
2. Verify client name and service
3. Review line items on right panel

### Step 3: Add Any Extras
- Additional services performed
- Retail products purchased
- Membership enrollment

### Step 4: Apply Discounts (if applicable)
- VIP membership discount
- Promotional codes
- Package discounts
- Courtesy adjustments

### Step 5: Add Tip (if applicable)
- Pre-set buttons: 15%, 18%, 20%, 25%
- Custom amount option
- No tip option

### Step 6: Process Payment
1. Select payment method:
   - Credit/Debit Card
   - Cash
   - Gift Card
   - Account Credit
   - Split Payment
2. Process the transaction
3. Confirm completion

### Step 7: Receipt
- Email receipt (default)
- Print receipt (optional)
- Text receipt (optional)

---

## Payment Methods

### Credit/Debit Card (via Stripe)
- Swipe, insert, or tap
- Manual entry available
- All major cards accepted

### Cash
- Enter amount received
- System calculates change
- Cash drawer opens (if connected)

### Gift Cards
- Enter gift card number
- System checks balance
- Deducts from card
- Remaining balance shown

### Account Credit
- Client's prepaid balance
- Membership credits
- Refund credits

### Split Payment
- Multiple payment types
- Partial amounts each
- Common: Part card, part gift card

---

## Walk-in Sales

### Retail Products
1. Click "Walk-in Sale" tab
2. Search or browse products
3. Add to cart
4. Process payment

### Gift Card Sales
1. Walk-in Sale → Gift Cards
2. Select amount ($25, $50, $100, $250, custom)
3. Enter recipient info (optional)
4. Process payment
5. Print or email gift card

---

## Discounts

### Types of Discounts
| Type | Application |
|------|-------------|
| Percentage | 10%, 15%, 20% off |
| Fixed Amount | $25 off, $50 off |
| Service Specific | Free service with purchase |
| Membership | Auto-applied for VIP |

### Applying Discounts
1. Click "Add Discount" in cart
2. Select discount type
3. Enter amount or select preset
4. Add reason (for records)

### Approval Required
Some discounts may require manager approval:
- Over 20% off
- Full comp (100%)
- Multiple discounts stacked

---

## Tips & Gratuities

### Preset Options
- 15% - Good service
- 18% - Great service
- 20% - Excellent service
- 25% - Above & beyond
- Custom - Any amount
- No Tip - Decline

### Tip Distribution
- Tips go to service provider
- Tracked separately in reports
- Reported for payroll

---

## Refunds

### Full Refund
1. Find original transaction
2. Click "Refund"
3. Confirm full amount
4. Process to original payment method

### Partial Refund
1. Find original transaction
2. Click "Refund"
3. Enter partial amount
4. Select reason
5. Process refund

### Store Credit (Instead of Refund)
1. Find transaction
2. Click "Issue Credit"
3. Enter amount
4. Credit added to client account

---

## End of Day

### Daily Summary
POS provides end-of-day report:
- Total transactions
- Cash collected
- Card transactions
- Tips collected
- Refunds issued

### Cash Drawer Reconciliation
1. Count physical cash
2. Compare to system total
3. Note any discrepancy
4. Close out drawer

### Daily Report
- Export or print daily summary
- File for records
- Send to bookkeeper (if applicable)

---

## Troubleshooting

### Card Declined
1. Ask client to try another card
2. Check for entry errors
3. Try manual entry if chip fails
4. Accept alternate payment

### Terminal Not Responding
1. Check internet connection
2. Refresh the page
3. Clear browser cache
4. Restart browser

### Wrong Amount Charged
1. Process refund immediately
2. Re-run correct amount
3. Apologize to client
4. Document incident

### Receipt Not Printing
1. Check printer connection
2. Verify paper loaded
3. Send email receipt instead
4. Print from transaction history later

---

## Quick Keys

| Key | Action |
|-----|--------|
| Enter | Confirm selection |
| Esc | Cancel/Back |
| Tab | Next field |
| / | Search |

---

## Integration Status

### Currently Active
- Demo mode with sample data

### Pending (Stripe Setup)
- Live card processing
- Automatic receipts
- Transaction sync
- Refund processing

### Setup Required
Add to Vercel environment variables:
```
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
```

---

*Once Stripe is connected, this terminal will process real payments.*
