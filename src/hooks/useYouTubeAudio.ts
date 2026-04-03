import { useState, useRef, useCallback } from 'react';

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
}

export function useYouTubeAudio(videoId: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const onReady = useCallback((event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    // Start muted to allow autoplay
    event.target.mute();
    event.target.playVideo();
    setIsReady(true);
  }, []);

  const onStateChange = useCallback((event: { data: number }) => {
    // Player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    setIsPlaying(event.data === 1);
  }, []);

  const toggle = useCallback(() => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, [isPlaying, isReady]);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      loop: 1,
      playlist: videoId,
    },
  };

  return {
    isPlaying,
    isReady,
    toggle,
    onReady,
    onStateChange,
    opts,
    videoId,
  };
}
