
import React, { useState, useEffect, useMemo, memo } from 'react';
import { DEFAULT_PROJECTS } from '../constants';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  getAssetUrl: (path: string) => string;
  handleDemoOpen: (id: string, url: string) => void;
}

const ProjectCard = memo(({ project, getAssetUrl, handleDemoOpen }: ProjectCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    className="group relative bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg hover:shadow-hard dark:hover:shadow-hard-white transition-all duration-200 flex flex-col"
  >
    <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-gray-100 dark:bg-neutral-900">
      <img 
        src={getAssetUrl(project.imageUrl) || 'https://via.placeholder.com/600x400/000000/66ff00?text=NO_IMAGE'} 
        alt={project.title} 
        width="600"
        height="337"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
      />
    </div>

    <div className="p-4 sm:p-6 flex flex-col flex-grow relative overflow-hidden">
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 ${project.color}`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white leading-tight break-words max-w-[80%]">{project.title}</h3>
        <span className="font-mono text-[10px] sm:text-xs font-bold border-2 border-black dark:border-white px-2 py-1 bg-white dark:bg-black text-black dark:text-white whitespace-nowrap self-start">
          {project.year}
        </span>
      </div>
      <div className="mb-6 relative z-10">
        <span className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border border-black dark:border-white mb-2 text-black ${project.color}`}>
          {project.category}
        </span>
        <p className="font-mono text-sm leading-relaxed text-black dark:text-neutral-300">
          {project.description}
        </p>
      </div>
      <div className="mt-auto relative z-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 uppercase">
              {t}
            </span>
          ))}
        </div>
        <button 
          onClick={() => handleDemoOpen(project.id, project.demoUrl)} 
          className={`w-full flex items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white py-3 font-bold text-xs sm:text-base transition-all duration-150 active:translate-y-1 active:shadow-none hover:${project.color} dark:hover:${project.color} hover:text-black cursor-pointer`}
        >
           <ExternalLink size={18} /> LIVE DEMO
        </button>
      </div>
    </div>
  </motion.div>
));

const Projects: React.FC<{ onInteract?: (id: string) => void, dynamicProjects?: Project[] }> = ({ onInteract, dynamicProjects }) => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAssetUrl = (path: string) => {
    if (!path || path.startsWith('http') || path.startsWith('data:')) return path;
    const baseUrl = (typeof window !== 'undefined' && window.location.pathname.includes('/my-portfolio/')) ? '/my-portfolio/' : '/';
    return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${path.startsWith('/') ? path.substring(1) : path}`;
  };

  const displayProjects = dynamicProjects || DEFAULT_PROJECTS;
  const randomizedProjects = useMemo(() => [...displayProjects].sort(() => Math.random() - 0.5), [displayProjects]);

  useEffect(() => {
    if (activeDemo) document.body.style.overflow = 'hidden';
    else { document.body.style.overflow = ''; setIsLoading(false); }
    return () => { document.body.style.overflow = ''; };
  }, [activeDemo]);

  const handleDemoOpen = (projectId: string, demoUrl: string) => {
    if (onInteract) onInteract(projectId);
    const fullUrl = (!demoUrl || demoUrl === '#' || demoUrl.trim() === '') ? getAssetUrl('projects/notfound.html') : getAssetUrl(demoUrl);
    setIsLoading(true);
    setActiveDemo(fullUrl);
  };

  return (
    <section id="work" className="py-20 border-b-4 border-black dark:border-white bg-white dark:bg-brutal-black transition-colors duration-300">
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveDemo(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute inset-[10px] sm:inset-[30px] flex flex-col bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-xl z-[2001]">
              <div className="flex-shrink-0 h-12 bg-brutal-lime border-b-4 border-black flex items-center justify-between px-4">
                <span className="font-mono font-bold text-xs uppercase text-black truncate">INTERFACE_ONLINE: {activeDemo.split('/').pop()}</span>
                <button onClick={() => setActiveDemo(null)} className="p-1 hover:bg-black hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <div className="flex-grow bg-white dark:bg-[#1a1a1a] relative w-full h-full overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-white dark:bg-black">
                      <span className="font-mono text-black dark:text-white font-black animate-pulse text-xs mb-2 uppercase">VERIFYING_STREAMS...</span>
                  </div>
                )}
                <iframe src={activeDemo} onLoad={() => setIsLoading(false)} className="w-full h-full relative z-10 border-0" title="Demo" sandbox="allow-scripts allow-same-origin" loading="lazy" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white leading-none">Selected Work</h2>
          <div className="w-full h-2 bg-black dark:bg-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {randomizedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} getAssetUrl={getAssetUrl} handleDemoOpen={handleDemoOpen} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
