#!/usr/bin/env node

/**
 * TestSprite Test Suite Generator
 *
 * Converts test plans into executable test suites for:
 * - Frontend (XCTest for iOS, Jest for Flutter)
 * - Backend (Jest/PyTest)
 * - E2E (Detox/Appium)
 * - Financial Flows (Custom validation)
 *
 * Automatically run in cloud via TestSprite MCP
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  projectRoot: path.resolve(__dirname, '..'),
  testPlansDir: path.join(__dirname, '../testsprite/test-plans'),
  testSuitesDir: path.join(__dirname, '../testsprite/test-suites'),
  prdPath: path.join(__dirname, '../docs/GENERATED_PRD.md'),
};

class TestSuiteGenerator {
  constructor() {
    this.testPlans = [];
    this.generatedSuites = {
      frontend: [],
      backend: [],
      e2e: [],
      financial: [],
    };
  }

  async loadTestPlans() {
    console.log('📋 Loading test plans...\n');

    if (!fs.existsSync(CONFIG.testPlansDir)) {
      console.log('⚠️  No test plans found. Run generate-test-plans.js first.\n');
      return;
    }

    const files = fs.readdirSync(CONFIG.testPlansDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const content = fs.readFileSync(path.join(CONFIG.testPlansDir, file), 'utf-8');
      this.testPlans.push(JSON.parse(content));
    }

    console.log(`✅ Loaded ${this.testPlans.length} test plans\n`);
  }

  generateFrontendTests() {
    console.log('🍎 Generating iOS XCTest suites...\n');

    const frontendPlan = this.testPlans.find(p => p.type === 'frontend');
    if (!frontendPlan) return;

    // Generate XCTest file
    const xcTestContent = this.generateXCTestSuite(frontendPlan);

    const outputPath = path.join(CONFIG.testSuitesDir, 'frontend', 'AgilityUITests.swift');
    this.ensureDirectoryExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, xcTestContent, 'utf-8');

    this.generatedSuites.frontend.push(outputPath);

    console.log(`  ✅ Generated XCTest suite: ${path.relative(CONFIG.projectRoot, outputPath)}\n`);
  }

  generateXCTestSuite(plan) {
    return `import XCTest

class AgilityUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    override func tearDownWithError() throws {
        app = nil
    }

    // MARK: - User Journey Tests

${plan.scenarios.map((scenario, i) => `
    func test_${this.camelCase(scenario.name)}() throws {
        // ${scenario.description}

${scenario.steps.map((step, j) => `        // Step ${j + 1}: ${step.action}
        ${this.generateXCTestStep(step)}`).join('\n')}

${scenario.validations.map((validation, k) => `        // Validation ${k + 1}: ${validation}
        ${this.generateXCTestValidation(validation)}`).join('\n')}
    }
`).join('\n')}

    // MARK: - Navigation Tests

    func test_MainTabNavigation() throws {
        // Test navigation between all tabs
        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.exists)

        // Dashboard tab
        tabBar.buttons["Dashboard"].tap()
        XCTAssertTrue(app.navigationBars["Dashboard"].exists)

        // Transactions tab
        tabBar.buttons["Transactions"].tap()
        XCTAssertTrue(app.navigationBars["Transactions"].exists)

        // Invoices tab
        tabBar.buttons["Invoices"].tap()
        XCTAssertTrue(app.navigationBars["Invoices"].exists)

        // Reports tab
        tabBar.buttons["Reports"].tap()
        XCTAssertTrue(app.navigationBars["Reports"].exists)

        // Settings tab
        tabBar.buttons["More"].tap()
        XCTAssertTrue(app.navigationBars["Settings"].exists)
    }

    // MARK: - Form Validation Tests

    func test_InvoiceFormValidation() throws {
        // Navigate to invoice creation
        app.tabBars.buttons["Invoices"].tap()
        app.buttons["Create Invoice"].tap()

        // Try to submit empty form
        app.buttons["Send"].tap()

        // Should show validation errors
        XCTAssertTrue(app.staticTexts["Client is required"].exists)
        XCTAssertTrue(app.staticTexts["Amount is required"].exists)

        // Fill form with valid data
        let clientField = app.textFields["Client"]
        clientField.tap()
        clientField.typeText("Acme Corp")

        let amountField = app.textFields["Amount"]
        amountField.tap()
        amountField.typeText("1250.00")

        // Submit should now work
        app.buttons["Send"].tap()

        // Should navigate to success screen
        XCTAssertTrue(app.staticTexts["Invoice Sent"].exists)
    }

    // MARK: - Error Handling Tests

    func test_NetworkErrorHandling() throws {
        // Simulate network failure
        // (This would require test server or mocking setup)

        app.tabBars.buttons["Dashboard"].tap()
        app.buttons["Refresh"].tap()

        // Should show error message
        let errorAlert = app.alerts["Error"]
        XCTAssertTrue(errorAlert.exists)
        XCTAssertTrue(errorAlert.staticTexts["Network connection failed"].exists)

        // Retry button should work
        errorAlert.buttons["Retry"].tap()
    }

    // MARK: - Performance Tests

    func testLaunchPerformance() throws {
        measure(metrics: [XCTApplicationLaunchMetric()]) {
            XCUIApplication().launch()
        }
    }

    func testDashboardLoadPerformance() throws {
        app.tabBars.buttons["Dashboard"].tap()

        measure(metrics: [XCTClockMetric(), XCTMemoryMetric()]) {
            app.buttons["Refresh"].tap()
            _ = app.staticTexts["Cash Balance"].waitForExistence(timeout: 2)
        }
    }

    // MARK: - Accessibility Tests

    func test_VoiceOverAccessibility() throws {
        // Enable VoiceOver simulation
        app.launch()

        // Check all critical elements have accessibility labels
        XCTAssertTrue(app.tabBars.buttons["Dashboard"].isAccessibilityElement)
        XCTAssertEqual(app.tabBars.buttons["Dashboard"].accessibilityLabel, "Dashboard")

        app.tabBars.buttons["Dashboard"].tap()

        XCTAssertTrue(app.buttons["Scan Receipt"].isAccessibilityElement)
        XCTAssertNotNil(app.buttons["Scan Receipt"].accessibilityLabel)
    }

    // MARK: - Helper Methods

    private func login(email: String, password: String) {
        let emailField = app.textFields["Email"]
        emailField.tap()
        emailField.typeText(email)

        let passwordField = app.secureTextFields["Password"]
        passwordField.tap()
        passwordField.typeText(password)

        app.buttons["Log In"].tap()
    }
}
`;
  }

  generateXCTestStep(step) {
    // Convert test plan step to XCTest code
    if (step.action.includes('tap') || step.action.includes('click')) {
      return `app.buttons["${step.target}"].tap()`;
    } else if (step.action.includes('enter') || step.action.includes('type')) {
      return `let field = app.textFields["${step.target}"]\n        field.tap()\n        field.typeText("${step.value}")`;
    } else if (step.action.includes('wait')) {
      return `_ = app.staticTexts["${step.target}"].waitForExistence(timeout: ${step.timeout || 5})`;
    }
    return `// TODO: Implement step - ${step.action}`;
  }

  generateXCTestValidation(validation) {
    if (validation.includes('exists') || validation.includes('visible')) {
      const element = this.extractElementName(validation);
      return `XCTAssertTrue(app.staticTexts["${element}"].exists)`;
    } else if (validation.includes('equals') || validation.includes('contains')) {
      return `// TODO: Implement validation - ${validation}`;
    }
    return `// TODO: Implement validation - ${validation}`;
  }

  generateBackendTests() {
    console.log('⚙️  Generating backend test suites...\n');

    const backendPlan = this.testPlans.find(p => p.type === 'backend');
    if (!backendPlan) return;

    const jestContent = this.generateJestSuite(backendPlan);

    const outputPath = path.join(CONFIG.testSuitesDir, 'backend', 'api.test.js');
    this.ensureDirectoryExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, jestContent, 'utf-8');

    this.generatedSuites.backend.push(outputPath);

    console.log(`  ✅ Generated Jest suite: ${path.relative(CONFIG.projectRoot, outputPath)}\n`);
  }

  generateJestSuite(plan) {
    return `/**
 * Backend API Test Suite
 * Generated by TestSprite
 */

const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
${plan.endpoints.map(endpoint => `
  describe('${endpoint.method} ${endpoint.path}', () => {
    it('should return ${endpoint.expectedStatus} for valid request', async () => {
      const response = await request(app)
        .${endpoint.method.toLowerCase()}('${endpoint.path}')
        .set('Authorization', 'Bearer test-token')
        ${endpoint.method === 'POST' || endpoint.method === 'PUT' ? `.send(${JSON.stringify(endpoint.payload, null, 8)})` : ''}
        .expect(${endpoint.expectedStatus});

      expect(response.body).toBeDefined();
      ${endpoint.validations.map(v => `expect(${v}).toBeTruthy();`).join('\n      ')}
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .${endpoint.method.toLowerCase()}('${endpoint.path}')
        .expect(401);

      expect(response.body.error).toBe('Unauthorized');
    });

    it('should validate input', async () => {
      const response = await request(app)
        .${endpoint.method.toLowerCase()}('${endpoint.path}')
        .set('Authorization', 'Bearer test-token')
        .send({})
        .expect(400);

      expect(response.body.error).toContain('validation');
    });
  });
`).join('\n')}
});

describe('Authentication', () => {
  it('should register new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should login existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!'
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword'
      })
      .expect(401);

    expect(response.body.error).toBe('Invalid credentials');
  });
});

describe('Database Operations', () => {
  it('should create transaction', async () => {
    const response = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', 'Bearer test-token')
      .send({
        merchant: 'Coffee Shop',
        amount: 4.50,
        category: 'Food & Dining',
        date: new Date().toISOString()
      })
      .expect(201);

    expect(response.body.id).toBeDefined();
  });

  it('should retrieve transactions', async () => {
    const response = await request(app)
      .get('/api/v1/transactions')
      .set('Authorization', 'Bearer test-token')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
`;
  }

  generateFinancialFlowTests() {
    console.log('💰 Generating financial flow validation tests...\n');

    const financialFlows = [
      {
        name: 'P2P Transfer Complete Flow',
        steps: [
          'Authenticate user',
          'Check sufficient balance',
          'Initiate transfer',
          'Verify MFA if required',
          'Process transaction',
          'Update balances',
          'Send notifications',
          'Create audit log',
        ],
      },
      {
        name: 'Bill Payment Flow',
        steps: [
          'Authenticate user',
          'Add payee',
          'Enter amount and schedule',
          'Review payment',
          'Confirm payment',
          'Verify payment scheduled',
          'Set up reminder',
        ],
      },
      {
        name: 'External Account Link Flow',
        steps: [
          'Authenticate user',
          'Initialize Plaid Link',
          'User authorizes bank',
          'Exchange tokens',
          'Store account securely',
          'Verify encryption',
          'Initial sync',
        ],
      },
    ];

    const testContent = `/**
 * Financial Flow Validation Tests
 * Critical end-to-end tests for financial operations
 */

const { expect } = require('@jest/globals');
const FinancialFlowValidator = require('./financial-flow-validator');

describe('Financial Flows - End-to-End', () => {
${financialFlows.map(flow => `
  describe('${flow.name}', () => {
    it('should complete entire flow successfully', async () => {
      const validator = new FinancialFlowValidator();

${flow.steps.map((step, i) => `      // Step ${i + 1}: ${step}
      await validator.${this.camelCase(step)}();
      expect(validator.getStepStatus(${i})).toBe('completed');`).join('\n')}

      // Verify final state
      expect(validator.isFlowCompleted()).toBe(true);
      expect(validator.hasErrors()).toBe(false);
    });

    it('should handle errors gracefully', async () => {
      const validator = new FinancialFlowValidator();
      validator.simulateError('network_failure');

      await expect(validator.executeFlow()).rejects.toThrow('Network error');
      expect(validator.canRetry()).toBe(true);
    });

    it('should enforce security checks', async () => {
      const validator = new FinancialFlowValidator();
      validator.setAmount(10000); // Large amount

      await validator.executeFlow();

      expect(validator.mfaRequired()).toBe(true);
      expect(validator.auditLogCreated()).toBe(true);
    });
  });
`).join('\n')}
});
`;

    const outputPath = path.join(CONFIG.testSuitesDir, 'financial', 'flows.test.js');
    this.ensureDirectoryExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, testContent, 'utf-8');

    this.generatedSuites.financial.push(outputPath);

    console.log(`  ✅ Generated financial flow tests: ${path.relative(CONFIG.projectRoot, outputPath)}\n`);
  }

  camelCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^(.)/, (_, chr) => chr.toLowerCase());
  }

  extractElementName(validation) {
    const match = validation.match(/"([^"]+)"/);
    return match ? match[1] : 'Element';
  }

  ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  generateSummary() {
    const total = Object.values(this.generatedSuites).reduce((sum, arr) => sum + arr.length, 0);

    console.log('\n📊 Test Suite Generation Summary\n');
    console.log('='.repeat(50));
    console.log(`  Frontend Tests: ${this.generatedSuites.frontend.length}`);
    console.log(`  Backend Tests: ${this.generatedSuites.backend.length}`);
    console.log(`  E2E Tests: ${this.generatedSuites.e2e.length}`);
    console.log(`  Financial Tests: ${this.generatedSuites.financial.length}`);
    console.log('='.repeat(50));
    console.log(`  Total: ${total} test suites generated\n`);

    console.log('📁 Generated files:');
    Object.entries(this.generatedSuites).forEach(([type, files]) => {
      if (files.length > 0) {
        console.log(`\n  ${type.toUpperCase()}:`);
        files.forEach(file => {
          console.log(`    - ${path.relative(CONFIG.projectRoot, file)}`);
        });
      }
    });
    console.log('');
  }

  async run() {
    try {
      await this.loadTestPlans();

      if (this.testPlans.length === 0) {
        console.log('⚠️  No test plans to process.\n');
        return 1;
      }

      this.generateFrontendTests();
      this.generateBackendTests();
      this.generateFinancialFlowTests();

      this.generateSummary();

      console.log('🎉 Test suite generation complete!\n');
      console.log('Next steps:');
      console.log('  1. Review generated tests');
      console.log('  2. Run tests locally: npm run test:all');
      console.log('  3. Run in cloud: npm run test:cloud\n');

      return 0;
    } catch (error) {
      console.error('❌ Error generating test suites:', error);
      return 1;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new TestSuiteGenerator();
  generator.run().then(code => process.exit(code));
}

module.exports = TestSuiteGenerator;
