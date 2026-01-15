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
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#f3f3f3] dark:bg-brutal-black overflow-hidden border-b-4 border-black dark:border-white transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--grid-color, #000) 2px, transparent 2px), linear-gradient(90deg, var(--grid-color, #000) 2px, transparent 2px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      <style>{`
        :root { --grid-color: #000; }
        .dark { --grid-color: #fff; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 flex flex-col justify-center">
             <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
             >
               <h2 className="font-mono text-xl md:text-2xl font-bold mb-4 bg-brutal-orange-hot inline-block px-2 py-1 border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white">
                 FRONTEND DEVELOPER
               </h2>
             </motion.div>
             
            <motion.h1 
              className="text-7xl sm:text-8xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 text-black dark:text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              I BUILD<br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '3px currentColor' }}>LANDING</span><br />
              PAGES.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-mono max-w-2xl border-l-4 border-black dark:border-white pl-6 py-2 mb-10 bg-white dark:bg-brutal-black shadow-hard dark:shadow-hard-white text-black dark:text-white transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Specializing in responsive, high-impact web interfaces. I turn designs into clean, semantic code using modern CSS and JS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="#work" 
                onClick={(e) => handleScroll(e, '#work')}
                className="inline-flex items-center text-2xl font-black bg-black dark:bg-white text-white dark:text-black px-8 py-4 border-2 border-transparent hover:bg-brutal-lime dark:hover:bg-brutal-lime  hover:text-black hover:border-black dark:hover:border-white hover:shadow-hard dark:hover:shadow-hard-white transition-all duration-200 group"
              >
                VIEW WORK
                <ArrowDownRight className="ml-4 group-hover:rotate-45 transition-transform duration-200" size={32} />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <motion.div 
              className="w-full aspect-square bg-white dark:bg-brutal-black border-4 border-black dark:border-white shadow-hard-xl dark:shadow-hard-white-xl flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-brutal-blue-electric opacity-20"></div>
                <div className="text-center transform rotate-12">
                   <div className="text-9xl font-black opacity-10 dark:opacity-20 select-none text-black dark:text-white">HTML</div>
                   <div className="text-9xl font-black opacity-10 dark:opacity-20 select-none text-black dark:text-white">CSS</div>
                   <div className="text-9xl font-black opacity-10 dark:opacity-20 select-none text-black dark:text-white">JS</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center font-mono font-bold bg-white dark:bg-black border-2 border-black dark:border-white p-4 shadow-hard dark:shadow-hard-white text-black dark:text-white">
                        <div>ROLE: FRONTEND</div>
                        <div>STACK: WEB</div>
                        <div>STATUS: READY</div>
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
