import { useState, useRef, useCallback } from 'react';

export function useAudio(audioUrl: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user needs to interact first
      });
      setIsPlaying(true);
    }
  }, [isPlaying, audioUrl]);

  return { isPlaying, toggle };
}
