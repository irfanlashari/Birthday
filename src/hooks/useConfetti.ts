import { useCallback } from 'react';

interface ConfettiOptions {
  particleCount?: number;
  colors?: string[];
  duration?: number;
}

export function useConfetti() {
  const triggerConfetti = useCallback((options: ConfettiOptions = {}) => {
    const {
      particleCount = 100,
      colors = ['#F8C8DC', '#E6E6FA', '#C5E8D4', '#FFB5A7', '#FFF5BA'],
      duration = 3000,
    } = options;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const size = Math.random() * 10 + 5;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confetti-fall ${duration / 1000}s linear ${delay}s forwards;
      `;

      container.appendChild(particle);
    }

    setTimeout(() => {
      document.body.removeChild(container);
    }, duration + 500);
  }, []);

  return { triggerConfetti };
}
