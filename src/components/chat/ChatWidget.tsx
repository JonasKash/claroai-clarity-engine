import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/contexts/ChatContext';
import ChatTrigger from './ChatTrigger';
import ChatHeader from './ChatHeader';
import MessageBubble, { TypingIndicator } from './MessageBubble';
import ChatInput from './ChatInput';

const ChatWidget: React.FC = () => {
  const {
    isChatOpen,
    messages,
    isLoading,
    currentStep,
    currentInput,
    toggleChat,
    closeChat,
    sendMessage,
    setCurrentInput,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(currentInput);
    }
  };

  const handleSend = () => {
    sendMessage(currentInput);
  };

  // Se o chat não estiver aberto, mostrar apenas o gatilho
  if (!isChatOpen) {
    return <ChatTrigger onClick={toggleChat} />;
  }

  return (
    <>
      {/* Chat Window com Animações */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              className="fixed bottom-6 right-6 z-50 w-[calc(100%-2rem)] h-[calc(100%-4rem)] sm:w-96 sm:h-[600px] bg-claro-card rounded-2xl shadow-2xl border border-claro-accent/20 overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Header */}
              <ChatHeader onClose={closeChat} />

              {/* Messages Area */}
              <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-claro-accent/20 scrollbar-track-transparent">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                <TypingIndicator isLoading={isLoading} />
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {currentStep !== 'insight_ready' ? (
                <ChatInput
                  value={currentInput}
                  onChange={setCurrentInput}
                  onSend={handleSend}
                  onKeyPress={handleKeyPress}
                  isLoading={isLoading}
                  currentStep={currentStep}
                />
              ) : (
                <div className="p-4 border-t border-claro-accent/20">
                  <button
                    onClick={() => {
                      // Redirecionar para agendamento ou abrir Calendly
                      window.open('https://calendly.com/seu-link', '_blank');
                    }}
                    className="w-full bg-claro-gradient hover:bg-claro-gradient-reverse text-white p-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  >
                    🚀 Agendar Call Estratégica
                  </button>
                </div>
              )}
            </motion.div>

            {/* Backdrop para mobile, também animado */}
            <motion.div 
              className="fixed inset-0 bg-black/20 z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 