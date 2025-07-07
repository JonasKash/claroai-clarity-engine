# 🔍 Logs do Webhook - Monitoramento de Respostas do N8N

## 📋 Status Atual

✅ **Backend configurado com logs detalhados**  
✅ **Webhook endpoint funcionando**  
✅ **Teste realizado com sucesso**  

## 🌐 URL do Webhook

```
http://192.168.1.6:3002/api/webhook/receive
```

## 📊 Logs Implementados

O backend agora possui logs detalhados que mostram:

### 1. **Recebimento do Webhook**
```
================================================================================
📨 WEBHOOK RECEBIDO DO N8N
================================================================================
⏰ Timestamp: 2025-07-07T01:28:15.123Z
🌐 IP do remetente: 192.168.1.6
📋 Headers: { ... }
📦 Body completo: { ... }
================================================================================
```

### 2. **Análise dos Campos**
```
🔍 Analisando campos recebidos:
   - sessionId: test123
   - response_text: Teste de resposta do n8n
   - data_from_n8n: { output: "..." }
```

### 3. **Processamento da Resposta**
```
🔧 Processando texto de resposta:
   - Texto inicial: Teste de resposta do n8n
   - data_from_n8n.output encontrado: {"response_text":"Resposta processada do JSON"}
   - Fazendo parse de string JSON...
   - Parse bem-sucedido: { response_text: "Resposta processada do JSON" }
   - Usando response_text do parse: Resposta processada do JSON
```

### 4. **Resposta Final**
```
✅ Resposta final processada: Resposta processada do JSON
================================================================================
```

## 🔧 Como Configurar no N8N

### HTTP Request Node
- **URL**: `http://192.168.1.6:3002/api/webhook/receive`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "sessionId": "{{ $json.sessionId }}",
    "response_text": "{{ $json.response_text }}",
    "data_from_n8n": {
      "output": "{{ $json.output }}"
    }
  }
  ```

## 🚨 Como Monitorar

### 1. **Verificar se o Backend está Rodando**
```bash
netstat -an | findstr :3002
```

### 2. **Ver Logs em Tempo Real**
Abra um terminal e execute:
```bash
node api-server.cjs
```

### 3. **Testar o Webhook**
```powershell
Invoke-WebRequest -Uri "http://localhost:3002/api/webhook/receive" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"sessionId":"test123","response_text":"Teste","data_from_n8n":{"output":"{\"response_text\":\"Resposta teste\"}"}}'
```

## 🔍 Troubleshooting

### Se o N8N fica "girando":
1. **Verifique os logs do backend** - deve aparecer o webhook recebido
2. **Confirme a URL** - deve ser `http://192.168.1.6:3002/api/webhook/receive`
3. **Verifique o formato do JSON** - deve ter `sessionId`, `response_text`, e `data_from_n8n`

### Se não aparecer nenhum log:
1. **Backend não está rodando** - inicie com `node api-server.cjs`
2. **URL incorreta no N8N** - confirme o IP e porta
3. **Firewall bloqueando** - verifique se a porta 3002 está liberada

### Se aparecer erro 400/500:
1. **Verifique o formato do JSON** no body do webhook
2. **Confirme se sessionId está presente**
3. **Verifique se response_text ou data_from_n8n.output estão presentes**

## 📝 Próximos Passos

1. **Configurar o N8N** com a URL correta
2. **Testar o fluxo completo** - enviar mensagem pelo chat
3. **Monitorar os logs** para ver se a resposta chega
4. **Implementar atualização do Supabase** (quando necessário)

## 🎯 Resultado Esperado

Quando funcionando corretamente, você verá nos logs:
1. Mensagem enviada pelo chat
2. Webhook recebido do N8N com a resposta
3. Resposta processada e exibida no chat
4. Chat para de mostrar "Digitando..." 