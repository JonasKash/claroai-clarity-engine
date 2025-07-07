import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-claro-gradient p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Clara</h3>
          <div className="flex items-center gap-2">
            <p className="text-white/80 text-sm">Assistente Virtual</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/80 text-xs">Online</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader; 