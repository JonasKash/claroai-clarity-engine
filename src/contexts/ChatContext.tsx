import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- Interfaces & Context ---
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  isChatOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  currentInput: string;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  setCurrentInput: (input: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};

// --- Configuração ---
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL e Anon Key são obrigatórias no .env do frontend (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)");
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);

  const channelRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Gera o sessionId
  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        console.log('✅ Fingerprint/Session ID gerado:', result.visitorId);
        setSessionId(result.visitorId);
      } catch (error) {
        console.error("🔥 Erro ao gerar fingerprint:", error);
      }
    };
    getFingerprint();
  }, []);

  // LIMPEZA do canal Realtime ao desmontar o componente
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const addMessage = (message: Message) => setMessages(prev => [...prev, message]);
  const openChat = () => {
    setIsChatOpen(true);
    if (messages.length === 0) {
      addMessage({ id: 'initial-bot-msg', type: 'bot', content: 'Olá! Sou a Clara. Para começarmos, qual o seu nome?', timestamp: new Date() });
    }
  };
  const closeChat = () => setIsChatOpen(false);

  // Alterna o estado do chat (abrir/fechar)
  const toggleChat = () => {
    setIsChatOpen((prev) => {
      // Se estiver abrindo e não há mensagens, adiciona mensagem inicial
      if (!prev && messages.length === 0) {
        addMessage({
          id: 'initial-bot-msg',
          type: 'bot',
          content: 'Olá! Sou a Clara. Para começarmos, qual o seu nome?',
          timestamp: new Date(),
        });
      }
      return !prev;
    });
  };

  // Engajamento proativo (scroll, etc)
  const initiateProactiveChat = () => {
    openChat();
  };

  const listenToChatUpdates = (leadId: string) => {
    // Se já existe um canal, remove-o antes de criar um novo
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }
    
    console.log(`[REALTIME] Escutando por atualizações no lead ID: ${leadId}`);
    
    const channel = supabase
      .channel(`chat_lead_updates:${leadId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_leads',
          filter: `id=eq.${leadId}`,
        },
        (payload) => {
          console.log('[REALTIME] Mudança recebida do Supabase!', payload);
          
          const newHistory = payload.new.chat_history;
          if (newHistory && Array.isArray(newHistory) && newHistory.length > 0) {
            const lastMessage = newHistory[newHistory.length - 1];

            // Garante que a última mensagem é do bot e não é uma que já exibimos
            if (lastMessage.role === 'assistant' && !messages.some(m => m.content === lastMessage.content)) {
              addMessage({
                id: `bot-${Date.now()}`,
                type: 'bot',
                content: lastMessage.content,
                timestamp: new Date(),
              });
              setIsLoading(false);
              
              // Limpar timeout se a resposta chegou
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            }
          }
        }
      )
      .subscribe();

    channelRef.current = channel;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !sessionId) return;

    addMessage({ id: `user-${Date.now()}`, type: 'user', content: content.trim(), timestamp: new Date() });
    setCurrentInput('');
    setIsLoading(true);

    // 🆕 TIMEOUT: Se não receber resposta em 30 segundos, mostrar erro
    timeoutRef.current = setTimeout(() => {
      console.warn('⏰ Timeout: Nenhuma resposta recebida em 30 segundos');
      setIsLoading(false);
      addMessage({
        id: `timeout-${Date.now()}`,
        type: 'bot',
        content: 'Desculpe, tive um problema técnico. Tente novamente em alguns instantes.',
        timestamp: new Date(),
      });
    }, 30000); // 30 segundos

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userMessage: content.trim() }),
      });

      if (response.status !== 202) throw new Error(`Status inesperado: ${response.status}`);
      
      const data = await response.json();
      console.log('✅ Mensagem enviada com sucesso:', data);

      // O backend agora pode retornar o leadId para sabermos qual canal escutar.
      // Vamos ajustar o backend para isso. Por enquanto, assumimos que temos o ID.
      // Se for a primeira mensagem, precisamos de uma forma de obter o leadId.
      // Vamos assumir, por enquanto, que o n8n o cria e que o escutamos pelo sessionId.
      // A melhor forma é o backend retornar o leadId. Vamos ajustar isso.
      
      // Temporariamente, para fazer funcionar: vamos buscar o leadId após o envio.
      // O ideal é o backend retornar isso.
      const { data: lead } = await supabase.from('chat_leads').select('id').eq('session_id', sessionId).single();
      if (lead && lead.id) {
        if (lead.id !== currentLeadId) {
          setCurrentLeadId(lead.id);
          listenToChatUpdates(lead.id);
        }
      }

    } catch (error) {
      console.error('Falha no sendMessage:', error);
      
      // Limpar timeout em caso de erro
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      setIsLoading(false);
      addMessage({ 
        id: `error-${Date.now()}`, 
        type: 'bot', 
        content: 'Ops! Tivemos uma falha na comunicação. Verifique sua conexão e tente novamente.', 
        timestamp: new Date() 
      });
    }
  };

  const value = {
    isChatOpen,
    messages,
    isLoading,
    currentInput,
    openChat,
    closeChat,
    sendMessage,
    setCurrentInput,
    toggleChat,
    initiateProactiveChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};