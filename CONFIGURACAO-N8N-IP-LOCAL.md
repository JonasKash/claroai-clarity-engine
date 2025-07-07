# 🔧 **CONFIGURAÇÃO N8N: IP LOCAL E LINK CORRETO**

## 📋 **SEU IP LOCAL IDENTIFICADO**

Baseado no comando `ipconfig`, seu IP local é:

```
🌐 IP Principal: 192.168.1.6
🔌 Interface: Ethernet
🌍 Gateway: 192.168.1.1
```

## ⚠️ **PROBLEMA IDENTIFICADO**

**ATENÇÃO:** A porta 3001 já está sendo usada por outro serviço. Precisamos usar uma porta diferente.

## 🎯 **SOLUÇÕES PARA O N8N**

### **OPÇÃO 1: Usar Porta Diferente (RECOMENDADA)**

Vamos configurar o backend para rodar na porta 3002:

#### **1.1 Atualizar Backend (api-server.cjs)**
```javascript
const PORT = process.env.PORT || 3002; // Mudar de 3001 para 3002
```

#### **1.2 URL para n8n:**
```
http://192.168.1.6:3002/api/webhook/receive
```

### **OPÇÃO 2: Usar localhost (se n8n estiver na mesma máquina)**
```
http://localhost:3002/api/webhook/receive
```

### **OPÇÃO 3: Usar 127.0.0.1**
```
http://127.0.0.1:3002/api/webhook/receive
```

## ⚙️ **CONFIGURAÇÃO NO N8N**

### **PASSO 1: Atualizar Backend**
```bash
# Parar servidor atual (se estiver rodando)
# Editar api-server.cjs e mudar porta para 3002
# Reiniciar servidor
npm run dev:server
```

### **PASSO 2: Adicionar Nó HTTP Request no n8n**

1. **Acesse seu n8n**
2. **Abra o workflow existente**
3. **Adicione um novo nó** após o processamento (OpenAI, etc.)
4. **Selecione:** `HTTP Request`

### **PASSO 3: Configurar o Nó**

#### **Configurações Básicas:**
```
🔗 URL: http://192.168.1.6:3002/api/webhook/receive
📤 Método: POST
📋 Content Type: application/json
```

#### **Headers:**
```
Content-Type: application/json
User-Agent: n8n-claroai/1.0
```

#### **Body (JSON):**
```json
{
  "sessionId": "{{ $('webhook-trigger').item.json.sessionId }}",
  "response_text": "{{ $('openai-process').item.json.choices[0].message.content }}",
  "data_from_n8n": {
    "output": "{{ $('openai-process').item.json.choices[0].message.content }}"
  }
}
```

## 🔍 **VERIFICAÇÃO DE CONECTIVIDADE**

### **Teste 1: Verificar Porta 3002**
```bash
# No terminal, execute:
netstat -an | findstr :3002
```

### **Teste 2: Teste POST Manual**
```bash
# Teste com PowerShell
Invoke-WebRequest -Uri "http://192.168.1.6:3002/api/webhook/receive" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"sessionId": "test-123", "response_text": "Teste de conectividade"}'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Resposta processada com sucesso",
  "response_text": "Teste de conectividade"
}
```

## 🚨 **POSSÍVEIS PROBLEMAS E SOLUÇÕES**

### **1. Porta 3001 Ocupada**
```
Error: EADDRINUSE: address already in use :::3001
```

**Solução:**
- ✅ Usar porta 3002 (já configurado acima)
- ✅ Ou matar processo na porta 3001: `netstat -ano | findstr :3001`

### **2. Connection Refused**
```
Error: connect ECONNREFUSED 192.168.1.6:3002
```

**Solução:**
- ✅ Verificar se o backend está rodando: `npm run dev:server`
- ✅ Verificar se a porta 3002 está livre
- ✅ Verificar firewall do Windows

### **3. Timeout**
```
Error: timeout after 30 seconds
```

**Solução:**
- ✅ Verificar se o backend está respondendo
- ✅ Aumentar timeout no n8n para 60 segundos
- ✅ Verificar rede local

## 📊 **CONFIGURAÇÃO COMPLETA DO NÓ**

### **Configurações Avançadas no n8n:**

#### **Timeout:**
```
⏰ Timeout: 60000 (60 segundos)
```

#### **Retry:**
```
🔄 Retry: 3 tentativas
⏱️ Delay: 2000ms entre tentativas
```

#### **Headers Completos:**
```json
{
  "Content-Type": "application/json",
  "User-Agent": "n8n-claroai/1.0",
  "Accept": "application/json"
}
```

## 🧪 **TESTE PASSO A PASSO**

### **1. Preparar Ambiente**
```bash
# Terminal 1: Backend (porta 3002)
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

### **2. Testar n8n Manualmente**
1. **Acesse n8n**
2. **Execute workflow manualmente**
3. **Use dados de teste:**
```json
{
  "sessionId": "test-session-123",
  "mensagem_do_usuario": "Olá, teste de conectividade"
}
```

### **3. Verificar Logs**
No terminal do backend, você deve ver:
```
📨 Webhook recebido do n8n: { sessionId: 'test-session-123', ... }
✅ Resposta processada: [resposta da IA]
💾 Atualizando Supabase para sessionId: test-session-123
```

### **4. Teste Completo**
1. **Abra:** `http://localhost:8081`
2. **Clique no chat flutuante**
3. **Digite:** "Olá"
4. **Verifique se a resposta aparece**
5. **Confirme que "Digitando..." para**

## 🔧 **ALTERNATIVAS DE IP**

Se `192.168.1.6:3002` não funcionar, tente:

### **Opção 1: localhost**
```
http://localhost:3002/api/webhook/receive
```

### **Opção 2: 127.0.0.1**
```
http://127.0.0.1:3002/api/webhook/receive
```

### **Opção 3: IP da VM (se n8n estiver em VM)**
```
http://192.168.81.1:3002/api/webhook/receive
```

## 📝 **LOGS IMPORTANTES**

### **Backend (api-server.cjs):**
```javascript
console.log("📨 Webhook recebido do n8n:", req.body);
console.log("✅ Resposta processada:", finalResponseText);
console.log("💾 Atualizando Supabase para sessionId:", sessionId);
```

### **n8n (logs do workflow):**
- Verificar se o nó HTTP Request executa com sucesso
- Verificar se não há erros de conexão
- Verificar se a resposta é 200 OK

## 🎯 **RESULTADO ESPERADO**

Após a configuração correta:

1. ✅ n8n processa mensagem com IA
2. ✅ n8n envia para `http://192.168.1.6:3002/api/webhook/receive`
3. ✅ Backend recebe e processa
4. ✅ Backend atualiza Supabase
5. ✅ Frontend recebe via Realtime
6. ✅ Chat exibe resposta
7. ✅ "Digitando..." para

## 🚨 **CHECKLIST FINAL**

- [ ] Backend rodando em `192.168.1.6:3002`
- [ ] n8n configurado com URL correta
- [ ] Payload JSON configurado
- [ ] Headers configurados
- [ ] Timeout configurado
- [ ] Teste manual executado
- [ ] Logs verificados
- [ ] Frontend testado

---

**Status:** 🟡 **AGUARDANDO CONFIGURAÇÃO**  
**IP Local:** `192.168.1.6`  
**Porta:** `3002` (devido a conflito na 3001)  
**URL Final:** `http://192.168.1.6:3002/api/webhook/receive`  
**Tempo Estimado:** 15-30 minutos 