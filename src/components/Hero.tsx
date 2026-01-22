
import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col justify-center bg-[#f3f3f3] dark:bg-brutal-black overflow-hidden border-b-4 border-black dark:border-white transition-colors duration-300">
      {/* Background Grid Pattern - Locked to back */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none z-0" 
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
        }
        .dark .brutal-stroke-text {
          -webkit-text-stroke: 1.5px white;
        }
        @media (min-width: 768px) {
          .brutal-stroke-text {
            -webkit-text-stroke-width: 3px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col justify-center">
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
             >
               <h2 className="font-mono text-lg md:text-2xl font-black mb-6 bg-brutal-lime text-black inline-block px-3 py-1 border-2 border-black dark:border-white shadow-hard">
                 FRONTEND_DEVELOPER
               </h2>
             </motion.div>
             
            <motion.h1 
              className="text-6xl sm:text-8xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-black dark:text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 40, delay: 0.1 }}
            >
              I BUILD<br />
              <span className="brutal-stroke-text hover:text-brutal-lime hover:[-webkit-text-stroke-color:black] transition-all duration-300 cursor-default">LANDING</span><br />
              PAGES.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-mono max-w-2xl border-l-8 border-brutal-pink-neon pl-6 py-2 mb-10 bg-white dark:bg-black border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white text-black dark:text-white transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Specializing in responsive, high-impact web interfaces. I turn designs into clean, semantic code using modern CSS and JS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <a 
                href="#work" 
                onClick={(e) => handleScroll(e, '#work')}
                className="inline-flex items-center text-xl md:text-2xl font-black bg-black dark:bg-white text-white dark:text-black px-10 py-5 border-2 border-transparent hover:bg-brutal-lime dark:hover:bg-brutal-lime hover:text-black hover:border-black dark:hover:border-white shadow-hard dark:shadow-hard-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
              >
                VIEW_WORK
                <ArrowDownRight className="ml-4 group-hover:rotate-45 transition-transform duration-200" size={32} strokeWidth={3} />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <motion.div 
              className="w-full aspect-square bg-white dark:bg-brutal-black border-4 border-black dark:border-white shadow-hard-xl dark:shadow-hard-white-xl flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
                <div className="absolute inset-0 bg-brutal-blue-electric opacity-10"></div>
                <div className="text-center transform rotate-12">
                   <div className="text-9xl font-black opacity-5 select-none text-black dark:text-white">HTML</div>
                   <div className="text-9xl font-black opacity-5 select-none text-black dark:text-white">JS  JS</div>
                   <div className="text-9xl font-black opacity-5 select-none text-black dark:text-white">CSS</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center font-mono font-black bg-white dark:bg-black border-4 border-black dark:border-white p-6 shadow-hard dark:shadow-hard-white text-black dark:text-white transform -rotate-3 hover:rotate-0 transition-transform cursor-crosshair">
                        <div className="text-brutal-pink-neon">ROLE: FRONTEND</div>
                        <div className="text-brutal-lime">STACK: WEB</div>
                        <div className="mt-2 pt-2 border-t-2 border-black/10 dark:border-white/10 text-[10px]">STATUS: READY</div>
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
