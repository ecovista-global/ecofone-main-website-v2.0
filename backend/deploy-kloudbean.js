const axios = require('axios');
const crypto = require('crypto');

const FRONTEND_CONFIG = {
  name: 'Frontend (ecofone-frontend)',
  webhook: process.env.KLOUDBEAN_FRONTEND_WEBHOOK || '',
  secret: process.env.KLOUDBEAN_FRONTEND_SECRET || '',
  repo: process.env.KLOUDBEAN_FRONTEND_REPO || 'Divyansh-chaurasia786/ecofone-frontend'
};

const BACKEND_CONFIG = {
  name: 'Backend (ecofone-backend)',
  webhook: process.env.KLOUDBEAN_BACKEND_WEBHOOK || '',
  secret: process.env.KLOUDBEAN_BACKEND_SECRET || '',
  repo: process.env.KLOUDBEAN_BACKEND_REPO || 'Divyansh-chaurasia786/ecofone-backend'
};

async function triggerWebhook(config) {
  if (!config.webhook || !config.secret) {
    console.error(`❌ [${config.name}] Missing webhook URL or secret in environment variables.`);
    return;
  }
  console.log(`🚀 Triggering Kloudbean deployment for: ${config.name}...`);
  const payload = JSON.stringify({
    ref: 'refs/heads/main',
    repository: {
      full_name: config.repo,
      clone_url: `https://github.com/${config.repo}.git`,
      default_branch: 'main'
    }
  });

  const hmac = crypto.createHmac('sha256', config.secret);
  const signature = 'sha256=' + hmac.update(payload).digest('hex');

  const headers = {
    'Content-Type': 'application/json',
    'X-Hub-Signature-256': signature,
    'X-GitHub-Event': 'push',
    'User-Agent': 'GitHub-Hookshot/1.0'
  };

  try {
    const res = await axios.post(config.webhook, payload, { headers });
    if (res.data?.status || res.status === 200) {
      console.log(`✅ [${config.name}] Deployment started successfully on Kloudbean!`);
    } else {
      console.log(`⚠️ [${config.name}] Response:`, res.data);
    }
  } catch (err) {
    console.error(`❌ [${config.name}] Error:`, err.response?.data || err.message);
  }
}

async function main() {
  const target = process.argv[2] || 'all';
  if (target === 'frontend' || target === 'all') {
    await triggerWebhook(FRONTEND_CONFIG);
  }
  if (target === 'backend' || target === 'all') {
    await triggerWebhook(BACKEND_CONFIG);
  }
}

main();
