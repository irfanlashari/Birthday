import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 sm:py-14 bg-[#E6E6FA] relative overflow-hidden">
      {/* More Decorative Flowers */}
      <div className="absolute top-4 left-10 w-16 h-16 opacity-30">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-8 right-16 w-12 h-12 opacity-25">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute bottom-4 left-1/4 w-10 h-10 opacity-20">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="absolute bottom-8 right-1/3 w-14 h-14 opacity-25">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Message */}
        <div className="mb-6">
          <p className="font-script text-xl sm:text-2xl text-[#2D2D2D] mb-2">
            Made with love for my best friend
          </p>
          <div className="flex items-center justify-center gap-2 text-[#6B6B6B]">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-[#F8C8DC] fill-[#F8C8DC] animate-pulse" />
            <span>and appreciation</span>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#F8C8DC] to-[#FFB5A7] mx-auto mb-6 rounded-full" />

        {/* Copyright */}
        <p className="text-[#6B6B6B] text-sm">
          {currentYear} - Happy Birthday Celebration
        </p>
      </div>
    </footer>
  );
}
