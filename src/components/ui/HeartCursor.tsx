import { useEffect, useState } from 'react';

export function HeartCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hearts, setHearts] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let heartId = 0;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add floating heart effect on click
      if (e.type === 'click') {
        const newHeart = { x: e.clientX, y: e.clientY, id: heartId++ };
        setHearts(prev => [...prev, newHeart]);
        
        // Remove heart after animation
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1000);
      }
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('click', updatePosition);
    
    // Add hover effect to all clickable elements
    const clickables = document.querySelectorAll('button, a, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('click', updatePosition);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Hide default cursor on desktop */}
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Custom heart cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`relative ${isHovering ? 'animate-pulse scale-125' : 'scale-100'}`}>
          {/* Heart shape */}
          <svg
            width={isHovering ? "32" : "24"}
            height={isHovering ? "32" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-200"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isHovering ? "#FF69B4" : "#FF1493"}
              stroke="#FFB6C1"
              strokeWidth="1"
            />
            {/* Sparkle effect when hovering */}
            {isHovering && (
              <>
                <circle cx="8.5" cy="8.5" r="1.5" fill="white" opacity="0.8" />
                <circle cx="15.5" cy="8.5" r="1.5" fill="white" opacity="0.8" />
              </>
            )}
          </svg>
          
          {/* Pulsing ring */}
          <div className="absolute inset-0 -m-2 rounded-full bg-pink-400 opacity-20 animate-ping" />
        </div>
      </div>
      
      {/* Floating hearts on click */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[9998] text-2xl animate-float-heart"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
}