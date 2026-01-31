// ============================================================
// HELLO GORGEOUS OS - LEGAL PROTECTION SYSTEM
// Comprehensive liability protection for med spa operations
// ============================================================

// ============================================================
// 1. COMPLIANCE CHECKLIST
// ============================================================

export interface ComplianceItem {
  id: string;
  category: ComplianceCategory;
  title: string;
  description: string;
  required: boolean;
  frequency: 'once' | 'annual' | 'monthly' | 'per_client' | 'per_treatment';
  status?: 'compliant' | 'non_compliant' | 'pending' | 'expires_soon';
  lastCompleted?: string;
  nextDue?: string;
  documents?: string[];
  responsible?: string;
}

export type ComplianceCategory = 
  | 'licensing'
  | 'insurance'
  | 'client_consent'
  | 'hipaa'
  | 'osha'
  | 'documentation'
  | 'training'
  | 'equipment';

export const COMPLIANCE_CHECKLIST: ComplianceItem[] = [
  // === LICENSING ===
  {
    id: 'business_license',
    category: 'licensing',
    title: 'Business License',
    description: 'Valid state/local business license for med spa operations',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'medical_director',
    category: 'licensing',
    title: 'Medical Director Agreement',
    description: 'Written agreement with supervising physician (required in IL)',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'np_license',
    category: 'licensing',
    title: 'NP/PA License',
    description: 'Valid Illinois APRN license for all nurse practitioners',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'dea_registration',
    category: 'licensing',
    title: 'DEA Registration',
    description: 'If prescribing controlled substances',
    required: false,
    frequency: 'annual',
  },
  {
    id: 'laser_certification',
    category: 'licensing',
    title: 'Laser Operator Certification',
    description: 'Required certification for laser equipment operators',
    required: true,
    frequency: 'annual',
  },

  // === INSURANCE ===
  {
    id: 'malpractice_insurance',
    category: 'insurance',
    title: 'Professional Liability (Malpractice) Insurance',
    description: 'Coverage for medical malpractice claims - minimum $1M/$3M recommended',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'general_liability',
    category: 'insurance',
    title: 'General Liability Insurance',
    description: 'Slip/fall, property damage coverage',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'workers_comp',
    category: 'insurance',
    title: 'Workers Compensation Insurance',
    description: 'Required if you have employees',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'cyber_liability',
    category: 'insurance',
    title: 'Cyber Liability Insurance',
    description: 'Coverage for data breaches and HIPAA violations',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'product_liability',
    category: 'insurance',
    title: 'Product Liability Insurance',
    description: 'If selling retail products',
    required: false,
    frequency: 'annual',
  },

  // === CLIENT CONSENT ===
  {
    id: 'informed_consent',
    category: 'client_consent',
    title: 'Informed Consent Forms',
    description: 'Treatment-specific consent signed before each procedure',
    required: true,
    frequency: 'per_treatment',
  },
  {
    id: 'hipaa_authorization',
    category: 'client_consent',
    title: 'HIPAA Authorization',
    description: 'Client authorization for use of health information',
    required: true,
    frequency: 'per_client',
  },
  {
    id: 'arbitration_agreement',
    category: 'client_consent',
    title: 'Arbitration Agreement',
    description: 'Agreement to resolve disputes through arbitration',
    required: true,
    frequency: 'per_client',
  },
  {
    id: 'photo_consent',
    category: 'client_consent',
    title: 'Photo/Media Consent',
    description: 'Permission for before/after photos',
    required: false,
    frequency: 'per_client',
  },

  // === HIPAA ===
  {
    id: 'hipaa_policies',
    category: 'hipaa',
    title: 'HIPAA Policies & Procedures',
    description: 'Written policies for PHI handling',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'hipaa_training',
    category: 'hipaa',
    title: 'HIPAA Training',
    description: 'Annual HIPAA training for all staff',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'baa_agreements',
    category: 'hipaa',
    title: 'Business Associate Agreements',
    description: 'BAAs with all vendors who access PHI (software, billing, etc.)',
    required: true,
    frequency: 'once',
  },
  {
    id: 'breach_notification',
    category: 'hipaa',
    title: 'Breach Notification Procedures',
    description: 'Documented procedures for data breach response',
    required: true,
    frequency: 'once',
  },

  // === OSHA ===
  {
    id: 'bloodborne_pathogens',
    category: 'osha',
    title: 'Bloodborne Pathogens Training',
    description: 'Annual training for staff handling blood/bodily fluids',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'sharps_disposal',
    category: 'osha',
    title: 'Sharps Disposal Program',
    description: 'Proper needle/sharps disposal containers and pickup',
    required: true,
    frequency: 'monthly',
  },
  {
    id: 'hazard_communication',
    category: 'osha',
    title: 'Hazard Communication Program',
    description: 'SDS sheets for all chemicals, labeling requirements',
    required: true,
    frequency: 'once',
  },

  // === DOCUMENTATION ===
  {
    id: 'medical_records',
    category: 'documentation',
    title: 'Medical Record Documentation',
    description: 'Complete records for every treatment including SOAP notes',
    required: true,
    frequency: 'per_treatment',
  },
  {
    id: 'adverse_event_reporting',
    category: 'documentation',
    title: 'Adverse Event Documentation',
    description: 'Document and report any adverse reactions or complications',
    required: true,
    frequency: 'per_treatment',
  },
  {
    id: 'lot_tracking',
    category: 'documentation',
    title: 'Product Lot Number Tracking',
    description: 'Track lot numbers for injectables and other products',
    required: true,
    frequency: 'per_treatment',
  },

  // === TRAINING ===
  {
    id: 'cpr_certification',
    category: 'training',
    title: 'CPR/BLS Certification',
    description: 'Current CPR certification for all clinical staff',
    required: true,
    frequency: 'annual',
  },
  {
    id: 'injection_training',
    category: 'training',
    title: 'Injectable Training & Certification',
    description: 'Documented training for each injectable product',
    required: true,
    frequency: 'once',
  },
  {
    id: 'emergency_protocols',
    category: 'training',
    title: 'Emergency Protocol Training',
    description: 'Training on anaphylaxis, vascular occlusion response',
    required: true,
    frequency: 'annual',
  },

  // === EQUIPMENT ===
  {
    id: 'equipment_maintenance',
    category: 'equipment',
    title: 'Equipment Maintenance Records',
    description: 'Regular maintenance and calibration of medical equipment',
    required: true,
    frequency: 'monthly',
  },
  {
    id: 'emergency_kit',
    category: 'equipment',
    title: 'Emergency Kit Inventory',
    description: 'Epi-pens, hyaluronidase, emergency medications current and accessible',
    required: true,
    frequency: 'monthly',
  },
];

// ============================================================
// 2. INCIDENT REPORTING SYSTEM
// ============================================================

export type IncidentSeverity = 'minor' | 'moderate' | 'severe' | 'critical';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  
  // What happened
  dateOccurred: string;
  timeOccurred: string;
  location: string;
  description: string;
  
  // Who was involved
  clientId?: string;
  clientName?: string;
  providerId?: string;
  providerName?: string;
  witnesses?: string[];
  
  // Treatment details
  treatmentType?: string;
  productUsed?: string;
  lotNumber?: string;
  
  // Response
  immediateActions: string;
  medicalAttentionRequired: boolean;
  medicalAttentionProvided?: string;
  clientNotified: boolean;
  
  // Follow-up
  rootCause?: string;
  preventiveMeasures?: string;
  insuranceNotified?: boolean;
  insuranceClaimNumber?: string;
  
  // Documentation
  photos?: string[];
  attachments?: string[];
  
  // Audit trail
  reportedBy: string;
  reportedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  closedBy?: string;
  closedAt?: string;
  
  notes: IncidentNote[];
}

export interface IncidentNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export type IncidentType = 
  | 'adverse_reaction'
  | 'allergic_reaction'
  | 'infection'
  | 'bruising_excessive'
  | 'swelling_excessive'
  | 'vascular_occlusion'
  | 'nerve_damage'
  | 'burn'
  | 'scarring'
  | 'asymmetry'
  | 'product_issue'
  | 'equipment_malfunction'
  | 'client_complaint'
  | 'slip_fall'
  | 'data_breach'
  | 'other';

export const INCIDENT_TYPES: { type: IncidentType; label: string; severity: IncidentSeverity }[] = [
  { type: 'vascular_occlusion', label: 'Vascular Occlusion', severity: 'critical' },
  { type: 'allergic_reaction', label: 'Severe Allergic Reaction', severity: 'critical' },
  { type: 'nerve_damage', label: 'Nerve Damage', severity: 'severe' },
  { type: 'infection', label: 'Infection', severity: 'severe' },
  { type: 'burn', label: 'Burn', severity: 'moderate' },
  { type: 'scarring', label: 'Scarring', severity: 'moderate' },
  { type: 'adverse_reaction', label: 'Adverse Reaction', severity: 'moderate' },
  { type: 'bruising_excessive', label: 'Excessive Bruising', severity: 'minor' },
  { type: 'swelling_excessive', label: 'Excessive Swelling', severity: 'minor' },
  { type: 'asymmetry', label: 'Asymmetry/Uneven Results', severity: 'minor' },
  { type: 'product_issue', label: 'Product Issue', severity: 'moderate' },
  { type: 'equipment_malfunction', label: 'Equipment Malfunction', severity: 'moderate' },
  { type: 'client_complaint', label: 'Client Complaint', severity: 'minor' },
  { type: 'slip_fall', label: 'Slip/Fall', severity: 'moderate' },
  { type: 'data_breach', label: 'Data Breach', severity: 'critical' },
  { type: 'other', label: 'Other', severity: 'minor' },
];

// ============================================================
// 3. PROVIDER CREDENTIAL TRACKING
// ============================================================

export interface ProviderCredentials {
  providerId: string;
  providerName: string;
  credentials: Credential[];
  trainings: Training[];
  insurancePolicies: InsurancePolicy[];
}

export interface Credential {
  id: string;
  type: CredentialType;
  name: string;
  licenseNumber?: string;
  issuingBody: string;
  issuedDate: string;
  expirationDate: string;
  status: 'active' | 'expired' | 'pending_renewal' | 'suspended';
  documentUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export type CredentialType = 
  | 'medical_license'
  | 'np_license'
  | 'pa_license'
  | 'rn_license'
  | 'esthetician_license'
  | 'laser_certification'
  | 'dea_registration'
  | 'cpr_bls'
  | 'acls'
  | 'injection_certification'
  | 'other';

export interface Training {
  id: string;
  name: string;
  provider: string;
  completedDate: string;
  expirationDate?: string;
  certificateUrl?: string;
  hoursCompleted: number;
  category: 'clinical' | 'compliance' | 'safety' | 'product';
}

export interface InsurancePolicy {
  id: string;
  type: 'malpractice' | 'general_liability' | 'workers_comp' | 'cyber';
  carrier: string;
  policyNumber: string;
  coverageAmount: string;
  effectiveDate: string;
  expirationDate: string;
  documentUrl?: string;
}

// ============================================================
// 4. AUDIT TRAIL / ACTIVITY LOG
// ============================================================

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  // For PHI access
  clientId?: string;
  accessReason?: string;
}

export type AuditAction = 
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'login'
  | 'logout'
  | 'consent_signed'
  | 'treatment_completed'
  | 'payment_processed'
  | 'refund_issued';

// ============================================================
// 5. EMERGENCY PROTOCOLS
// ============================================================

export interface EmergencyProtocol {
  id: string;
  name: string;
  condition: string;
  symptoms: string[];
  immediateActions: string[];
  medications: EmergencyMedication[];
  contactNumbers: EmergencyContact[];
  followUpActions: string[];
}

export interface EmergencyMedication {
  name: string;
  dosage: string;
  route: string;
  location: string;
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
}

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'anaphylaxis',
    name: 'Anaphylaxis Protocol',
    condition: 'Severe allergic reaction',
    symptoms: [
      'Difficulty breathing',
      'Swelling of face/throat',
      'Rapid heartbeat',
      'Dizziness/fainting',
      'Hives/rash',
      'Nausea/vomiting',
    ],
    immediateActions: [
      'Stop procedure immediately',
      'Call 911',
      'Lay patient flat with legs elevated (unless breathing difficulty)',
      'Administer epinephrine (EpiPen) 0.3mg IM to outer thigh',
      'Monitor vital signs every 2-3 minutes',
      'Prepare for CPR if needed',
      'Keep patient calm and warm',
    ],
    medications: [
      { name: 'Epinephrine (EpiPen)', dosage: '0.3mg', route: 'IM (outer thigh)', location: 'Emergency kit - top shelf' },
      { name: 'Diphenhydramine (Benadryl)', dosage: '50mg', route: 'PO or IM', location: 'Emergency kit' },
    ],
    contactNumbers: [
      { name: 'Emergency Services', role: '911', phone: '911' },
      { name: 'Poison Control', role: 'Consultation', phone: '1-800-222-1222' },
      { name: 'Medical Director', role: 'Dr. [Name]', phone: '(XXX) XXX-XXXX' },
    ],
    followUpActions: [
      'Document incident thoroughly',
      'Notify medical director within 1 hour',
      'Complete incident report',
      'Schedule follow-up with patient',
      'Report to insurance if claim anticipated',
    ],
  },
  {
    id: 'vascular_occlusion',
    name: 'Vascular Occlusion Protocol',
    condition: 'Blood vessel blocked by filler',
    symptoms: [
      'Blanching (white skin)',
      'Severe pain disproportionate to injection',
      'Dusky/blue discoloration',
      'Slow capillary refill',
      'Vision changes (if periorbital)',
      'Skin mottling',
    ],
    immediateActions: [
      'Stop injection immediately',
      'Apply warm compress to affected area',
      'Massage area vigorously',
      'Inject hyaluronidase immediately',
      'Apply nitroglycerin paste 2%',
      'If vision affected, call ophthalmology STAT and 911',
      'Continue hyaluronidase every 1-2 hours as needed',
    ],
    medications: [
      { name: 'Hyaluronidase (Hylenex)', dosage: '150-300 units', route: 'Inject into and around affected area', location: 'Refrigerator - emergency shelf' },
      { name: 'Nitroglycerin paste 2%', dosage: 'Apply thin layer', route: 'Topical', location: 'Emergency kit' },
      { name: 'Aspirin', dosage: '325mg', route: 'PO', location: 'Emergency kit' },
    ],
    contactNumbers: [
      { name: 'Emergency Services', role: '911 (if vision affected)', phone: '911' },
      { name: 'Ophthalmologist', role: 'Vision emergency', phone: '(XXX) XXX-XXXX' },
      { name: 'Medical Director', role: 'Immediate consultation', phone: '(XXX) XXX-XXXX' },
    ],
    followUpActions: [
      'Document with photos every 30 minutes',
      'Notify medical director immediately',
      'Keep patient for observation minimum 2 hours',
      'Schedule next-day follow-up',
      'Complete detailed incident report',
      'Report to product manufacturer if applicable',
    ],
  },
];

// ============================================================
// 6. HELPER FUNCTIONS
// ============================================================

/**
 * Check compliance status and get summary
 */
export function getComplianceStatus(items: ComplianceItem[]): {
  compliant: number;
  nonCompliant: number;
  pending: number;
  expiresSoon: number;
  total: number;
  percentage: number;
} {
  const compliant = items.filter(i => i.status === 'compliant').length;
  const nonCompliant = items.filter(i => i.status === 'non_compliant').length;
  const pending = items.filter(i => i.status === 'pending').length;
  const expiresSoon = items.filter(i => i.status === 'expires_soon').length;
  const total = items.length;
  
  return {
    compliant,
    nonCompliant,
    pending,
    expiresSoon,
    total,
    percentage: Math.round((compliant / total) * 100),
  };
}

/**
 * Get items expiring within days
 */
export function getExpiringItems(items: ComplianceItem[], days: number = 30): ComplianceItem[] {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  return items.filter(item => {
    if (!item.nextDue) return false;
    const dueDate = new Date(item.nextDue);
    return dueDate <= futureDate && dueDate >= new Date();
  });
}

/**
 * Get credentials expiring within days
 */
export function getExpiringCredentials(credentials: Credential[], days: number = 60): Credential[] {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  return credentials.filter(cred => {
    const expDate = new Date(cred.expirationDate);
    return expDate <= futureDate && expDate >= new Date();
  });
}

/**
 * Calculate risk score based on open incidents and compliance
 */
export function calculateRiskScore(
  incidents: Incident[],
  complianceItems: ComplianceItem[]
): { score: number; level: 'low' | 'medium' | 'high' | 'critical'; factors: string[] } {
  let score = 0;
  const factors: string[] = [];
  
  // Open incidents
  const openIncidents = incidents.filter(i => i.status !== 'closed');
  const criticalIncidents = openIncidents.filter(i => i.severity === 'critical');
  const severeIncidents = openIncidents.filter(i => i.severity === 'severe');
  
  if (criticalIncidents.length > 0) {
    score += 40;
    factors.push(`${criticalIncidents.length} critical incident(s) open`);
  }
  if (severeIncidents.length > 0) {
    score += 20;
    factors.push(`${severeIncidents.length} severe incident(s) open`);
  }
  
  // Non-compliant items
  const nonCompliant = complianceItems.filter(i => i.status === 'non_compliant');
  if (nonCompliant.length > 0) {
    score += nonCompliant.length * 10;
    factors.push(`${nonCompliant.length} compliance item(s) not met`);
  }
  
  // Expiring items
  const expiring = getExpiringItems(complianceItems, 14);
  if (expiring.length > 0) {
    score += expiring.length * 5;
    factors.push(`${expiring.length} item(s) expiring within 14 days`);
  }
  
  let level: 'low' | 'medium' | 'high' | 'critical';
  if (score >= 60) level = 'critical';
  else if (score >= 40) level = 'high';
  else if (score >= 20) level = 'medium';
  else level = 'low';
  
  return { score: Math.min(score, 100), level, factors };
}

/**
 * Format incident for legal documentation
 */
export function formatIncidentReport(incident: Incident): string {
  return `
INCIDENT REPORT
================

Report ID: ${incident.id}
Date Generated: ${new Date().toISOString()}

INCIDENT DETAILS
----------------
Type: ${INCIDENT_TYPES.find(t => t.type === incident.type)?.label || incident.type}
Severity: ${incident.severity.toUpperCase()}
Status: ${incident.status}
Date/Time Occurred: ${incident.dateOccurred} at ${incident.timeOccurred}
Location: ${incident.location}

DESCRIPTION
-----------
${incident.description}

PARTIES INVOLVED
----------------
Client: ${incident.clientName || 'N/A'} (ID: ${incident.clientId || 'N/A'})
Provider: ${incident.providerName || 'N/A'} (ID: ${incident.providerId || 'N/A'})
Witnesses: ${incident.witnesses?.join(', ') || 'None'}

TREATMENT DETAILS
-----------------
Treatment Type: ${incident.treatmentType || 'N/A'}
Product Used: ${incident.productUsed || 'N/A'}
Lot Number: ${incident.lotNumber || 'N/A'}

RESPONSE
--------
Immediate Actions Taken: ${incident.immediateActions}
Medical Attention Required: ${incident.medicalAttentionRequired ? 'YES' : 'NO'}
Medical Attention Provided: ${incident.medicalAttentionProvided || 'N/A'}
Client Notified: ${incident.clientNotified ? 'YES' : 'NO'}

ROOT CAUSE ANALYSIS
-------------------
Root Cause: ${incident.rootCause || 'Under investigation'}
Preventive Measures: ${incident.preventiveMeasures || 'To be determined'}

INSURANCE
---------
Insurance Notified: ${incident.insuranceNotified ? 'YES' : 'NO'}
Claim Number: ${incident.insuranceClaimNumber || 'N/A'}

AUDIT TRAIL
-----------
Reported By: ${incident.reportedBy}
Reported At: ${incident.reportedAt}
Reviewed By: ${incident.reviewedBy || 'Pending'}
Reviewed At: ${incident.reviewedAt || 'Pending'}
Closed By: ${incident.closedBy || 'N/A'}
Closed At: ${incident.closedAt || 'N/A'}

NOTES
-----
${incident.notes.map(n => `[${n.createdAt}] ${n.createdBy}: ${n.content}`).join('\n') || 'No notes'}

--- END OF REPORT ---
  `.trim();
}
