// Webhook endpoint para receber respostas do n8n
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log("=".repeat(80));
    console.log("📨 WEBHOOK RECEBIDO DO N8N (FRONTEND)");
    console.log("=".repeat(80));
    console.log("⏰ Timestamp:", new Date().toISOString());
    console.log("📦 Body completo:", JSON.stringify(req.body, null, 2));
    console.log("=".repeat(80));

    const { sessionId, responseText, response_text } = req.body;
    
    console.log("🔍 Analisando campos recebidos:");
    console.log("   - sessionId:", sessionId);
    console.log("   - responseText:", responseText);
    console.log("   - response_text:", response_text);

    if (!sessionId) {
      console.error("❌ sessionId não fornecido no webhook");
      return res.status(400).json({ error: 'sessionId é obrigatório' });
    }

    // Extrair o texto da resposta
    let finalResponseText = responseText || response_text;
    
    if (!finalResponseText) {
      console.error("❌ Nenhum texto de resposta encontrado");
      return res.status(400).json({ error: 'Texto de resposta não encontrado' });
    }

    console.log("✅ Resposta final processada:", finalResponseText);
    console.log("=".repeat(80));

    // Atualizar Supabase com a resposta
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Variáveis do Supabase não configuradas");
      return res.status(500).json({ error: 'Configuração do Supabase inválida' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar o lead existente
    const { data: existingLead, error: fetchError } = await supabase
      .from('chat_leads')
      .select('chat_history')
      .eq('session_id', sessionId)
      .single();

    if (fetchError) {
      console.error("❌ Erro ao buscar lead:", fetchError);
      return res.status(500).json({ error: 'Erro ao buscar lead' });
    }

    // Adicionar nova mensagem ao histórico
    const updatedHistory = [
      ...(existingLead.chat_history || []),
      {
        role: 'assistant',
        content: finalResponseText,
        timestamp: new Date().toISOString()
      }
    ];

    // Atualizar o lead
    const { error: updateError } = await supabase
      .from('chat_leads')
      .update({
        chat_history: updatedHistory,
        last_response: finalResponseText,
        response_timestamp: new Date().toISOString()
      })
      .eq('session_id', sessionId);

    if (updateError) {
      console.error("❌ Erro ao atualizar lead:", updateError);
      return res.status(500).json({ error: 'Erro ao atualizar lead' });
    }

    console.log("✅ Supabase atualizado com sucesso para sessionId:", sessionId);

    res.status(200).json({ 
      success: true, 
      message: 'Resposta processada e salva no Supabase',
      response_text: finalResponseText
    });

  } catch (error) {
    console.error("🔥 ERRO CRÍTICO no webhook:", error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno no processamento do webhook' 
    });
  }
} 