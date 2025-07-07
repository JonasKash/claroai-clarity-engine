# 🎯 **CONFIGURAÇÃO DO WORKFLOW N8N - OPERAÇÃO MICRO-DASHBOARD**

## 📋 **VISÃO GERAL**

Este documento explica como configurar o workflow do n8n para gerar análises JSON completas que alimentam o dashboard interativo da ClaroAI.

## 🔧 **ESTRUTURA DO WORKFLOW**

### **NÓ 1: WEBHOOK TRIGGER**
- **Tipo**: Webhook
- **Método**: POST
- **URL**: `https://seu-n8n.com/webhook/analise-claroai`
- **Dados Recebidos**: 
  ```json
  {
    "currentLeadState": {
      "id": "uuid-do-lead",
      "lead_data": {
        "nome": "João Silva",
        "whatsapp": "11999999999",
        "site": "joaosilva.com",
        "instagram": "@joaosilva",
        "desafio": "Aumentar vendas online"
      },
      "session_id": "fingerprint-id"
    }
  }
  ```

### **NÓ 2: HTTP REQUEST (OPCIONAL - WEB SCRAPING)**
- **Tipo**: HTTP Request
- **Método**: GET
- **URL**: `{{ $json.currentLeadState.lead_data.site }}`
- **Propósito**: Extrair dados reais do site do lead (se disponível)
- **Configuração**:
  - Timeout: 10 segundos
  - Headers: User-Agent personalizado
- **Dados Extraídos** (se disponível):
  - Número de páginas
  - Palavras-chave do título
  - Presença de formulários de contato
  - Velocidade de carregamento (estimada)

### **NÓ 3: OPENAI CHAT MODEL**
- **Modelo**: GPT-4
- **Temperatura**: 0.7
- **Max Tokens**: 2000

#### **PROMPT COMPLETO**:
```
Você é a ClaroAI, uma empresa especializada em análise de mercado e otimização de vendas. Sua missão é gerar uma análise completa e condensada para um lead, no formato de um objeto JSON estruturado.

DADOS DO LEAD:
{{ JSON.stringify($json.currentLeadState.lead_data) }}

DADOS EXTRAÍDOS DO SITE (se houver):
{{ $json.websiteData || "Não disponível" }}

CONTEXTO DE MERCADO:
- O lead está no Brasil
- Foco em negócios digitais e marketing
- Análise deve ser prática e acionável

TAREFA:
Gere um objeto JSON com a seguinte estrutura EXATA:

{
  "painel_de_controle": {
    "score_geral": {
      "valor": 65,
      "descricao": "Potencial Sólido"
    },
    "principais_kpis": [
      {
        "nome": "Presença Digital",
        "valor": "Média",
        "cor": "amarelo"
      },
      {
        "nome": "Engajamento",
        "valor": "Baixo", 
        "cor": "vermelho"
      },
      {
        "nome": "Oportunidade de Mercado",
        "valor": "Alta",
        "cor": "verde"
      }
    ]
  },
  "analise_swot": {
    "pontos_fortes": [
      "Marca com identidade visual clara",
      "Presença em redes sociais"
    ],
    "pontos_fracos": [
      "Baixa frequência de postagens",
      "Site sem chamada para ação clara"
    ],
    "oportunidades": [
      "Nicho de '{{ $json.currentLeadState.lead_data.desafio }}' em alta no Brasil",
      "Concorrentes não exploram o LinkedIn adequadamente"
    ],
    "ameacas": [
      "Saturação de anúncios no Instagram para este setor",
      "Concorrência crescente no digital"
    ]
  },
  "recomendacao_estrategica_imediata": {
    "titulo": "Ação de Impacto Rápido: Otimização da Bio do Instagram",
    "passos": [
      "Adicione uma chamada para ação clara: 'Agende sua consultoria aqui'",
      "Use um link único (Linktree/bio.link) para múltiplos CTAs",
      "Inclua palavras-chave do seu nicho na descrição",
      "Poste conteúdo 3x por semana com horários consistentes"
    ],
    "impacto_esperado": "Aumento de 15-20% nos cliques para agendamento em 7 dias"
  }
}

DIRETRIZES:
1. O score_geral.valor deve ser entre 0-100
2. Use cores: "verde", "amarelo", "vermelho" para os KPIs
3. Seja específico e personalizado com base nos dados do lead
4. Foque em ações práticas e mensuráveis
5. Use o desafio mencionado pelo lead para personalizar as oportunidades
6. Mantenha o tom profissional mas acessível

IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional.
```

### **NÓ 4: SUPABASE UPDATE**
- **Tipo**: Supabase
- **Operação**: Update
- **Tabela**: `chat_leads`
- **Where Clause**: `id = {{ $json.currentLeadState.id }}`
- **Dados para Atualizar**:
  ```json
  {
    "generated_analysis": "{{ $json.choices[0].message.content }}",
    "status": "analysis_ready"
  }
  ```

### **NÓ 5: NOTIFICAÇÃO (OPCIONAL)**
- **Tipo**: Email ou Slack
- **Propósito**: Notificar quando uma análise foi gerada
- **Conteúdo**: 
  ```
  Nova análise gerada para: {{ $json.currentLeadState.lead_data.nome }}
  Lead ID: {{ $json.currentLeadState.id }}
  Dashboard: https://claroai.com/analise/{{ $json.currentLeadState.id }}
  ```

## 🚀 **CONFIGURAÇÃO PASSO A PASSO**

### **1. Configurar Webhook**
1. Acesse seu n8n
2. Crie novo workflow
3. Adicione nó Webhook
4. Copie a URL gerada
5. Atualize `N8N_WEBHOOK_URL` no `api-server.cjs`

### **2. Configurar OpenAI**
1. Adicione nó OpenAI Chat Model
2. Configure sua API key
3. Cole o prompt acima
4. Teste com dados de exemplo

### **3. Configurar Supabase**
1. Adicione nó Supabase
2. Configure conexão com seu projeto
3. Teste a atualização da tabela

### **4. Testar Workflow**
1. Use dados de teste:
```json
{
  "currentLeadState": {
    "id": "test-uuid",
    "lead_data": {
      "nome": "Teste Silva",
      "whatsapp": "11999999999",
      "site": "teste.com",
      "instagram": "@teste",
      "desafio": "Aumentar conversões"
    }
  }
}
```

## 🔍 **MONITORAMENTO E DEBUG**

### **Logs Importantes**:
- Verificar se o JSON gerado é válido
- Confirmar atualização no Supabase
- Monitorar tempo de resposta (deve ser < 30s)

### **Tratamento de Erros**:
- Se OpenAI falhar: retry automático
- Se Supabase falhar: notificar admin
- Se JSON inválido: regenerar com prompt ajustado

## 📊 **MÉTRICAS DE SUCESSO**

- **Tempo de Geração**: < 30 segundos
- **Taxa de Sucesso**: > 95%
- **Qualidade do JSON**: 100% válido
- **Personalização**: Baseada nos dados reais do lead

## 🔧 **MANUTENÇÃO**

### **Atualizações do Prompt**:
- Revisar mensalmente
- Ajustar baseado no feedback dos leads
- Otimizar para conversões

### **Monitoramento**:
- Dashboard de métricas no n8n
- Alertas para falhas
- Backup automático dos workflows

---

**🎯 RESULTADO FINAL**: Um workflow que transforma dados básicos do lead em uma análise JSON completa, alimentando um dashboard interativo que demonstra o valor da ClaroAI e direciona para agendamento. 