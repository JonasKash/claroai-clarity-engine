# 🚀 Configuração do ClaroAI Clarity Engine

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Webhook n8n configurado

## ⚙️ Configuração do Ambiente

### 1. Variáveis de Ambiente

O arquivo `.env.local` já foi criado com as seguintes configurações:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://izeugychnslqwjikgxux.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# n8n Webhook
VITE_N8N_WEBHOOK_URL=https://n8n.guvito.site/webhook-test/teste

# Security Configuration
VITE_WEBHOOK_SECRET=your_webhook_secret_here
VITE_RATE_LIMIT_MAX_REQUESTS=10
VITE_RATE_LIMIT_WINDOW_MS=60000
```

### 2. Configuração do Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Crie uma nova tabela `leads` com a seguinte estrutura:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  tipoNegocio VARCHAR(50) NOT NULL,
  faturamento VARCHAR(50),
  desafio VARCHAR(100),
  site VARCHAR(200),
  instagram VARCHAR(100),
  prospeccao VARCHAR(50),
  investimento VARCHAR(50),
  request_hash VARCHAR(32),
  similarity_hash VARCHAR(64),
  fingerprint_hash VARCHAR(64),
  client_ip VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_request_hash ON leads(request_hash);
```

3. Copie a **Anon Key** do seu projeto Supabase e substitua `your_supabase_anon_key_here` no `.env.local`

### 3. Configuração do n8n

1. Acesse seu n8n em `https://n8n.guvito.site`
2. Crie um novo workflow com um webhook trigger
3. Configure o webhook para receber dados no formato:

```json
{
  "lead": {
    "nome": "string",
    "whatsapp": "string",
    "tipoNegocio": "string",
    "faturamento": "string",
    "desafio": "string",
    "site": "string",
    "instagram": "string",
    "prospeccao": "string",
    "investimento": "string"
  },
  "fingerprint": {
    "userAgent": "string",
    "screenResolution": "string",
    "timezone": "string",
    "language": "string",
    "hash": "string"
  },
  "timestamp": "string",
  "source": "claroai-clarity-engine"
}
```

4. Copie a URL do webhook e atualize `VITE_N8N_WEBHOOK_URL` no `.env.local`

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Produção

```bash
npm run build
npm run preview
```

## 🔒 Segurança Implementada

### Camadas de Proteção

1. **Rate Limiting**: Máximo 10 requisições por minuto por IP
2. **Validação de Dados**: Sanitização e validação de todos os campos
3. **Detecção de Duplicatas**: Verifica leads duplicados por WhatsApp
4. **Fingerprinting**: Identificação única do dispositivo
5. **Hash de Segurança**: Múltiplos hashes para detecção de spam
6. **Webhook Seguro**: Assinatura HMAC para webhooks
7. **CORS Configurado**: Controle de acesso cross-origin

### Monitoramento

- Logs detalhados de todas as operações
- Detecção de tentativas de spam
- Rastreamento de IPs e User-Agents
- Métricas de performance

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── contexts/           # Contextos da aplicação
├── hooks/              # Hooks customizados
├── lib/                # Bibliotecas externas (Supabase)
├── pages/              # Páginas da aplicação
│   └── api/           # API Routes
├── utils/              # Utilitários e segurança
└── main.tsx           # Entry point
```

## 🧪 Testando

### Fluxo de Teste

1. Acesse `/analise`
2. Complete o chat com dados de teste
3. Verifique se os dados são salvos no Supabase
4. Confirme se o webhook n8n é acionado
5. Teste a página de agendamento em `/agendamento`

### Dados de Teste

```json
{
  "nome": "João Silva",
  "whatsapp": "11999999999",
  "tipoNegocio": "Marketing",
  "faturamento": "R$10k-30k",
  "desafio": "Gerar leads",
  "site": "https://exemplo.com",
  "instagram": "@exemplo",
  "prospeccao": "Redes sociais",
  "investimento": "R$500-2k"
}
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**: Verifique se o Supabase está configurado corretamente
2. **Webhook não funciona**: Confirme se a URL do n8n está correta
3. **Rate limiting**: Aguarde 1 minuto entre testes
4. **Dados não salvos**: Verifique a Anon Key do Supabase

### Logs

Abra o DevTools (F12) e veja o console para logs detalhados de:
- Fluxo do chat
- Chamadas da API
- Erros de validação
- Status do webhook

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs no console
2. Confirme as configurações do `.env.local`
3. Teste a conectividade com Supabase e n8n
4. Verifique se todas as dependências estão instaladas 