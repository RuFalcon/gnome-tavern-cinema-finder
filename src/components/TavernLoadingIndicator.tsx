
import React from 'react';

interface TavernLoadingIndicatorProps {
  text?: string;
}

const TavernLoadingIndicator: React.FC<TavernLoadingIndicatorProps> = ({ 
  text = 'Гном ищет лучшие истории...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-8">
      <div className="w-16 h-16 relative animate-bounce-subtle">
        <div className="absolute inset-0 rounded-full bg-tavern-gold opacity-20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-tavern border-tavern-gold animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🍺</span>
        </div>
      </div>
      <p className="mt-4 font-tavern text-tavern-dark text-lg">{text}</p>
    </div>
  );
};

export default TavernLoadingIndicator;
