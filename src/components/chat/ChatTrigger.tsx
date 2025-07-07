import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatTriggerProps {
  onClick: () => void;
}

const ChatTrigger: React.FC<ChatTriggerProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="bg-claro-gradient hover:bg-claro-gradient-reverse text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-claro-lg group"
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default ChatTrigger; 