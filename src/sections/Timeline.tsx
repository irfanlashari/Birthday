import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, Star, Sparkles, Gift } from 'lucide-react';

/* 
  IMAGE REPLACEMENT GUIDE:
  To replace the memory images with your own photos:
  1. Add your images to the /public folder
  2. Update the 'image' field below with your image filename
  3. Recommended image size: 800x600px (4:3 ratio)
  4. Format: JPG or PNG
  
  Current images:
  - memory1.png: "The Day We Met" - Replace with a photo from when you first met
  - memory2.png: "Our First Adventure" - Replace with a photo from a trip/adventure
  - memory3.png: "Things I Admire" - Replace with a meaningful photo
  - memory4.png: "Inside Jokes" - Replace with a fun/candid photo
*/

interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'The Day We Met',
    description: 'From strangers to best friends, that very first conversation changed everything. Who knew we would become inseparable?',
    image: '/memory1.png', // REPLACE: Add your "first meeting" photo here
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Our First Adventure',
    description: 'Remember that spontaneous trip we took? The laughter, the memories, and the stories we created together.',
    image: '/memory2.png', // REPLACE: Add your adventure photo here
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Things I Admire About You',
    description: 'Your kindness, your strength, your sense of humor, and the way you always know how to make me smile.',
    image: '/memory3.png', // REPLACE: Add a meaningful photo here
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Our Inside Jokes',
    description: 'Those moments that only we understand, the laughter that never ends, and the bond that grows stronger every day.',
    image: '/memory4.png', // REPLACE: Add a fun/candid photo here
    icon: <Gift className="w-5 h-5" />,
  },
];

function TimelineCard({ memory, index }: { memory: Memory; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.2);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center md:justify-between gap-4 md:gap-8 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Card */}
      <div
        className={`w-full md:w-[45%] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
          isVisible ? (isEven ? 'animate-slide-left' : 'animate-slide-right') : 'opacity-0'
        }`}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 w-10 h-10 bg-[#F8C8DC] rounded-full flex items-center justify-center text-[#2D2D2D]">
            {memory.icon}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#2D2D2D] mb-2">
            {memory.title}
          </h3>
          <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed">
            {memory.description}
          </p>
        </div>
      </div>

      {/* Timeline Dot (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#F8C8DC] to-[#E6E6FA] rounded-full items-center justify-center shadow-lg z-10">
        <span className="font-display font-bold text-[#2D2D2D]">{memory.id}</span>
      </div>

      {/* Empty Space for Desktop Layout */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

export function Timeline() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section id="timeline" className="py-16 sm:py-20 md:py-28 bg-white relative">
      {/* Section Header */}
      <div
        ref={titleRef}
        className={`text-center px-4 mb-12 sm:mb-16 transition-all duration-600 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
          Our Journey Together
        </h2>
        <p className="font-script text-xl sm:text-2xl text-[#6B6B6B]">
          Every moment with you is a treasure
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-[#F8C8DC] to-[#E6E6FA] mx-auto mt-4 rounded-full" />
      </div>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#F8C8DC] via-[#E6E6FA] to-[#C5E8D4] rounded-full" />

        {/* Timeline Cards */}
        <div className="space-y-8 md:space-y-16">
          {memories.map((memory, index) => (
            <TimelineCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>

      {/* More Decorative Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 opacity-30 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-40 left-8 w-20 h-20 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>
      <div className="absolute top-1/2 right-5 w-14 h-14 opacity-20 animate-float">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="absolute bottom-20 right-16 w-12 h-12 opacity-25 animate-float-delayed">
        <img src="/flowers.png" alt="" className="w-full h-full object-contain rotate-30" />
      </div>
    </section>
  );
}
