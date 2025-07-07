import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  currentStep: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading,
  currentStep,
  disabled = false
}) => {
  // Determinar o tipo de input baseado no passo atual
  const inputType = currentStep === 'collecting_whatsapp' ? 'tel' : 'text';
  
  // Determinar placeholder baseado no passo atual
  const getPlaceholder = () => {
    switch (currentStep) {
      case 'collecting_name':
        return 'Digite seu nome...';
      case 'collecting_whatsapp':
        return 'Digite seu WhatsApp...';
      case 'collecting_business_type':
        return 'Ex: e-commerce, consultoria, serviços...';
      case 'collecting_revenue':
        return 'Ex: R$ 5.000, R$ 10.000...';
      case 'collecting_challenge':
        return 'Descreva seu maior desafio...';
      case 'collecting_instagram':
        return 'Digite seu Instagram ou "não tenho"...';
      default:
        return 'Digite sua resposta...';
    }
  };

  return (
    <div className="p-4 border-t border-claro-accent/20">
      <div className="flex gap-2">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={getPlaceholder()}
          className="flex-1 p-3 bg-claro-accent/10 border border-claro-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-claro-accent focus:outline-none text-sm transition-colors"
          disabled={isLoading || disabled}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading || disabled}
          className="bg-claro-gradient hover:bg-claro-gradient-reverse disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput; 