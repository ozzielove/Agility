# AGILITY - iOS Native Application
## UI/UX Product Requirements Document
### Version 1.0 | Generated: 2025-11-21

---

## 1. APP NAVIGATION MODEL

### 1.1 Navigation Architecture

```
Tab Bar (Bottom) - Always Visible
├── Dashboard (Home)
├── Transactions
├── Scan (Center, Prominent)
├── Invoices
└── More

Navigation Hierarchy:
- Tab-based primary navigation
- Stack navigation within tabs
- Modal sheets for creation flows
- Contextual menus for quick actions
```

### 1.2 Navigation Patterns

**Primary Navigation:** UITabBarController
- 5 tabs with icons and labels
- Center "Scan" button elevated/prominent
- Badge notifications on relevant tabs

**Secondary Navigation:** NavigationStack
- Push/pop for detail views
- Back button always available
- Swipe-back gesture enabled

**Modal Presentation:**
- Full-screen for multi-step flows
- Sheet for single actions
- Popover for iPad compatibility

### 1.3 Deep Linking Structure

```
agility://dashboard
agility://transactions/{id}
agility://scan/receipt
agility://scan/mileage
agility://invoices/{id}
agility://settings/{section}
```

---

## 2. SCREEN-BY-SCREEN BREAKDOWN

### 2.1 Onboarding Flow

#### Welcome Screen
**Purpose:** First app launch introduction
**Layout:**
- Full-screen gradient background (#00354A → #007C91 → #35C4E0)
- Agility logo centered
- Tagline: "Financial Command Center for Freelancers"
- "Get Started" button (rounded, white text on gradient)

#### Sign Up (Step 1 of 4)
**Components:**
- Progress indicator (dots or bar)
- "Sign in with Apple" button (primary)
- Divider with "OR"
- Email input field
- Password field (secure entry)
- "Continue" button
- "Already have account?" link

#### Business Profile (Step 2 of 4)
**Components:**
- Text: "Tell us about your business"
- Business name field (optional)
- Business type picker (Freelancer, Consultant, Creator, etc.)
- Country selector (searchable list)
- Currency selector (USD default)
- Tax year picker (January or April)
- "Continue" button

#### Connect Bank (Step 3 of 4)
**Components:**
- Illustration of bank connection
- "Connect Your Bank" primary button
- "Why connect?" expandable info
- "Skip for now" text button
- Plaid Link integration

#### Notification Permission (Step 4 of 4)
**Components:**
- Illustration of notifications
- "Stay on top of your finances"
- Permission request dialog
- "Enable" primary button
- "Not now" text button

### 2.2 Dashboard (Home Tab)

**Layout Structure:**
```
┌─────────────────────────┐
│     Greeting + Date     │
├─────────────────────────┤
│   Profit Hero Card      │
│   $5,234 ↑12%          │
├─────────────────────────┤
│ Income | Expenses Chart │
├─────────────────────────┤
│   Quick Actions Grid    │
│ [Scan] [Invoice] [+]   │
├─────────────────────────┤
│   Recent Transactions   │
│   • Uber    -$23.50    │
│   • Client  +$1,200    │
└─────────────────────────┘
```

**Components:**

#### Header Section
- Greeting: "Good morning, {Name}"
- Current date
- Notification bell icon (badge if unread)
- Settings gear icon

#### Profit Card (Hero)
- Background: Gradient mesh
- Large number: Current month profit/loss
- Percentage change from last month
- Mini sparkline chart
- Tap → Detailed P&L view

#### Financial Chart
- UISegmentedControl: "Week | Month | Quarter | Year"
- Area chart with gradient fill
- Income line (teal #35C4E0)
- Expense line (navy #00354A)
- Interactive: tap for exact values

#### Quick Actions
- 2x2 grid of action buttons
  - "Scan Receipt" (camera icon)
  - "Create Invoice" (document icon)
  - "Add Expense" (plus icon)
  - "View Reports" (chart icon)

#### Recent Transactions List
- UITableView with custom cells
- Each row: Icon, Merchant, Category pill, Amount
- Swipe actions: Categorize, Delete
- "See all →" footer link

### 2.3 Transactions Screen

**Layout:**
```
┌─────────────────────────┐
│    Search Bar           │
├─────────────────────────┤
│  Filter Pills (scroll)  │
│ [All] [Week] [Business]│
├─────────────────────────┤
│  Stats Row             │
│  Income: $X  Expense: $Y│
├─────────────────────────┤
│  Grouped List by Date  │
│  Today                  │
│  • Transaction 1        │
│  • Transaction 2        │
│  Yesterday             │
│  • Transaction 3        │
└─────────────────────────┘
```

**Components:**

#### Search Bar
- UISearchController integrated
- "Search transactions..." placeholder
- Filter icon (opens filter sheet)

#### Filter Pills
- Horizontal scroll UICollectionView
- Active filters highlighted
- Quick filters: Date ranges, Categories, Amount ranges

#### Transaction List
- Grouped by date (sections)
- Custom cell design:
  - Leading: Category icon/emoji
  - Title: Merchant name
  - Subtitle: Category
  - Trailing: Amount (color-coded)
- Swipe actions:
  - Leading: Edit category
  - Trailing: Delete (destructive)

### 2.4 Scan Receipt Screen (Camera)

**States:**

#### Camera Active
```
┌─────────────────────────┐
│    ✕              ⚡    │
├─────────────────────────┤
│                         │
│   Camera Viewfinder     │
│   ┌─────────────┐      │
│   │             │      │
│   │   Receipt   │      │
│   │   Overlay   │      │
│   │             │      │
│   └─────────────┘      │
│                         │
├─────────────────────────┤
│    [Capture Button]     │
└─────────────────────────┘
```

**Components:**
- AVCaptureVideoPreviewLayer (full screen)
- Document detection overlay (animated corners)
- Auto-capture when stable
- Manual capture button
- Flash toggle
- Close button

#### Processing State
- Captured image with blur
- Loading spinner overlay
- "Processing receipt..." text
- Progress indicator

#### Review State
```
┌─────────────────────────┐
│  ✕   Receipt    Retake │
├─────────────────────────┤
│   [Receipt Image]       │
├─────────────────────────┤
│  Merchant: Starbucks    │
│  Amount: $12.50         │
│  Date: Nov 21, 2024     │
│  Category: Meals ▼     │
│  [ ] Tax Deductible    │
├─────────────────────────┤
│  Notes: (optional)      │
├─────────────────────────┤
│     [Save Receipt]      │
└─────────────────────────┘
```

**Components:**
- Image view (zoomable)
- Extracted fields (editable)
- Category picker
- Tax deductible switch
- Notes text field
- Save button (gradient)

### 2.5 Invoice Creation

**Multi-step Sheet:**

#### Step 1: Client Selection
```
┌─────────────────────────┐
│  Cancel    Client   Next│
├─────────────────────────┤
│  [Search Clients]       │
├─────────────────────────┤
│  Recent Clients         │
│  • Acme Corp           │
│  • StartupXYZ          │
├─────────────────────────┤
│  + New Client          │
└─────────────────────────┘
```

#### Step 2: Line Items
```
┌─────────────────────────┐
│  Back   Line Items  Next│
├─────────────────────────┤
│  + Add Item            │
├─────────────────────────┤
│  Design Work           │
│  10 hrs @ $150  $1,500 │
├─────────────────────────┤
│  Subtotal:     $1,500  │
│  Tax (0%):         $0  │
│  Total:        $1,500  │
└─────────────────────────┘
```

#### Step 3: Details
```
┌─────────────────────────┐
│  Back    Details   Send │
├─────────────────────────┤
│  Invoice #: INV-001     │
│  Issue Date: Today      │
│  Due Date: 30 days     │
│  Terms: Net 30         │
│  Notes: (optional)     │
├─────────────────────────┤
│  [Preview PDF]         │
│  [Send Invoice]        │
└─────────────────────────┘
```

### 2.6 Invoice Detail View

```
┌─────────────────────────┐
│  <  Invoice #001   ••• │
├─────────────────────────┤
│  Status: [Sent] badge   │
├─────────────────────────┤
│  To: Acme Corp         │
│  contact@acme.com      │
├─────────────────────────┤
│  Items:                │
│  • Design Work $1,500  │
├─────────────────────────┤
│  Total: $1,500         │
├─────────────────────────┤
│  [Mark as Paid]        │
│  [Send Reminder]       │
│  [Share PDF]           │
└─────────────────────────┘
```

### 2.7 Insights Screen

```
┌─────────────────────────┐
│      Tax Summary        │
│   Q4 2024: $2,450 due  │
│   [=========>  ] 75%   │
├─────────────────────────┤
│   Category Breakdown    │
│   [Donut Chart]        │
├─────────────────────────┤
│   AI Insights          │
│   💡 Save $200/month   │
│   📊 Revenue up 23%    │
├─────────────────────────┤
│   [Export Reports]     │
└─────────────────────────┘
```

**Components:**
- Tax estimate card with progress
- Interactive donut chart
- AI recommendation cards
- Export actions

### 2.8 Settings Screen

**Sections (UITableView Grouped):**

#### Account Section
- Profile (name, email, photo)
- Business Details
- Subscription & Billing

#### Preferences Section
- Default Currency
- Tax Settings
- Categories
- Notifications

#### Data Section
- Connected Banks
- Import/Export
- Backup Settings

#### Security Section
- Face ID/Touch ID
- Change Password
- Two-Factor Auth

#### Support Section
- Help Center
- Contact Support
- Rate App
- Terms & Privacy

---

## 3. COMPONENT INVENTORY

### 3.1 Buttons

```swift
// Primary Button (Gradient)
struct PrimaryButton: View {
    // Background: Linear gradient (#00354A → #35C4E0)
    // Text: White, SF Pro Semibold
    // Height: 56pt
    // Corner radius: 28pt
    // Haptic: Impact feedback on tap
}

// Secondary Button (Outline)
struct SecondaryButton: View {
    // Border: 2pt, #007C91
    // Text: #007C91, SF Pro Medium
    // Background: Clear
    // Height: 48pt
    // Corner radius: 24pt
}

// Text Button
struct TextButton: View {
    // No background
    // Text: #007C91, SF Pro Regular
    // Underline on press
}
```

### 3.2 Input Fields

```swift
struct AgilityTextField: View {
    // Height: 56pt
    // Background: #F5FAFF (10% opacity)
    // Border: 1pt #007C91 when focused
    // Corner radius: 12pt
    // Font: SF Pro Regular, 17pt
    // Placeholder: 50% opacity
}
```

### 3.3 Cards

```swift
struct DashboardCard: View {
    // Background: White (light) / #0F1C26 (dark)
    // Corner radius: 20pt
    // Shadow: 0 4pt 12pt rgba(0,0,0,0.08)
    // Padding: 20pt
}
```

### 3.4 List Rows

```swift
struct TransactionRow: View {
    // Height: 72pt
    // Leading icon: 40pt circle
    // Title: SF Pro Medium, 17pt
    // Subtitle: SF Pro Regular, 14pt, secondary color
    // Trailing amount: SF Pro Semibold, 17pt
}
```

### 3.5 Navigation Components

```swift
struct CustomTabBar: UITabBar {
    // Height: 83pt (49pt bar + 34pt safe area)
    // Background: Blur effect
    // Selected tint: #007C91
    // Center item: Elevated with gradient
}
```

### 3.6 Charts

```swift
struct FinancialChart: View {
    // Using Swift Charts framework
    // Gradient areas under lines
    // Interactive tooltips
    // Smooth animations
}
```

### 3.7 Tags & Pills

```swift
struct CategoryPill: View {
    // Height: 28pt
    // Padding: 8pt horizontal
    // Background: Category color at 20% opacity
    // Text: Category color at 100%
    // Corner radius: 14pt
}
```

### 3.8 Status Badges

```swift
struct StatusBadge: View {
    // Paid: Green background
    // Pending: Yellow background
    // Overdue: Red background
    // Draft: Gray background
    // Corner radius: 8pt
}
```

---

## 4. VALIDATION RULES

### 4.1 Form Validation

#### Email Validation
- Format: RFC 5322 compliant
- Real-time validation
- Error: "Please enter a valid email"

#### Amount Fields
- Numeric keyboard
- Auto-format with currency symbol
- Max 2 decimal places
- Range: $0.01 - $999,999.99

#### Password Requirements
- Minimum 8 characters
- At least 1 uppercase
- At least 1 number
- Strength indicator

#### Date Validation
- Cannot be future (for expenses)
- Cannot be >90 days past (for receipts)
- Due dates must be future

### 4.2 Business Rules

#### Invoice Numbers
- Auto-increment from last
- Format: INV-{YYYY}-{0001}
- User editable
- Must be unique

#### Categories
- Maximum 20 custom categories
- Cannot delete if transactions exist
- Default categories undeletable

#### Bank Connections
- Maximum 10 accounts (Free plan)
- Unlimited (Pro plan)
- Re-authentication required after 90 days

---

## 5. LOADING STATES

### 5.1 Skeleton Screens

```swift
struct DashboardSkeleton: View {
    // Shimmer animation
    // Gray placeholders
    // Maintains layout structure
    // 0.3s fade transition
}
```

### 5.2 Pull-to-Refresh
- Standard iOS UIRefreshControl
- Branded teal color
- Haptic feedback on trigger

### 5.3 Progress Indicators
- Circular progress for determinate
- Activity spinner for indeterminate
- Inline progress bars for uploads

---

## 6. EMPTY STATES

### 6.1 No Transactions
**Visual:** Illustration of empty wallet
**Text:** "No transactions yet"
**Subtext:** "Connect your bank or add manually"
**CTA:** "Connect Bank" button

### 6.2 No Invoices
**Visual:** Illustration of documents
**Text:** "Create your first invoice"
**Subtext:** "Get paid faster with professional invoices"
**CTA:** "Create Invoice" button

### 6.3 No Receipts
**Visual:** Camera illustration
**Text:** "Scan your first receipt"
**Subtext:** "Turn paper into tax deductions"
**CTA:** "Scan Receipt" button

---

## 7. ERROR STATES

### 7.1 Network Errors
```swift
struct NetworkErrorView: View {
    // Icon: Wi-Fi slash
    // Title: "No internet connection"
    // Message: "Check your connection and try again"
    // Action: "Retry" button
}
```

### 7.2 Bank Connection Errors
- Specific error messages from Plaid
- "Reconnect" primary action
- "Contact Support" secondary

### 7.3 OCR Failures
- Show original image
- "Enter Manually" option
- "Retry Scan" option

### 7.4 Form Errors
- Inline red text below fields
- Field border turns red
- Shake animation on submit

---

## 8. OFFLINE BEHAVIOR

### 8.1 Read-Only Mode
**Available Offline:**
- View dashboard (cached)
- Browse transactions (cached)
- View invoices (cached)
- Access settings

**Unavailable Offline:**
- Bank sync
- OCR processing
- Invoice sending
- Report generation

### 8.2 Queue for Sync
**Actions Queued:**
- Manual transactions
- Category changes
- Receipt uploads
- Invoice creation

**Sync Indicator:**
- Status bar: "X items pending sync"
- Automatic sync on connection
- Manual sync option

### 8.3 Conflict Resolution
**Strategy:** Last-write-wins with review
- Server data takes precedence
- User notified of conflicts
- Option to review changes

---

## 9. ACCESSIBILITY

### 9.1 VoiceOver Support
**Requirements:**
- All interactive elements labeled
- Meaningful descriptions
- Logical navigation order
- Custom actions for complex gestures

**Labels Examples:**
```swift
scanButton.accessibilityLabel = "Scan receipt"
scanButton.accessibilityHint = "Opens camera to capture receipt"

transactionCell.accessibilityLabel = "Starbucks, Meals category, $12.50 expense"
transactionCell.accessibilityHint = "Double tap to view details"
```

### 9.2 Dynamic Type
**Support Levels:**
- Body text: scales 100%
- Headers: scales 100%
- Buttons: scales to Large
- Layout: Adjusts for larger text

### 9.3 Color & Contrast
**Requirements:**
- 4.5:1 minimum contrast ratio
- Don't rely solely on color
- Support increased contrast mode
- Alternative indicators (icons, patterns)

### 9.4 Motion
**Reduce Motion Support:**
- Disable animations
- Instant transitions
- No parallax effects
- Simple fades only

---

## 10. ANIMATIONS & TRANSITIONS

### 10.1 Screen Transitions
```swift
// Navigation push/pop
Duration: 0.35s
Timing: .easeInOut
Type: Slide

// Modal presentation
Duration: 0.4s
Timing: .spring(response: 0.4, dampingFraction: 0.8)
Type: Slide up with dimmed background

// Tab switches
Duration: 0.2s
Type: Fade
```

### 10.2 Micro-interactions
```swift
// Button tap
Scale: 0.95
Duration: 0.1s
Haptic: .impact(.light)

// Toggle switch
Duration: 0.25s
Spring animation
Haptic: .selection

// Pull to refresh
Elastic bounce
Haptic: .impact(.medium)
```

### 10.3 Loading Animations
```swift
// Skeleton shimmer
Duration: 1.5s loop
Gradient: 20% white overlay
Direction: Left to right

// Success checkmark
Duration: 0.4s
Type: Draw path animation
Color: Green
```

---

## 11. COLOR SYSTEM

### 11.1 Brand Colors
```swift
enum AgilityColors {
    // Primary
    static let primaryDark = Color(hex: "00354A")    // Deep navy-teal
    static let primaryMid = Color(hex: "007C91")     // Hero color
    static let primaryLight = Color(hex: "35C4E0")   // Accent
    
    // Neutrals
    static let background = Color(hex: "050B10")      // Dark bg
    static let surface = Color(hex: "0F1C26")        // Cards
    static let border = Color(hex: "1E3442")         // Dividers
    static let textPrimary = Color(hex: "F5FAFF")    // Main text
    static let textSecondary = Color(hex: "A3B7C5")  // Muted text
    
    // Status
    static let success = Color(hex: "29CC97")
    static let warning = Color(hex: "FFC857")
    static let error = Color(hex: "FF5171")
    static let info = Color(hex: "35C4E0")
}
```

### 11.2 Gradients
```swift
extension LinearGradient {
    static let agilityPrimary = LinearGradient(
        colors: [.primaryDark, .primaryMid, .primaryLight],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
```

---

## 12. TYPOGRAPHY

### 12.1 Type Scale
```swift
enum Typography {
    // Headers
    static let largeTitle = Font.system(size: 34, weight: .bold)
    static let title1 = Font.system(size: 28, weight: .semibold)
    static let title2 = Font.system(size: 22, weight: .semibold)
    static let title3 = Font.system(size: 20, weight: .semibold)
    
    // Body
    static let body = Font.system(size: 17, weight: .regular)
    static let callout = Font.system(size: 16, weight: .regular)
    static let footnote = Font.system(size: 13, weight: .regular)
    static let caption = Font.system(size: 12, weight: .regular)
    
    // Special
    static let amount = Font.system(size: 32, weight: .bold, design: .rounded)
}
```

---

## 13. SPACING SYSTEM

### 13.1 Grid
```swift
enum Spacing {
    static let xs = 4.0   // Tight spacing
    static let s = 8.0    // Component padding
    static let m = 16.0   // Default spacing
    static let l = 24.0   // Section spacing
    static let xl = 32.0  // Large gaps
    static let xxl = 48.0 // Hero sections
}
```

### 13.2 Layout Margins
- Screen edges: 20pt
- Card padding: 16pt
- List insets: 16pt
- Safe area respected

---

## 14. INTERACTION PATTERNS

### 14.1 Gestures
**Supported Gestures:**
- Tap (primary action)
- Long press (context menu)
- Swipe (navigation, actions)
- Pinch (zoom on images)
- Pull down (refresh)
- Pan (dismiss modals)

### 14.2 Haptic Feedback
```swift
enum HapticFeedback {
    case selection     // Toggle, picker selection
    case impact(.light) // Button tap
    case impact(.medium) // Refresh triggered
    case impact(.heavy) // Delete action
    case notification(.success) // Save complete
    case notification(.error)   // Error occurred
}
```

### 14.3 Context Menus
**Long-press Actions:**
- Transactions: Edit, Duplicate, Delete
- Invoices: Send, Duplicate, Delete
- Receipts: View, Re-scan, Delete

---

## 15. RESPONSIVE DESIGN (iPad)

### 15.1 Layout Adaptations
```swift
// Compact width (iPhone)
if horizontalSizeClass == .compact {
    // Single column
    // Full-width cards
    // Bottom tab bar
}

// Regular width (iPad)
if horizontalSizeClass == .regular {
    // Sidebar navigation
    // Multi-column grid
    // Floating panels
}
```

### 15.2 Split View Support
- Master-detail navigation
- Sidebar always visible (landscape)
- Collapsible sidebar (portrait)
- Popovers instead of sheets

---

## 16. PLATFORM INTEGRATION

### 16.1 iOS Features
- **Widgets:** Today view, Lock screen
- **Shortcuts:** Quick expense, scan receipt
- **Spotlight:** Search transactions
- **Handoff:** Continue on other devices
- **iCloud:** Backup and sync
- **Share Sheet:** Export reports

### 16.2 Camera Integration
- Document scanner mode
- Auto-capture
- Multi-page scanning
- Photo library import

### 16.3 Notifications
**Types:**
- Invoice paid
- Tax deadline reminder
- Bank disconnection
- Weekly summary
- Unusual transaction alert

---

## APPENDIX: DESIGN TOKENS

```swift
// Complete design system tokens
struct DesignSystem {
    // Colors
    struct Colors { ... }
    
    // Typography
    struct Typography { ... }
    
    // Spacing
    struct Spacing { ... }
    
    // Radii
    struct Radii {
        static let small = 8.0
        static let medium = 12.0
        static let large = 20.0
        static let full = 999.0
    }
    
    // Shadows
    struct Shadows {
        static let small = Shadow(color: .black.opacity(0.08), radius: 4, y: 2)
        static let medium = Shadow(color: .black.opacity(0.12), radius: 8, y: 4)
        static let large = Shadow(color: .black.opacity(0.16), radius: 16, y: 8)
    }
    
    // Durations
    struct Animation {
        static let instant = 0.0
        static let fast = 0.15
        static let normal = 0.25
        static let slow = 0.35
    }
}
```

---

**Document End**

This UI/UX PRD provides comprehensive specifications for building the Agility iOS native application with SwiftUI, ensuring consistency, accessibility, and a delightful user experience aligned with iOS design patterns and the Agility brand.
