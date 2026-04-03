import { useState } from 'react';
import { useConfetti } from '@/hooks/useConfetti';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, Sparkles, X, Star, Gift } from 'lucide-react';

export function SurpriseSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.3);
  const { triggerConfetti } = useConfetti();

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti({ particleCount: 200, duration: 5000 });
  };

  const handleClose = () => {
    setIsRevealed(false);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-[#E6E6FA] relative overflow-hidden">
      {/* More Decorative Flowers */}
      <div className="absolute top-5 left-5 w-24 h-24 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-24 right-10 w-18 h-18 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-45" />
      </div>
      <div className="absolute top-1/2 left-4 w-16 h-16 opacity-20 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-90" />
      </div>
      <div className="absolute bottom-32 right-16 w-20 h-20 opacity-30 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-30" />
      </div>
      <div className="absolute bottom-10 left-16 w-14 h-14 opacity-25 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute top-1/3 right-20 w-12 h-12 opacity-20 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-60" />
      </div>

      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <Sparkles className="w-10 h-10 text-[#F8C8DC] mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            One Last Thing...
          </h2>
          <p className="font-script text-xl sm:text-2xl text-[#6B6B6B]">
            I have something special for you
          </p>
        </div>

        {/* Reveal Button */}
        {!isRevealed && (
          <button
            onClick={handleReveal}
            className="touch-button px-10 py-5 bg-gradient-to-r from-[#F8C8DC] to-[#FFB5A7] text-[#2D2D2D] font-semibold text-lg sm:text-xl rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-soft"
          >
            <span className="flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Open Your Surprise
            </span>
          </button>
        )}

        {/* Surprise Card */}
        {isRevealed && (
          <div className="animate-flip-in">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-lg mx-auto border-4 border-[#F8C8DC]">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#F8C8DC] transition-colors duration-300"
                aria-label="Close message"
              >
                <X className="w-4 h-4 text-[#2D2D2D]" />
              </button>

              {/* Card Header */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#F8C8DC] to-[#E6E6FA] rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-[#2D2D2D] fill-[#2D2D2D]" />
                  </div>
                  <Star className="absolute -top-2 -right-2 w-6 h-6 text-[#FFF5BA] fill-[#FFF5BA] animate-pulse" />
                  <Star className="absolute -bottom-1 -left-2 w-5 h-5 text-[#FFB5A7] fill-[#FFB5A7] animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>

              {/* Card Title */}
              <h3 className="font-script text-2xl sm:text-3xl text-[#2D2D2D] mb-6">
                To My Dearest ____________ (there is no words that decribe)
              </h3>

              {/* Message Content - More Impressive */}
              <div className="text-left space-y-4 text-[#6B6B6B] text-sm sm:text-base leading-relaxed">
                <p className="font-medium text-[#2D2D2D]">
                  Happy Birthday to the most incredible person I know!
                </p>
                
                <p>
                  On this special day, I want you to know just how much you mean to me. 
                  You are not just my best friend—you are my chosen family, my partner in crime, 
                  my personal cheerleader, and the person who makes life so much brighter.
                </p>
                
                <p>
                  I still remember the day we met like it was yesterday. Who would have thought 
                  that a simple conversation would lead to one of the most meaningful friendships 
                  of my life? You walked into my world and made it infinitely better.
                </p>
                
                <p>
                  Through every high and every low, you have been there. You have celebrated my 
                  victories as if they were your own and held my hand through my toughest moments. 
                  Your unwavering support, your infectious laughter, and your beautiful soul have 
                  been my greatest blessings.
                </p>

                <div className="bg-gradient-to-r from-[#F8C8DC]/20 to-[#E6E6FA]/20 rounded-xl p-4 my-4">
                  <p className="font-script text-lg text-[#2D2D2D] text-center">
                    "A true friend is the greatest of all blessings."
                  </p>
                </div>
                
                <p>
                  I admire your strength, your kindness, your sense of humor, and the way you 
                  light up every room you enter. You inspire me to be a better person every single day.
                </p>
                
                <p>
                  On your special day, I wish you all the happiness, success, and love that this 
                  world has to offer. May this year bring you countless reasons to smile, endless 
                  adventures to cherish, and memories that will last a lifetime.
                </p>

                <p className="font-medium text-[#2D2D2D]">
                  Thank you for being you. Thank you for being my best friend. 
                  Here's to many more years of friendship, laughter, and unforgettable moments!
                </p>
              </div>

              {/* Closing */}
              <div className="mt-8 pt-6 border-t border-[#F8C8DC]/50 text-center">
                <p className="font-script text-2xl sm:text-3xl text-[#F8C8DC] mb-2">
                  Happy Birthday, My Dear Crush!
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  With all my love.....
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  <Heart className="w-4 h-4 text-[#F8C8DC] fill-[#F8C8DC]" />
                  <Heart className="w-4 h-4 text-[#FFB5A7] fill-[#FFB5A7]" />
                  <Heart className="w-4 h-4 text-[#E6E6FA] fill-[#E6E6FA]" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-3 -left-3 w-12 h-12 opacity-50">
                <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 opacity-50">
                <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
