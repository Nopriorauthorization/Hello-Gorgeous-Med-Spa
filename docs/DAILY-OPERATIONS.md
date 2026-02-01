# Hello Gorgeous Med Spa - Daily Operations Guide

**Replacing Fresha with HGOS (Hello Gorgeous Operating System)**

---

## Morning Opening Checklist

### 1. Check Today's Schedule (5 min)
- Go to: **https://www.hellogorgeousmedspa.com/admin/calendar**
- Review all appointments for the day
- Note any special requests in appointment notes
- Confirm provider assignments

### 2. Review Client Arrivals
- Check which clients need intake forms completed
- Identify any new clients (first visit)
- Note VIP clients for special attention

---

## During the Day

### Booking New Appointments

**Online (Clients self-book):**
- Direct clients to: **https://www.hellogorgeousmedspa.com/book**
- They can select service, provider, and time

**Admin Booking:**
1. Go to: **/admin/appointments/new**
2. Search for existing client OR create new
3. Select service and provider
4. Choose date and time
5. Click "Book Appointment"

### Adding New Clients

1. Go to: **/admin/clients/new**
2. Enter: First name, Last name, Email, Phone
3. Optional: Date of birth, Referral source
4. Click "Create Client"

### Checking In a Client

1. Go to: **/admin/appointments** or **/admin/calendar**
2. Find the appointment
3. Click "View" to see details
4. Update status to "Checked In"

### Processing Payments

**Option A - POS Terminal:**
1. Go to: **/admin/pos**
2. Search for client
3. Add services/products
4. Apply discounts if needed
5. Process card payment through Stripe

**Option B - From Appointment:**
1. Go to appointment details
2. Click "Checkout"
3. Confirm services
4. Process payment

### Viewing Client History

1. Go to: **/admin/clients**
2. Search for client by name, email, or phone
3. Click on client to view full profile
4. See: All appointments, payments, consents, clinical notes

---

## Key Admin Pages

| Task | URL |
|------|-----|
| Dashboard | /admin |
| Today's Calendar | /admin/calendar |
| All Appointments | /admin/appointments |
| Book New Appt | /admin/appointments/new |
| All Clients | /admin/clients |
| Add Client | /admin/clients/new |
| Services & Pricing | /admin/services |
| POS Terminal | /admin/pos |
| Payments History | /admin/payments |
| Reports | /admin/reports |
| Consent Forms | /admin/consents |
| SMS Marketing | /admin/marketing |

---

## End of Day Closing Checklist

### 1. Reconcile Payments (5 min)
- Go to: **/admin/payments**
- Compare to Stripe Dashboard
- Note any discrepancies

### 2. Review Tomorrow's Schedule
- Go to: **/admin/calendar**
- Navigate to next business day
- Confirm all appointments
- Note any preparation needed

### 3. Send Appointment Reminders
- System sends automatic reminders 24h and 2h before
- Check **/admin/marketing** for SMS status

---

## Quick Reference

### Appointment Statuses
- **Pending** - Awaiting confirmation
- **Confirmed** - Client confirmed
- **Checked In** - Client arrived
- **In Progress** - Treatment happening
- **Completed** - Visit finished
- **Cancelled** - Client cancelled
- **No Show** - Client didn't arrive

### Common Services (From Your Data)
- BOTOX treatments
- Dermal Fillers
- IV Drip Packages
- Weight Loss Injections (Semaglutide, Tirzepatide)
- Skin treatments (IPL, Microneedling)
- Lash Extensions
- Medical Visits

---

## Client Portal

Clients can access their own portal at:
**https://www.hellogorgeousmedspa.com/portal**

They can:
- View upcoming appointments
- See past visit history
- Manage their profile
- Refer friends (earn rewards)
- View loyalty points

---

## Troubleshooting

### "Page not loading"
1. Refresh the browser
2. Clear cache (Cmd+Shift+R on Mac)
3. Try a different browser

### "Can't find a client"
- Check spelling
- Search by email or phone
- They may not be in system - create new client

### "Appointment not showing"
- Check correct date selected
- Check correct provider filter
- Refresh the page

### Need Help?
- Technical issues: Contact developer
- Stripe issues: https://dashboard.stripe.com
- SMS issues: Check Telnyx dashboard

---

## IMPORTANT: What HGOS Does vs Fresha

| Feature | HGOS | Notes |
|---------|------|-------|
| Online Booking | ✅ | /book page |
| Client Database | ✅ | 3,256 clients imported |
| Appointment Management | ✅ | Full calendar view |
| Payment Processing | ✅ | Stripe Live Mode |
| SMS Reminders | ✅ | Telnyx integration |
| Consent Forms | ✅ | Digital signatures |
| Clinical Notes | ✅ | SOAP format |
| Reports | ✅ | Revenue, providers, services |
| Gift Cards | ✅ | Manage and track |
| Memberships | ✅ | Subscription management |
| Inventory | ⚠️ | Basic tracking |
| Marketing Campaigns | ✅ | SMS campaigns |

---

*Last Updated: February 2026*
*System Version: HGOS v1.4.0*
