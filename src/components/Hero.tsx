
import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Keywords for the scattered background
  const keywords = [
    'HTML', 'CSS', 'JS', 'BOOTSTRAP', 'TAILWIND', 'UTILITY', 
    'REACT', 'UI', 'UX', 'DOM', 'API', 'NODE', 'VITE', 'SVG'
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#f3f3f3] dark:bg-brutal-black overflow-hidden border-b-4 border-black dark:border-white transition-colors duration-300">
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none z-0 will-change-transform" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--grid-color, #000) 2px, transparent 2px), linear-gradient(90deg, var(--grid-color, #000) 2px, transparent 2px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      <style>{`
        :root { --grid-color: #000; }
        .dark { --grid-color: #fff; }
        .brutal-stroke-text {
          color: transparent;
          -webkit-text-stroke: 1.5px black;
          paint-order: stroke fill;
        }
        .dark .brutal-stroke-text { -webkit-text-stroke: 1.5px white; }
        @media (min-width: 768px) { .brutal-stroke-text { -webkit-text-stroke-width: 3px; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col justify-center">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
               <h2 className="font-mono text-lg font-black mb-6 bg-brutal-lime text-black inline-block px-3 py-1 border-2 border-black shadow-hard">FRONTEND_DEVELOPER</h2>
             </motion.div>
             
            <motion.h1 
              className="text-6xl sm:text-8xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-black dark:text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I BUILD<br />
              <span className="brutal-stroke-text hover:text-brutal-lime transition-colors duration-300">LANDING</span><br />
              PAGES.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-mono max-w-2xl border-l-8 border-brutal-pink-neon pl-6 py-2 mb-10 bg-white dark:bg-black border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white text-black dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Specializing in responsive, high-impact web interfaces. I turn designs into clean, semantic code using modern CSS and JS.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="inline-flex items-center text-xl md:text-2xl font-black bg-black dark:bg-white text-white dark:text-black px-10 py-5 border-2 border-transparent hover:bg-brutal-lime dark:hover:bg-brutal-lime hover:text-black hover:border-black shadow-hard transition-all duration-200 group">
                VIEW_WORK
                <ArrowDownRight className="ml-4 group-hover:rotate-45 transition-transform" size={32} />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <motion.div 
              className="w-full aspect-square bg-white dark:bg-brutal-black border-4 border-black dark:border-white shadow-hard-xl flex items-center justify-center relative overflow-hidden will-change-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-brutal-blue-electric opacity-10"></div>
                
                {/* Extremely Dense Scattered Pattern Background */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden font-black uppercase opacity-20 dark:opacity-30 flex flex-wrap gap-x-3 gap-y-4 p-2 content-start items-start justify-center rotate-[-5deg] scale-125">
                  {Array.from({ length: 65 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`
                        text-[9px] md:text-xs tracking-tighter
                        ${i % 7 === 0 ? 'rotate-12 scale-110' : ''}
                        ${i % 5 === 0 ? '-rotate-12 bg-black text-white px-0.5' : ''}
                        ${i % 3 === 0 ? 'rotate-45 border border-black px-0.5' : ''}
                        ${i % 11 === 0 ? 'text-brutal-pink-neon' : ''}
                        ${i % 13 === 0 ? 'bg-brutal-yellow text-black' : ''}
                        ${i % 17 === 0 ? 'text-brutal-blue-electric font-mono' : ''}
                        transform-gpu transition-transform
                      `}
                    >
                      {keywords[i % keywords.length]}
                    </div>
                  ))}
                  {/* Additional layer of larger overlapping words */}
                  <div className="absolute top-1/4 left-0 text-3xl opacity-10 -rotate-12 border-2 border-black px-2">BOOTSTRAP</div>
                  <div className="absolute bottom-1/4 right-0 text-4xl opacity-10 rotate-12 bg-brutal-lime text-black px-2">TAILWIND</div>
                  <div className="absolute top-1/2 left-1/3 text-2xl opacity-10 rotate-90">UTILITY</div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center font-mono font-black bg-white dark:bg-black border-4 border-black p-6 shadow-hard transform -rotate-3 hover:rotate-0 transition-transform cursor-crosshair z-10">
                        <div className="text-brutal-pink-neon">ROLE: FRONTEND</div>
                        <div className="text-brutal-lime">STACK: WEB</div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
