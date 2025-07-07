import { saveLead, checkDuplicateLead } from '../../lib/supabase.js';
import { 
  generateFingerprint, 
  generateRequestHash, 
  generateSimilarityHash, 
  calculateDataSimilarity,
  sendToN8n 
} from '../../utils/security.js';

// Rate limiting simples em memória (em produção, use Redis)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minuto

function checkRateLimit(clientIP) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, []);
  }
  
  const requests = rateLimitMap.get(clientIP);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(clientIP, validRequests);
  return true;
}

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // 1. Rate Limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Muitas requisições. Tente novamente em 1 minuto.' 
      });
    }

    // 2. Validação de dados
    const leadData = req.body;
    
    if (!leadData || typeof leadData !== 'object') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    // Campos obrigatórios
    const requiredFields = ['nome', 'whatsapp', 'tipoNegocio'];
    for (const field of requiredFields) {
      if (!leadData[field] || leadData[field].trim() === '') {
        return res.status(400).json({ 
          error: `Campo obrigatório ausente: ${field}` 
        });
      }
    }

    // 3. Sanitização de dados
    const sanitizedData = {
      nome: leadData.nome.trim().substring(0, 100),
      whatsapp: leadData.whatsapp.replace(/\D/g, '').substring(0, 20),
      tipoNegocio: leadData.tipoNegocio.trim().substring(0, 50),
      faturamento: leadData.faturamento?.trim().substring(0, 50) || null,
      desafio: leadData.desafio?.trim().substring(0, 100) || null,
      site: leadData.site?.trim().substring(0, 200) || null,
      instagram: leadData.instagram?.trim().substring(0, 100) || null,
      prospeccao: leadData.prospeccao?.trim().substring(0, 50) || null,
      investimento: leadData.investimento?.trim().substring(0, 50) || null,
      created_at: new Date().toISOString()
    };

    // 4. Verificação de duplicatas
    const existingLead = await checkDuplicateLead(sanitizedData.whatsapp);
    if (existingLead) {
      const timeDiff = Date.now() - new Date(existingLead.created_at).getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        return res.status(409).json({ 
          error: 'Lead já cadastrado nas últimas 24 horas',
          existingLead: existingLead.id 
        });
      }
    }

    // 5. Geração de fingerprint
    const fingerprint = generateFingerprint(
      req.headers['user-agent'],
      req.headers['x-screen-resolution'],
      req.headers['x-timezone'],
      req.headers['accept-language']
    );

    // 6. Hash de segurança
    const requestHash = generateRequestHash(sanitizedData);
    const similarityHash = generateSimilarityHash(sanitizedData);

    // 7. Salvar no Supabase
    const savedLead = await saveLead({
      ...sanitizedData,
      request_hash: requestHash,
      similarity_hash: similarityHash,
      fingerprint_hash: fingerprint.hash,
      client_ip: clientIP,
      user_agent: req.headers['user-agent']
    });

    // 8. Enviar para n8n (assíncrono)
    try {
      await sendToN8n(sanitizedData, fingerprint);
    } catch (webhookError) {
      console.error('Erro no webhook n8n (não crítico):', webhookError);
      // Não falha a requisição se o webhook falhar
    }

    // 9. Log de sucesso
    console.log('Lead processado com sucesso:', {
      id: savedLead[0]?.id,
      nome: sanitizedData.nome,
      whatsapp: sanitizedData.whatsapp,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      leadId: savedLead[0]?.id,
      message: 'Lead cadastrado com sucesso!'
    });

  } catch (error) {
    console.error('Erro no processamento do lead:', error);
    
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Tente novamente em alguns instantes'
    });
  }
} 