import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://izeugychnslqwjikgxux.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para salvar ou atualizar chat lead
export const saveChatLead = async (sessionId, chatHistory, leadData, status = 'collecting') => {
  try {
    // Verificar se já existe um registro para esta sessão
    const { data: existingLead } = await supabase
      .from('chat_leads')
      .select('id')
      .eq('session_id', sessionId)
      .single();

    if (existingLead) {
      // Atualizar registro existente
      const { data, error } = await supabase
        .from('chat_leads')
        .update({
          chat_history: chatHistory,
          lead_data: leadData,
          status: status
        })
        .eq('session_id', sessionId)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar chat lead:', error);
        throw error;
      }

      return data;
    } else {
      // Criar novo registro
      const { data, error } = await supabase
        .from('chat_leads')
        .insert([{
          session_id: sessionId,
          chat_history: chatHistory,
          lead_data: leadData,
          status: status
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar chat lead:', error);
        throw error;
      }

      return data;
    }
  } catch (error) {
    console.error('Erro na função saveChatLead:', error);
    throw error;
  }
};

// Função para buscar status e insight de um chat lead
export const getChatLeadStatus = async (sessionId) => {
  try {
    const { data, error } = await supabase
      .from('chat_leads')
      .select('status, generated_insight, lead_data')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      console.error('Erro ao buscar status do chat lead:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro na função getChatLeadStatus:', error);
    throw error;
  }
};

// Função para buscar chat lead completo
export const getChatLead = async (sessionId) => {
  try {
    const { data, error } = await supabase
      .from('chat_leads')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      console.error('Erro ao buscar chat lead:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro na função getChatLead:', error);
    throw error;
  }
};

// Função para enviar dados do lead para o Supabase
export const saveLead = async (leadData) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Erro ao salvar lead:', error);
      throw error;
    }

    console.log('Lead salvo com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro na função saveLead:', error);
    throw error;
  }
};

// Função para verificar se já existe um lead com o mesmo WhatsApp
export const checkDuplicateLead = async (whatsapp) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('id, created_at')
      .eq('whatsapp', whatsapp)
      .limit(1);

    if (error) {
      console.error('Erro ao verificar duplicata:', error);
      throw error;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Erro na função checkDuplicateLead:', error);
    throw error;
  }
}; 