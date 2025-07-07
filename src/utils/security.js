import crypto from 'crypto';

// Configurações do webhook n8n
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.guvito.site/webhook-test/teste';
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET || 'your_webhook_secret_here';

export function getClientIP(req) {
  return (
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

export function hashUserAgent(ua) {
  return crypto.createHash('sha256').update(ua || '').digest('hex');
}

export function generateRequestHash(data) {
  return crypto.createHash('md5').update(
    [data.nome, data.whatsapp, data.tipoNegocio].join('|')
  ).digest('hex');
}

export function generateSimilarityHash(data) {
  return crypto.createHash('sha256').update(
    [data.nome, data.whatsapp].join('|')
  ).digest('hex');
}

export function generateWebhookSignature(payload, secret) {
  return crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
}

export function calculateDataSimilarity(a, b) {
  let fields = ['nome', 'whatsapp', 'tipoNegocio', 'faturamento', 'desafio', 'instagram'];
  let matches = 0;
  let total = 0;
  fields.forEach(field => {
    if (a[field] && b[field]) {
      total++;
      if (a[field].toLowerCase() === b[field].toLowerCase()) matches++;
    }
  });
  return total > 0 ? matches / total : 0;
}

// Função para enviar dados para o webhook n8n
export async function sendToN8n(leadData, fingerprint = {}) {
  try {
    const payload = {
      lead: leadData,
      fingerprint,
      timestamp: new Date().toISOString(),
      source: 'claroai-clarity-engine'
    };

    const signature = generateWebhookSignature(payload, WEBHOOK_SECRET);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'User-Agent': 'ClaroAI-LeadCapture/1.0'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Dados enviados para n8n com sucesso:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar dados para n8n:', error);
    throw error;
  }
}

// Função para gerar fingerprint do usuário
export function generateFingerprint(userAgent, screenResolution, timezone, language) {
  const fingerprintData = {
    userAgent: userAgent || navigator.userAgent,
    screenResolution: screenResolution || `${screen.width}x${screen.height}`,
    timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: language || navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints
  };

  return {
    ...fingerprintData,
    hash: hashUserAgent(JSON.stringify(fingerprintData))
  };
} 