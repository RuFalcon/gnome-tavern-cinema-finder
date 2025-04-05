
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AudioControl: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  useEffect(() => {
    // Initialize audio service when component mounts
    audioService.initialize();
  }, []);
  
  const toggleAudio = () => {
    const isEnabled = audioService.toggleAudio();
    setAudioEnabled(isEnabled);
    audioService.playUISound('click');
  };
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleAudio} 
      className="fixed top-4 right-4 z-50 bg-tavern-paper border-tavern-dark"
    >
      {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  );
};

export default AudioControl;
