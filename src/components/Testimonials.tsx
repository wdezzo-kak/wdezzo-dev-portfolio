
import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS_SAFELIST, CONFIG } from '../constants';
import { Quote, Star, RefreshCcw, Hand } from 'lucide-react';
import { motion, useMotionValue, animate, useSpring, useTransform } from 'framer-motion';
import { Testimonial } from '../types';

const BRUTAL_COLOR_MAP: Record<string, string> = {
  'bg-brutal-lime': '66ff00',
  'bg-brutal-pink-neon': 'ff1493',
  'bg-brutal-blue-electric': '0066ff',
  'bg-brutal-orange-hot': 'ff3300',
  'bg-brutal-yellow': 'ffff00',
  'bg-brutal-cyan-deep': '00ffcc',
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_SAFELIST);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const controls = useRef<any>(null);

  const approvedTestimonials = testimonials.filter(t => t.show_in_testimonials !== false);
  // Two sets is enough for the infinite logic
  const displayItems = [...approvedTestimonials, ...approvedTestimonials];

  const fetchVisitorLogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL);
      if (response.ok) {
        const remoteLogs = await response.json();
        if (remoteLogs && Array.isArray(remoteLogs) && remoteLogs.length > 0) {
          setTestimonials(remoteLogs);
          setIsLive(true);
        }
      }
    } catch (err) {
      console.error("Failed to sync logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const startAnimation = () => {
    if (!marqueeRef.current || isDragging) return;
    
    const totalWidth = marqueeRef.current.scrollWidth / 2;
    const currentX = x.get();
    
    // Calculate remaining distance to complete one full cycle from current position
    const targetX = currentX - totalWidth;

    controls.current = animate(x, targetX, {
      ease: "linear",
      duration: Math.max(20, approvedTestimonials.length * 10),
      repeat: Infinity,
      onUpdate: (latest) => {
        // Seamlessly wrap around when we've scrolled past one full set
        if (latest <= -totalWidth) {
          x.set(latest + totalWidth);
        }
      }
    });
  };

  useEffect(() => {
    if (CONFIG.GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL' && CONFIG.GOOGLE_SCRIPT_URL !== '') {
      fetchVisitorLogs();
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      controls.current?.stop();
    } else {
      startAnimation();
    }
    return () => controls.current?.stop();
  }, [isDragging, testimonials]);

  const RatingStars = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={12} 
          fill={i < count ? "currentColor" : "none"} 
          className={i < count ? "text-black" : "text-black/10"} 
          strokeWidth={3}
        />
      ))}
    </div>
  );

  const getAvatarUrl = (item: Testimonial) => {
    const hex = BRUTAL_COLOR_MAP[item.color] || '000000';
    return `https://api.dicebear.com/9.x/identicon/svg?seed=${item.id}&backgroundColor=ffffff&colors=${hex}`;
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-brutal-black border-b-4 border-black dark:border-white transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <div className={`h-2.5 w-10 md:h-4 md:w-16 ${isLive ? 'bg-brutal-lime' : 'bg-brutal-pink-neon'} border-2 border-black dark:border-white shadow-hard`}></div>
              <span className="font-mono font-black uppercase text-[10px] md:text-lg text-black dark:text-white tracking-widest">
                {isLive ? 'FEED_SYNCED' : 'LOCAL_LOGS'}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-black dark:text-white leading-[0.85]">
              CLIENT<br/>TRANSMISSIONS
            </h2>
          </div>
          
          <button 
            onClick={fetchVisitorLogs}
            disabled={isLoading || CONFIG.GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL' || CONFIG.GOOGLE_SCRIPT_URL === ''}
            className="flex items-center self-start md:self-end gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 md:px-6 md:py-3 font-mono font-black uppercase border-2 border-transparent hover:bg-brutal-lime dark:hover:bg-brutal-lime hover:text-black hover:border-black shadow-hard text-xs md:text-lg transition-all disabled:opacity-50"
          >
            <RefreshCcw size={16} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'SYNCING' : 'REFRESH'}
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full py-6 md:py-10 cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none"
      >
        <motion.div 
          ref={marqueeRef}
          style={{ x }}
          drag="x"
          onDragStart={() => {
            setIsDragging(true);
            controls.current?.stop();
          }}
          onDragEnd={(event, info) => {
            setIsDragging(false);
            const currentX = x.get();
            const totalWidth = marqueeRef.current ? marqueeRef.current.scrollWidth / 2 : 0;
            
            // Normalize X position to keep it within the first set of items for seamless loop restart
            const normalizedX = ((currentX % totalWidth) + totalWidth) % totalWidth - totalWidth;
            x.set(normalizedX);
          }}
          className="flex whitespace-nowrap"
        >
          <div className="flex gap-4 md:gap-8 px-4">
            {displayItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[400px] lg:w-[440px] relative p-6 md:p-10 border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg ${item.color} group transition-all flex flex-col whitespace-normal pointer-events-none`}
              >
                {/* Quote Icon - Top Left */}
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-black dark:bg-white p-2 md:p-3 border-2 md:border-4 border-white dark:border-black transform -rotate-12 z-20 shadow-hard">
                  <Quote size={14} className="text-white dark:text-black md:w-8 md:h-8" />
                </div>
                
                {/* Rating and ID - Top Right */}
                <div className="flex justify-end items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <RatingStars count={item.rating} />
                  <span className="font-mono text-[9px] md:text-xs font-black bg-black text-white px-2 py-0.5 uppercase tracking-tighter whitespace-nowrap">
                    #{item.id.slice(0, 5)}
                  </span>
                </div>

                <div className="flex-grow mb-8 md:mb-12">
                  <p className="font-mono text-sm sm:text-base md:text-xl font-black leading-tight text-black italic ">
                    "{item.message}"
                  </p>
                </div>

                <div className="pt-4 md:pt-6 border-t-2 border-black/20 flex items-center gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-white border-2 border-black shadow-hard flex-shrink-0 overflow-hidden">
                    <img 
                      src={getAvatarUrl(item)} 
                      alt="PFP"
                      className="w-full h-full object-cover p-0.5"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black uppercase text-black leading-none text-xs md:text-lg truncate">{item.name}</h4>
                    {item.role && (
                      <p className="font-mono text-[8px] md:text-xs font-bold text-black/50 uppercase mt-1 tracking-widest truncate">
                        {item.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 md:mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex gap-3 items-center">
            <div className={`w-2 h-2 md:w-3 md:h-3 ${isLoading ? 'bg-brutal-orange-hot' : 'bg-brutal-lime'} border-2 border-black animate-ping`}></div>
            <span className="font-mono text-[10px] md:text-sm font-black text-black dark:text-white uppercase tracking-widest">
              {isLoading ? 'UPLINKING' : 'SIGNAL_STABLE'}
            </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black dark:bg-white px-3 py-1.5 md:px-4 md:py-2 border-2 border-black dark:border-white shadow-hard transform -rotate-1">
            <Hand size={14} className="text-white dark:text-black animate-bounce" />
            <span className="font-mono text-[9px] md:text-xs font-black text-white dark:text-black uppercase tracking-widest">DRAG_TO_BROWSE</span>
          </div>
          <div className="bg-brutal-pink-neon text-black px-4 py-1.5 md:px-5 md:py-2 font-mono text-[9px] md:text-sm font-black uppercase border-2 border-black shadow-hard rotate-1">
             LOG_COUNT: {approvedTestimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
