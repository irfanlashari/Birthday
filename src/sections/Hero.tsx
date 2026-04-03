import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface HeroProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export function Hero({ isPlaying, onToggleMusic }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      {/* Floating Flower Decorations - More flowers added */}
      <div className="absolute top-5 left-5 w-20 h-20 md:w-28 md:h-28 opacity-50 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-16 right-10 w-16 h-16 md:w-24 md:h-24 opacity-40 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute top-1/3 left-8 w-14 h-14 md:w-20 md:h-20 opacity-35 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="absolute top-1/4 right-16 w-12 h-12 md:w-18 md:h-18 opacity-30 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-90" />
      </div>
      <div className="absolute bottom-40 left-12 w-16 h-16 md:w-22 md:h-22 opacity-40 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-45" />
      </div>
      <div className="absolute bottom-24 right-8 w-18 h-18 md:w-26 md:h-26 opacity-45 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-30" />
      </div>
      <div className="absolute bottom-1/3 left-20 w-10 h-10 md:w-14 md:h-14 opacity-25 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-60" />
      </div>
      <div className="absolute top-20 left-1/3 w-12 h-12 opacity-30 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-30" />
      </div>

      {/* Music Toggle Button */}
      <button
        onClick={onToggleMusic}
        className="absolute top-6 right-6 z-20 touch-button flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-105"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#2D2D2D]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#2D2D2D]" />
        )}
        <span className="text-sm font-medium text-[#2D2D2D] hidden sm:inline">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
      </button>

      {/* Main Content */}
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        {/* Music Icon */}
        <div
          className={`mb-6 transition-all duration-800 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
            <Music className="w-8 h-8 text-[#F8C8DC]" />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2D2D2D] mb-4 transition-all duration-800 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Happy Birthday!
        </h1>

        {/* Subtitle */}
        <p
          className={`font-script text-2xl sm:text-3xl md:text-4xl text-[#6B6B6B] mb-8 transition-all duration-800 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          To my amazing best friend
        </p>

        {/* Decorative Line */}
        <div
          className={`w-24 h-1 bg-gradient-to-r from-[#F8C8DC] to-[#E6E6FA] mx-auto mb-8 rounded-full transition-all duration-800 delay-500 ${
            isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        {/* CTA Button */}
        <button
          onClick={scrollToContent}
          className={`touch-button px-8 py-4 bg-[#F8C8DC] text-[#2D2D2D] font-semibold text-lg rounded-full shadow-lg hover:bg-[#FFB5A7] hover:scale-105 transition-all duration-300 animate-pulse-soft ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Start the Celebration
        </button>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-800 delay-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-6 h-10 border-2 border-[#2D2D2D]/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#F8C8DC] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
