# 🧪 Teste do Sistema Completo

## 🚀 **COMO TESTAR AGORA**

### **1. Configuração Inicial**

#### **1.1 Variáveis de Ambiente**
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://izeugychnslqwjikgxux.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui

# Supabase Service Role (para o backend)
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# OpenAI (para geração de insights)
OPENAI_API_KEY=sk-sua_openai_key_aqui

# n8n Webhook
VITE_N8N_WEBHOOK_URL=https://n8n.guvito.site/webhook-test/teste
```

#### **1.2 Banco de Dados**
Execute o SQL no Supabase:

```sql
-- Copie e execute o conteúdo de database-schema.sql
-- Vá para SQL Editor no Supabase Dashboard
```

### **2. Executar o Sistema**

#### **2.1 Opção A: Desenvolvimento Completo**
```bash
# Terminal 1: Backend + Frontend
npm run dev:full

# Isso vai rodar:
# - Backend na porta 3001
# - Frontend na porta 8081
```

#### **2.2 Opção B: Separadamente**
```bash
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

### **3. Testar o Chat**

#### **3.1 Acessar a Aplicação**
1. Abra: `http://localhost:8081`
2. Clique no botão flutuante do chat (canto inferior direito)
3. O chat deve abrir com a mensagem inicial

#### **3.2 Fluxo de Teste**
1. **Nome**: Digite seu nome
2. **WhatsApp**: Digite um número (ex: 11999999999)
3. **Tipo de Negócio**: Digite (ex: Marketing)
4. **Desafio**: Digite (ex: Gerar leads)
5. **Instagram**: Digite (ex: @usuario)

#### **3.3 Verificar no Supabase**
1. Vá para o Supabase Dashboard
2. Tabela `chat_leads`
3. Verifique se os dados foram salvos
4. Status deve mudar para `generating_insight`

### **4. Testar Geração de Insights**

#### **4.1 Configurar Edge Function**
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link do projeto
supabase link --project-ref izeugychnslqwjikgxux

# Deploy da função
supabase functions deploy generate-insight
```

#### **4.2 Configurar Webhook**
1. Supabase Dashboard → Database → Webhooks
2. Criar webhook:
   - **Nome**: `chat-lead-insight-trigger`
   - **Tabela**: `chat_leads`
   - **Eventos**: `UPDATE`
   - **Filtro**: `NEW.status = 'generating_insight' AND OLD.status = 'collecting'`
   - **URL**: `https://izeugychnslqwjikgxux.supabase.co/functions/v1/generate-insight`

#### **4.3 Testar Insight**
1. Complete o chat até o Instagram
2. Status deve mudar para `generating_insight`
3. Webhook dispara Edge Function
4. OpenAI gera insight
5. Status muda para `insight_ready`
6. Chat mostra o insight

### **5. Verificar Logs**

#### **5.1 Backend Logs**
```bash
# No terminal do servidor
# Você verá logs como:
# POST /chat - 200
# GET /chat/status - 200
```

#### **5.2 Supabase Logs**
1. Dashboard → Edge Functions → Logs
2. Verifique logs da `generate-insight`

#### **5.3 Frontend Logs**
1. F12 no navegador
2. Console para ver logs do chat

### **6. Troubleshooting**

#### **6.1 Chat não abre**
- Verifique se o ChatProvider está no App.tsx
- Confirme se o ChatWidget está sendo renderizado

#### **6.2 API não responde**
- Verifique se o servidor está rodando na porta 3001
- Confirme se o proxy do Vite está configurado

#### **6.3 Dados não salvam**
- Verifique a Service Role Key
- Confirme se a tabela `chat_leads` existe
- Verifique RLS (Row Level Security)

#### **6.4 Insight não gera**
- Verifique OpenAI API Key
- Confirme se o webhook está configurado
- Verifique logs da Edge Function

### **7. Dados de Teste**

#### **7.1 Exemplo Completo**
```json
{
  "nome": "João Silva",
  "whatsapp": "11999999999",
  "tipoNegocio": "Marketing Digital",
  "desafio": "Gerar leads qualificados",
  "instagram": "@joao.silva"
}
```

#### **7.2 Verificar no Banco**
```sql
-- Verificar dados salvos
SELECT * FROM chat_leads ORDER BY created_at DESC LIMIT 5;

-- Verificar insights gerados
SELECT nome, generated_insight, status FROM chat_leads WHERE generated_insight IS NOT NULL;
```

### **8. Próximos Passos**

#### **8.1 Melhorias**
- [ ] Adicionar validação de dados
- [ ] Implementar rate limiting
- [ ] Adicionar autenticação
- [ ] Melhorar UI/UX

#### **8.2 Produção**
- [ ] Deploy no Vercel/Netlify
- [ ] Configurar domínio customizado
- [ ] Monitoramento e logs
- [ ] Backup automático

## 🎯 **RESULTADO ESPERADO**

Após completar o teste, você deve ter:

1. ✅ Chat flutuante funcionando
2. ✅ Dados salvos no Supabase
3. ✅ Insights gerados pela OpenAI
4. ✅ Fluxo completo de captura de leads
5. ✅ Sistema pronto para produção

**Quer testar agora?** 🚀 