
import React from 'react';

interface DwarfAvatarProps {
  talking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const DwarfAvatar: React.FC<DwarfAvatarProps> = ({ talking = false, size = 'md' }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className={`${talking ? 'animate-bounce-subtle' : ''} bg-tavern-gold rounded-full overflow-hidden border-2 border-tavern-dark ${sizeClasses[size]}`}>
        <div className="flex items-center justify-center h-full font-fantasy text-tavern-dark">
          {/* This is a placeholder, ideally we'd have a dwarf character image */}
          <span className="text-2xl">🧙‍♂️</span>
        </div>
      </div>
      {talking && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tavern-red opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-tavern-red"></span>
        </span>
      )}
    </div>
  );
};

export default DwarfAvatar;
