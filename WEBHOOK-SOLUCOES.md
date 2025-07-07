# 🚀 Soluções para o Webhook do N8N

## 🚨 Problema Identificado

O n8n está tentando acessar `http://192.168.1.6:3002` mas não consegue chegar ao servidor local, causando timeout.

## ✅ Solução 1: Usar Domínio Público

### 🌐 URL do Webhook Público
```
https://www.lavitta.guvito.site/api/webhook/receive
```

### 🔧 Configuração no N8N
No nó **HTTP Request** do n8n:

**URL**: `https://www.lavitta.guvito.site/api/webhook/receive`  
**Method**: `POST`  
**Headers**: 
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "sessionId": "{{ $('extract_info_lead_old').item.json.session_id }}",
  "responseText": "{{ $json.responseText }}"
}
```

### 📊 Logs Esperados
```
================================================================================
📨 WEBHOOK RECEBIDO DO N8N
================================================================================
⏰ Timestamp: 2025-07-07T01:28:15.123Z
🌐 IP do remetente: [IP do n8n]
📦 Body completo: {
  "sessionId": "e09dd9b3ae45219bd15d2e861508bd6d",
  "responseText": "Olá Jonas, seja bem-vindo de volta! Em que posso te auxiliar hoje?"
}
================================================================================
```

## ✅ Solução 2: Webhook no Frontend (Alternativa)

### 🌐 URL do Webhook Frontend
```
https://www.lavitta.guvito.site/api/webhook/receive
```

### 🔧 Configuração no N8N
Mesma configuração da Solução 1, mas o endpoint está no frontend.

### 📊 Vantagens da Solução 2
- ✅ **Atualização automática do Supabase**
- ✅ **Logs no frontend**
- ✅ **Integração direta com o chat**

## 🔍 Como Testar

### 1. **Teste Local**
```powershell
Invoke-WebRequest -Uri "https://www.lavitta.guvito.site/api/webhook/receive" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"sessionId":"test123","responseText":"Teste de resposta"}'
```

### 2. **Teste no N8N**
Configure o HTTP Request node com:
- **URL**: `https://www.lavitta.guvito.site/api/webhook/receive`
- **Body**: 
```json
{
  "sessionId": "{{ $('extract_info_lead_old').item.json.session_id }}",
  "responseText": "{{ $json.responseText }}"
}
```

## 🚨 Troubleshooting

### Se ainda der timeout:
1. **Verifique se o domínio está acessível** - teste no navegador
2. **Confirme se o endpoint está rodando** - teste com curl/Postman
3. **Verifique logs do servidor** - veja se a requisição chega

### Se der erro 404:
1. **Confirme a rota** - deve ser `/api/webhook/receive`
2. **Verifique se o servidor está rodando**
3. **Teste com URL completa**

### Se der erro 500:
1. **Verifique os logs do servidor**
2. **Confirme se o Supabase está configurado**
3. **Verifique se sessionId está presente**

## 📝 Configuração Recomendada

**Use a Solução 1** (domínio público) se:
- Seu servidor está acessível publicamente
- Quer manter logs no backend

**Use a Solução 2** (frontend) se:
- Quer atualização automática do Supabase
- Prefere logs no frontend

## 🎯 Resultado Esperado

Quando funcionando:
1. ✅ N8N envia resposta para o webhook
2. ✅ Webhook recebe e processa a resposta
3. ✅ Supabase é atualizado com a nova mensagem
4. ✅ Frontend recebe atualização via realtime
5. ✅ Chat para de mostrar "Digitando..." e exibe a resposta

## 🔄 Fluxo Completo

```
Usuário → Frontend → Backend → N8N → Webhook → Supabase → Frontend (realtime) → Chat
```

**URLs importantes:**
- **Backend**: `https://www.lavitta.guvito.site/api/chat`
- **Webhook**: `https://www.lavitta.guvito.site/api/webhook/receive`
- **Frontend**: `https://www.lavitta.guvito.site/` 