import { useState, useEffect, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { RefreshCw, Trophy, Star, Heart, Gift, Music, Sparkles, Cake } from 'lucide-react';

interface Card {
  id: number;
  icon: React.ReactNode;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardIcons = [
  { icon: <Star className="w-8 h-8" />, name: 'star' },
  { icon: <Heart className="w-8 h-8" />, name: 'heart' },
  { icon: <Gift className="w-8 h-8" />, name: 'gift' },
  { icon: <Music className="w-8 h-8" />, name: 'music' },
  { icon: <Sparkles className="w-8 h-8" />, name: 'sparkles' },
  { icon: <Cake className="w-8 h-8" />, name: 'cake' },
];

export function GameSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>(0.3);
  const { triggerConfetti } = useConfetti();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const shuffledCards = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsGameComplete(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setTimeout(() => {
        if (firstCard?.name === secondCard?.name) {
          // Match found
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        } else {
          // No match
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }
      }, 800);
    }
  };

  // Check game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameComplete(true);
      triggerConfetti({ particleCount: 150, duration: 4000 });
    }
  }, [cards, triggerConfetti]);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#FFF8F0] relative overflow-hidden">
      {/* More Decorative Elements */}
      <div className="absolute top-10 left-8 w-20 h-20 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-24 right-12 w-16 h-16 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute bottom-20 left-16 w-18 h-18 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="absolute bottom-32 right-8 w-14 h-14 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-30" />
      </div>
      <div className="absolute top-1/2 left-4 w-12 h-12 opacity-20 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-45" />
      </div>
      <div className="absolute top-1/3 right-6 w-10 h-10 opacity-20 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-60" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-10 sm:mb-14 transition-all duration-600 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            Let's Play!
          </h2>
          <p className="font-script text-xl sm:text-2xl text-[#6B6B6B] mb-4">
            Match the birthday pairs
          </p>
          <div className="flex items-center justify-center gap-4 text-[#6B6B6B]">
            <span className="text-sm sm:text-base">Moves: <strong className="text-[#F8C8DC]">{moves}</strong></span>
          </div>
        </div>

        {/* Game Complete Message */}
        {isGameComplete && (
          <div className="mb-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-[#F8C8DC] to-[#E6E6FA] rounded-2xl p-6 text-center">
              <Trophy className="w-12 h-12 text-[#2D2D2D] mx-auto mb-3" />
              <h3 className="font-display text-2xl font-bold text-[#2D2D2D] mb-2">
                Congratulations!
              </h3>
              <p className="text-[#2D2D2D]/80">
                You completed the game in {moves} moves!
              </p>
            </div>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isChecking}
              className={`
                relative aspect-square rounded-xl sm:rounded-2xl touch-button
                transition-all duration-400 transform
                ${card.isMatched 
                  ? 'bg-[#C5E8D4] scale-95' 
                  : card.isFlipped 
                    ? 'bg-white rotate-y-180' 
                    : 'bg-gradient-to-br from-[#F8C8DC] to-[#E6E6FA] hover:scale-105 hover:shadow-lg'
                }
                ${!card.isFlipped && !card.isMatched ? 'shadow-md' : 'shadow-lg'}
              `}
              style={{
                transformStyle: 'preserve-3d',
              }}
              aria-label={card.isFlipped || card.isMatched ? card.name : 'Hidden card'}
            >
              {/* Card Front (Hidden) */}
              {!card.isFlipped && !card.isMatched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" />
                </div>
              )}
              
              {/* Card Back (Revealed) */}
              {(card.isFlipped || card.isMatched) && (
                <div className="absolute inset-0 flex items-center justify-center text-[#2D2D2D]">
                  {card.icon}
                </div>
              )}

              {/* Matched Indicator */}
              {card.isMatched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#C5E8D4]/50 rounded-xl sm:rounded-2xl" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={initializeGame}
            className="touch-button inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2D2D2D] font-medium rounded-full shadow-md hover:shadow-lg hover:bg-[#F8C8DC] transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </section>
  );
}
