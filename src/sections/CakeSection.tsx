import { useState, useRef } from 'react';
import { useConfetti } from '@/hooks/useConfetti';
import { Cake, Sparkles } from 'lucide-react';

export function CakeSection() {
  const [isCut, setIsCut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);
  const { triggerConfetti } = useConfetti();

  const handleCutCake = () => {
    if (isCut || isAnimating) return;
    
    setIsAnimating(true);
    
    // Start the cutting animation sequence
    setTimeout(() => {
      setIsCut(true);
      triggerConfetti({ particleCount: 150, duration: 4000 });
      
      setTimeout(() => {
        setShowMessage(true);
        setIsAnimating(false);
      }, 1200);
    }, 800);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-[#FFF8F0] relative overflow-hidden">
      {/* More Decorative Flowers */}
      <div className="absolute top-5 left-5 w-16 h-16 opacity-40 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-20 right-8 w-20 h-20 opacity-35 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute bottom-32 left-12 w-14 h-14 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="absolute bottom-20 right-16 w-18 h-18 opacity-35 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-90" />
      </div>
      <div className="absolute top-1/2 left-4 w-12 h-12 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-45" />
      </div>
      <div className="absolute top-1/3 right-4 w-14 h-14 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            Make a Wish
          </h2>
          <p className="font-script text-xl sm:text-2xl text-[#6B6B6B]">
            Click the cake to celebrate!
          </p>
        </div>

        {/* Cake Container with 3D Effect */}
        <div className="relative inline-block perspective-1000" ref={cakeRef}>
          {/* Knife Animation */}
          {!isCut && (
            <div 
              className={`absolute -top-16 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
                isAnimating ? 'translate-y-48 rotate-45 opacity-0' : 'animate-knife-float'
              }`}
            >
              <div className="relative">
                {/* Knife Handle */}
                <div className="w-6 h-20 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-lg mx-auto shadow-lg" />
                {/* Knife Blade */}
                <div className="w-4 h-32 bg-gradient-to-b from-[#C0C0C0] to-[#A0A0A0] mx-auto -mt-2 rounded-b-lg shadow-lg" />
                {/* Shine on blade */}
                <div className="absolute top-20 left-1 w-1 h-24 bg-white/40 rounded-full" />
              </div>
            </div>
          )}

          {/* Cake Wrapper with 3D Transform */}
          <div
            onClick={handleCutCake}
            className={`relative cursor-pointer transition-all duration-700 ${
              isCut ? '' : 'hover:scale-105'
            } ${isAnimating ? 'pointer-events-none' : ''}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCutCake()}
            aria-label="Click to cut the cake"
          >
            {/* Cake Halves Container */}
            <div className={`relative transition-all duration-1000 ${isCut ? 'cake-split' : ''}`}>
              {/* Left Half */}
              <div 
                className={`inline-block transition-all duration-1000 ${
                  isCut 
                    ? 'transform -translate-x-8 -rotate-6 opacity-90' 
                    : ''
                }`}
              >
                <img
                  src="/cake.png"
                  alt="Birthday Cake"
                  className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain"
                  style={{
                    clipPath: isCut ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' : 'none',
                  }}
                />
              </div>

              {/* Right Half (overlapping for cut effect) */}
              {isCut && (
                <div 
                  className="absolute top-0 right-0 inline-block transform translate-x-8 rotate-6 transition-all duration-1000"
                >
                  <img
                    src="/cake.png"
                    alt=""
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain opacity-90"
                    style={{
                      clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Flickering Candles (before cut) */}
            {!isCut && (
              <>
                <div className="absolute top-[18%] left-[38%] w-3 h-6 sm:w-4 sm:h-8 animate-flicker">
                  <div className="w-full h-full bg-gradient-to-t from-[#FF6B35] via-[#FFB5A7] to-[#FFF5BA] rounded-full shadow-lg shadow-[#FFF5BA]/70" />
                  {/* Flame glow */}
                  <div className="absolute inset-0 bg-[#FFF5BA]/30 blur-md rounded-full scale-150" />
                </div>
                <div className="absolute top-[14%] left-[48%] w-3 h-6 sm:w-4 sm:h-8 animate-flicker" style={{ animationDelay: '0.1s' }}>
                  <div className="w-full h-full bg-gradient-to-t from-[#FF6B35] via-[#FFB5A7] to-[#FFF5BA] rounded-full shadow-lg shadow-[#FFF5BA]/70" />
                  <div className="absolute inset-0 bg-[#FFF5BA]/30 blur-md rounded-full scale-150" />
                </div>
                <div className="absolute top-[18%] left-[58%] w-3 h-6 sm:w-4 sm:h-8 animate-flicker" style={{ animationDelay: '0.2s' }}>
                  <div className="w-full h-full bg-gradient-to-t from-[#FF6B35] via-[#FFB5A7] to-[#FFF5BA] rounded-full shadow-lg shadow-[#FFF5BA]/70" />
                  <div className="absolute inset-0 bg-[#FFF5BA]/30 blur-md rounded-full scale-150" />
                </div>
              </>
            )}

            {/* Cut Line Effect */}
            {isCut && (
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[#2D2D2D]/20 to-transparent transform -translate-x-1/2" />
            )}
          </div>

          {/* Sparkles around cake */}
          {!isCut && !isAnimating && (
            <>
              <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-[#F8C8DC] animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-4 w-5 h-5 text-[#E6E6FA] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute top-1/2 -right-8 w-4 h-4 text-[#C5E8D4] animate-pulse" style={{ animationDelay: '0.3s' }} />
            </>
          )}
        </div>

        {/* Instruction Text */}
        {!isCut && !isAnimating && (
          <p className="mt-8 text-[#6B6B6B] text-base sm:text-lg animate-pulse">
            Tap the cake to cut it and make a wish!
          </p>
        )}

        {/* Cutting Animation Text */}
        {isAnimating && !showMessage && (
          <p className="mt-8 text-[#F8C8DC] text-base sm:text-lg font-semibold animate-pulse">
            Cutting the cake...
          </p>
        )}

        {/* Wish Message */}
        {showMessage && (
          <div className="mt-10 animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg mx-auto border-2 border-[#F8C8DC]">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F8C8DC] to-[#E6E6FA] rounded-full flex items-center justify-center">
                  <Cake className="w-8 h-8 text-[#2D2D2D]" />
                </div>
              </div>
              <h3 className="font-script text-2xl sm:text-3xl text-[#2D2D2D] mb-3">
                Make a wish...
              </h3>
              <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed">
                May all your dreams come true! Wishing you a year filled with joy, 
                laughter, and endless beautiful moments. Happy Birthday!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
