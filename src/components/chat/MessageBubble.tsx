import React from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl p-3 ${
        message.type === 'user'
          ? 'bg-claro-gradient text-white'
          : 'bg-claro-accent/10 text-gray-100'
      }`}>
        <div className="text-sm leading-relaxed">
          <ReactMarkdown
            components={{
              // Estilizar links
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-claro-accent hover:text-claro-accent/80 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              // Estilizar texto em negrito
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-semibold" />
              ),
              // Estilizar texto em itálico
              em: ({ node, ...props }) => (
                <em {...props} className="italic" />
              ),
              // Estilizar listas
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-inside space-y-1 my-2" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="text-sm" />
              ),
              // Estilizar parágrafos
              p: ({ node, ...props }) => (
                <p {...props} className="mb-2 last:mb-0" />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className={`text-xs mt-1 ${
          message.type === 'user' ? 'text-white/70' : 'text-gray-400'
        }`}>
          {message.timestamp.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

interface TypingIndicatorProps {
  isLoading: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-start">
      <div className="bg-claro-accent/10 rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-claro-accent" />
          <span className="text-gray-400 text-sm">Digitando...</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 