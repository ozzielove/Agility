# AGILITY - iOS Native Application
## Product Requirements Document (PRD)
### Version 1.0 | Generated: 2025-11-21

---

## 1. PURPOSE & PROBLEM STATEMENT

### 1.1 Product Purpose
Agility is a mobile-first financial command center exclusively for freelancers, independent contractors, and solo entrepreneurs. The iOS native application consolidates receipt tracking, expense categorization, invoicing, tax estimation, and cash flow management into a single, streamlined mobile experience.

### 1.2 Problem Definition
**Core Problem:** 74.6 million US freelancers spend 40+ hours annually on financial management, using 5-10 fragmented tools costing $50-100/month, with desktop-first solutions that don't match their mobile lifestyle.

**Pain Points:**
- Fragmentation across multiple apps (QuickBooks, FreshBooks, Wave, Keeper Tax, Excel)
- Desktop-centric solutions in a mobile-first world
- Manual data entry and categorization consuming 8+ hours/month
- Tax anxiety with 76% citing financial management as top concern
- Expensive tool combinations ($46-81/month average)
- Poor receipt management requiring physical storage
- Bank sync failures and disconnections
- No real-time financial visibility

### 1.3 Solution
A native iOS application that:
- Replaces 5-10 tools with one unified app
- Provides instant receipt OCR with AI categorization
- Offers real-time financial dashboards
- Estimates quarterly taxes automatically
- Syncs bank accounts reliably
- Works offline with sync-when-connected
- Costs only $9.99/month

---

## 2. USER PERSONAS

### 2.1 Primary Persona: Nina the New Freelancer
**Demographics:** 28-35 years old, recently transitioned from corporate
**Tech Profile:** iPhone 14/15 user, follows productivity YouTubers
**Income:** $30-60K/year freelancing
**Pain Points:**
- "No idea if I'm profitable this month"
- "Tax stuff terrifies me"
- "Spreadsheets are overwhelming"
**Goals:**
- Survive first year freelancing
- Stay organized with minimal effort
- Avoid IRS penalties
**Willingness to Pay:** $10-20/month for peace of mind

### 2.2 Secondary Persona: Marcus the Mobile Freelancer
**Demographics:** 32-45 years old, established consultant/designer
**Tech Profile:** Latest iPhone Pro, power user, always mobile
**Income:** $80-150K/year
**Pain Points:**
- "QuickBooks mobile is unusable"
- "Need to scan receipts while traveling"
- "Banking sync breaks weekly"
**Goals:**
- Automate repetitive tasks
- Maximize tax deductions
- Invoice clients faster
**Willingness to Pay:** $15-30/month to save 5+ hours/week

### 2.3 Tertiary Persona: Sarah the Side Hustler
**Demographics:** 25-35 years old, has day job + side business
**Tech Profile:** Budget-conscious iPhone user, learns from TikTok
**Income:** $15-40K/year side income
**Pain Points:**
- "Can't afford $50/month tools"
- "Wave is too complicated"
- "Need simple expense tracking"
**Goals:**
- Track profitability
- Stay organized for taxes
- Minimize tool costs
**Willingness to Pay:** $5-10/month (price-sensitive)

---

## 3. CORE USE CASES

### UC-001: Quick Receipt Capture
**Actor:** Any user
**Trigger:** User has physical receipt
**Flow:** Open app → Tap "+" → Camera opens → Capture → OCR → Review → Save
**Value:** Instant digitization, no manual entry

### UC-002: Bank Transaction Categorization
**Actor:** Connected bank user
**Trigger:** New transactions imported
**Flow:** Auto-sync → AI categorizes → User reviews → Confirms/corrects
**Value:** 95% accurate categorization saves 2+ hours/week

### UC-003: Professional Invoice Creation
**Actor:** Service provider
**Trigger:** Need to bill client
**Flow:** Create invoice → Select template → Add items → Send
**Value:** Get paid 15 days faster

### UC-004: Tax Estimation
**Actor:** All users
**Trigger:** Quarterly tax deadline approaching
**Flow:** View tax tab → See estimates → Generate 1040-ES
**Value:** Avoid underpayment penalties

### UC-005: Financial Health Check
**Actor:** All users
**Trigger:** Daily/weekly review
**Flow:** Open dashboard → View metrics → Drill into categories
**Value:** Real-time business visibility

---

## 4. FUNCTIONAL REQUIREMENTS

### FR-001: Receipt Scanning & OCR
**Priority:** P0 (MVP Critical)
**Description:** Camera-based receipt capture with AI-powered data extraction
**Acceptance Criteria:**
- Camera launches in <1 second
- Auto-edge detection and perspective correction
- OCR extracts: merchant, amount, date, items
- 90%+ accuracy on standard receipts
- Manual override for all fields
- Offline capture with queue for processing
- Receipt image stored encrypted in app storage

### FR-002: AI Expense Categorization
**Priority:** P0 (MVP Critical)
**Description:** Automatic categorization of expenses using GPT-4o-mini
**Acceptance Criteria:**
- 75% accuracy on first use (cold start)
- 95% accuracy after 10 user corrections
- IRS Schedule C category mapping
- Custom categories (user-defined, max 20)
- Bulk recategorization support
- Learning from user patterns

### FR-003: Basic Invoicing
**Priority:** P0 (MVP Critical)
**Description:** Professional invoice creation and delivery
**Acceptance Criteria:**
- 5 pre-designed templates
- PDF generation in <2 seconds
- Email delivery via SendGrid
- Status tracking: Draft, Sent, Viewed, Paid, Overdue
- Auto-increment invoice numbering
- Line items with quantity and rate
- Tax calculation support

### FR-004: Bank Account Connection
**Priority:** P0 (MVP Critical)
**Description:** Secure bank connection via Plaid
**Acceptance Criteria:**
- Support 10,000+ US financial institutions
- OAuth2 secure authentication
- Import last 90 days on initial connection
- Daily incremental sync
- Connection status monitoring
- Manual CSV import fallback
- Duplicate transaction detection

### FR-005: Financial Dashboard
**Priority:** P0 (MVP Critical)
**Description:** Real-time financial metrics visualization
**Acceptance Criteria:**
- Instant load (<500ms)
- Current month P&L
- Cash balance from connected accounts
- Expense breakdown by category
- Income vs expense trend (6 months)
- Pull-to-refresh
- Offline mode with cached data

### FR-006: Quarterly Tax Estimates
**Priority:** P1 (Post-MVP)
**Description:** Calculate and track quarterly tax obligations
**Acceptance Criteria:**
- Self-employment tax calculation (15.3%)
- Federal income tax estimation
- State tax support (all 50 states)
- Form 1040-ES generation
- Payment reminders
- Tax savings tracker

### FR-007: Mileage Tracking
**Priority:** P1 (Post-MVP)
**Description:** Automatic trip detection and IRS-compliant logging
**Acceptance Criteria:**
- Background location tracking (user permission)
- Auto-detect trip start/stop
- Classify: Business, Personal, Medical, Charity
- IRS standard rate calculation
- Manual trip entry
- Export IRS-compliant log

### FR-008: Multi-Currency Support
**Priority:** P2 (Future)
**Description:** Handle international transactions
**Acceptance Criteria:**
- Real-time exchange rates
- Automatic conversion to base currency
- Multi-currency invoicing
- Currency gain/loss tracking

### FR-009: Accountant Portal
**Priority:** P1 (Tax Season 2026)
**Description:** Read-only access for tax professionals
**Acceptance Criteria:**
- Secure invite system
- View-only permissions
- Export tax reports
- Document sharing
- Audit trail

### FR-010: Document Storage
**Priority:** P1 (Post-MVP)
**Description:** Secure storage for financial documents
**Acceptance Criteria:**
- PDF, image upload support
- 7-year retention (IRS requirement)
- Search by date, vendor, amount
- Tagging system
- Encrypted at rest

---

## 5. NON-FUNCTIONAL REQUIREMENTS

### NFR-001: Performance
- App launch: <2 seconds cold start
- Screen transitions: <200ms
- Camera launch: <1 second
- OCR processing: <3 seconds
- Dashboard refresh: <500ms
- API response: p95 <200ms
- Offline mode: Core features functional

### NFR-002: Security
- Biometric authentication (Face ID/Touch ID)
- Keychain storage for credentials
- TLS 1.3 with certificate pinning
- AES-256 encryption at rest
- Secure Enclave for sensitive data
- No credentials in memory
- Session timeout after 15 minutes

### NFR-003: Reliability
- 99.5% uptime (43 min/month downtime max)
- Graceful degradation
- Automatic retry with exponential backoff
- Data consistency across sync
- No data loss on crash
- Backup every 24 hours

### NFR-004: Compliance
- SOC 2 Type II (Month 24 target)
- GDPR compliance
- CCPA compliance
- PCI DSS for payment data
- IRS audit trail requirements
- Apple App Store guidelines

### NFR-005: Accessibility
- VoiceOver complete support
- Dynamic Type support
- High contrast mode
- Reduced motion support
- One-handed operation
- WCAG 2.1 AA compliance

---

## 6. DATA MODEL

### 6.1 Core Entities

```swift
// User
struct User {
    let id: UUID
    let email: String
    let name: String
    let businessName: String?
    let taxId: String?
    let subscription: SubscriptionTier
    let createdAt: Date
    let settings: UserSettings
}

// Transaction
struct Transaction {
    let id: UUID
    let userId: UUID
    let accountId: UUID?
    let amount: Decimal
    let merchant: String
    let date: Date
    let category: Category
    let receipt: Receipt?
    let notes: String?
    let isBusinessExpense: Bool
    let tags: [String]
}

// Invoice
struct Invoice {
    let id: UUID
    let userId: UUID
    let invoiceNumber: String
    let client: Client
    let lineItems: [LineItem]
    let status: InvoiceStatus
    let issueDate: Date
    let dueDate: Date
    let total: Decimal
    let pdfUrl: URL?
}

// Receipt
struct Receipt {
    let id: UUID
    let transactionId: UUID?
    let imageUrl: URL
    let ocrData: OCRData
    let uploadDate: Date
    let isVerified: Bool
}
```

### 6.2 Relationships
- User → Many Accounts
- User → Many Transactions
- User → Many Invoices
- User → Many Categories
- Transaction → One Receipt (optional)
- Transaction → One Category
- Invoice → Many LineItems
- Invoice → One Client

### 6.3 Sync State Management
```swift
struct SyncState {
    let entityType: String
    let entityId: UUID
    let localVersion: Int
    let serverVersion: Int
    let lastSyncAt: Date
    let syncStatus: SyncStatus
    let conflictResolution: ConflictStrategy
}
```

---

## 7. SYSTEM ARCHITECTURE

### 7.1 iOS App Architecture

```
┌─────────────────────────────────────┐
│         iOS App (Swift/SwiftUI)     │
├─────────────────────────────────────┤
│  Presentation Layer (SwiftUI Views) │
├─────────────────────────────────────┤
│    View Models (Combine/async)      │
├─────────────────────────────────────┤
│     Domain Layer (Business Logic)   │
├─────────────────────────────────────┤
│    Repository Layer (Abstraction)   │
├─────────────────────────────────────┤
│  Data Layer (Core Data + Network)   │
├─────────────────────────────────────┤
│   Platform Services (iOS APIs)      │
└─────────────────────────────────────┘
```

### 7.2 Backend Architecture

```
iOS App
  ↓ HTTPS/REST
Supabase Edge Functions (Gateway)
  ↓
PostgreSQL (RLS enabled)
  ↓
External Services:
- Plaid (Banking)
- OpenAI (OCR/Categorization)
- SendGrid (Email)
- RevenueCat (Subscriptions)
```

### 7.3 Technology Stack

**iOS Frontend:**
- Swift 5.9+
- SwiftUI (iOS 17+)
- Combine Framework
- Core Data (offline storage)
- URLSession (networking)
- AVFoundation (camera)
- Core Location (mileage)
- LocalAuthentication (biometrics)
- StoreKit 2 (subscriptions)

**Backend Services:**
- Supabase (PostgreSQL, Auth, Storage)
- Plaid API (bank connections)
- OpenAI GPT-4 Vision (OCR)
- OpenAI GPT-4o-mini (categorization)
- SendGrid (transactional email)
- RevenueCat (subscription management)

---

## 8. EDGE CASES & CONSTRAINTS

### 8.1 OCR Edge Cases
- Faded receipts → Enhance image preprocessing
- Non-English receipts → Flag for manual review
- Handwritten receipts → Lower confidence, manual override
- Multiple receipts in photo → Split detection
- Torn/partial receipts → Best effort extraction

### 8.2 Banking Edge Cases
- MFA failures → Retry with user guidance
- Account disconnection → Re-authentication prompt
- Duplicate transactions → Intelligent deduplication
- Pending transactions → Mark and update when cleared
- Bank API downtime → Queue for retry

### 8.3 Offline Scenarios
- Receipt capture → Queue for OCR when connected
- Transaction entry → Local storage, sync later
- Invoice creation → Generate locally, send when online
- Dashboard → Show cached data with timestamp
- Conflict resolution → Server wins with user review

### 8.4 Currency Edge Cases
- Mixed currency accounts → Convert to base currency
- Exchange rate failures → Use last known rate
- Cryptocurrency → Not supported in MVP

---

## 9. ANALYTICS & METRICS

### 9.1 Acquisition Metrics
- App Store impression → Download rate: 20-30%
- Download → Sign-up rate: 60-80%
- Sign-up → Activation rate: 40-60%

### 9.2 Activation Metrics
- Time to first value: <5 minutes
- Activation = Bank connected OR Receipt scanned OR Invoice created

### 9.3 Retention Metrics
- Day 1/7/30 retention: 70%/40%/25%
- Monthly active users (MAU)
- Feature adoption rates

### 9.4 Revenue Metrics
- Free → Paid conversion: 10-15% in 30 days
- Monthly Recurring Revenue (MRR)
- Average Revenue Per User (ARPU): $10
- Lifetime Value (LTV): $180 (18 months)
- Customer Acquisition Cost (CAC): <$25
- LTV:CAC ratio: >6:1

### 9.5 Churn Metrics
- Monthly churn rate: <7%
- Cancellation reasons
- Win-back rate

---

## 10. RELEASE PLAN

### Phase 1: MVP Development (Months 1-4)
**Features:** FR-001 through FR-005
**Target:** Internal testing with 20 users
**Success:** Core features working, <3 critical bugs

### Phase 2: Beta Launch (Months 5-6)
**Platform:** TestFlight (500 users)
**Features:** Polish MVP, add FR-006
**Success:** 40% activation, 4.0+ rating

### Phase 3: Public Launch (Month 7)
**Platform:** App Store
**Marketing:** Product Hunt, Reddit, Content marketing
**Success:** 1,000 downloads, 100 paying users

### Phase 4: Growth Features (Months 8-12)
**Features:** FR-007 through FR-010
**Target:** 1,800 MRR, 180 paying users
**Success:** Break-even achieved

### Phase 5: Scale (Months 13-18)
**Features:** Advanced insights, automations
**Target:** $5,000 MRR, 500 paying users
**Success:** Sustainable founder salary

### Phase 6: Maturity (Months 19-24)
**Features:** Multi-currency, white-label options
**Target:** $10,000 MRR, 1,000 paying users
**Success:** Acquisition-ready metrics

---

## 11. AGENT SYSTEM INTEGRATION

### 11.1 Development Agents

**Zeus Agent (Product Owner)**
- Owns product vision and roadmap
- Prioritizes backlog (P0/P1/P2/P3)
- Validates acceptance criteria
- Makes go/no-go decisions

**UpYantuU Sales Agent (Scrum Master)**
- Facilitates 10-day sprints
- Enforces Definition of Ready/Done
- Tracks velocity
- Removes impediments

**Osiris Agent (Stakeholder/Growth)**
- Daily Telegram updates to founder
- Growth hacking automation
- User feedback synthesis
- Milestone alerts

### 11.2 Technical Agents

**Chronos** - Performance monitoring
**Loki** - Security and anomaly detection
**Hermes** - Data accuracy validation
**Nemesis** - Conflict resolution
**Datus** - Data normalization
**Mimir** - Predictive analytics

### 11.3 Sprint Methodology
- 10-day sprints (accelerated delivery)
- Daily async standups
- Sprint planning (Day 1)
- Sprint review (Day 10)
- Continuous deployment

---

## 12. SUCCESS CRITERIA

### 12.1 Technical Success
- All P0 features delivered
- <3 second response times
- 99.5% uptime
- Zero security breaches
- 90%+ OCR accuracy

### 12.2 Business Success
- $10K MRR by Month 18
- 1,000 paying users
- <7% monthly churn
- 6:1 LTV:CAC ratio
- 4.5+ App Store rating

### 12.3 User Success
- 40+ hours/year saved
- 95% categorization accuracy
- 15-day faster payment
- Tax compliance achieved
- Financial clarity gained
