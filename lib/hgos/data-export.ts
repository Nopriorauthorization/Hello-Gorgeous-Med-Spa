// ============================================================
// HELLO GORGEOUS OS - DATA EXPORT & BI INTEGRATION
// Connect to Power BI, Tableau, DOMO, Salesforce, etc.
// FREE - Fresha charges $295/month for this!
// ============================================================

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  description: string;
}

export interface DataExportConfig {
  // Available export formats
  formats: ExportFormat[];
  // Data types available for export
  dataTypes: DataType[];
  // BI connection info
  biConnectionInfo: BIConnectionInfo;
}

export interface DataType {
  id: string;
  name: string;
  description: string;
  tableName: string;
  fields: DataField[];
  relationships?: string[];
}

export interface DataField {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'json';
  description: string;
  nullable?: boolean;
}

export interface BIConnectionInfo {
  host: string;
  port: number;
  database: string;
  schema: string;
  readOnlyUser: string;
  // Connection strings for various BI tools
  connectionStrings: Record<string, string>;
}

// ============================================================
// EXPORT FORMATS
// ============================================================

export const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: 'csv',
    name: 'CSV',
    extension: '.csv',
    mimeType: 'text/csv',
    description: 'Comma-separated values, compatible with Excel and all BI tools',
  },
  {
    id: 'json',
    name: 'JSON',
    extension: '.json',
    mimeType: 'application/json',
    description: 'JavaScript Object Notation, ideal for APIs and custom integrations',
  },
  {
    id: 'xlsx',
    name: 'Excel',
    extension: '.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    description: 'Microsoft Excel format with formatting support',
  },
  {
    id: 'parquet',
    name: 'Parquet',
    extension: '.parquet',
    mimeType: 'application/octet-stream',
    description: 'Columnar format optimized for big data analytics',
  },
];

// ============================================================
// DATA TYPES AVAILABLE FOR EXPORT
// ============================================================

export const DATA_TYPES: DataType[] = [
  {
    id: 'clients',
    name: 'Clients',
    description: 'All client information including contact details and preferences',
    tableName: 'clients',
    fields: [
      { name: 'id', type: 'string', description: 'Unique client identifier' },
      { name: 'first_name', type: 'string', description: 'First name' },
      { name: 'last_name', type: 'string', description: 'Last name' },
      { name: 'email', type: 'string', description: 'Email address' },
      { name: 'phone', type: 'string', description: 'Phone number' },
      { name: 'date_of_birth', type: 'date', description: 'Date of birth' },
      { name: 'gender', type: 'string', description: 'Gender' },
      { name: 'created_at', type: 'date', description: 'Date added' },
      { name: 'total_spent', type: 'number', description: 'Lifetime spend' },
      { name: 'visit_count', type: 'number', description: 'Total visits' },
      { name: 'last_visit', type: 'date', description: 'Most recent visit' },
    ],
    relationships: ['appointments', 'transactions', 'memberships'],
  },
  {
    id: 'appointments',
    name: 'Appointments',
    description: 'All appointments including history and upcoming',
    tableName: 'appointments',
    fields: [
      { name: 'id', type: 'string', description: 'Appointment ID' },
      { name: 'client_id', type: 'string', description: 'Client ID' },
      { name: 'provider_id', type: 'string', description: 'Provider ID' },
      { name: 'service_id', type: 'string', description: 'Service ID' },
      { name: 'starts_at', type: 'date', description: 'Start date/time' },
      { name: 'ends_at', type: 'date', description: 'End date/time' },
      { name: 'status', type: 'string', description: 'Booking status' },
      { name: 'booking_source', type: 'string', description: 'How booked' },
      { name: 'created_at', type: 'date', description: 'When created' },
    ],
    relationships: ['clients', 'providers', 'services', 'transactions'],
  },
  {
    id: 'transactions',
    name: 'Transactions',
    description: 'All financial transactions and payments',
    tableName: 'transactions',
    fields: [
      { name: 'id', type: 'string', description: 'Transaction ID' },
      { name: 'client_id', type: 'string', description: 'Client ID' },
      { name: 'appointment_id', type: 'string', description: 'Related appointment' },
      { name: 'amount', type: 'number', description: 'Transaction amount' },
      { name: 'type', type: 'string', description: 'Payment/refund/adjustment' },
      { name: 'payment_method', type: 'string', description: 'Payment method used' },
      { name: 'status', type: 'string', description: 'Transaction status' },
      { name: 'created_at', type: 'date', description: 'Transaction date' },
    ],
    relationships: ['clients', 'appointments'],
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Service menu with pricing',
    tableName: 'services',
    fields: [
      { name: 'id', type: 'string', description: 'Service ID' },
      { name: 'name', type: 'string', description: 'Service name' },
      { name: 'category_id', type: 'string', description: 'Category' },
      { name: 'price', type: 'number', description: 'Price' },
      { name: 'duration_minutes', type: 'number', description: 'Duration' },
      { name: 'is_active', type: 'boolean', description: 'Active/inactive' },
    ],
    relationships: ['service_categories', 'appointments'],
  },
  {
    id: 'providers',
    name: 'Providers',
    description: 'Staff and provider information',
    tableName: 'providers',
    fields: [
      { name: 'id', type: 'string', description: 'Provider ID' },
      { name: 'first_name', type: 'string', description: 'First name' },
      { name: 'last_name', type: 'string', description: 'Last name' },
      { name: 'email', type: 'string', description: 'Email' },
      { name: 'credentials', type: 'string', description: 'Credentials' },
      { name: 'is_active', type: 'boolean', description: 'Active/inactive' },
    ],
    relationships: ['appointments'],
  },
  {
    id: 'memberships',
    name: 'Memberships',
    description: 'Client memberships and subscriptions',
    tableName: 'client_memberships',
    fields: [
      { name: 'id', type: 'string', description: 'Membership ID' },
      { name: 'client_id', type: 'string', description: 'Client ID' },
      { name: 'membership_type', type: 'string', description: 'Membership tier' },
      { name: 'status', type: 'string', description: 'Active/cancelled/paused' },
      { name: 'started_at', type: 'date', description: 'Start date' },
      { name: 'expires_at', type: 'date', description: 'Expiration date' },
      { name: 'monthly_amount', type: 'number', description: 'Monthly fee' },
    ],
    relationships: ['clients', 'memberships'],
  },
  {
    id: 'feedback',
    name: 'Client Feedback',
    description: 'Post-appointment feedback and ratings',
    tableName: 'client_feedback',
    fields: [
      { name: 'id', type: 'string', description: 'Feedback ID' },
      { name: 'appointment_id', type: 'string', description: 'Appointment ID' },
      { name: 'client_id', type: 'string', description: 'Client ID' },
      { name: 'rating', type: 'number', description: 'Rating 1-5' },
      { name: 'comment', type: 'string', description: 'Comment text' },
      { name: 'submitted_at', type: 'date', description: 'Submission date' },
    ],
    relationships: ['clients', 'appointments'],
  },
];

// ============================================================
// BI TOOL CONNECTION STRINGS
// ============================================================

export function getBIConnectionInfo(): BIConnectionInfo {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1] || 'your-project-ref';
  
  return {
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    database: 'postgres',
    schema: 'public',
    readOnlyUser: 'Create a read-only role in Supabase for BI access',
    connectionStrings: {
      // PostgreSQL standard connection string
      postgresql: `postgresql://[user]:[password]@db.${projectRef}.supabase.co:5432/postgres`,
      
      // Power BI
      powerbi: `Server=db.${projectRef}.supabase.co;Database=postgres;`,
      
      // Tableau
      tableau: `Server: db.${projectRef}.supabase.co\nPort: 5432\nDatabase: postgres`,
      
      // DOMO
      domo: `Host: db.${projectRef}.supabase.co:5432\nDatabase: postgres`,
      
      // Metabase (open source BI)
      metabase: `Host: db.${projectRef}.supabase.co\nPort: 5432\nDatabase Name: postgres`,
      
      // Google Data Studio / Looker
      looker: `Host: db.${projectRef}.supabase.co\nPort: 5432\nDatabase: postgres`,
    },
  };
}

// ============================================================
// DATA EXPORT FUNCTIONS
// ============================================================

/**
 * Convert data to CSV format
 */
export function toCSV(data: Record<string, any>[], fields?: string[]): string {
  if (data.length === 0) return '';
  
  const headers = fields || Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return String(value);
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
}

/**
 * Convert data to JSON format
 */
export function toJSON(data: Record<string, any>[], pretty = true): string {
  return JSON.stringify(data, null, pretty ? 2 : 0);
}

/**
 * Generate date range filter SQL
 */
export function getDateRangeSQL(
  startDate: Date,
  endDate: Date,
  dateField: string = 'created_at'
): string {
  return `${dateField} >= '${startDate.toISOString()}' AND ${dateField} < '${endDate.toISOString()}'`;
}

// ============================================================
// PRE-BUILT ANALYTICS QUERIES
// ============================================================

export const ANALYTICS_QUERIES = {
  // Revenue by month
  revenueByMonth: `
    SELECT 
      DATE_TRUNC('month', created_at) as month,
      SUM(amount) as total_revenue,
      COUNT(*) as transaction_count
    FROM transactions
    WHERE type = 'payment' AND status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
    ORDER BY month DESC
  `,
  
  // Top services by revenue
  topServicesByRevenue: `
    SELECT 
      s.name as service_name,
      s.category_id,
      COUNT(a.id) as booking_count,
      SUM(t.amount) as total_revenue
    FROM services s
    LEFT JOIN appointments a ON s.id = a.service_id
    LEFT JOIN transactions t ON a.id = t.appointment_id
    WHERE a.status = 'completed'
    GROUP BY s.id, s.name, s.category_id
    ORDER BY total_revenue DESC
    LIMIT 20
  `,
  
  // Client retention analysis
  clientRetention: `
    SELECT 
      DATE_TRUNC('month', first_visit) as cohort_month,
      COUNT(DISTINCT client_id) as new_clients,
      COUNT(DISTINCT CASE WHEN visit_count > 1 THEN client_id END) as returned_clients,
      ROUND(COUNT(DISTINCT CASE WHEN visit_count > 1 THEN client_id END)::numeric / 
            COUNT(DISTINCT client_id) * 100, 2) as retention_rate
    FROM (
      SELECT 
        client_id,
        MIN(starts_at) as first_visit,
        COUNT(*) as visit_count
      FROM appointments
      WHERE status = 'completed'
      GROUP BY client_id
    ) client_visits
    GROUP BY DATE_TRUNC('month', first_visit)
    ORDER BY cohort_month DESC
  `,
  
  // Provider performance
  providerPerformance: `
    SELECT 
      p.id as provider_id,
      u.first_name || ' ' || u.last_name as provider_name,
      COUNT(a.id) as total_appointments,
      COUNT(CASE WHEN a.status = 'completed' THEN 1 END) as completed,
      COUNT(CASE WHEN a.status = 'cancelled' THEN 1 END) as cancelled,
      COUNT(CASE WHEN a.status = 'no_show' THEN 1 END) as no_shows,
      SUM(t.amount) as total_revenue,
      AVG(f.rating) as avg_rating
    FROM providers p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN appointments a ON p.id = a.provider_id
    LEFT JOIN transactions t ON a.id = t.appointment_id
    LEFT JOIN client_feedback f ON a.id = f.appointment_id
    GROUP BY p.id, u.first_name, u.last_name
    ORDER BY total_revenue DESC
  `,
  
  // Booking source analysis
  bookingSourceAnalysis: `
    SELECT 
      booking_source,
      COUNT(*) as total_bookings,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
      ROUND(COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / COUNT(*) * 100, 2) as completion_rate,
      SUM(t.amount) as total_revenue
    FROM appointments a
    LEFT JOIN transactions t ON a.id = t.appointment_id
    GROUP BY booking_source
    ORDER BY total_bookings DESC
  `,
  
  // Daily/weekly trends
  appointmentTrends: `
    SELECT 
      DATE_TRUNC('week', starts_at) as week,
      EXTRACT(DOW FROM starts_at) as day_of_week,
      COUNT(*) as appointment_count
    FROM appointments
    WHERE starts_at >= NOW() - INTERVAL '90 days'
    GROUP BY DATE_TRUNC('week', starts_at), EXTRACT(DOW FROM starts_at)
    ORDER BY week DESC, day_of_week
  `,
};

// ============================================================
// SCHEDULED EXPORT CONFIGURATION
// ============================================================

export interface ScheduledExport {
  id: string;
  name: string;
  dataTypes: string[];
  format: 'csv' | 'json' | 'xlsx';
  frequency: 'daily' | 'weekly' | 'monthly';
  destination: 'email' | 's3' | 'sftp' | 'webhook';
  destinationConfig: Record<string, string>;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
}

export function getNextRunDate(frequency: ScheduledExport['frequency'], lastRun?: Date): Date {
  const now = new Date();
  const next = new Date(lastRun || now);
  
  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + 1);
      next.setHours(6, 0, 0, 0); // 6 AM
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      next.setHours(6, 0, 0, 0);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      next.setDate(1);
      next.setHours(6, 0, 0, 0);
      break;
  }
  
  return next;
}
