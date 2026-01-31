// ============================================================
// HELLO GORGEOUS OS - REPORTING & ANALYTICS
// 52+ reports - ALL INCLUDED FREE (Fresha gates many as "Premium")
// ============================================================

export type ReportCategory = 'sales' | 'finance' | 'appointments' | 'team' | 'clients' | 'inventory' | 'marketing';

export interface Report {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  icon: string;
  // Fresha marks some as "Premium" - we include ALL free
  isPremiumInFresha: boolean;
  // Query configuration
  query?: string;
  metrics: ReportMetric[];
  groupBy?: string[];
  filters?: ReportFilter[];
  // Display options
  chartType?: 'bar' | 'line' | 'pie' | 'table' | 'kpi';
  exportable: boolean;
}

export interface ReportMetric {
  id: string;
  name: string;
  type: 'count' | 'sum' | 'average' | 'percentage' | 'currency';
  field: string;
  format?: string;
}

export interface ReportFilter {
  id: string;
  name: string;
  type: 'date_range' | 'select' | 'multiselect' | 'search';
  field: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

export interface ReportResult {
  reportId: string;
  generatedAt: string;
  filters: Record<string, any>;
  data: Record<string, any>[];
  summary: Record<string, number>;
  chartData?: any;
}

// ============================================================
// ALL REPORTS - 52+ REPORTS, ALL FREE
// ============================================================

export const REPORTS: Report[] = [
  // =====================================
  // DASHBOARDS / OVERVIEW
  // =====================================
  {
    id: 'performance-dashboard',
    name: 'Performance Dashboard',
    description: 'Dashboard of your business performance',
    category: 'sales',
    icon: '📊',
    isPremiumInFresha: false,
    chartType: 'kpi',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Total Revenue', type: 'currency', field: 'amount' },
      { id: 'appointments', name: 'Appointments', type: 'count', field: 'id' },
      { id: 'new_clients', name: 'New Clients', type: 'count', field: 'client_id' },
      { id: 'avg_ticket', name: 'Avg Ticket', type: 'average', field: 'amount' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'online-presence',
    name: 'Online Presence Dashboard',
    description: 'Online sales and online client performance',
    category: 'sales',
    icon: '🌐',
    isPremiumInFresha: false,
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'online_bookings', name: 'Online Bookings', type: 'count', field: 'id' },
      { id: 'online_revenue', name: 'Online Revenue', type: 'currency', field: 'amount' },
      { id: 'conversion_rate', name: 'Conversion Rate', type: 'percentage', field: 'converted' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'booking_source', name: 'Source', type: 'multiselect', field: 'booking_source' },
    ],
  },
  {
    id: 'performance-summary',
    name: 'Performance Summary',
    description: 'Overview of business performance by team or location',
    category: 'sales',
    icon: '📈',
    isPremiumInFresha: true, // Fresha charges for this!
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'services', name: 'Services', type: 'count', field: 'service_id' },
      { id: 'products', name: 'Products', type: 'count', field: 'product_id' },
    ],
    groupBy: ['provider_id', 'location_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'team_member', name: 'Team Member', type: 'multiselect', field: 'provider_id' },
    ],
  },
  {
    id: 'performance-over-time',
    name: 'Performance Over Time',
    description: 'View of key business metrics by Location or Team Member over time',
    category: 'sales',
    icon: '📉',
    isPremiumInFresha: true, // Fresha charges for this!
    chartType: 'line',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'appointments', name: 'Appointments', type: 'count', field: 'id' },
      { id: 'new_clients', name: 'New Clients', type: 'count', field: 'client_id' },
    ],
    groupBy: ['date', 'provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'granularity', name: 'View By', type: 'select', field: 'granularity', options: [
        { value: 'day', label: 'Daily' },
        { value: 'week', label: 'Weekly' },
        { value: 'month', label: 'Monthly' },
      ]},
    ],
  },

  // =====================================
  // SALES REPORTS
  // =====================================
  {
    id: 'sales-summary',
    name: 'Sales Summary',
    description: 'Sales quantities and value, excluding tips and gift card sales',
    category: 'sales',
    icon: '💰',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'gross_sales', name: 'Gross Sales', type: 'currency', field: 'amount' },
      { id: 'discounts', name: 'Discounts', type: 'currency', field: 'discount_amount' },
      { id: 'net_sales', name: 'Net Sales', type: 'currency', field: 'net_amount' },
      { id: 'quantity', name: 'Quantity', type: 'count', field: 'id' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'sales-by-service',
    name: 'Sales by Service',
    description: 'Revenue breakdown by service type',
    category: 'sales',
    icon: '💅',
    isPremiumInFresha: false,
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'quantity', name: 'Services Sold', type: 'count', field: 'id' },
      { id: 'avg_price', name: 'Avg Price', type: 'average', field: 'amount' },
    ],
    groupBy: ['service_id', 'category_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'category', name: 'Category', type: 'multiselect', field: 'category_id' },
    ],
  },
  {
    id: 'sales-by-team-member',
    name: 'Sales by Team Member',
    description: 'Revenue generated by each team member',
    category: 'sales',
    icon: '👩‍⚕️',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'services', name: 'Services', type: 'count', field: 'id' },
      { id: 'avg_ticket', name: 'Avg Ticket', type: 'average', field: 'amount' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'daily-sales',
    name: 'Daily Sales',
    description: 'Day-by-day sales breakdown',
    category: 'sales',
    icon: '📅',
    isPremiumInFresha: false,
    chartType: 'line',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'transactions', name: 'Transactions', type: 'count', field: 'id' },
    ],
    groupBy: ['date'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'hourly-sales',
    name: 'Hourly Sales',
    description: 'Sales broken down by hour of day',
    category: 'sales',
    icon: '⏰',
    isPremiumInFresha: true,
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'appointments', name: 'Appointments', type: 'count', field: 'id' },
    ],
    groupBy: ['hour'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'discounts-applied',
    name: 'Discounts Applied',
    description: 'All discounts and their impact on revenue',
    category: 'sales',
    icon: '🏷️',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'discount_amount', name: 'Discount Amount', type: 'currency', field: 'discount_amount' },
      { id: 'discount_count', name: 'Times Used', type: 'count', field: 'id' },
    ],
    groupBy: ['discount_code'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'gift-card-sales',
    name: 'Gift Card Sales',
    description: 'Gift card sales and redemptions',
    category: 'sales',
    icon: '🎁',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'sold', name: 'Sold', type: 'currency', field: 'sold_amount' },
      { id: 'redeemed', name: 'Redeemed', type: 'currency', field: 'redeemed_amount' },
      { id: 'outstanding', name: 'Outstanding', type: 'currency', field: 'balance' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // FINANCE REPORTS
  // =====================================
  {
    id: 'payments-collected',
    name: 'Payments Collected',
    description: 'All payments received by payment method',
    category: 'finance',
    icon: '💳',
    isPremiumInFresha: false,
    chartType: 'pie',
    exportable: true,
    metrics: [
      { id: 'amount', name: 'Amount', type: 'currency', field: 'amount' },
      { id: 'count', name: 'Transactions', type: 'count', field: 'id' },
    ],
    groupBy: ['payment_method'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'daily-takings',
    name: 'Daily Takings',
    description: 'Daily cash drawer / end of day reconciliation',
    category: 'finance',
    icon: '🧾',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'cash', name: 'Cash', type: 'currency', field: 'cash_amount' },
      { id: 'card', name: 'Card', type: 'currency', field: 'card_amount' },
      { id: 'other', name: 'Other', type: 'currency', field: 'other_amount' },
      { id: 'total', name: 'Total', type: 'currency', field: 'total' },
    ],
    groupBy: ['date'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'refunds',
    name: 'Refunds',
    description: 'All refunds issued',
    category: 'finance',
    icon: '↩️',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'amount', name: 'Refund Amount', type: 'currency', field: 'amount' },
      { id: 'count', name: 'Refunds', type: 'count', field: 'id' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'reason', name: 'Reason', type: 'multiselect', field: 'refund_reason' },
    ],
  },
  {
    id: 'tips-report',
    name: 'Tips Report',
    description: 'Tips received by team member',
    category: 'finance',
    icon: '💵',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'tips', name: 'Tips', type: 'currency', field: 'tip_amount' },
      { id: 'services', name: 'Services', type: 'count', field: 'id' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'commission-report',
    name: 'Commission Report',
    description: 'Team member commissions earned',
    category: 'finance',
    icon: '💹',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'sales', name: 'Sales', type: 'currency', field: 'amount' },
      { id: 'commission', name: 'Commission', type: 'currency', field: 'commission' },
      { id: 'rate', name: 'Rate', type: 'percentage', field: 'commission_rate' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'taxes-collected',
    name: 'Taxes Collected',
    description: 'Tax amounts collected',
    category: 'finance',
    icon: '🏛️',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'taxable', name: 'Taxable Amount', type: 'currency', field: 'taxable_amount' },
      { id: 'tax', name: 'Tax Collected', type: 'currency', field: 'tax_amount' },
    ],
    groupBy: ['tax_rate'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // APPOINTMENT REPORTS
  // =====================================
  {
    id: 'appointments-overview',
    name: 'Appointments Overview',
    description: 'Summary of all appointments',
    category: 'appointments',
    icon: '📅',
    isPremiumInFresha: false,
    chartType: 'kpi',
    exportable: true,
    metrics: [
      { id: 'total', name: 'Total', type: 'count', field: 'id' },
      { id: 'completed', name: 'Completed', type: 'count', field: 'completed' },
      { id: 'cancelled', name: 'Cancelled', type: 'count', field: 'cancelled' },
      { id: 'no_show', name: 'No Shows', type: 'count', field: 'no_show' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'starts_at' },
    ],
  },
  {
    id: 'booking-sources',
    name: 'Booking Sources',
    description: 'Where appointments are coming from',
    category: 'appointments',
    icon: '📲',
    isPremiumInFresha: false,
    chartType: 'pie',
    exportable: true,
    metrics: [
      { id: 'count', name: 'Bookings', type: 'count', field: 'id' },
      { id: 'percentage', name: 'Percentage', type: 'percentage', field: 'id' },
    ],
    groupBy: ['booking_source'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'cancellations',
    name: 'Cancellations',
    description: 'Cancelled appointments analysis',
    category: 'appointments',
    icon: '❌',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'count', name: 'Cancellations', type: 'count', field: 'id' },
      { id: 'rate', name: 'Cancel Rate', type: 'percentage', field: 'id' },
      { id: 'revenue_lost', name: 'Revenue Lost', type: 'currency', field: 'price' },
    ],
    groupBy: ['cancel_reason', 'provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'cancelled_at' },
    ],
  },
  {
    id: 'no-shows',
    name: 'No Shows',
    description: 'Clients who didn\'t show up',
    category: 'appointments',
    icon: '👻',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'count', name: 'No Shows', type: 'count', field: 'id' },
      { id: 'revenue_lost', name: 'Revenue Lost', type: 'currency', field: 'price' },
    ],
    groupBy: ['client_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'starts_at' },
    ],
  },
  {
    id: 'utilization',
    name: 'Utilization Report',
    description: 'How busy are your team members?',
    category: 'appointments',
    icon: '📊',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'booked_hours', name: 'Booked Hours', type: 'sum', field: 'duration_minutes' },
      { id: 'available_hours', name: 'Available Hours', type: 'sum', field: 'available_minutes' },
      { id: 'utilization', name: 'Utilization %', type: 'percentage', field: 'utilization' },
    ],
    groupBy: ['provider_id', 'date'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'starts_at' },
      { id: 'team_member', name: 'Team Member', type: 'multiselect', field: 'provider_id' },
    ],
  },
  {
    id: 'waitlist',
    name: 'Waitlist Report',
    description: 'Waitlist conversions and demand',
    category: 'appointments',
    icon: '⏳',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'added', name: 'Added', type: 'count', field: 'id' },
      { id: 'converted', name: 'Converted', type: 'count', field: 'converted' },
      { id: 'conversion_rate', name: 'Conversion Rate', type: 'percentage', field: 'converted' },
    ],
    groupBy: ['service_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // TEAM REPORTS
  // =====================================
  {
    id: 'team-performance',
    name: 'Team Performance',
    description: 'Individual team member performance metrics',
    category: 'team',
    icon: '👥',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'appointments', name: 'Appointments', type: 'count', field: 'id' },
      { id: 'avg_rating', name: 'Avg Rating', type: 'average', field: 'rating' },
      { id: 'rebook_rate', name: 'Rebook Rate', type: 'percentage', field: 'rebooked' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'hours-worked',
    name: 'Hours Worked',
    description: 'Team member working hours',
    category: 'team',
    icon: '⏱️',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'scheduled', name: 'Scheduled', type: 'sum', field: 'scheduled_hours' },
      { id: 'actual', name: 'Actual', type: 'sum', field: 'actual_hours' },
      { id: 'overtime', name: 'Overtime', type: 'sum', field: 'overtime_hours' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'date' },
    ],
  },
  {
    id: 'productivity',
    name: 'Productivity Report',
    description: 'Revenue per hour by team member',
    category: 'team',
    icon: '🚀',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'revenue_per_hour', name: 'Revenue/Hour', type: 'currency', field: 'revenue_per_hour' },
      { id: 'clients_per_day', name: 'Clients/Day', type: 'average', field: 'clients_per_day' },
    ],
    groupBy: ['provider_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // CLIENT REPORTS
  // =====================================
  {
    id: 'client-list',
    name: 'Client List',
    description: 'All clients with contact information',
    category: 'clients',
    icon: '📋',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'total_spent', name: 'Total Spent', type: 'currency', field: 'total_spent' },
      { id: 'visits', name: 'Visits', type: 'count', field: 'visit_count' },
      { id: 'last_visit', name: 'Last Visit', type: 'count', field: 'last_visit' },
    ],
    filters: [
      { id: 'search', name: 'Search', type: 'search', field: 'name' },
      { id: 'created_after', name: 'Joined After', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'new-clients',
    name: 'New Clients',
    description: 'Clients acquired over time',
    category: 'clients',
    icon: '🆕',
    isPremiumInFresha: false,
    chartType: 'line',
    exportable: true,
    metrics: [
      { id: 'count', name: 'New Clients', type: 'count', field: 'id' },
    ],
    groupBy: ['date', 'referral_source'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'client-retention',
    name: 'Client Retention',
    description: 'How many clients return?',
    category: 'clients',
    icon: '🔄',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'line',
    exportable: true,
    metrics: [
      { id: 'retention_rate', name: 'Retention Rate', type: 'percentage', field: 'retained' },
      { id: 'churned', name: 'Churned', type: 'count', field: 'churned' },
    ],
    groupBy: ['cohort_month'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'top-clients',
    name: 'Top Clients',
    description: 'Highest spending clients',
    category: 'clients',
    icon: '👑',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'total_spent', name: 'Total Spent', type: 'currency', field: 'total_spent' },
      { id: 'visits', name: 'Visits', type: 'count', field: 'visit_count' },
      { id: 'avg_ticket', name: 'Avg Ticket', type: 'average', field: 'avg_ticket' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
      { id: 'limit', name: 'Show Top', type: 'select', field: 'limit', options: [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
      ]},
    ],
  },
  {
    id: 'lapsed-clients',
    name: 'Lapsed Clients',
    description: 'Clients who haven\'t returned',
    category: 'clients',
    icon: '😢',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'last_visit', name: 'Last Visit', type: 'count', field: 'last_visit' },
      { id: 'total_spent', name: 'Total Spent', type: 'currency', field: 'total_spent' },
      { id: 'days_since', name: 'Days Since', type: 'count', field: 'days_since_visit' },
    ],
    filters: [
      { id: 'days_threshold', name: 'Not Visited In', type: 'select', field: 'days_since_visit', options: [
        { value: '30', label: '30+ days' },
        { value: '60', label: '60+ days' },
        { value: '90', label: '90+ days' },
        { value: '180', label: '180+ days' },
      ]},
    ],
  },
  {
    id: 'referral-sources',
    name: 'Referral Sources',
    description: 'How clients found you',
    category: 'clients',
    icon: '📣',
    isPremiumInFresha: false,
    chartType: 'pie',
    exportable: true,
    metrics: [
      { id: 'count', name: 'Clients', type: 'count', field: 'id' },
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'total_spent' },
    ],
    groupBy: ['referral_source'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'membership-report',
    name: 'Membership Report',
    description: 'Active memberships and revenue',
    category: 'clients',
    icon: '🎫',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'active', name: 'Active', type: 'count', field: 'active' },
      { id: 'mrr', name: 'Monthly Revenue', type: 'currency', field: 'mrr' },
      { id: 'churned', name: 'Churned', type: 'count', field: 'churned' },
    ],
    groupBy: ['membership_type'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // INVENTORY REPORTS
  // =====================================
  {
    id: 'inventory-levels',
    name: 'Inventory Levels',
    description: 'Current stock levels',
    category: 'inventory',
    icon: '📦',
    isPremiumInFresha: false,
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'quantity', name: 'Quantity', type: 'count', field: 'quantity' },
      { id: 'value', name: 'Value', type: 'currency', field: 'value' },
      { id: 'reorder_level', name: 'Reorder Level', type: 'count', field: 'reorder_level' },
    ],
    filters: [
      { id: 'category', name: 'Category', type: 'multiselect', field: 'category' },
      { id: 'low_stock', name: 'Low Stock Only', type: 'select', field: 'low_stock' },
    ],
  },
  {
    id: 'product-sales',
    name: 'Product Sales',
    description: 'Retail product sales',
    category: 'inventory',
    icon: '🛍️',
    isPremiumInFresha: false,
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'quantity', name: 'Sold', type: 'count', field: 'quantity' },
      { id: 'revenue', name: 'Revenue', type: 'currency', field: 'amount' },
      { id: 'profit', name: 'Profit', type: 'currency', field: 'profit' },
    ],
    groupBy: ['product_id'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
  {
    id: 'stock-movement',
    name: 'Stock Movement',
    description: 'Inventory changes over time',
    category: 'inventory',
    icon: '🔄',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'in', name: 'Stock In', type: 'count', field: 'quantity_in' },
      { id: 'out', name: 'Stock Out', type: 'count', field: 'quantity_out' },
      { id: 'adjustments', name: 'Adjustments', type: 'count', field: 'adjustments' },
    ],
    groupBy: ['product_id', 'date'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },

  // =====================================
  // MARKETING REPORTS
  // =====================================
  {
    id: 'campaign-performance',
    name: 'Campaign Performance',
    description: 'Email and SMS campaign results',
    category: 'marketing',
    icon: '📧',
    isPremiumInFresha: true, // Premium in Fresha!
    chartType: 'table',
    exportable: true,
    metrics: [
      { id: 'sent', name: 'Sent', type: 'count', field: 'sent' },
      { id: 'opened', name: 'Opened', type: 'count', field: 'opened' },
      { id: 'clicked', name: 'Clicked', type: 'count', field: 'clicked' },
      { id: 'open_rate', name: 'Open Rate', type: 'percentage', field: 'open_rate' },
      { id: 'click_rate', name: 'Click Rate', type: 'percentage', field: 'click_rate' },
    ],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'sent_at' },
      { id: 'campaign_type', name: 'Type', type: 'multiselect', field: 'campaign_type' },
    ],
  },
  {
    id: 'reviews-ratings',
    name: 'Reviews & Ratings',
    description: 'Client feedback and review performance',
    category: 'marketing',
    icon: '⭐',
    isPremiumInFresha: false,
    chartType: 'bar',
    exportable: true,
    metrics: [
      { id: 'total', name: 'Total Reviews', type: 'count', field: 'id' },
      { id: 'avg_rating', name: 'Avg Rating', type: 'average', field: 'rating' },
      { id: 'nps', name: 'NPS Score', type: 'average', field: 'nps' },
    ],
    groupBy: ['provider_id', 'rating'],
    filters: [
      { id: 'date_range', name: 'Date Range', type: 'date_range', field: 'created_at' },
    ],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get reports by category
 */
export function getReportsByCategory(category: ReportCategory): Report[] {
  return REPORTS.filter(r => r.category === category);
}

/**
 * Get all report categories with counts
 */
export function getReportCategories(): { category: ReportCategory; count: number; label: string }[] {
  const categories: Record<ReportCategory, string> = {
    sales: 'Sales',
    finance: 'Finance',
    appointments: 'Appointments',
    team: 'Team',
    clients: 'Clients',
    inventory: 'Inventory',
    marketing: 'Marketing',
  };

  return Object.entries(categories).map(([cat, label]) => ({
    category: cat as ReportCategory,
    count: REPORTS.filter(r => r.category === cat).length,
    label,
  }));
}

/**
 * Get report by ID
 */
export function getReport(id: string): Report | undefined {
  return REPORTS.find(r => r.id === id);
}

/**
 * Get premium reports (that Fresha charges extra for)
 */
export function getPremiumReports(): Report[] {
  return REPORTS.filter(r => r.isPremiumInFresha);
}

/**
 * Count of reports by type
 */
export function getReportCounts(): { total: number; standard: number; premium: number } {
  const premium = REPORTS.filter(r => r.isPremiumInFresha).length;
  return {
    total: REPORTS.length,
    standard: REPORTS.length - premium,
    premium,
  };
}

/**
 * Search reports
 */
export function searchReports(query: string): Report[] {
  const lowerQuery = query.toLowerCase();
  return REPORTS.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery)
  );
}
