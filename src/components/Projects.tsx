import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  memo,
} from 'react';
import { DEFAULT_PROJECTS } from '../constants';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

const BASE_PATH =
  (import.meta as any)?.env?.BASE_URL || '/wdezzo-dev-portfolio/';

const withBase = (path: string): string => {
  if (!path) return path;

  // Leave external or data URLs unchanged
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  return `${BASE_PATH}${path.replace(/^\/+/, '')}`;
};

interface ProjectCardProps {
  project: Project;
  handleDemoOpen: (id: string, url: string) => void;
}

const ProjectCard = memo(
  ({ project, handleDemoOpen }: ProjectCardProps) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white dark:bg-black border-4 border-black dark:border-white shadow-lg flex flex-col"
    >
      <div className="relative aspect-video border-b-4 border-black dark:border-white overflow-hidden bg-gray-100">
        <img
          src={withBase(project.imageUrl)}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black uppercase break-words max-w-[75%]">
            {project.title}
          </h3>
          <span className="font-mono text-xs border-2 px-2 py-1">
            {project.year}
          </span>
        </div>

        <p className="font-mono text-sm mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-bold bg-black text-white px-2 py-1 uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() =>
            handleDemoOpen(project.id, project.demoUrl)
          }
          className="mt-auto w-full flex items-center justify-center gap-2 border-2 py-3 font-bold text-sm transition active:translate-y-1"
        >
          <ExternalLink size={18} /> LIVE DEMO
        </button>
      </div>
    </motion.div>
  )
);

type ViewMode = 'mobile' | 'tablet' | 'laptop';

const Projects: React.FC<{
  onInteract?: (id: string) => void;
  dynamicProjects?: Project[];
}> = ({ onInteract, dynamicProjects }) => {
  const [activeDemo, setActiveDemo] =
    useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] =
    useState<ViewMode>('laptop');
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayProjects =
    dynamicProjects || DEFAULT_PROJECTS;

  const randomizedProjects = useMemo(() => {
    const arr = [...displayProjects];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [displayProjects]);

  // Lock scroll when modal open
  useEffect(() => {
    if (activeDemo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeDemo]);

  // Auto scale for laptop mode
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || viewMode !== 'laptop') {
        setScale(1);
        return;
      }

      const containerWidth =
        containerRef.current.offsetWidth;
      const targetWidth = 1200;

      if (containerWidth < targetWidth) {
        setScale(containerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () =>
      window.removeEventListener('resize', calculateScale);
  }, [viewMode]);

  const handleDemoOpen = (
    projectId: string,
    demoUrl: string
  ) => {
    if (onInteract) onInteract(projectId);
    setIsLoading(true);
    setActiveDemo(withBase(demoUrl));
  };

  return (
    <section className="py-20">
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveDemo(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-[20px] flex flex-col bg-white border-4 shadow-xl z-[2001]"
            >
              {/* Header */}
              <div className="h-12 border-b-4 flex items-center justify-between px-4">
                <span className="font-mono text-xs font-bold uppercase">
                  RESPONSIVE PREVIEW
                </span>
                <button
                  onClick={() => setActiveDemo(null)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* View Controls */}
              <div className="flex justify-center gap-4 p-3 border-b">
                {(['mobile', 'tablet', 'laptop'] as ViewMode[]).map(
                  (mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-1 text-xs font-mono border-2 uppercase transition
                        ${
                          viewMode === mode
                            ? 'bg-black text-white'
                            : ''
                        }`}
                    >
                      {mode}
                    </button>
                  )
                )}
              </div>

              {/* Preview Area */}
              <div
                ref={containerRef}
                className="flex-grow relative w-full h-full overflow-hidden flex justify-center items-start p-4 bg-gray-100"
              >
                <div
                  style={{
                    width:
                      viewMode === 'mobile'
                        ? '375px'
                        : viewMode === 'tablet'
                        ? '768px'
                        : '1200px',
                    height: '100%',
                    transform:
                      viewMode === 'laptop'
                        ? `scale(${scale})`
                        : 'none',
                    transformOrigin: 'top center',
                    transition: 'transform 0.3s ease',
                  }}
                  className="bg-white shadow-2xl relative"
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                      <span className="font-mono animate-pulse text-xs uppercase">
                        LOADING...
                      </span>
                    </div>
                  )}

                  <iframe
                    src={activeDemo}
                    onLoad={() => setIsLoading(false)}
                    className="w-full h-full border-0"
                    title="Demo"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {randomizedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            handleDemoOpen={handleDemoOpen}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
