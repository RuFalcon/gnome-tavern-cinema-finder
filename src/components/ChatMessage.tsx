
import React from 'react';
import DwarfAvatar from './DwarfAvatar';

export interface ChatMessageProps {
  text: string;
  sender: 'dwarf' | 'user';
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, isTyping = false }) => {
  const isDwarf = sender === 'dwarf';
  
  return (
    <div className={`flex items-start gap-3 my-3 ${isDwarf ? '' : 'flex-row-reverse'}`}>
      {isDwarf && <DwarfAvatar talking={isTyping} />}
      
      <div className={`tavern-panel max-w-[80%] ${
        isDwarf 
          ? 'bg-tavern-light rounded-tr-xl rounded-br-xl rounded-bl-xl' 
          : 'bg-tavern-paper rounded-tl-xl rounded-tr-xl rounded-bl-xl ml-auto'
      }`}>
        <p className={`${
          isDwarf ? 'font-tavern text-tavern-dark' : 'font-serif'
        } text-sm md:text-base`}>
          {isTyping ? (
            <span className="flex gap-1 items-center">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
            </span>
          ) : (
            text
          )}
        </p>
      </div>
      
      {!isDwarf && (
        <div className="w-8 h-8 rounded-full bg-tavern-dark flex items-center justify-center text-white">
          <span className="text-sm">Вы</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
