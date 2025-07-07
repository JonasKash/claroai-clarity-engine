const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002; // Mudado de 3001 para 3002
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://wbn.guvito.site/webhook-test/claroai-ataque-final';

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
    try {
        const { sessionId, userMessage } = req.body;
        if (!sessionId || !userMessage) {
            console.error("Recebida requisição inválida:", req.body);
            return res.status(400).json({ error: 'sessionId e userMessage são obrigatórios.' });
        }

        const payload_para_n8n = {
            sessionId,
            mensagem_do_usuario: userMessage,
        };
        
        console.log("🚀 Despachando para o n8n:", payload_para_n8n);

        // Dispara para o n8n e NÃO espera a resposta.
        axios.post(N8N_WEBHOOK_URL, payload_para_n8n).catch(err => {
            // Apenas loga o erro no servidor, não afeta a resposta para o cliente.
            console.error(`🔥 ERRO ao comunicar com n8n (fire-and-forget): ${err.message}`);
        });

        // Responde IMEDIATAMENTE para o frontend com "202 Accepted".
        // Isso significa "Recebi sua ordem, estou processando".
        res.status(202).json({ success: true, message: 'Mensagem recebida para processamento.' });

    } catch (error) {
        console.error(`🔥 ERRO CRÍTICO no /api/chat: ${error.message}`);
        res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
    }
});

// 🆕 NOVO ENDPOINT: Recebe resposta do n8n
app.post('/api/webhook/receive', async (req, res) => {
    try {
        console.log("=".repeat(80));
        console.log("📨 WEBHOOK RECEBIDO DO N8N");
        console.log("=".repeat(80));
        console.log("⏰ Timestamp:", new Date().toISOString());
        console.log("🌐 IP do remetente:", req.ip || req.connection.remoteAddress);
        console.log("📋 Headers:", JSON.stringify(req.headers, null, 2));
        console.log("📦 Body completo:", JSON.stringify(req.body, null, 2));
        console.log("=".repeat(80));
        
        const { sessionId, response_text, data_from_n8n } = req.body;
        
        console.log("🔍 Analisando campos recebidos:");
        console.log("   - sessionId:", sessionId);
        console.log("   - response_text:", response_text);
        console.log("   - data_from_n8n:", data_from_n8n);
        
        if (!sessionId) {
            console.error("❌ sessionId não fornecido no webhook");
            return res.status(400).json({ error: 'sessionId é obrigatório' });
        }

        // Extrair texto da resposta (suporta múltiplos formatos)
        let finalResponseText = response_text;
        
        console.log("🔧 Processando texto de resposta:");
        console.log("   - Texto inicial:", finalResponseText);
        
        if (data_from_n8n && data_from_n8n.output) {
            console.log("   - data_from_n8n.output encontrado:", data_from_n8n.output);
            try {
                // Se output é um JSON string, fazer parse
                if (typeof data_from_n8n.output === 'string') {
                    console.log("   - Fazendo parse de string JSON...");
                    const parsedOutput = JSON.parse(data_from_n8n.output);
                    console.log("   - Parse bem-sucedido:", parsedOutput);
                    if (parsedOutput.response_text) {
                        finalResponseText = parsedOutput.response_text;
                        console.log("   - Usando response_text do parse:", finalResponseText);
                    }
                } else if (data_from_n8n.output.response_text) {
                    finalResponseText = data_from_n8n.output.response_text;
                    console.log("   - Usando response_text direto:", finalResponseText);
                }
            } catch (parseError) {
                console.warn("⚠️ Erro ao fazer parse do output:", parseError);
                console.log("   - Mantendo texto original:", finalResponseText);
                // Usar o texto original se o parse falhar
            }
        } else {
            console.log("   - Nenhum data_from_n8n.output encontrado");
        }

        if (!finalResponseText) {
            console.error("❌ Nenhum texto de resposta encontrado");
            return res.status(400).json({ error: 'Texto de resposta não encontrado' });
        }

        console.log("✅ Resposta final processada:", finalResponseText);
        console.log("=".repeat(80));

        // 🔄 ATUALIZAR SUPABASE
        // Nota: Em produção, você precisaria configurar o Supabase aqui
        // Por enquanto, vamos apenas logar a resposta
        console.log("💾 Atualizando Supabase para sessionId:", sessionId);
        console.log("📝 Nova mensagem:", finalResponseText);

        // TODO: Implementar atualização real do Supabase
        // const { createClient } = require('@supabase/supabase-js');
        // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        // 
        // await supabase
        //     .from('chat_leads')
        //     .update({ 
        //         chat_history: [...existingHistory, {
        //             role: 'assistant',
        //             content: finalResponseText,
        //             timestamp: new Date().toISOString()
        //         }],
        //         last_response: finalResponseText,
        //         response_timestamp: new Date().toISOString()
        //     })
        //     .eq('session_id', sessionId);

        res.status(200).json({ 
            success: true, 
            message: 'Resposta processada com sucesso',
            response_text: finalResponseText
        });

    } catch (error) {
        console.error("🔥 ERRO CRÍTICO no webhook:", error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno no processamento do webhook' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ [SERVIDOR FIRE-AND-FORGET] Operacional na porta ${PORT}`);
    console.log(`🆕 [WEBHOOK] Endpoint /api/webhook/receive disponível`);
    console.log(`🌐 [WEBHOOK] URL Pública: https://www.lavitta.guvito.site/api/webhook/receive`);
});