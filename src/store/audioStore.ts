import { create } from 'zustand';

interface AudioStore {
  audioRef: HTMLAudioElement | null;
  setAudioRef: (ref: HTMLAudioElement | null) => void;
  playAudio: () => void;
  stopAudio: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audioRef: null,
  isPlaying: false,
  
  setAudioRef: (ref) => set({ audioRef: ref }),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  playAudio: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.currentTime = 0;
      audioRef.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
      set({ isPlaying: true });
    }
  },
  
  stopAudio: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      set({ isPlaying: false });
    }
  },
}));
