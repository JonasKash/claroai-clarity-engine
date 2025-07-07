# 🔗 Configuração do Webhook Supabase

## 📋 Pré-requisitos

1. Projeto Supabase configurado
2. Tabela `chat_leads` criada
3. Edge Function `generate-insight` deployada
4. OpenAI API Key configurada

## ⚙️ Configuração do Webhook

### 1. Acessar o Dashboard do Supabase

1. Vá para [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Database** > **Webhooks**

### 2. Criar o Webhook

1. Clique em **"Create a new webhook"**
2. Configure os seguintes campos:

**Nome:** `chat-lead-insight-trigger`

**Tabela:** `chat_leads`

**Eventos:** Selecione apenas `UPDATE`

**Filtro de Condição:**
```sql
NEW.status = 'generating_insight' AND OLD.status = 'collecting'
```

**URL da Edge Function:**
```
https://[SEU-PROJECT-REF].supabase.co/functions/v1/generate-insight
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer [SUA-SERVICE-ROLE-KEY]
```

### 3. Configurar Variáveis de Ambiente

Na Edge Function, configure as seguintes variáveis:

1. Vá para **Settings** > **Edge Functions**
2. Clique em **"Environment variables"**
3. Adicione:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
SUPABASE_URL=https://[SEU-PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Deploy da Edge Function

```bash
# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Login no Supabase
supabase login

# Link do projeto
supabase link --project-ref [SEU-PROJECT-REF]

# Deploy da função
supabase functions deploy generate-insight
```

## 🧪 Teste do Webhook

### 1. Teste Manual

1. Vá para **SQL Editor** no Supabase
2. Execute:

```sql
-- Inserir um registro de teste
INSERT INTO chat_leads (session_id, lead_data, status)
VALUES (
  'test-session-123',
  '{"nome": "João Silva", "desafio": "Gerar leads", "instagram": "@joao.silva"}',
  'collecting'
);

-- Atualizar para trigger do webhook
UPDATE chat_leads 
SET status = 'generating_insight' 
WHERE session_id = 'test-session-123';
```

### 2. Verificar Logs

1. Vá para **Edge Functions** > **Logs**
2. Procure pelos logs da função `generate-insight`
3. Verifique se o insight foi gerado e salvo

### 3. Verificar Resultado

```sql
-- Verificar se o insight foi gerado
SELECT id, status, generated_insight 
FROM chat_leads 
WHERE session_id = 'test-session-123';
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Webhook não dispara:**
   - Verifique se o filtro de condição está correto
   - Confirme se a URL da Edge Function está correta
   - Verifique os logs do webhook

2. **Edge Function falha:**
   - Verifique se as variáveis de ambiente estão configuradas
   - Confirme se a OpenAI API Key é válida
   - Verifique os logs da Edge Function

3. **Insight não é salvo:**
   - Verifique se a tabela `chat_leads` tem as colunas corretas
   - Confirme se o Service Role Key tem permissões de escrita
   - Verifique se o RLS (Row Level Security) está configurado corretamente

### Logs Úteis

```bash
# Ver logs da Edge Function
supabase functions logs generate-insight

# Ver logs do webhook
# Vá para Database > Webhooks > [seu-webhook] > Logs
```

## 📊 Monitoramento

### Métricas para Acompanhar

1. **Taxa de sucesso do webhook**
2. **Tempo de resposta da Edge Function**
3. **Taxa de erro da OpenAI API**
4. **Número de insights gerados por dia**

### Alertas Recomendados

1. Webhook falhando mais de 5 vezes em 1 hora
2. Edge Function demorando mais de 10 segundos
3. OpenAI API retornando erro de rate limit
4. Nenhum insight gerado em mais de 1 hora

## 🔒 Segurança

### Boas Práticas

1. **Nunca exponha a Service Role Key** no frontend
2. **Use RLS (Row Level Security)** na tabela `chat_leads`
3. **Configure rate limiting** na Edge Function
4. **Monitore o uso da OpenAI API** para controlar custos
5. **Valide todos os dados** antes de processar

### Configuração de RLS

```sql
-- Política para permitir apenas inserções e atualizações específicas
CREATE POLICY "Allow chat lead operations" ON chat_leads
    FOR ALL USING (
        auth.role() = 'service_role' OR 
        (auth.role() = 'anon' AND session_id IS NOT NULL)
    );
``` 