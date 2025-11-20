# 🚀 Agility - Freelancer Financial Command Center
**Complete Monorepo | Web + iOS Native Applications**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![Swift](https://img.shields.io/badge/Swift-5.9+-orange)](https://swift.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

---

## 📋 Overview

Agility is a comprehensive financial management platform for freelancers and independent contractors. This repository contains **both the Next.js web application and iOS native application**, along with all planning documents and infrastructure code.

### 🎯 Mission
Empower every freelancer worldwide to achieve financial clarity and compliance without needing an accountant, enabling them to focus on their craft while AI handles their money.

### 💰 Business Goals
- **Month 6:** $500 MRR (50 paying users)
- **Month 12:** $1,800 MRR (180 paying users)
- **Month 18:** $10,000 MRR (1,000 paying users)

---

## 📁 Repository Structure

```
Agility/
├── web-app/                    # Next.js Web Application (40% Complete)
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── lib/                    # Utilities, types, hooks
│   ├── package.json            # Dependencies
│   └── README.md               # Web app documentation
│
├── ios-app/                    # iOS Native Application (60% Complete)
│   ├── ios/                    # Swift/SwiftUI source code
│   ├── backend/                # Node.js API backend
│   ├── testsprite/             # TestSprite CI/CD integration
│   ├── tests/                  # Test suites
│   └── README.md               # iOS app documentation
│
├── planning/                   # Project Planning Documents
│   ├── Agile Frame Vx Final.txt    # Complete PRD (2,196 lines)
│   ├── Agile Frame.zip             # Agile Framework materials
│   └── tailwindcss-main.zip        # Tailwind CSS source
│
├── docs/                       # Documentation & Reports
│   ├── PROJECT_STATUS.md       # Initial status report
│   ├── BRANCH_ANALYSIS.md      # Multi-branch analysis
│   ├── PROJECT_OVERVIEW.md     # Architecture overview
│   ├── TESTPLAN.md             # Testing strategy
│   ├── TESTSPRITE_SETUP.md     # CI/CD setup guide
│   ├── SECURITY.md             # Security guidelines
│   └── Agility Icon.png        # App icon
│
└── README.md                   # This file
```

---

## 🌐 Web Application (Next.js)

**Location:** `./web-app/`
**Status:** ✅ 40% Complete - Foundation Ready

### Tech Stack
- **Framework:** Next.js 16.0.3 (App Router)
- **React:** 19.2.0 (latest)
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x
- **UI Library:** Radix UI
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

### What's Built ✅
- ✅ Next.js foundation with App Router
- ✅ Authentication system (mock context)
- ✅ Protected route middleware
- ✅ Complete navigation (sidebar, top nav, mobile bottom nav)
- ✅ UI component library (8 components)
- ✅ Mock data system (dashboard, transactions, invoices)
- ✅ TypeScript types & Zod schemas
- ✅ Utility functions (currency, date formatting)
- ✅ Local storage integration
- ✅ Responsive design foundations

### What's Needed 🚧
- 🚧 Authentication pages (login/signup UI)
- 🚧 Complete dashboard with widgets
- 🚧 Income & Invoices pages
- 🚧 Expenses & Receipts pages
- 🚧 Insights & Analytics pages
- 🚧 Settings page
- 🚧 Backend integration (Supabase)
- 🚧 Real authentication
- 🚧 E2E tests

### Quick Start
```bash
cd web-app
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🍎 iOS Native Application

**Location:** `./ios-app/`
**Status:** ✅ 60% Complete - Production Architecture Ready

### Tech Stack
- **iOS:** Swift 5.9+, SwiftUI, Xcode 15+
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (production), SQLite (local)
- **Testing:** TestSprite MCP + XCTest + Jest
- **CI/CD:** GitHub Actions + AWS Device Farm
- **Security:** Biometric auth, E2E encryption, PCI-DSS

### What's Built ✅
- ✅ iOS app structure (Swift/SwiftUI)
- ✅ Backend API (Node.js + Express)
- ✅ TestSprite CI/CD integration
- ✅ Biometric authentication (Face ID/Touch ID)
- ✅ Database schema (PostgreSQL)
- ✅ Security infrastructure
- ✅ Test automation framework
- ✅ GitHub Actions workflow
- ✅ Comprehensive documentation

### What's Needed 🚧
- 🚧 Complete feature screens
- 🚧 Backend-iOS integration
- 🚧 Cloud testing pipeline activation
- 🚧 All financial flows implementation
- 🚧 Security audit
- 🚧 API key rotation (see SECURITY.md)
- 🚧 App Store submission prep

### Quick Start
```bash
cd ios-app

# Backend setup
cd backend
npm install
npm start

# iOS app (requires macOS + Xcode)
cd ios
open Agility.xcodeproj
```

---

## 🗺️ Development Roadmap

### ✅ Phase 0: Planning (Complete)
- Comprehensive PRD created
- Agile Framework documented
- Tech stack decisions made

### ✅ Phase 1-4: Web Foundation (Complete)
- Next.js setup ✅
- Authentication system ✅
- Navigation components ✅
- UI component library ✅

### ✅ Phase 1-3: iOS Foundation (Complete)
- iOS project structure ✅
- Backend API ✅
- TestSprite integration ✅
- Security framework ✅

### 🚧 Phase 5-8: Feature Development (In Progress)
#### Web App (4-6 weeks)
1. **Week 1-2:** Authentication pages + complete dashboard
2. **Week 3-4:** Income & Invoices pages
3. **Week 5-6:** Expenses & Receipts pages
4. **Week 7:** Settings page

#### iOS App (8-12 weeks)
1. **Week 1-3:** Complete all feature screens
2. **Week 4-6:** Backend integration
3. **Week 7-9:** Testing & QA
4. **Week 10-12:** Security audit + App Store prep

---

## 🎨 Core Features

### Financial Management
- 💰 **Account Management:** Multi-account support
- 📊 **Transaction Tracking:** Auto-categorization with AI
- 📸 **Receipt Scanning:** OCR with GPT-4 Vision
- 🧾 **Invoicing:** Professional templates, email/link sharing
- 📈 **Analytics:** P&L reports, expense breakdowns, trends

### Tax & Compliance
- 📅 **Quarterly Tax Estimates:** IRS Form 1040-ES generation
- 🚗 **Mileage Tracking:** Auto-detect trips, IRS deduction calc
- 📦 **Expense Categories:** IRS Schedule C compliant

### Security & Privacy
- 🔐 **Biometric Auth:** Face ID / Touch ID (iOS)
- 🔒 **End-to-End Encryption:** AES-256
- 🛡️ **PCI-DSS Compliance:** Payment security
- 🔑 **Multi-Factor Authentication:** SMS/Email codes

---

## 🎯 Next Steps

### Immediate (This Week)
1. **Choose Primary Platform:**
   - Option A: Focus on web app (faster to market)
   - Option B: Focus on iOS app (follows original PRD)
   - Option C: Parallel development (requires more resources)

2. **Set Up Backend:**
   - Create Supabase project
   - Configure authentication
   - Set up database schema

3. **Complete Authentication:**
   - Build login/signup pages (web)
   - Implement OAuth flows (both)
   - Add password reset

---

## 📚 Documentation

### Planning Documents
- **[Agile Frame Vx Final.txt](./planning/Agile Frame Vx Final.txt)** - Complete PRD (2,196 lines)
- **[PROJECT_STATUS.md](./docs/PROJECT_STATUS.md)** - Initial project status
- **[BRANCH_ANALYSIS.md](./docs/BRANCH_ANALYSIS.md)** - Branch analysis

### Architecture & Design
- **[PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)** - System architecture
- **[SECURITY.md](./docs/SECURITY.md)** - Security guidelines
- **[TESTPLAN.md](./docs/TESTPLAN.md)** - Testing strategy

---

## 📊 Project Metrics

### Code Statistics
| Metric | Web App | iOS App |
|--------|---------|---------|
| **Completion** | 40% | 60% |
| **Components** | 12 | 20+ |
| **Pages/Screens** | 2 (4 planned) | 8+ |

### Repository Health
- ✅ All branches consolidated
- ✅ Clean directory structure
- ✅ Documentation complete
- ✅ No merge conflicts
- ✅ ESLint passing (web)

---

## 🔒 Security

**DO NOT** commit API keys or secrets to git. All sensitive data goes in `.env` files (gitignored).

See [SECURITY.md](./docs/SECURITY.md) for complete security guidelines.

---

## 📈 Version History

- **v0.4.0** (2025-11-20) - Repository consolidation complete
- **v0.3.0** (2025-11-20) - iOS app with TestSprite integration
- **v0.2.0** (2025-11-20) - Next.js web app foundation
- **v0.1.0** (2025-11-18) - Initial PRD and planning documents

---

**Status:** 🚀 Consolidated & Ready for Development
**Next Milestone:** Complete authentication + dashboard
**Target Launch:** Web MVP in 6 weeks, iOS in 12 weeks

Let's build this! 💪
