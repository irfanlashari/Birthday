import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Hero } from '@/sections/Hero';
import { Timeline } from '@/sections/Timeline';
import { CakeSection } from '@/sections/CakeSection';
import { GameSection } from '@/sections/GameSection';
import { SurpriseSection } from '@/sections/SurpriseSection';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useYouTubeAudio } from '@/hooks/useYouTubeAudio';

// YouTube video ID for birthday song
const BIRTHDAY_VIDEO_ID = 'nAw2ooeubSQ';
import { HeartTrail } from '@/components/HeartTrail';

function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <HeartTrail /> {/* Add this line */}
      
      {/* Rest of your content */}
    </div>
  );
}
function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const { isPlaying, toggle, onReady, onStateChange, opts } = useYouTubeAudio(BIRTHDAY_VIDEO_ID);

  // Initialize player after user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setShowPlayer(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hidden YouTube Player */}
      {showPlayer && (
        <div className="fixed bottom-0 right-0 opacity-0 pointer-events-none z-0">
          <YouTube
            videoId={BIRTHDAY_VIDEO_ID}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}

      {/* Main Content */}
      <main>
        <Hero isPlaying={isPlaying} onToggleMusic={toggle} />
        <Timeline />
        <CakeSection />
        <GameSection />
        <SurpriseSection />
        <Footer />
      </main>

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#FFF8F0',
            border: '2px solid #F8C8DC',
            borderRadius: '16px',
            color: '#2D2D2D',
          },
        }}
      />
    </div>
  );
}

export default App;
