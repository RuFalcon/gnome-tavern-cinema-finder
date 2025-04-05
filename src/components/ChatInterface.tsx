
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { getRandomGreeting, getNextQuestion } from '../utils/dwarfUtils';
import { audioService } from '../services/audioService';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, isLoading = false }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { sender: 'dwarf', text: getRandomGreeting() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Add the next question from the dwarf after a delay when user sends a message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user' && messages.length > 1 && !isLoading) {
      const timer = setTimeout(() => {
        const nextQuestion = getNextQuestion(questionIndex);
        setMessages(prev => [...prev, { sender: 'dwarf', text: nextQuestion }]);
        setQuestionIndex(prev => prev + 1);
        audioService.playUISound('message');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [messages, questionIndex, isLoading]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    audioService.playUISound('message');
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    
    // Call the parent's onSendMessage
    onSendMessage(inputValue);
    
    // Clear input
    setInputValue('');
  };
  
  return (
    <div className="tavern-border flex flex-col h-full bg-wood-texture">
      <div className="p-4 bg-tavern-dark flex items-center border-b-2 border-tavern-gold">
        <Film className="text-tavern-gold mr-2" />
        <h2 className="font-fantasy text-tavern-gold text-xl">Таверна Гнома</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            sender={message.sender}
            isTyping={index === messages.length - 1 && message.sender === 'dwarf' && isLoading}
          />
        ))}
        {isLoading && !messages[messages.length - 1]?.isTyping && (
          <ChatMessage
            text=""
            sender="dwarf"
            isTyping={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-tavern-dark">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите ваш ответ..."
            className="tavern-input flex-1"
          />
          <Button 
            type="submit" 
            className="tavern-button"
            disabled={!inputValue.trim() || isLoading}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
