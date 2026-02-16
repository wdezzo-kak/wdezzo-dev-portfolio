
import React, { useMemo, memo } from 'react';
import { DEFAULT_PROJECTS } from '../constants';
import { Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  getAssetUrl: (path: string) => string;
}

const ProjectCard = memo(({ project, getAssetUrl }: ProjectCardProps) => (
  <motion.article 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    className="group relative bg-white dark:bg-black border-4 border-black dark:border-white shadow-hard-lg dark:shadow-hard-white-lg hover:shadow-hard dark:hover:shadow-hard-white transition-all duration-200 flex flex-col"
  >
    <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-gray-100 dark:bg-neutral-900">
      <img 
        src={getAssetUrl(project.imageUrl) || 'https://via.placeholder.com/600x400/000000/66ff00?text=NO_IMAGE'} 
        alt={`Screenshot of ${project.title}`} 
        width="600"
        height="337"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
      />
    </div>

    <div className="p-4 sm:p-6 flex flex-col flex-grow relative overflow-hidden">
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 ${project.color}`} aria-hidden="true"></div>
      <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white leading-tight break-words max-w-[80%]">
          {project.title}
        </h3>
        <span className="font-mono text-[10px] sm:text-xs font-bold border-2 border-black dark:border-white px-2 py-1 bg-white dark:bg-black text-black dark:text-white whitespace-nowrap self-start">
          {project.year}
        </span>
      </div>
      <div className="mb-6 relative z-10">
        <span className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border border-black dark:border-white mb-2 text-black ${project.color}`}>
          {project.category}
        </span>
        <p className="font-mono text-sm leading-relaxed text-black dark:text-neutral-200">
          {project.description}
        </p>
      </div>
      <div className="mt-auto relative z-10">
        <ul className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 uppercase">
              {t}
            </li>
          ))}
        </ul>
        <Link 
          to={`/preview/${project.id}`}
          className={`w-full flex items-center justify-center gap-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white py-3 font-bold text-xs sm:text-base transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-lime hover:${project.color} dark:hover:${project.color} hover:text-black`}
          aria-label={`Open interactive simulator for ${project.title}`}
        >
           <Smartphone size={18} aria-hidden="true" /> OPEN SIMULATOR
        </Link>
      </div>
    </div>
  </motion.article>
));

const Projects: React.FC<{ onInteract?: (id: string) => void, dynamicProjects?: Project[] }> = ({ dynamicProjects }) => {
  const getAssetUrl = (path: string) => {
    if (!path || path.startsWith('http') || path.startsWith('data:')) return path;
    const baseUrl = (typeof window !== 'undefined' && window.location.pathname.includes('/wdezzo-dev-portfolio/')) ? '/wdezzo-dev-portfolio/' : '/';
    return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${path.startsWith('/') ? path.substring(1) : path}`;
  };

  const displayProjects = dynamicProjects || DEFAULT_PROJECTS;
  const randomizedProjects = useMemo(() => [...displayProjects].sort(() => Math.random() - 0.5), [displayProjects]);

  return (
    <div className="py-20 border-b-4 border-black dark:border-white bg-white dark:bg-brutal-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 id="work-heading" className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-black dark:text-white leading-none">Selected Work</h2>
          <div className="w-full h-2 bg-black dark:bg-white" aria-hidden="true"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {randomizedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} getAssetUrl={getAssetUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
