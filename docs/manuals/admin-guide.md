# Admin Dashboard Guide

**Hello Gorgeous Med Spa - Admin Manual**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Table of Contents

1. [Accessing the Admin Panel](#accessing-the-admin-panel)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Clients](#managing-clients)
4. [Calendar & Appointments](#calendar--appointments)
5. [Services Management](#services-management)
6. [Reports & Analytics](#reports--analytics)
7. [Inventory Management](#inventory-management)
8. [Staff Management](#staff-management)
9. [Settings & Configuration](#settings--configuration)

---

## Accessing the Admin Panel

### Web Browser
```
https://www.hellogorgeousmedspa.com/admin
```

### Desktop App (Recommended)
1. Go to `/admin` in Chrome
2. Click the install icon in the address bar
3. Click "Install"
4. App appears in your dock/taskbar

### Mobile Access
Works on any mobile browser, but desktop/tablet recommended for full functionality.

---

## Dashboard Overview

**URL:** `/admin`

The dashboard shows at-a-glance metrics:

| Metric | Description |
|--------|-------------|
| Today's Appointments | Total scheduled for today |
| Today's Revenue | Completed payments |
| New Clients | First-time visitors today |
| Weekly Revenue | Last 7 days total |

### Alerts Section
- **Unsigned Charts:** Charts needing provider signature
- **Expiring Consents:** Consent forms expiring soon

### Quick Actions
- + New Appointment
- + New Client
- View Calendar
- Open POS

---

## Managing Clients

**URL:** `/admin/clients`

### Viewing Clients
- Search by name, email, or phone
- Filter by VIP status
- Sort by name, last visit, total spent

### Adding a New Client
1. Click "+ New Client"
2. Enter required information:
   - First Name
   - Last Name
   - Email
   - Phone
3. Optional: Add address, notes, tags
4. Click "Save Client"

### Client Profile
Click any client name to view:
- Contact information
- Appointment history
- Treatment notes
- Consent forms on file
- Loyalty points balance
- Total spent

### Importing Clients
1. Click "Import" button
2. Upload CSV file (Fresha format supported)
3. Review mapped columns
4. Click "Import Clients"

---

## Calendar & Appointments

**URL:** `/admin/calendar`

### Views
- **Day View:** Single day, all providers
- **Week View:** 7-day overview
- **Provider View:** Side-by-side columns

### Booking an Appointment
1. Click any empty time slot
2. Select or search for client
3. Choose service
4. Select provider
5. Confirm time
6. Click "Book Appointment"

### Appointment Status Flow
```
Booked → Confirmed → Checked In → In Progress → Completed
                                              ↘ No Show
                                              ↘ Cancelled
```

### Changing Status
Click the appointment → Select new status from dropdown

---

## Services Management

**URL:** `/admin/services`

### Viewing Services
- Filter by category
- Search by name
- Toggle active/inactive

### Service Details
- Name & description
- Price
- Duration (minutes)
- Buffer time
- Required consent forms
- Requires consultation (yes/no)

### Categories
Services are organized by:
- Botox & Neurotoxins
- Dermal Fillers
- Weight Loss
- Facials & Skin
- IV Therapy
- Laser Services
- And more...

---

## Reports & Analytics

**URL:** `/admin/reports`

### Available Reports
| Report | Description |
|--------|-------------|
| Revenue Overview | Daily/weekly/monthly totals |
| Services Report | Bookings by service type |
| Provider Report | Revenue by provider |
| Client Report | Top clients, retention |

### Date Ranges
- Today
- This Week
- This Month
- Custom Range

### Exporting
- Click "Export CSV" for spreadsheet
- Click "Export PDF" for printable report

---

## Inventory Management

**URL:** `/admin/inventory`

### Tracking Items
- Product name & brand
- Current stock level
- Reorder point (alerts when low)
- Lot numbers
- Expiration dates

### Lot Tracking
Critical for injectables:
1. When receiving shipment, enter lot number
2. Record expiration date
3. System tracks usage automatically

### Low Stock Alerts
Dashboard shows items at or below reorder point.

---

## Staff Management

**URL:** `/admin/staff`

### Staff Roles
| Role | Permissions |
|------|-------------|
| Admin | Full access to everything |
| Provider | Chart, prescribe, see clients |
| Staff | Book appointments, check in clients |

### Adding Staff
1. Click "+ Add Staff Member"
2. Enter name, email, phone
3. Select role
4. Set services they can perform
5. Configure schedule

---

## Settings & Configuration

**URL:** `/admin/settings`

### Business Settings
- Business name & address
- Phone numbers
- Email addresses
- Operating hours

### Booking Settings
- How far in advance clients can book
- Minimum notice for cancellation
- Time slot intervals (15/30/60 min)

### Notification Settings
- Appointment confirmations
- Reminder timing (24hr, 48hr)
- Email templates

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `n` | New appointment |
| `c` | New client |
| `t` | Today on calendar |

---

## Getting Help

1. Check the troubleshooting guide: `/docs/reference/troubleshooting.md`
2. Review this manual
3. Contact support if issue persists

---

*Keep this manual accessible for quick reference.*
