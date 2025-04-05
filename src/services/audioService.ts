
// Audio service to manage ambient sounds and effects
class AudioService {
  private bgMusic: HTMLAudioElement | null = null;
  private audioEnabled: boolean = true;
  
  // Initialize ambient sounds
  public initialize(): void {
    this.bgMusic = new Audio("https://freesound.org/data/previews/459/459934_9552973-lq.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.3;
    
    // Due to browser autoplay restrictions, we need user interaction to start playing
    document.addEventListener('click', () => {
      this.playBgMusic();
    }, { once: true });
  }
  
  // Play background tavern ambiance
  public playBgMusic(): void {
    if (this.audioEnabled && this.bgMusic && this.bgMusic.paused) {
      this.bgMusic.play().catch(err => console.log('Autoplay prevented'));
    }
  }
  
  // Stop background tavern ambiance
  public stopBgMusic(): void {
    if (this.bgMusic && !this.bgMusic.paused) {
      this.bgMusic.pause();
    }
  }
  
  // Toggle audio on/off
  public toggleAudio(): boolean {
    this.audioEnabled = !this.audioEnabled;
    if (this.audioEnabled) {
      this.playBgMusic();
    } else {
      this.stopBgMusic();
    }
    return this.audioEnabled;
  }
  
  // Play a UI interaction sound effect
  public playUISound(type: 'click' | 'message' | 'recommendation'): void {
    if (!this.audioEnabled) return;
    
    const soundMap = {
      'click': "https://freesound.org/data/previews/243/243020_4284968-lq.mp3",
      'message': "https://freesound.org/data/previews/264/264828_4486188-lq.mp3",
      'recommendation': "https://freesound.org/data/previews/277/277021_5356962-lq.mp3"
    };
    
    const sound = new Audio(soundMap[type]);
    sound.volume = 0.2;
    sound.play().catch(err => console.log('Sound play prevented'));
  }
}

// Export a singleton instance
export const audioService = new AudioService();
