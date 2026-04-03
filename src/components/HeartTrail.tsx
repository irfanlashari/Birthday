import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}

export function HeartTrail() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  let heartId = 0;
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle heart creation (avoid too many hearts)
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        // Only create heart if mouse moved enough
        const dx = Math.abs(e.clientX - lastX);
        const dy = Math.abs(e.clientY - lastY);
        
        if (dx > 15 || dy > 15 || hearts.length === 0) {
          // Create new heart
          const newHeart: Heart = {
            id: heartId++,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 20 + 16, // Random size between 16-36px
            opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5-1
            rotation: Math.random() * 360, // Random rotation
          };
          
          setHearts(prev => [...prev, newHeart]);
          lastX = e.clientX;
          lastY = e.clientY;
          
          // Remove heart after animation
          setTimeout(() => {
            setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
          }, 800);
        }
        
        timeoutId = setTimeout(() => {
          timeoutId = undefined as any;
        }, 50);
      }, 30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hearts.length]);

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
      
      {/* Floating hearts trail */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[9999] animate-float-heart"
          style={{
            left: heart.x,
            top: heart.y,
            transform: `translate(-50%, -50%) rotate(${heart.rotation}deg)`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`rgba(255, 105, 180, ${heart.opacity})`}
              stroke="#FFB6C1"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}
      
      {/* Custom heart cursor */}
      <HeartCursor />
    </>
  );
}

// Component for the main cursor
function HeartCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);
    
    const clickables = document.querySelectorAll('button, a, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[10000] transition-all duration-150"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className={`relative ${isHovering ? 'animate-pulse scale-125' : 'scale-100'}`}>
        <svg
          width={isHovering ? "28" : "22"}
          height={isHovering ? "28" : "22"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-200"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#FF1493"
            stroke="#FFB6C1"
            strokeWidth="1"
          />
          {isHovering && (
            <>
              <circle cx="8.5" cy="8.5" r="1.5" fill="white" opacity="0.8" />
              <circle cx="15.5" cy="8.5" r="1.5" fill="white" opacity="0.8" />
            </>
          )}
        </svg>
        
        {/* Pulsing effect */}
        <div className="absolute inset-0 -m-2 rounded-full bg-pink-400 opacity-20 animate-ping" />
      </div>
    </div>
  );
}