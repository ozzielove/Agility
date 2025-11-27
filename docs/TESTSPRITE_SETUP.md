# TestSprite MCP Setup Guide

This guide will help you configure TestSprite MCP integration with Claude Code on the web.

## Prerequisites

- TestSprite account with API key
- Claude Code on the web access

## Configuration for Claude Code Web

### Step 1: Access MCP Settings

1. In Claude Code web interface, click on your profile or settings icon
2. Navigate to **MCP Servers** or **Integrations** settings
3. Click **Add MCP Server** or similar option

### Step 2: Add TestSprite MCP Server

Use the following configuration:

**Server Name:** TestSprite

**Command:** npx

**Arguments:**
```
@testsprite/testsprite-mcp@latest
```

**Environment Variables:**
```
API_KEY=sk-user-FNbmjuHmv3x-Z_YUXUoWwfA8z1QShxRoallFElko9WO8hll6heQhfmBI-7BvigU3a5mLsSAdedgJFSAVGEK_h-hEF5vyq0QbmkTznBlDZfo0EJvf8dLnP3Z-LgFuu0mFUxk
```

### Step 3: Save and Verify

1. Save the MCP server configuration
2. Restart or reload Claude Code if prompted
3. Verify the connection by checking if TestSprite tools are available

## Full Configuration JSON

If you need to manually configure or for reference, here's the complete JSON:

```json
{
  "mcpServers": {
    "TestSprite": {
      "command": "npx",
      "args": ["@testsprite/testsprite-mcp@latest"],
      "env": {
        "API_KEY": "sk-user-FNbmjuHmv3x-Z_YUXUoWwfA8z1QShxRoallFElko9WO8hll6heQhfmBI-7BvigU3a5mLsSAdedgJFSAVGEK_h-hEF5vyq0QbmkTznBlDZfo0EJvf8dLnP3Z-LgFuu0mFUxk"
      }
    }
  }
}
```

## Using TestSprite

Once configured, you can:

1. **Generate Test Plans**: Ask Claude to create test plans from your PRD
2. **Create Test Cases**: Automatically generate smart test cases
3. **Run Tests**: Execute tests directly from your IDE
4. **View Results**: Check results in TestSprite dashboard at https://www.testsprite.com/dashboard

## Security Note

⚠️ **IMPORTANT**: The `.testsprite-config.json` file contains your API key and is excluded from git via `.gitignore`. Never commit API keys to version control.

## Dashboard Access

Visit your TestSprite dashboard to:
- Monitor test execution
- View test results and reports
- Manage API keys
- Configure projects

Dashboard URL: https://www.testsprite.com/dashboard

## Troubleshooting

If TestSprite tools are not available:
1. Verify the API key is correct
2. Check that npx has access to install packages
3. Restart Claude Code
4. Check the MCP server logs for errors

## Next Steps

1. Create your first test by asking Claude to help with testing
2. Check the TestSprite dashboard for results
3. Explore the documentation at https://docs.testsprite.com
