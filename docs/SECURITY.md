# Security Guidelines - Agility Financial App

## 🔐 Critical Security Notice

**NEVER commit the following to version control:**

1. `.env` files containing real API keys
2. `agile-frame/.env` or any Agile Frame config files
3. Any file containing:
   - API keys (OpenAI, Anthropic, Stripe, etc.)
   - Authentication tokens (Telegram, Figma, etc.)
   - Database credentials
   - Encryption keys
   - OAuth secrets
   - Private keys

## ✅ Exposed Secrets - IMMEDIATE ACTION REQUIRED

If you've accidentally committed secrets (as was detected), **IMMEDIATELY**:

### 1. Rotate ALL Exposed Keys

The following keys were found exposed and must be rotated:

- ❌ **OpenAI API Key**: `sk-proj-u-ttn...` → Rotate at https://platform.openai.com/api-keys
- ❌ **Anthropic API Key**: `sk-ant-api03-...` → Rotate at https://console.anthropic.com
- ❌ **Stripe Secret Key**: `sk_test_51Ra7...` → Rotate at https://dashboard.stripe.com/apikeys
- ❌ **Telegram Bot Token**: `7683028505:...` → Revoke via @BotFather
- ❌ **Notion API Key**: `secret_ntn_666...` → Rotate at https://www.notion.so/my-integrations
- ❌ **Cohere API Key**: `wwRcaYwSPc...` → Rotate at https://dashboard.cohere.com/api-keys
- ❌ **Ngrok Auth Token**: `2yWqXRXRSb...` → Rotate at https://dashboard.ngrok.com/get-started/your-authtoken
- ❌ **N8N API Key**: `eyJhbGci...` → Regenerate in n8n settings
- ❌ **Figma API Token**: (if exposed) → Rotate at https://www.figma.com/developers/api#access-tokens

### 2. Remove from Git History

```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove sensitive files from history
git filter-repo --path agile-frame/.env --invert-paths
git filter-repo --path .testsprite-config.json --invert-paths
git filter-repo --path 'Agile Frame.zip' --invert-paths

# Force push (USE WITH CAUTION)
git push origin --force --all
```

### 3. Update .gitignore

Already updated to exclude:
- All `.env*` files
- `agile-frame/` directory
- `agile-frame-extracted/`
- `*secret*.json`
- `*token*.txt`
- Uploaded zip and txt files

### 4. Use Environment Variables Properly

```javascript
// ✅ CORRECT
const apiKey = process.env.OPENAI_API_KEY;

// ❌ NEVER DO THIS
const apiKey = 'sk-proj-...hardcoded...';
```

### 5. Local Development Setup

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your actual keys
nano .env

# Verify .env is gitignored
git status  # Should NOT show .env
```

## 📋 Security Checklist

- [ ] All API keys rotated
- [ ] `.env.example` created with placeholders
- [ ] `.env` added to `.gitignore`
- [ ] Sensitive files removed from git history
- [ ] Secrets stored in environment variables
- [ ] Production secrets stored in AWS Secrets Manager / Vault
- [ ] Access logs reviewed for unauthorized usage
- [ ] Team members notified of key rotation

## 🛡️ Best Practices

### For Development
1. Use `.env.example` as template
2. Never commit `.env` to git
3. Use separate keys for dev/staging/production
4. Rotate keys every 90 days

### For Production
1. Store secrets in AWS Secrets Manager
2. Use IAM roles for AWS access (no hardcoded keys)
3. Enable secret rotation
4. Monitor for unusual API usage
5. Set up alerts for failed authentication attempts

### For TestSprite
1. Store TestSprite API key in environment variable
2. Use separate test accounts for cloud testing
3. Mask sensitive data in test reports
4. Never log PII or financial data

## 🚨 If You Suspect a Breach

1. **Immediately** revoke all compromised credentials
2. Generate new credentials
3. Update all services using the old credentials
4. Review access logs for unauthorized usage
5. Report to security team
6. Document the incident

## 📞 Security Contacts

- **Security Issues**: security@agility.app (create this)
- **Emergency**: Use this README as guide to self-remediate

## 🔗 Key Rotation Resources

- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/settings/keys
- Stripe: https://dashboard.stripe.com/apikeys
- Plaid: https://dashboard.plaid.com/developers/keys
- AWS: https://console.aws.amazon.com/iam
- Telegram: Talk to @BotFather
- Figma: https://www.figma.com/developers/api#authentication

---

**Remember: Security is everyone's responsibility. When in doubt, rotate the key.**
