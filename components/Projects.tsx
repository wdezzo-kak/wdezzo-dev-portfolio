import React, { useState, useEffect, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsProps {
  onInteract?: (projectId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onInteract }) => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Randomize the order of projects on initial load
  const randomizedProjects = useMemo(() => {
    return [...PROJECTS].sort(() => Math.random() - 0.5);
  }, []);

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

  const handleDemoOpen = (projectId: string, demoUrl: string) => {
    setActiveDemo(demoUrl);
    // Explicitly track the interaction on click
    if (onInteract) onInteract(projectId);
  };

  return (
    <section id="work" className="py-20 border-b-4 border-black dark:border-white bg-white dark:bg-brutal-black transition-colors duration-300">
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 dark:bg-white/10 backdrop-blur-md"
              onClick={() => setActiveDemo(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-[30px] flex flex-col bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-xl dark:shadow-hard-white-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-shrink-0 h-12 bg-brutal-lime border-b-4 border-black dark:border-white flex items-center justify-between px-4 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full opacity-50"></div>
                  <span className="font-mono font-bold text-sm truncate max-w-[200px] sm:max-w-md uppercase text-black">
                    INTERFACE_ONLINE: {activeDemo.split('/').pop()}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveDemo(null)}
                  className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black text-black"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>
              
              <div className="flex-grow bg-white dark:bg-[#1a1a1a] relative w-full h-full overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center z-0">
                    <span className="font-mono text-black dark:text-white font-bold animate-pulse uppercase tracking-widest">CONNECTING_TO_HOST...</span>
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
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white">
            Selected Work
          </h2>
          <div className="w-full h-2 bg-black dark:bg-white"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {randomizedProjects.map((project, index) => {
            const hoverColorClass = `hover:${project.color}`;
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg hover:shadow-hard dark:hover:shadow-hard-white transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-gray-100 dark:bg-neutral-900">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-500 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  {/* Visual ID Badge Removed as per user request */}
                </div>

                <div className="p-6 flex flex-col flex-grow relative overflow-hidden">
                  <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 ${project.color}`}></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">{project.title}</h3>
                    <span className="font-mono text-sm font-bold border-2 border-black dark:border-white px-2 py-1 bg-white dark:bg-black text-black dark:text-white whitespace-nowrap">
                      {project.year}
                    </span>
                  </div>
                  
                  <div className="mb-6 relative z-10">
                    <span className={`inline-block px-2 py-0.5 text-xs font-black uppercase tracking-widest border border-black dark:border-white mb-2 text-black ${project.color}`}>
                      {project.category}
                    </span>
                    <p className="font-mono text-sm md:text-base leading-relaxed text-black dark:text-neutral-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleDemoOpen(project.id, project.demoUrl)} 
                        className={`flex-1 flex items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white py-3 font-bold transition-all duration-150 active:translate-y-1 active:shadow-none ${hoverColorClass} hover:text-white dark:hover:text-black`}
                      >
                         <ExternalLink size={18} /> LIVE DEMO
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;