#!/usr/bin/env node

/**
 * TestSprite PRD Generator
 *
 * Automatically analyzes the entire codebase and generates a comprehensive,
 * standardized Product Requirements Document (PRD) that captures:
 * - Product goals and vision
 * - User stories and personas
 * - Functional requirements
 * - Technical constraints
 * - Test requirements
 *
 * This PRD is then used by TestSprite to generate test plans and suites.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const CONFIG = {
  projectRoot: path.resolve(__dirname, '..'),
  outputPath: path.join(__dirname, '../docs/GENERATED_PRD.md'),
  codebasePaths: [
    'ios/Agility/**/*.swift',
    'flutter/lib/**/*.dart',
    'backend/**/*.{js,ts,py}',
  ],
  excludePaths: [
    '**/node_modules/**',
    '**/build/**',
    '**/*.test.*',
    '**/*.spec.*',
  ],
};

class PRDGenerator {
  constructor() {
    this.analysis = {
      features: [],
      userStories: [],
      apiEndpoints: [],
      dataModels: [],
      securityPatterns: [],
      uiScreens: [],
    };
  }

  async analyzeCodebase() {
    console.log('📊 Analyzing codebase...\n');

    // Analyze Swift/SwiftUI files
    await this.analyzeSwiftFiles();

    // Analyze Flutter/Dart files
    await this.analyzeDartFiles();

    // Analyze Backend files
    await this.analyzeBackendFiles();

    // Extract features from code
    await this.extractFeatures();

    console.log('✅ Codebase analysis complete!\n');
  }

  async analyzeSwiftFiles() {
    console.log('  🍎 Analyzing Swift files...');

    const swiftFiles = await this.findFiles('ios/Agility/**/*.swift');

    for (const file of swiftFiles) {
      const content = fs.readFileSync(file, 'utf-8');

      // Extract ViewModels (user-facing features)
      const viewModels = content.match(/class\s+(\w+ViewModel)/g);
      if (viewModels) {
        viewModels.forEach(vm => {
          this.analysis.features.push({
            name: vm.replace('class ', '').replace('ViewModel', ''),
            type: 'UI Feature',
            file: path.relative(CONFIG.projectRoot, file),
          });
        });
      }

      // Extract API calls
      const apiCalls = content.match(/func\s+(\w+)\s*\([^)]*\)\s*async\s*throws/g);
      if (apiCalls) {
        apiCalls.forEach(call => {
          this.analysis.apiEndpoints.push({
            name: call.match(/func\s+(\w+)/)?.[1],
            file: path.relative(CONFIG.projectRoot, file),
          });
        });
      }

      // Extract data models
      const models = content.match(/struct\s+(\w+):\s*Codable/g);
      if (models) {
        models.forEach(model => {
          this.analysis.dataModels.push({
            name: model.match(/struct\s+(\w+)/)?.[1],
            file: path.relative(CONFIG.projectRoot, file),
          });
        });
      }
    }

    console.log(`    Found ${this.analysis.features.length} features`);
  }

  async analyzeDartFiles() {
    console.log('  🎯 Analyzing Flutter files...');

    const dartFiles = await this.findFiles('flutter/lib/**/*.dart');

    for (const file of dartFiles) {
      const content = fs.readFileSync(file, 'utf-8');

      // Extract UI screens
      const screens = content.match(/class\s+(\w+Screen)\s+extends\s+StatelessWidget/g);
      if (screens) {
        screens.forEach(screen => {
          this.analysis.uiScreens.push({
            name: screen.match(/class\s+(\w+Screen)/)?.[1],
            file: path.relative(CONFIG.projectRoot, file),
          });
        });
      }
    }

    console.log(`    Found ${this.analysis.uiScreens.length} UI screens`);
  }

  async analyzeBackendFiles() {
    console.log('  ⚙️  Analyzing backend files...');

    // Analyze API routes
    const backendFiles = await this.findFiles('backend/**/*.{js,ts,py}');

    for (const file of backendFiles) {
      const content = fs.readFileSync(file, 'utf-8');

      // Extract API endpoints (Express/FastAPI style)
      const routes = [
        ...content.matchAll(/app\.(get|post|put|delete)\(['"]([^'"]+)['"]/g),
        ...content.matchAll(/@app\.(get|post|put|delete)\(['"]([^'"]+)['"]/g),
      ];

      for (const route of routes) {
        this.analysis.apiEndpoints.push({
          method: route[1].toUpperCase(),
          path: route[2],
          file: path.relative(CONFIG.projectRoot, file),
        });
      }

      // Extract security patterns
      if (content.includes('JWT') || content.includes('bcrypt') || content.includes('authenticate')) {
        this.analysis.securityPatterns.push({
          pattern: 'Authentication',
          file: path.relative(CONFIG.projectRoot, file),
        });
      }
    }

    console.log(`    Found ${this.analysis.apiEndpoints.length} API endpoints`);
  }

  async extractFeatures() {
    console.log('  🔍 Extracting user stories from code...');

    // Generate user stories based on features
    this.analysis.features.forEach(feature => {
      this.analysis.userStories.push({
        id: `US-${this.analysis.userStories.length + 1}`,
        title: feature.name,
        description: `As a user, I want to use ${feature.name} so that I can manage my finances`,
        acceptanceCriteria: [
          `${feature.name} screen loads successfully`,
          'User can interact with all controls',
          'Data is persisted correctly',
          'Error handling works properly',
        ],
        priority: 'P0',
        feature: feature.name,
      });
    });
  }

  async findFiles(pattern) {
    try {
      const { stdout } = await execPromise(`find ${CONFIG.projectRoot} -path "${pattern}" 2>/dev/null || true`);
      return stdout.trim().split('\n').filter(f => f && !CONFIG.excludePaths.some(ex => f.includes(ex)));
    } catch (error) {
      return [];
    }
  }

  generatePRD() {
    console.log('📝 Generating PRD...\n');

    const prd = `# Product Requirements Document - Agility Financial App
**Generated:** ${new Date().toISOString()}
**Version:** 1.0.0
**Generated By:** TestSprite PRD Generator (Automated)

---

## 1. Executive Summary

### 1.1 Product Vision
Agility is a comprehensive iOS financial management application that empowers users to manage their finances securely, track transactions, make payments, and achieve their financial goals through an intuitive mobile experience.

### 1.2 Product Goals
1. **Security First**: Bank-level security with biometric auth and encryption
2. **User Experience**: Intuitive, fast, accessible interface
3. **Reliability**: 24/7 availability with graceful degradation
4. **Compliance**: Full regulatory compliance (PCI-DSS, SOC 2, GDPR)
5. **Scalability**: Support growth from 0 to 1M+ users

### 1.3 Success Metrics
- **User Engagement**: 40%+ onboarding activation rate
- **Transaction Success**: 99.5%+ successful completion
- **Security**: Zero security breaches
- **Performance**: < 2s API response, < 100ms UI render
- **Quality**: < 0.1% crash rate, 95%+ test coverage

---

## 2. User Stories (Generated from Code)

${this.analysis.userStories.map(us => `
### ${us.id}: ${us.title}

**Description:** ${us.description}

**Priority:** ${us.priority}

**Acceptance Criteria:**
${us.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}

**Implementation:**
- Feature: ${us.feature}
`).join('\n')}

---

## 3. Features (Detected from Codebase)

${this.analysis.features.map((f, i) => `
### Feature ${i + 1}: ${f.name}

- **Type:** ${f.type}
- **Implementation:** \`${f.file}\`
- **Status:** Implemented
`).join('\n')}

---

## 4. API Endpoints (Detected)

${this.analysis.apiEndpoints.map((api, i) => `
${i + 1}. **${api.method || 'GET'} ${api.path || api.name}**
   - File: \`${api.file}\`
`).join('\n')}

---

## 5. Data Models (Detected)

${this.analysis.dataModels.map((model, i) => `
${i + 1}. **${model.name}**
   - File: \`${model.file}\`
`).join('\n')}

---

## 6. UI Screens (Detected)

${this.analysis.uiScreens.map((screen, i) => `
${i + 1}. **${screen.name}**
   - File: \`${screen.file}\`
`).join('\n')}

---

## 7. Security Patterns (Detected)

${this.analysis.securityPatterns.map((sec, i) => `
${i + 1}. **${sec.pattern}**
   - File: \`${sec.file}\`
`).join('\n')}

---

## 8. Testing Requirements

### 8.1 Frontend Tests
${this.analysis.features.map(f => `
- **${f.name}**
  - [ ] Screen renders correctly
  - [ ] User interactions work
  - [ ] State management functions
  - [ ] Error states handled
  - [ ] Accessibility compliant
`).join('')}

### 8.2 Backend Tests
${this.analysis.apiEndpoints.map(api => `
- **${api.method || 'API'} ${api.path || api.name}**
  - [ ] Endpoint responds correctly
  - [ ] Authentication required
  - [ ] Input validation works
  - [ ] Error responses proper
  - [ ] Rate limiting applied
`).join('')}

### 8.3 Integration Tests
- [ ] End-to-end user registration flow
- [ ] Complete payment transaction flow
- [ ] Account linking and sync flow
- [ ] Biometric authentication flow
- [ ] Data persistence and retrieval

### 8.4 Security Tests
${this.analysis.securityPatterns.map(sec => `
- [ ] ${sec.pattern} security validation
`).join('')}
- [ ] Encryption at rest and in transit
- [ ] Session management security
- [ ] OWASP Top 10 compliance

---

## 9. Technical Constraints

### 9.1 Technology Stack

**Frontend (iOS)**
- Language: Swift 5.9+
- Framework: SwiftUI, Combine
- Min iOS: 15.0
- Architecture: MVVM + Clean Architecture

**Frontend (Flutter)**
- Framework: Flutter 3.16+
- State: Bloc / Riverpod

**Backend**
- Runtime: Node.js 20 LTS / Python 3.11
- Framework: Express / FastAPI
- Database: PostgreSQL 15
- Cache: Redis 7

**TestSprite Integration**
- Automated PRD generation (this document)
- Automated test plan creation
- Cloud test execution
- Continuous validation

---

## 10. Non-Functional Requirements

### 10.1 Performance
- API Response: p95 < 200ms, p99 < 500ms
- UI Render: < 100ms screen load
- Transaction Processing: < 2s end-to-end
- App Launch: < 2s cold start

### 10.2 Security
- Data Encryption: AES-256 at rest, TLS 1.3 in transit
- Authentication: OAuth2, Biometric, MFA
- Session Management: JWT with refresh tokens
- Audit Logging: Immutable logs, 7-year retention

### 10.3 Compliance
- PCI-DSS Level 1 Service Provider
- SOC 2 Type II compliance
- GDPR data privacy compliance
- App Store guidelines compliance

---

## 11. TestSprite Configuration

This PRD was automatically generated by analyzing:
- **${this.analysis.features.length}** features
- **${this.analysis.apiEndpoints.length}** API endpoints
- **${this.analysis.dataModels.length}** data models
- **${this.analysis.uiScreens.length}** UI screens
- **${this.analysis.securityPatterns.length}** security patterns

TestSprite will use this PRD to:
1. Generate comprehensive test plans
2. Create executable test suites
3. Run tests in cloud (AWS Device Farm / Firebase Test Lab)
4. Analyze results and provide fix recommendations
5. Maintain and update tests as code evolves

---

**This PRD is a living document that will be automatically updated as the codebase evolves.**
`;

    return prd;
  }

  savePRD(prd) {
    const outputDir = path.dirname(CONFIG.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(CONFIG.outputPath, prd, 'utf-8');

    console.log(`✅ PRD generated successfully!`);
    console.log(`📄 Output: ${CONFIG.outputPath}`);
    console.log(`📊 Stats:`);
    console.log(`   - ${this.analysis.features.length} features detected`);
    console.log(`   - ${this.analysis.userStories.length} user stories generated`);
    console.log(`   - ${this.analysis.apiEndpoints.length} API endpoints found`);
    console.log(`   - ${this.analysis.dataModels.length} data models found`);
    console.log(`   - ${this.analysis.uiScreens.length} UI screens found`);
    console.log(`   - ${this.analysis.securityPatterns.length} security patterns detected\n`);
  }

  async run() {
    try {
      await this.analyzeCodebase();
      const prd = this.generatePRD();
      this.savePRD(prd);

      console.log('🎉 Done! PRD ready for TestSprite test generation.\n');
      return 0;
    } catch (error) {
      console.error('❌ Error generating PRD:', error);
      return 1;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new PRDGenerator();
  generator.run().then(code => process.exit(code));
}

module.exports = PRDGenerator;
