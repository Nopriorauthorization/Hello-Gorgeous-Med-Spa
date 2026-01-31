# Consent Forms Reference

**Hello Gorgeous Med Spa - Consent Form Manual**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Overview

Consent forms are legally required documents that inform patients about procedures, risks, and alternatives before treatment. All consent forms are collected digitally through the Hello Gorgeous OS.

---

## Consent Forms by Service

### Neurotoxins (Botox, Dysport, Jeuveau)

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Neurotoxin Consent | ✓ Yes | 1 year |
| Photo Consent | Recommended | Never |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Mechanism of action
- Expected results and timeline
- Risks (bruising, asymmetry, ptosis, allergic reaction)
- Contraindications (pregnancy, neuromuscular disorders)
- Post-care instructions

---

### Dermal Fillers

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Filler Consent | ✓ Yes | 1 year |
| Photo Consent | ✓ Yes | Never |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Types of fillers used
- Injection sites and volumes
- Risks (bruising, swelling, vascular occlusion, nodules)
- Emergency protocols (hyaluronidase availability)
- Longevity expectations

---

### Weight Loss (Semaglutide, Tirzepatide)

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Weight Loss Consent | ✓ Yes | 1 year |
| Medical History | ✓ Yes | 1 year |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Medication mechanism
- Expected weight loss timeline
- Side effects (nausea, constipation, injection site reactions)
- Contraindications (thyroid cancer history, MEN 2)
- Lifestyle requirements

---

### IV Therapy

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| IV Therapy Consent | ✓ Yes | 1 year |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Vitamin/mineral contents
- Risks (infiltration, infection, allergic reaction)
- Pre-treatment requirements
- Post-treatment instructions

---

### Laser Services

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Laser Consent | ✓ Yes | Per treatment |
| Photo Consent | ✓ Yes | Never |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Type of laser used
- Treatment area
- Risks (burns, scarring, pigmentation changes)
- Pre-treatment restrictions (sun exposure, medications)
- Post-treatment care

---

### Chemical Peels

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Chemical Peel Consent | ✓ Yes | 1 year |
| Photo Consent | Recommended | Never |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Type and strength of peel
- Expected downtime
- Risks (hyperpigmentation, scarring, infection)
- Contraindications (active herpes, recent isotretinoin)
- Sun protection requirements

---

### Microneedling

| Form | Required | Expires |
|------|----------|---------|
| General Consent | ✓ Yes | 1 year |
| Microneedling Consent | ✓ Yes | 1 year |
| Photo Consent | Recommended | Never |
| HIPAA Acknowledgment | ✓ Yes | Never |

**Key Elements:**
- Needle depth used
- Treatment area
- Risks (infection, scarring, hyperpigmentation)
- Contraindications (active acne, blood thinners)
- Post-care timeline

---

## Administrative Forms

### HIPAA Notice of Privacy Practices
- **Required:** All new patients
- **Expires:** Never (one-time)
- **Content:** How PHI is used and disclosed

### Financial Agreement
- **Required:** All new patients
- **Expires:** Never (update if policies change)
- **Content:** Payment policies, cancellation fees

### Arbitration Agreement
- **Required:** Recommended for all
- **Expires:** Never
- **Content:** Agreement to resolve disputes via arbitration

### SMS Consent
- **Required:** For marketing texts
- **Expires:** Never (can be revoked)
- **Content:** TCPA-compliant opt-in

### Photo/Video Release
- **Required:** For before/after, marketing
- **Expires:** Never (can be revoked)
- **Content:** Permission to use images

---

## Consent Workflow

### New Client
```
1. Client books appointment
2. System sends intake forms
3. Client completes:
   - Medical history
   - HIPAA acknowledgment
   - Financial agreement
   - Service-specific consent
   - Photo consent
4. Provider reviews before treatment
5. Signatures stored in client profile
```

### Returning Client
```
1. System checks consent expiration
2. If expired → sends renewal request
3. Client signs updated forms
4. Provider confirms before treatment
```

### Same-Day Add-On
```
1. Client requests additional service
2. Check if consent form signed
3. If not → sign before proceeding
4. Document in treatment notes
```

---

## Digital Signature Requirements

### Valid Digital Signature
- Typed name with checkbox confirmation
- Drawn signature on screen
- Date and time stamp
- IP address logged
- Device/browser information

### Signature Storage
- Encrypted in database
- Linked to client profile
- Timestamp preserved
- Accessible in admin panel

---

## Consent Form Expiration

### Automatic Alerts
System alerts when consent forms are expiring:
- 30 days before: Yellow warning
- 7 days before: Orange warning
- Expired: Red alert (cannot proceed)

### Renewal Process
1. System sends email/SMS reminder
2. Client clicks link to review and sign
3. New consent replaces expired version
4. History preserved for records

---

## Managing Consents in System

### View Client Consents
1. Go to `/admin/clients/[id]`
2. Click "Consents" tab
3. See all signed forms with dates

### Request New Consent
1. Go to client profile
2. Click "Request Consent"
3. Select form type
4. Send via email or SMS

### Check Expiring Consents
1. Dashboard shows alerts
2. Or go to `/admin/consents`
3. Filter by "Expiring Soon"

---

## Legal Considerations

### Informed Consent Requirements (Illinois)
- Written form preferred
- Must include:
  - Nature of procedure
  - Risks and benefits
  - Alternatives
  - Questions answered
  - Voluntary signature

### Minor Consent
- Patients under 18 require parent/guardian signature
- Must verify guardian identity
- Guardian must be present for treatment

### Incapacitated Patients
- Cannot treat without legal guardian consent
- Document any concerns
- Err on side of caution

### Language Barriers
- Provide translated forms when available
- Use interpreter services
- Document translation method

---

## Documentation Best Practices

### Do:
- Collect consent BEFORE treatment
- Store originals securely
- Keep copies accessible
- Review annually
- Update after incidents

### Don't:
- Treat without valid consent
- Backdate consent forms
- Alter signed documents
- Destroy without retention period
- Share without authorization

---

## Sample Consent Checklist

### Pre-Treatment Verification
```
□ Identity verified
□ Medical history reviewed
□ General consent signed
□ Service-specific consent signed
□ Allergies confirmed
□ Contraindications checked
□ Photos taken (if applicable)
□ Questions answered
□ Client verbally confirms understanding
```

---

*All consent forms are available in the Hello Gorgeous OS at `/admin/consents`.*
