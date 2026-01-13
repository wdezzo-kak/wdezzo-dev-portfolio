import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeDemo]);

  return (
    <section id="work" className="py-20 border-b-4 border-black bg-white">
      {/* Live Demo Modal */}
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveDemo(null)}
            />
            
            {/* Modal Window - 30px from all edges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-[30px] flex flex-col bg-white border-4 border-black shadow-hard-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 h-12 bg-brutal-lime border-b-4 border-black flex items-center justify-between px-4 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full opacity-50"></div>
                  <span className="font-mono font-bold text-sm truncate max-w-[200px] sm:max-w-md">
                    RUNNING: {activeDemo}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveDemo(null)}
                  className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                  aria-label="Close Demo"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>
              
              {/* Iframe Container */}
              <div className="flex-grow bg-white relative w-full h-full overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center z-0">
                    <span className="font-mono text-gray-400 animate-pulse">LOADING INTERFACE...</span>
                 </div>
                 <iframe 
                   src={activeDemo} 
                   className="w-full h-full relative z-10 border-0 block"
                   title="Live Project Demo"
                   sandbox="allow-scripts allow-same-origin allow-forms"
                   loading="lazy"
                 />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            Selected Work
          </h2>
          <div className="w-full h-2 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white border-4 border-black shadow-hard-lg hover:shadow-hard transition-all duration-200 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-video border-b-4 border-black overflow-hidden bg-gray-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                
                {/* ID Badge */}
                <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-mono text-xl font-bold border-r-4 border-b-4 border-white">
                  {project.id}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                {/* Decorative background shape */}
                <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 ${project.color}`}></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{project.title}</h3>
                  <span className="font-mono text-sm font-bold border-2 border-black px-2 py-1 bg-white whitespace-nowrap">
                    {project.year}
                  </span>
                </div>
                
                <div className="mb-6 relative z-10">
                   <span className={`inline-block px-2 py-0.5 text-xs font-black uppercase tracking-widest border border-black mb-2 ${project.color}`}>
                     {project.category}
                   </span>
                   <p className="font-mono text-sm md:text-base leading-relaxed">
                     {project.description}
                   </p>
                </div>

                <div className="mt-auto relative z-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-bold bg-black text-white px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveDemo(project.demoUrl)} 
                      className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-black py-3 font-bold hover:bg-black hover:text-white transition-colors"
                    >
                       <ExternalLink size={18} /> LIVE DEMO
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;