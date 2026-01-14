import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_SAFELIST } from '../constants';
import { Quote, Star, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
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
  
  const fetchVisitorLogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/get-visitorlog');
      if (response.ok) {
        const remoteLogs = await response.json();
        
        // Only show the safelist if remote logs are empty
        if (remoteLogs && remoteLogs.length > 0) {
          setTestimonials(remoteLogs);
          setIsLive(true);
        } else {
          setTestimonials(TESTIMONIALS_SAFELIST);
          setIsLive(false);
        }
      } else {
        // Fallback to safelist on error
        setTestimonials(TESTIMONIALS_SAFELIST);
        setIsLive(false);
      }
    } catch (err) {
      console.error("Failed to sync logs:", err);
      setTestimonials(TESTIMONIALS_SAFELIST);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitorLogs();
  }, []);

  const RatingStars = ({ count }: { count: number }) => (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={18} 
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
    <section id="testimonials" className="py-24 bg-white dark:bg-brutal-black border-b-4 border-black dark:border-white transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-4 w-20 ${isLive ? 'bg-brutal-lime' : 'bg-brutal-pink-neon'} border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white transition-colors`}></div>
              <span className="font-mono font-black uppercase text-xl text-black dark:text-white">
                {isLive ? 'Live_Visitor_Logs' : 'Archive_Logs'}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black dark:text-white leading-none">
              CLIENT<br/>TRANSMISSIONS
            </h2>
          </div>
          
          <button 
            onClick={fetchVisitorLogs}
            disabled={isLoading}
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-mono font-black uppercase border-2 border-transparent hover:bg-brutal-lime hover:text-black hover:border-black dark:hover:border-white shadow-hard active:shadow-none transition-all group"
          >
            <RefreshCcw size={20} className={isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
            {isLoading ? 'SYNCING...' : 'SYNC_LOGS'}
          </button>
        </div>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden py-10">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(20, testimonials.length * 5),
              ease: "linear",
            },
          }}
          style={{ width: 'max-content' }}
        >
          {([...testimonials, ...testimonials]).map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`flex-shrink-0 w-[450px] relative p-10 border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg ${item.color} group transition-all flex flex-col whitespace-normal`}
            >
              <div className="absolute -top-6 -left-6 bg-black dark:bg-white p-3 border-4 border-white dark:border-black transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Quote size={32} className="text-white dark:text-black" />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <RatingStars count={item.rating} />
                <span className="font-mono text-[10px] font-black opacity-30 select-none uppercase">LOG_ID: {item.id.slice(0, 8)}</span>
              </div>

              <div className="flex-grow mb-8">
                <p className="font-mono text-xl font-bold leading-tight text-black italic">
                  "{item.message}"
                </p>
              </div>

              <div className="pt-6 border-t-2 border-black/20 flex items-center gap-4">
                <div className="w-16 h-16 bg-white border-2 border-black shadow-hard flex-shrink-0 overflow-hidden">
                  <img 
                    src={getAvatarUrl(item)} 
                    alt="Digital Identity"
                    className="w-full h-full object-cover p-1"
                  />
                </div>
                <div>
                  <h4 className="font-black uppercase text-black leading-none text-lg">{item.name}</h4>
                  {item.role && <p className="font-mono text-xs font-bold text-black/60 uppercase mt-1 tracking-widest">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 flex justify-between items-center">
        <div className="flex gap-2">
            <div className={`w-3 h-3 ${isLoading ? 'bg-brutal-orange-hot' : (isLive ? 'bg-brutal-lime' : 'bg-brutal-yellow')} border border-black animate-ping`}></div>
            <span className="font-mono text-[10px] font-bold text-black dark:text-white uppercase tracking-tighter">
              {isLoading ? 'ESTABLISHING_UPLINK...' : (isLive ? 'LIVE_FEED_ESTABLISHED' : 'ARCHIVE_DATA_LOADED')}
            </span>
        </div>
        <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 font-mono text-xs font-black uppercase">
           STATUS: {testimonials.length}_LOGS_PARSED {isLive ? '[REMOTE]' : '[INTERNAL]'}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;