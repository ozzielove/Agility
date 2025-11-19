# Agility - Production-Ready iOS Financial Application

**A comprehensive iOS financial management platform with full TestSprite MCP integration for continuous end-to-end testing and validation.**

---

## 🎯 Overview

Agility is an enterprise-grade iOS financial application built with Swift/SwiftUI and Flutter, featuring:

- **Automated Testing**: TestSprite MCP automatically analyzes your codebase, generates comprehensive PRDs, creates test plans, and runs continuous validation
- **Financial Flows**: Secure P2P transfers, bill payments, invoicing, expense tracking
- **Security First**: Bank-level security with biometric auth, encryption, PCI-DSS compliance
- **Production Ready**: Complete CI/CD pipeline, monitoring, and cloud testing infrastructure

---

## 🚀 Quick Start

### Prerequisites

- **Xcode 15+** (for iOS development)
- **Flutter SDK 3.16+** (for cross-platform)
- **Node.js 18+** (for automation scripts)
- **TestSprite Account** with API key

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd Agility

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys (NEVER commit .env!)

# Install iOS dependencies
cd ios && pod install && cd ..

# Install Flutter dependencies
cd flutter && flutter pub get && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### Configuration

1. **Add your TestSprite API key** to `.env`:
   ```bash
   TESTSPRITE_API_KEY=your_api_key_here
   ```

2. **Configure MCP** in Claude Code (see `TESTSPRITE_SETUP.md`)

3. **Add other API keys** (Plaid, Stripe, etc.) to `.env`

---

## 🧪 TestSprite Integration - The Core Feature

### How It Works

TestSprite provides a **living testing and validation engine** that:

1. **Analyzes Codebase** → Scans Swift, Dart, and backend code
2. **Generates PRD** → Creates standardized Product Requirements Document
3. **Creates Test Plans** → Frontend, backend, E2E, and financial flow tests
4. **Generates Test Suites** → Converts plans to executable tests (XCTest, Jest, etc.)
5. **Runs in Cloud** → Executes on AWS Device Farm / Firebase Test Lab
6. **Provides Results** → Screenshots, videos, stack traces, fix recommendations
7. **Maintains Tests** → Updates as code evolves, detects regressions

### Automated Workflow

```
Code Change → TestSprite Analyzes → Updates PRD → Regenerates Test Plans
→ Creates/Updates Test Suites → Runs Tests in Cloud → Analyzes Results
→ Provides Fix Recommendations → Alerts on Failures
```

### Running TestSprite

```bash
# Generate PRD from codebase
npm run generate-prd

# Generate test plans
npm run generate-test-plans

# Generate executable test suites
npm run generate-test-suites

# Run all tests locally
npm run test:all

# Run tests in cloud (requires TestSprite account)
npm run test:cloud

# Run financial flow validation
npm run test:financial-flows
```

---

## 🔐 Security - CRITICAL

### ⚠️ Exposed Secrets Detected and Fixed

API keys were found exposed in the repository and have been:
- ✅ Excluded via enhanced `.gitignore`
- ✅ Template created (`.env.example`)
- ✅ Security guide created (`SECURITY.md`)

**YOU MUST**: Rotate all keys listed in `SECURITY.md` before deploying.

---

## 📚 Documentation

- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - High-level architecture
- **[TESTSPRITE_SETUP.md](TESTSPRITE_SETUP.md)** - TestSprite MCP configuration
- **[SECURITY.md](SECURITY.md)** - Security guidelines ⚠️
- **[docs/PRD_TEMPLATE.md](docs/PRD_TEMPLATE.md)** - PRD template

---

**Built with TestSprite MCP for continuous validation and quality assurance. 🚀**